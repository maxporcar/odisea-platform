
import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

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
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.links')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">{t('nav.home')}</a></li>
              <li><a href="/test" className="hover:text-white transition-colors">{t('nav.test')}</a></li>
              <li><a href="/mapa" className="hover:text-white transition-colors">{t('map.title')}</a></li>
              <li><a href="/testimonios" className="hover:text-white transition-colors">{t('nav.testimonials')}</a></li>
              <li><a href="/comunidad" className="hover:text-white transition-colors">{t('nav.community')}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/contacto" className="hover:text-white transition-colors">{t('footer.contact')}</a></li>
              <li><a href="/terminos" className="hover:text-white transition-colors">{t('footer.terms')}</a></li>
              <li><a href="/privacidad" className="hover:text-white transition-colors">{t('footer.privacy')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
