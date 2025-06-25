
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Users, MapPin, MessageCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23f3f4f6\" fill-opacity=\"0.4\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
            GET READY FOR YOUR
            <br />
            <span className="relative">
              Odisea
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-black"></div>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Descubre el mundo con confianza. Plataforma creada por estudiantes, para estudiantes, 
            que te ayuda a navegar tu aventura internacional.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/test"
              className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Hacer el Test
            </Link>
            <Link
              to="/mapa"
              className="border-2 border-black text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-black hover:text-white transition-all transform hover:scale-105"
            >
              Ver Mapa Mundial
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">
                SOMOS ESTUDIANTES COMO TÚ
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Tuvimos que organizar nuestro propio estudio o internship en el extranjero, y a menudo nos sentimos perdidos, 
                abrumados y sin orientación. Por eso creamos Odisea, una plataforma interactiva hecha por estudiantes, 
                para estudiantes, para ayudarte a navegar tu viaje de movilidad internacional con confianza y claridad.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Desde consejos de destinos hasta consejos de vivienda, te apoyamos en cada paso del camino.
              </p>
              <Link
                to="/testimonios"
                className="inline-block bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                Conoce más historias
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-full bg-gray-100 flex items-center justify-center">
                <Users className="w-32 h-32 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-black mb-16">
            ORGANIZA TU PRÓXIMO VIAJE
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">INTERCAMBIO</h3>
              <p className="text-gray-600 mb-6">
                Descubre programas de intercambio en universidades de todo el mundo. 
                Vive una experiencia académica internacional única.
              </p>
              <Link to="/mapa" className="text-black font-semibold hover:underline">
                Explorar destinos →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">PRÁCTICAS</h3>
              <p className="text-gray-400 mb-6">disponible pronto</p>
              <span className="text-gray-400">Próximamente</span>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center group hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">GAP YEAR</h3>
              <p className="text-gray-400 mb-6">disponible pronto</p>
              <span className="text-gray-400">Próximamente</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            ÚNETE A LOS ODISEANOS
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            No estás solo en este viaje. Conecta con estudiantes de todo el mundo que han vivido la misma aventura. 
            Comparte consejos, haz preguntas y encuentra a tu gente.
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Juntos, hacemos que estudiar en el extranjero sea más fácil y mucho más divertido.
          </p>
          <Link
            to="/comunidad"
            className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            ÚNETE
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
