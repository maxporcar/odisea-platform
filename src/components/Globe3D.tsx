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
          color: supabaseCountry ? '#007A5E' : '#d3d3d3',
          opacity: supabaseCountry ? 0.8 : 0.3
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
          size: 0.3,
          color: '#00FF00'
        }));
      setCities(citiesData);
    }
  }, [supabaseCities]);

  // Auto-rotate globe
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.3;
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
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        
        // Countries
        polygonsData={countries}
        polygonAltitude={0.01}
        polygonCapColor={(d: any) => d.color}
        polygonSideColor={(d: any) => d.color}
        polygonStrokeColor={() => '#111'}
        polygonLabel={(d: any) => d.hasData ? `${d.countryData.flag} ${d.countryData.name}` : ''}
        onPolygonClick={handleCountryClick}
        onPolygonHover={handleCountryHover}
        
        // Cities
        pointsData={cities}
        pointAltitude={0.02}
        pointColor={(d: any) => d.color}
        pointRadius={(d: any) => d.size}
        pointLabel={(d: any) => d.name}
        onPointClick={handleCityClick}
        onPointHover={handleCityHover}
        
        // No controls props needed for react-globe.gl
      />
      
      {/* Tooltip */}
      {tooltipData && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border max-w-xs">
          <div className="flex items-center space-x-3 mb-2">
            {tooltipData.flag && <span className="text-2xl">{tooltipData.flag}</span>}
            <div>
              <h3 className="font-bold text-foreground">{tooltipData.name}</h3>
              {tooltipData.continent && (
                <p className="text-sm text-muted-foreground">{tooltipData.continent}</p>
              )}
            </div>
          </div>
          {tooltipData.type === 'country' && (
            <button 
              onClick={() => navigate(`/paises/${hoveredCountry?.countryData?.id}`)}
              className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              + info
            </button>
          )}
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-sm">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#007A5E] rounded-full"></div>
            <span className="text-gray-700">Países disponibles</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#00FF00] rounded-full"></div>
            <span className="text-gray-700">Ciudades</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <span className="text-gray-700">Sin información</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Click para explorar • Arrastra para rotar</p>
      </div>
    </div>
  );
};

export default Globe3D;