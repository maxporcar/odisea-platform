
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Test = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-warm-orange mb-4 font-poppins">
            {t('test.title')}
          </h1>
          <p className="text-xl text-amber-700 mb-4 font-poppins">
            {t('test.subtitle')}
          </p>
          <p className="text-lg text-orange-800 mb-8 font-poppins">
            {t('test.description')}
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdunjUREiygLYvjMAJsYbH5GnNkBhPDDrd1HZaeUdomzdASmA/viewform?embedded=true"
            width="100%"
            height="800"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="w-full"
            title="Test de Orientación Odisea"
          >
            Cargando…
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default Test;
