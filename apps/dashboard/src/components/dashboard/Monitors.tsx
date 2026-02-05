import { Button } from "@repo/ui/button";
import { DashBoardHeader } from "@repo/ui/DashboardHeader";
import { MonitorItem } from "./MonitorItem";
import { useNavigate } from "react-router-dom";
import { useGetwebsitesQuery, useDeleteWebsiteMutation } from "../../redux/api/authApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { setWebsites } from "../../redux/slice/webSlice";

export const Monitors = () => {
  const { websites: monitors } = useAppSelector((state) => state.website);
  console.log(monitors, "monitorsmonitors");

  const { data: websitesData, isLoading, error } = useGetwebsitesQuery();
  const [deleteWebsite] = useDeleteWebsiteMutation();
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; url: string } | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore
    if (websitesData?.websites?.[0]?.websites) {
      // @ts-ignore
      const fetchedMonitors = websitesData.websites[0].websites;
      dispatch(setWebsites({ websites: fetchedMonitors }));
    }
  }, [websitesData, dispatch]);

  function handlenavigate() {
    navigate("/dashboard/createmonitor");
  }

  const handleDeleteClick = (id: string, url: string) => {
    setDeleteConfirm({ id, url });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    
    try {
      await deleteWebsite(deleteConfirm.id).unwrap();
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Failed to delete website:", error);
      alert("Failed to delete website. Please try again.");
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#0d1117]">
      <div className="max-w-7xl mx-auto mt-10 px-10 sm:px-6 lg:px-8 py-8">
        <DashBoardHeader
          children={"Monitors"}
          showButton={true}
          handlenavigate={handlenavigate}
          className="py-2"
        />
        <div className="mt-10">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading monitors...</p>
            </div>
          ) : monitors?.length === 0 ? (
            <div>
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
              {monitors?.map((monitor: any, key: any) => {
                // Get the latest status from websiteStatus array
                const latestStatus = monitor.websiteStatus?.[monitor.websiteStatus.length - 1];
                const isUp = latestStatus?.statusCheck === "Up";
                const status = isUp ? "up" : "down";
                
                // Calculate uptime
                let uptimeText = "N/A";
                if (monitor.uptime) {
                  const uptimeDate = new Date(monitor.uptime);
                  const diffMs = Date.now() - uptimeDate.getTime();
                  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                  
                  if (diffDays > 0) {
                    uptimeText = `${diffDays} day${diffDays > 1 ? 's' : ''}`;
                  } else if (diffHours > 0) {
                    uptimeText = `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
                  } else {
                    uptimeText = "< 1 hour";
                  }
                }

                const handleClick = () => {
                  console.log(`Monitor clicked: ${monitor}`);
                  navigate(`/dashboard/monitor/${monitor.id}`);
                };
                return (
                  <MonitorItem
                    key={key}
                    name={monitor.url}
                    url={monitor.url}
                    status={status}
                    uptime={isUp ? `Up for ${uptimeText}` : "Down"}
                    lastChecked="5 minutes ago"
                    onClick={handleClick}
                    onDelete={() => handleDeleteClick(monitor.id, monitor.url)}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-white mb-4">Delete Monitor</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete monitoring for <span className="font-semibold">{deleteConfirm.url}</span>? 
                This action cannot be undone and will remove all historical data.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
