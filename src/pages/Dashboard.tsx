import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { useChecklist } from '@/hooks/useChecklist';
import { useTrips } from '@/hooks/useTrips';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Lock, CheckCircle, FileText, MessageCircle, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const { subscription, loading: subscriptionLoading } = useSubscription();
  const { trips } = useTrips();
  const [selectedTripId, setSelectedTripId] = useState<string>();
  const { checklist, loading: checklistLoading, toggleItem } = useChecklist(selectedTripId);

  // Calculate overall progress
  const totalItems = checklist.reduce((acc, section) => acc + section.items.length, 0);
  const completedItems = checklist.reduce((acc, section) => {
    return acc + section.items.filter(item => 
      section.progress.find(p => p.item_id === item.id)?.completed
    ).length;
  }, 0);
  const overallProgress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Login Required</h2>
            <p className="text-muted-foreground mb-4">
              Please log in to access your personalized checklist dashboard.
            </p>
            <Button asChild>
              <Link to="/login">Log In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (subscriptionLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Loading your subscription status...</p>
        </div>
      </div>
    );
  }

  if (!subscription?.subscribed) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Odisea+ Required</h2>
            <p className="text-muted-foreground mb-4">
              The interactive checklist is available exclusively for Odisea+ subscribers.
            </p>
            <Button asChild>
              <Link to="/premium">Upgrade to Odisea+</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Message */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}! Ready for your next steps abroad?
          </h1>
          <p className="text-muted-foreground">
            Overall progress
          </p>
          <div className="mt-4 bg-warm-amber/10 rounded-lg p-4">
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-warm-amber h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        {/* My Checklist Preview */}
        <Card>
          <CardHeader>
            <CardTitle>My Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm">Complete your application</span>
                <span className="text-xs text-muted-foreground">Due in 2 weeks</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm">Submit your transcript</span>
                <span className="text-xs text-muted-foreground">Due in 1 month</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm">Schedule your interview</span>
                <span className="text-xs text-muted-foreground">Due in 2 months</span>
              </div>
              <div className="mt-4">
                <Button asChild className="w-full">
                  <Link to="/profile?tab=checklist">View Full Checklist</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Grid */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/profile?tab=checklist">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-teal-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium">My Checklist</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Track your progress and complete tasks.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/profile?tab=documents">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-stone-400 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium">My Documents</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage and upload your required documents.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/comunidad">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium">Chat with Students</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Connect with other students for advice and support.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/profile?tab=advisor">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-warm-amber rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium">My Advisor</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Schedule and meet with your advisor.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Latest Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Your transcript has been approved</p>
                  <p className="text-sm text-muted-foreground">Document Status Changed</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <MessageCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Message from your advisor</p>
                  <p className="text-sm text-muted-foreground">New Message</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}