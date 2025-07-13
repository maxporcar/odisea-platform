
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Users, DollarSign, Globe, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCountries } from '../../hooks/useCountries';
import { useCities } from '../../hooks/useCities';
import Globe3D from '../../components/Globe3D';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import type { Database } from '@/integrations/supabase/types';

type Country = Database['public']['Tables']['countries']['Row'];
type City = Database['public']['Tables']['cities']['Row'];

const PaisesIndex = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterContinent, setFilterContinent] = useState('all');
  
  const { data: countries = [], isLoading, error } = useCountries();
  const { data: cities = [], isLoading: citiesLoading } = useCities();

  // Get continents from translation
  const continents = ['all', ...(t('countries.filters.continents', { returnObjects: true }) as string[])];

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         country.capital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent = filterContinent === 'all' || country.continent === filterContinent;
    return matchesSearch && matchesContinent;
  });

  const filteredCities = cities.filter(city => {
    const countryName = countries.find(c => c.id === city.country_id)?.name || '';
    return city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           countryName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getCostIcon = (cost: string) => {
    return t(`countries.cost.${cost}` as any) || t('countries.cost.low');
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
          <span className="text-xl text-primary font-semibold">{t('countries.loading')}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">{t('countries.error.title')}</h2>
          <p className="text-muted-foreground mb-4">{t('countries.error.description')}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            {t('countries.error.retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Interactive 3D Globe Section - Improved responsive design */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2 sm:mb-4">
              {t('countries.hero.title')}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
              {t('countries.hero.subtitle')}
            </p>
          </div>

          {/* Responsive Globe container */}
          <div className="relative w-full mb-4 sm:mb-6 lg:mb-8">
            {/* Search and Filters overlaid on globe - Responsive positioning */}
            <div className="relative z-10 mb-4 sm:mb-6">
              <div className="max-w-4xl mx-auto px-2 sm:px-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      placeholder={t('countries.search.placeholder')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-border rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 text-sm sm:text-base"
                    />
                  </div>
                  
                  <select
                    value={filterContinent}
                    onChange={(e) => setFilterContinent(e.target.value)}
                    className="px-3 sm:px-4 py-2 sm:py-3 border border-border rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 text-sm sm:text-base min-w-0 sm:min-w-[200px]"
                  >
                    <option value="all">{t('countries.filters.allContinents')}</option>
                    {continents.slice(1).map(continent => (
                      <option key={continent} value={continent}>{continent}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Globe container with responsive height */}
            <div className="w-full flex justify-center">
              <div className="w-full max-w-6xl" style={{ 
                height: 'clamp(350px, 50vh, 600px)' // Responsive height
              }}>
                <Globe3D 
                  width={800} 
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Switch Bar and Lists Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Tabs defaultValue="countries" className="w-full">
          {/* Custom Switch Bar */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-lg border border-border inline-flex">
              <TabsList className="bg-transparent h-auto p-0 gap-0">
                <TabsTrigger 
                  value="countries" 
                  className="rounded-full px-8 py-3 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground hover:text-foreground transition-all duration-200"
                >
                  {t('countries.tabs.countries')}
                </TabsTrigger>
                <TabsTrigger 
                  value="cities" 
                  className="rounded-full px-8 py-3 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground hover:text-foreground transition-all duration-200"
                >
                  {t('countries.tabs.cities')}
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Countries List */}
          <TabsContent value="countries" className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t('countries.grid.availableCountries')}
              </h2>
              <p className="text-muted-foreground">
                {t('countries.grid.results', { count: filteredCountries.length, total: countries.length })}
                {searchTerm && ` ${t('countries.grid.resultsWithSearch', { search: searchTerm })}`}
              </p>
            </div>

            {filteredCountries.length === 0 ? (
              <div className="text-center py-12">
                <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{t('countries.grid.noResults')}</h3>
                <p className="text-muted-foreground">{t('countries.grid.tryDifferent')}</p>
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
                          <span>{country.student_population} {t('countryDetail.students')}</span>
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
                      {t('countries.grid.seeMore')}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Cities List */}
          <TabsContent value="cities" className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t('countries.tabs.availableCities')}
              </h2>
              <p className="text-muted-foreground">
                {t('countries.tabs.citiesCount', { count: filteredCities.length })}
                {searchTerm && ` ${t('countries.grid.resultsWithSearch', { search: searchTerm })}`}
              </p>
            </div>

            {citiesLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
                <span className="text-muted-foreground">{t('cities.loading')}</span>
              </div>
            ) : filteredCities.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{t('countries.tabs.noCities')}</h3>
                <p className="text-muted-foreground">{t('countries.tabs.comingSoon')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCities.map((city) => {
                  const cityCountry = countries.find(c => c.id === city.country_id);
                  return (
                    <Link
                      key={city.id}
                      to={`/paises/${city.country_id}/ciudades/${city.slug}`}
                      className="bg-card rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all transform hover:scale-105 border group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">{cityCountry?.flag || '🏙️'}</span>
                          <div>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {city.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {cityCountry?.name || t('cities.unknownCountry')}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{t('cities.cityDestination')}</span>
                        </div>
                      </div>
                      
                      {city.description && (
                        <p className="text-foreground text-sm line-clamp-3 mb-4">
                          {city.description}
                        </p>
                      )}
                      
                      {/* Hover effect indicator */}
                      <div className="mt-4 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {t('cities.exploreCity')}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaisesIndex;
