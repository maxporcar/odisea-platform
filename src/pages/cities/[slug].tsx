import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useCity } from '@/hooks/useCities';
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

const CityDetailTemplate = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const { data: city, isLoading, error } = useCity(slug!);
  const [activeSection, setActiveSection] = useState('climate');
  const [translatedContent, setTranslatedContent] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState(false);

  // Define sections for city pages
  const sections: Section[] = [
    { id: 'climate', title: '🌡️ Climate' },
    { id: 'cost-of-living', title: '💰 Cost of Living' },
    { id: 'safety', title: '🛡️ Safety' },
    { id: 'rent', title: '🏠 Rent & Housing' },
    { id: 'events', title: '🎉 Events' },
    { id: 'social', title: '👫 Social Life' },
    { id: 'universities', title: '🎓 Universities' }
  ];

  // Handle content translation when language changes
  useEffect(() => {
    if (city && i18n.language !== 'en') {
      const translateMarkdownFields = async () => {
        setIsTranslating(true);
        const fieldsToTranslate = [
          'climate_md',
          'cost_of_living_md', 
          'safety_md',
          'rent_md',
          'events_md',
          'social_md',
          'universities_md'
        ];

        const translations: Record<string, string> = {};
        
        for (const field of fieldsToTranslate) {
          const content = (city as any)[field];
          if (content) {
            translations[field] = await translateContent(content, i18n.language);
          }
        }
        
        setTranslatedContent(translations);
        setIsTranslating(false);
      };

      translateMarkdownFields();
    } else {
      setTranslatedContent({});
    }
  }, [city, i18n.language]);

  // Function to get content (translated or original)
  const getContent = (field: string) => {
    return translatedContent[field] || (city as any)?.[field] || '';
  };

  // Scroll to section functionality
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('cityDetail.loading', 'Loading city information...')}</p>
        </div>
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">{t('cityDetail.notFound.title', 'City not found')}</h2>
          <Link to="/cities" className="text-primary hover:underline">
            {t('cityDetail.back', 'Back to cities')}
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
            to="/cities"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('cityDetail.back', 'Back to cities')}
          </Link>
          <div className="flex items-center space-x-4">
            {(city as any).countries?.flag && (
              <span className="text-4xl">{(city as any).countries.flag}</span>
            )}
            <div>
              <h1 className="text-4xl font-montserrat font-bold text-foreground">
                {city.name}
              </h1>
              {(city as any).countries?.name && (
                <p className="text-xl text-muted-foreground mt-1 flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  {(city as any).countries.name}
                </p>
              )}
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
                  {sections.map((section) => (
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
                {city.name} Student Guide
              </h1>
              <p className="font-poppins text-lg text-muted-foreground">
                Everything you need to know about studying in {city.name} - from climate and costs to social life and universities.
              </p>
            </div>

            {city.description && (
              <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
                <p className="font-poppins text-muted-foreground leading-relaxed text-center">
                  {city.description}
                </p>
              </div>
            )}

            {/* Climate */}
            <section id="climate" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">🌡️</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    Climate
                  </h2>
                </div>
                {getContent('climate_md') ? 
                  renderMarkdown(getContent('climate_md')) :
                  <p className="font-poppins text-muted-foreground leading-relaxed">
                    Climate information for {city.name} will be available soon.
                  </p>
                }
              </div>
            </section>

            {/* Cost of Living */}
            <section id="cost-of-living" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">💰</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    Cost of Living
                  </h2>
                </div>
                {getContent('cost_of_living_md') ? 
                  renderMarkdown(getContent('cost_of_living_md')) :
                  <p className="font-poppins text-muted-foreground leading-relaxed">
                    Cost of living information for {city.name} will be available soon.
                  </p>
                }
              </div>
            </section>

            {/* Safety */}
            <section id="safety" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">🛡️</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    Safety
                  </h2>
                </div>
                {getContent('safety_md') ? 
                  renderMarkdown(getContent('safety_md')) :
                  <p className="font-poppins text-muted-foreground leading-relaxed">
                    Safety information for {city.name} will be available soon.
                  </p>
                }
              </div>
            </section>

            {/* Rent & Housing */}
            <section id="rent" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">🏠</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    Rent & Housing
                  </h2>
                </div>
                {getContent('rent_md') ? 
                  renderMarkdown(getContent('rent_md')) :
                  <p className="font-poppins text-muted-foreground leading-relaxed">
                    Housing and rent information for {city.name} will be available soon.
                  </p>
                }
              </div>
            </section>

            {/* Events */}
            <section id="events" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">🎉</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    Events
                  </h2>
                </div>
                {getContent('events_md') ? 
                  renderMarkdown(getContent('events_md')) :
                  <p className="font-poppins text-muted-foreground leading-relaxed">
                    Events and activities information for {city.name} will be available soon.
                  </p>
                }
              </div>
            </section>

            {/* Social Life */}
            <section id="social" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">👫</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    Social Life
                  </h2>
                </div>
                {getContent('social_md') ? 
                  renderMarkdown(getContent('social_md')) :
                  <p className="font-poppins text-muted-foreground leading-relaxed">
                    Social life information for {city.name} will be available soon.
                  </p>
                }
              </div>
            </section>

            {/* Universities */}
            <section id="universities" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">🎓</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    Universities
                  </h2>
                </div>
                {getContent('universities_md') ? 
                  renderMarkdown(getContent('universities_md')) :
                  <p className="font-poppins text-muted-foreground leading-relaxed">
                    University information for {city.name} will be available soon.
                  </p>
                }
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetailTemplate;