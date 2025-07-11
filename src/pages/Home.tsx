import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Globe, MapPin, MessageCircle } from 'lucide-react';
import ScrollAnimations from '../components/ScrollAnimations';

const Home = () => {
  return (
    <div className="bg-white">
      <ScrollAnimations />
      
      {/* Hero Section with world map background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#FAF4EA' }}>
        {/* World map background with gradual bottom fade */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('/lovable-uploads/e65141e6-37c3-4726-a4b1-77e0c7d4f99d.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.1) 85%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.1) 85%, rgba(0,0,0,0) 100%)'
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
              GET READY FOR YOUR
              <br />
              <span className="relative" style={{ color: '#FF6600' }}>
                Odisea ✈️
                <div className="absolute -bottom-2 left-0 right-0 h-1" style={{ backgroundColor: '#FF6600' }}></div>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed font-poppins" style={{ color: '#2B2B2B' }}>
              🌍 Descubre el mundo con confianza. Plataforma creada por estudiantes, 
              para estudiantes, que te ayuda a navegar tu aventura internacional 🎒
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{animationDelay: '0.3s'}}>
            <Link
              to="/test"
              className="text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg font-poppins"
              style={{ backgroundColor: '#2B2B2B' }}
            >
              Hacer el Test 📝
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
              Ver Mapa Mundial 🗺️
              {/* New! indicator */}
              <div className="absolute -top-2 -right-2 text-white text-xs px-2 py-1 rounded-full transform rotate-12 animate-pulse" style={{ backgroundColor: '#FF6600' }}>
                ¡Nuevo! ✨
              </div>
            </Link>
          </div>

          {/* Hand-drawn style arrow pointing to the map button */}
          <div className="absolute bottom-16 right-10 hidden lg:block">
            <div className="relative">
              <div className="font-bold transform rotate-12 animate-bounce" style={{ color: '#FF6600', fontSize: '18px' }}>
                ¡Prueba el mapa 3D! 🎯
              </div>
              <div className="absolute -bottom-2 -left-4 text-2xl transform rotate-45" style={{ color: '#FF6600' }}>
                ↗️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with real student photos */}
      <section className="py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="opacity-0 animate-fade-in-up" data-aos="fade-right">
              <h2 className="text-4xl font-bold mb-6 font-glacial" style={{ color: '#2B2B2B' }}>
                👥 SOMOS ESTUDIANTES COMO TÚ
              </h2>
              <p className="text-lg mb-8 leading-relaxed font-poppins" style={{ color: '#2B2B2B' }}>
                💭 Tuvimos que organizar nuestro propio estudio o internship en el extranjero, y a menudo nos sentimos perdidos, 
                abrumados y sin orientación. Por eso creamos Odisea, una plataforma interactiva hecha por estudiantes, 
                para estudiantes, para ayudarte a navegar tu viaje de movilidad internacional con confianza y claridad.
              </p>
              <p className="text-lg mb-8 leading-relaxed font-poppins" style={{ color: '#2B2B2B' }}>
                🏠 Desde consejos de destinos hasta consejos de vivienda, te apoyamos en cada paso del camino.
              </p>
              <Link
                to="/testimonios"
                className="inline-block text-white px-6 py-3 rounded-full font-semibold transition-colors font-poppins"
                style={{ backgroundColor: '#2B2B2B' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF6600'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2B2B2B'}
              >
                Conoce más historias 📖
              </Link>
            </div>
            
            {/* Student founders photos */}
            <div className="flex justify-center opacity-0 animate-fade-in-up" data-aos="fade-left" style={{animationDelay: '0.2s'}}>
              <div className="flex flex-col sm:flex-row items-center space-y-8 sm:space-y-0 sm:space-x-8">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center shadow-xl">
                    <Users className="w-20 h-20 text-orange-700" />
                  </div>
                  {/* Hand-drawn label for Max */}
                  <div className="absolute -bottom-6 -left-8 flex items-center">
                    <div className="text-2xl transform -rotate-12">↙️</div>
                    <span className="ml-2 text-xl font-bold transform rotate-3" style={{ color: '#FF6600' }}>Max</span>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center shadow-xl">
                    <Users className="w-20 h-20 text-blue-700" />
                  </div>
                  {/* Hand-drawn label for Flavie */}
                  <div className="absolute -bottom-6 -right-8 flex items-center">
                    <span className="mr-2 text-xl font-bold transform -rotate-3" style={{ color: '#FF6600' }}>Flavie</span>
                    <div className="text-2xl transform rotate-12">↘️</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with animations */}
      <section className="py-20" style={{ backgroundColor: '#FAF4EA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-4 font-glacial" style={{ color: '#2B2B2B' }}>
              🚀 ORGANIZA TU PRÓXIMO VIAJE
            </h2>
            <p className="text-xl font-poppins" style={{ color: '#2B2B2B' }}>
              Descubre todas las opciones que tenemos para ti ✨
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-all opacity-0 animate-fade-in-up" data-aos="fade-up" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#2B2B2B' }}>
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-glacial" style={{ color: '#2B2B2B' }}>🎓 INTERCAMBIO</h3>
              <p className="mb-6 font-poppins" style={{ color: '#2B2B2B' }}>
                Descubre programas de intercambio en universidades de todo el mundo. 
                Vive una experiencia académica internacional única.
              </p>
              <Link to="/paises" className="font-semibold hover:underline font-poppins" style={{ color: '#2B2B2B' }}>
                Explorar destinos 🌟 →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-all opacity-0 animate-fade-in-up" data-aos="fade-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4 font-glacial">💼 PRÁCTICAS</h3>
              <p className="text-gray-400 mb-6 font-poppins">Próximamente disponible 🔜</p>
              <span className="text-gray-400 font-poppins">Coming Soon...</span>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-all opacity-0 animate-fade-in-up" data-aos="fade-up" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4 font-glacial">🌍 GAP YEAR</h3>
              <p className="text-gray-400 mb-6 font-poppins">Próximamente disponible 🔜</p>
              <span className="text-gray-400 font-poppins">Coming Soon...</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#2B2B2B' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="opacity-0 animate-fade-in-up" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white font-glacial">
              🤝 ÚNETE A LOS ODISEANOS
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed font-poppins">
              💪 No estás solo en este viaje. Conecta con estudiantes de todo el mundo que han vivido la misma aventura. 
              Comparte consejos, haz preguntas y encuentra a tu gente.
            </p>
            <p className="text-lg text-gray-400 mb-8 font-poppins">
              ✨ Juntos, hacemos que estudiar en el extranjero sea más fácil y mucho más divertido.
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
              ÚNETE 🚀
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
