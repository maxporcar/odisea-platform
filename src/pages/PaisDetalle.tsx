
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, DollarSign, Globe, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCountryBySlug } from '../hooks/useCountries';
import { useCountrySheetBySlug } from '../hooks/useCountriesSheets';
import MarkdownContent from '../components/MarkdownContent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const PaisDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  
  const { data: country, isLoading: countryLoading, error: countryError } = useCountryBySlug(id || '');
  const { data: countrySheet, isLoading: sheetLoading, error: sheetError } = useCountrySheetBySlug(id || '');

  const isLoading = countryLoading || sheetLoading;
  const error = countryError || sheetError;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-xl text-foreground">{t('countryDetail.loading')}</span>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">{t('countryDetail.notFound.title')}</h2>
          <p className="text-muted-foreground mb-4">{t('countryDetail.notFound.description')}</p>
          <Link 
            to="/paises"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {t('countryDetail.notFound.backButton')}
          </Link>
        </div>
      </div>
    );
  }

  const getCostIcon = (cost: string) => {
    switch (cost) {
      case 'low': return '$';
      case 'medium': return '$$';
      case 'high': return '$$$';
      default: return '$';
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/50 border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link
              to="/paises"
              className="flex items-center text-primary hover:text-primary/80 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('countryDetail.back')}
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <span className="text-6xl">{country.flag || '🌍'}</span>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {country.name}
              </h1>
              <p className="text-xl text-muted-foreground flex items-center">
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
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
                <TabsTrigger value="overview">{t('countryDetail.sections.overview')}</TabsTrigger>
                <TabsTrigger value="culture">{t('countryDetail.sections.culture')}</TabsTrigger>
                <TabsTrigger value="cities">{t('countryDetail.sections.cities')}</TabsTrigger>
                <TabsTrigger value="dos-donts">{t('countryDetail.sections.dosAndDonts')}</TabsTrigger>
                <TabsTrigger value="visa">{t('countryDetail.sections.visa')}</TabsTrigger>
                <TabsTrigger value="activities">{t('countryDetail.sections.activities')}</TabsTrigger>
                <TabsTrigger value="medical">{t('countryDetail.sections.medical')}</TabsTrigger>
                <TabsTrigger value="scholarships">{t('countryDetail.sections.scholarships')}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t('countryDetail.about', { country: country.name })}
                  </h2>
                  <MarkdownContent content={countrySheet?.overview_md || country.description} />
                </div>
              </TabsContent>

              <TabsContent value="culture" className="mt-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t('countryDetail.sections.culture')}
                  </h2>
                  <MarkdownContent content={countrySheet?.culture_md || t('countryDetail.noContent')} />
                </div>
              </TabsContent>

              <TabsContent value="cities" className="mt-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t('countryDetail.sections.cities')}
                  </h2>
                  <MarkdownContent content={countrySheet?.bigCitiesVsSmallTowns_md || t('countryDetail.noContent')} />
                </div>
              </TabsContent>

              <TabsContent value="dos-donts" className="mt-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t('countryDetail.sections.dosAndDonts')}
                  </h2>
                  <MarkdownContent content={countrySheet?.dosAndDonts_md || t('countryDetail.noContent')} />
                </div>
              </TabsContent>

              <TabsContent value="visa" className="mt-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t('countryDetail.sections.visa')}
                  </h2>
                  <MarkdownContent content={countrySheet?.visaInformation_md || country.visa_info || t('countryDetail.noContent')} />
                </div>
              </TabsContent>

              <TabsContent value="activities" className="mt-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t('countryDetail.sections.activities')}
                  </h2>
                  <MarkdownContent content={countrySheet?.lifeActivitiesTravel_md || t('countryDetail.noContent')} />
                </div>
              </TabsContent>

              <TabsContent value="medical" className="mt-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t('countryDetail.sections.medical')}
                  </h2>
                  <MarkdownContent content={countrySheet?.medical_md || t('countryDetail.noContent')} />
                </div>
              </TabsContent>

              <TabsContent value="scholarships" className="mt-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {t('countryDetail.sections.scholarships')}
                  </h2>
                  <MarkdownContent content={countrySheet?.studentBenefitsScholarships_md || t('countryDetail.noContent')} />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {t('countryDetail.quickFacts')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">{t('countryDetail.continent')}</span>
                  </div>
                  <span className="font-semibold text-foreground">{country.continent}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">{t('countryDetail.population')}</span>
                  </div>
                  <span className="font-semibold text-foreground">{country.population}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">{t('countryDetail.currency')}</span>
                  </div>
                  <span className="font-semibold text-foreground">{country.currency}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">{t('countryDetail.language')}</span>
                  </div>
                  <span className="font-semibold text-foreground">{country.language}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">{t('countryDetail.costOfLiving')}</span>
                  </div>
                  <span className={`font-bold text-2xl ${getCostColor(country.cost_of_living)}`}>
                    {getCostIcon(country.cost_of_living)}
                  </span>
                </div>

                {country.student_population && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-muted-foreground mr-2" />
                      <span className="text-muted-foreground">{t('countryDetail.students')}</span>
                    </div>
                    <span className="font-semibold text-foreground">{country.student_population}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {t('countryDetail.actions')}
              </h3>
              <div className="space-y-3">
                <Link
                  to={`/paises/${country.slug || country.id}/ciudades`}
                  className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center block"
                >
                  {t('countryDetail.viewCities')}
                </Link>
                <Link
                  to="/testimonios"
                  className="w-full bg-secondary text-secondary-foreground py-3 px-4 rounded-lg font-semibold hover:bg-secondary/90 transition-colors text-center block"
                >
                  {t('countryDetail.viewTestimonials')}
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
