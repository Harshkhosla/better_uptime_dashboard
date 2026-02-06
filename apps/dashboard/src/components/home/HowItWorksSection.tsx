import { Bell, Brain, Wrench, CheckCircle } from "lucide-react";

function HowItWorksSection() {
  const steps = [
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Detect",
      description: "AI monitors your infrastructure 24/7, detecting anomalies in milliseconds",
      color: "blue",
      stat: "<1s",
      statLabel: "Detection time"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Analyze",
      description: "ML algorithms identify root cause across your entire stack instantly",
      color: "purple",
      stat: "99%",
      statLabel: "Accuracy"
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Resolve",
      description: "Automated fixes applied immediately—restart services, scale resources, clear caches",
      color: "yellow",
      stat: "95%",
      statLabel: "Auto-resolved"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Report",
      description: "Get detailed incident reports and preventive recommendations",
      color: "green",
      stat: "<2min",
      statLabel: "MTTR"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, {bg: string, text: string, border: string, gradient: string}> = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
        gradient: "from-blue-500 to-blue-600"
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        border: "border-purple-200",
        gradient: "from-purple-500 to-purple-600"
      },
      yellow: {
        bg: "bg-yellow-50",
        text: "text-yellow-600",
        border: "border-yellow-200",
        gradient: "from-yellow-500 to-yellow-600"
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
        border: "border-green-200",
        gradient: "from-green-500 to-green-600"
      }
    };
    return colors[color];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <span>⚡</span>
          <span>How It Works</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          From Detection to{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Resolution
          </span>{" "}
          in Seconds
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our AI agent works around the clock to keep your applications running smoothly
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connecting Line - Hidden on mobile */}
        <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-yellow-200 to-green-200 z-0"></div>

        {steps.map((step, index) => {
          const colors = getColorClasses(step.color);
          return (
            <div key={index} className="relative z-10">
              {/* Step Number */}
              <div className="flex items-center justify-center mb-6">
                <div className={`w-16 h-16 rounded-full ${colors.bg} border-4 border-white shadow-lg flex items-center justify-center ${colors.text} relative`}>
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center text-sm font-bold text-gray-700">
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4 min-h-[60px]">
                  {step.description}
                </p>

                {/* Stat */}
                <div className={`inline-block ${colors.bg} ${colors.text} px-4 py-2 rounded-lg border ${colors.border}`}>
                  <div className="text-2xl font-bold">{step.stat}</div>
                  <div className="text-xs opacity-75">{step.statLabel}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            See it in action
          </h3>
          <p className="text-gray-600 mb-6">
            Experience the power of AI-driven incident resolution. Start monitoring in under 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200">
              Start Free Trial
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-all duration-200 border border-gray-300">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorksSection;
