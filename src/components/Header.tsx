
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import UserMenu from './UserMenu';

const Header = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('nav.home'), href: '/', current: location.pathname === '/' },
    { name: t('nav.test'), href: '/test', current: location.pathname === '/test' },
    { name: t('nav.countries'), href: '/paises', current: location.pathname === '/paises' },
    { name: t('nav.testimonials'), href: '/testimonios', current: location.pathname === '/testimonios' },
    { name: t('nav.community'), href: '/comunidad', current: location.pathname === '/comunidad' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/f93d8837-53e9-4ba5-a848-b47af4a0fb25.png" 
              alt="Odisea Logo" 
              className="h-28 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-poppins font-medium transition-colors ${
                  item.current
                    ? 'border-b-2 pb-1'
                    : 'hover:text-orange-600'
                }`}
                style={{
                  color: item.current ? '#FF6600' : '#2B2B2B',
                  borderColor: item.current ? '#FF6600' : 'transparent'
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSelector />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-white transition-colors"
              style={{ backgroundColor: '#FF6600' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFD37E'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF6600'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-orange-200 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-full font-poppins font-medium transition-colors ${
                    item.current
                      ? 'text-white'
                      : 'hover:text-orange-600'
                  }`}
                  style={{
                    backgroundColor: item.current ? '#FF6600' : 'transparent',
                    color: item.current ? 'white' : '#2B2B2B'
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2">
                <UserMenu />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
