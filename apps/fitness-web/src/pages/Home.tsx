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
import { userStats, mealPlan, weightHistory } from "../components/data/dummy";
import {
  useGetuserdetailsMutation,
  useSaveprefrenceMutation,
} from "../redux/services/api";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import type { RootState } from "../redux/store";

function Home() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [completedMeals, setCompletedMeals] = useState<Set<string>>(new Set());
  const [showUserForm, setShowUserForm] = useState(false);
  const [userDetails, setUserDetails] = useState<UserFormData | null>(null);
  const selectedDay = mealPlan[selectedDayIndex];

  const completedMealsToday = selectedDay.meals.filter((meal) =>
    completedMeals.has(meal.id),
  );
  const totalCaloriesToday = completedMealsToday.reduce(
    (sum, meal) => sum + meal.calories,
    0,
  );
  const totalProteinToday = completedMealsToday.reduce(
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
    setSelectedDayIndex((prev) => Math.min(mealPlan.length - 1, prev + 1));
  };

  const toggleMealComplete = (mealId: string) => {
    setCompletedMeals((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(mealId)) {
        newSet.delete(mealId);
      } else {
        newSet.add(mealId);
      }
      return newSet;
    });
  };

  const [savePrefrence] = useSaveprefrenceMutation();
  const [getUserDetails] = useGetuserdetailsMutation();

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
            bmi: details.bmi,
            preferences: details.preferences,
          });
          dispatch(
            setCredentials({
              userDetails: {
                height: details.height,
                age: details.age,
                weight: details.weight,
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

    fetchUserDetails();
  }, []);

  const handleUserDetailsSubmit = async (data: UserFormData) => {
    setUserDetails(data);
    setShowUserForm(false);

    try {
      const result = await savePrefrence(data).unwrap();
      console.log("User details submitted:", data, result);
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
                  {formatDate(selectedDay.date)}
                </p>
              </div>
              <button
                onClick={goToNextDay}
                disabled={selectedDayIndex === mealPlan.length - 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedDay.meals.map((meal) => (
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
          <WeightTracker weightHistory={weightHistory} />
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
