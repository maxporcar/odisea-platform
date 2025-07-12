import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ExternalLink, GraduationCap, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useCity } from '../../../../hooks/useCities';
import { useCountry } from '../../../../hooks/useCountries';
import { useUniversities } from '../../../../hooks/useUniversities';
import { useTestimonials } from '../../../../hooks/useTestimonials';
import { useTranslation } from 'react-i18next';

const CityDetail = () => {
  const { t } = useTranslation();
  const { countryId, slug } = useParams<{ countryId: string; slug: string }>();
  const { data: country } = useCountry(countryId!);
  const { data: city, isLoading: cityLoading, error: cityError } = useCity(slug!);
  const { data: universities = [], isLoading: universitiesLoading } = useUniversities(countryId, city?.id);
  const { data: testimonials = [], isLoading: testimonialsLoading } = useTestimonials(countryId);

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
        {/* Descripción de la ciudad */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">{t('cityDetail.about')} {city.name}</h2>
          <div className="bg-card rounded-2xl p-6 shadow-sm border">
            <p className="text-foreground leading-relaxed text-lg">
              {city.description || t('cityDetail.defaultDescription', { cityName: city.name })}
            </p>
          </div>
        </section>

        {/* Mapa Section */}
        {city.latitude && city.longitude && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">{t('cityDetail.location')}</h2>
            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <div className="h-64 bg-muted rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-foreground font-semibold">{t('cityDetail.mapOf')} {city.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {t('cityDetail.coordinates')}: {city.latitude}, {city.longitude}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Universidades en la ciudad */}
        <section className="mb-12">
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

        {/* Testimonios relacionados */}
        <section>
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
  );
};

export default CityDetail;