import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { useTrips } from '@/hooks/useTrips';
import { useCountries } from '@/hooks/useCountries';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  User,
  Save,
  MapPin,
  Heart,
  FileText,
  CheckCircle,
  X,
  Crown,
  Plane,
} from 'lucide-react';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import PremiumModal from '@/components/PremiumModal';
import { usePremiumModal } from '@/hooks/usePremiumModal';

const Profile = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { subscription } = useSubscription();
  const { trips, loading: tripsLoading } = useTrips();
  const { countries } = useCountries();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { isOpen, openModal, closeModal } = usePremiumModal();

  const [profileData, setProfileData] = useState({
    full_name: profile?.full_name || '',
    country: profile?.country || '',
    language: profile?.language || 'en',
  });
  const [favoriteCountries, setFavoriteCountries] = useState<string[]>([]);
  const [travelNotes, setTravelNotes] = useState('');

  useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || '',
        country: profile.country || '',
        language: profile.language || 'en',
      });
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      fetchUserPreferences();
    }
  }, [user]);

  const fetchUserPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user!.id)
        .single();

      if (error) {
        console.error('Error fetching user preferences:', error);
      } else {
        setFavoriteCountries(data?.favorite_countries || []);
        setTravelNotes(data?.travel_notes || '');
      }
    } catch (error) {
      console.error('Error fetching user preferences:', error);
    }
  };

  const saveUserPreferences = async () => {
    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert(
          {
            user_id: user!.id,
            favorite_countries: favoriteCountries,
            travel_notes: travelNotes,
          },
          { onConflict: 'user_id' }
        );

      if (error) {
        console.error('Error saving user preferences:', error);
        toast({
          variant: 'destructive',
          title: 'Error saving preferences',
          description: 'Failed to save your preferences. Please try again.',
        });
      } else {
        toast({
          title: 'Preferences saved',
          description: 'Your preferences have been successfully saved.',
        });
      }
    } catch (error) {
      console.error('Error saving user preferences:', error);
      toast({
        variant: 'destructive',
        title: 'Error saving preferences',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  };

  const saveProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user!.id);

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          variant: 'destructive',
          title: 'Error updating profile',
          description: 'Failed to update your profile. Please try again.',
        });
      } else {
        toast({
          title: 'Profile updated',
          description: 'Your profile has been successfully updated.',
        });
        await refreshProfile();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: 'destructive',
        title: 'Error updating profile',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  };

  const calculateOverallProgress = () => {
    // Replace with your actual logic to calculate overall progress
    return 75;
  };

  const handleUpgrade = () => {
    closeModal();
    // Payment logic will be handled by SubscribeButton
  };

  const handlePremiumFeature = (featureName: string) => {
    if (!subscription?.subscribed) {
      toast({
        title: "Premium Feature",
        description: `${featureName} is a premium feature. Upgrade to Odisea+ to unlock it!`,
        action: (
          <button
            onClick={openModal}
            className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600"
          >
            Upgrade
          </button>
        ),
      });
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please log in</h1>
            <p className="text-gray-600">You need to be logged in to view your profile.</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading profile...</h1>
            <p className="text-gray-600">Fetching your profile information.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">My Profile</h2>
            <p className="text-gray-500">Manage your profile information and settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <Input
                      value={profileData.full_name}
                      onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <Input
                      value={profileData.country}
                      onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                      placeholder="Enter your country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select 
                      value={profileData.language}
                      onChange={(e) => setProfileData({ ...profileData, language: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                  <Button onClick={saveProfile} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Subscription Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    Subscription Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {subscription?.subscribed ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Odisea+ Active</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <X className="w-5 h-5" />
                        <span>Free Plan</span>
                      </div>
                      <Button 
                        onClick={openModal}
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to Odisea+
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trip Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    My Trips Progress
                  </CardTitle>
                  <CardDescription>
                    Track your preparation progress for each trip
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {tripsLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-2 bg-gray-200 rounded w-full"></div>
                        </div>
                      ))}
                    </div>
                  ) : trips.length === 0 ? (
                    <div className="text-center py-8">
                      <Plane className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No trips planned yet</p>
                      <Button className="mt-4" onClick={() => window.location.href = '/paises'}>
                        Plan Your First Trip
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {trips.map((trip) => (
                        <div key={trip.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{trip.destination_name}</h3>
                              <p className="text-sm text-gray-500">
                                {trip.departure_date ? new Date(trip.departure_date).toLocaleDateString() : 'Date not set'}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePremiumFeature('Trip Checklist')}
                            >
                              View Checklist
                            </Button>
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{Math.round(calculateOverallProgress())}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${calculateOverallProgress()}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Favorite Countries */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Favorite Countries
                    {!subscription?.subscribed && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        Premium
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!subscription?.subscribed ? (
                    <div className="text-center py-8">
                      <Crown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">Save your favorite countries with Odisea+</p>
                      <Button 
                        onClick={openModal}
                        className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                      >
                        Upgrade to Odisea+
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {favoriteCountries.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No favorite countries yet</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {favoriteCountries.map((countryId) => {
                            const country = countries.find(c => c.id === countryId);
                            return country ? (
                              <div key={countryId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <span className="text-2xl">{country.flag}</span>
                                <span className="font-medium">{country.name}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Travel Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Travel Notes
                    {!subscription?.subscribed && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        Premium
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!subscription?.subscribed ? (
                    <div className="text-center py-8">
                      <Crown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">Keep personal travel notes with Odisea+</p>
                      <Button 
                        onClick={openModal}
                        className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                      >
                        Upgrade to Odisea+
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Textarea
                        value={travelNotes}
                        onChange={(e) => setTravelNotes(e.target.value)}
                        placeholder="Write your travel notes, ideas, and plans here..."
                        className="min-h-[200px]"
                      />
                      <Button onClick={saveUserPreferences}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Notes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <PremiumModal
        isOpen={isOpen}
        onClose={closeModal}
        onUpgrade={handleUpgrade}
      />
    </Layout>
  );
};

export default Profile;
