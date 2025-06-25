
import React from 'react';
import { Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <Globe className="w-5 h-5 text-black" />
              </div>
              <span className="text-2xl font-bold">Odisea</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Plataforma creada por estudiantes, para estudiantes. Te ayudamos a navegar tu aventura internacional con confianza y claridad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="/test" className="hover:text-white transition-colors">Test de Orientación</a></li>
              <li><a href="/mapa" className="hover:text-white transition-colors">Mapa Interactivo</a></li>
              <li><a href="/testimonios" className="hover:text-white transition-colors">Testimonios</a></li>
              <li><a href="/comunidad" className="hover:text-white transition-colors">Comunidad</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/contacto" className="hover:text-white transition-colors">Contacto</a></li>
              <li><a href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
              <li><a href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Odisea. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
