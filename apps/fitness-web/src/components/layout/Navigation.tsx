import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg z-50 border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FitFlow
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/features"
              className={`transition-colors font-medium ${
                isActive('/features') 
                  ? 'text-blue-600' 
                  : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              Features
            </Link>
            <Link
              to="/how-it-works"
              className={`transition-colors font-medium ${
                isActive('/how-it-works') 
                  ? 'text-purple-600' 
                  : 'text-slate-700 hover:text-purple-600'
              }`}
            >
              How It Works
            </Link>
            <Link
              to="/coaches"
              className={`transition-colors font-medium ${
                isActive('/coaches') 
                  ? 'text-blue-600' 
                  : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              Coaches
            </Link>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-2.5 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 font-semibold shadow-lg shadow-blue-600/25">
              Get Started
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-blue-100">
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/features"
              onClick={handleMobileMenuClose}
              className={`block py-2 transition-colors font-medium ${
                isActive('/features') 
                  ? 'text-blue-600' 
                  : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              Features
            </Link>
            <Link
              to="/how-it-works"
              onClick={handleMobileMenuClose}
              className={`block py-2 transition-colors font-medium ${
                isActive('/how-it-works') 
                  ? 'text-purple-600' 
                  : 'text-slate-700 hover:text-purple-600'
              }`}
            >
              How It Works
            </Link>
            <Link
              to="/coaches"
              onClick={handleMobileMenuClose}
              className={`block py-2 transition-colors font-medium ${
                isActive('/coaches') 
                  ? 'text-blue-600' 
                  : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              Coaches
            </Link>
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all font-medium">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}