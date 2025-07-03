
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Users, DollarSign, Globe, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCountries } from '../hooks/useCountries';
import type { Database } from '@/integrations/supabase/types';

type Country = Database['public']['Tables']['countries']['Row'];

const Paises = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterContinent, setFilterContinent] = useState('all');
  
  const { data: countries = [], isLoading, error } = useCountries();

  const continents = ['all', 'Europa', 'América del Norte', 'América del Sur', 'Asia', 'Oceanía'];

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-8 h-8 animate-spin text-warm-orange" />
          <span className="text-xl text-warm-orange font-poppins">Cargando países...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar países</h2>
          <p className="text-gray-600 mb-4">No pudimos cargar la información de los países.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-warm-orange text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-warm-orange mb-4 font-poppins">
              {t('countries.title')}
            </h1>
            <p className="text-xl text-amber-700 font-poppins">
              {t('countries.subtitle')}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {countries.length} países disponibles
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar país o capital..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-full focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-transparent bg-white/90 backdrop-blur-sm font-poppins"
              />
            </div>
            
            <select
              value={filterContinent}
              onChange={(e) => setFilterContinent(e.target.value)}
              className="px-4 py-3 border border-orange-200 rounded-full focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-transparent font-poppins"
            >
              <option value="all">Todos los continentes</option>
              {continents.slice(1).map(continent => (
                <option key={continent} value={continent}>{continent}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Countries Grid */}
        {filteredCountries.length === 0 ? (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron países</h3>
            <p className="text-gray-600">Intenta con otros términos de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map((country) => (
              <div
                key={country.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{country.flag || '🌍'}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 font-poppins">{country.name}</h3>
                      <p className="text-sm text-gray-600">{country.capital}</p>
                    </div>
                  </div>
                  <span className={`text-2xl font-bold ${getCostColor(country.cost_of_living)}`}>
                    {getCostIcon(country.cost_of_living)}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    <span>{country.continent}</span>
                  </div>
                  {country.student_population && (
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{country.student_population} estudiantes</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{country.currency}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {country.description}
                </p>
                
                <div className="flex space-x-2">
                  <Link
                    to={`/paises/${country.id}`}
                    className="flex-1 bg-warm-orange text-white py-2 px-4 rounded-full font-semibold hover:bg-orange-600 transition-colors text-center text-sm font-poppins"
                  >
                    Ver detalles
                  </Link>
                  <Link
                    to="/testimonios"
                    className="bg-gray-100 text-gray-700 py-2 px-4 rounded-full font-semibold hover:bg-gray-200 transition-colors text-sm font-poppins"
                  >
                    Testimonios
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Paises;
