import { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  createdAt: string;
}

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/users/all");
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="h-screen overflow-y-auto bg-white">
      <div className="max-w-7xl mx-auto mt-10 px-10 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          </div>
          <div className="text-sm text-gray-600">
            Total: <span className="font-semibold text-gray-900">{users.length}</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No users yet</h3>
            <p className="text-gray-600">No users have signed up yet.</p>
          </div>
        ) : (
          <div className="space-y-0">
            {/* Table Header */}
            <div className="bg-gray-50 border border-gray-200 rounded-t-lg px-6 py-3 grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Email</div>
              <div className="col-span-4">Joined Date</div>
              <div className="col-span-2 text-right">Time Ago</div>
            </div>

            {/* User Items */}
            <div className="border-x border-b border-gray-200 rounded-b-lg divide-y divide-gray-200 bg-white">
              {users.map((user, index) => (
                <div
                  key={user.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors grid grid-cols-12 gap-4 items-center"
                >
                  {/* Index */}
                  <div className="col-span-1">
                    <span className="text-gray-500 font-medium">{index + 1}</span>
                  </div>

                  {/* Email */}
                  <div className="col-span-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-medium">{user.email}</h3>
                        <p className="text-gray-500 text-xs">ID: {user.id}</p>
                      </div>
                    </div>
                  </div>

                  {/* Joined Date */}
                  <div className="col-span-4">
                    <p className="text-gray-600 text-sm">{formatDate(user.createdAt)}</p>
                  </div>

                  {/* Time Ago Badge */}
                  <div className="col-span-2 text-right">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                      {getTimeAgo(user.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
