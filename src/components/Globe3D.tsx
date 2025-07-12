import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Globe from 'react-globe.gl';
import { feature } from 'topojson-client';
import { useCountries } from '../hooks/useCountries';
import { useAllCities } from '../hooks/useCities';

interface GlobeProps {
  width?: number;
  height?: number;
  countryCode?: string;
  enhancedContrast?: boolean;
}

const Globe3D: React.FC<GlobeProps> = ({ 
  width = 600, 
  height = 600, 
  countryCode,
  enhancedContrast = false 
}) => {
  const { t } = useTranslation();
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
        
        const isTargetCountry = countryCode && 
          (supabaseCountry?.id === countryCode || 
           country.properties.NAME.toLowerCase().includes(countryCode.toLowerCase()));
        
        return {
          ...country,
          hasData: !!supabaseCountry,
          countryData: supabaseCountry,
          isTarget: isTargetCountry,
          // Enhanced colors for better contrast
          color: isTargetCountry 
            ? '#3B82F6' // Bright blue for target country
            : supabaseCountry 
              ? '#FF6B35' // Orange for available countries
              : enhancedContrast 
                ? '#9CA3AF' // Darker gray for unavailable when enhanced
                : '#E5E7EB', // Light gray for unavailable
          opacity: isTargetCountry ? 1 : supabaseCountry ? 0.9 : enhancedContrast ? 0.6 : 0.3,
          strokeColor: enhancedContrast ? '#374151' : '#FFFFFF', // Darker borders when enhanced
          strokeWidth: enhancedContrast ? 0.8 : 0.5
        };
      });
      setCountries(countriesWithData);
    }
  }, [worldData, supabaseCountries, countryCode, enhancedContrast]);

  // Prepare cities data for globe
  useEffect(() => {
    if (supabaseCities.length > 0) {
      const citiesData = supabaseCities
        .filter(city => city.latitude && city.longitude)
        .filter(city => !countryCode || city.country_id === countryCode) // Filter by country if specified
        .map(city => ({
          lat: city.latitude,
          lng: city.longitude,
          name: city.name,
          slug: city.slug,
          country_id: city.country_id,
          size: countryCode ? 0.6 : 0.4, // Larger markers for focused country
          color: '#10B981' // Bright green for cities
        }));
      setCities(citiesData);
    }
  }, [supabaseCities, countryCode]);

  // Auto-rotate globe (disable for country-specific view)
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = !countryCode;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      
      // Focus on specific country if provided
      if (countryCode && countries.length > 0) {
        const targetCountry = countries.find(c => c.isTarget);
        if (targetCountry && targetCountry.geometry) {
          // Calculate center of country bounds
          const bounds = targetCountry.geometry.coordinates;
          // This is a simplified approach - you might want to use a proper bounds calculation
          globeRef.current.pointOfView({ altitude: 1.5 }, 1000);
        }
      }
    }
  }, [countryCode, countries]);

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
        
        // Countries with enhanced styling
        polygonsData={countries}
        polygonAltitude={0.015}
        polygonCapColor={(d: any) => d.color}
        polygonSideColor={(d: any) => d.color}
        polygonStrokeColor={(d: any) => d.strokeColor}
        polygonLabel={(d: any) => d.hasData ? `${d.countryData.flag} ${d.countryData.name}` : ''}
        onPolygonClick={handleCountryClick}
        onPolygonHover={handleCountryHover}
        
        // Cities with enhanced visibility
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
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border-2 border-primary/20 max-w-xs z-20">
          <div className="flex items-center space-x-3 mb-2">
            {tooltipData.flag && <span className="text-2xl">{tooltipData.flag}</span>}
            <div>
              <h3 className="font-bold text-foreground text-lg">{tooltipData.name}</h3>
              {tooltipData.continent && (
                <p className="text-sm text-muted-foreground">{tooltipData.continent}</p>
              )}
            </div>
          </div>
          {tooltipData.type === 'country' && !countryCode && (
            <button 
              onClick={() => navigate(`/paises/${hoveredCountry?.countryData?.id}`)}
              className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors w-full"
            >
              🔍 {t('common.view')} {t('nav.countries')}
            </button>
          )}
          {tooltipData.type === 'city' && (
            <div className="text-xs text-primary font-medium">
              🏙️ {t('countries.legend.clickExplore')}
            </div>
          )}
        </div>
      )}
      
      {/* Enhanced Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 text-sm shadow-xl border-2 border-primary/20">
        <h4 className="font-bold text-foreground mb-3">{t('countries.legend.title')}</h4>
        <div className="space-y-2">
          {countryCode && (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-[#3B82F6] rounded-sm"></div>
              <span className="text-muted-foreground">Current Country</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#FF6B35] rounded-sm"></div>
            <span className="text-muted-foreground">{t('countries.legend.availableDestination')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#10B981] rounded-full"></div>
            <span className="text-muted-foreground">Cities</span>
          </div>
          {enhancedContrast && (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-[#9CA3AF] rounded-sm"></div>
              <span className="text-muted-foreground">{t('countries.legend.otherCountries')}</span>
            </div>
          )}
        </div>
        <div className="mt-3 pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">{t('countries.legend.clickExplore')}</p>
          <p className="text-xs text-muted-foreground">{t('countries.legend.dragRotate')}</p>
        </div>
      </div>
    </div>
  );
};

export default Globe3D;
