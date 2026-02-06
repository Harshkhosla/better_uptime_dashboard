import { BarChart3, Users, Globe, Shield, Zap, Settings, Brain, TrendingUp } from "lucide-react";
import FeatureCard from "./FeatureCard";

function FeaturesSection() {
  const features = [
    {
      title: "AI Auto-Resolution",
      description:
        "AI agent automatically diagnoses and fixes issues. Self-healing infrastructure with 95% auto-resolution rate.",
      icon: <Brain className="w-4 h-4" />,
      iconText: "Resolves incidents in under 2 minutes",
    },
    {
      title: "Tracing",
      description:
        'Explore with "bubble up" Investigate slow requests visually with drag & drop to find root cause.',
      icon: <BarChart3 className="w-4 h-4" />,
      iconText: "Instrument clusters with OpenTelemetry with no code change",
    },
    {
      title: "Incident Management",
      description:
        "Slack-based incident management Get the right team members involved with powerful templated workflows.",
      icon: <Users className="w-4 h-4" />,
      iconText: "AI incident silencing & smart incident merging",
    },
    {
      title: "Uptime Monitoring",
      description:
        "Screenshots for errors We record the API errors and take a screenshot of your app being down.",
      icon: <Globe className="w-4 h-4" />,
      iconText: "Playwright-based transaction checks",
    },
    {
      title: "Log Management",
      description:
        "Store logs in your own S3 bucket Store all your logs in your own cloud. Stay compliant & in control.",
      icon: <Shield className="w-4 h-4" />,
      iconText: "Up to 1 billion log lines per second",
    },
    {
      title: "Infrastructure Monitoring",
      description:
        "Anomaly detection alerts Trigger alerts in real-time based on anomalies in logs and metrics.",
      icon: <Zap className="w-4 h-4" />,
      iconText: "Query with Drag & drop, SQL or PromQL",
    },
    {
      title: "Status Page",
      description:
        "Branded page on your own sub-domain Beautifully designed status page. Fully customizable.",
      icon: <Settings className="w-4 h-4" />,
      iconText: "Translated into any language",
    },
    {
      title: "Cost Optimization",
      description:
        "AI-powered resource allocation reduces infrastructure costs by up to 70% while maintaining peak performance.",
      icon: <TrendingUp className="w-4 h-4" />,
      iconText: "Pay only for what you use with auto-scaling",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white -z-10"></div>
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Everything you need to{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            monitor and maintain
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive monitoring suite powered by AI to keep your services running flawlessly
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            iconText={feature.iconText}
          />
        ))}
      </div>
    </div>
  );
}

export default FeaturesSection;
