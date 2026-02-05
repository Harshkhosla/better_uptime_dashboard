type Status = "up" | "down" | "warning";
const StatusIndicator = ({ status = "up" }: { status?: Status }) => {
  const statusClasses = {
    up: "bg-green-500",
    down: "bg-red-500",
    warning: "bg-yellow-500",
  };
  return (
    <div
      className={`w-2 h-2 rounded-full ${statusClasses[status]} flex-shrink-0`}
    />
  );
};

export const MonitorItem = ({
  name,
  url,
  status,
  uptime,
  lastChecked,
  onClick,
  onDelete,
}: any) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent onClick from firing
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <StatusIndicator status={status} />
          <div>
            <h3 className="text-gray-900 font-medium">{name}</h3>
            <p className="text-gray-600 text-sm">{url}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span>{lastChecked}</span>
            </div>
            <p className="text-gray-700 text-sm mt-1">{uptime}</p>
          </div>
          {onDelete && (
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-600 transition-colors p-2"
              title="Delete monitor"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
