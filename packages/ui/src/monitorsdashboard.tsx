import { type JSX } from "react";
import { Monitorheader } from "./monitorheader";

export function Monitorsdashboard({
  children,
  className,
  onChange,
  value,
}: {
  children: React.ReactNode;
  className?: string;
  onChange?: any;
  value?: string;
}): JSX.Element {
  return (
    <>
      <div className=" bg-dark-900 p-6 rounded-lg border border-gray-700">
        <div className="mb-4">
          <label className="text-xs font-medium mb-1 block">
            Alert us when{" "}
            <span className="bg-gray-800 text-xs rounded px-2 py-0.5 ml-1">
              Billable
            </span>
          </label>
          <select
            className="bg-dark-800 text-white px-4 py-2 rounded w-1/2 border border-gray-600"
            defaultValue="unavailable"
          >
            <option value="unavailable">URL becomes unavailable</option>
          </select>
          <p className="text-xs w-1/2 text-gray-500 mt-3">
            We recommend the keyword matching method.{" "}
            <a href="#" className="text-purple-400 underline">
              Upgrade your account
            </a>{" "}
            to enable more options.
          </p>
        </div>

        <div>
          <label className="text-xs font-medium mb-3 block">
            URL to monitor
          </label>
          <input
            type="text"
            placeholder="https://"
            value={value}
            onChange={onChange}
            className="bg-dark-800 text-white px-4 py-2 rounded w-full border border-gray-600"
          />
          <p className="text-xs text-gray-500 mt-3">
            You can import multiple monitors{" "}
            <a href="#" className="text-purple-400 underline">
              here
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
