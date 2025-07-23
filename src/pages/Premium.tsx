
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, Star, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Premium() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to subscribe to premium features.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId: 'price_1QXJcAP8Q8Q8Q8Q8Q8Q8Q8Q8', // Replace with actual Stripe price ID
          successUrl: `${window.location.origin}/premium/success`,
          cancelUrl: `${window.location.origin}/premium/cancel`,
        },
      });

      if (error) throw error;

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upgrade to Odisea+
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get exclusive access to premium features and personalized guidance
          </p>
          
          {/* Limited Time Offer Badge */}
          <div className="flex justify-center mb-8">
            <Badge variant="destructive" className="px-4 py-2 text-sm font-semibold">
              <Clock className="w-4 h-4 mr-2" />
              Limited Time Offer - 63% OFF!
            </Badge>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <Card className="relative">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Free Plan</CardTitle>
                <CardDescription>Basic features for exploration</CardDescription>
                <div className="text-3xl font-bold text-gray-900 mt-4">
                  €0<span className="text-lg text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Browse countries and cities</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>View university information</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Read testimonials</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Basic trip planning</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative border-2 border-blue-500 shadow-lg">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 px-4 py-1">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-blue-600">Odisea+</CardTitle>
                <CardDescription>Premium features for serious students</CardDescription>
                <div className="mt-4">
                  <div className="text-lg text-gray-500 line-through">€54/month</div>
                  <div className="text-4xl font-bold text-blue-600">
                    €19.99<span className="text-lg text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-green-600 font-semibold mt-2">
                    Save €34 every month!
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Everything in Free Plan</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="font-semibold">Interactive Travel Checklist</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Personalized recommendations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Advanced trip planning tools</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Exclusive content and guides</span>
                  </li>
                </ul>
                <Button 
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Upgrade Now
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Comparison */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Why Choose Odisea+?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Interactive Checklist</h3>
                <p className="text-gray-600">
                  Never miss important steps with our comprehensive travel and packing checklist
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Personalized Experience</h3>
                <p className="text-gray-600">
                  Get recommendations tailored to your specific destination and preferences
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Premium Support</h3>
                <p className="text-gray-600">
                  Get priority help from our team of study abroad experts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
