import React, { useState } from 'react';
import { Menu, X, MapPin, Brain, Hotel, Compass, User, LogIn } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', id: 'home', icon: MapPin },
    { name: 'AI Planner', id: 'ai-planner', icon: Brain },
    { name: 'Hotels', id: 'hotels', icon: Hotel },
    { name: 'Destinations', id: 'destinations', icon: Compass },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-3xl font-['Playfair_Display'] text-slate-800 tracking-wide">
              Trip Sculptor
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 ml-4">
              <button
                onClick={() => setActiveSection('login')}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
              >
                <LogIn className="h-4 w-4" />
                <span className="font-medium">Login</span>
              </button>
              <button
                onClick={() => setActiveSection('signup')}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-teal-600 text-white rounded-lg hover:from-orange-600 hover:to-teal-700 transition-all duration-200"
              >
                <User className="h-4 w-4" />
                <span className="font-medium">Sign Up</span>
              </button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-100">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-orange-100 text-orange-700'
                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-orange-100 space-y-2">
                <button
                  onClick={() => {
                    setActiveSection('login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                >
                  <LogIn className="h-5 w-5" />
                  <span className="font-medium">Login</span>
                </button>
                <button
                  onClick={() => {
                    setActiveSection('signup');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-orange-500 to-teal-600 text-white rounded-lg hover:from-orange-600 hover:to-teal-700 transition-all duration-200"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Sign Up</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;