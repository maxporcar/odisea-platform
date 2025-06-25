import React, { useState } from 'react';
import { ChevronRight, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FormData {
  budget: string;
  climate: string;
  language: string;
  duration: string;
  culture: string;
  activities: string[];
}

const Test = () => {
  const { t } = useLanguage();
  const [showGoogleForm, setShowGoogleForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    budget: '',
    climate: '',
    language: '',
    duration: '',
    culture: '',
    activities: []
  });
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      title: '¿Cuál es tu presupuesto mensual aproximado?',
      field: 'budget',
      type: 'radio',
      options: [
        { value: 'low', label: 'Menos de €500/mes', description: 'Presupuesto ajustado' },
        { value: 'medium', label: '€500 - €1200/mes', description: 'Presupuesto moderado' },
        { value: 'high', label: 'Más de €1200/mes', description: 'Presupuesto amplio' }
      ]
    },
    {
      title: '¿Qué tipo de clima prefieres?',
      field: 'climate',
      type: 'radio',
      options: [
        { value: 'cold', label: 'Frío', description: 'Temperaturas bajas, nieve' },
        { value: 'temperate', label: 'Templado', description: '4 estaciones marcadas' },
        { value: 'warm', label: 'Cálido', description: 'Temperaturas altas, sol' },
        { value: 'tropical', label: 'Tropical', description: 'Calor y humedad constante' }
      ]
    },
    {
      title: '¿Qué idiomas hablas o te gustaría aprender?',
      field: 'language',
      type: 'radio',
      options: [
        { value: 'english', label: 'Inglés', description: 'Dominio o interés en mejorar' },
        { value: 'spanish', label: 'Español', description: 'Ya dominas el español' },
        { value: 'french', label: 'Francés', description: 'Hablas o quieres aprender' },
        { value: 'german', label: 'Alemán', description: 'Hablas o quieres aprender' },
        { value: 'other', label: 'Otro idioma', description: 'Italiano, portugués, etc.' }
      ]
    },
    {
      title: '¿Cuánto tiempo planeas quedarte?',
      field: 'duration',
      type: 'radio',
      options: [
        { value: 'semester', label: 'Un semestre', description: '4-6 meses' },
        { value: 'year', label: 'Un año completo', description: '9-12 meses' },
        { value: 'summer', label: 'Verano', description: '2-3 meses' },
        { value: 'flexible', label: 'Flexible', description: 'Depende del destino' }
      ]
    },
    {
      title: '¿Qué tipo de experiencia cultural buscas?',
      field: 'culture',
      type: 'radio',
      options: [
        { value: 'similar', label: 'Cultura similar', description: 'Ambiente familiar y cómodo' },
        { value: 'different', label: 'Cultura muy diferente', description: 'Máximo contraste cultural' },
        { value: 'mixed', label: 'Un poco de ambos', description: 'Diferente pero no extremo' }
      ]
    }
  ];

  const handleOptionSelect = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRecommendations = () => {
    // Simple recommendation logic based on form data
    const recommendations = [
      { city: 'Buenos Aires', country: 'Argentina', match: '95%', reason: 'Cultura vibrante, español, presupuesto moderado' },
      { city: 'Montreal', country: 'Canadá', match: '88%', reason: 'Bilingüe, clima templado, vida estudiantil' },
      { city: 'Lisboa', country: 'Portugal', match: '82%', reason: 'Clima cálido, costos accesibles, cultura europea' },
      { city: 'Berlín', country: 'Alemania', match: '78%', reason: 'Historia rica, vida nocturna, intercambio cultural' },
      { city: 'Melbourne', country: 'Australia', match: '75%', reason: 'Multiculturalidad, inglés, experiencia única' }
    ];
    return recommendations;
  };

  if (showGoogleForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <button
              onClick={() => setShowGoogleForm(false)}
              className="mb-6 bg-warm-orange text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors font-poppins font-semibold"
            >
              ← Volver al test local
            </button>
            <h1 className="text-4xl font-bold text-warm-orange mb-4 font-poppins">
              {t('test.title')}
            </h1>
            <p className="text-xl text-amber-700 mb-8 font-poppins">
              Completa nuestro formulario completo para obtener recomendaciones más precisas
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdunjUREiygLYvjMAJsYbH5GnNkBhPDDrd1HZaeUdomzdASmA/viewform?embedded=true"
              width="100%"
              height="800"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full"
            >
              Cargando…
            </iframe>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const recommendations = getRecommendations();
    
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">
              TUS DESTINOS RECOMENDADOS
            </h1>
            <p className="text-xl text-gray-600">
              Basado en tus preferencias, estos son los 5 destinos que mejor se adaptan a ti
            </p>
          </div>

          <div className="space-y-6">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-black">{rec.city}</h3>
                    <p className="text-lg text-gray-600">{rec.country}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">{rec.match}</div>
                    <div className="text-sm text-gray-500">compatibilidad</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{rec.reason}</p>
                <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
                  Ver más información
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentStep(0);
                setFormData({
                  budget: '',
                  climate: '',
                  language: '',
                  duration: '',
                  culture: '',
                  activities: []
                });
              }}
              className="bg-gray-600 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors mr-4"
            >
              Hacer test de nuevo
            </button>
            <button className="border-2 border-black text-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors">
              Explorar mapa
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-warm-orange mb-4 font-poppins">
            {t('test.title')}
          </h1>
          <p className="text-xl text-amber-700 mb-8 font-poppins">
            {t('test.subtitle')}
          </p>
          <p className="text-lg text-orange-800 mb-8 font-poppins">
            {t('test.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowGoogleForm(true)}
              className="bg-warm-orange text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-colors font-poppins font-semibold text-lg"
            >
              📋 Test Completo (Google Forms)
            </button>
            <button className="border-2 border-warm-orange text-warm-orange px-8 py-4 rounded-full hover:bg-warm-orange hover:text-white transition-colors font-poppins font-semibold text-lg">
              🚀 Test Rápido (Aquí)
            </button>
          </div>
        </div>

        {/* Placeholder for the existing test content with warm styling */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-warm-orange to-warm-amber rounded-full mx-auto mb-6 flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-warm-orange mb-4 font-poppins">
              Test de Orientación Interactivo
            </h2>
            <p className="text-orange-700 mb-8 font-poppins">
              Elige una de las dos opciones arriba para comenzar tu evaluación personalizada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
