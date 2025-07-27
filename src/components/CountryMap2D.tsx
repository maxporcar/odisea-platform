
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useCountry } from '@/hooks/useCountries';
import { useCities } from '@/hooks/useCities';
import type { Feature, MultiPolygon, FeatureCollection } from 'geojson';

function FitBounds({ geoJson }: { geoJson: any }) {
  const map = useMap();
  
  useEffect(() => {
    if (geoJson) {
      try {
        const layer = L.geoJSON(geoJson);
        map.fitBounds(layer.getBounds(), { maxZoom: 6 });
      } catch (error) {
        console.error('Error fitting bounds:', error);
      }
    }
  }, [map, geoJson]);
  
  return null;
}

interface CountryMap2DProps {
  slug: string;
}

export default function CountryMap2D({ slug }: CountryMap2DProps) {
  const { data: country } = useCountry(slug);
  const { data: cities = [] } = useCities(country?.id);

  console.log('🗺️ CountryMap2D - Country:', country);
  console.log('🏙️ CountryMap2D - Cities:', cities);

  // For now, we'll create a simple boundary around the cities
  // In a real implementation, you'd store GeoJSON data in your database
  const createCountryBounds = (): Feature<MultiPolygon> | null => {
    if (!cities.length) return null;
    
    const validCities = cities.filter(city => city.latitude && city.longitude);
    if (!validCities.length) return null;

    const lats = validCities.map(city => city.latitude);
    const lngs = validCities.map(city => city.longitude);
    
    const minLat = Math.min(...lats) - 0.5;
    const maxLat = Math.max(...lats) + 0.5;
    const minLng = Math.min(...lngs) - 0.5;
    const maxLng = Math.max(...lngs) + 0.5;

    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "MultiPolygon",
        coordinates: [[[
          [minLng, minLat],
          [maxLng, minLat],
          [maxLng, maxLat],
          [minLng, maxLat],
          [minLng, minLat]
        ]]]
      }
    };
  };

  const countryBounds = createCountryBounds();
  
  if (!country || !cities.length) {
    return (
      <div className="h-[400px] w-full bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Map loading...</p>
      </div>
    );
  }

  const center = cities.length > 0 && cities[0].latitude && cities[0].longitude
    ? [cities[0].latitude, cities[0].longitude] as [number, number]
    : [0, 0] as [number, number];

  return (
    <div className="relative h-[400px] w-full rounded-lg overflow-hidden border border-border">
      <MapContainer 
        style={{ height: '100%', width: '100%' }} 
        zoom={6} 
        center={center}
        scrollWheelZoom={false}
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {countryBounds && (
          <GeoJSON
            data={countryBounds}
            style={{ 
              color: '#3B82F6', 
              weight: 2, 
              fillColor: '#EBF8FF', 
              fillOpacity: 0.3 
            }}
          />
        )}
        
        {cities
          .filter(city => city.latitude && city.longitude)
          .map(city => (
            <CircleMarker
              key={city.id}
              center={[city.latitude, city.longitude]}
              radius={8}
              pathOptions={{
                color: '#10B981',
                fillColor: '#10B981',
                fillOpacity: 1,
                weight: 2
              }}
              eventHandlers={{
                click: () => {
                  if (city.slug) {
                    window.location.href = `/paises/${country.id}/ciudades/${city.slug}`;
                  }
                },
                mouseover: (e) => {
                  e.target.setRadius(12);
                  e.target.setStyle({ weight: 3 });
                },
                mouseout: (e) => {
                  e.target.setRadius(8);
                  e.target.setStyle({ weight: 2 });
                }
              }}
            >
              <div className="leaflet-tooltip">
                <strong>{city.name}</strong>
                <br />
                <small>Click to explore</small>
              </div>
            </CircleMarker>
          ))}
      </MapContainer>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border max-w-xs">
        <h4 className="font-semibold text-foreground mb-2">Study Destinations</h4>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></div>
          <span className="text-sm text-muted-foreground">Available cities</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Click on cities to explore comprehensive study guides
        </p>
      </div>
    </div>
  );
}
