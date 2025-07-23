
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useChecklist } from '@/hooks/useChecklist';
import { useTrips } from '@/hooks/useTrips';
import { ChecklistSection } from '@/components/ChecklistSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Luggage, MapPin, Clock } from 'lucide-react';

export const TravelChecklist = () => {
  const { user } = useAuth();
  const { trips } = useTrips();
  const [selectedTripId, setSelectedTripId] = useState<string>('');
  const { checklist, loading, toggleItem } = useChecklist(selectedTripId);

  useEffect(() => {
    if (trips.length > 0 && !selectedTripId) {
      setSelectedTripId(trips[0].id);
    }
  }, [trips, selectedTripId]);

  if (!user) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Please log in to access your travel checklist.</p>
        </CardContent>
      </Card>
    );
  }

  if (trips.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No trips yet</h3>
          <p className="text-muted-foreground">Create your first trip to start using the travel checklist.</p>
        </CardContent>
      </Card>
    );
  }

  const selectedTrip = trips.find(trip => trip.id === selectedTripId);
  
  // Separate travel timeline and luggage checklists
  const travelChecklist = checklist.filter(item => item.template.category === 'travel');
  const luggageChecklist = checklist.filter(item => item.template.category === 'luggage');

  // Calculate overall progress for each category
  const calculateCategoryProgress = (categoryChecklist: typeof checklist) => {
    const totalItems = categoryChecklist.reduce((sum, section) => sum + section.items.length, 0);
    const completedItems = categoryChecklist.reduce((sum, section) => {
      return sum + section.items.filter(item => 
        section.progress.find(p => p.item_id === item.id)?.completed
      ).length;
    }, 0);
    return totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  };

  const travelProgress = calculateCategoryProgress(travelChecklist);
  const luggageProgress = calculateCategoryProgress(luggageChecklist);

  if (loading) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading checklist...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Trip Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select Your Trip
          </CardTitle>
          <CardDescription>Choose the trip you want to track</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedTripId} onValueChange={setSelectedTripId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a trip" />
            </SelectTrigger>
            <SelectContent>
              {trips.map(trip => (
                <SelectItem key={trip.id} value={trip.id}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{trip.destination_name}</span>
                    {trip.departure_date && (
                      <span className="text-muted-foreground text-sm">
                        - {new Date(trip.departure_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Travel Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(travelProgress)}% completed</span>
              </div>
              <Progress value={travelProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Luggage className="w-5 h-5" />
              Packing & Luggage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(luggageProgress)}% completed</span>
              </div>
              <Progress value={luggageProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Checklist Tabs */}
      <Tabs defaultValue="travel" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="travel" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Travel Timeline
          </TabsTrigger>
          <TabsTrigger value="luggage" className="flex items-center gap-2">
            <Luggage className="w-4 h-4" />
            Packing & Luggage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="travel" className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Travel Timeline Checklist</h3>
            <p className="text-muted-foreground">
              Complete tasks based on your departure timeline for {selectedTrip?.destination_name}
            </p>
          </div>
          
          {travelChecklist.map((section) => (
            <ChecklistSection
              key={section.template.id}
              title={section.template.title}
              description={section.template.description}
              items={section.items}
              progress={section.progress}
              onToggleItem={toggleItem}
            />
          ))}
        </TabsContent>

        <TabsContent value="luggage" className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Packing & Luggage Checklist</h3>
            <p className="text-muted-foreground">
              Essential items to pack for your trip to {selectedTrip?.destination_name}
            </p>
          </div>
          
          {luggageChecklist.map((section) => (
            <ChecklistSection
              key={section.template.id}
              title={section.template.title}
              description={section.template.description}
              items={section.items}
              progress={section.progress}
              onToggleItem={toggleItem}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
