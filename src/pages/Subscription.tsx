
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import SubscriptionCard from '@/components/subscription/SubscriptionCard';
import InstitutionSubscriptionModal from '@/components/subscription/InstitutionSubscriptionModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, RefreshCw } from 'lucide-react';

const Subscription = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [checkingSubscription, setCheckingSubscription] = useState(false);
  const [showInstitutionModal, setShowInstitutionModal] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    subscribed: boolean;
    subscription_tier?: string;
    subscription_type?: string;
    subscription_end?: string;
  }>({ subscribed: false });

  const individualFeatures = [
    t('subscription.features.exclusiveContent'),
    t('subscription.features.prioritySupport'),
    t('subscription.features.advancedTools'),
    t('subscription.features.monthlyUpdates'),
    t('subscription.features.communityAccess')
  ];

  const institutionFeatures = [
    t('subscription.features.unlimitedUsers'),
    t('subscription.features.bulkManagement'),
    t('subscription.features.institutionDashboard'),
    t('subscription.features.prioritySupport'),
    t('subscription.features.customBranding'),
    t('subscription.features.advancedAnalytics')
  ];

  const checkSubscription = async () => {
    if (!user) return;
    
    setCheckingSubscription(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) throw error;
      
      setSubscriptionStatus(data);
    } catch (error: any) {
      console.error('Error checking subscription:', error);
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: error.message || t('subscription.checkError')
      });
    } finally {
      setCheckingSubscription(false);
    }
  };

  useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user]);

  const handleIndividualSubscribe = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: t('auth.errors.notAuthenticated'),
        description: t('auth.errors.loginRequired')
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-individual-checkout');
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      console.error('Error creating individual checkout:', error);
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: error.message || t('subscription.checkoutError')
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInstitutionSubscribe = async (institutionName: string, institutionDomain: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: t('auth.errors.notAuthenticated'),
        description: t('auth.errors.loginRequired')
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-institution-checkout', {
        body: { institutionName, institutionDomain }
      });
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
        setShowInstitutionModal(false);
      }
    } catch (error: any) {
      console.error('Error creating institution checkout:', error);
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: error.message || t('subscription.checkoutError')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Crown className="w-8 h-8 text-[#FFA500]" />
              <h1 className="text-4xl font-bold text-black">Odisea+</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subscription.mainDescription')}
            </p>
          </div>

          {/* Current Subscription Status */}
          {user && (
            <div className="mb-8">
              <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <span>{t('subscription.currentStatus')}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={checkSubscription}
                      disabled={checkingSubscription}
                    >
                      <RefreshCw className={`w-4 h-4 ${checkingSubscription ? 'animate-spin' : ''}`} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  {subscriptionStatus.subscribed ? (
                    <div className="space-y-2">
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <Crown className="w-3 h-3 mr-1" />
                        {subscriptionStatus.subscription_tier}
                      </Badge>
                      <CardDescription>
                        {t('subscription.activeUntil')}: {' '}
                        {new Date(subscriptionStatus.subscription_end || '').toLocaleDateString()}
                      </CardDescription>
                    </div>
                  ) : (
                    <div>
                      <Badge variant="secondary">
                        {t('subscription.free')}
                      </Badge>
                      <CardDescription className="mt-2">
                        {t('subscription.upgradePrompt')}
                      </CardDescription>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Subscription Plans */}
          {!subscriptionStatus.subscribed && (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <SubscriptionCard
                type="individual"
                price="€9.99"
                period={t('subscription.perMonth')}
                features={individualFeatures}
                onSubscribe={handleIndividualSubscribe}
                loading={loading}
                popular={true}
              />
              
              <SubscriptionCard
                type="institution"
                price="€49.99"
                period={t('subscription.perMonth')}
                features={institutionFeatures}
                onSubscribe={() => setShowInstitutionModal(true)}
                loading={loading}
              />
            </div>
          )}

          {/* Features Comparison */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">
              {t('subscription.whyUpgrade')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#007A5E]/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Crown className="w-8 h-8 text-[#007A5E]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('subscription.benefit1.title')}</h3>
                <p className="text-gray-600">{t('subscription.benefit1.description')}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFA500]/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Crown className="w-8 h-8 text-[#FFA500]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('subscription.benefit2.title')}</h3>
                <p className="text-gray-600">{t('subscription.benefit2.description')}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#007A5E]/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Crown className="w-8 h-8 text-[#007A5E]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('subscription.benefit3.title')}</h3>
                <p className="text-gray-600">{t('subscription.benefit3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InstitutionSubscriptionModal
        open={showInstitutionModal}
        onClose={() => setShowInstitutionModal(false)}
        onSubscribe={handleInstitutionSubscribe}
        loading={loading}
      />
    </Layout>
  );
};

export default Subscription;
