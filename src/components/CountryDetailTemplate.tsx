import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Lock, Star } from 'lucide-react';
import { useCountry } from '../hooks/useCountries';
import { useAuth } from '../contexts/AuthContext';
import Globe3D from './Globe3D';
import { Button } from './ui/button';

interface Section {
  id: string;
  title: string;
  isPremium: boolean;
}

const sections: Section[] = [
  { id: 'cities', title: 'Big Cities vs Small Towns', isPremium: false },
  { id: 'culture', title: 'Culture', isPremium: false },
  { id: 'life-activities', title: 'Life, Activities & Travel', isPremium: true },
  { id: 'scholarships', title: 'Student Benefits & Scholarships', isPremium: true },
  { id: 'visa', title: 'Visa Information', isPremium: true },
  { id: 'medical', title: 'Medical', isPremium: true },
];

const CountryDetailTemplate = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const { user } = useAuth();
  const { data: country, isLoading, error } = useCountry(countryId!);
  const [activeSection, setActiveSection] = useState('cities');
  
  // Check if user is developer or has premium access
  const isDeveloper = user?.email?.includes('developer') || false; // Adjust this logic as needed
  const hasPremiumAccess = isDeveloper; // For now, only developers have premium access

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
          <p className="text-muted-foreground">Loading country information...</p>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Country not found</h2>
          <Link to="/paises" className="text-primary hover:underline">
            ← Back to countries
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
            Back to Countries
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
                  <div className="flex items-center justify-between">
                    <span>{section.title}</span>
                    {section.isPremium && !hasPremiumAccess && (
                      <Lock className="w-4 h-4 ml-2" />
                    )}
                  </div>
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
                    🗺️ Interactive Map
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

            {/* Premium Sections */}
            {sections.slice(2).map((section) => (
              <section key={section.id} id={section.id} className="animate-fade-in-up relative">
                <h2 className="font-glacial text-3xl font-bold text-foreground mb-6">
                  {section.id === 'life-activities' && '🎨 Life, Activities & Travel'}
                  {section.id === 'scholarships' && '💰 Student Benefits & Scholarships'}
                  {section.id === 'visa' && '📋 Visa Information'}
                  {section.id === 'medical' && '🏥 Medical'}
                </h2>
                
                {hasPremiumAccess ? (
                  <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                    <p className="font-poppins text-muted-foreground leading-relaxed">
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
                  </div>
                ) : (
                  <div className="relative">
                    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm blur-sm">
                      <p className="font-poppins text-muted-foreground leading-relaxed">
                        This comprehensive section contains detailed information about {section.title.toLowerCase()} in {country.name}, including practical tips, requirements, and insider knowledge from our student mobility guides.
                      </p>
                      <div className="h-32 bg-muted/20 rounded-lg mt-4"></div>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl">
                      <div className="text-center p-6">
                        <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                        <p className="font-poppins text-foreground font-medium mb-2">
                          🔐 This content is for Odisea+ members only
                        </p>
                        <p className="font-poppins text-sm text-muted-foreground mb-4">
                          Unlock detailed guides, insider tips, and comprehensive information
                        </p>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                          <Star className="w-4 h-4 mr-2" />
                          Unlock with Odisea+
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailTemplate;
