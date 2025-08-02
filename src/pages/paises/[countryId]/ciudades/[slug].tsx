import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ExternalLink, GraduationCap, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useCity } from '../../../../hooks/useCities';
import { useCountry } from '../../../../hooks/useCountries';
import { useUniversities } from '../../../../hooks/useUniversities';
import { useTestimonials } from '../../../../hooks/useTestimonials';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';

// Enhanced markdown renderer with better formatting (same as new city pages)
const renderMarkdown = (content: string) => {
  if (!content) return null;
  
  // Clean content - remove surrounding quotes if present
  const cleanContent = content.replace(/^"|"$/g, '');
  
  // Enhanced markdown parsing
  let html = cleanContent
    // Handle headers
    .replace(/### (.*)/g, '<h4 class="font-poppins text-lg font-semibold text-foreground mb-3 mt-4 flex items-center"><span class="text-primary mr-2">📍</span>$1</h4>')
    .replace(/## (.*)/g, '<h3 class="font-poppins text-xl font-semibold text-foreground mb-4 mt-6 flex items-center"><span class="text-primary mr-2">🔹</span>$1</h3>')
    .replace(/# (.*)/g, '<h2 class="font-poppins text-2xl font-bold text-foreground mb-4 mt-6">$1</h2>')
    
    // Handle lists
    .replace(/^\* (.*)/gm, '<li class="font-poppins text-muted-foreground leading-relaxed mb-2 flex items-start"><span class="text-green-500 mr-2 mt-1">✓</span><span>$1</span></li>')
    .replace(/^- (.*)/gm, '<li class="font-poppins text-muted-foreground leading-relaxed mb-2 flex items-start"><span class="text-red-500 mr-2 mt-1">✗</span><span>$1</span></li>')
    
    // Handle emphasis
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    
    // Handle paragraphs and line breaks
    .replace(/\n\n/g, '</p><p class="font-poppins text-muted-foreground leading-relaxed mb-4">')
    .replace(/\n/g, '<br>');

  // Wrap lists properly
  html = html.replace(/(<li.*?<\/li>(\s*<li.*?<\/li>)*)/g, '<ul class="mb-6 space-y-2">$1</ul>');
  
  return (
    <div 
      className="markdown-content" 
      dangerouslySetInnerHTML={{ 
        __html: `<div class="font-poppins text-muted-foreground leading-relaxed">${html}</div>` 
      }} 
    />
  );
};

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

const CityDetail = () => {
  const { t, i18n } = useTranslation();
  const { countryId, slug } = useParams<{ countryId: string; slug: string }>();
  const { data: country } = useCountry(countryId!);
  const { data: city, isLoading: cityLoading, error: cityError } = useCity(slug!);
  const { data: universities = [], isLoading: universitiesLoading } = useUniversities(countryId, city?.id);
  const { data: testimonials = [], isLoading: testimonialsLoading } = useTestimonials(countryId);
  const [activeSection, setActiveSection] = useState('about');
  const [translatedContent, setTranslatedContent] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState(false);

  // Define sections for city pages
  const sections: Section[] = [
    { id: 'about', title: '📍 About' },
    { id: 'climate', title: '🌡️ Climate' },
    { id: 'cost-of-living', title: '💰 Cost of Living' },
    { id: 'safety', title: '🛡️ Safety' },
    { id: 'rent', title: '🏠 Rent & Housing' },
    { id: 'events', title: '🎉 Events' },
    { id: 'social', title: '👫 Social Life' },
    { id: 'universities-info', title: '🎓 Universities Info' },
    { id: 'universities', title: '🏫 Universities List' },
    { id: 'testimonials', title: '💬 Experiences' }
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

  if (cityLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-xl text-primary font-semibold">{t('cityDetail.loading')}</span>
        </div>
      </div>
    );
  }

  if (cityError || !city) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">{t('cityDetail.notFound.title')}</h2>
          <p className="text-muted-foreground mb-4">{t('cityDetail.notFound.description')}</p>
          <Link 
            to={`/paises/${countryId}/ciudades`}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            {t('cityDetail.backToCities')}
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

      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <div className="flex items-center space-x-4 mb-6">
              <Link 
                to={`/paises/${countryId}/ciudades`}
                className="flex items-center text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t('cityDetail.backToCities')}
              </Link>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-4xl">{country?.flag || '🌍'}</span>
              <div>
                <h1 className="text-5xl font-bold">{city.name}</h1>
                <p className="text-xl opacity-90">{country?.name}</p>
              </div>
            </div>
            
            {city.latitude && city.longitude && (
              <div className="flex items-center text-white/80">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Lat: {city.latitude}, Lng: {city.longitude}</span>
              </div>
            )}
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
            {/* About Section */}
            <section id="about" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">📍</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    About {city.name}
                  </h2>
                </div>
                <p className="text-foreground leading-relaxed text-lg">
                  {city.description || t('cityDetail.defaultDescription', { cityName: city.name })}
                </p>
              </div>
            </section>

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

            {/* Universities Info */}
            <section id="universities-info" className="animate-fade-in-up">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">🎓</span>
                  <h2 className="font-montserrat text-2xl font-bold text-foreground">
                    Universities Information
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

            {/* Universities List */}
            <section id="universities">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-foreground">{t('cityDetail.universitiesIn')} {city.name}</h2>
                <Link 
                  to={`/paises/${countryId}/universidades`}
                  className="text-primary hover:text-primary/80 font-medium flex items-center"
                >
                  {t('cityDetail.viewAllUniversities')} →
                </Link>
              </div>
              
              {universitiesLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : universities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {universities.map((university) => (
                    <div key={university.id} className="bg-card rounded-2xl p-6 shadow-sm border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-2">{university.name}</h3>
                          {university.ranking && (
                            <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
                              Ranking #{university.ranking}
                            </span>
                          )}
                        </div>
                        {university.website_url && (
                          <a
                            href={university.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                      <p className="text-muted-foreground">{university.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">{t('cityDetail.noUniversities')}</p>
                </div>
              )}
            </section>

            {/* Testimonials */}
            <section id="testimonials">
              <h2 className="text-3xl font-bold text-foreground mb-6">{t('cityDetail.experiencesIn')} {city.name}</h2>
              
              {testimonialsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : testimonials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.slice(0, 3).map((testimonial) => (
                    <div key={testimonial.id} className="bg-card rounded-2xl p-6 shadow-sm border">
                      <div className="flex items-center space-x-3 mb-4">
                        {testimonial.image_url ? (
                          <img 
                            src={testimonial.image_url} 
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-semibold">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.destination}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground line-clamp-4">
                        {testimonial.short_story || testimonial.full_story}
                      </p>
                      {testimonial.rating && (
                        <div className="flex items-center mt-4">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < testimonial.rating! ? 'text-amber-400' : 'text-muted-foreground'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">{t('cityDetail.noTestimonials')}</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetail;