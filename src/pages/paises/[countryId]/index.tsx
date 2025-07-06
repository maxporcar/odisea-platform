import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, DollarSign, GraduationCap, Building, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { useCountry } from '../../../hooks/useCountries';
import { useCities } from '../../../hooks/useCities';
import { useUniversities } from '../../../hooks/useUniversities';
import { useTestimonials } from '../../../hooks/useTestimonials';

const CountryDetail = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const { data: country, isLoading: countryLoading, error: countryError } = useCountry(countryId!);
  const { data: cities = [], isLoading: citiesLoading } = useCities(countryId);
  const { data: universities = [], isLoading: universitiesLoading } = useUniversities(countryId);
  const { data: testimonials = [], isLoading: testimonialsLoading } = useTestimonials(countryId);

  const getCostLevel = (cost: string) => {
    switch (cost) {
      case 'low': return 'Bajo';
      case 'medium': return 'Medio';
      case 'high': return 'Alto';
      default: return 'Medio';
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'low': return 'text-emerald-600 bg-emerald-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  if (countryLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-xl text-primary font-semibold">Cargando información del país...</span>
        </div>
      </div>
    );
  }

  if (countryError || !country) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">País no encontrado</h2>
          <p className="text-muted-foreground mb-4">No pudimos encontrar la información de este país.</p>
          <Link 
            to="/paises" 
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Volver a países
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
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-6xl">{country.flag || '🌍'}</span>
              <div>
                <h1 className="text-5xl font-bold">{country.name}</h1>
                <p className="text-xl opacity-90">{country.capital}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resumen Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6 animate-on-scroll">🌍 Resumen del país</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 shadow-sm border animate-slide-up">
                <p className="text-foreground leading-relaxed text-lg">{country.description}</p>
                {country.capital_description && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">Sobre {country.capital}</h4>
                    <p className="text-muted-foreground">{country.capital_description}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-card rounded-2xl p-6 shadow-sm border animate-slide-up">
                <h3 className="text-xl font-semibold text-foreground mb-4">Información clave</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Capital</p>
                      <p className="font-medium text-foreground">{country.capital}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Población</p>
                      <p className="font-medium text-foreground">{country.population}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Moneda</p>
                      <p className="font-medium text-foreground">{country.currency}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-5 h-5 text-primary mr-3 text-center">€</div>
                    <div>
                      <p className="text-sm text-muted-foreground">Costo de vida</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${getCostColor(country.cost_of_living)}`}>
                        {getCostLevel(country.cost_of_living)}
                      </span>
                    </div>
                  </div>

                  {country.student_population && (
                    <div className="flex items-center">
                      <GraduationCap className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Estudiantes internacionales</p>
                        <p className="font-medium text-foreground">{country.student_population}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Información práctica Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 animate-on-scroll">📋 Información práctica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Visa Information */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border hover:shadow-lg transition-all animate-on-scroll">
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🛂</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Visa Information</h3>
              <p className="text-muted-foreground mb-4">
                {country.visa_info || 'Información sobre requisitos de visa y documentación necesaria para estudiantes internacionales.'}
              </p>
              <button className="text-primary hover:text-primary/80 font-medium text-sm">
                Ver detalles completos →
              </button>
            </div>

            {/* Culture */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border hover:shadow-lg transition-all animate-on-scroll">
              <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🎭</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Culture</h3>
              <p className="text-muted-foreground mb-4">
                Descubre la rica cultura local, tradiciones y lo que hace único a {country.name}.
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-2">🗣️</span>
                <span>Idioma principal: {country.language}</span>
              </div>
            </div>

            {/* Activities & Travel */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border hover:shadow-lg transition-all animate-on-scroll">
              <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Life, Activities & Travel</h3>
              <p className="text-muted-foreground mb-4">
                {country.transportation || 'Explora actividades, lugares turísticos y opciones de transporte disponibles.'}
              </p>
              <button className="text-primary hover:text-primary/80 font-medium text-sm">
                Explorar actividades →
              </button>
            </div>

            {/* Student Benefits */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border hover:shadow-lg transition-all animate-on-scroll">
              <div className="bg-yellow-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Student Benefits & Scholarships</h3>
              <p className="text-muted-foreground mb-4">
                Becas disponibles, descuentos estudiantiles y beneficios especiales para estudiantes internacionales.
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-2">👥</span>
                <span>{country.student_population || 'Comunidad estudiantil activa'}</span>
              </div>
            </div>

            {/* Housing */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border hover:shadow-lg transition-all animate-on-scroll">
              <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Housing</h3>
              <p className="text-muted-foreground mb-4">
                {country.housing || 'Opciones de alojamiento para estudiantes: residencias, apartamentos compartidos y más.'}
              </p>
              <button className="text-primary hover:text-primary/80 font-medium text-sm">
                Ver opciones de vivienda →
              </button>
            </div>

            {/* Medical */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border hover:shadow-lg transition-all animate-on-scroll">
              <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Medical</h3>
              <p className="text-muted-foreground mb-4">
                Sistema de salud, seguros médicos requeridos y servicios de salud disponibles para estudiantes.
              </p>
              <button className="text-primary hover:text-primary/80 font-medium text-sm">
                Información médica →
              </button>
            </div>
          </div>
        </section>
        {/* Ciudades Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground animate-on-scroll">🏙️ Ciudades principales</h2>
            <Link 
              to={`/paises/${countryId}/ciudades`}
              className="text-primary hover:text-primary/80 font-medium flex items-center animate-float"
            >
              Ver todas las ciudades →
            </Link>
          </div>
          
          {citiesLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.slice(0, 6).map((city) => (
                <Link
                  key={city.id}
                  to={`/paises/${countryId}/ciudades/${city.slug || city.id}`}
                  className="bg-card rounded-2xl p-6 shadow-sm border hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-2">{city.name}</h3>
                  <p className="text-muted-foreground line-clamp-3">{city.description}</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Universidades Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground animate-on-scroll">🎓 Universidades destacadas</h2>
            <Link 
              to={`/paises/${countryId}/universidades`}
              className="text-primary hover:text-primary/80 font-medium flex items-center animate-float"
            >
              Ver todas las universidades →
            </Link>
          </div>
          
          {universitiesLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {universities.slice(0, 4).map((university) => (
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
                  <p className="text-muted-foreground line-clamp-3">{university.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Testimonios Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground animate-on-scroll">💬 Testimonios de estudiantes</h2>
            <Link 
              to="/testimonios"
              className="text-primary hover:text-primary/80 font-medium flex items-center animate-float"
            >
              Ver todos los testimonios →
            </Link>
          </div>
          
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
              <p className="text-muted-foreground">No hay testimonios disponibles para este país.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CountryDetail;