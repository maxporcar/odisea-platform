import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, DollarSign, Globe, Calendar, Home, Car, FileText, Star, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCountry } from '@/hooks/useCountries';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import CountryMap from './CountryMap';

const CountryDetailTemplate: React.FC = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const { t } = useTranslation();
  
  const { data: country, isLoading, error } = useCountry(countryId || '');

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
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200 py-4 sm:py-6">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:w-64 lg:sticky lg:top-6 lg:self-start">
            <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
              <h4 className="font-poppins text-md font-semibold text-gray-700 mb-3">
                {t('countryDetail.navigation', 'Student Guide')}
              </h4>
              <nav className="space-y-2">
                <a href="#about" className="block text-gray-600 hover:text-warm-orange transition-colors">
                  {t('countryDetail.about', { country: country.name })}
                </a>
                <a href="#capital" className="block text-gray-600 hover:text-warm-orange transition-colors">
                  {country.capital}
                </a>
                {country.visa_info && (
                  <a href="#visa" className="block text-gray-600 hover:text-warm-orange transition-colors">
                    {t('countryDetail.sections.visa')}
                  </a>
                )}
                {country.housing && (
                  <a href="#housing" className="block text-gray-600 hover:text-warm-orange transition-colors">
                    {t('countryDetail.sections.housing')}
                  </a>
                )}
                {country.transportation && (
                  <a href="#transportation" className="block text-gray-600 hover:text-warm-orange transition-colors">
                    {t('countryDetail.sections.transportation')}
                  </a>
                )}
                <a href="#testimonials" className="block text-gray-600 hover:text-warm-orange transition-colors">
                  {t('countryDetail.viewTestimonials')}
                </a>
                <a href="#community" className="block text-gray-600 hover:text-warm-orange transition-colors">
                  {t('countryDetail.joinCommunity')}
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Student Guide Header */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                {t('countryDetail.studentGuide', { country: country.name })}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('countryDetail.studentGuideDescription', { country: country.name })}
              </p>
            </div>

            {/* Study Destinations Map */}
            <CountryMap />

            {/* All existing sections */}
            <section id="about" className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                {t('countryDetail.about', { country: country.name })}
              </h2>
              <ReactMarkdown rehypePlugins={[rehypeRaw]} className="text-gray-700 leading-relaxed">
                {country.description}
              </ReactMarkdown>
            </section>

            <section id="capital" className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                {country.capital}
              </h2>
              <ReactMarkdown rehypePlugins={[rehypeRaw]} className="text-gray-700 leading-relaxed">
                {country.capital_description}
              </ReactMarkdown>
            </section>

            {country.visa_info && (
              <section id="visa" className="bg-white rounded-2xl border border-border shadow-sm p-6">
                <div className="flex items-center mb-3">
                  <FileText className="w-6 h-6 text-warm-orange mr-2" />
                  <h3 className="text-xl font-bold text-gray-900 font-poppins">{t('countryDetail.sections.visa')}</h3>
                </div>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} className="text-gray-700">
                  {country.visa_info}
                </ReactMarkdown>
              </section>
            )}

            {country.housing && (
              <section id="housing" className="bg-white rounded-2xl border border-border shadow-sm p-6">
                <div className="flex items-center mb-3">
                  <Home className="w-6 h-6 text-warm-orange mr-2" />
                  <h3 className="text-xl font-bold text-gray-900 font-poppins">{t('countryDetail.sections.housing')}</h3>
                </div>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} className="text-gray-700">
                  {country.housing}
                </ReactMarkdown>
              </section>
            )}

            {country.transportation && (
              <section id="transportation" className="bg-white rounded-2xl border border-border shadow-sm p-6">
                <div className="flex items-center mb-3">
                  <Car className="w-6 h-6 text-warm-orange mr-2" />
                  <h3 className="text-xl font-bold text-gray-900 font-poppins">{t('countryDetail.sections.transportation')}</h3>
                </div>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} className="text-gray-700">
                  {country.transportation}
                </ReactMarkdown>
              </section>
            )}

            <section id="testimonials" className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                {t('countryDetail.viewTestimonials')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('countryDetail.testimonialsDescription')}
              </p>
              <Link
                to="/testimonios"
                className="bg-warm-orange text-white py-3 px-4 rounded-full font-semibold hover:bg-orange-600 transition-colors text-center block font-poppins mt-4"
              >
                {t('countryDetail.viewTestimonials')}
              </Link>
            </section>

            <section id="community" className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                {t('countryDetail.joinCommunity')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('countryDetail.communityDescription')}
              </p>
              <Link
                to="/comunidad"
                className="bg-gray-100 text-gray-700 py-3 px-4 rounded-full font-semibold hover:bg-gray-200 transition-colors text-center block font-poppins mt-4"
              >
                {t('countryDetail.joinCommunity')}
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailTemplate;
