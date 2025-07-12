
import React, { useState } from 'react';
import { Star, MapPin, Calendar, Quote, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useCountries } from '@/hooks/useCountries';
import { useTranslation } from 'react-i18next';
import type { Database } from '@/integrations/supabase/types';

type Testimonial = Database['public']['Tables']['testimonials']['Row'];

const Testimonios = () => {
  const { t } = useTranslation();
  const [selectedTestimony, setSelectedTestimony] = useState<Testimonial | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const { data: countries = [] } = useCountries();
  const { data: testimonials = [], isLoading, error } = useTestimonials(
    selectedCountry !== 'all' ? selectedCountry : undefined
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('testimonials.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500">{t('testimonials.error')}: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            {t('testimonials.hero.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {t('testimonials.hero.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium">{t('testimonials.filters.byCountry')}:</span>
            </div>
            
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder={t('testimonials.filters.selectCountry')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('testimonials.filters.allCountries')}</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country.id} value={country.id}>
                    {country.flag} {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimony) => (
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
                    <span>{testimony.destination}</span>
                  </div>
                  <div className="flex">
                    {[...Array(testimony.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{testimony.duration} • {testimony.program}</span>
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {testimony.short_story}
                </p>
                
                <button className="w-full bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                  {t('testimonials.readFullStory')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-black text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('testimonials.cta.title')}</h2>
          <p className="text-xl text-gray-300 mb-6">
            {t('testimonials.cta.subtitle')}
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            {t('testimonials.cta.button')}
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
                  <p className="text-xl text-gray-600">{selectedTestimony.destination}</p>
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
                  <p className="text-sm text-gray-600">{t('testimonials.destination')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="flex justify-center mb-2">
                    {[...Array(selectedTestimony.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="font-semibold">{t('testimonials.experience')}</p>
                  <p className="text-sm text-gray-600">{t('testimonials.excellent')}</p>
                </div>
              </div>
              
              {/* Full Story */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Quote className="w-6 h-6 text-gray-400 mr-2" />
                  <h3 className="text-2xl font-bold text-black">{t('testimonials.myStory')}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {selectedTestimony.full_story}
                </p>
              </div>
              
              {/* Tips */}
              {selectedTestimony.tips && selectedTestimony.tips.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-black mb-6">{t('testimonials.myTips')}</h3>
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
              )}
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                  {t('testimonials.contactWith')} {selectedTestimony.name}
                </button>
                <button className="flex-1 border-2 border-black text-black py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-colors">
                  {t('testimonials.seeMoreAbout')} {selectedTestimony.destination}
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
