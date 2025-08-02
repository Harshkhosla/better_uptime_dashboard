import React from "react";
import { Button } from "@repo/ui/button";

export const DashBoardHeader = () => {
  return (
    <div>
      <div className="flex justify-between text-3xl font-semibold mb-5">
        <div className="flex items-center space-x-3">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <h1 className="text-xl font-semibold text-white">Monitors</h1>
        </div>
        <div>
          <Button
            size="md"
            variant="terteary"
            children="Create Monitor"
            className="py-2"
          />
        </div>
      </div>
    </div>
  );
};
