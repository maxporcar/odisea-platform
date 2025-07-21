
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, DollarSign, Globe, Calendar, Home, Car, FileText, Star, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCountry } from '../hooks/useCountries';

const PaisDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  
  const { data: country, isLoading, error } = useCountry(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-8 h-8 animate-spin text-warm-orange" />
          <span className="text-xl text-warm-orange font-poppins">{t('countryDetail.loading')}</span>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('countryDetail.notFound.title')}</h2>
          <p className="text-gray-600 mb-4">{t('countryDetail.notFound.description')}</p>
          <Link 
            to="/paises"
            className="bg-warm-orange text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors"
          >
            {t('countryDetail.notFound.backButton')}
          </Link>
        </div>
      </div>
    );
  }

  const getCostIcon = (cost: string) => {
    return t(`countries.cost.${cost}` as any) || t('countries.cost.low');
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
          <div className="flex items-center mb-6">
            <Link
              to="/paises"
              className="flex items-center text-warm-orange hover:text-orange-600 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('countryDetail.back')}
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <span className="text-6xl">{country.flag || '🌍'}</span>
            <div>
              <h1 className="text-4xl font-bold text-warm-orange mb-2 font-poppins">
                {country.name}
              </h1>
              <p className="text-xl text-amber-700 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {country.capital}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                {t('countryDetail.about', { country: country.name })}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {country.description}
              </p>
            </div>

            {/* Capital Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                {country.capital}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {country.capital_description}
              </p>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {country.visa_info && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center mb-3">
                    <FileText className="w-6 h-6 text-warm-orange mr-2" />
                    <h3 className="text-xl font-bold text-gray-900 font-poppins">{t('countryDetail.sections.visa')}</h3>
                  </div>
                  <p className="text-gray-700">{country.visa_info}</p>
                </div>
              )}

              {country.housing && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center mb-3">
                    <Home className="w-6 h-6 text-warm-orange mr-2" />
                    <h3 className="text-xl font-bold text-gray-900 font-poppins">{t('countryDetail.sections.housing')}</h3>
                  </div>
                  <p className="text-gray-700">{country.housing}</p>
                </div>
              )}

              {country.transportation && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center mb-3">
                    <Car className="w-6 h-6 text-warm-orange mr-2" />
                    <h3 className="text-xl font-bold text-gray-900 font-poppins">{t('countryDetail.sections.transportation')}</h3>
                  </div>
                  <p className="text-gray-700">{country.transportation}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-poppins">
                {t('countryDetail.quickFacts')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">{t('countryDetail.continent')}</span>
                  </div>
                  <span className="font-semibold">{country.continent}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">{t('countryDetail.population')}</span>
                  </div>
                  <span className="font-semibold">{country.population}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">{t('countryDetail.currency')}</span>
                  </div>
                  <span className="font-semibold">{country.currency}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">{t('countryDetail.language')}</span>
                  </div>
                  <span className="font-semibold">{country.language}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">{t('countryDetail.costOfLiving')}</span>
                  </div>
                  <span className={`font-bold text-2xl ${getCostColor(country.cost_of_living)}`}>
                    {getCostIcon(country.cost_of_living)}
                  </span>
                </div>

                {country.student_population && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-gray-600">{t('countryDetail.students')}</span>
                    </div>
                    <span className="font-semibold">{country.student_population}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-poppins">
                {t('countryDetail.actions')}
              </h3>
              <div className="space-y-3">
                <Link
                  to="/testimonios"
                  className="w-full bg-warm-orange text-white py-3 px-4 rounded-full font-semibold hover:bg-orange-600 transition-colors text-center block font-poppins"
                >
                  {t('countryDetail.viewTestimonials')}
                </Link>
                <Link
                  to="/comunidad"
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-full font-semibold hover:bg-gray-200 transition-colors text-center block font-poppins"
                >
                  {t('countryDetail.joinCommunity')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaisDetalle;
