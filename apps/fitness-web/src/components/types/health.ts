export interface UserStats {
  weight: number;
  height: number;
  bmi: number;
  caloriesGoal: number;
  caloriesConsumed: number;
  waterGoal: number;
  waterConsumed: number;
  stepsGoal: number;
  stepsTaken: number;
  proteinGoal: number;
  proteinConsumed: number;
}

export interface Meal {
  id: string;
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  time: string;
  imageUrl?: string;
}

export interface DayMeals {
  date: string;
  meals: Meal[];
}

export interface WeightEntry {
  date: string;
  weight: number;
  goal: number;
}
