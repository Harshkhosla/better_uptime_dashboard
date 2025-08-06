import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface ResponseData {
  timestamp: string;
  responseTime: number;
  statusCheck: string;
}

const ResponseTimeChart = ({
  websitedata,
}: {
  websitedata: ResponseData[];
}) => {
  const formattedData = websitedata?.map((entry, index) => ({
    time: new Date(entry.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    responseTime: entry.responseTime || Math.random() * 200, // just for testing
    status: entry.statusCheck,
  }));

  console.log(websitedata, "dsfkvjdsv");
  return (
    <div className="mt-10 bg-[#161b22] p-6 rounded-xl border border-gray-700">
      <h2 className="text-xl font-semibold text-white mb-4">Response times</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d333b" />
          <XAxis dataKey="time" stroke="#c9d1d9" />
          <YAxis stroke="#c9d1d9" unit="ms" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0d1117",
              borderColor: "#30363d",
            }}
            labelStyle={{ color: "#c9d1d9" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="responseTime"
            stroke="#4c8eda"
            strokeWidth={2}
            name="Response Time"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Optional: Day/Week/Month toggle buttons */}
      <div className="flex justify-end space-x-4 mt-4 text-sm">
        <button className="px-4 py-1 bg-gray-800 text-white rounded hover:bg-gray-700">
          Day
        </button>
        <button className="px-4 py-1 bg-gray-800 text-white rounded hover:bg-gray-700">
          Week
        </button>
        <button className="px-4 py-1 bg-gray-800 text-white rounded hover:bg-gray-700">
          Month
        </button>
      </div>
    </div>
  );
};

export default ResponseTimeChart;
