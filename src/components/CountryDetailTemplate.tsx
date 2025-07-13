
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useCountry } from '../hooks/useCountries';
import { useCities } from '../hooks/useCities';
import Globe3D from './Globe3D';
import { useTranslation } from 'react-i18next';

interface Section {
  id: string;
  title: string;
}

const sections: Section[] = [
  { id: 'cities', title: 'Big Cities vs Small Towns' },
  { id: 'culture', title: 'Culture' },
  { id: 'life-activities', title: 'Life, Activities & Travel' },
  { id: 'scholarships', title: 'Student Benefits & Scholarships' },
  { id: 'visa', title: 'Visa Information' },
  { id: 'medical', title: 'Medical' },
];

const CountryDetailTemplate = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const { t } = useTranslation();
  const { data: country, isLoading, error } = useCountry(countryId!);
  const { data: cities = [] } = useCities(countryId);
  const [activeSection, setActiveSection] = useState('cities');

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
  }, []);

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Navigation Tabs */}
          <div className="lg:col-span-3">
            <nav className="sticky top-8 space-y-2">
              <h3 className="font-glacial text-lg font-semibold text-foreground mb-4">
                📚 Study Guide Sections
              </h3>
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    w-full text-left px-4 py-3 rounded-full font-poppins text-sm font-medium transition-all duration-200
                    animate-fade-in-up
                    ${activeSection === section.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    }
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Right Column - Map with Perfect Centering */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-glacial text-lg font-semibold text-foreground">
                    🗺️ {t('map.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Click on cities to explore
                  </p>
                </div>
                
                {/* Perfectly Centered Map Container */}
                <div className="flex justify-center items-center w-full py-4">
                  <div className="w-full sm:w-11/12 md:w-10/12 lg:w-full xl:w-11/12 max-w-4xl transition-all duration-200 ease-in-out">
                    <div className="h-[500px] relative flex justify-center">
                      <Globe3D 
                        width={400} 
                        height={500} 
                        countryCode={countryId}
                        enhancedContrast={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-5 space-y-12">
            {/* Big Cities vs Small Towns */}
            <section id="cities" className="animate-fade-in-up">
              <h2 className="font-glacial text-3xl font-bold text-foreground mb-6">
                🏙️ Big Cities vs Small Towns
              </h2>
              <div className="prose prose-lg max-w-none">
                <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                  <h3 className="font-poppins text-xl font-semibold text-foreground mb-4">Major Cities</h3>
                  <p className="font-poppins text-muted-foreground leading-relaxed mb-6">
                    Discover the vibrant urban centers of {country.name}, where international students thrive in cosmopolitan environments with world-class universities, diverse cultural scenes, and extensive networking opportunities.
                  </p>
                  
                  <h3 className="font-poppins text-xl font-semibold text-foreground mb-4">Smaller Communities</h3>
                  <p className="font-poppins text-muted-foreground leading-relaxed">
                    Experience the charm of smaller towns and cities, offering intimate learning environments, closer connections with locals, lower living costs, and authentic cultural immersion opportunities.
                  </p>
                </div>
              </div>
            </section>

            {/* Culture */}
            <section id="culture" className="animate-fade-in-up">
              <h2 className="font-glacial text-3xl font-bold text-foreground mb-6">
                🎭 Culture
              </h2>
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <p className="font-poppins text-muted-foreground leading-relaxed mb-6">
                  Immerse yourself in the rich cultural tapestry of {country.name}. From traditional celebrations to modern artistic expressions, understanding the local culture will enhance your study abroad experience significantly.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-poppins font-semibold text-foreground mb-2">🎉 Traditions & Festivals</h4>
                    <p className="font-poppins text-sm text-muted-foreground">
                      Participate in local celebrations and understand cultural significance.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-foreground mb-2">🍽️ Food Culture</h4>
                    <p className="font-poppins text-sm text-muted-foreground">
                      Discover local cuisine and dining customs that define social interactions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* All remaining sections - now fully visible */}
            {sections.slice(2).map((section) => (
              <section key={section.id} id={section.id} className="animate-fade-in-up">
                <h2 className="font-glacial text-3xl font-bold text-foreground mb-6">
                  {section.id === 'life-activities' && '🎨 Life, Activities & Travel'}
                  {section.id === 'scholarships' && '💰 Student Benefits & Scholarships'}
                  {section.id === 'visa' && '📋 Visa Information'}
                  {section.id === 'medical' && '🏥 Medical'}
                </h2>
                
                <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                  <p className="font-poppins text-muted-foreground leading-relaxed mb-4">
                    {section.id === 'life-activities' && 
                      `Explore the endless possibilities for recreation, travel, and personal growth in ${country.name}. From outdoor adventures to cultural experiences, discover how to make the most of your time abroad.`
                    }
                    {section.id === 'scholarships' && 
                      `Unlock funding opportunities and student benefits available in ${country.name}. Learn about scholarships, grants, work-study programs, and other financial support options for international students.`
                    }
                    {section.id === 'visa' && 
                      `Navigate the visa process for studying in ${country.name}. Get detailed information about requirements, application procedures, processing times, and renewal processes.`
                    }
                    {section.id === 'medical' && 
                      `Understand healthcare systems and medical requirements for studying in ${country.name}. Learn about insurance options, healthcare access, and maintaining your health abroad.`
                    }
                  </p>
                  
                  {section.id === 'visa' && country.visa_info && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="font-poppins text-sm text-foreground">{country.visa_info}</p>
                    </div>
                  )}
                  
                  {section.id === 'medical' && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-poppins font-semibold text-foreground mb-2">🏥 Healthcare System</h4>
                        <p className="font-poppins text-sm text-muted-foreground">
                          Overview of the healthcare system and how international students can access medical services.
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-poppins font-semibold text-foreground mb-2">🛡️ Insurance Requirements</h4>
                        <p className="font-poppins text-sm text-muted-foreground">
                          Information about mandatory health insurance and coverage options for students.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ))}

            {/* Cities Section - Added at the bottom */}
            <section id="country-cities" className="animate-fade-in-up">
              <h2 className="font-glacial text-3xl font-bold text-foreground mb-6">
                🏙️ {t('countryDetail.cities.title')}
              </h2>
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <p className="font-poppins text-muted-foreground leading-relaxed mb-6">
                  {t('countryDetail.cities.subtitle', { country: country.name })}
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
                    <p className="text-muted-foreground">{t('cities.noCities.description')}</p>
                  </div>
                )}
                
                {cities.length > 6 && (
                  <div className="mt-6 text-center">
                    <Link
                      to={`/paises/${countryId}/ciudades`}
                      className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                    >
                      {t('countryDetail.cities.viewAll', { country: country.name })}
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
