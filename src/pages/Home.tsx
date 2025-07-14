
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, Star, BookOpen, Shield, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Home = () => {
  const { t } = useTranslation();
  const { user, isPremium } = useAuth();

  const features = [
    {
      icon: Globe,
      title: t('home.features.explore.title'),
      description: t('home.features.explore.description'),
      premium: false
    },
    {
      icon: Users,
      title: t('home.features.community.title'),
      description: t('home.features.community.description'),
      premium: false
    },
    {
      icon: BookOpen,
      title: t('home.features.resources.title'),
      description: t('home.features.resources.description'),
      premium: true
    },
    {
      icon: Shield,
      title: t('home.features.support.title'),
      description: t('home.features.support.description'),
      premium: true
    }
  ];

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-black">Odisea</h1>
              {isPremium && (
                <Badge className="bg-[#FFA500] text-white border-[#FFA500] text-lg px-3 py-1">
                  <Crown className="w-4 h-4 mr-1" />
                  Plus
                </Badge>
              )}
            </div>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('home.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-white rounded-2xl px-8">
                <Link to="/paises">
                  {t('home.hero.exploreCountries')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              
              {!isPremium && (
                <Button asChild size="lg" variant="outline" className="border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:text-white rounded-2xl px-8">
                  <Link to="/subscription">
                    <Crown className="mr-2 w-5 h-5" />
                    {t('home.hero.upgradePlus')}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">
                {t('home.features.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('home.features.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className={`h-full ${feature.premium && !isPremium ? 'border-[#FFA500]/30 bg-gradient-to-br from-white to-[#FFA500]/5' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                          feature.premium 
                            ? 'bg-[#FFA500]/10' 
                            : 'bg-[#007A5E]/10'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            feature.premium 
                              ? 'text-[#FFA500]' 
                              : 'text-[#007A5E]'
                          }`} />
                        </div>
                        {feature.premium && (
                          <Badge className="bg-[#FFA500] text-white border-[#FFA500] text-xs">
                            <Crown className="w-3 h-3 mr-1" />
                            Plus
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                      {feature.premium && !isPremium && (
                        <Button asChild size="sm" className="mt-3 bg-[#FFA500] hover:bg-[#E6940D] text-white">
                          <Link to="/subscription">
                            {t('home.features.upgrade')}
                          </Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#007A5E] mb-2">50+</div>
                <div className="text-lg text-gray-600">{t('home.stats.countries')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#007A5E] mb-2">1000+</div>
                <div className="text-lg text-gray-600">{t('home.stats.universities')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#007A5E] mb-2">10k+</div>
                <div className="text-lg text-gray-600">{t('home.stats.students')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!isPremium && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#007A5E]">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#FFA500] rounded-2xl flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">
                {t('home.cta.title')}
              </h2>
              
              <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                {t('home.cta.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-[#FFA500] hover:bg-[#E6940D] text-white rounded-2xl px-8">
                  <Link to="/subscription">
                    <Crown className="mr-2 w-5 h-5" />
                    {t('home.cta.individual')}
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#007A5E] rounded-2xl px-8">
                  <Link to="/subscription">
                    {t('home.cta.institution')}
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Home;
