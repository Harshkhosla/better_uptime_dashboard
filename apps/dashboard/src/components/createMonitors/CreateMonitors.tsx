import { Button } from "@repo/ui/button";
import { DashBoardHeader } from "@repo/ui/DashboardHeader";
import { Monitorheader } from "@repo/ui/monitorheader";
import React, { useState } from "react";
import { useCreatemonitorMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";

export const CreateMonitors = () => {
  const [Createmonitor] = useCreatemonitorMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    url: "https://",
    alertType: "unavailable",
    notify: {
      call: false,
      sms: false,
      email: true,
      push: false,
    },
    escalationPolicy: "unavailable",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      notify: {
        ...prev.notify,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async () => {
    const result = await Createmonitor({ formData: formData }).unwrap();
    console.log("Form submitted:", result);
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen bg-white text-gray-900 font-sans relative"
      style={{ fontFeatureSettings: '"rlig" 1, "calt" 1' }}
    >

      <div className="relative z-10 flex flex-col justify-center">
        <div className="flex-1 max-w-6xl p-11 mx-auto">
          <DashBoardHeader>Create Monitors</DashBoardHeader>

          {/* Monitor Config Section */}
          <div className="flex justify-between gap-6 mt-10">
            <Monitorheader
              name="What to monitor"
              description="Configure the target website you want to monitor. You'll find the advanced configuration below, in the advanced settings section."
            />
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm w-full max-w-xl">
              <div className="mb-4">
                <label className="text-xs font-medium mb-1 block text-gray-700">
                  Alert us when{" "}
                  <span className="bg-gray-100 text-xs rounded px-2 py-0.5 ml-1 text-gray-700">
                    Billable
                  </span>
                </label>
                <select
                  className="bg-white text-gray-900 px-4 py-2 rounded w-1/2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                  name="alertType"
                  value={formData.alertType}
                  onChange={handleChange}
                  defaultValue="unavailable"
                >
                  <option value="unavailable">URL becomes unavailable</option>
                  <option value="not_contains_keyword">
                    URL doesn't contain keyword
                  </option>
                  <option value="contains_keyword">
                    URL contains a keyword
                  </option>
                  <option value="http_status_other">
                    URL returns HTTP status other than
                  </option>
                  <option value="ping_failed">
                    Host doesn't respond to ping
                  </option>
                </select>
                <p className="text-xs w-1/2 text-gray-600 mt-3">
                  We recommend the keyword matching method.{" "}
                  <a href="#" className="text-yellow-600 hover:text-yellow-700 underline">
                    Upgrade your account
                  </a>{" "}
                  to enable more options.
                </p>
              </div>
              <div className="border-t border-gray-200 my-4"></div>

              <div>
                <label className="text-xs font-medium mb-3 block text-gray-700">
                  URL to monitor
                </label>
                <input
                  type="text"
                  placeholder="https://"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className="bg-white text-gray-900 px-4 py-2 rounded w-full border border-gray-300"
                />
                <p className="text-xs text-gray-600 mt-3">
                  You can import multiple monitors{" "}
                  <a href="#" className="text-yellow-600 hover:text-yellow-700 underline">
                    here
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* On-call Escalation Section */}
          <div className="flex justify-between gap-10">
            <Monitorheader
              name="On-call escalation"
              description="Set up rules for who's going to be notified and how when an incident occurs."
            />
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm w-full max-w-xl">
              <div className="mb-4">
                <label className="text-xs font-medium mb-1 block text-gray-700">
                  When there's a new incident
                </label>
                <div className="flex gap-10 pt-3 text-gray-700">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="call"
                      checked={formData.notify.call}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-yellow-600 bg-white border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                    />
                    Call
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="sms"
                      checked={formData.notify.sms}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-yellow-600 bg-white border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                    />
                    SMS
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="email"
                      checked={formData.notify.email}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-yellow-600 bg-white border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                    />
                    Email
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="push"
                      checked={formData.notify.push}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-yellow-600 bg-white border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                    />
                    Push Notification
                  </label>
                </div>
                <p className="text-xs w-1/2 text-gray-600 mt-3">
                  the{" "}
                  <a href="#" className="text-yellow-600 hover:text-yellow-700 underline">
                    current on-call person
                  </a>
                  .
                </p>
              </div>
              <div className="border-t border-gray-200 my-6"></div>

              <div>
                <label className="text-xs font-medium mb-3 block text-gray-700">
                  If the on-call person doesn't acknowledge the incident
                </label>
                <select
                  className="bg-white text-gray-900 px-4 py-2 rounded w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                  defaultValue="unavailable"
                  name="escalationPolicy"
                  value={formData.escalationPolicy}
                  onChange={handleChange}
                >
                  <option value="none">Do nothing</option>
                  <option value="immediate">
                    Immediately alert all other team members
                  </option>
                  <option value="3min">
                    Within 3 minutes, alert all other team members
                  </option>
                  <option value="5min">
                    Within 5 minutes, alert all other team members
                  </option>
                  <option value="10min">
                    Within 10 minutes, alert all other team members
                  </option>
                </select>
                <p className="text-xs text-gray-600 mt-3">
                  Set up an advanced escalation policy and let responders choose
                  how they want{" "}
                  <a href="#" className="text-yellow-600 hover:text-yellow-700 underline">
                    to be notified.
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Button Section - Fixed positioning */}
          <div className="flex justify-center mt-8 mb-8">
            <Button
              size="md"
              type="button"
              variant="terteary"
              className="py-2 px-6"
              onClick={handleSubmit}
            >
              Create Monitor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
