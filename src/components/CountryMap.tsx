
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCountryMapData } from '@/hooks/useCountryMapData';
import { Loader2, AlertCircle } from 'lucide-react';

// Function to convert lat/lng to SVG coordinates for each country
const getCoordinatesForCountry = (countryId: string, lat: number, lng: number) => {
  switch (countryId.toLowerCase()) {
    case 'france':
      // France bounds: lat 41.3-51.1, lng -5.1-9.6
      const frX = ((lng - (-5.1)) / (9.6 - (-5.1))) * 600 + 100;
      const frY = ((51.1 - lat) / (51.1 - 41.3)) * 400 + 100;
      return { x: frX, y: frY };
    
    case 'spain':
      // Spain bounds: lat 35.2-43.8, lng -9.3-4.3
      const spX = ((lng - (-9.3)) / (4.3 - (-9.3))) * 600 + 100;
      const spY = ((43.8 - lat) / (43.8 - 35.2)) * 350 + 150;
      return { x: spX, y: spY };
    
    case 'canada':
      // Canada bounds: lat 41.7-83.1, lng -141.0--52.6
      const caX = ((lng - (-141.0)) / ((-52.6) - (-141.0))) * 700 + 50;
      const caY = ((83.1 - lat) / (83.1 - 41.7)) * 400 + 80;
      return { x: caX, y: caY };
    
    default:
      // Generic conversion
      const defX = ((lng + 180) / 360) * 600 + 100;
      const defY = ((90 - lat) / 180) * 400 + 100;
      return { x: defX, y: defY };
  }
};

// More detailed SVG maps for different countries
const countryMaps: Record<string, React.ReactNode> = {
  france: (
    <svg viewBox="0 0 800 600" className="w-full h-full">
      {/* France detailed outline */}
      <path
        d="M200 200 L250 180 L300 170 L350 165 L400 160 L450 155 L500 158 L550 165 L580 180 L600 200 L610 220 L615 240 L620 260 L625 280 L630 300 L635 320 L640 340 L638 360 L635 380 L630 400 L620 420 L600 435 L580 445 L560 450 L540 455 L520 458 L500 460 L480 458 L460 455 L440 450 L420 445 L400 440 L380 430 L360 420 L340 405 L320 390 L300 375 L280 360 L260 340 L240 320 L220 300 L205 280 L195 260 L190 240 L195 220 Z"
        fill="#FEF3C7"
        stroke="#D97706"
        strokeWidth="2"
        className="drop-shadow-sm hover:fill-yellow-100 transition-colors cursor-pointer"
      />
      {/* Corsica */}
      <path
        d="M580 420 L590 415 L595 425 L590 435 L585 430 Z"
        fill="#FEF3C7"
        stroke="#D97706"
        strokeWidth="2"
        className="hover:fill-yellow-100 transition-colors cursor-pointer"
      />
    </svg>
  ),
  spain: (
    <svg viewBox="0 0 800 600" className="w-full h-full">
      {/* Spain detailed outline */}
      <path
        d="M120 250 L180 240 L240 235 L300 230 L360 225 L420 220 L480 225 L540 230 L600 240 L650 255 L680 275 L700 300 L710 325 L715 350 L710 375 L700 400 L680 420 L650 435 L620 445 L580 450 L540 455 L500 458 L460 455 L420 450 L380 445 L340 435 L300 420 L260 400 L220 375 L180 350 L150 325 L130 300 L125 275 Z"
        fill="#FEF3C7"
        stroke="#D97706"
        strokeWidth="2"
        className="drop-shadow-sm hover:fill-yellow-100 transition-colors cursor-pointer"
      />
      {/* Balearic Islands */}
      <path
        d="M580 380 L590 375 L600 380 L595 390 L585 385 Z"
        fill="#FEF3C7"
        stroke="#D97706"
        strokeWidth="2"
        className="hover:fill-yellow-100 transition-colors cursor-pointer"
      />
      {/* Canary Islands */}
      <path
        d="M80 450 L90 445 L100 450 L95 460 L85 455 Z"
        fill="#FEF3C7"
        stroke="#D97706"
        strokeWidth="2"
        className="hover:fill-yellow-100 transition-colors cursor-pointer"
      />
    </svg>
  ),
  canada: (
    <svg viewBox="0 0 800 600" className="w-full h-full">
      {/* Canada detailed outline with provinces */}
      <path
        d="M50 200 L100 150 L150 120 L200 100 L250 90 L300 85 L350 80 L400 75 L450 70 L500 68 L550 70 L600 75 L650 85 L700 100 L740 120 L770 150 L790 180 L795 210 L790 240 L780 270 L765 300 L745 330 L720 360 L690 390 L655 415 L620 435 L580 450 L540 460 L500 465 L460 468 L420 465 L380 460 L340 450 L300 435 L260 415 L220 390 L180 360 L145 330 L115 300 L90 270 L70 240 L60 210 Z"
        fill="#FEF3C7"
        stroke="#D97706"
        strokeWidth="2"
        className="drop-shadow-sm hover:fill-yellow-100 transition-colors cursor-pointer"
      />
      {/* Great Lakes */}
      <ellipse cx="580" cy="380" rx="25" ry="15" fill="#93C5FD" />
      <ellipse cx="620" cy="390" rx="20" ry="12" fill="#93C5FD" />
      <ellipse cx="540" cy="400" rx="18" ry="10" fill="#93C5FD" />
      {/* Hudson Bay */}
      <ellipse cx="450" cy="250" rx="40" ry="60" fill="#93C5FD" />
    </svg>
  ),
  // Default shape for countries without specific maps
  default: (
    <svg viewBox="0 0 800 600" className="w-full h-full">
      <path
        d="M150 200 L250 180 L350 170 L450 165 L550 170 L650 180 L720 200 L750 230 L770 260 L765 290 L750 320 L720 350 L680 380 L630 400 L580 410 L530 415 L480 410 L430 400 L380 380 L330 350 L280 320 L230 290 L190 260 L170 230 L150 200 Z"
        fill="#FEF3C7"
        stroke="#D97706"
        strokeWidth="2"
        className="drop-shadow-sm hover:fill-yellow-100 transition-colors cursor-pointer"
      />
    </svg>
  )
};

// Get capital city name for each country
const getCapitalCity = (countryId: string) => {
  const capitals: Record<string, string> = {
    france: 'Paris',
    spain: 'Madrid', 
    canada: 'Ottawa'
  };
  return capitals[countryId.toLowerCase()];
};

const CountryMap: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading, error } = useCountryMapData();

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-montserrat text-xl font-bold text-foreground flex items-center">
            🗺️ {t('countryDetail.map.title', 'Study Destinations')}
          </h3>
        </div>
        <div className="p-6 flex items-center justify-center h-96">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-xl text-primary font-poppins">{t('common.loading', 'Loading...')}</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-montserrat text-xl font-bold text-foreground flex items-center">
            🗺️ {t('countryDetail.map.title', 'Study Destinations')}
          </h3>
        </div>
        <div className="p-6 flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-red-600">{t('common.error', 'Error loading map data')}</p>
          </div>
        </div>
      </div>
    );
  }

  const { country, cities } = data;
  
  // Get the appropriate map or use default
  const mapComponent = countryMaps[country.id.toLowerCase()] || countryMaps.default;
  
  // Get capital city name
  const capitalCity = getCapitalCity(country.id);
  
  // Create city markers based on database cities with real coordinates
  const cityMarkers = cities.map(city => {
    if (!city.latitude || !city.longitude) return null;
    
    const position = getCoordinatesForCountry(country.id, city.latitude, city.longitude);
    const hasGuide = !!city.description;
    const isCapital = city.name.toLowerCase() === capitalCity?.toLowerCase();
    
    return {
      ...city,
      ...position,
      hasGuide,
      isCapital
    };
  }).filter(Boolean);

  const handleCityClick = (city: any) => {
    if (city.hasGuide && city.slug) {
      navigate(`/paises/${country.id}/ciudades/${city.slug}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="font-montserrat text-xl font-bold text-foreground flex items-center">
          🗺️ {t('countryDetail.map.title', 'Study Destinations')}
        </h3>
      </div>
      
      <div className="p-6">
        <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden">
          {/* Country Map */}
          <div className="absolute inset-0">
            {mapComponent}
          </div>
          
          {/* Country Name Label */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">
                  {country.id === 'canada' && '🍁'}
                  {country.id === 'france' && '🇫🇷'}
                  {country.id === 'spain' && '🇪🇸'}
                  {country.id !== 'canada' && country.id !== 'france' && country.id !== 'spain' && '🌍'}
                </span>
                <span className="font-montserrat text-lg font-bold text-primary">
                  {country.name.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          
          {/* City Markers */}
          {cityMarkers.map((city) => city && (
            <div
              key={city.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 group z-20 ${
                city.hasGuide ? 'cursor-pointer' : 'cursor-default'
              }`}
              style={{ left: `${city.x}px`, top: `${city.y}px` }}
              onClick={() => handleCityClick(city)}
            >
              <div className={`
                w-6 h-6 rounded-full shadow-lg border-2 border-white transition-all duration-300 
                ${city.hasGuide 
                  ? 'bg-teal-500 hover:bg-teal-600 hover:scale-125 hover:shadow-xl' 
                  : 'bg-gray-400 hover:bg-gray-500 hover:scale-110'
                }
                ${city.isCapital ? 'ring-3 ring-yellow-400 ring-offset-2 bg-yellow-500 hover:bg-yellow-600' : ''}
              `}>
                {city.isCapital && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs">★</span>
                  </div>
                )}
              </div>
              
              {/* City name tooltip */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30">
                <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
                  <div className="font-semibold">{city.name}</div>
                  {city.isCapital && (
                    <div className="text-xs text-yellow-200">{t('countryDetail.map.capital', 'Capital City')}</div>
                  )}
                  {city.hasGuide && (
                    <div className="text-xs text-green-200">{t('countryDetail.map.clickToExplore', 'Click to explore')}</div>
                  )}
                  {!city.hasGuide && (
                    <div className="text-xs text-gray-300">{t('countryDetail.map.comingSoon', 'Coming soon')}</div>
                  )}
                </div>
                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 className="font-poppins text-sm font-semibold text-gray-700 mb-3">
            {t('countryDetail.map.legend', 'Study Destinations')}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-yellow-500 rounded-full border-2 border-white shadow ring-2 ring-yellow-400 ring-offset-1 flex items-center justify-center">
                <span className="text-white text-xs">★</span>
              </div>
              <span className="font-poppins text-sm text-gray-600">
                {t('countryDetail.map.capital', 'Capital city')}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-teal-500 rounded-full border-2 border-white shadow"></div>
              <span className="font-poppins text-sm text-gray-600">
                {t('countryDetail.map.availableGuides', 'Available city guides')}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-400 rounded-full border-2 border-white shadow"></div>
              <span className="font-poppins text-sm text-gray-600">
                {t('countryDetail.map.comingSoon', 'Coming soon')}
              </span>
            </div>
          </div>
          
          <p className="font-poppins text-xs text-gray-500 mt-4">
            {t('countryDetail.map.instruction', 'Click on available cities to explore comprehensive study guides')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryMap;
