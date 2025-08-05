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
}: any) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <StatusIndicator status={status} />
          <div>
            <h3 className="text-white font-medium">{name}</h3>
            <p className="text-gray-400 text-sm">{url}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
            <span>{lastChecked}</span>
          </div>
          <p className="text-gray-300 text-sm mt-1">{uptime}</p>
        </div>
      </div>
    </div>
  );
};
