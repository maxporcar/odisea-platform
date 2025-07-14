
import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Crown, ArrowRight } from 'lucide-react';

const Success = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (user && sessionId) {
      // Refresh subscription status after successful payment
      const refreshSubscription = async () => {
        try {
          await supabase.functions.invoke('check-subscription');
          toast({
            title: t('subscription.success.title'),
            description: t('subscription.success.description')
          });
        } catch (error) {
          console.error('Error refreshing subscription:', error);
        }
      };

      // Wait a bit for Stripe webhook to process
      setTimeout(refreshSubscription, 3000);
    }
  }, [user, sessionId]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-green-800">
                {t('subscription.success.title', 'Payment Successful!')}
              </CardTitle>
              <CardDescription>
                {t('subscription.success.description', 'Your subscription has been activated successfully.')}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-[#007A5E]/5 border border-[#007A5E]/20 rounded-2xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Crown className="w-5 h-5 text-[#FFA500]" />
                  <span className="font-semibold text-[#007A5E]">Odisea+ Active</span>
                </div>
                <p className="text-sm text-gray-600">
                  {t('subscription.success.accessMessage', 'You now have access to all premium features.')}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">
                  {t('subscription.success.nextSteps', 'What\'s next?')}
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{t('subscription.success.step1', 'Explore exclusive content and resources')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{t('subscription.success.step2', 'Access priority support')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{t('subscription.success.step3', 'Join our premium community')}</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col space-y-3">
                <Button asChild className="bg-[#007A5E] hover:bg-[#005A45] text-white">
                  <Link to="/">
                    {t('subscription.success.backHome', 'Back to Home')}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/subscription">
                    {t('subscription.success.manageSubscription', 'Manage Subscription')}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
