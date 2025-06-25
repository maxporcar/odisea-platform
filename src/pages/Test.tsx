
import React, { useState } from 'react';
import { ChevronRight, Globe } from 'lucide-react';

interface FormData {
  budget: string;
  climate: string;
  language: string;
  duration: string;
  culture: string;
  activities: string[];
}

const Test = () => {
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">TEST DE ORIENTACIÓN</h1>
          <p className="text-xl text-gray-600 mb-8">
            ¿Te sientes perdido con tu movilidad? ¿Demasiados países? ¿Indecisión? ¿No sabes a dónde ir?
          </p>
          <p className="text-lg text-gray-700">
            Tranquilo, hemos creado este test para orientarte y ¡encontrar la respuesta! 😉
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Pregunta {currentStep + 1} de {questions.length}</span>
            <span>{Math.round(progress)}% completado</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-black h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-black mb-8">{currentQuestion.title}</h2>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <label
                key={option.value}
                className={`block p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                  formData[currentQuestion.field as keyof FormData] === option.value
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={currentQuestion.field}
                  value={option.value}
                  checked={formData[currentQuestion.field as keyof FormData] === option.value}
                  onChange={(e) => handleOptionSelect(currentQuestion.field, e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-lg text-black">{option.label}</div>
                    <div className="text-gray-600 mt-1">{option.description}</div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    formData[currentQuestion.field as keyof FormData] === option.value
                      ? 'border-black bg-black'
                      : 'border-gray-300'
                  }`}>
                    {formData[currentQuestion.field as keyof FormData] === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-full font-semibold transition-colors ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            Anterior
          </button>
          
          <button
            onClick={nextStep}
            disabled={!formData[currentQuestion.field as keyof FormData]}
            className={`px-8 py-3 rounded-full font-semibold transition-colors flex items-center space-x-2 ${
              !formData[currentQuestion.field as keyof FormData]
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            <span>{currentStep === questions.length - 1 ? 'Ver Resultados' : 'Siguiente'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;
