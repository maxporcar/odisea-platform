import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useCountry } from '../../../../hooks/useCountries';
import { useCities } from '../../../../hooks/useCities';
import { useTranslation } from 'react-i18next';

const CitiesIndex = () => {
  const { t } = useTranslation();
  const { countryId } = useParams<{ countryId: string }>();
  const { data: country, isLoading: countryLoading } = useCountry(countryId!);
  const { data: cities = [], isLoading: citiesLoading, error: citiesError } = useCities(countryId);

  if (countryLoading || citiesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-xl text-primary font-semibold">{t('cities.loading')}</span>
        </div>
      </div>
    );
  }

  if (citiesError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">{t('cities.error.title')}</h2>
          <p className="text-muted-foreground mb-4">{t('cities.error.description')}</p>
          <Link 
            to={`/paises/${countryId}`}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            {t('cities.backToCountry')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link 
              to={`/paises/${countryId}`}
              className="flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('cities.backToCountry')}
            </Link>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className="text-4xl">{country?.flag || '🌍'}</span>
              <h1 className="text-4xl font-bold text-foreground">
                {t('cities.title')} {country?.name}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              {t('cities.subtitle')}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {t('cities.count', { count: cities.length })}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cities.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">{t('cities.noCities.title')}</h3>
            <p className="text-muted-foreground">{t('cities.noCities.description')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map((city) => (
              <Link
                key={city.id}
                to={`/paises/${countryId}/ciudades/${city.slug}`}
                className="group"
              >
                <div className="bg-card rounded-2xl shadow-md border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  {/* City Image */}
                  <div className="relative h-56 overflow-hidden">
                    {city.image_url ? (
                      <img 
                        src={city.image_url} 
                        alt={city.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center">
                        <MapPin className="w-16 h-16 text-primary/40" />
                      </div>
                    )}
                    
                    {/* Country Flag Overlay */}
                    {country?.flag && (
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                          <img 
                            src={country.flag} 
                            alt={`${country.name} flag`}
                            className="w-5 h-3.5 object-cover rounded-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* City Info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {city.name}
                    </h3>
                    
                    {country?.name && (
                      <p className="text-muted-foreground mb-4 font-medium">
                        {country.name}
                      </p>
                    )}
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                      {city.description || t('cities.defaultDescription')}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                        City destination
                      </span>
                      <div className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CitiesIndex;