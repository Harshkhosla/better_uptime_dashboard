import { useState } from 'react'
import { ChevronDown, Menu, X, ArrowRight, Globe, Shield, Zap, BarChart3, Users, Settings } from 'lucide-react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission
    console.log('Email submitted:', email)
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans relative overflow-hidden" style={{ fontFeatureSettings: '"rlig" 1, "calt" 1' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
      }}></div>
      
      {/* Header */}
      <header className="relative z-10 border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-white">Better Stack</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-1 cursor-pointer group">
                <span className="text-dark-300 group-hover:text-white transition-colors">Platform</span>
                <ChevronDown className="w-4 h-4 text-dark-300 group-hover:text-white transition-colors" />
              </div>
              <a href="#" className="text-dark-300 hover:text-white transition-colors">Documentation</a>
              <a href="#" className="text-dark-300 hover:text-white transition-colors">Pricing</a>
              <div className="flex items-center space-x-1 cursor-pointer group">
                <span className="text-dark-300 group-hover:text-white transition-colors">Community</span>
                <ChevronDown className="w-4 h-4 text-dark-300 group-hover:text-white transition-colors" />
              </div>
              <div className="flex items-center space-x-1 cursor-pointer group">
                <span className="text-dark-300 group-hover:text-white transition-colors">Company</span>
                <ChevronDown className="w-4 h-4 text-dark-300 group-hover:text-white transition-colors" />
              </div>
              <a href="#" className="text-dark-300 hover:text-white transition-colors">Enterprise</a>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-dark-300 hover:text-white transition-colors">Sign in</a>
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105">Sign up</button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-dark-900 border-t border-dark-800">
            <div className="px-4 py-6 space-y-4">
              <a href="#" className="block text-dark-300 hover:text-white transition-colors">Platform</a>
              <a href="#" className="block text-dark-300 hover:text-white transition-colors">Documentation</a>
              <a href="#" className="block text-dark-300 hover:text-white transition-colors">Pricing</a>
              <a href="#" className="block text-dark-300 hover:text-white transition-colors">Community</a>
              <a href="#" className="block text-dark-300 hover:text-white transition-colors">Company</a>
              <a href="#" className="block text-dark-300 hover:text-white transition-colors">Enterprise</a>
              <div className="pt-4 border-t border-dark-800">
                <a href="#" className="block text-dark-300 hover:text-white transition-colors mb-2">Sign in</a>
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 w-full">Sign up</button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              See everything.
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Fix anything.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-dark-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              AI-native platform for on-call and incident response with effortless monitoring, 
              status pages, tracing, infrastructure monitoring and log management.
            </p>

            {/* CTA Section */}
            <div className="max-w-md mx-auto mb-8">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your work e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 whitespace-nowrap">
                  Start for free
                </button>
              </form>
            </div>

            {/* Enterprise Link */}
            <p className="text-dark-400">
              Looking for an enterprise solution?{' '}
              <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">
                Book a demo
              </a>
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tracing */}
            <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 backdrop-blur-sm group hover:border-primary-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Tracing</h3>
                <ArrowRight className="w-5 h-5 text-dark-400 group-hover:text-primary-400 transition-colors" />
              </div>
              <p className="text-dark-300 mb-4">
                Explore with "bubble up" Investigate slow requests visually with drag & drop to find root cause.
              </p>
              <div className="flex items-center space-x-2 text-sm text-dark-400">
                <BarChart3 className="w-4 h-4" />
                <span>Instrument clusters with OpenTelemetry with no code change</span>
              </div>
            </div>

            {/* Incident Management */}
            <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 backdrop-blur-sm group hover:border-primary-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Incident Management</h3>
                <ArrowRight className="w-5 h-5 text-dark-400 group-hover:text-primary-400 transition-colors" />
              </div>
              <p className="text-dark-300 mb-4">
                Slack-based incident management Get the right team members involved with powerful templated workflows.
              </p>
              <div className="flex items-center space-x-2 text-sm text-dark-400">
                <Users className="w-4 h-4" />
                <span>AI incident silencing & smart incident merging</span>
              </div>
            </div>

            {/* Uptime Monitoring */}
            <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 backdrop-blur-sm group hover:border-primary-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Uptime Monitoring</h3>
                <ArrowRight className="w-5 h-5 text-dark-400 group-hover:text-primary-400 transition-colors" />
              </div>
              <p className="text-dark-300 mb-4">
                Screenshots for errors We record the API errors and take a screenshot of your app being down.
              </p>
              <div className="flex items-center space-x-2 text-sm text-dark-400">
                <Globe className="w-4 h-4" />
                <span>Playwright-based transaction checks</span>
              </div>
            </div>

            {/* Log Management */}
            <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 backdrop-blur-sm group hover:border-primary-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Log Management</h3>
                <ArrowRight className="w-5 h-5 text-dark-400 group-hover:text-primary-400 transition-colors" />
              </div>
              <p className="text-dark-300 mb-4">
                Store logs in your own S3 bucket Store all your logs in your own cloud. Stay compliant & in control.
              </p>
              <div className="flex items-center space-x-2 text-sm text-dark-400">
                <Shield className="w-4 h-4" />
                <span>Up to 1 billion log lines per second</span>
              </div>
            </div>

            {/* Infrastructure Monitoring */}
            <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 backdrop-blur-sm group hover:border-primary-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Infrastructure Monitoring</h3>
                <ArrowRight className="w-5 h-5 text-dark-400 group-hover:text-primary-400 transition-colors" />
              </div>
              <p className="text-dark-300 mb-4">
                Anomaly detection alerts Trigger alerts in real-time based on anomalies in logs and metrics.
              </p>
              <div className="flex items-center space-x-2 text-sm text-dark-400">
                <Zap className="w-4 h-4" />
                <span>Query with Drag & drop, SQL or PromQL</span>
              </div>
            </div>

            {/* Status Page */}
            <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 backdrop-blur-sm group hover:border-primary-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Status Page</h3>
                <ArrowRight className="w-5 h-5 text-dark-400 group-hover:text-primary-400 transition-colors" />
              </div>
              <p className="text-dark-300 mb-4">
                Branded page on your own sub-domain Beautifully designed status page. Fully customizable.
              </p>
              <div className="flex items-center space-x-2 text-sm text-dark-400">
                <Settings className="w-4 h-4" />
                <span>Translated into any language</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              At a fraction of your current costs
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              Get an unrivaled price-to-performance ratio. Decrease your budget by 30x or keep your current budget 
              but actually instrument all of your services, without sampling.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">Datadog</h3>
              <p className="text-3xl font-bold text-dark-300 mb-2">approx. $28,000</p>
              <p className="text-dark-400 mb-6">per month</p>
              <div className="space-y-2 text-sm text-dark-300">
                <p>1 TB traces per month 30-day retention</p>
                <p>1 TB logs per month 30-day retention</p>
                <p>150B metrics data points 13-month retention</p>
              </div>
            </div>

            <div className="bg-dark-900 border border-primary-500 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">Better Stack</h3>
              <p className="text-3xl font-bold text-primary-400 mb-2">$879</p>
              <p className="text-dark-400 mb-6">per month</p>
              <div className="space-y-2 text-sm text-dark-300">
                <p>1 TB traces per month 30-day retention</p>
                <p>1 TB logs per month 30-day retention</p>
                <p>150B metrics data points 13-month retention</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-dark-800 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-dark-300">
                <a href="#" className="block hover:text-white transition-colors">Enterprise</a>
                <a href="#" className="block hover:text-white transition-colors">Uptime</a>
                <a href="#" className="block hover:text-white transition-colors">Telemetry</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Solutions</h4>
              <div className="space-y-2 text-sm text-dark-300">
                <a href="#" className="block hover:text-white transition-colors">Log management</a>
                <a href="#" className="block hover:text-white transition-colors">Tracing</a>
                <a href="#" className="block hover:text-white transition-colors">Infrastructure monitoring</a>
                <a href="#" className="block hover:text-white transition-colors">Uptime monitoring</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-sm text-dark-300">
                <a href="#" className="block hover:text-white transition-colors">Help & Support</a>
                <a href="#" className="block hover:text-white transition-colors">Uptime docs</a>
                <a href="#" className="block hover:text-white transition-colors">Logs docs</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-dark-300">
                <a href="#" className="block hover:text-white transition-colors">Work at Better Stack</a>
                <a href="#" className="block hover:text-white transition-colors">Engineering</a>
                <a href="#" className="block hover:text-white transition-colors">Security</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-dark-800 text-center text-sm text-dark-400">
            <p>© 2025 Better Stack, Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
