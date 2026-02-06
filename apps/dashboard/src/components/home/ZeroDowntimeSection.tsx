import { DollarSign, Shield, Rocket, CheckCircle2 } from "lucide-react";

function ZeroDowntimeSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-8 md:p-16 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-500 bg-opacity-20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              <span>Zero Downtime Promise</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Achieve{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Zero Downtime
              </span>{" "}
              at Minimal Cost
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enterprise-grade reliability without the enterprise price tag.
              Our AI-powered infrastructure optimization reduces costs while
              maximizing uptime.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Cost Savings */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
              <div className="w-14 h-14 bg-green-500 bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">70% Cost Reduction</h3>
              <p className="text-gray-300 mb-6">
                Pay only for what you use. Our intelligent resource allocation
                and auto-scaling ensure you're never over-provisioned.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">
                    No infrastructure management overhead
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">
                    Automatic resource optimization
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">
                    Pay-as-you-grow pricing model
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">
                    Free tier for small projects
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Column - Zero Downtime */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
              <div className="w-14 h-14 bg-yellow-500 bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
                <Rocket className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">99.99% Uptime SLA</h3>
              <p className="text-gray-300 mb-6">
                Built on redundant infrastructure across multiple regions with
                instant failover and AI-driven health monitoring.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">
                    Multi-region redundancy by default
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">
                    Automatic failover in {'<'}1 second
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">
                    Self-healing infrastructure
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">
                    Zero-downtime deployments
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center bg-yellow-500 bg-opacity-10 rounded-2xl p-8 border border-yellow-500 border-opacity-30">
            <h3 className="text-2xl font-bold mb-3">
              Start saving while improving reliability
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of companies that trust our platform for
              mission-critical applications. Get started in minutes with our
              free tier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-yellow-500/30">
                Start Free Trial
              </button>
              <button className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 border border-white border-opacity-30">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ZeroDowntimeSection;
