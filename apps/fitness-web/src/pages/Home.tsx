import { useEffect, useState } from "react";
import {
  Droplet,
  Footprints,
  Beef,
  Calendar,
  ChevronLeft,
  ChevronRight,
  UserPlus,
} from "lucide-react";
import StatCard from "../components/sections/StatCard";
import MealCard from "../components/sections/MealCard";
import CompactProgressCard from "../components/sections/CompactProgressCard";
import WeightTracker from "../components/sections/WeightTracker";
import UserDetailsForm, {
  type UserFormData,
} from "../components/sections/UserDetailsForm";
import { userStats } from "../components/data/dummy";
import type { DayMeals } from "../components/types/health";
import {
  useGetlatestUsermealsMutation,
  useGetuserdetailsMutation,
  useSaveprefrenceMutation,
  useCompleteMealMutation,
  useGetWeightHistoryQuery,
  useAddWeightEntryMutation,
} from "../redux/services/api";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import type { RootState } from "../redux/store";

function Home() {
  const dispatch = useDispatch();
  const [savePrefrence] = useSaveprefrenceMutation();
  const [getUserDetails] = useGetuserdetailsMutation();
  const [getlatestUsermeals] = useGetlatestUsermealsMutation();
  const [completeMeal] = useCompleteMealMutation();
  const [addWeightEntry] = useAddWeightEntryMutation();
  const { data: weightHistoryData } = useGetWeightHistoryQuery({ limit: 30 });
  const userData = useSelector((state: RootState) => state.auth.userDetails);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [completedMeals, setCompletedMeals] = useState<Set<string>>(new Set());
  const [showUserForm, setShowUserForm] = useState(false);
  const [mealplandata, setmealplandata] = useState<DayMeals[]>([]);
  const [userDetails, setUserDetails] = useState<UserFormData | null>(null);
  const selectedDay = mealplandata?.[selectedDayIndex];

  interface WeightHistoryEntry {
    date: string;
    weight: number;
    goal: number | null;
  }

  // Transform weight history from API
  const weightHistory = weightHistoryData?.weightHistory?.map((entry: WeightHistoryEntry) => ({
    date: new Date(entry.date).toISOString().split('T')[0],
    weight: entry.weight,
    goal: entry.goal || 70,
  })) || [];

  const completedMealsToday = selectedDay?.meals?.filter((meal) =>
    completedMeals.has(meal.id),
  );
  const totalCaloriesToday = completedMealsToday?.reduce(
    (sum, meal) => sum + meal.calories,
    0,
  );
  const totalProteinToday = completedMealsToday?.reduce(
    (sum, meal) => sum + meal.protein,
    0,
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const goToPreviousDay = () => {
    setSelectedDayIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNextDay = () => {
    setSelectedDayIndex((prev) => Math.min(mealplandata?.length - 1, prev + 1));
  };

  const toggleMealComplete = async (mealId: string) => {
    const isCurrentlyCompleted = completedMeals.has(mealId);
    const newCompletionState = !isCurrentlyCompleted;

    // Optimistically update UI
    setCompletedMeals((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(mealId)) {
        newSet.delete(mealId);
      } else {
        newSet.add(mealId);
      }
      return newSet;
    });

    try {
      // Call API to update meal completion status
      await completeMeal({
        mealId,
        isCompleted: newCompletionState,
      }).unwrap();
      
      console.log(`Meal ${mealId} marked as ${newCompletionState ? 'completed' : 'incomplete'}`);
    } catch (error) {
      console.error("Failed to update meal completion:", error);
      
      // Revert optimistic update on error
      setCompletedMeals((prev) => {
        const newSet = new Set(prev);
        if (newCompletionState) {
          newSet.delete(mealId);
        } else {
          newSet.add(mealId);
        }
        return newSet;
      });
    }
  };



  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails({}).unwrap();
        console.log("User details fetched:", response);

        if (response?.message?.userDetails) {
          const details = response.message.userDetails;
          setUserDetails({
            height: details.height,
            age: details.age,
            weight: details.weight,
            goalWeight: details.goalWeight,
            bmi: details.bmi,
            preferences: details.preferences,
          });
          dispatch(
            setCredentials({
              userDetails: {
                height: details.height,
                age: details.age,
                weight: details.weight,
                goalWeight: details.goalWeight,
                bmi: details.bmi,
                preferences: details.preferences,
                id: details.id,
              },
            }),
          );
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
  interface MealResponse {
    id: string;
    name: string;
    type: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    time: string;
    isCompleted?: boolean;
  }

  interface DayResponse {
    date: string;
    meals: MealResponse[];
  }

  const fetchUsermeals = async () => {
      if (!userData) {
        console.log("No user data available, skipping meal fetch");
        return;
      }
      try {
        const response = await getlatestUsermeals({}).unwrap();
        if (response?.mealPlan?.days) {
          const transformedData: DayMeals[] = response.mealPlan.days.map((day: DayResponse) => ({
            date: new Date(day.date).toISOString().split('T')[0],
            meals: day.meals.map((meal: MealResponse) => ({
              id: meal.id,
              name: meal.name,
              type: meal.type as "breakfast" | "lunch" | "dinner" | "snack",
              calories: meal.calories,
              protein: meal.protein,
              carbs: meal.carbs,
              fats: meal.fats,
              time: meal.time,
            }))
          }));
          setmealplandata(transformedData);
          
          const completedMealIds = new Set<string>();
          response.mealPlan.days.forEach((day: DayResponse) => {
            day.meals.forEach((meal: MealResponse) => {
              if (meal.isCompleted === true) {
                completedMealIds.add(meal.id);
              }
            });
          });
          setCompletedMeals(completedMealIds);
        }
      } catch (error) {
        console.error("Failed to fetch user meals:", error);
      }
    };

    fetchUserDetails();
    fetchUsermeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleUserDetailsSubmit = async (data: UserFormData) => {
    const previousWeight = userDetails?.weight;
    const hasWeightChanged = previousWeight !== data.weight;
    
    setUserDetails(data);
    setShowUserForm(false);

    try {
      // Save user preferences
      const result = await savePrefrence(data).unwrap();
      console.log("User details submitted:", data, result);

      // Add weight entry to history (creates new entry or updates today's entry)
      const today = new Date().toISOString().split('T')[0];
      await addWeightEntry({ 
        weight: data.weight, 
        date: today,
        goal: data.goalWeight 
      }).unwrap();
      console.log(hasWeightChanged ? "Weight entry updated" : "Weight entry added");
    } catch (error) {
      console.error("Failed to save preferences:", error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Health Dashboard
              </h1>
              <p className="text-gray-600">
                Track your daily progress and stay on target
              </p>
            </div>
            <button
              onClick={() => setShowUserForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg shadow-blue-500/30"
            >
              <UserPlus className="w-5 h-5" />
              {userDetails ? "Update Profile" : "Setup Profile"}
            </button>
          </div>
        </header>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 pb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">Meal Plan</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={goToPreviousDay}
                disabled={selectedDayIndex === 0}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div className="bg-gray-50 px-4 py-2 rounded-lg min-w-[140px] text-center">
                <p className="text-sm font-semibold text-gray-900">
                  {formatDate(selectedDay?.date)}
                </p>
              </div>
              <button
                onClick={goToNextDay}
                disabled={selectedDayIndex === mealplandata.length - 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedDay?.meals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                isCompleted={completedMeals.has(meal.id)}
                onToggleComplete={toggleMealComplete}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8 pt-10">
          <StatCard
            title="Water Intake"
            current={userStats.waterConsumed}
            goal={userStats.waterGoal}
            unit="glasses"
            icon={Droplet}
            color="bg-blue-500"
          />
          <StatCard
            title="Steps"
            current={userStats.stepsTaken}
            goal={userStats.stepsGoal}
            unit="steps"
            icon={Footprints}
            color="bg-teal-500"
          />
          <StatCard
            title="BMI"
            current={userStats.bmi}
            goal={24}
            unit=""
            icon={Beef}
            color="bg-emerald-500"
          />
          <CompactProgressCard
            calories={{
              current: totalCaloriesToday,
              goal: userStats.caloriesGoal,
            }}
            steps={{ current: userStats.stepsTaken, goal: userStats.stepsGoal }}
            protein={{
              current: totalProteinToday,
              goal: userStats.proteinGoal,
            }}
          />
        </div>

        <div className="mb-8">
          <WeightTracker 
            weightHistory={weightHistory} 
          />
        </div>
      </div>

      {/* User Details Form Modal */}
      {showUserForm && (
        <UserDetailsForm
          onSubmit={handleUserDetailsSubmit}
          onClose={() => setShowUserForm(false)}
          initialData={userDetails || undefined}
        />
      )}
    </div>
  );
}

export default Home;
