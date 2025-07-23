import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { useChecklist } from '@/hooks/useChecklist';
import { TripSelector } from '@/components/TripSelector';
import { ChecklistSection } from '@/components/ChecklistSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const { subscription, loading: subscriptionLoading } = useSubscription();
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {profile?.full_name || user.email}!
        </h1>
        <p className="text-muted-foreground">
          Track your preparation progress for your international mobility
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <TripSelector 
            onTripSelect={setSelectedTripId}
            selectedTripId={selectedTripId}
          />
        </div>

        <div className="lg:col-span-8">
          {!selectedTripId ? (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Ready to Start?</h3>
                <p className="text-muted-foreground">
                  Select or create a trip to access your personalized preparation checklist
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Overall Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Overall Progress</CardTitle>
                  <CardDescription>
                    Your preparation progress across all categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Total Progress</span>
                      <span>{completedItems}/{totalItems} tasks completed</span>
                    </div>
                    <Progress value={overallProgress} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      {Math.round(overallProgress)}% of your checklist is completed
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Checklist Sections */}
              {checklistLoading ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">Loading your checklist...</p>
                  </CardContent>
                </Card>
              ) : checklist.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">No checklist items found</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {checklist.map(section => (
                    <ChecklistSection
                      key={section.template.id}
                      title={section.template.title}
                      description={section.template.description}
                      items={section.items}
                      progress={section.progress}
                      onToggleItem={toggleItem}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}