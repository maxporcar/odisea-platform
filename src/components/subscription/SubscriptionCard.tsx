
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SubscriptionCardProps {
  type: 'individual' | 'institution';
  price: string;
  period: string;
  features: string[];
  onSubscribe: () => void;
  loading?: boolean;
  popular?: boolean;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  type,
  price,
  period,
  features,
  onSubscribe,
  loading = false,
  popular = false
}) => {
  const { t } = useTranslation();

  return (
    <Card className={`relative h-full flex flex-col ${popular ? 'border-[#007A5E] shadow-lg' : ''}`}>
      {popular && (
        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#FFA500] text-white">
          <Star className="w-3 h-3 mr-1" />
          {t('subscription.popular')}
        </Badge>
      )}
      
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          {type === 'individual' ? (
            <div className="w-12 h-12 rounded-full bg-[#007A5E]/10 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#007A5E]" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#FFA500]/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-[#FFA500]" />
            </div>
          )}
        </div>
        
        <CardTitle className="text-xl font-bold">
          {type === 'individual' ? 'Odisea+ Individual' : 'Odisea+ Institution'}
        </CardTitle>
        
        <CardDescription>
          {type === 'individual' 
            ? t('subscription.individual.description')
            : t('subscription.institution.description')
          }
        </CardDescription>
        
        <div className="mt-4">
          <div className="text-3xl font-bold text-[#007A5E]">{price}</div>
          <div className="text-sm text-gray-500">{period}</div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={onSubscribe}
          disabled={loading}
          className={`w-full font-semibold rounded-2xl ${
            type === 'individual' 
              ? 'bg-[#007A5E] hover:bg-[#005A45] text-white' 
              : 'bg-[#FFA500] hover:bg-[#E6940D] text-white'
          }`}
        >
          {loading ? t('common.loading') : t('subscription.subscribe')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
