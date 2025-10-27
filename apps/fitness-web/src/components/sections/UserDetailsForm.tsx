import { useState } from "react";
import {
  User,
  Ruler,
  Calendar,
  Weight,
  Target,
  X,
  Activity,
} from "lucide-react";

interface UserDetailsFormProps {
  onSubmit: (data: UserFormData) => void;
  onClose?: () => void;
  initialData?: Partial<UserFormData>;
}

export interface UserFormData {
  height: number;
  age: number;
  weight: number;
  goalWeight?: number;
  bmi: number;
  preferences: string;
}

const fitnessGoals = [
  "Weight Loss",
  "Muscle Gain",
  "Maintenance",
  "Athletic Performance",
  "General Health",
];

export default function UserDetailsForm({
  onSubmit,
  onClose,
  initialData,
}: UserDetailsFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    height: initialData?.height || 0,
    age: initialData?.age || 0,
    weight: initialData?.weight || 0,
    goalWeight: initialData?.goalWeight || 0,
    bmi: initialData?.bmi || 0,
    preferences: initialData?.preferences || "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof UserFormData, string>>
  >({});

  // Calculate BMI automatically when height or weight changes
  const calculateBMI = (weight: number, height: number) => {
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
    }
    return 0;
  };

  const handleChange = (field: keyof UserFormData, value: string | number) => {
    const newFormData = { ...formData, [field]: value };

    // Auto-calculate BMI when weight or height changes
    if (field === "weight" || field === "height") {
      newFormData.bmi = calculateBMI(
        field === "weight" ? Number(value) : newFormData.weight,
        field === "height" ? Number(value) : newFormData.height,
      );
    }

    setFormData(newFormData);

    // Clear error for this field
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};

    if (!formData.height || formData.height < 50 || formData.height > 300) {
      newErrors.height = "Please enter a valid height (50-300 cm)";
    }
    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = "Please enter a valid age (1-120 years)";
    }
    if (!formData.weight || formData.weight < 20 || formData.weight > 500) {
      newErrors.weight = "Please enter a valid weight (20-500 kg)";
    }
    if (!formData.preferences) {
      newErrors.preferences = "Please select your fitness goal";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: "Underweight", color: "text-yellow-600" };
    if (bmi < 25) return { text: "Normal", color: "text-green-600" };
    if (bmi < 30) return { text: "Overweight", color: "text-orange-600" };
    return { text: "Obese", color: "text-red-600" };
  };

  const bmiCategory = formData.bmi > 0 ? getBMICategory(formData.bmi) : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Your Health Profile
            </h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Height Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-blue-600" />
                  Height (cm)
                </div>
              </label>
              <input
                type="number"
                value={formData.height || ""}
                onChange={(e) => handleChange("height", Number(e.target.value))}
                placeholder="e.g., 175"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                  errors.height ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.height && (
                <p className="mt-1 text-sm text-red-600">{errors.height}</p>
              )}
            </div>

            {/* Age Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Age (years)
                </div>
              </label>
              <input
                type="number"
                value={formData.age || ""}
                onChange={(e) => handleChange("age", Number(e.target.value))}
                placeholder="e.g., 28"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                  errors.age ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600">{errors.age}</p>
              )}
            </div>

            {/* Weight Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Weight className="w-4 h-4 text-blue-600" />
                  Current Weight (kg)
                </div>
              </label>
              <input
                type="number"
                value={formData.weight || ""}
                onChange={(e) => handleChange("weight", Number(e.target.value))}
                placeholder="e.g., 70"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                  errors.weight ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.weight && (
                <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
              )}
            </div>

            {/* Goal Weight Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-600" />
                  Goal Weight (kg)
                </div>
              </label>
              <input
                type="number"
                value={formData.goalWeight || ""}
                onChange={(e) => handleChange("goalWeight", Number(e.target.value))}
                placeholder="e.g., 65"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all border-gray-300`}
              />
              {formData.weight && formData.goalWeight && (
                <p className="mt-1 text-sm text-gray-600">
                  {formData.weight > formData.goalWeight 
                    ? `Goal: Lose ${(formData.weight - formData.goalWeight).toFixed(1)} kg`
                    : formData.weight < formData.goalWeight
                    ? `Goal: Gain ${(formData.goalWeight - formData.weight).toFixed(1)} kg`
                    : 'Maintain current weight'}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* BMI Display (Auto-calculated) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  BMI (Auto-calculated)
                </div>
              </label>
              <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    {formData.bmi > 0 ? formData.bmi : "-"}
                  </span>
                  {bmiCategory && (
                    <span
                      className={`text-sm font-semibold ${bmiCategory.color}`}
                    >
                      {bmiCategory.text}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Preferences/Goals */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                Fitness Goal
              </div>
            </label>
            <select
              value={formData.preferences}
              onChange={(e) => handleChange("preferences", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                errors.preferences ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select your fitness goal</option>
              {fitnessGoals.map((goal) => (
                <option key={goal} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
            {errors.preferences && (
              <p className="mt-1 text-sm text-red-600">{errors.preferences}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg shadow-blue-500/30"
            >
              {initialData ? "Update Profile" : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
