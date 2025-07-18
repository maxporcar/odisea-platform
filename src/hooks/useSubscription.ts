
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier?: string;
  subscription_type?: string;
  subscription_end?: string;
  institution?: {
    name: string;
    domain: string;
  };
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const refreshSubscription = async () => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) throw error;
      
      setSubscription({
        subscribed: data.profile?.is_premium || false,
        subscription_tier: data.subscription?.subscription_tier,
        subscription_type: data.subscription?.subscription_type,
        subscription_end: data.subscription?.subscription_end,
        institution: data.profile?.institution,
      });
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setSubscription({ subscribed: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSubscription();
  }, [user]);

  return {
    subscription,
    loading,
    refreshSubscription,
  };
};
