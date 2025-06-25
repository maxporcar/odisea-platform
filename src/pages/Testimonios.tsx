
import React, { useState } from 'react';
import { Star, MapPin, Calendar, Quote } from 'lucide-react';

interface Testimony {
  id: string;
  name: string;
  destination: string;
  country: string;
  duration: string;
  program: string;
  rating: number;
  image: string;
  shortStory: string;
  fullStory: string;
  tips: string[];
}

const Testimonios = () => {
  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null);

  const testimonies: Testimony[] = [
    {
      id: '1',
      name: 'LEA',
      destination: 'ROMA',
      country: 'Italia',
      duration: '6 meses',
      program: 'Erasmus',
      rating: 5,
      image: '/lovable-uploads/placeholder-1.jpg',
      shortStory: 'Roma cambió mi perspectiva sobre la historia y el arte. Cada esquina cuenta una historia.',
      fullStory: 'Mi experiencia en Roma fue transformadora. Llegué sin saber italiano y con muchos nervios, pero la ciudad me recibió con los brazos abiertos. Estudié Historia del Arte en la Università La Sapienza y cada día era una aventura. Desde visitar el Coliseo al amanecer hasta perderse en las calles de Trastevere, Roma me enseñó a vivir el momento. La comunidad de estudiantes internacionales era increíble, y formé amistades que durarán toda la vida.',
      tips: [
        'Aprende italiano básico antes de llegar, te ayudará muchísimo',
        'Busca alojamiento en zonas como Trastevere o San Lorenzo',
        'Compra una tarjeta de transporte mensual, ahorrarás mucho',
        'Únete a grupos de Facebook de estudiantes Erasmus en Roma'
      ]
    },
    {
      id: '2',
      name: 'MAX',
      destination: 'CANADÁ',
      country: 'Canadá',
      duration: '1 año',
      program: 'Intercambio',
      rating: 5,
      image: '/lovable-uploads/placeholder-2.jpg',
      shortStory: 'Canadá me enseñó el valor de la diversidad y me dio las mejores aventuras de mi vida.',
      fullStory: 'Mi año en Toronto fue una montaña rusa de emociones y aprendizajes. El sistema educativo canadiense es excepcional, pero lo que más me impactó fue la diversidad cultural. Compartí clases con personas de todos los continentes, y cada conversación era una ventana a un mundo diferente. Los inviernos fueron duros para este español, pero aprendí a amarlos. Esquiar en las Montañas Rocosas y ver las cataratas del Niágara congeladas son recuerdos que nunca olvidaré.',
      tips: [
        'Invierte en un buen abrigo de invierno, es esencial',
        'Aprovecha para viajar por el país, es enorme y diverso',
        'El sistema de salud es gratuito, pero consigue un seguro adicional',
        'Participa en actividades del campus, es la mejor forma de hacer amigos'
      ]
    },
    {
      id: '3',
      name: 'GEOFFREY',
      destination: 'NEW YORK',
      country: 'Estados Unidos',
      duration: '4 meses',
      program: 'Prácticas',
      rating: 4,
      image: '/lovable-uploads/placeholder-3.jpg',
      shortStory: 'Nueva York es intensa, desafiante y absolutamente adictiva. La ciudad que nunca duerme.',
      fullStory: 'Hacer prácticas en Manhattan fue como vivir en una película. El ritmo de vida es frenético, pero eso te empuja a dar lo mejor de ti mismo. Trabajé en una startup tecnológica en Brooklyn y aprendí más en 4 meses que en todo mi último año de carrera. La diversidad de Nueva York es abrumadora en el mejor sentido: puedes desayunar dim sum en Chinatown, almorzar comida italiana en Little Italy y cenar tacos auténticos en Queens, todo en el mismo día.',
      tips: [
        'Busca alojamiento con tiempo, Nueva York es cara',
        'Usa el metro, es la forma más rápida de moverse',
        'Aprovecha los eventos gratuitos, hay muchos',
        'Networking es clave, asiste a eventos profesionales'
      ]
    },
    {
      id: '4',
      name: 'ANTOINE',
      destination: 'JAPÓN',
      country: 'Japón',
      duration: '10 meses',
      program: 'Intercambio',
      rating: 5,
      image: '/lovable-uploads/placeholder-4.jpg',
      shortStory: 'Japón desafió todas mis expectativas y me enseñó una nueva forma de ver el mundo.',
      fullStory: 'Mi experiencia en Kioto fue un choque cultural en el mejor sentido. Estudié en la Universidad de Kioto y me sumergí completamente en la cultura japonesa. Desde participar en ceremonias del té hasta aprender karate, cada día era una nueva aventura. Lo que más me impactó fue la disciplina y el respeto que caracterizan la sociedad japonesa. Aunque el idioma fue un desafío enorme, la paciencia y amabilidad de la gente local hicieron que me sintiera bienvenido desde el primer día.',
      tips: [
        'Estudia hiragana y katakana antes de llegar',
        'Respeta las normas sociales, son muy importantes',
        'Prueba la comida local, hay mucho más que sushi',
        'Viaja por el país con el JR Pass, es económico para estudiantes'
      ]
    },
    {
      id: '5',
      name: 'FLAVIE',
      destination: 'CAMBODIA',
      country: 'Camboya',
      duration: '3 meses',
      program: 'Voluntariado',
      rating: 5,
      image: '/lovable-uploads/placeholder-5.jpg',
      shortStory: 'Camboya me cambió para siempre. Una experiencia de voluntariado que marcó mi vida.',
      fullStory: 'Mi tiempo en Siem Reap haciendo voluntariado fue una de las experiencias más enriquecedoras de mi vida. Trabajé con niños en una escuela local y, aunque fui para enseñar inglés, fueron ellos quienes me enseñaron las lecciones más valiosas sobre resilencia, alegría y gratitud. Los templos de Angkor Wat son impresionantes, pero lo que realmente se lleva tu corazón es la calidez de la gente camboyana. A pesar de su historia difícil, su capacidad de sonreír y acoger a los extranjeros es inspiradora.',
      tips: [
        'Investiga bien la organización de voluntariado antes de ir',
        'Lleva medicinas básicas, no siempre están disponibles',
        'Aprende algunas frases en khmer, lo apreciarán mucho',
        'Prepárate para el calor y la humedad extrema'
      ]
    },
    {
      id: '6',
      name: 'MILENA',
      destination: 'MÉXICO',
      country: 'México',
      duration: '5 meses',
      program: 'Intercambio',
      rating: 5,
      image: '/lovable-uploads/placeholder-6.jpg',
      shortStory: 'México llenó mi corazón de colores, sabores y amistades que durarán para toda la vida.',
      fullStory: 'Mi semestre en Ciudad de México en la UNAM fue una explosión de cultura, historia y vida. La ciudad es enorme y puede parecer caótica al principio, pero tiene una energía única que te atrapa. Estudié antropología y cada fin de semana era una nueva aventura: desde explorar las pirámides de Teotihuacán hasta descubrir mercados locales llenos de colores y sabores increíbles. Los mexicanos son las personas más cálidas y hospitalarias que he conocido. Su concepto de familia se extiende a todos los que los rodean.',
      tips: [
        'No tengas miedo de la comida callejera, es deliciosa y segura',
        'Aprende sobre la historia mexicana, enriquecerá tu experiencia',
        'Viaja por el país, cada región es completamente diferente',
        'Participa en las celebraciones locales, son espectaculares'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            DESCUBRE TESTIMONIOS EXCLUSIVOS DE ESTUDIANTES QUE HAN ESTADO EN TUS ZAPATOS
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Historias reales de estudiantes que vivieron experiencias increíbles en el extranjero. 
            Sus consejos y vivencias te ayudarán a prepararte para tu propia aventura.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonies.map((testimony) => (
            <div
              key={testimony.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedTestimony(testimony)}
            >
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-3xl font-bold mb-2">{testimony.name}</h3>
                    <p className="text-xl">{testimony.destination}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{testimony.country}</span>
                  </div>
                  <div className="flex">
                    {[...Array(testimony.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{testimony.duration} • {testimony.program}</span>
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {testimony.shortStory}
                </p>
                
                <button className="w-full bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                  Leer historia completa
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-black text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Ya tienes tu historia que contar?</h2>
          <p className="text-xl text-gray-300 mb-6">
            Si has vivido una experiencia internacional, compártela con la comunidad de Odisea
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Compartir mi historia
          </button>
        </div>
      </div>

      {/* Testimony Detail Modal */}
      {selectedTestimony && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-black">{selectedTestimony.name}</h2>
                  <p className="text-xl text-gray-600">{selectedTestimony.destination}, {selectedTestimony.country}</p>
                </div>
                <button
                  onClick={() => setSelectedTestimony(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Story Image */}
              <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-8 relative">
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-xl">
                  <div className="text-center text-white">
                    <h3 className="text-4xl font-bold mb-2">{selectedTestimony.name}</h3>
                    <p className="text-2xl">{selectedTestimony.destination}</p>
                  </div>
                </div>
              </div>
              
              {/* Story Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <p className="font-semibold">{selectedTestimony.duration}</p>
                  <p className="text-sm text-gray-600">{selectedTestimony.program}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <p className="font-semibold">{selectedTestimony.destination}</p>
                  <p className="text-sm text-gray-600">{selectedTestimony.country}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="flex justify-center mb-2">
                    {[...Array(selectedTestimony.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="font-semibold">Experiencia</p>
                  <p className="text-sm text-gray-600">Excelente</p>
                </div>
              </div>
              
              {/* Full Story */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Quote className="w-6 h-6 text-gray-400 mr-2" />
                  <h3 className="text-2xl font-bold text-black">Mi Historia</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {selectedTestimony.fullStory}
                </p>
              </div>
              
              {/* Tips */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-black mb-6">Mis Consejos para Ti</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTestimony.tips.map((tip, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                  Contactar con {selectedTestimony.name}
                </button>
                <button className="flex-1 border-2 border-black text-black py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-colors">
                  Ver más sobre {selectedTestimony.destination}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonios;
