
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { useTranslation } from 'react-i18next';
import { User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import LanguageSelector from './LanguageSelector';
import SubscribeButton from './SubscribeButton';

const Header = () => {
  const { user, signOut, profile } = useAuth();
  const { subscription } = useSubscription();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-orange-600">Odisea</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/test" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t('nav.test')}
            </Link>
            <Link to="/paises" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t('nav.countries')}
            </Link>
            <Link to="/testimonios" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t('nav.testimonials')}
            </Link>
            <Link to="/comunidad" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t('nav.community')}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            {user ? (
              <div className="flex items-center space-x-4">
                {subscription?.subscribed && (
                  <Link to="/dashboard" className="text-gray-700 hover:text-orange-600 transition-colors">
                    Dashboard
                  </Link>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">{profile?.full_name || user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/perfil">
                        <User className="mr-2 h-4 w-4" />
                        <span>{t('user.profile')}</span>
                      </Link>
                    </DropdownMenuItem>
                    {subscription?.subscribed && (
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard">
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t('user.logout')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <SubscribeButton />
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    {t('user.login')}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
