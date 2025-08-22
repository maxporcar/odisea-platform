import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, ArrowRight } from 'lucide-react';
import { useCities } from '@/hooks/useCities';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const CitiesIndex = () => {
  const { t } = useTranslation();
  const { data: cities, isLoading, error } = useCities();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-12 w-64" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">
            {t('cities.error', 'Error loading cities')}
          </h1>
          <p className="text-muted-foreground">
            {t('cities.error_description', 'There was an error loading the cities. Please try again later.')}
          </p>
        </div>
      </div>
    );
  }

  // Filter cities that have slugs and markdown content
  const availableCities = cities?.filter(city => 
    city.slug && (
      city.climate_md || 
      city.cost_of_living_md || 
      city.safety_md || 
      city.rent_md || 
      city.events_md || 
      city.social_md || 
      city.universities_md
    )
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary-glow">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('cities.title', 'Study Abroad Cities')}
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            {t('cities.description', 'Discover the best cities for international students. Get detailed insights about climate, costs, safety, and student life.')}
          </p>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {availableCities.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t('cities.no_cities', 'No cities available')}
            </h2>
            <p className="text-muted-foreground">
              {t('cities.no_cities_description', 'City guides are being prepared. Please check back soon!')}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t('cities.available_guides', 'Available City Guides')}
              </h2>
              <p className="text-muted-foreground">
                {t('cities.guides_count', `${availableCities.length} detailed city guides available`)}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {availableCities.map((city) => (
                <Link key={city.id} to={`/cities/${city.slug}`} className="group">
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
                    <CardContent className="p-0">
                      {/* City Image */}
                      <div className="relative h-56 overflow-hidden">
                        {city.image_url ? (
                          <img 
                            src={city.image_url} 
                            alt={city.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-glow/30 flex items-center justify-center">
                            <MapPin className="w-16 h-16 text-primary/40" />
                          </div>
                        )}
                        
                        {/* Country Flag Overlay */}
                        {(city as any).countries?.flag && (
                          <div className="absolute top-4 left-4">
                            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                              <img 
                                src={(city as any).countries.flag} 
                                alt={`${(city as any).countries.name} flag`}
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
                        
                        {(city as any).countries?.name && (
                          <p className="text-muted-foreground mb-4 font-medium">
                            {(city as any).countries.name}
                          </p>
                        )}
                        
                        {city.description && (
                          <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                            {city.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                            City destination
                          </span>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CitiesIndex;