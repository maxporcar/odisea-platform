
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import UserMenu from './UserMenu';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Header = () => {
  const { t } = useTranslation();
  const { user, isPremium, isAdmin } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-black">Odisea</span>
            {isPremium && (
              <Badge className="bg-[#FFA500] text-white border-[#FFA500]">
                <Crown className="w-3 h-3 mr-1" />
                Plus
              </Badge>
            )}
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/paises" 
              className={`font-medium transition-colors ${
                isActive('/paises') ? 'text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              {t('nav.countries')}
            </Link>
            <Link 
              to="/mapa" 
              className={`font-medium transition-colors ${
                isActive('/mapa') ? 'text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              {t('nav.map')}
            </Link>
            <Link 
              to="/testimonios" 
              className={`font-medium transition-colors ${
                isActive('/testimonios') ? 'text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              {t('nav.testimonials')}
            </Link>
            <Link 
              to="/comunidad" 
              className={`font-medium transition-colors ${
                isActive('/comunidad') ? 'text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              {t('nav.community')}
            </Link>
            {!isPremium && (
              <Link 
                to="/subscription" 
                className={`font-medium transition-colors flex items-center space-x-1 ${
                  isActive('/subscription') ? 'text-[#FFA500]' : 'text-[#FFA500] hover:text-[#E6940D]'
                }`}
              >
                <Crown className="w-4 h-4" />
                <span>Plus</span>
              </Link>
            )}
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`font-medium transition-colors ${
                  isActive('/admin') ? 'text-[#007A5E]' : 'text-[#007A5E] hover:text-[#005A45]'
                }`}
              >
                {t('nav.admin', 'Admin')}
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
