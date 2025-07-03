import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { GraduationCap, ExternalLink, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useCountry } from '../../../../hooks/useCountries';
import { useUniversities } from '../../../../hooks/useUniversities';

const UniversitiesIndex = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const { data: country, isLoading: countryLoading } = useCountry(countryId!);
  const { data: universities = [], isLoading: universitiesLoading, error: universitiesError } = useUniversities(countryId);

  if (countryLoading || universitiesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-xl text-primary font-semibold">Cargando universidades...</span>
        </div>
      </div>
    );
  }

  if (universitiesError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Error al cargar universidades</h2>
          <p className="text-muted-foreground mb-4">No pudimos cargar las universidades de este país.</p>
          <Link 
            to={`/paises/${countryId}`}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Volver al país
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link 
              to={`/paises/${countryId}`}
              className="flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver al país
            </Link>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className="text-4xl">{country?.flag || '🌍'}</span>
              <h1 className="text-4xl font-bold text-foreground">
                Universidades en {country?.name}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Explora las mejores instituciones educativas del país
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {universities.length} universidades disponibles
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {universities.length === 0 ? (
          <div className="text-center py-12">
            <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No hay universidades disponibles</h3>
            <p className="text-muted-foreground">Aún no tenemos información sobre universidades en este país.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map((university) => (
              <Link
                key={university.id}
                to={`/paises/${countryId}/universidades/${university.id}`}
                className="bg-card rounded-2xl shadow-sm border hover:shadow-lg transition-all transform hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">{university.name}</h3>
                      {university.ranking && (
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
                            Ranking #{university.ranking}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <GraduationCap className="w-8 h-8 text-primary" />
                      {university.website_url && (
                        <ExternalLink className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground line-clamp-4 mb-4">
                    {university.description || 'Una institución educativa de excelencia que ofrece programas académicos de alta calidad.'}
                  </p>
                  
                  {university.website_url && (
                    <div className="flex items-center text-sm text-primary">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span>Visitar sitio web</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversitiesIndex;