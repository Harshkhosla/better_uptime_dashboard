import { TrendingDown, Target } from "lucide-react";
import type { WeightEntry } from "../types/health";

interface WeightTrackerProps {
  weightHistory: WeightEntry[];
}

export default function WeightTracker({ 
  weightHistory
}: WeightTrackerProps) {
  const latestEntry = weightHistory[weightHistory.length - 1];

  const startWeight = weightHistory[0]?.weight || 0;
  const currentWeight = latestEntry?.weight || 0;
  const goalWeight = latestEntry?.goal || 0;
  const totalLoss = startWeight - currentWeight;
  const remainingLoss = currentWeight - goalWeight;
  const progressPercentage =
    ((startWeight - currentWeight) / (startWeight - goalWeight)) * 100;

  const maxWeight =
    Math.max(...weightHistory.map((e) => e.weight), goalWeight) + 2;
  const minWeight =
    Math.min(...weightHistory.map((e) => e.weight), goalWeight) - 2;
  const weightRange = maxWeight - minWeight;

  if (!latestEntry || weightHistory.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="text-center text-gray-500">
          No weight history available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <TrendingDown className="w-6 h-6 text-emerald-600" />
          <h2 className="text-2xl font-bold text-gray-900">Weight Progress</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-gray-500">Current</p>
            <p className="text-xl font-bold text-gray-900">
              {currentWeight} kg
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Goal</p>
            <p className="text-xl font-bold text-emerald-600 flex items-center gap-1">
              <Target className="w-4 h-4" />
              {goalWeight} kg
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Progress to Goal</span>
          <span className="text-sm font-semibold text-emerald-600">
            {totalLoss.toFixed(1)} kg lost • {remainingLoss.toFixed(1)} kg to go
          </span>
        </div>
        <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
      </div>

      <div className="relative h-48">
        <div className="absolute inset-0 flex items-end justify-between gap-1">
          {weightHistory.map((entry, index) => {
            const height = ((entry.weight - minWeight) / weightRange) * 100;
            const goalHeight = ((goalWeight - minWeight) / weightRange) * 100;
            const date = new Date(entry.date);
            const isLatest = index === weightHistory.length - 1;

            return (
              <div
                key={`${entry.date}-${index}`}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="relative w-full" style={{ height: "180px" }}>
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 border-2 border-dashed border-red-300"
                    style={{ height: `${goalHeight}%`, width: "2px" }}
                  />
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full rounded-t-lg transition-all duration-500 ${
                      isLatest
                        ? "bg-gradient-to-t from-emerald-600 to-emerald-400"
                        : "bg-gradient-to-t from-emerald-500 to-emerald-300"
                    }`}
                    style={{ height: `${height}%` }}
                  >
                    {isLatest && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded whitespace-nowrap shadow-lg">
                        {entry.weight} kg
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {date.getDate()}/{date.getMonth() + 1}
                </span>
              </div>
            );
          })}
        </div>

        <div className="absolute top-0 right-0 flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-emerald-500 rounded"></div>
            <span className="text-gray-600">Weight</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 border-t-2 border-dashed border-red-400"></div>
            <span className="text-gray-600">Goal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
