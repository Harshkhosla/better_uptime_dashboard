import { useGetwebsitesQuery } from "../../redux/api/authApi";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts";

export const Analytics = () => {
  const { data: websitesData, isLoading, error } = useGetwebsitesQuery({});

  if (isLoading) return <div className="text-gray-900 p-8">Loading analytics...</div>;
  if (error) return <div className="text-red-500 p-8">Failed to load analytics data.</div>;

  const websites = websitesData?.websites || [];

  // Calculate metrics
  const totalWebsites = websites.length;
  const upWebsites = websites.filter((w: any) => {
    const latestStatus = w.websiteStatus?.[0];
    return latestStatus?.statusCheck === "Up";
  }).length;
  const downWebsites = totalWebsites - upWebsites;
  const totalIncidents = websites.reduce((sum: number, w: any) => sum + (w.incident || 0), 0);
  const uptimePercentage = totalWebsites > 0 ? ((upWebsites / totalWebsites) * 100).toFixed(2) : "0";

  // Average response time
  const avgResponseTime = websites.reduce((sum: number, w: any) => {
    const latestStatus = w.websiteStatus?.[0];
    return sum + (latestStatus?.responseTime || 0);
  }, 0) / (totalWebsites || 1);

  // Status distribution for pie chart
  const statusData = [
    { name: "Up", value: upWebsites, color: "#16a34a" },
    { name: "Down", value: downWebsites, color: "#dc2626" },
  ];

  // Incidents by website
  const incidentData = websites
    .map((w: any) => ({
      name: new URL(w.url).hostname,
      incidents: w.incident || 0,
    }))
    .sort((a, b) => b.incidents - a.incidents)
    .slice(0, 10);

  // Response time by website
  const responseData = websites
    .map((w: any) => ({
      name: new URL(w.url).hostname,
      responseTime: w.websiteStatus?.[0]?.responseTime || 0,
    }))
    .filter((d) => d.responseTime > 0)
    .slice(0, 10);

  return (
    <div className="h-screen overflow-y-auto bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">Monitor performance and uptime statistics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600">Overall Uptime</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{uptimePercentage}%</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600">Total Websites</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalWebsites}</p>
            <p className="text-xs text-gray-500 mt-1">{upWebsites} up, {downWebsites} down</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600">Total Incidents</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">{totalIncidents}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600">Avg Response Time</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{Math.round(avgResponseTime)}ms</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Status Distribution */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Status Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Incidents by Website */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Incidents by Website</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incidentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="incidents" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Response Time Chart */}
        {responseData.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Response Time by Website</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis unit="ms" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="responseTime" stroke="#3b82f6" strokeWidth={2} name="Response Time (ms)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Website List with Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Website Performance</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incidents</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {websites.map((website: any) => {
                  const latestStatus = website.websiteStatus?.[0];
                  const isUp = latestStatus?.statusCheck === "Up";
                  return (
                    <tr key={website.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new URL(website.url).hostname}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${isUp ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {isUp ? 'Up' : 'Down'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{latestStatus?.responseTime || 0}ms</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{website.incident || 0}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
