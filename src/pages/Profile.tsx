
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Crown, CheckSquare, Settings } from 'lucide-react';
import { TravelChecklist } from '@/components/TravelChecklist';
import { useSubscription } from '@/hooks/useSubscription';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, profile } = useAuth();
  const { subscription } = useSubscription();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Please log in</h2>
            <p className="text-muted-foreground">
              You need to be logged in to view your profile.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isSubscribed = subscription?.subscribed || false;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    {profile?.full_name || 'Student'}
                  </CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {isSubscribed ? (
                  <Badge className="bg-yellow-500">
                    <Crown className="w-4 h-4 mr-1" />
                    Odisea+ Member
                  </Badge>
                ) : (
                  <Badge variant="outline">Free Plan</Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {profile?.country || 'Not set'}
                </p>
                <p className="text-sm text-muted-foreground">Country</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {profile?.language || 'es'}
                </p>
                <p className="text-sm text-muted-foreground">Language</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {isSubscribed ? 'Premium' : 'Free'}
                </p>
                <p className="text-sm text-muted-foreground">Plan</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">Member since</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="checklist" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="checklist" className="flex items-center">
              <CheckSquare className="w-4 h-4 mr-2" />
              Travel Checklist
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center">
              <Crown className="w-4 h-4 mr-2" />
              Subscription
            </TabsTrigger>
          </TabsList>

          <TabsContent value="checklist" className="space-y-6">
            {isSubscribed ? (
              <TravelChecklist />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                    Premium Feature
                  </CardTitle>
                  <CardDescription>
                    The interactive travel checklist is available for Odisea+ members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <CheckSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">
                      Upgrade to Access Your Checklist
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Get organized with our comprehensive travel and packing checklist,
                      designed specifically for study abroad students.
                    </p>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link to="/premium">
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to Odisea+
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-sm text-muted-foreground">
                      {profile?.full_name || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Country</label>
                    <p className="text-sm text-muted-foreground">
                      {profile?.country || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Language</label>
                    <p className="text-sm text-muted-foreground">
                      {profile?.language || 'Spanish'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Status</CardTitle>
                <CardDescription>
                  Manage your Odisea+ subscription and billing
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubscribed ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Current Plan</p>
                        <p className="text-sm text-muted-foreground">Odisea+ Premium</p>
                      </div>
                      <Badge className="bg-yellow-500">
                        <Crown className="w-4 h-4 mr-1" />
                        Active
                      </Badge>
                    </div>
                    <div>
                      <p className="font-semibold">Billing</p>
                      <p className="text-sm text-muted-foreground">€19.99/month</p>
                    </div>
                    <div>
                      <p className="font-semibold">Features</p>
                      <ul className="text-sm text-muted-foreground list-disc list-inside mt-1">
                        <li>Interactive travel checklist</li>
                        <li>Personalized recommendations</li>
                        <li>Priority support</li>
                        <li>Advanced trip planning</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Crown className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">
                      You're on the Free Plan
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Upgrade to Odisea+ to access premium features and get the most
                      out of your study abroad journey.
                    </p>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link to="/premium">
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to Odisea+
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
