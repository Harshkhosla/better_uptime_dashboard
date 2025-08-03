import { DashBoardHeader } from "@repo/ui/DashboardHeader";
import { Monitorheader } from "@repo/ui/monitorheader";
import React, { useState } from "react";

export const CreateMonitors = () => {
  const [value, setVlaue] = useState("https://");

  const onChange = (e: any) => {
    setVlaue(e.target.value);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans relative overflow-hidden"
      style={{ fontFeatureSettings: '"rlig" 1, "calt" 1' }}>
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }} />

      <div className="relative z-10 flex justify-center">
        <div className="flex-1 max-w-6xl p-16">
          <DashBoardHeader>Create Monitors</DashBoardHeader>

          {/* Monitor Config Section */}
          <div className="flex justify-between gap-10 mt-10">
            <Monitorheader
              name="What to monitor"
              description="Configure the target website you want to monitor. You'll find the advanced configuration below, in the advanced settings section."
            />
            <div className="bg-dark-900 p-6 rounded-lg border border-gray-700 w-full max-w-xl">
              <div className="mb-4">
                <label className="text-xs font-medium mb-1 block">
                  Alert us when{" "}
                  <span className="bg-gray-800 text-xs rounded px-2 py-0.5 ml-1">Billable</span>
                </label>
                <select
                  className="bg-dark-800 text-white px-4 py-2 rounded w-1/2 border border-gray-600"
                  defaultValue="unavailable"
                >
                  <option value="unavailable">URL becomes unavailable</option>
                </select>
                <p className="text-xs w-1/2 text-gray-500 mt-3">
                  We recommend the keyword matching method.{" "}
                  <a href="#" className="text-purple-400 underline">Upgrade your account</a> to enable more options.
                </p>
              </div>

              <div>
                <label className="text-xs font-medium mb-3 block">URL to monitor</label>
                <input
                  type="text"
                  placeholder="https://"
                  value={value}
                  onChange={onChange}
                  className="bg-dark-800 text-white px-4 py-2 rounded w-full border border-gray-600"
                />
                <p className="text-xs text-gray-500 mt-3">
                  You can import multiple monitors <a href="#" className="text-purple-400 underline">here</a>.
                </p>
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="border-t border-gray-700 my-12"></div>

          {/* On-call Escalation Section */}
          <div className="flex justify-between gap-10">
            <Monitorheader
              name="On-call escalation"
              description="Set up rules for who's going to be notified and how when an incident occurs."
            />
            <div className="bg-dark-900 p-6 rounded-lg border border-gray-700 w-full max-w-xl">
              <div className="mb-4">
                <label className="text-xs font-medium mb-1 block">When there's a new incident</label>
                <div className="flex gap-10 pt-3">
                  <label><input type="checkbox" /> Call</label>
                  <label><input type="checkbox" /> SMS</label>
                  <label><input type="checkbox" defaultChecked /> Email</label>
                  <label><input type="checkbox" /> Push Notification</label>
                </div>
                <p className="text-xs w-1/2 text-gray-500 mt-3">
                  the <a href="#" className="text-purple-400 underline">current on-call person</a>.
                </p>
              </div>

              <div>
                <label className="text-xs font-medium mb-3 block">If the on-call person doesn't acknowledge the incident</label>
                <select
                  className="bg-dark-800 text-white px-4 py-2 rounded w-full border border-gray-600"
                  defaultValue="unavailable"
                >
                  <option value="unavailable">Do nothing</option>
                </select>
                <p className="text-xs text-gray-500 mt-3">
                  Set up an advanced escalation policy and let responders choose how they want{" "}
                  <a href="#" className="text-purple-400 underline">to be notified.</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
