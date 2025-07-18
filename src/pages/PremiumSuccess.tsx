
import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Crown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';

const PremiumSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Refresh user subscription status
    const refreshSubscription = async () => {
      try {
        await supabase.functions.invoke('check-subscription');
      } catch (error) {
        console.error('Error refreshing subscription:', error);
      }
    };

    if (sessionId) {
      refreshSubscription();
    }
  }, [sessionId]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full rounded-2xl shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-2xl">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-white/20 p-3">
                <CheckCircle className="w-12 h-12" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome to Odisea+!</CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Crown className="w-6 h-6 text-warm-amber" />
              <span className="text-lg font-semibold text-gray-800">Premium Activated</span>
            </div>
            
            <p className="text-gray-600 mb-6">
              Your subscription has been successfully activated. You now have access to all premium features including:
            </p>
            
            <ul className="text-left space-y-2 mb-8 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Priority mentoring support
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Exclusive housing recommendations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Advanced destination guides
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Community access and networking
              </li>
            </ul>
            
            <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/80 rounded-xl">
              <Link to="/" className="flex items-center justify-center gap-2">
                Explore Odisea+ Features
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PremiumSuccess;
