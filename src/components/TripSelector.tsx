import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTrips } from '@/hooks/useTrips';
import { useCities } from '@/hooks/useCities';
import { useCountries } from '@/hooks/useCountries';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TripSelectorProps {
  onTripSelect: (tripId: string) => void;
  selectedTripId?: string;
}

export const TripSelector = ({ onTripSelect, selectedTripId }: TripSelectorProps) => {
  const { trips, loading, createTrip } = useTrips();
  const { data: cities = [] } = useCities();
  const { data: countries = [] } = useCountries();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    destination_name: '',
    country_id: '',
    city_id: '',
    departure_date: '',
  });

  const handleCreateTrip = async () => {
    if (!formData.destination_name) return;

    const newTrip = await createTrip({
      destination_name: formData.destination_name,
      country_id: formData.country_id || undefined,
      city_id: formData.city_id || undefined,
      departure_date: formData.departure_date || undefined,
    });

    if (newTrip) {
      setIsCreateOpen(false);
      setFormData({
        destination_name: '',
        country_id: '',
        city_id: '',
        departure_date: '',
      });
      onTripSelect(newTrip.id);
    }
  };

  const filteredCities = cities.filter(city => 
    !formData.country_id || city.country_id === formData.country_id
  );

  if (loading) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Loading trips...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Trips</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Trip
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Trip</DialogTitle>
              <DialogDescription>
                Add a new destination to start tracking your preparation checklist.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="destination">Destination Name *</Label>
                <Input
                  id="destination"
                  value={formData.destination_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, destination_name: e.target.value }))}
                  placeholder="e.g., Montréal, Canada"
                />
              </div>
              <div>
                <Label htmlFor="country">Country (Optional)</Label>
                <Select
                  value={formData.country_id}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, country_id: value, city_id: '' }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country.id} value={country.id}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="city">City (Optional)</Label>
                <Select
                  value={formData.city_id}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, city_id: value }))}
                  disabled={!formData.country_id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCities.map(city => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="departure">Departure Date (Optional)</Label>
                <Input
                  id="departure"
                  type="date"
                  value={formData.departure_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, departure_date: e.target.value }))}
                />
              </div>
              <Button onClick={handleCreateTrip} className="w-full">
                Create Trip
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {trips.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground mb-4">No trips yet</p>
            <p className="text-sm text-muted-foreground">
              Create your first trip to start using the preparation checklist
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {trips.map(trip => (
            <Card 
              key={trip.id}
              className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                selectedTripId === trip.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => onTripSelect(trip.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{trip.destination_name}</CardTitle>
                <CardDescription>
                  {trip.departure_date && (
                    <span>Departure: {new Date(trip.departure_date).toLocaleDateString()}</span>
                  )}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};