import { Check, X } from "lucide-react";

function ComparisonSection() {
  const features = [
    {
      name: "AI Auto-Resolution",
      us: true,
      traditional: false,
      highlight: true
    },
    {
      name: "99.99% Uptime SLA",
      us: true,
      traditional: "99.5%"
    },
    {
      name: "Average Resolution Time",
      us: "< 2 minutes",
      traditional: "30-45 minutes"
    },
    {
      name: "Monthly Cost (10 services)",
      us: "$99",
      traditional: "$299-599",
      highlight: true
    },
    {
      name: "Setup Time",
      us: "< 30 minutes",
      traditional: "2-4 hours"
    },
    {
      name: "Predictive Maintenance",
      us: true,
      traditional: false
    },
    {
      name: "Root Cause Analysis",
      us: "AI-powered",
      traditional: "Manual"
    },
    {
      name: "Multi-region Redundancy",
      us: true,
      traditional: "Add-on"
    },
    {
      name: "Alert Fatigue Reduction",
      us: "90%",
      traditional: "None"
    },
    {
      name: "Custom Integrations",
      us: "Unlimited",
      traditional: "Limited"
    },
    {
      name: "Support Response",
      us: "< 1 hour",
      traditional: "24-48 hours"
    },
    {
      name: "Free Trial",
      us: "14 days",
      traditional: "7 days"
    }
  ];

  const renderValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-4 h-4 text-green-600" />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
            <X className="w-4 h-4 text-red-600" />
          </div>
        </div>
      );
    }
    return <span className="text-gray-900 font-medium">{value}</span>;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <span>📊</span>
          <span>Side-by-Side Comparison</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Why Switch to{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Better Uptime?
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          See how we stack up against traditional monitoring solutions
        </p>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
          <div className="p-6"></div>
          <div className="p-6 text-center border-x border-gray-200">
            <div className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold text-lg mb-2">
              Our Platform
            </div>
            <div className="text-sm text-gray-600">AI-Powered Monitoring</div>
          </div>
          <div className="p-6 text-center">
            <div className="inline-block bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold text-lg mb-2">
              Traditional Tools
            </div>
            <div className="text-sm text-gray-600">Legacy Monitoring</div>
          </div>
        </div>

        {features.map((feature, index) => (
          <div
            key={index}
            className={`grid grid-cols-3 border-b border-gray-100 ${
              feature.highlight ? "bg-yellow-50" : ""
            }`}
          >
            <div className="p-4 font-medium text-gray-900 flex items-center">
              {feature.name}
              {feature.highlight && (
                <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                  Key
                </span>
              )}
            </div>
            <div className="p-4 text-center border-x border-gray-100 flex items-center justify-center">
              {renderValue(feature.us)}
            </div>
            <div className="p-4 text-center flex items-center justify-center text-gray-600">
              {renderValue(feature.traditional)}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-md overflow-hidden border ${
              feature.highlight ? "border-yellow-300" : "border-gray-200"
            }`}
          >
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">{feature.name}</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Our Platform</span>
                {renderValue(feature.us)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Traditional</span>
                {renderValue(feature.traditional)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-3">
          Ready to experience the difference?
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Join thousands of teams that made the switch and never looked back.
          Start your free trial today.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg shadow-yellow-500/30">
          Start Free 14-Day Trial
        </button>
        <p className="text-gray-400 text-sm mt-4">
          No credit card required • Full access • Cancel anytime
        </p>
      </div>
    </div>
  );
}

export default ComparisonSection;
