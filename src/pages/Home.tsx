
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Globe, MapPin, MessageCircle } from 'lucide-react';

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  return (
    <div className="bg-white">
        {/* Hero Section with Globe */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
              🌍 EXPLORA EL MUNDO
              <br />
              <span className="relative animate-pulse">
                ESTUDIANTIL ✈️
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-warm-orange to-warm-amber animate-shimmer"></div>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              🎓 Descubre destinos estudiantiles alrededor del mundo y encuentra tu próxima aventura académica 🌎
            </p>
            
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/test"
                className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
              >
                Hacer el Test
              </Link>
              <Link
                to="/paises"
                className="border-2 border-black text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-black hover:text-white transition-all transform hover:scale-105"
              >
                Ver Todos los Países
              </Link>
            </div>
          </div>
        </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-4xl font-bold text-black mb-6">
                👥 SOMOS ESTUDIANTES COMO TÚ
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                🎒 Tuvimos que organizar nuestro propio estudio o internship en el extranjero, y a menudo nos sentimos perdidos, 
                abrumados y sin orientación. Por eso creamos Odisea, una plataforma interactiva hecha por estudiantes, 
                para estudiantes, para ayudarte a navegar tu viaje de movilidad internacional con confianza y claridad.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                🏠 Desde consejos de destinos hasta consejos de vivienda, te apoyamos en cada paso del camino.
              </p>
              <Link
                to="/testimonios"
                className="inline-block bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all transform hover:scale-105"
              >
                📖 Conoce más historias
              </Link>
            </div>
            <div className="flex justify-center animate-on-scroll">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-warm-orange to-warm-amber flex items-center justify-center animate-pulse">
                <Users className="w-32 h-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-black mb-16 animate-on-scroll">
            🎯 ORGANIZA TU PRÓXIMO VIAJE
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-all animate-on-scroll">
              <div className="w-16 h-16 bg-gradient-to-br from-warm-orange to-warm-amber rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">🎓 INTERCAMBIO</h3>
              <p className="text-gray-600 mb-6">
                🌎 Descubre programas de intercambio en universidades de todo el mundo. 
                Vive una experiencia académica internacional única.
              </p>
              <Link to="/mapa" className="text-warm-orange font-semibold hover:underline animate-float">
                🗺️ Explorar destinos →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-all animate-on-scroll">
              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">💼 PRÁCTICAS</h3>
              <p className="text-gray-400 mb-6">🔜 disponible pronto</p>
              <span className="text-gray-400">⏳ Próximamente</span>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-all animate-on-scroll">
              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">🌟 GAP YEAR</h3>
              <p className="text-gray-400 mb-6">🔜 disponible pronto</p>
              <span className="text-gray-400">⏳ Próximamente</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-on-scroll">
            🚀 ÚNETE A LOS ODISEANOS
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed animate-on-scroll">
            🤝 No estás solo en este viaje. Conecta con estudiantes de todo el mundo que han vivido la misma aventura. 
            Comparte consejos, haz preguntas y encuentra a tu gente.
          </p>
          <p className="text-lg text-gray-400 mb-8 animate-on-scroll">
            ✨ Juntos, hacemos que estudiar en el extranjero sea más fácil y mucho más divertido.
          </p>
          <Link
            to="/comunidad"
            className="bg-gradient-to-r from-warm-orange to-warm-amber text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-warm-amber hover:to-warm-orange transition-all transform hover:scale-105 animate-float"
          >
            🌟 ÚNETE
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
