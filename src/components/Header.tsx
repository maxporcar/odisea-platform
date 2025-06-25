
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navigation = [
    { name: t('nav.home'), href: '/', current: location.pathname === '/' },
    { name: t('nav.test'), href: '/test', current: location.pathname === '/test' },
    { name: t('nav.map'), href: '/mapa', current: location.pathname === '/mapa' },
    { name: t('nav.testimonials'), href: '/testimonios', current: location.pathname === '/testimonios' },
    { name: t('nav.community'), href: '/comunidad', current: location.pathname === '/comunidad' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=50&h=50&fit=crop&crop=center" 
              alt="Odisea Logo" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-2xl font-bold text-warm-orange font-poppins">
              Odisea
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-poppins font-medium transition-colors ${
                  item.current
                    ? 'text-warm-orange border-b-2 border-warm-orange pb-1'
                    : 'text-gray-700 hover:text-warm-orange'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Link
              to="/login"
              className="bg-gradient-to-r from-warm-orange to-warm-amber text-white px-6 py-2 rounded-full hover:from-orange-600 hover:to-amber-600 transition-all font-poppins font-semibold"
            >
              {t('nav.login')}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
