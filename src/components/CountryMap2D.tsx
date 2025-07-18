
import React from 'react';
import { MapPin } from 'lucide-react';

interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  slug?: string;
}

interface CountryMap2DProps {
  countryId: string;
  cities?: City[];
  onCityClick?: (citySlug: string) => void;
}

const CountryMap2D: React.FC<CountryMap2DProps> = ({ countryId, cities = [], onCityClick }) => {
  // Country bounding boxes and center points for major study destinations
  const countryData: Record<string, { 
    bounds: { north: number; south: number; east: number; west: number };
    center: { lat: number; lng: number };
    name: string;
  }> = {
    'canada': {
      bounds: { north: 83.1, south: 41.7, east: -52.6, west: -141.0 },
      center: { lat: 56.1, lng: -106.3 },
      name: 'Canada'
    },
    'usa': {
      bounds: { north: 71.5, south: 18.9, east: -66.9, west: -179.1 },
      center: { lat: 39.8, lng: -98.6 },
      name: 'United States'
    },
    'germany': {
      bounds: { north: 55.1, south: 47.3, east: 15.0, west: 5.9 },
      center: { lat: 51.2, lng: 10.5 },
      name: 'Germany'
    },
    'france': {
      bounds: { north: 51.1, south: 41.3, east: 9.6, west: -5.1 },
      center: { lat: 46.2, lng: 2.2 },
      name: 'France'
    },
    'italy': {
      bounds: { north: 47.1, south: 35.7, east: 18.5, west: 6.6 },
      center: { lat: 41.9, lng: 12.6 },
      name: 'Italy'
    },
    'spain': {
      bounds: { north: 43.8, south: 27.6, east: 4.3, west: -18.2 },
      center: { lat: 40.5, lng: -3.7 },
      name: 'Spain'
    },
    'japan': {
      bounds: { north: 45.5, south: 20.4, east: 153.0, west: 122.9 },
      center: { lat: 36.2, lng: 138.3 },
      name: 'Japan'
    },
    'argentina': {
      bounds: { north: -21.8, south: -55.1, east: -53.6, west: -73.6 },
      center: { lat: -38.4, lng: -63.6 },
      name: 'Argentina'
    },
    'mexico': {
      bounds: { north: 32.7, south: 14.5, east: -86.7, west: -118.4 },
      center: { lat: 23.6, lng: -102.5 },
      name: 'Mexico'
    },
    'cambodia': {
      bounds: { north: 14.7, south: 10.4, east: 107.6, west: 102.3 },
      center: { lat: 12.6, lng: 105.0 },
      name: 'Cambodia'
    }
  };

  const country = countryData[countryId];
  
  if (!country) {
    return (
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
        <div className="text-center text-muted-foreground">
          <MapPin className="w-12 h-12 mx-auto mb-2" />
          <p>Map not available for this country</p>
        </div>
      </div>
    );
  }

  // Simple coordinate conversion for display
  const convertCoords = (lat: number, lng: number) => {
    const { bounds } = country;
    const x = ((lng - bounds.west) / (bounds.east - bounds.west)) * 100;
    const y = ((bounds.north - lat) / (bounds.north - bounds.south)) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-glacial text-lg font-semibold text-foreground">
          🗺️ {country.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {cities.length > 0 ? 'Click on cities to explore' : 'Study destinations map'}
        </p>
      </div>
      
      <div className="relative h-[400px] bg-gradient-to-b from-sky-50 to-blue-50">
        {/* Country outline (simplified) */}
        <div 
          className="absolute inset-4 bg-primary/10 border-2 border-primary/30 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--primary) / 0.05) 100%)'
          }}
        />
        
        {/* Cities */}
        {cities.map((city) => {
          if (!city.latitude || !city.longitude) return null;
          
          const coords = convertCoords(city.latitude, city.longitude);
          return (
            <button
              key={city.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{
                left: `${coords.x}%`,
                top: `${coords.y}%`
              }}
              onClick={() => city.slug && onCityClick?.(city.slug)}
            >
              {/* Pin */}
              <div className="relative">
                <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              </div>
              
              {/* Label */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                <div className="bg-white px-2 py-1 rounded shadow-lg border text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {city.name}
                </div>
              </div>
            </button>
          );
        })}
        
        {cities.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">No cities available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryMap2D;
