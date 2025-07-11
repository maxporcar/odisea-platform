
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Users, DollarSign, Globe, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCountries } from '../../hooks/useCountries';
import Globe3D from '../../components/Globe3D';
import type { Database } from '@/integrations/supabase/types';

type Country = Database['public']['Tables']['countries']['Row'];

const PaisesIndex = () => {
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
      case 'low': return 'text-emerald-600';
      case 'medium': return 'text-amber-600';
      case 'high': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-xl text-primary font-semibold">Cargando países...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Error al cargar países</h2>
          <p className="text-muted-foreground mb-4">No pudimos cargar la información de los países.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Interactive 3D Globe Section */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              🌍 Explora países en 3D
            </h1>
            <p className="text-xl text-muted-foreground">
              Haz clic en cualquier país para descubrir más información
            </p>
          </div>

          {/* Globe container with overlaid search */}
          <div className="relative" style={{ height: '500px' }}>
            <Globe3D width={800} height={500} />
            
            {/* Search and Filters overlaid on globe */}
            <div className="absolute top-4 left-0 right-0 z-10">
              <div className="max-w-4xl mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <input
                      type="text"
                      placeholder="🔍 Buscar país o capital..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80"
                    />
                  </div>
                  
                  <select
                    value={filterContinent}
                    onChange={(e) => setFilterContinent(e.target.value)}
                    className="px-4 py-3 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80"
                  >
                    <option value="all">🌎 Todos los continentes</option>
                    {continents.slice(1).map(continent => (
                      <option key={continent} value={continent}>{continent}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results summary */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            📋 Países disponibles
          </h2>
          <p className="text-muted-foreground">
            {filteredCountries.length} de {countries.length} países
            {searchTerm && ` que coinciden con "${searchTerm}"`}
          </p>
        </div>

        {/* Countries Grid */}
        {filteredCountries.length === 0 ? (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No se encontraron países</h3>
            <p className="text-muted-foreground">Intenta con otros términos de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map((country) => (
              <Link
                key={country.id}
                to={`/paises/${country.id}`}
                className="bg-card rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all transform hover:scale-105 border group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{country.flag || '🌍'}</span>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {country.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{country.capital}</p>
                    </div>
                  </div>
                  <span className={`text-2xl font-bold ${getCostColor(country.cost_of_living)}`}>
                    {getCostIcon(country.cost_of_living)}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
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
                
                <p className="text-foreground text-sm line-clamp-3">
                  {country.description}
                </p>
                
                {/* Hover effect indicator */}
                <div className="mt-4 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver más detalles →
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaisesIndex;
