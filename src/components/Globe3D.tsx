
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Globe from 'react-globe.gl';
import { feature } from 'topojson-client';
import { useCountries } from '../hooks/useCountries';
import { useAllCities } from '../hooks/useCities';

interface GlobeProps {
  width?: number;
  height?: number;
}

const Globe3D: React.FC<GlobeProps> = ({ width = 600, height = 600 }) => {
  const navigate = useNavigate();
  const globeRef = useRef<any>();
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [hoveredCountry, setHoveredCountry] = useState<any>(null);
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [worldData, setWorldData] = useState<any>(null);
  
  const { data: supabaseCountries = [] } = useCountries();
  const { data: supabaseCities = [] } = useAllCities();

  // Load world topojson data
  useEffect(() => {
    fetch('https://unpkg.com/world-atlas@1.1.4/countries-110m.json')
      .then(res => res.json())
      .then(data => {
        const countries = feature(data, data.objects.countries);
        setWorldData(countries);
      })
      .catch(error => console.error('Error loading world data:', error));
  }, []);

  // Prepare countries data for globe
  useEffect(() => {
    if (worldData && supabaseCountries.length > 0) {
      const countriesWithData = worldData.features.map((country: any) => {
        const supabaseCountry = supabaseCountries.find(sc => 
          sc.name.toLowerCase().includes(country.properties.NAME.toLowerCase()) ||
          country.properties.NAME.toLowerCase().includes(sc.name.toLowerCase())
        );
        
        return {
          ...country,
          hasData: !!supabaseCountry,
          countryData: supabaseCountry,
          // Brighter, more vibrant colors for better visibility
          color: supabaseCountry ? '#FF6B35' : '#E5E7EB',
          opacity: supabaseCountry ? 0.9 : 0.3
        };
      });
      setCountries(countriesWithData);
    }
  }, [worldData, supabaseCountries]);

  // Prepare cities data for globe
  useEffect(() => {
    if (supabaseCities.length > 0) {
      const citiesData = supabaseCities
        .filter(city => city.latitude && city.longitude)
        .map(city => ({
          lat: city.latitude,
          lng: city.longitude,
          name: city.name,
          slug: city.slug,
          country_id: city.country_id,
          size: 0.4,
          color: '#10B981' // Bright green for cities
        }));
      setCities(citiesData);
    }
  }, [supabaseCities]);

  // Auto-rotate globe
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5; // Slightly faster rotation
    }
  }, []);

  const handleCountryClick = (country: any) => {
    if (country.hasData && country.countryData) {
      navigate(`/paises/${country.countryData.id}`);
    }
  };

  const handleCityClick = (city: any) => {
    if (city.slug && city.country_id) {
      navigate(`/paises/${city.country_id}/ciudades/${city.slug}`);
    }
  };

  const handleCountryHover = (country: any, prevCountry: any) => {
    setHoveredCountry(country);
    if (country && country.hasData) {
      setTooltipData({
        name: country.countryData.name,
        flag: country.countryData.flag,
        continent: country.countryData.continent,
        type: 'country'
      });
    } else {
      setTooltipData(null);
    }
  };

  const handleCityHover = (city: any) => {
    if (city) {
      setTooltipData({
        name: city.name,
        type: 'city'
      });
    } else {
      setTooltipData(null);
    }
  };

  return (
    <div className="relative w-full h-full">
      <Globe
        ref={globeRef}
        width={width}
        height={height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        
        // Countries
        polygonsData={countries}
        polygonAltitude={0.015}
        polygonCapColor={(d: any) => d.color}
        polygonSideColor={(d: any) => d.color}
        polygonStrokeColor={() => '#FFFFFF'}
        polygonLabel={(d: any) => d.hasData ? `${d.countryData.flag} ${d.countryData.name}` : ''}
        onPolygonClick={handleCountryClick}
        onPolygonHover={handleCountryHover}
        
        // Cities
        pointsData={cities}
        pointAltitude={0.03}
        pointColor={(d: any) => d.color}
        pointRadius={(d: any) => d.size}
        pointLabel={(d: any) => `🏙️ ${d.name}`}
        onPointClick={handleCityClick}
        onPointHover={handleCityHover}
      />
      
      {/* Enhanced Tooltip */}
      {tooltipData && (
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border-2 border-orange-200 max-w-xs z-20">
          <div className="flex items-center space-x-3 mb-2">
            {tooltipData.flag && <span className="text-2xl">{tooltipData.flag}</span>}
            <div>
              <h3 className="font-bold text-foreground text-lg">{tooltipData.name}</h3>
              {tooltipData.continent && (
                <p className="text-sm text-muted-foreground">{tooltipData.continent}</p>
              )}
            </div>
          </div>
          {tooltipData.type === 'country' && (
            <button 
              onClick={() => navigate(`/paises/${hoveredCountry?.countryData?.id}`)}
              className="bg-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors w-full"
            >
              🔍 Explorar país
            </button>
          )}
          {tooltipData.type === 'city' && (
            <div className="text-xs text-blue-600 font-medium">
              🏙️ Ciudad disponible
            </div>
          )}
        </div>
      )}
      
      {/* Enhanced Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 text-sm shadow-xl border-2 border-orange-200">
        <h4 className="font-bold text-foreground mb-3">🗺️ Leyenda</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#FF6B35] rounded-sm"></div>
            <span className="text-gray-700">Países disponibles</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#10B981] rounded-full"></div>
            <span className="text-gray-700">Ciudades</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
            <span className="text-gray-700">Sin información</span>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">💡 Haz clic para explorar</p>
          <p className="text-xs text-gray-500">🖱️ Arrastra para rotar</p>
        </div>
      </div>
    </div>
  );
};

export default Globe3D;
