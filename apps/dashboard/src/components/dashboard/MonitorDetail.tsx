import { useGetwebsitebyIdQuery, useDeleteWebsiteMutation } from "../../redux/api/authApi";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import ResponseTimeChart from "./chart";
import { useState } from "react";

function getUptimeString(uptime: string | Date | null, isUp: boolean): string {
  if (!isUp) return "Down";
  if (!uptime) return "Uptime not available";

  const now = new Date();
  const start = new Date(uptime);
  const diffMs = now.getTime() - start.getTime();

  // If negative time (future date), return 0
  if (diffMs < 0) return "Just started";

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  let result = "";
  if (days > 0) result += `${days} day${days > 1 ? "s" : ""} `;
  if (hours > 0) result += `${hours} hour${hours > 1 ? "s" : ""} `;
  if (minutes > 0) result += `${minutes} min${minutes > 1 ? "s" : ""} `;
  if (seconds >= 0 && days === 0) result += `${seconds} sec${seconds !== 1 ? "s" : ""}`;

  return result.trim() || "Just started";
}

export const MonitorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    data: websiteData,
    isLoading,
    error,
  } = useGetwebsitebyIdQuery({ websiteId: id! });

  const [deleteWebsite, { isLoading: isDeleting }] = useDeleteWebsiteMutation();

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      await deleteWebsite(id).unwrap();
      navigate("/dashboard/monitors");
    } catch (error) {
      console.error("Failed to delete website:", error);
      alert("Failed to delete website. Please try again.");
    }
  };

  const data = websiteData?.websiteStatus.filter((data: any) => {
    console.log(data.statusCheck, "sdvvsdsv");
  });

  console.log(data, "sampldata");
  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error)
    return <div className="text-red-500">Failed to load monitor data.</div>;
  
  // Get the latest status from websiteStatus array
  const latestStatus = websiteData?.websiteStatus?.[websiteData.websiteStatus.length - 1];
  const isUp = latestStatus?.statusCheck === "Up";
  
  let uptime;
  if (websiteData) {
    uptime = getUptimeString(websiteData?.uptime, isUp);
  }
  
  return (
    <div className="h-screen overflow-y-auto bg-white">
      <div className="max-w-7xl mx-auto mt-10 px-10 sm:px-6 lg:px-8 py-8">
        {/* Status Header */}
        <div className="flex items-center space-x-4 pb-16">
          {isUp ? (
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
        ) : (
          <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
        )}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{websiteData?.url}</h1>
          <p
            className={`${isUp ? "text-green-600" : "text-red-600"} text-sm font-medium`}
          >
            {isUp ? "Up" : "Down"} · Checked every {websiteData?.checkInterval || 5}{" "}
            {websiteData?.checkInterval === 1 ? "minute" : "minutes"}
          </p>
        </div>
        <div className="ml-auto flex items-center space-x-4 text-sm mt-14 text-gray-600">
          <button className="hover:underline hover:text-gray-900">Send test alert</button>
          <button className="hover:underline hover:text-gray-900">Incidents</button>
          <button className="hover:underline hover:text-gray-900">Pause</button>
          <button className="hover:underline hover:text-gray-900">Configure</button>
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="hover:underline text-red-600 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-300 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Delete Monitor</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete monitoring for <span className="font-semibold">{websiteData?.url}</span>? 
              This action cannot be undone and will remove all historical data.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600">{isUp ? "Currently up for" : "Status"}</p>
          <p className={`text-xl font-bold ${isUp ? "text-green-600" : "text-red-600"}`}>{uptime}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600">Last checked at</p>
          <p className="text-xl font-bold text-gray-900">5 minutes ago</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600">Incidents</p>
          <p className="text-xl font-bold text-gray-900">{websiteData?.incident}</p>
        </div>
      </div>
      <ResponseTimeChart websitedata={websiteData?.websiteStatus} />
      </div>
    </div>
  );
};
