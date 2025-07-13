
import React, { useState } from 'react';
import { Search, Filter, X, MapPin, DollarSign, Home, Plane, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InteractiveGlobe from '../components/InteractiveGlobe';

interface Country {
  id: string;
  name: string;
  continent: string;
  capital: string;
  language: string;
  currency: string;
  visaRequired: boolean;
  costOfLiving: 'low' | 'medium' | 'high';
  description: string;
  highlights: string[];
  universities: string[];
}

const Mapa = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterContinent, setFilterContinent] = useState('all');

  // Sample data - in a real app this would come from a CMS/API
  const countries: Country[] = [
    {
      id: 'argentina',
      name: 'Argentina',
      continent: 'América del Sur',
      capital: 'Buenos Aires',
      language: 'Español',
      currency: 'Peso Argentino (ARS)',
      visaRequired: false,
      costOfLiving: 'low',
      description: 'Buenos Aires es una ciudad que vive, respira y baila. Como estudiante internacional, descubrirás una mezcla única de encanto europeo y alma latina.',
      highlights: [
        'Vida nocturna vibrante y cultura del tango',
        'Costo de vida accesible para estudiantes',
        'Rica vida cultural con museos y teatros',
        'Gastronomía excepcional'
      ],
      universities: ['Universidad de Buenos Aires', 'Universidad Católica Argentina']
    },
    {
      id: 'canada',
      name: 'Canadá',
      continent: 'América del Norte',
      capital: 'Ottawa',
      language: 'Inglés/Francés',
      currency: 'Dólar Canadiense (CAD)',
      visaRequired: true,
      costOfLiving: 'high',
      description: 'Canadá ofrece una experiencia multicultural única con algunas de las mejores universidades del mundo y una calidad de vida excepcional.',
      highlights: [
        'Sistema educativo de alta calidad',
        'Sociedad multicultural y acogedora',
        'Oportunidades de trabajo durante y después del estudio',
        'Paisajes naturales impresionantes'
      ],
      universities: ['University of Toronto', 'McGill University', 'University of British Columbia']
    },
    {
      id: 'germany',
      name: 'Alemania',
      continent: 'Europa',
      capital: 'Berlín',
      language: 'Alemán',
      currency: 'Euro (EUR)',
      visaRequired: true,
      costOfLiving: 'medium',
      description: 'Alemania combina tradición e innovación, ofreciendo educación de calidad mundial en un entorno culturalmente rico.',
      highlights: [
        'Educación universitaria gratuita en universidades públicas',
        'Fuerte economía con oportunidades profesionales',
        'Rica historia y cultura',
        'Excelente sistema de transporte público'
      ],
      universities: ['Technical University of Munich', 'Heidelberg University', 'Humboldt University']
    }
  ];

  const continents = ['all', ...(t('countries.filters.continents', { returnObjects: true }) as string[])];

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         country.capital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent = filterContinent === 'all' || country.continent === filterContinent;
    return matchesSearch && matchesContinent;
  });

  const handleGlobeCountryClick = (countryId: string) => {
    navigate(`/paises/${countryId}`);
  };

  const getCostIcon = (cost: string) => {
    return t(`countries.cost.${cost}` as any) || t('countries.cost.low');
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-warm-orange mb-4 font-poppins">
              {t('map.title')}
            </h1>
            <p className="text-lg sm:text-xl text-amber-700 font-poppins">
              {t('map.subtitle')}
            </p>
          </div>

          {/* Search and Filters - Responsive */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('map.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-full focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-transparent bg-white/90 backdrop-blur-sm font-poppins text-sm sm:text-base"
              />
            </div>
            
            <select
              value={filterContinent}
              onChange={(e) => setFilterContinent(e.target.value)}
              className="px-4 py-3 border border-orange-200 rounded-full focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-transparent font-poppins text-sm sm:text-base"
            >
              <option value="all">{t('map.allContinents')}</option>
              {continents.slice(1).map(continent => (
                <option key={continent} value={continent}>{continent}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Interactive Globe - Responsive Container */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 font-poppins text-center">
            {t('map.interactiveGlobe')}
          </h2>
          <div className="w-full max-w-6xl mx-auto">
            <InteractiveGlobe onCountryClick={handleGlobeCountryClick} />
          </div>
        </div>

        {/* Countries Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCountries.map((country) => (
            <div
              key={country.id}
              className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
              onClick={() => navigate(`/paises/${country.id}`)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-black font-poppins">{country.name}</h3>
                <span className={`text-xl sm:text-2xl font-bold ${getCostColor(country.costOfLiving)}`}>
                  {getCostIcon(country.costOfLiving)}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{country.capital}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{country.continent}</span>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {country.description}
              </p>
              
              <button className="w-full bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base">
                {t('map.seeMoreInfo')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Country Detail Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-black">{selectedCountry.name}</h2>
              <button
                onClick={() => setSelectedCountry(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="font-semibold">{t('countryDetail.continent')}</span>
                  </div>
                  <p className="text-gray-700">{selectedCountry.capital}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="font-semibold">{t('countryDetail.costOfLiving')}</span>
                  </div>
                  <p className={`font-bold ${getCostColor(selectedCountry.costOfLiving)}`}>
                    {getCostIcon(selectedCountry.costOfLiving)}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <Plane className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="font-semibold">Visa requerida</span>
                  </div>
                  <p className="text-gray-700">{selectedCountry.visaRequired ? t('common.yes') : t('common.no')}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-4">{t('countryDetail.about', { country: '' })}</h3>
                <p className="text-gray-700 leading-relaxed">{selectedCountry.description}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-4">Por qué elegir {selectedCountry.name}</h3>
                <ul className="space-y-2">
                  {selectedCountry.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-4">Universidades destacadas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCountry.universities.map((university, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-xl">
                      <p className="font-semibold text-gray-800">{university}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                  Información de visa y alojamiento
                </button>
                <button className="flex-1 border-2 border-black text-black py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-colors">
                  Contactar con estudiantes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mapa;
