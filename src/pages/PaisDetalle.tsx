
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, DollarSign, Globe, Star, ExternalLink } from 'lucide-react';

const PaisDetalle = () => {
  const { id } = useParams();

  // Esta sería la misma data que en Paises.tsx - en una app real vendría de una API
  const countries = [
    {
      id: 'argentina',
      name: 'Argentina',
      capital: 'Buenos Aires',
      continent: 'América del Sur',
      language: 'Español',
      currency: 'Peso Argentino',
      population: '45.8M',
      costOfLiving: 'low',
      description: 'Argentina ofrece una rica cultura europea en América Latina, con excelentes universidades y un costo de vida muy accesible para estudiantes internacionales.',
      capitalDescription: 'Buenos Aires, conocida como el "París de América del Sur", es una metrópolis vibrante que combina arquitectura europea con el alma latina. Es el centro cultural y educativo del país.',
      studentPopulation: '50,000+',
      highlights: ['Costo de vida bajo', 'Rica vida cultural', 'Sin visa requerida', 'Excelente gastronomía'],
      testimonialIds: ['1'],
      flag: '🇦🇷',
      universities: ['Universidad de Buenos Aires', 'Universidad Católica Argentina', 'Universidad Torcuato Di Tella'],
      visaInfo: 'No se requiere visa para estancias de hasta 90 días para la mayoría de países.',
      housing: 'Opciones desde $200-800 USD/mes. Recomendado: Palermo, Recoleta, San Telmo.',
      transportation: 'Sistema de transporte público excelente. Subte, buses y taxis muy accesibles.'
    },
    {
      id: 'canada',
      name: 'Canadá',
      capital: 'Ottawa',
      continent: 'América del Norte',
      language: 'Inglés/Francés',
      currency: 'Dólar Canadiense',
      population: '38.2M',
      costOfLiving: 'high',
      description: 'Canadá es conocido por su sistema educativo de clase mundial, sociedad multicultural y paisajes impresionantes.',
      capitalDescription: 'Ottawa es una ciudad segura y multicultural, sede del gobierno canadiense. Toronto y Vancouver son los principales centros estudiantiles.',
      studentPopulation: '200,000+',
      highlights: ['Educación de calidad mundial', 'Sociedad multicultural', 'Oportunidades laborales', 'Paisajes increíbles'],
      testimonialIds: ['2'],
      flag: '🇨🇦',
      universities: ['University of Toronto', 'McGill University', 'University of British Columbia'],
      visaInfo: 'Se requiere visa de estudiante. Proceso puede tomar 4-12 semanas.',
      housing: 'Opciones desde $800-2000 CAD/mes. Campus housing disponible.',
      transportation: 'Excelente transporte público en ciudades principales. TTC en Toronto, STM en Montreal.'
    }
    // ... más países según necesites
  ];

  const country = countries.find(c => c.id === id);

  if (!country) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">País no encontrado</h1>
          <Link to="/paises" className="text-warm-orange hover:underline">
            Volver a países
          </Link>
        </div>
      </div>
    );
  }

  const getCostIcon = (cost: string) => {
    switch (cost) {
      case 'low': return '€';
      case 'medium': return '€€';
      case 'high': return '€€€';
      default: return '€';
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/paises"
            className="inline-flex items-center text-warm-orange hover:text-orange-600 mb-6 font-poppins"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a países
          </Link>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-6xl">{country.flag}</span>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 font-poppins">{country.name}</h1>
              <p className="text-xl text-gray-600 font-poppins">{country.capital}, {country.continent}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-warm-orange" />
            <p className="text-2xl font-bold text-gray-900 font-poppins">{country.studentPopulation}</p>
            <p className="text-sm text-gray-600">Estudiantes</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-warm-orange" />
            <p className={`text-2xl font-bold ${getCostColor(country.costOfLiving)} font-poppins`}>
              {getCostIcon(country.costOfLiving)}
            </p>
            <p className="text-sm text-gray-600">Costo de vida</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <Globe className="w-8 h-8 mx-auto mb-2 text-warm-orange" />
            <p className="text-lg font-bold text-gray-900 font-poppins">{country.language}</p>
            <p className="text-sm text-gray-600">Idioma</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-warm-orange" />
            <p className="text-lg font-bold text-gray-900 font-poppins">{country.population}</p>
            <p className="text-sm text-gray-600">Población</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">Sobre {country.name}</h2>
          <p className="text-gray-700 leading-relaxed mb-6 font-poppins">{country.description}</p>
          
          <h3 className="text-xl font-bold text-gray-900 mb-4 font-poppins">Sobre {country.capital}</h3>
          <p className="text-gray-700 leading-relaxed font-poppins">{country.capitalDescription}</p>
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">¿Por qué elegir {country.name}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {country.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center p-4 bg-orange-50 rounded-xl">
                <Star className="w-5 h-5 text-warm-orange mr-3 flex-shrink-0" />
                <span className="text-gray-800 font-poppins">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Universities */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">Universidades Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {country.universities.map((university, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-xl hover:border-warm-orange transition-colors">
                <h3 className="font-semibold text-gray-900 font-poppins">{university}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-poppins">Información de Visa</h3>
            <p className="text-gray-700 text-sm font-poppins">{country.visaInfo}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-poppins">Alojamiento</h3>
            <p className="text-gray-700 text-sm font-poppins">{country.housing}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-poppins">Transporte</h3>
            <p className="text-gray-700 text-sm font-poppins">{country.transportation}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/test"
            className="flex-1 bg-warm-orange text-white py-4 px-6 rounded-full font-semibold hover:bg-orange-600 transition-colors text-center font-poppins"
          >
            Hacer test de compatibilidad
          </Link>
          <Link
            to="/mapa"
            className="flex-1 border-2 border-warm-orange text-warm-orange py-4 px-6 rounded-full font-semibold hover:bg-warm-orange hover:text-white transition-colors text-center font-poppins"
          >
            Ver en el mapa
          </Link>
          {country.testimonialIds.length > 0 && (
            <Link
              to="/testimonios"
              className="flex-1 bg-gray-800 text-white py-4 px-6 rounded-full font-semibold hover:bg-gray-700 transition-colors text-center font-poppins"
            >
              Ver testimonios
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaisDetalle;
