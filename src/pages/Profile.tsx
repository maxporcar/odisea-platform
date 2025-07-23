
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { useTrips } from '@/hooks/useTrips';
import { useCountries } from '@/hooks/useCountries';
import { usePremiumModal } from '@/hooks/usePremiumModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { User, MapPin, Calendar, CheckCircle, Heart, Edit, Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import PremiumModal from '@/components/PremiumModal';

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const { subscription } = useSubscription();
  const { trips } = useTrips();
  const { data: countries = [] } = useCountries();
  const { toast } = useToast();
  const { isOpen, feature, openModal, closeModal } = usePremiumModal();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    country: profile?.country || '',
  });
  const [favoriteCountries, setFavoriteCountries] = useState<string[]>([]);
  const [travelNotes, setTravelNotes] = useState('');

  const isPremium = profile?.is_premium || subscription?.subscribed;

  const handlePremiumFeatureClick = (featureName: string) => {
    if (!isPremium) {
      openModal(featureName);
      return;
    }
    // If user is premium, allow access to the feature
    // This would be implemented based on the specific feature
  };

  const handleSaveProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          country: formData.country,
        })
        .eq('id', user?.id);

      if (error) throw error;
      
      await refreshProfile();
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleFavoriteCountry = (countryId: string) => {
    if (!isPremium) {
      openModal('favorite countries');
      return;
    }
    setFavoriteCountries(prev => 
      prev.includes(countryId) 
        ? prev.filter(id => id !== countryId)
        : [...prev, countryId]
    );
  };

  const handleNotesChange = (value: string) => {
    if (!isPremium) {
      openModal('travel notes');
      return;
    }
    setTravelNotes(value);
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information and travel preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="notes">Travel Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Your basic account information
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={user.email || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="Your home country"
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Subscription Status</h4>
                    <p className="text-sm text-muted-foreground">
                      {isPremium ? 'Odisea+ Member' : 'Free Account'}
                    </p>
                  </div>
                  <Badge variant={isPremium ? 'default' : 'secondary'}>
                    {isPremium ? 'Premium' : 'Free'}
                  </Badge>
                </div>
                
                {!isPremium && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 mb-2">
                      Upgrade to Odisea+ to unlock all premium features
                    </p>
                    <Button asChild size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                      <Link to="/premium">Upgrade Now - 20€</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  My Trips & Progress
                </CardTitle>
                <CardDescription>
                  Track your travel preparation progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                {trips.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No trips yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first trip to start tracking your preparation progress
                    </p>
                    <Button asChild>
                      <Link to="/dashboard">Create Trip</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {trips.map(trip => (
                      <div key={trip.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{trip.destination_name}</h4>
                            {trip.departure_date && (
                              <p className="text-sm text-muted-foreground">
                                Departure: {new Date(trip.departure_date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => isPremium ? null : openModal('detailed trip progress')}
                          >
                            {isPremium ? (
                              <Link to="/dashboard">View Details</Link>
                            ) : (
                              'View Details'
                            )}
                          </Button>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Preparation Progress</span>
                            <span>0% completed</span>
                          </div>
                          <Progress value={0} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Favorite Countries
                  {!isPremium && <Badge variant="secondary" className="ml-2">Premium</Badge>}
                </CardTitle>
                <CardDescription>
                  Countries you're interested in for future travels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {countries.map(country => (
                    <div
                      key={country.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        favoriteCountries.includes(country.id) && isPremium
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      } ${!isPremium ? 'opacity-50' : ''}`}
                      onClick={() => toggleFavoriteCountry(country.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{country.flag}</span>
                          <span className="font-medium">{country.name}</span>
                        </div>
                        {favoriteCountries.includes(country.id) && isPremium && (
                          <Heart className="h-4 w-4 text-primary fill-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {!isPremium && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-yellow-800 mb-2">
                      Upgrade to Odisea+ to save your favorite countries
                    </p>
                    <Button asChild size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                      <Link to="/premium">Upgrade Now - 20€</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Travel Notes
                  {!isPremium && <Badge variant="secondary">Premium</Badge>}
                </CardTitle>
                <CardDescription>
                  Keep track of your travel ideas, plans, and important information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder={isPremium ? "Write your travel notes here... Ideas, plans, important information, etc." : "Upgrade to Odisea+ to unlock travel notes"}
                    value={travelNotes}
                    onChange={(e) => handleNotesChange(e.target.value)}
                    className="min-h-[200px]"
                    disabled={!isPremium}
                  />
                  {!isPremium && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                      <p className="text-sm text-yellow-800 mb-2">
                        Upgrade to Odisea+ to save your travel notes
                      </p>
                      <Button asChild size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                        <Link to="/premium">Upgrade Now - 20€</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <PremiumModal 
        isOpen={isOpen} 
        onClose={closeModal} 
        feature={feature}
      />
    </div>
  );
}
