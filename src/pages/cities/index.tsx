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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCities.map((city) => (
                <Card key={city.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    {city.image_url && (
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
                        <img 
                          src={city.image_url} 
                          alt={city.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {!city.image_url && (
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
                        <MapPin className="w-16 h-16 text-primary/60" />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {city.name}
                        </h3>
                        {(city as any).countries?.flag && (
                          <img 
                            src={(city as any).countries.flag} 
                            alt={`${(city as any).countries.name} flag`}
                            className="w-6 h-4 object-cover rounded"
                          />
                        )}
                      </div>
                      
                      {(city as any).countries?.name && (
                        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {(city as any).countries.name}
                        </p>
                      )}
                      
                      {city.description && (
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {city.description}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {city.climate_md && <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Climate</span>}
                        {city.cost_of_living_md && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded">Cost</span>}
                        {city.safety_md && <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">Safety</span>}
                        {city.universities_md && <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">Universities</span>}
                      </div>
                      
                      <Link to={`/cities/${city.slug}`}>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {t('cities.explore', 'Explore City Guide')}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CitiesIndex;