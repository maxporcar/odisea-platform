
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Users, BookOpen, Heart, ArrowRight, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InteractiveGlobe from '../components/InteractiveGlobe';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGlobeCountryClick = (countryId: string) => {
    navigate(`/paises/${countryId}`);
  };

  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: t('home.features.destinations.title'),
      description: t('home.features.destinations.description')
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: t('home.features.community.title'),
      description: t('home.features.community.description')
    },
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: t('home.features.resources.title'),
      description: t('home.features.resources.description')
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: t('home.features.support.title'),
      description: t('home.features.support.description')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/paises')}
              size="lg"
              className="text-lg px-8 py-6"
            >
              {t('home.hero.exploreCountries')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              onClick={() => navigate('/mapa')}
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
            >
              <Globe className="mr-2 w-5 h-5" />
              {t('home.hero.viewMap')}
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Globe Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('home.globe.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('home.globe.description')}
            </p>
          </div>
          
          <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
            <InteractiveGlobe onCountryClick={handleGlobeCountryClick} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('home.features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-lg border border-border hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('home.cta.description')}
          </p>
          <Button 
            onClick={() => navigate('/comunidad')}
            variant="secondary"
            size="lg"
            className="text-lg px-8 py-6"
          >
            {t('home.cta.joinCommunity')}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
