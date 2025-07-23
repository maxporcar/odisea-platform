
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Crown, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const handleSubscribe = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to subscribe to Odisea+",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { subscriptionType: type }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        variant: "destructive",
        title: "Subscription error",
        description: "Failed to create checkout session. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const buttonText = type === 'individual' ? 'Odisea+' : 'Odisea+ Institution';

  return (
    <Button
      onClick={handleSubscribe}
      disabled={loading}
      size="sm"
      className={`bg-gradient-to-r from-warm-orange to-warm-amber text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : (
        <Crown className="w-4 h-4 mr-2" />
      )}
      {loading ? 'Processing...' : buttonText}
    </Button>
  );
};

export default SubscribeButton;
