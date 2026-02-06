import { TrendingUp, Clock, DollarSign, Zap, Users, Shield } from "lucide-react";

function StatsSection() {
  const stats = [
    {
      icon: <Shield className="w-8 h-8" />,
      value: "99.99%",
      label: "Uptime Guarantee",
      description: "Industry-leading SLA",
      color: "green"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: "< 2min",
      label: "Mean Time to Resolution",
      description: "95% auto-resolved",
      color: "blue"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      value: "70%",
      label: "Cost Reduction",
      description: "vs traditional tools",
      color: "purple"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: "< 1s",
      label: "Detection Time",
      description: "Real-time monitoring",
      color: "yellow"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "95%",
      label: "Auto-Resolution Rate",
      description: "AI-powered fixes",
      color: "indigo"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, {bg: string, text: string, glow: string}> = {
      green: {
        bg: "bg-green-500",
        text: "text-green-600",
        glow: "shadow-green-500/20"
      },
      blue: {
        bg: "bg-blue-500",
        text: "text-blue-600",
        glow: "shadow-blue-500/20"
      },
      purple: {
        bg: "bg-purple-500",
        text: "text-purple-600",
        glow: "shadow-purple-500/20"
      },
      yellow: {
        bg: "bg-yellow-500",
        text: "text-yellow-600",
        glow: "shadow-yellow-500/20"
      },
      pink: {
        bg: "bg-pink-500",
        text: "text-pink-600",
        glow: "shadow-pink-500/20"
      },
      indigo: {
        bg: "bg-indigo-500",
        text: "text-indigo-600",
        glow: "shadow-indigo-500/20"
      }
    };
    return colors[color];
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>📈</span>
          <span>Platform Capabilities</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Numbers That{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Speak for Themselves
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Enterprise-grade performance metrics for your monitoring needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, index) => {
            const colors = getColorClasses(stat.color);
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg ${colors.glow} hover:shadow-xl transition-all duration-300 border border-gray-100 group`}
              >
                <div className={`w-16 h-16 rounded-xl ${colors.bg} bg-opacity-10 flex items-center justify-center mb-6 ${colors.text} group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-700">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-500">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Context */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-md border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1M+</div>
              <div className="text-gray-600">Checks Per Hour</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">150+</div>
              <div className="text-gray-600">Global Monitoring Regions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">AI-Powered Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsSection;
