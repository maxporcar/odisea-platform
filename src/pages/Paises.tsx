
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Globe, Users, DollarSign, Loader2, AlertCircle } from 'lucide-react';
import { useCountries } from '../hooks/useCountries';

const Paises = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterContinent, setFilterContinent] = useState('all');
  
  const { data: countries, isLoading, error } = useCountries();

  const filteredCountries = countries?.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         country.capital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent = filterContinent === 'all' || country.continent === filterContinent;
    return matchesSearch && matchesContinent;
  }) || [];

  const continents = [...new Set(countries?.map(c => c.continent).filter(Boolean) || [])];

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getCostIcon = (cost: string) => {
    switch (cost) {
      case 'low': return '$';
      case 'medium': return '$$';
      case 'high': return '$$$';
      default: return '$';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-xl text-foreground">{t('common.loading')}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">{t('common.error')}</h2>
          <p className="text-muted-foreground">{t('countries.errorLoading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/50 border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t('countries.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('countries.subtitle')}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder={t('countries.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              />
            </div>
            
            <select
              value={filterContinent}
              onChange={(e) => setFilterContinent(e.target.value)}
              className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
            >
              <option value="all">{t('countries.allContinents')}</option>
              {continents.map(continent => (
                <option key={continent} value={continent}>{continent}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCountries.map((country) => (
            <div
              key={country.id}
              className="bg-card rounded-lg shadow-md border border-border p-6 hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
              onClick={() => navigate(`/paises/${country.slug || country.id}`)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{country.flag || '🌍'}</span>
                  <h3 className="text-xl font-bold text-foreground">{country.name}</h3>
                </div>
                <span className={`text-2xl font-bold ${getCostColor(country.cost_of_living)}`}>
                  {getCostIcon(country.cost_of_living)}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{country.capital}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{country.continent}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{country.population}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {country.description}
              </p>
              
              <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                {t('countries.seeMore')}
              </button>
            </div>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t('countries.noResults')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paises;
