
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    'nav.home': 'Inicio',
    'nav.test': 'Test',
    'nav.map': 'Mapa',
    'nav.testimonials': 'Testimonios',
    'nav.community': 'Comunidad',
    'nav.countries': 'Países',
    'nav.login': 'Iniciar Sesión',
    'home.hero.title': 'Tu aventura estudiantil comienza aquí',
    'home.hero.subtitle': 'Descubre el mundo a través de la educación con nuestra plataforma de movilidad estudiantil',
    'home.hero.cta': 'Comenzar mi viaje',
    'test.title': 'TEST DE ORIENTACIÓN',
    'test.subtitle': 'Completa nuestro test personalizado para descubrir los mejores destinos para tu experiencia internacional',
    'test.description': '¡Encuentra tu destino perfecto en solo unos minutos! 😉',
    'map.title': 'MAPA INTERACTIVO MUNDIAL',
    'map.subtitle': 'Explora nuestros destinos disponibles en el globo interactivo',
    'countries.title': 'BASE DE DATOS DE PAÍSES',
    'countries.subtitle': 'Información completa sobre todos nuestros destinos estudiantiles',
  },
  en: {
    'nav.home': 'Home',
    'nav.test': 'Test',
    'nav.map': 'Map',
    'nav.testimonials': 'Testimonials',
    'nav.community': 'Community',
    'nav.countries': 'Countries',
    'nav.login': 'Login',
    'home.hero.title': 'Your student adventure starts here',
    'home.hero.subtitle': 'Discover the world through education with our student mobility platform',
    'home.hero.cta': 'Start my journey',
    'test.title': 'ORIENTATION TEST',
    'test.subtitle': 'Complete our personalized test to discover the best destinations for your international experience',
    'test.description': 'Find your perfect destination in just a few minutes! 😉',
    'map.title': 'INTERACTIVE WORLD MAP',
    'map.subtitle': 'Explore our available destinations on the interactive globe',
    'countries.title': 'COUNTRIES DATABASE',
    'countries.subtitle': 'Complete information about all our student destinations',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.test': 'Test',
    'nav.map': 'Carte',
    'nav.testimonials': 'Témoignages',
    'nav.community': 'Communauté',
    'nav.countries': 'Pays',
    'nav.login': 'Connexion',
    'home.hero.title': 'Votre aventure étudiante commence ici',
    'home.hero.subtitle': 'Découvrez le monde à travers l\'éducation avec notre plateforme de mobilité étudiante',
    'home.hero.cta': 'Commencer mon voyage',
    'test.title': 'TEST D\'ORIENTATION',
    'test.subtitle': 'Complétez notre test personnalisé pour découvrir les meilleures destinations pour votre expérience internationale',
    'test.description': 'Trouvez votre destination parfaite en quelques minutes ! 😉',
    'map.title': 'CARTE INTERACTIVE MONDIALE',
    'map.subtitle': 'Explorez nos destinations disponibles sur le globe interactif',
    'countries.title': 'BASE DE DONNÉES DES PAYS',
    'countries.subtitle': 'Informations complètes sur toutes nos destinations étudiantes',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
