import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { Badge } from '@/components/ui/badge';
import PremiumModal from '@/components/PremiumModal';
import { usePremiumModal } from '@/hooks/usePremiumModal';

const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const { isOpen, openModal, closeModal } = usePremiumModal();

  const handlePremiumFeatureClick = (featureName: string) => {
    if (!user) {
      // Redirect to login page or show a message
      return;
    }

    if (!subscription?.subscribed) {
      openModal();
    } else {
      // Navigate to the premium feature page
    }
  };

  const handleUpgrade = () => {
    // Handle upgrade logic here
    closeModal();
    // You can add navigation to payment page or trigger payment flow
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t('home.hero.title')} <br />
            <span className="text-orange-600">{t('home.hero.odyssey')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/test">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {t('home.hero.cta_test')}
              </Button>
            </Link>
            <Link to="/paises">
              <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {t('home.hero.cta_map')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {t('home.about.title')}
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                {t('home.about.description1')}
              </p>
              <p className="text-lg text-gray-700 mb-8">
                {t('home.about.description2')}
              </p>
              <Link to="/testimonios">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  {t('home.about.cta')}
                </Button>
              </Link>
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src="https://media.licdn.com/dms/image/v2/D4E03AQE2rZDpsI4Xag/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729959485722?e=2147483647&v=beta&t=5ZSM5acAxbeTPH0kNac9OFQEoglVfQrbsDJuzfWHYm0"
                    alt="Max Porcar"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">Max Porcar</h3>
                    <p className="text-gray-600">Co-founder</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Creamos Odisea porque sabemos lo desafiante que puede ser navegar una experiencia internacional. Queremos que cada estudiante se sienta preparado y confiado."
                </p>
                <a 
                  href="https://www.linkedin.com/in/max-porcar-arenós" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-orange-600 hover:text-orange-700 font-medium"
                >
                  LinkedIn →
                </a>
              </div>
              
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src="https://media.licdn.com/dms/image/v2/D4E03AQGNnCClndyaUQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1684991898892?e=2147483647&v=beta&t=1cTMZboGX2opsJNMrTPhHuIwZNtPqrOZfzxQgh0BhtA"
                    alt="Flavie Tandar"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">Flavie Tandar</h3>
                    <p className="text-gray-600">Co-founder</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Nuestra misión es democratizar el acceso a experiencias internacionales y crear una comunidad global de estudiantes que se apoyen mutuamente."
                </p>
                <a 
                  href="https://www.linkedin.com/in/flavie-tandar/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-blue-600 hover:text-blue-700 font-medium"
                >
                  LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4 text-orange-600">
                {t('home.features.exchange.title')}
              </h3>
              <p className="text-gray-700 mb-6">
                {t('home.features.exchange.description')}
              </p>
              <Link to="/paises">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  {t('home.features.exchange.cta')}
                </Button>
              </Link>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">
                {t('home.features.internship.title')}
              </h3>
              <p className="text-gray-700 mb-6">
                {t('home.features.internship.description')}
              </p>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {t('home.features.internship.coming_soon')}
              </Badge>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4 text-green-600">
                {t('home.features.gap_year.title')}
              </h3>
              <p className="text-gray-700 mb-6">
                {t('home.features.gap_year.description')}
              </p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {t('home.features.gap_year.coming_soon')}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-orange-100 mb-4 max-w-3xl mx-auto">
            {t('home.cta.description')}
          </p>
          <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
            {t('home.cta.subtitle')}
          </p>
          <Link to="/comunidad">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              {t('home.cta.button')}
            </Button>
          </Link>
        </div>
      </section>

      <PremiumModal
        isOpen={isOpen}
        onClose={closeModal}
        onUpgrade={handleUpgrade}
      />
    </Layout>
  );
};

export default Home;
