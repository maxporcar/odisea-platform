
import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Crown } from 'lucide-react';
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
  const { user, signOut } = useAuth();
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
        <Button variant="outline" size="icon" className="rounded-full">
          <User className="h-4 w-4" />
          <span className="sr-only">{t('user.menu')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.user_metadata?.full_name || 'Usuario'}</p>
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
        <DropdownMenuItem>
          <Crown className="mr-2 h-4 w-4" />
          {t('user.premium')}
        </DropdownMenuItem>
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
