import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useCountry } from '../../../../hooks/useCountries';
import { useCities } from '../../../../hooks/useCities';

const CitiesIndex = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const { data: country, isLoading: countryLoading } = useCountry(countryId!);
  const { data: cities = [], isLoading: citiesLoading, error: citiesError } = useCities(countryId);

  if (countryLoading || citiesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-xl text-primary font-semibold">Cargando ciudades...</span>
        </div>
      </div>
    );
  }

  if (citiesError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Error al cargar ciudades</h2>
          <p className="text-muted-foreground mb-4">No pudimos cargar las ciudades de este país.</p>
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
                Ciudades en {country?.name}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Explora las principales ciudades estudiantiles del país
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {cities.length} ciudades disponibles
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cities.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No hay ciudades disponibles</h3>
            <p className="text-muted-foreground">Aún no tenemos información sobre ciudades en este país.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <Link
                key={city.id}
                to={`/paises/${countryId}/ciudades/${city.slug}`}
                className="bg-card rounded-2xl shadow-sm border hover:shadow-lg transition-all transform hover:scale-105 overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                  {city.image_url ? (
                    <img 
                      src={city.image_url} 
                      alt={city.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <MapPin className="w-12 h-12 text-primary" />
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{city.name}</h3>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {city.description || 'Una ciudad increíble para estudiar y vivir experiencias únicas.'}
                  </p>
                  
                  {city.latitude && city.longitude && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Lat: {city.latitude}, Lng: {city.longitude}</span>
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

export default CitiesIndex;