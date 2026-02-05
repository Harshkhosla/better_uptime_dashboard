import { Button } from "@repo/ui/button";
import { DashBoardHeader } from "@repo/ui/DashboardHeader";
import { MonitorItem } from "./MonitorItem";
import { useNavigate } from "react-router-dom";
import { useGetwebsitesQuery, useDeleteWebsiteMutation } from "../../redux/api/authApi";
import { useState } from "react";

export const Monitors = () => {
  const { data: websitesData, isLoading, error, refetch } = useGetwebsitesQuery();
  const [deleteWebsite] = useDeleteWebsiteMutation();
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; url: string } | null>(null);
  const navigate = useNavigate();

  // Get monitors directly from the query data
  const monitors = websitesData?.websites || [];
  
  console.log("Monitors data:", monitors);
  console.log("Loading:", isLoading);
  console.log("Error:", error);

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
      refetch(); // Refresh the list
    } catch (error) {
      console.error("Failed to delete website:", error);
      alert("Failed to delete website. Please try again.");
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-white">
      <div className="max-w-7xl mx-auto mt-10 px-10 sm:px-6 lg:px-8 py-8">
        <DashBoardHeader
          children={"Monitors"}
          showButton={true}
          handlenavigate={handlenavigate}
          className="py-2"
        />
        <div className="mt-10">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800">Error loading monitors. Please try refreshing the page.</p>
            </div>
          )}
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading monitors...</p>
            </div>
          ) : !monitors || monitors.length === 0 ? (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No monitors yet
              </h3>
              <p className="text-gray-500 mb-6">
                Get started by creating your first monitor to track website
                uptime.
              </p>
              <Button
                variant="primary"
                className="bg-black hover:bg-yellow-600 text-white border-0"
                onClick={handlenavigate}
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
            <div className="bg-white border border-gray-300 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Delete Monitor</h3>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete monitoring for <span className="font-semibold">{deleteConfirm.url}</span>? 
                This action cannot be undone and will remove all historical data.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-black hover:bg-yellow-600 text-white rounded transition-all duration-200"
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
