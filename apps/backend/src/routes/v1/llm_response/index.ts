import { Prismaclient } from "prisma/client";
import { Router } from "express";
import { authMiddleware } from "../../../middleware/middleware";

const router: Router = Router();

// Define types for meal structure
interface MealConfig {
  type: string;
  time: string;
}
router.post("/getllm", authMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user?.id || req?.UserID; // Get from auth middleware
    
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { 
      weight, 
      age, 
      bmi, 
      preference, 
      isVeg, 
      customComments,
      mealStructure,
      numberOfDays = 7
    } = req.body.userDetails;

    // Validate required fields
    if (!weight || !age || !bmi) {
      res.status(400).json({
        message: "Missing required fields: weight, age, and bmi are required",
      });
      return;
    }

    // Default meal structure if not provided
    const defaultMealStructure: MealConfig[] = [
      { type: "breakfast", time: "08:00" },
      { type: "snack", time: "10:30" },
      { type: "lunch", time: "13:00" },
      { type: "snack", time: "16:00" },
      { type: "dinner", time: "19:30" }
    ];

    const mealsConfig: MealConfig[] = Array.isArray(mealStructure) ? mealStructure : defaultMealStructure;

    // Get last 5 chat messages for context
    const previousChats = await Prismaclient.chatHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        role: true,
        content: true,
        metadata: true,
      }
    });

    // Build context from chat history
    const chatContext = previousChats.length > 0 
      ? `\n\nPrevious context:\n${previousChats.reverse().map(chat => 
          `${chat.role}: ${JSON.stringify(chat.content)}`
        ).join('\n')}`
      : '';

    // Construct the prompt for the LLM
    const prompt = `
You are a health and fitness advisor. Based on the following user information, provide a personalized ${numberOfDays}-day meal plan:

- Weight: ${weight} kg
- Age: ${age} years
- BMI: ${bmi}
- Dietary Preference: ${preference || "No specific preference"}
- Vegetarian: ${isVeg ? "Yes" : "No"}
${customComments ? `- Additional Comments: ${customComments}` : ""}
${chatContext}

Please provide a ${numberOfDays}-day meal plan in the following JSON format ONLY. Do not include any explanation, just return the JSON array:

[
  {
    "date": "YYYY-MM-DD",
    "meals": [
      {
        "id": "unique_id",
        "name": "Meal Name",
        "type": "breakfast|snack|lunch|dinner",
        "calories": number,
        "protein": number,
        "carbs": number,
        "fats": number,
        "time": "HH:MM"
      }
    ]
  }
]

Requirements:
1. Each day should have exactly ${mealsConfig.length} meals with the following structure:
${mealsConfig.map((meal: MealConfig, idx: number) => `   ${idx + 1}. ${meal.type} at ${meal.time}`).join('\n')}
2. Consider the user's vegetarian preference: ${isVeg ? "Yes" : "No"}
3. Adjust calories based on BMI and weight goals
4. Provide realistic portion sizes and nutritional values
5. Start from today's date: ${new Date().toISOString().split('T')[0]}
6. Generate unique sequential IDs for each meal starting from "1"
7. Return ONLY the JSON array, no additional text or markdown
`;

    // Save user's request to chat history
    await Prismaclient.chatHistory.create({
      data: {
        userId,
        role: "user",
        content: {
          weight,
          age,
          bmi,
          preference,
          isVeg,
          customComments,
          mealStructure: mealsConfig,
          numberOfDays
        } as any,
        metadata: {
          requestType: "meal_plan_generation",
          timestamp: new Date().toISOString()
        } as any
      }
    });

    // Call LLM API
    const llmResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful health and fitness advisor that returns structured JSON data for meal plans. Always return valid JSON arrays only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });

    const data = await llmResponse.json();

    if (!llmResponse.ok) {
      throw new Error(data.error?.message || "LLM API call failed");
    }

    // Parse the LLM response
    let mealPlanData;
    try {
      let content = data.choices[0].message.content;
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      mealPlanData = JSON.parse(content);
    } catch (parseError) {
      console.error("Failed to parse LLM response:", parseError);
      throw new Error("Invalid response format from LLM");
    }

    // Save assistant's response to chat history
    await Prismaclient.chatHistory.create({
      data: {
        userId,
        role: "assistant",
        content: mealPlanData as any,
        metadata: {
          responseType: "meal_plan",
          timestamp: new Date().toISOString(),
          tokensUsed: data.usage?.total_tokens || 0
        } as any
      }
    });

    // Deactivate previous meal plans
    await Prismaclient.mealPlan.updateMany({
      where: {
        userId,
        isActive: true
      },
      data: {
        isActive: false
      }
    });

    // Create new meal plan with all meals
    const mealPlan = await Prismaclient.mealPlan.create({
      data: {
        userId,
        numberOfDays,
        isActive: true,
        userInput: {
          weight,
          age,
          bmi,
          preference,
          isVeg,
          customComments
        } as any,
        mealStructure: { meals: mealsConfig } as any,
        days: {
          create: mealPlanData.map((day: any) => ({
            date: new Date(day.date),
            meals: {
              create: day.meals.map((meal: any) => ({
                externalId: meal.id,
                name: meal.name,
                type: meal.type,
                calories: meal.calories,
                protein: meal.protein,
                carbs: meal.carbs,
                fats: meal.fats,
                time: meal.time,
                isCompleted: false
              }))
            }
          }))
        }
      },
      include: {
        days: {
          include: {
            meals: true
          },
          orderBy: {
            date: 'asc'
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      mealPlan: mealPlanData,
      mealPlanId: mealPlan.id,
      userInput: { 
        weight, 
        age, 
        bmi, 
        preference, 
        isVeg, 
        customComments,
        mealStructure: mealsConfig,
        numberOfDays 
      },
    });
  } catch (error: any) {
    console.error("Error calling LLM:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get LLM response",
      error: error.message,
    });
  }
});

// Get active meal plan
router.get("/active-meal-plan", authMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user?.id || req?.UserID;

    const mealPlan = await Prismaclient.mealPlan.findFirst({
      where: {
        userId,
        isActive: true
      },
      include: {
        days: {
          include: {
            meals: true
          },
          orderBy: {
            date: 'asc'
          }
        }
      }
    });

    if (!mealPlan) {
      res.status(404).json({ message: "No active meal plan found" });
      return;
    }

    res.status(200).json({
      success: true,
      mealPlan
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch meal plan",
      error: error.message
    });
  }
});

// Mark meal as completed
router.patch("/meals/:mealId/complete", authMiddleware, async (req, res) => {
  try {
    const { mealId } = req.params;
    const { isCompleted } = req.body;

    if (!mealId) {
      res.status(400).json({ 
        success: false,
        message: "Meal ID is required" 
      });
      return;
    }

    const meal = await Prismaclient.meal.update({
      where: { id: mealId },
      data: {
        isCompleted,
        completedAt: isCompleted ? new Date() : null
      }
    });

    res.status(200).json({
      success: true,
      meal
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update meal",
      error: error.message
    });
  }
});

// Get chat history
router.get("/chat-history", authMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user?.id || req?.UserID;
    const { limit = 20 } = req.query;

    const chatHistory = await Prismaclient.chatHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: Number(limit)
    });

    res.status(200).json({
      success: true,
      chatHistory: chatHistory.reverse()
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch chat history",
      error: error.message
    });
  }
});

export const LlmRouter = router;
