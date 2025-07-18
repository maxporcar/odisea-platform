
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Users, BookOpen, MapPin, ChevronRight, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import InteractiveGlobe from '../components/InteractiveGlobe';

const Home = () => {
  const { t } = useTranslation();

  const handleCountryClick = (countryId: string) => {
    window.location.href = `/paises/${countryId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="order-2 lg:order-1">
              <h1 className="text-5xl lg:text-6xl font-bold text-warm-orange mb-6 font-poppins leading-tight">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl text-amber-700 mb-8 leading-relaxed font-poppins">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/paises"
                  className="bg-warm-orange text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition-colors inline-flex items-center justify-center font-poppins"
                >
                  {t('home.hero.exploreButton')}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/testimonios"
                  className="bg-white text-warm-orange px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors inline-flex items-center justify-center border-2 border-warm-orange font-poppins"
                >
                  {t('home.hero.storiesButton')}
                </Link>
              </div>
            </div>

            {/* Right Column - Globe */}
            <div className="order-1 lg:order-2">
              <InteractiveGlobe onCountryClick={handleCountryClick} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-warm-orange mb-4 font-poppins">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-amber-700 font-poppins">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
              <div className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-poppins">
                {t('home.features.explore.title')}
              </h3>
              <p className="text-gray-600 font-poppins">
                {t('home.features.explore.description')}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
              <div className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-poppins">
                {t('home.features.connect.title')}
              </h3>
              <p className="text-gray-600 font-poppins">
                {t('home.features.connect.description')}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
              <div className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-poppins">
                {t('home.features.learn.title')}
              </h3>
              <p className="text-gray-600 font-poppins">
                {t('home.features.learn.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-warm-orange mb-6 font-poppins">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-amber-700 mb-8 font-poppins">
            {t('home.cta.subtitle')}
          </p>
          <Link
            to="/paises"
            className="bg-warm-orange text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition-colors inline-flex items-center font-poppins"
          >
            {t('home.cta.button')}
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
