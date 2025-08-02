import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

interface HeaderProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

function Header({ onNavigateToLogin, onNavigateToSignup }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
              <span className="text-dark-300 group-hover:text-white transition-colors">
                Platform
              </span>
              <ChevronDown className="w-4 h-4 text-dark-300 group-hover:text-white transition-colors" />
            </div>
            <a
              href="#"
              className="text-dark-300 hover:text-white transition-colors"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-dark-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <div className="flex items-center space-x-1 cursor-pointer group">
              <span className="text-dark-300 group-hover:text-white transition-colors">
                Community
              </span>
              <ChevronDown className="w-4 h-4 text-dark-300 group-hover:text-white transition-colors" />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer group">
              <span className="text-dark-300 group-hover:text-white transition-colors">
                Company
              </span>
              <ChevronDown className="w-4 h-4 text-dark-300 group-hover:text-white transition-colors" />
            </div>
            <a
              href="#"
              className="text-dark-300 hover:text-white transition-colors"
            >
              Enterprise
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onNavigateToLogin}
              className="text-dark-300 hover:text-white transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={onNavigateToSignup}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Sign up
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-900 border-t border-dark-800">
          <div className="px-4 py-6 space-y-4">
            <a
              href="#"
              className="block text-dark-300 hover:text-white transition-colors"
            >
              Platform
            </a>
            <a
              href="#"
              className="block text-dark-300 hover:text-white transition-colors"
            >
              Documentation
            </a>
            <a
              href="#"
              className="block text-dark-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="block text-dark-300 hover:text-white transition-colors"
            >
              Community
            </a>
            <a
              href="#"
              className="block text-dark-300 hover:text-white transition-colors"
            >
              Company
            </a>
            <a
              href="#"
              className="block text-dark-300 hover:text-white transition-colors"
            >
              Enterprise
            </a>
            <div className="pt-4 border-t border-dark-800">
              <button
                onClick={onNavigateToLogin}
                className="block text-dark-300 hover:text-white transition-colors mb-2"
              >
                Sign in
              </button>
              <button
                onClick={onNavigateToSignup}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 w-full"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
