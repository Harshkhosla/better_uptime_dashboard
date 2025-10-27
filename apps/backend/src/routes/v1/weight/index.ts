import { Prismaclient } from "prisma/client";
import { Router, Request, Response } from "express";
import { authMiddleware } from "../../../middleware/middleware";

const router = Router();

// Add a new weight entry
router.post("/add", authMiddleware, async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user?.id || req?.UserID;
    
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { weight, date, goal, note } = req.body;

    // Validate required fields
    if (!weight) {
      res.status(400).json({
        message: "Weight is required",
      });
      return;
    }

    // Use provided date or current date
    const weightDate = date ? new Date(date) : new Date();
    
    // Set time to start of day for consistency
    weightDate.setHours(0, 0, 0, 0);

    // If no goal is provided, get it from user details
    let weightGoal = goal;
    if (!weightGoal) {
      const userDetails = await Prismaclient.userDetails.findUnique({
        where: { ownerId: userId },
        select: { goalWeight: true },
      });
      weightGoal = userDetails?.goalWeight || null;
    }

    // Upsert weight entry (update if exists for that date, create if not)
    const weightEntry = await Prismaclient.weightHistory.upsert({
      where: {
        userId_date: {
          userId,
          date: weightDate,
        },
      },
      update: {
        weight: parseFloat(weight),
        goal: weightGoal ? parseFloat(weightGoal) : null,
        note: note || null,
      },
      create: {
        userId,
        date: weightDate,
        weight: parseFloat(weight),
        goal: weightGoal ? parseFloat(weightGoal) : null,
        note: note || null,
      },
    });

    // Also update the current weight in UserDetails
    await Prismaclient.userDetails.update({
      where: { ownerId: userId },
      data: { 
        weight: parseFloat(weight),
        ...(weightGoal && { goalWeight: parseFloat(weightGoal) }),
      },
    });

    res.status(200).json({
      success: true,
      weightEntry,
      message: "Weight entry saved successfully",
    });
  } catch (error: any) {
    console.error("Error adding weight entry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save weight entry",
      error: error.message,
    });
  }
});

// Get weight history
router.get("/history", authMiddleware, async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user?.id || req?.UserID;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { limit = 30, startDate, endDate } = req.query;

    // Build date filter
    const dateFilter: any = {};
    if (startDate) {
      dateFilter.gte = new Date(startDate as string);
    }
    if (endDate) {
      dateFilter.lte = new Date(endDate as string);
    }

    const weightHistory = await Prismaclient.weightHistory.findMany({
      where: {
        userId,
        ...(Object.keys(dateFilter).length > 0 && { date: dateFilter }),
      },
      orderBy: {
        date: 'asc',
      },
      take: Number(limit),
    });

    res.status(200).json({
      success: true,
      weightHistory,
      count: weightHistory.length,
    });
  } catch (error: any) {
    console.error("Error fetching weight history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch weight history",
      error: error.message,
    });
  }
});

// Delete a weight entry
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user?.id || req?.UserID;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!id) {
      res.status(400).json({ message: "Weight entry ID is required" });
      return;
    }

    // Verify ownership before deleting
    const weightEntry = await Prismaclient.weightHistory.findUnique({
      where: { id },
    });

    if (!weightEntry) {
      res.status(404).json({ message: "Weight entry not found" });
      return;
    }

    if (weightEntry.userId !== userId) {
      res.status(403).json({ message: "Forbidden: Not your weight entry" });
      return;
    }

    await Prismaclient.weightHistory.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Weight entry deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting weight entry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete weight entry",
      error: error.message,
    });
  }
});

// Get weight statistics
router.get("/stats", authMiddleware, async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user?.id || req?.UserID;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const weightHistory = await Prismaclient.weightHistory.findMany({
      where: { userId },
      orderBy: { date: 'asc' },
    });

    if (weightHistory.length === 0) {
      res.status(200).json({
        success: true,
        stats: null,
        message: "No weight history found",
      });
      return;
    }

    const firstEntry = weightHistory[0];
    const lastEntry = weightHistory[weightHistory.length - 1];
    
    if (!firstEntry || !lastEntry) {
      res.status(200).json({
        success: true,
        stats: null,
        message: "Invalid weight history data",
      });
      return;
    }

    const startWeight = firstEntry.weight;
    const currentWeight = lastEntry.weight;
    const goalWeight = lastEntry.goal;
    
    const totalChange = currentWeight - startWeight;
    const remainingToGoal = goalWeight ? currentWeight - goalWeight : null;
    const progressPercentage = goalWeight 
      ? ((startWeight - currentWeight) / (startWeight - goalWeight)) * 100
      : null;

    // Calculate average weekly change (if more than 7 days of data)
    let avgWeeklyChange = null;
    if (weightHistory.length >= 2) {
      const daysDiff = (lastEntry.date.getTime() - firstEntry.date.getTime()) / (1000 * 60 * 60 * 24);
      const weeksDiff = daysDiff / 7;
      if (weeksDiff > 0) {
        avgWeeklyChange = totalChange / weeksDiff;
      }
    }

    res.status(200).json({
      success: true,
      stats: {
        startWeight,
        currentWeight,
        goalWeight,
        totalChange,
        remainingToGoal,
        progressPercentage: progressPercentage ? Math.min(progressPercentage, 100) : null,
        avgWeeklyChange,
        totalEntries: weightHistory.length,
        firstEntry: firstEntry.date,
        lastEntry: lastEntry.date,
      },
    });
  } catch (error: any) {
    console.error("Error fetching weight stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch weight statistics",
      error: error.message,
    });
  }
});

export const WeightRouter = router;
