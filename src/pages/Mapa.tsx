
import React, { useState } from 'react';
import { Search, Filter, X, MapPin, DollarSign, Home, Plane } from 'lucide-react';

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
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterContinent, setFilterContinent] = useState('all');
  const [filterType, setFilterType] = useState('all');

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

  const continents = ['all', 'Europa', 'América del Norte', 'América del Sur', 'Asia', 'Oceanía', 'África'];
  const types = ['all', 'erasmus', 'internship', 'gap-year'];

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         country.capital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent = filterContinent === 'all' || country.continent === filterContinent;
    return matchesSearch && matchesContinent;
  });

  const getCostIcon = (cost: string) => {
    switch (cost) {
      case 'low': return '€';
      case 'medium': return '€€';
      case 'high': return '€€€';
      default: return '€';
    }
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-black mb-4">MAPA INTERACTIVO MUNDIAL</h1>
            <p className="text-xl text-gray-600">
              Si ya sabes a dónde quieres ir, ¡mira el mapa interactivo y selecciona tu país!
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar país o ciudad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            
            <select
              value={filterContinent}
              onChange={(e) => setFilterContinent(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="all">Todos los continentes</option>
              {continents.slice(1).map(continent => (
                <option key={continent} value={continent}>{continent}</option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="all">Todos los tipos</option>
              <option value="erasmus">Erasmus</option>
              <option value="internship">Prácticas</option>
              <option value="gap-year">Gap Year</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Interactive World Map Placeholder */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
            {/* Simple SVG World Map */}
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              {/* Simplified world map shapes */}
              <path
                d="M 200 150 L 300 140 L 350 160 L 320 200 L 250 190 Z"
                fill="#e5e7eb"
                stroke="#d1d5db"
                strokeWidth="1"
                className="hover:fill-gray-300 cursor-pointer transition-colors"
                onClick={() => setSelectedCountry(countries.find(c => c.id === 'argentina') || null)}
              />
              <path
                d="M 150 100 L 280 90 L 300 130 L 200 140 Z"
                fill="#e5e7eb"
                stroke="#d1d5db"
                strokeWidth="1"
                className="hover:fill-gray-300 cursor-pointer transition-colors"
                onClick={() => setSelectedCountry(countries.find(c => c.id === 'canada') || null)}
              />
              <path
                d="M 450 120 L 520 110 L 540 140 L 480 150 Z"
                fill="#e5e7eb"
                stroke="#d1d5db"
                strokeWidth="1"
                className="hover:fill-gray-300 cursor-pointer transition-colors"
                onClick={() => setSelectedCountry(countries.find(c => c.id === 'germany') || null)}
              />
              
              {/* Map pins for available countries */}
              <circle cx="275" cy="170" r="8" fill="#000" className="cursor-pointer" onClick={() => setSelectedCountry(countries.find(c => c.id === 'argentina') || null)} />
              <circle cx="225" cy="115" r="8" fill="#000" className="cursor-pointer" onClick={() => setSelectedCountry(countries.find(c => c.id === 'canada') || null)} />
              <circle cx="485" cy="135" r="8" fill="#000" className="cursor-pointer" onClick={() => setSelectedCountry(countries.find(c => c.id === 'germany') || null)} />
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Globe className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-semibold">Haz clic en un país para ver información</p>
                <p className="text-sm">Los puntos negros indican destinos disponibles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCountries.map((country) => (
            <div
              key={country.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedCountry(country)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-black">{country.name}</h3>
                <span className={`text-2xl font-bold ${getCostColor(country.costOfLiving)}`}>
                  {getCostIcon(country.costOfLiving)}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{country.capital}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  <span>{country.continent}</span>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {country.description}
              </p>
              
              <button className="w-full bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                Ver más información
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
                    <span className="font-semibold">Capital</span>
                  </div>
                  <p className="text-gray-700">{selectedCountry.capital}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="font-semibold">Costo de vida</span>
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
                  <p className="text-gray-700">{selectedCountry.visaRequired ? 'Sí' : 'No'}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-4">Descripción</h3>
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
