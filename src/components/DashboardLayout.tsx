import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardSidebar } from './DashboardSidebar';
import { Crown } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1">
          {/* Top bar with user info */}
          <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-warm-amber/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-warm-amber">
                    {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {profile?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    membre ODISEA+
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Mobility Plan Progress</p>
                <div className="w-64 bg-muted rounded-full h-2 mt-1">
                  <div className="bg-warm-amber h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">60%</p>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}