import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Database } from '@/integrations/supabase/types';

type City = Database['public']['Tables']['cities']['Row'];

interface CountryMapProps {
  countryId: string;
  countryName: string;
  cities: City[];
}

// SVG maps for different countries (simplified outlines)
const countryMaps: Record<string, React.ReactNode> = {
  canada: (
    <svg viewBox="0 0 800 600" className="w-full h-full">
      {/* Canada outline */}
      <path
        d="M100 150 L150 100 L200 80 L250 70 L300 65 L350 60 L400 55 L450 50 L500 55 L550 60 L600 70 L650 80 L700 100 L750 130 L780 150 L790 180 L785 220 L775 260 L760 300 L740 340 L720 380 L690 420 L650 450 L600 470 L550 480 L500 485 L450 490 L400 485 L350 480 L300 470 L250 450 L200 420 L150 380 L120 340 L100 300 L90 260 L85 220 L90 180 Z"
        fill="#FEF3C7"
        stroke="#D97706"
        strokeWidth="2"
        className="drop-shadow-sm"
      />
      {/* Internal borders/provinces */}
      <path
        d="M200 100 L200 450"
        stroke="#E5E7EB"
        strokeWidth="1"
        strokeDasharray="5,5"
      />
      <path
        d="M350 80 L350 470"
        stroke="#E5E7EB"
        strokeWidth="1"
        strokeDasharray="5,5"
      />
      <path
        d="M500 70 L500 480"
        stroke="#E5E7EB"
        strokeWidth="1"
        strokeDasharray="5,5"
      />
      <path
        d="M650 90 L650 460"
        stroke="#E5E7EB"
        strokeWidth="1"
        strokeDasharray="5,5"
      />
    </svg>
  ),
  spain: (
    <svg viewBox="0 0 800 600" className="w-full h-full">
      <path
        d="M100 200 L200 180 L300 170 L400 165 L500 160 L600 165 L700 170 L750 190 L780 220 L785 250 L780 280 L770 310 L750 340 L720 370 L680 390 L640 400 L600 405 L550 410 L500 405 L450 400 L400 395 L350 390 L300 380 L250 370 L200 350 L150 330 L120 310 L100 280 L95 250 L100 220 Z"
        fill="#FEF3C7"
        stroke="#D97706"
        strokeWidth="2"
        className="drop-shadow-sm"
      />
    </svg>
  ),
  france: (
    <svg viewBox="0 0 800 600" className="w-full h-full">
      <path
        d="M200 150 L300 130 L400 120 L500 125 L600 140 L650 170 L680 200 L690 230 L685 260 L675 290 L660 320 L640 350 L610 380 L570 400 L530 410 L490 415 L450 410 L410 400 L370 380 L330 350 L290 320 L250 290 L220 260 L200 230 L195 200 L200 170 Z"
        fill="#FEF3C7"
        stroke="#D97706"
        strokeWidth="2"
        className="drop-shadow-sm"
      />
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
        className="drop-shadow-sm"
      />
    </svg>
  )
};

// City positions for different countries (relative to SVG viewBox)
const cityPositions: Record<string, Record<string, { x: number; y: number; isCapital?: boolean }>> = {
  canada: {
    toronto: { x: 600, y: 400 },
    vancouver: { x: 150, y: 350 },
    montreal: { x: 650, y: 380 },
    calgary: { x: 300, y: 320 },
    ottawa: { x: 620, y: 370, isCapital: true },
    quebec: { x: 680, y: 360 },
    winnipeg: { x: 400, y: 350 },
    halifax: { x: 750, y: 390 },
  },
  spain: {
    madrid: { x: 400, y: 300, isCapital: true },
    barcelona: { x: 650, y: 250 },
    valencia: { x: 580, y: 320 },
    sevilla: { x: 300, y: 380 },
    bilbao: { x: 350, y: 220 },
    granada: { x: 320, y: 370 },
  },
  france: {
    paris: { x: 450, y: 250, isCapital: true },
    lyon: { x: 500, y: 320 },
    marseille: { x: 520, y: 380 },
    toulouse: { x: 350, y: 360 },
    nice: { x: 580, y: 390 },
    strasbourg: { x: 580, y: 220 },
  }
};

const CountryMap: React.FC<CountryMapProps> = ({ countryId, countryName, cities }) => {
  const { t } = useTranslation();
  
  // Get the appropriate map or use default
  const mapComponent = countryMaps[countryId.toLowerCase()] || countryMaps.default;
  
  // Get city positions for this country
  const positions = cityPositions[countryId.toLowerCase()] || {};
  
  // Create city markers based on database cities and positions
  const cityMarkers = cities
    .filter(city => positions[city.name.toLowerCase()])
    .map(city => {
      const position = positions[city.name.toLowerCase()];
      const hasGuide = !!city.description; // Check if city has content
      
      return {
        ...city,
        ...position,
        hasGuide
      };
    });

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
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🍁</span>
                <span className="font-montserrat text-lg font-bold text-primary">
                  {countryName.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          
          {/* City Markers */}
          {cityMarkers.map((city) => (
            <div
              key={city.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${city.x}px`, top: `${city.y}px` }}
            >
              <div className={`
                w-6 h-6 rounded-full shadow-lg border-2 border-white transition-all duration-200 
                ${city.hasGuide 
                  ? 'bg-teal-500 hover:bg-teal-600 hover:scale-110' 
                  : 'bg-gray-400 hover:bg-gray-500'
                }
                ${city.isCapital ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}
              `}>
              </div>
              
              {/* City name tooltip */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {city.name}
                  {city.isCapital && ' (Capital)'}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 className="font-poppins text-sm font-semibold text-gray-700 mb-3">
            {t('countryDetail.map.legend', 'Study Destinations')}
          </h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-teal-500 rounded-full border-2 border-white shadow"></div>
              <span className="font-poppins text-sm text-gray-600">
                {t('countryDetail.map.availableGuides', 'Available city guides')}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gray-400 rounded-full border-2 border-white shadow"></div>
              <span className="font-poppins text-sm text-gray-600">
                {t('countryDetail.map.comingSoon', 'Coming soon')}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-teal-500 rounded-full border-2 border-white shadow ring-2 ring-yellow-400 ring-offset-1"></div>
              <span className="font-poppins text-sm text-gray-600">
                {t('countryDetail.map.capital', 'Capital city')}
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