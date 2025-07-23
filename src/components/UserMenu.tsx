
import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Crown, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const UserMenu = () => {
  const { t } = useTranslation();
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: t('user.sessionClosed'),
        description: t('user.sessionClosedDescription')
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: t('user.errorClosingSession')
      });
    }
  };

  if (!user) {
    return (
      <Link to="/login">
        <Button variant="outline" className="font-poppins">
          {t('user.login')}
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full relative">
          <User className="h-4 w-4" />
          {profile?.is_premium && (
            <Crown className="absolute -top-1 -right-1 h-3 w-3 text-warm-amber" />
          )}
          <span className="sr-only">{t('user.menu')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium flex items-center gap-2">
              {profile?.full_name || 'Usuario'}
              {profile?.is_premium && <Crown className="h-4 w-4 text-warm-amber" />}
              {profile?.is_admin && <Shield className="h-4 w-4 text-primary" />}
            </p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/perfil" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            {t('user.profile')}
          </Link>
        </DropdownMenuItem>
        {!profile?.is_premium && (
          <DropdownMenuItem asChild>
            <Link to="/premium" className="cursor-pointer">
              <Crown className="mr-2 h-4 w-4" />
              {t('user.premium')}
            </Link>
          </DropdownMenuItem>
        )}
        {profile?.is_admin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin/users" className="cursor-pointer">
                <Shield className="mr-2 h-4 w-4" />
                Admin Panel
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          {t('user.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
