function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Platform</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <a href="#" className="block hover:text-gray-900 transition-colors">
                Enterprise
              </a>
              <a href="#" className="block hover:text-gray-900 transition-colors">
                Uptime
              </a>
              <a href="#" className="block hover:text-gray-900 transition-colors">
                Telemetry
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Solutions</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <a href="#" className="block hover:text-gray-900 transition-colors">
                Log management
              </a>
              <a href="#" className="block hover:text-gray-900 transition-colors">
                Tracing
              </a>
              <a href="#" className="block hover:text-gray-900 transition-colors">
                Infrastructure monitoring
              </a>
              <a href="#" className="block hover:text-gray-900 transition-colors">
                Uptime monitoring
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Resources</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <a href="#" className="block hover:text-gray-900 transition-colors">
                Help & Support
              </a>
              <a href="#" className="block hover:text-gray-900 transition-colors">
                Uptime docs
              </a>
              <a href="#" className="block hover:text-gray-900 transition-colors">
                Logs docs
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Company</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <a href="#" className="block hover:text-gray-900 transition-colors">
                Work at Better Uptime
              </a>
              <a href="#" className="block hover:text-gray-900 transition-colors">
                Engineering
              </a>
              <a href="#" className="block hover:text-gray-900 transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© 2025 Better Uptime, Inc.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
