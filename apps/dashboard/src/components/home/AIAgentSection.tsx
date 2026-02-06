import { Sparkles, Brain, Zap, TrendingDown } from "lucide-react";

function AIAgentSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-50 via-white to-yellow-50 -z-10 rounded-3xl"></div>
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Intelligence</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          AI Agent That{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Resolves Issues
          </span>{" "}
          Automatically
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our intelligent AI agent doesn't just detect problems—it fixes them.
          Automatic incident resolution, root cause analysis, and predictive
          maintenance keep your services running 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Auto-Resolution Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
            <Brain className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Auto-Resolution
          </h3>
          <p className="text-gray-600 text-sm">
            AI automatically diagnoses and fixes common issues like service
            restarts, cache clearing, and scaling adjustments without human
            intervention.
          </p>
          <div className="mt-4 text-yellow-600 font-medium text-sm">
            95% issues resolved automatically
          </div>
        </div>

        {/* Intelligent Routing Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Instant Response
          </h3>
          <p className="text-gray-600 text-sm">
            Sub-second detection and response times. AI agent acts immediately
            when anomalies are detected, preventing downtime before it happens.
          </p>
          <div className="mt-4 text-blue-600 font-medium text-sm">
            {'<'}1s average response time
          </div>
        </div>

        {/* Root Cause Analysis Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Root Cause Analysis
          </h3>
          <p className="text-gray-600 text-sm">
            ML-powered analysis traces issues across your entire stack, from
            frontend to database, pinpointing the exact cause instantly.
          </p>
          <div className="mt-4 text-purple-600 font-medium text-sm">
            99% accuracy in detection
          </div>
        </div>

        {/* Predictive Maintenance Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <TrendingDown className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Predictive Maintenance
          </h3>
          <p className="text-gray-600 text-sm">
            AI learns patterns and predicts potential failures before they
            occur, scheduling maintenance during low-traffic periods.
          </p>
          <div className="mt-4 text-green-600 font-medium text-sm">
            Prevent 90% of incidents
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">99.99%</div>
          <div className="text-gray-600">Uptime Guaranteed</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">{'<'}2min</div>
          <div className="text-gray-600">Average MTTR</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
          <div className="text-gray-600">AI Monitoring</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">95%</div>
          <div className="text-gray-600">Auto-Resolved</div>
        </div>
      </div>
    </div>
  );
}

export default AIAgentSection;
