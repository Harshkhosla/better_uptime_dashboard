import { useGetwebsitebyIdQuery } from "../../redux/api/authApi";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import ResponseTimeChart from "./chart";

function getUptimeString(uptime: string | Date | null): string {
  if (!uptime) return "Uptime not available";

  const now = new Date();
  const start = new Date(uptime);
  const diffMs = now.getTime() - start.getTime();

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  let result = "";
  if (days > 0) result += `${days} day${days > 1 ? "s" : ""} `;
  if (hours > 0) result += `${hours} hour${hours > 1 ? "s" : ""} `;
  if (minutes > 0) result += `${minutes} min${minutes > 1 ? "s" : ""} `;
  if (seconds >= 0) result += `${seconds} sec${seconds !== 1 ? "s" : ""}`;

  return result.trim();
}

export const MonitorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    data: websiteData,
    isLoading,
    error,
  } = useGetwebsitebyIdQuery({ websiteId: id! });

  const data = websiteData?.websiteStatus.filter((data: any) => {
    console.log(data.statusCheck, "sdvvsdsv");
  });

  console.log(data, "sampldata");
  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error)
    return <div className="text-red-500">Failed to load monitor data.</div>;
  let uptime;
  if (websiteData) {
    uptime = getUptimeString(websiteData?.uptime);
  }
  return (
    <div className="max-w-7xl mx-auto mt-10 px-10 sm:px-6 lg:px-8 py-8">
      {/* Status Header */}
      <div className="flex items-center space-x-4 pb-16">
        {websiteData?.websiteStatus?.[0]?.statusCheck === "UP" ? (
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
        ) : (
          <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
        )}
        {/* <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" /> */}
        <div>
          <h1 className="text-2xl font-semibold">{websiteData?.url}</h1>
          <p
            className={` ${websiteData?.websiteStatus?.[0]?.statusCheck === "UP" ? "text-green-400" : "text-red-500"}  text-sm `}
          >
            {websiteData?.websiteStatus?.[0]?.statusCheck} · Checked every 5
            minutes
          </p>
        </div>
        <div className="ml-auto flex items-center space-x-4 text-sm mt-14 text-gray-400">
          <button className="hover:underline">Send test alert</button>
          <button className="hover:underline">Incidents</button>
          <button className="hover:underline">Pause</button>
          <button className="hover:underline">Configure</button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#161b22] p-4 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400">Currently up for</p>
          <p className="text-xl font-bold">{uptime}</p>
        </div>
        <div className="bg-[#161b22] p-4 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400">Last checked at</p>
          <p className="text-xl font-bold">5 minutes ago</p>
        </div>
        <div className="bg-[#161b22] p-4 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400">Incidents</p>
          <p className="text-xl font-bold">{websiteData?.incident}</p>
        </div>
      </div>
      <ResponseTimeChart websitedata={websiteData?.websiteStatus} />
    </div>
  );
};
