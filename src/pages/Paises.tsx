
import React from 'react';
import { useTranslation } from 'react-i18next';

const Paises = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {t('countries.title', 'Countries')}
        </h1>
        <p className="text-muted-foreground">
          {t('countries.description', 'Explore study abroad destinations around the world.')}
        </p>
      </div>
    </div>
  );
};

export default Paises;
