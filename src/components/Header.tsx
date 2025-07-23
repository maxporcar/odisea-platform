
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LanguageSelector from './LanguageSelector';
import UserMenu from './UserMenu';
import SubscribeButton from './SubscribeButton';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { key: 'countries', path: '/paises' },
    { key: 'testimonials', path: '/testimonios' },
    { key: 'community', path: '/comunidad' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-warm-amber p-2 rounded-lg">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">Odisea</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <Link
              to="/premium"
              className="text-warm-amber hover:text-warm-amber/80 transition-colors font-medium flex items-center gap-1"
            >
              <Crown className="w-4 h-4" />
              Odisea+
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            {!profile?.is_premium && <SubscribeButton />}
            <UserMenu />
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavigation(item.path)}
                    className="text-left text-gray-700 hover:text-primary transition-colors font-medium py-2"
                  >
                    {t(`nav.${item.key}`)}
                  </button>
                ))}
                <button
                  onClick={() => handleNavigation('/premium')}
                  className="text-left text-warm-amber hover:text-warm-amber/80 transition-colors font-medium py-2 flex items-center gap-2"
                >
                  <Crown className="w-4 h-4" />
                  Odisea+
                </button>
                <div className="border-t pt-4 space-y-4">
                  <LanguageSelector />
                  {!profile?.is_premium && <SubscribeButton className="w-full" />}
                  <UserMenu />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
