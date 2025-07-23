
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChecklistSection } from './ChecklistSection';
import { useChecklist } from '@/hooks/useChecklist';
import { useTrips } from '@/hooks/useTrips';
import { TripSelector } from './TripSelector';
import { Plane, Package2 } from 'lucide-react';

export const TravelChecklist = () => {
  const { trips } = useTrips();
  const [selectedTripId, setSelectedTripId] = useState<string>('');
  const { checklist, loading, toggleItem } = useChecklist(selectedTripId);

  // Calculate separate progress for travel and luggage
  const travelCategories = ['three_months_before', 'one_two_months_before', 'two_weeks_before', 'travel_day', 'first_week_abroad'];
  const travelItems = checklist.filter(section => travelCategories.includes(section.template.category));
  const luggageItems = checklist.filter(section => section.template.category === 'packing_suitcase');

  const calculateProgress = (items: typeof checklist) => {
    const totalItems = items.reduce((sum, section) => sum + section.items.length, 0);
    const completedItems = items.reduce((sum, section) => {
      return sum + section.items.filter(item => 
        section.progress.find(p => p.item_id === item.id)?.completed
      ).length;
    }, 0);
    return totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  };

  const travelProgress = calculateProgress(travelItems);
  const luggageProgress = calculateProgress(luggageItems);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Travel Checklist</h2>
        <p className="text-muted-foreground">
          Track your progress and never miss important steps for your study abroad journey
        </p>
      </div>

      <TripSelector
        selectedTripId={selectedTripId}
        onTripSelect={setSelectedTripId}
      />

      {selectedTripId && (
        <>
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Plane className="w-5 h-5 mr-2 text-blue-500" />
                  Travel Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {Math.round(travelProgress)}% complete
                    </span>
                    <Badge variant="secondary">
                      {travelItems.reduce((sum, section) => 
                        sum + section.items.filter(item => 
                          section.progress.find(p => p.item_id === item.id)?.completed
                        ).length, 0
                      )} / {travelItems.reduce((sum, section) => sum + section.items.length, 0)} tasks
                    </Badge>
                  </div>
                  <Progress value={travelProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Package2 className="w-5 h-5 mr-2 text-green-500" />
                  Luggage Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {Math.round(luggageProgress)}% complete
                    </span>
                    <Badge variant="secondary">
                      {luggageItems.reduce((sum, section) => 
                        sum + section.items.filter(item => 
                          section.progress.find(p => p.item_id === item.id)?.completed
                        ).length, 0
                      )} / {luggageItems.reduce((sum, section) => sum + section.items.length, 0)} tasks
                    </Badge>
                  </div>
                  <Progress value={luggageProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Travel Checklist Sections */}
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Plane className="w-6 h-6 mr-2 text-blue-500" />
              <h3 className="text-xl font-semibold">Travel Timeline</h3>
            </div>
            
            {travelItems.map((section) => (
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

          {/* Luggage Checklist Sections */}
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Package2 className="w-6 h-6 mr-2 text-green-500" />
              <h3 className="text-xl font-semibold">Packing Checklist</h3>
            </div>
            
            {luggageItems.map((section) => (
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
        </>
      )}
    </div>
  );
};
