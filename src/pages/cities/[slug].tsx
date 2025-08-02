import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useCity } from '@/hooks/useCities';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const CityDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { data: city, isLoading, error } = useCity(slug!);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">
            {t('city.not_found', 'City not found')}
          </h1>
          <p className="text-muted-foreground">
            {t('city.not_found_description', 'The city you are looking for does not exist or has been moved.')}
          </p>
          <Link to="/cities">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common.back_to_cities', 'Back to cities')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const renderMarkdownSection = (title: string, content: string | null, icon: React.ReactNode) => {
    if (!content) return null;
    
    return (
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            {icon}
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          </div>
          <div 
            className="prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }}
          />
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary-glow">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-4xl mx-auto px-4 py-16">
          <Link to="/cities" className="mb-6 inline-block">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common.back_to_cities', 'Back to cities')}
            </Button>
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">{city.name}</h1>
            {(city as any).countries?.flag && (
              <img 
                src={(city as any).countries.flag} 
                alt={`${(city as any).countries.name} flag`}
                className="w-12 h-8 object-cover rounded"
              />
            )}
          </div>
          
          {(city as any).countries?.name && (
            <p className="text-white/90 text-lg mb-4">
              <MapPin className="inline w-5 h-5 mr-2" />
              {(city as any).countries.name}
            </p>
          )}
          
          {(city.latitude && city.longitude) && (
            <p className="text-white/80 text-sm">
              {t('city.coordinates', 'Coordinates')}: {city.latitude}, {city.longitude}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Basic Description */}
        {city.description && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t('city.about', 'About')} {city.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{city.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Markdown Sections */}
        {renderMarkdownSection(
          '🌡️ Climate',
          city.climate_md,
          <span className="text-2xl">🌡️</span>
        )}

        {renderMarkdownSection(
          '💰 Cost of Living',
          city.cost_of_living_md,
          <span className="text-2xl">💰</span>
        )}

        {renderMarkdownSection(
          '🛡️ Safety',
          city.safety_md,
          <span className="text-2xl">🛡️</span>
        )}

        {renderMarkdownSection(
          '🏠 Rent & Housing',
          city.rent_md,
          <span className="text-2xl">🏠</span>
        )}

        {renderMarkdownSection(
          '🎉 Events',
          city.events_md,
          <span className="text-2xl">🎉</span>
        )}

        {renderMarkdownSection(
          '👫 Social Life',
          city.social_md,
          <span className="text-2xl">👫</span>
        )}

        {renderMarkdownSection(
          '🎓 Universities',
          city.universities_md,
          <span className="text-2xl">🎓</span>
        )}

        {/* Navigation */}
        <div className="flex justify-center mt-12">
          <Link to="/cities">
            <Button variant="outline" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common.back_to_cities', 'Explore more cities')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CityDetail;