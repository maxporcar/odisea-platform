
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
    'nav.login': 'Iniciar Sesión',
    'home.hero.title': 'Tu aventura estudiantil comienza aquí',
    'home.hero.subtitle': 'Descubre el mundo a través de la educación con nuestra plataforma de movilidad estudiantil',
    'home.hero.cta': 'Comenzar mi viaje',
    'test.title': 'TEST DE ORIENTACIÓN',
    'test.subtitle': '¿Te sientes perdido con tu movilidad? ¿Demasiados países? ¿Indecisión? ¿No sabes a dónde ir?',
    'test.description': 'Tranquilo, hemos creado este test para orientarte y ¡encontrar la respuesta! 😉',
    'map.title': 'MAPA INTERACTIVO MUNDIAL',
    'map.subtitle': 'Si ya sabes a dónde quieres ir, ¡mira el mapa interactivo y selecciona tu país!',
  },
  en: {
    'nav.home': 'Home',
    'nav.test': 'Test',
    'nav.map': 'Map',
    'nav.testimonials': 'Testimonials',
    'nav.community': 'Community',
    'nav.login': 'Login',
    'home.hero.title': 'Your student adventure starts here',
    'home.hero.subtitle': 'Discover the world through education with our student mobility platform',
    'home.hero.cta': 'Start my journey',
    'test.title': 'ORIENTATION TEST',
    'test.subtitle': 'Feeling lost with your mobility? Too many countries? Indecision? Don\'t know where to go?',
    'test.description': 'Don\'t worry, we\'ve created this test to guide you and find the answer! 😉',
    'map.title': 'INTERACTIVE WORLD MAP',
    'map.subtitle': 'If you already know where you want to go, check out the interactive map and select your country!',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.test': 'Test',
    'nav.map': 'Carte',
    'nav.testimonials': 'Témoignages',
    'nav.community': 'Communauté',
    'nav.login': 'Connexion',
    'home.hero.title': 'Votre aventure étudiante commence ici',
    'home.hero.subtitle': 'Découvrez le monde à travers l\'éducation avec notre plateforme de mobilité étudiante',
    'home.hero.cta': 'Commencer mon voyage',
    'test.title': 'TEST D\'ORIENTATION',
    'test.subtitle': 'Vous vous sentez perdu avec votre mobilité ? Trop de pays ? Indécision ? Vous ne savez pas où aller ?',
    'test.description': 'Ne vous inquiétez pas, nous avons créé ce test pour vous orienter et trouver la réponse ! 😉',
    'map.title': 'CARTE INTERACTIVE MONDIALE',
    'map.subtitle': 'Si vous savez déjà où vous voulez aller, consultez la carte interactive et sélectionnez votre pays !',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
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
