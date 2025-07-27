import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  CheckSquare, 
  FileText, 
  MessageCircle, 
  User, 
  Settings, 
  HelpCircle,
  Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: CheckSquare, label: 'My Checklist', path: '/profile?tab=checklist' },
  { icon: FileText, label: 'My Documents', path: '/profile?tab=documents' },
  { icon: MessageCircle, label: 'Chat with students', path: '/comunidad' },
  { icon: User, label: 'My Advisor', path: '/profile?tab=advisor' },
  { icon: Settings, label: 'Settings', path: '/profile?tab=settings' },
  { icon: HelpCircle, label: 'Help & FAQs', path: '/profile?tab=help' },
];

interface DashboardSidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const location = useLocation();

  return (
    <div className={cn("w-64 bg-background border-r border-border h-full", className)}>
      <div className="p-6">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path.includes('?tab=') && location.search.includes(item.path.split('?tab=')[1]));
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-warm-amber/10 text-warm-amber border border-warm-amber/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}