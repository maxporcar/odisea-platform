
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Globe, MapPin, MessageCircle, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrollAnimations from '../components/ScrollAnimations';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      <ScrollAnimations />
      
      {/* Hero Section with world map background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#FAF4EA' }}>
        {/* World map background with extensive bottom fade to eliminate edge */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url('/lovable-uploads/e65141e6-37c3-4726-a4b1-77e0c7d4f99d.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0) 100%)'
          }}
        />
        
        {/* Additional overlay for even smoother transition to background color */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(250, 244, 234, 0.1) 60%, rgba(250, 244, 234, 0.3) 70%, rgba(250, 244, 234, 0.5) 80%, rgba(250, 244, 234, 0.8) 90%, rgba(250, 244, 234, 1) 100%)'
          }}
        />
        
        {/* Floating elements for subtle animation */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 right-20 w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 font-montserrat" style={{ color: '#2B2B2B' }}>
              {t('home.hero.title')}
              <br />
              <span className="relative" style={{ color: '#FF6600' }}>
                Odisea
                <div className="absolute -bottom-2 left-0 right-0 h-1" style={{ backgroundColor: '#FF6600' }}></div>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed font-poppins" style={{ color: '#2B2B2B' }}>
              {t('home.hero.subtitle')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{animationDelay: '0.3s'}}>
            <Link
              to="/test"
              className="text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg font-poppins"
              style={{ backgroundColor: '#2B2B2B' }}
            >
              {t('home.hero.cta_test')}
            </Link>
            <Link
              to="/paises"
              className="relative border-2 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 font-poppins"
              style={{ 
                borderColor: '#2B2B2B', 
                color: '#2B2B2B',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2B2B2B';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#2B2B2B';
              }}
            >
              {t('home.hero.cta_map')}
              {/* New! indicator */}
              <div className="absolute -top-2 -right-2 text-white text-xs px-2 py-1 rounded-full transform rotate-12 animate-pulse" style={{ backgroundColor: '#FF6600' }}>
                {t('home.hero.new_badge')}
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section with real student photos */}
      <section className="py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="opacity-0 animate-fade-in-up" data-aos="fade-right">
              <h2 className="text-4xl font-bold mb-6 font-glacial" style={{ color: '#2B2B2B' }}>
                {t('home.about.title')}
              </h2>
              <p className="text-lg mb-8 leading-relaxed font-poppins" style={{ color: '#2B2B2B' }}>
                {t('home.about.description1')}
              </p>
              <p className="text-lg mb-8 leading-relaxed font-poppins" style={{ color: '#2B2B2B' }}>
                {t('home.about.description2')}
              </p>
              <Link
                to="/testimonios"
                className="inline-block text-white px-6 py-3 rounded-full font-semibold transition-colors font-poppins"
                style={{ backgroundColor: '#2B2B2B' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF6600'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2B2B2B'}
              >
                {t('home.about.cta')}
              </Link>
            </div>
            
            {/* Student founders photos */}
            <div className="flex justify-center opacity-0 animate-fade-in-up" data-aos="fade-left" style={{animationDelay: '0.2s'}}>
              <div className="flex flex-col sm:flex-row items-center space-y-8 sm:space-y-0 sm:space-x-8">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl">
                    <img 
                      src="https://media.licdn.com/dms/image/v2/D4E03AQE2rZDpsI4Xag/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729959485722?e=2147483647&v=beta&t=5ZSM5acAxbeTPH0kNac9OFQEoglVfQrbsDJuzfWHYm0"
                      alt="Max Porcar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Hand-drawn label for Max */}
                  <div className="absolute -bottom-6 -left-8 flex items-center">
                    <div className="text-2xl transform -rotate-12">↙️</div>
                    <div className="ml-2 flex items-center">
                      <span className="text-xl font-bold transform rotate-3" style={{ color: '#FF6600' }}>Max</span>
                      <a 
                        href="https://www.linkedin.com/in/max-porcar-arenós"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl">
                    <img 
                      src="https://media.licdn.com/dms/image/v2/D4E03AQGNnCClndyaUQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1684991898892?e=2147483647&v=beta&t=1cTMZboGX2opsJNMrTPhHuIwZNtPqrOZfzxQgh0BhtA"
                      alt="Flavie Tandar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Hand-drawn label for Flavie */}
                  <div className="absolute -bottom-6 -right-8 flex items-center">
                    <div className="mr-2 flex items-center">
                      <span className="text-xl font-bold transform -rotate-3" style={{ color: '#FF6600' }}>Flavie</span>
                      <a 
                        href="https://www.linkedin.com/in/flavie-tandar/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                    <div className="text-2xl transform rotate-12">↘️</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with redesigned cards */}
      <section className="py-20" style={{ backgroundColor: '#FAF4EA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-4 font-glacial" style={{ color: '#2B2B2B' }}>
              {t('home.features.title')}
            </h2>
            <p className="text-xl font-poppins" style={{ color: '#2B2B2B' }}>
              {t('home.features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Intercambio Card - Featured */}
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all opacity-0 animate-fade-in-up transform hover:scale-105" data-aos="fade-up" style={{animationDelay: '0.1s'}}>
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/lovable-uploads/27f89a48-87d3-4a37-944c-7699f8942049.png')`,
                  opacity: 0.15
                }}
              />
              
              {/* Content overlay */}
              <div className="relative p-8 text-center bg-white/90 backdrop-blur-sm">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#00765A' }}>
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-glacial" style={{ color: '#00765A' }}>{t('home.features.exchange.title')}</h3>
                <p className="mb-6 font-poppins" style={{ color: '#2B2B2B' }}>
                  {t('home.features.exchange.description')}
                </p>
                <Link to="/paises" className="font-semibold hover:underline font-poppins inline-flex items-center" style={{ color: '#00765A' }}>
                  {t('home.features.exchange.cta')}
                </Link>
              </div>
            </div>

            {/* Prácticas Card - Coming Soon */}
            <div className="relative bg-white/60 rounded-2xl shadow-lg overflow-hidden opacity-0 animate-fade-in-up" data-aos="fade-up" style={{animationDelay: '0.2s'}}>
              {/* Background image with overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/lovable-uploads/8c01582f-cc52-48f0-9409-b52a18c06796.png')`,
                  opacity: 0.1
                }}
              />
              
              {/* Coming soon overlay */}
              <div className="absolute inset-0 bg-gray-100/80 backdrop-blur-sm" />
              
              {/* Content */}
              <div className="relative p-8 text-center">
                <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-600 mb-4 font-glacial">{t('home.features.internship.title')}</h3>
                <p className="text-gray-500 mb-4 font-poppins">
                  {t('home.features.internship.description')}
                </p>
                <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  {t('home.features.internship.coming_soon')}
                </div>
                <span className="text-gray-400 font-poppins">Coming Soon...</span>
              </div>
            </div>

            {/* Gap Year Card - Coming Soon */}
            <div className="relative bg-white/60 rounded-2xl shadow-lg overflow-hidden opacity-0 animate-fade-in-up" data-aos="fade-up" style={{animationDelay: '0.3s'}}>
              {/* Background image with overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/lovable-uploads/305ed369-70a6-455b-982d-49125a3c37e0.png')`,
                  opacity: 0.1
                }}
              />
              
              {/* Coming soon overlay */}
              <div className="absolute inset-0 bg-gray-100/80 backdrop-blur-sm" />
              
              {/* Content */}
              <div className="relative p-8 text-center">
                <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-600 mb-4 font-glacial">{t('home.features.gap_year.title')}</h3>
                <p className="text-gray-500 mb-4 font-poppins">
                  {t('home.features.gap_year.description')}
                </p>
                <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  {t('home.features.gap_year.coming_soon')}
                </div>
                <span className="text-gray-400 font-poppins">Coming Soon...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#2B2B2B' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="opacity-0 animate-fade-in-up" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white font-glacial">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed font-poppins">
              {t('home.cta.description')}
            </p>
            <p className="text-lg text-gray-400 mb-8 font-poppins">
              {t('home.cta.subtitle')}
            </p>
            <Link
              to="/comunidad"
              className="bg-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 font-poppins"
              style={{ color: '#2B2B2B' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FF6600';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#2B2B2B';
              }}
            >
              {t('home.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
