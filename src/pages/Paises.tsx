
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Users, DollarSign, Globe, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Country {
  id: string;
  name: string;
  capital: string;
  continent: string;
  language: string;
  currency: string;
  population: string;
  costOfLiving: 'low' | 'medium' | 'high';
  description: string;
  capitalDescription: string;
  studentPopulation: string;
  highlights: string[];
  testimonialIds: string[];
  flag: string;
}

const Paises = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterContinent, setFilterContinent] = useState('all');

  const countries: Country[] = [
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
      flag: '🇦🇷'
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
      description: 'Canadá es conocido por su sistema educativo de clase mundial, sociedad multicultural y paisajes impresionantes. Ofrece excelentes oportunidades post-graduación.',
      capitalDescription: 'Ottawa es una ciudad segura y multicultural, sede del gobierno canadiense. Ofrece una calidad de vida excepcional y acceso a universidades de prestigio internacional.',
      studentPopulation: '200,000+',
      highlights: ['Educación de calidad mundial', 'Sociedad multicultural', 'Oportunidades laborales', 'Paisajes increíbles'],
      testimonialIds: ['2'],
      flag: '🇨🇦'
    },
    {
      id: 'usa',
      name: 'Estados Unidos',
      capital: 'Washington D.C.',
      continent: 'América del Norte',
      language: 'Inglés',
      currency: 'Dólar Estadounidense',
      population: '331M',
      costOfLiving: 'high',
      description: 'Estados Unidos alberga algunas de las mejores universidades del mundo y ofrece infinitas oportunidades profesionales en todos los campos.',
      capitalDescription: 'Washington D.C. es el centro político del país, rica en historia y cultura. Nueva York, por otro lado, es el corazón financiero y cultural global.',
      studentPopulation: '1M+',
      highlights: ['Universidades top mundial', 'Oportunidades profesionales', 'Diversidad cultural', 'Innovación tecnológica'],
      testimonialIds: ['3'],
      flag: '🇺🇸'
    },
    {
      id: 'germany',
      name: 'Alemania',
      capital: 'Berlín',
      continent: 'Europa',
      language: 'Alemán',
      currency: 'Euro',
      population: '83.2M',
      costOfLiving: 'medium',
      description: 'Alemania ofrece educación gratuita en universidades públicas, una economía fuerte y una rica historia cultural en el corazón de Europa.',
      capitalDescription: 'Berlín es una ciudad vibrante que combina historia con modernidad. Es un centro cultural y tecnológico emergente con una vida estudiantil muy activa.',
      studentPopulation: '300,000+',
      highlights: ['Educación gratuita', 'Economía fuerte', 'Rica historia', 'Ubicación central en Europa'],
      testimonialIds: [],
      flag: '🇩🇪'
    },
    {
      id: 'france',
      name: 'Francia',
      capital: 'París',
      continent: 'Europa',
      language: 'Francés',
      currency: 'Euro',
      population: '67.4M',
      costOfLiving: 'medium',
      description: 'Francia es sinónimo de cultura, arte y gastronomía. Sus universidades tienen siglos de historia y prestigio internacional.',
      capitalDescription: 'París, la "Ciudad de la Luz", es un centro mundial de arte, moda, gastronomía y cultura. Alberga algunas de las universidades más prestigiosas del mundo.',
      studentPopulation: '250,000+',
      highlights: ['Rica cultura y arte', 'Gastronomía mundial', 'Historia milenaria', 'Universidades prestigiosas'],
      testimonialIds: [],
      flag: '🇫🇷'
    },
    {
      id: 'japan',
      name: 'Japón',
      capital: 'Tokio',
      continent: 'Asia',
      language: 'Japonés',
      currency: 'Yen',
      population: '125.8M',
      costOfLiving: 'high',
      description: 'Japón ofrece una experiencia única que combina tradición milenaria con tecnología de vanguardia. Ideal para estudiantes interesados en innovación.',
      capitalDescription: 'Tokio es una metrópolis fascinante donde conviven templos antiguos con rascacielos futuristas. Es el centro tecnológico y cultural del país.',
      studentPopulation: '150,000+',
      highlights: ['Tradición y modernidad', 'Tecnología avanzada', 'Cultura única', 'Excelente seguridad'],
      testimonialIds: ['4'],
      flag: '🇯🇵'
    },
    {
      id: 'australia',
      name: 'Australia',
      capital: 'Canberra',
      continent: 'Oceanía',
      language: 'Inglés',
      currency: 'Dólar Australiano',
      population: '25.7M',
      costOfLiving: 'high',
      description: 'Australia combina ciudades cosmopolitas con paisajes naturales únicos. Ofrece una educación de calidad y un estilo de vida relajado.',
      capitalDescription: 'Canberra es una ciudad planificada y moderna. Sydney y Melbourne son los principales centros estudiantiles con universidades de renombre mundial.',
      studentPopulation: '180,000+',
      highlights: ['Calidad de vida alta', 'Paisajes únicos', 'Ciudades cosmopolitas', 'Clima favorable'],
      testimonialIds: [],
      flag: '🇦🇺'
    },
    {
      id: 'uk',
      name: 'Reino Unido',
      capital: 'Londres',
      continent: 'Europa',
      language: 'Inglés',
      currency: 'Libra Esterlina',
      population: '67.5M',
      costOfLiving: 'high',
      description: 'El Reino Unido alberga algunas de las universidades más antiguas y prestigiosas del mundo, con una rica tradición académica.',
      capitalDescription: 'Londres es una ciudad global que combina historia milenaria con modernidad. Es un centro financiero, cultural y educativo mundial.',
      studentPopulation: '400,000+',
      highlights: ['Universidades históricas', 'Tradición académica', 'Diversidad cultural', 'Conexiones globales'],
      testimonialIds: [],
      flag: '🇬🇧'
    },
    {
      id: 'italy',
      name: 'Italia',
      capital: 'Roma',
      continent: 'Europa',
      language: 'Italiano',
      currency: 'Euro',
      population: '59.1M',
      costOfLiving: 'medium',
      description: 'Italia es cuna del arte, la arquitectura y la gastronomía. Ofrece una experiencia cultural incomparable con universidades de siglos de historia.',
      capitalDescription: 'Roma, la "Ciudad Eterna", es un museo al aire libre donde cada esquina cuenta una historia. Es ideal para estudios de arte, historia y cultura.',
      studentPopulation: '120,000+',
      highlights: ['Patrimonio cultural único', 'Arte y arquitectura', 'Gastronomía excepcional', 'Historia milenaria'],
      testimonialIds: ['1'],
      flag: '🇮🇹'
    },
    {
      id: 'spain',
      name: 'España',
      capital: 'Madrid',
      continent: 'Europa',
      language: 'Español',
      currency: 'Euro',
      population: '47.4M',
      costOfLiving: 'medium',
      description: 'España ofrece un estilo de vida mediterráneo relajado, rica cultura y universidades con gran tradición. Ideal para estudiantes hispanohablantes.',
      capitalDescription: 'Madrid es el corazón político y cultural de España. Barcelona ofrece una mezcla única de tradición catalana y modernidad cosmopolita.',
      studentPopulation: '200,000+',
      highlights: ['Cultura mediterránea', 'Clima favorable', 'Gastronomía rica', 'Vida social activa'],
      testimonialIds: [],
      flag: '🇪🇸'
    },
    {
      id: 'netherlands',
      name: 'Países Bajos',
      capital: 'Ámsterdam',
      continent: 'Europa',
      language: 'Neerlandés',
      currency: 'Euro',
      population: '17.4M',
      costOfLiving: 'high',
      description: 'Los Países Bajos ofrecen una educación innovadora en un ambiente liberal y multicultural. Excelente para estudios en inglés.',
      capitalDescription: 'Ámsterdam es famosa por sus canales, museos y ambiente liberal. Es un hub internacional con excelente calidad de vida.',
      studentPopulation: '90,000+',
      highlights: ['Educación en inglés', 'Sociedad liberal', 'Innovación constante', 'Ubicación estratégica'],
      testimonialIds: [],
      flag: '🇳🇱'
    },
    {
      id: 'sweden',
      name: 'Suecia',
      capital: 'Estocolmo',
      continent: 'Europa',
      language: 'Sueco',
      currency: 'Corona Sueca',
      population: '10.4M',
      costOfLiving: 'high',
      description: 'Suecia es líder en innovación y sostenibilidad. Ofrece educación gratuita y una sociedad muy avanzada socialmente.',
      capitalDescription: 'Estocolmo es una ciudad moderna construida sobre 14 islas. Combina belleza natural con innovación tecnológica y diseño.',
      studentPopulation: '40,000+',
      highlights: ['Educación gratuita', 'Innovación tecnológica', 'Sostenibilidad', 'Calidad de vida alta'],
      testimonialIds: [],
      flag: '🇸🇪'
    },
    {
      id: 'mexico',
      name: 'México',
      capital: 'Ciudad de México',
      continent: 'América del Norte',
      language: 'Español',
      currency: 'Peso Mexicano',
      population: '128.9M',
      costOfLiving: 'low',
      description: 'México ofrece una rica cultura prehispánica y colonial, excelente gastronomía y universidades de calidad a precios muy accesibles.',
      capitalDescription: 'Ciudad de México es una de las ciudades más grandes del mundo, rica en historia, arte y cultura. Ofrece infinitas oportunidades de aprendizaje.',
      studentPopulation: '80,000+',
      highlights: ['Rica cultura ancestral', 'Gastronomía única', 'Costo muy accesible', 'Gente cálida'],
      testimonialIds: ['6'],
      flag: '🇲🇽'
    },
    {
      id: 'brazil',
      name: 'Brasil',
      capital: 'Brasília',
      continent: 'América del Sur',
      language: 'Portugués',
      currency: 'Real Brasileño',
      population: '215M',
      costOfLiving: 'low',
      description: 'Brasil es el país más grande de Sudamérica, conocido por su diversidad cultural, paisajes increíbles y universidades en crecimiento.',
      capitalDescription: 'Brasília es una ciudad moderna y planificada. São Paulo y Río de Janeiro son los principales centros educativos y culturales.',
      studentPopulation: '100,000+',
      highlights: ['Diversidad cultural', 'Paisajes únicos', 'Economía emergente', 'Hospitalidad brasileña'],
      testimonialIds: [],
      flag: '🇧🇷'
    },
    {
      id: 'chile',
      name: 'Chile',
      capital: 'Santiago',
      continent: 'América del Sur',
      language: 'Español',
      currency: 'Peso Chileno',
      population: '19.5M',
      costOfLiving: 'medium',
      description: 'Chile ofrece paisajes únicos desde el desierto hasta la Patagonia, con universidades de calidad y una economía estable.',
      capitalDescription: 'Santiago es una metrópolis moderna rodeada de montañas. Combina desarrollo económico con rica cultura y proximidad a paisajes únicos.',
      studentPopulation: '60,000+',
      highlights: ['Paisajes únicos', 'Economía estable', 'Universidades de calidad', 'Aventuras naturales'],
      testimonialIds: [],
      flag: '🇨🇱'
    },
    {
      id: 'south-korea',
      name: 'Corea del Sur',
      capital: 'Seúl',
      continent: 'Asia',
      language: 'Coreano',
      currency: 'Won',
      population: '51.8M',
      costOfLiving: 'medium',
      description: 'Corea del Sur es líder en tecnología y cultura pop. Ofrece universidades de excelencia y una experiencia cultural única.',
      capitalDescription: 'Seúl es una metrópolis ultramoderna que combina tradición milenaria con tecnología de vanguardia. Centro de la cultura K-pop.',
      studentPopulation: '70,000+',
      highlights: ['Tecnología avanzada', 'Cultura K-pop', 'Universidades de élite', 'Innovación constante'],
      testimonialIds: [],
      flag: '🇰🇷'
    },
    {
      id: 'singapore',
      name: 'Singapur',
      capital: 'Singapur',
      continent: 'Asia',
      language: 'Inglés/Mandarín/Malayo/Tamil',
      currency: 'Dólar de Singapur',
      population: '5.9M',
      costOfLiving: 'high',
      description: 'Singapur es un hub educativo y tecnológico en Asia. Ciudad-estado multicultural con universidades de prestigio mundial.',
      capitalDescription: 'Singapur es una ciudad-estado moderna que combina culturas asiáticas con estándares occidentales. Líder en educación e innovación.',
      studentPopulation: '40,000+',
      highlights: ['Hub tecnológico', 'Multiculturalismo', 'Universidades top', 'Ubicación estratégica'],
      testimonialIds: [],
      flag: '🇸🇬'
    },
    {
      id: 'new-zealand',
      name: 'Nueva Zelanda',
      capital: 'Wellington',
      continent: 'Oceanía',
      language: 'Inglés',
      currency: 'Dólar Neozelandés',
      population: '5.1M',
      costOfLiving: 'high',
      description: 'Nueva Zelanda ofrece paisajes cinematográficos, educación de calidad y una sociedad acogedora en un ambiente natural único.',
      capitalDescription: 'Wellington es una capital compacta y cultural. Auckland es el centro económico. Ambas ofrecen acceso a paisajes impresionantes.',
      studentPopulation: '25,000+',
      highlights: ['Paisajes únicos', 'Sociedad acogedora', 'Educación de calidad', 'Aventuras al aire libre'],
      testimonialIds: [],
      flag: '🇳🇿'
    },
    {
      id: 'portugal',
      name: 'Portugal',
      capital: 'Lisboa',
      continent: 'Europa',
      language: 'Portugués',
      currency: 'Euro',
      population: '10.3M',
      costOfLiving: 'medium',
      description: 'Portugal combina historia rica con modernidad, costas hermosas y una creciente escena tecnológica. Muy acogedor para estudiantes.',
      capitalDescription: 'Lisboa es una ciudad colorida construida sobre siete colinas. Combina tradición portuguesa con una vibrante escena cultural moderna.',
      studentPopulation: '35,000+',
      highlights: ['Costas hermosas', 'Historia rica', 'Gente acogedora', 'Crecimiento tecnológico'],
      testimonialIds: [],
      flag: '🇵🇹'
    },
    {
      id: 'cambodia',
      name: 'Camboya',
      capital: 'Phnom Penh',
      continent: 'Asia',
      language: 'Khmer',
      currency: 'Riel Camboyano',
      population: '16.7M',
      costOfLiving: 'low',
      description: 'Camboya ofrece una experiencia única con templos milenarios, cultura rica y oportunidades de voluntariado internacional.',
      capitalDescription: 'Phnom Penh es una ciudad en crecimiento. Siem Reap, cerca de Angkor Wat, es un centro cultural y de aprendizaje único.',
      studentPopulation: '5,000+',
      highlights: ['Templos milenarios', 'Cultura auténtica', 'Costo muy bajo', 'Experiencias únicas'],
      testimonialIds: ['5'],
      flag: '🇰🇭'
    }
  ];

  const continents = ['all', 'Europa', 'América del Norte', 'América del Sur', 'Asia', 'Oceanía'];

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         country.capital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent = filterContinent === 'all' || country.continent === filterContinent;
    return matchesSearch && matchesContinent;
  });

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-warm-orange mb-4 font-poppins">
              {t('countries.title')}
            </h1>
            <p className="text-xl text-amber-700 font-poppins">
              {t('countries.subtitle')}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar país o capital..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-full focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-transparent bg-white/90 backdrop-blur-sm font-poppins"
              />
            </div>
            
            <select
              value={filterContinent}
              onChange={(e) => setFilterContinent(e.target.value)}
              className="px-4 py-3 border border-orange-200 rounded-full focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-transparent font-poppins"
            >
              <option value="all">Todos los continentes</option>
              {continents.slice(1).map(continent => (
                <option key={continent} value={continent}>{continent}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCountries.map((country) => (
            <div
              key={country.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{country.flag}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 font-poppins">{country.name}</h3>
                    <p className="text-sm text-gray-600">{country.capital}</p>
                  </div>
                </div>
                <span className={`text-2xl font-bold ${getCostColor(country.costOfLiving)}`}>
                  {getCostIcon(country.costOfLiving)}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  <span>{country.continent}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{country.studentPopulation} estudiantes</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>{country.currency}</span>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {country.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {country.highlights.slice(0, 2).map((highlight, index) => (
                  <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-poppins">
                    {highlight}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Link
                  to={`/paises/${country.id}`}
                  className="flex-1 bg-warm-orange text-white py-2 px-4 rounded-full font-semibold hover:bg-orange-600 transition-colors text-center text-sm font-poppins"
                >
                  Ver detalles
                </Link>
                {country.testimonialIds.length > 0 && (
                  <Link
                    to="/testimonios"
                    className="bg-gray-100 text-gray-700 py-2 px-4 rounded-full font-semibold hover:bg-gray-200 transition-colors text-sm font-poppins"
                  >
                    Testimonios
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Paises;
