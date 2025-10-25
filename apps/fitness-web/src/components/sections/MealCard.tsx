import { Clock, Flame, Check } from "lucide-react";
import type { Meal } from "../types/health";

interface MealCardProps {
  meal: Meal;
  isCompleted?: boolean;
  onToggleComplete?: (mealId: string) => void;
}

const mealTypeColors = {
  breakfast: "bg-amber-50 text-amber-700 border-amber-200",
  lunch: "bg-emerald-50 text-emerald-700 border-emerald-200",
  dinner: "bg-blue-50 text-blue-700 border-blue-200",
  snack: "bg-purple-50 text-purple-700 border-purple-200",
};

export default function MealCard({
  meal,
  isCompleted = false,
  onToggleComplete,
}: MealCardProps) {
  return (
    <div
      className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:scale-[1.02] relative ${
        isCompleted
          ? "border-emerald-300 bg-emerald-50/30"
          : "border-gray-100 hover:shadow-md"
      }`}
    >
      {onToggleComplete && (
        <button
          onClick={() => onToggleComplete(meal.id)}
          className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            isCompleted
              ? "bg-emerald-500 border-emerald-500"
              : "border-gray-300 hover:border-emerald-400"
          }`}
        >
          {isCompleted && <Check className="w-4 h-4 text-white" />}
        </button>
      )}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-8">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full border ${mealTypeColors[meal.type]}`}
            >
              {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {meal.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{meal.time}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-orange-50 px-3 py-2 rounded-lg">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="font-bold text-orange-600">{meal.calories}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Protein</p>
          <p className="text-sm font-bold text-gray-900">{meal.protein}g</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Carbs</p>
          <p className="text-sm font-bold text-gray-900">{meal.carbs}g</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Fats</p>
          <p className="text-sm font-bold text-gray-900">{meal.fats}g</p>
        </div>
      </div>
    </div>
  );
}
