interface ProgressItemProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
  color: string;
}

function ProgressItem({
  label,
  current,
  goal,
  unit,
  color,
}: ProgressItemProps) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-600">{label}</span>
        <span className="text-xs font-bold text-gray-900">
          {current}/{goal} {unit}
        </span>
      </div>
      <div className="relative w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface CompactProgressCardProps {
  calories: { current: number; goal: number };
  steps: { current: number; goal: number };
  protein: { current: number; goal: number };
}

export default function CompactProgressCard({
  calories,
  steps,
  protein,
}: CompactProgressCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Daily Progress
      </h3>
      <div className="space-y-3">
        <ProgressItem
          label="Calories"
          current={calories.current}
          goal={calories.goal}
          unit="kcal"
          color="bg-orange-500"
        />
        <ProgressItem
          label="Steps"
          current={steps.current}
          goal={steps.goal}
          unit=""
          color="bg-blue-500"
        />
        <ProgressItem
          label="Protein"
          current={protein.current}
          goal={protein.goal}
          unit="g"
          color="bg-emerald-500"
        />
      </div>
    </div>
  );
}
