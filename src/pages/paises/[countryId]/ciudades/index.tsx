
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Thermometer, DollarSign, Shield, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCountryBySlug } from '../../../../hooks/useCountries';
import { useCitiesByCountrySlug } from '../../../../hooks/useCities';

const CountryCities = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: country, isLoading: countryLoading } = useCountryBySlug(countryId || '');
  const { data: cities, isLoading: citiesLoading, error } = useCitiesByCountrySlug(countryId || '');

  const filteredCities = cities?.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const isLoading = countryLoading || citiesLoading;

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

  if (error || !country) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">{t('common.error')}</h2>
          <p className="text-muted-foreground mb-4">{t('cities.errorLoading')}</p>
          <Link 
            to="/paises"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {t('common.backToCountries')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/50 border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link
              to={`/paises/${countryId}`}
              className="flex items-center text-primary hover:text-primary/80 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('cities.backToCountry')}
            </Link>
          </div>
          
          <div className="flex items-center space-x-6 mb-6">
            <span className="text-6xl">{country.flag || '🌍'}</span>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {t('cities.title', { country: country.name })}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('cities.subtitle')}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder={t('cities.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredCities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCities.map((city) => (
              <div
                key={city.id}
                className="bg-card rounded-lg shadow-md border border-border p-6 hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
                onClick={() => navigate(`/paises/${countryId}/ciudades/${city.slug}`)}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-2">{city.name}</h3>
                  {city.description && (
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {city.description}
                    </p>
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-foreground">{t('cities.location')}</span>
                      <p className="text-xs text-muted-foreground">
                        {city.latitude && city.longitude 
                          ? `${city.latitude.toFixed(2)}, ${city.longitude.toFixed(2)}`
                          : t('cities.coordinatesNotAvailable')
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  {t('cities.seeMore')}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {searchTerm ? t('cities.noResults') : t('cities.noCities')}
            </h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? t('cities.tryDifferentSearch') 
                : t('cities.noCitiesDescription', { country: country.name })
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryCities;
