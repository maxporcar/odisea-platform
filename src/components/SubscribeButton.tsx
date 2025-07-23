
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Crown, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

interface SubscribeButtonProps {
  type?: 'individual' | 'institution';
  className?: string;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ 
  type = 'individual',
  className = '' 
}) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubscribe = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to get Odisea+",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          subscriptionType: type,
          amount: 2000, // 20€ in cents
          isOneTime: true
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        variant: "destructive",
        title: "Payment error",
        description: "Failed to create checkout session. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={loading}
      className={`bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${className}`}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
      ) : (
        <Crown className="w-5 h-5 mr-2" />
      )}
      {loading ? 'Processing...' : `${t('premium.upgrade')} - 20€`}
    </Button>
  );
};

export default SubscribeButton;
