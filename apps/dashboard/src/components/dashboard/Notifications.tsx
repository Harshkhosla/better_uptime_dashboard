import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashBoardHeader } from "@repo/ui/DashboardHeader";

interface Notification {
  id: string;
  websiteId: string;
  websiteUrl: string;
  type: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/api/v1/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const formatDateTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="h-screen overflow-y-auto bg-white">
      <div className="max-w-7xl mx-auto mt-10 px-10 sm:px-6 lg:px-8 py-8">
        <DashBoardHeader children="Notifications" showButton={false} className="py-2" />

        <div className="mt-8">
          {loading ? (
            <div className="text-center py-12 text-gray-600">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No notifications</h3>
              <p className="text-gray-600">You're all caught up! No down alerts at the moment.</p>
            </div>
          ) : (
            <div className="space-y-0">
              {/* Header */}
              <div className="bg-gray-50 border border-gray-200 rounded-t-lg px-6 py-3 grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
                <div className="col-span-6">Website</div>
                <div className="col-span-4">Detected at</div>
                <div className="col-span-2 text-right">Status</div>
              </div>

              {/* Notification Items */}
              <div className="border-x border-b border-gray-200 rounded-b-lg divide-y divide-gray-200 bg-white">
                {notifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    onClick={() => navigate(`/dashboard/monitor/${notification.websiteId}`)}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer grid grid-cols-12 gap-4 items-center"
                  >
                    {/* Website URL */}
                    <div className="col-span-6 flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      <div>
                        <h3 className="text-gray-900 font-medium">{notification.websiteUrl}</h3>
                        <p className="text-red-400 text-sm mt-0.5">Website is down</p>
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className="col-span-4">
                      <p className="text-gray-600 text-sm">
                        {formatDateTime(notification.timestamp)}
                      </p>
                    </div>

                    {/* Time Ago */}
                    <div className="col-span-2 text-right">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-200">
                        {getTimeAgo(notification.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
