
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'fr'],
    ns: ['translation'],
    defaultNS: 'translation',
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    },
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: false,
    },
    
    // Add post-processing to preserve "Odisea" in all languages
    postProcess: ['preserveOdisea'],
  });

// Add custom post-processor to preserve "Odisea"
i18n.services.postProcessor.addPostProcessor('preserveOdisea', (value, key, options) => {
  // Preserve "Odisea" in all translations
  return value.replace(/odyssey/gi, 'Odisea');
});

export default i18n;
