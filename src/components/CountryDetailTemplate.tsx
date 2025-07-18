
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useCountry } from '../hooks/useCountries';
import { useCities } from '../hooks/useCities';
import { useCountryContent } from '../hooks/useCountryContent';
import CountryMap2D from './CountryMap2D';
import CountryContentAccordion from './CountryContentAccordion';
import { useTranslation } from 'react-i18next';

interface Section {
  id: string;
  title: string;
}

const CountryDetailTemplate = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: country, isLoading, error } = useCountry(countryId!);
  const { data: cities = [] } = useCities(countryId);
  const { data: countryContent = [] } = useCountryContent(countryId || '');
  const [activeSection, setActiveSection] = useState('content');

  // Define sections with proper translation keys
  const sections: Section[] = [
    { id: 'content', title: t('countryDetail.sections.studyGuide', 'Study Guide') },
    { id: 'cities', title: t('countryDetail.sections.cities', 'Cities') },
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

  const handleCityClick = (citySlug: string) => {
    navigate(`/paises/${countryId}/ciudades/${citySlug}`);
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
                📚 Sections
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

          {/* Right Column - Map */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <CountryMap2D 
                countryId={countryId!}
                cities={cities.filter(city => city.latitude && city.longitude)}
                onCityClick={handleCityClick}
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-5 space-y-12">
            {/* Study Guide Content */}
            <section id="content" className="animate-fade-in-up">
              <CountryContentAccordion 
                content={countryContent}
                countryName={country.name}
              />
            </section>

            {/* Cities Section */}
            <section id="cities" className="animate-fade-in-up">
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
