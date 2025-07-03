import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { GraduationCap, ExternalLink, Award, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useUniversity } from '../../../../hooks/useUniversities';
import { useCountry } from '../../../../hooks/useCountries';
import { useTestimonials } from '../../../../hooks/useTestimonials';

const UniversityDetail = () => {
  const { countryId, uniId } = useParams<{ countryId: string; uniId: string }>();
  const { data: country } = useCountry(countryId!);
  const { data: university, isLoading: universityLoading, error: universityError } = useUniversity(uniId!);
  const { data: testimonials = [], isLoading: testimonialsLoading } = useTestimonials(countryId);

  if (universityLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-xl text-primary font-semibold">Cargando información de la universidad...</span>
        </div>
      </div>
    );
  }

  if (universityError || !university) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Universidad no encontrada</h2>
          <p className="text-muted-foreground mb-4">No pudimos encontrar la información de esta universidad.</p>
          <Link 
            to={`/paises/${countryId}/universidades`}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Volver a universidades
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
                to={`/paises/${countryId}/universidades`}
                className="flex items-center text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver a universidades
              </Link>
            </div>
            
            <div className="flex items-center space-x-6 mb-4">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold">{university.name}</h1>
                <p className="text-xl opacity-90">{country?.name}</p>
              </div>
            </div>
            
            {university.ranking && (
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span className="text-lg">Ranking #{university.ranking}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Información principal */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-foreground mb-6">Sobre la universidad</h2>
              <div className="bg-card rounded-2xl p-6 shadow-sm border">
                <p className="text-foreground leading-relaxed text-lg">
                  {university.description || `${university.name} es una institución educativa de prestigio que ofrece programas académicos de alta calidad, brindando a los estudiantes una formación integral y oportunidades excepcionales para su desarrollo profesional.`}
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Información clave */}
              <div className="bg-card rounded-2xl p-6 shadow-sm border">
                <h3 className="text-xl font-semibold text-foreground mb-4">Información clave</h3>
                <div className="space-y-4">
                  {university.ranking && (
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Ranking mundial</p>
                        <p className="font-medium text-foreground">#{university.ranking}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <GraduationCap className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Institución</p>
                      <p className="font-medium text-foreground">Universidad</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enlaces */}
              {university.website_url && (
                <div className="bg-card rounded-2xl p-6 shadow-sm border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Enlaces oficiales</h3>
                  <a
                    href={university.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors"
                  >
                    <div className="flex items-center">
                      <ExternalLink className="w-5 h-5 text-primary mr-3" />
                      <span className="font-medium text-foreground">Sitio web oficial</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Programas y servicios */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Programas y servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <GraduationCap className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Programas académicos</h3>
              <p className="text-muted-foreground">Amplia gama de programas de pregrado y posgrado en diversas áreas del conocimiento.</p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <Award className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Excelencia académica</h3>
              <p className="text-muted-foreground">Reconocimiento internacional por la calidad de su educación y investigación.</p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-sm border">
              <ExternalLink className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Recursos estudiantiles</h3>
              <p className="text-muted-foreground">Biblioteca, laboratorios, servicios de apoyo y actividades extracurriculares.</p>
            </div>
          </div>
        </section>

        {/* Testimonios de ex-alumnos */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Experiencias de estudiantes</h2>
          
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
              <p className="text-muted-foreground">No hay testimonios disponibles para esta universidad.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default UniversityDetail;