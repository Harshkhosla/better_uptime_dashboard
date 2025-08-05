import { Button } from "@repo/ui/button";
import { DashBoardHeader } from "@repo/ui/DashboardHeader";
import { MonitorItem } from "./MonitorItem";
import { useNavigate } from "react-router-dom";
import { useGetwebsitesQuery } from "../../redux/api/authApi";

export const Monitors = () => {
  const { data: websitesData, isLoading, error } = useGetwebsitesQuery();
  // @ts-ignore
  const monitors = websitesData?.websites[0]?.websites;
  const navigate = useNavigate();
  function handlenavigate() {
    navigate("/dashboard/createmonitor");
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto mt-10 px-10 sm:px-6 lg:px-8 py-8">
        <DashBoardHeader
          children={"Monitors"}
          showButton={true}
          handlenavigate={handlenavigate}
          className="py-2"
        />
        <div className="mt-10">
          {monitors?.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-12 h-12 text-gray-500 mx-auto mb-4"
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
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                No monitors yet
              </h3>
              <p className="text-gray-500 mb-6">
                Get started by creating your first monitor to track website
                uptime.
              </p>
              <Button
                variant="primary"
                className="bg-blue-600 hover:bg-blue-700 text-white border-0"
              >
                Create Your First Monitor
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {monitors?.map((monitor: any) => (
                <MonitorItem
                  key={monitor.id}
                  name={monitor.name}
                  url={monitor.url}
                  status={monitor.status}
                  uptime={monitor.uptime}
                  lastChecked={monitor.lastChecked}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
