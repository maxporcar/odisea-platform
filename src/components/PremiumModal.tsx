
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, X, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  const { t } = useTranslation();

  const premiumFeatures = [
    { key: 'checklist', icon: '📋' },
    { key: 'mentoring', icon: '👥' },
    { key: 'housing', icon: '🏠' },
    { key: 'community', icon: '💬' },
    { key: 'support', icon: '🆘' },
    { key: 'guides', icon: '📖' },
    { key: 'notes', icon: '📝' },
    { key: 'favorites', icon: '❤️' }
  ];

  const comparisonFeatures = [
    { key: 'basicInfo', free: true, premium: true },
    { key: 'testimonials', free: true, premium: true },
    { key: 'community', free: true, premium: true },
    { key: 'premiumFeatures', free: false, premium: true },
    { key: 'personalizedSupport', free: false, premium: true },
    { key: 'advancedTools', free: false, premium: true }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Crown className="w-6 h-6 text-yellow-500" />
            {t('premium.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Section */}
          <div className="text-center bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{t('premium.subtitle')}</h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-3xl font-bold text-orange-600">{t('premium.price')}</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {t('premium.lifetime')}
              </Badge>
            </div>
            <p className="text-gray-600">{t('premium.benefits')}</p>
          </div>

          {/* Features Grid */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('premium.features.title')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {premiumFeatures.map((feature) => (
                <div key={feature.key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-sm">{t(`premium.features.${feature.key}`)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('premium.freeVs.title')}</h4>
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-3 gap-0">
                  {/* Header */}
                  <div className="p-4 bg-gray-50 border-b border-r font-semibold">
                    Funcionalidad
                  </div>
                  <div className="p-4 bg-gray-50 border-b border-r text-center font-semibold">
                    {t('premium.freeVs.free')}
                  </div>
                  <div className="p-4 bg-gradient-to-r from-orange-100 to-amber-100 border-b text-center font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      <Crown className="w-4 h-4 text-yellow-600" />
                      {t('premium.freeVs.premium')}
                    </div>
                  </div>

                  {/* Comparison Rows */}
                  {comparisonFeatures.map((feature, index) => (
                    <React.Fragment key={feature.key}>
                      <div className={`p-4 border-b ${index < comparisonFeatures.length - 1 ? 'border-r' : ''}`}>
                        {t(`premium.freeVs.${feature.key}`)}
                      </div>
                      <div className={`p-4 border-b text-center ${index < comparisonFeatures.length - 1 ? 'border-r' : ''}`}>
                        {feature.free ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        )}
                      </div>
                      <div className="p-4 border-b text-center bg-gradient-to-r from-orange-50 to-amber-50">
                        {feature.premium ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        )}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              onClick={onUpgrade}
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3"
            >
              <Crown className="w-5 h-5 mr-2" />
              {t('premium.upgrade')}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="px-6"
            >
              {t('common.cancel')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
