import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useCountry } from '../hooks/useCountries';
import { useCities } from '../hooks/useCities';
import CountryMap2D from './CountryMap2D';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';

import { renderMarkdown } from '@/lib/markdown';

// Translation cache to avoid repeated API calls
const translationCache = new Map<string, string>();

// Auto-translation function using Supabase edge function
const translateContent = async (content: string, targetLang: string) => {
  if (targetLang === 'en' || !content) return content;
  
  // Check cache first
  const cacheKey = `${content.substring(0, 50)}_${targetLang}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }
  
  try {
    const { data, error } = await supabase.functions.invoke('translate-content', {
      body: {
        text: content,
        targetLang: targetLang,
        sourceLang: 'en'
      }
    });

    if (error) {
      console.error('Translation error:', error);
      return content; // Return original on error
    }

    const translatedText = data?.translatedText || content;
    // Cache the result
    translationCache.set(cacheKey, translatedText);
    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return content; // Return original on error
  }
};

interface Section {
  id: string;
  title: string;
}

const CountryDetailTemplate = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const { t, i18n } = useTranslation();
  const { data: country, isLoading, error } = useCountry(countryId!);
  const { data: cities = [] } = useCities(countryId);
  const [activeSection, setActiveSection] = useState('overview');
  const [translatedContent, setTranslatedContent] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState(false);

  // Handle content translation when language changes
  useEffect(() => {
    if (country && i18n.language !== 'en') {
      const translateMarkdownFields = async () => {
        setIsTranslating(true);
        console.log('🔄 Translating content to:', i18n.language);
        
        const fieldsToTranslate = [
          'overview_md',
          'big_cities_vs_small_cities_md', 
          'culture_md',
          'dos_and_donts_md',
          'visa_information_md',
          'life_activities_travel_md',
          'medical_md',
          'student_benefits_scholarships_md'
        ];

        const translations: Record<string, string> = {};
        
        // Translate fields in parallel for better performance
        const translationPromises = fieldsToTranslate.map(async (field) => {
          const content = country[field as keyof typeof country] as string;
          if (content) {
            const translated = await translateContent(content, i18n.language);
            return { field, translated };
          }
          return { field, translated: '' };
        });

        const results = await Promise.all(translationPromises);
        
        results.forEach(({ field, translated }) => {
          if (translated) {
            translations[field] = translated;
          }
        });
        
        console.log('✅ Translation completed for', Object.keys(translations).length, 'fields');
        setTranslatedContent(translations);
        setIsTranslating(false);
      };

      translateMarkdownFields();
    } else {
      setTranslatedContent({});
      setIsTranslating(false);
    }
  }, [country, i18n.language]);

  // Get content in the appropriate language
  const getContent = (field: string) => {
    if (i18n.language === 'en' || !translatedContent[field]) {
      return country?.[field as keyof typeof country] as string;
    }
    return translatedContent[field];
  };

  // Define sections with clean titles (no emoji icons in navigation)
  const sections: Section[] = [
    { id: 'overview', title: t('countryDetail.sections.overview', 'Overview') },
    { id: 'big-cities', title: t('countryDetail.sections.bigCities', 'Big Cities vs Small Towns') },
    { id: 'culture', title: t('countryDetail.sections.culture', 'Culture') },
    { id: 'life-activities', title: t('countryDetail.sections.lifeActivities', 'Life, Activities & Travel') },
    { id: 'scholarships', title: t('countryDetail.sections.scholarships', 'Student Benefits & Scholarships') },
    { id: 'visa', title: t('countryDetail.sections.visa', 'Visa Information') },
    { id: 'medical', title: t('countryDetail.sections.medical', 'Medical') },
    { id: 'dos-donts', title: t('countryDetail.sections.dosAndDonts', 'Dos and Don\'ts') },
    { id: 'country-cities', title: t('countryDetail.sections.cities', 'Cities to Explore') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      const scrollPosition = window.scrollY + 200;
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('countryDetail.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">{t('countryDetail.notFound.title')}</h2>
          <Link to="/paises" className="text-primary hover:underline">
            {t('countryDetail.back')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Translation indicator */}
      {isTranslating && (
        <div className="fixed top-4 right-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
          <span className="text-sm font-medium">🌐 Translating content...</span>
        </div>
      )}
      
      {/* Header */}
      <div className="bg-white border-b border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/paises"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('countryDetail.back')}
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{country.flag}</span>
            <div>
              <h1 className="text-4xl font-montserrat font-bold text-foreground">
                {country.name}
              </h1>
              <p className="text-xl text-muted-foreground mt-1">
                📍 {country.capital}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
                <h3 className="font-montserrat text-lg font-bold text-foreground mb-6">
                  Navigation
                </h3>
                <nav className="space-y-1">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`
                        w-full text-left px-4 py-3 rounded-lg font-poppins text-sm font-medium transition-all duration-200
                        flex items-center space-x-3
                        ${activeSection === section.id
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }
                      `}
                    >
                      <span>{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 text-center">
              <h1 className="font-montserrat text-4xl font-bold text-foreground mb-2">
                {country.name} Student Guide
              </h1>
              <p className="font-poppins text-lg text-muted-foreground">
                Everything you need to know about studying in {country.name} - from big cities to small towns, culture to visa requirements.
              </p>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="font-montserrat text-xl font-bold text-foreground flex items-center">
                  🗺️ Explore {country.name}
                </h3>
              </div>
              <div className="p-6">
                <CountryMap2D slug={countryId!} />
              </div>
            </div>

            {/* Overview Section */}
            <section id="overview" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">📖</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    {t('countryDetail.sections.overview', 'Overview')}
                  </h2>
                </div>
                {getContent('overview_md') ? 
                  renderMarkdown(getContent('overview_md')) :
                  <p className="font-poppins text-muted-foreground leading-relaxed">
                    Discover everything you need to know about studying in {country.name}. From academic opportunities to cultural experiences, get insights into what makes this destination special for international students.
                  </p>
                }
              </div>
            </section>

            {/* Big Cities vs Small Towns */}
            <section id="big-cities" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">📍</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    Big Cities vs Small Towns
                  </h2>
                </div>
                {getContent('big_cities_vs_small_cities_md') ? 
                  renderMarkdown(getContent('big_cities_vs_small_cities_md')) :
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-poppins text-lg font-semibold text-primary mb-3 flex items-center">
                        🏙️ Big Cities
                      </h3>
                      <p className="font-poppins text-muted-foreground leading-relaxed">
                        Major urban centers with world-class universities, diverse cultural scenes, and extensive networking opportunities.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-poppins text-lg font-semibold text-primary mb-3 flex items-center">
                        🌲 Small Towns
                      </h3>
                      <p className="font-poppins text-muted-foreground leading-relaxed">
                        Intimate learning environments with closer community connections and authentic cultural immersion.
                      </p>
                    </div>
                  </div>
                }
              </div>
            </section>

            {/* Culture */}
            <section id="culture" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">👥</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    Culture
                  </h2>
                </div>
                {getContent('culture_md') ? 
                  renderMarkdown(getContent('culture_md')) :
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="border border-border rounded-lg p-4">
                        <h4 className="font-poppins text-lg font-semibold text-foreground mb-2 flex items-center">
                          📅 Schedule
                        </h4>
                        <p className="font-poppins text-sm text-muted-foreground">
                          Daily routines and academic schedules
                        </p>
                      </div>
                      <div className="border border-border rounded-lg p-4">
                        <h4 className="font-poppins text-lg font-semibold text-foreground mb-2 flex items-center">
                          🍽️ Food Culture
                        </h4>
                        <p className="font-poppins text-sm text-muted-foreground">
                          Local cuisine and dining customs
                        </p>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </section>

            {/* Life Activities & Travel */}
            <section id="life-activities" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">✈️</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    Life, Activities & Travel
                  </h2>
                  <span className="ml-auto bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">Premium</span>
                </div>
                {getContent('life_activities_travel_md') ? 
                  renderMarkdown(getContent('life_activities_travel_md')) :
                  <p className="font-poppins text-muted-foreground leading-relaxed">
                    Explore recreational activities, travel opportunities, and lifestyle experiences in {country.name}.
                  </p>
                }
              </div>
            </section>

            {/* Scholarships & Student Benefits */}
            <section id="scholarships" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">🎓</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    Student Benefits & Scholarships
                  </h2>
                  <span className="ml-auto bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">Premium</span>
                </div>
                {getContent('student_benefits_scholarships_md') ? 
                  renderMarkdown(getContent('student_benefits_scholarships_md')) :
                  <p className="font-poppins text-muted-foreground leading-relaxed">
                    Financial support options and student benefits available in {country.name}.
                  </p>
                }
              </div>
            </section>

            {/* Visa Information */}
            <section id="visa" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">📋</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    Visa Information
                  </h2>
                  <span className="ml-auto bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">Premium</span>
                </div>
                {getContent('visa_information_md') ? 
                  renderMarkdown(getContent('visa_information_md')) :
                  <p className="font-poppins text-muted-foreground leading-relaxed">
                    Comprehensive visa requirements and application processes for studying in {country.name}.
                  </p>
                }
              </div>
            </section>

            {/* Medical & Healthcare */}
            <section id="medical" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">❤️</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    Medical
                  </h2>
                  <span className="ml-auto bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">Premium</span>
                </div>
                {getContent('medical_md') ? 
                  renderMarkdown(getContent('medical_md')) :
                  <p className="font-poppins text-muted-foreground leading-relaxed">
                    Healthcare information and medical requirements for international students in {country.name}.
                  </p>
                }
              </div>
            </section>

            {/* Dos and Don'ts */}
            <section id="dos-donts" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">✅</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    DOs and DON'Ts
                  </h2>
                </div>
                {getContent('dos_and_donts_md') ? 
                  renderMarkdown(getContent('dos_and_donts_md')) :
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-poppins text-lg font-semibold text-green-800 mb-3">
                        ✅ DOs
                      </h3>
                      <p className="font-poppins text-sm text-green-700">
                        Essential guidelines for positive interactions and cultural respect.
                      </p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-poppins text-lg font-semibold text-red-800 mb-3">
                        ❌ DON'Ts
                      </h3>
                      <p className="font-poppins text-sm text-red-700">
                        Common mistakes to avoid and cultural sensitivities to respect.
                      </p>
                    </div>
                  </div>
                }
              </div>
            </section>

            {/* Cities Section */}
            <section id="country-cities" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">🗺️</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    Cities to Explore
                  </h2>
                </div>
                <p className="font-poppins text-muted-foreground leading-relaxed mb-6">
                  Discover the best cities for international students in {country.name}.
                </p>
                
                {cities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cities.slice(0, 6).map((city) => (
                      <Link
                        key={city.id}
                        to={`/paises/${countryId}/ciudades/${city.slug}`}
                        className="flex items-center p-4 border border-border rounded-lg hover:bg-muted transition-colors group"
                      >
                        <MapPin className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-poppins font-semibold text-foreground group-hover:text-primary transition-colors">
                            {city.name}
                          </h4>
                          {city.description && (
                            <p className="font-poppins text-sm text-muted-foreground line-clamp-1 mt-1">
                              {city.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No cities available yet</p>
                  </div>
                )}
                
                {cities.length > 6 && (
                  <div className="mt-6 text-center">
                    <Link
                      to={`/paises/${countryId}/ciudades`}
                      className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                    >
                      View All Cities in {country.name}
                    </Link>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailTemplate;
