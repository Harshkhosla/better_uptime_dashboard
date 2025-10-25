import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  current: number;
  goal: number;
  unit: string;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({
  title,
  current,
  goal,
  unit,
  icon: Icon,
  color,
}: StatCardProps) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{current}</span>
            <span className="text-lg text-gray-400">
              / {goal} {unit}
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-xs text-gray-500 mt-2">
        {percentage.toFixed(0)}% of daily goal
      </p>
    </div>
  );
}
