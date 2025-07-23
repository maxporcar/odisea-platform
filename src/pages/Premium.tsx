
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Crown, CheckCircle, Star, Users, BookOpen, MessageSquare, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

const Premium = () => {
  const { user, profile } = useAuth();

  const handlePayment = () => {
    // TODO: Integrate Stripe payment later
    console.log('Payment initiated for user:', user?.id);
    // For now, just show alert
    alert('Payment integration coming soon! This will redirect to Stripe checkout.');
  };

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Interactive Preparation Checklist",
      description: "Step-by-step personalized checklist for your destination with progress tracking"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Exclusive Community Access",
      description: "Connect with other students who went to your destination"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Detailed Country Guides",
      description: "In-depth guides covering culture, visa requirements, and local tips"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Priority Support",
      description: "Get your questions answered faster with priority customer support"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Lifetime Access",
      description: "One-time payment for lifetime access to all premium features"
    }
  ];

  const testimonials = [
    {
      name: "María González",
      destination: "Berlin, Germany",
      text: "The checklist saved me so much time! I knew exactly what to do before leaving Spain.",
      rating: 5
    },
    {
      name: "Lucas Silva",
      destination: "Paris, France",
      text: "The community helped me find the perfect student housing. Worth every euro!",
      rating: 5
    },
    {
      name: "Emma Johnson",
      destination: "Barcelona, Spain",
      text: "The detailed guides made my transition so much smoother. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Crown className="w-16 h-16 text-yellow-600 mr-3" />
              <h1 className="text-5xl font-bold text-gray-900">
                Odisea<span className="text-yellow-600">+</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Transform your international mobility experience with our premium tools and exclusive community
            </p>
            <Badge className="bg-red-100 text-red-800 px-4 py-2 text-lg font-semibold">
              🔥 Limited Time: One-time payment for lifetime access
            </Badge>
          </div>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto mb-16">
            <Card className="border-4 border-yellow-300 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="text-6xl font-bold text-gray-900 mb-2">20€</div>
                  <div className="text-gray-600">One-time payment</div>
                  <div className="text-sm text-green-600 font-semibold">Lifetime access • No monthly fees</div>
                </div>
                
                <Button 
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Get Odisea+ Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <p className="text-sm text-gray-500 mt-4">
                  💳 Secure payment • 30-day money-back guarantee
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-yellow-600 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Free vs Odisea+
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-700 mb-6">Free Version</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-center text-gray-600">
                    <span className="w-6 h-6 mr-3">📍</span>
                    Basic country information
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <span className="w-6 h-6 mr-3">🏫</span>
                    University listings
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <span className="w-6 h-6 mr-3">💬</span>
                    Limited testimonials
                  </div>
                </div>
              </div>
              
              <div className="text-center border-l-4 border-yellow-400 pl-8">
                <h3 className="text-2xl font-semibold text-yellow-600 mb-6">Odisea+ Premium</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-center text-gray-900">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
                    Everything in Free +
                  </div>
                  <div className="flex items-center justify-center text-gray-900">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
                    Interactive preparation checklist
                  </div>
                  <div className="flex items-center justify-center text-gray-900">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
                    Exclusive community access
                  </div>
                  <div className="flex items-center justify-center text-gray-900">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
                    Detailed country guides
                  </div>
                  <div className="flex items-center justify-center text-gray-900">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
                    Priority support
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              What Our Premium Users Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.destination}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Experience?</h2>
            <p className="text-xl mb-6">Join thousands of students who made their mobility journey easier</p>
            <Button 
              onClick={handlePayment}
              className="bg-white text-yellow-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Crown className="w-5 h-5 mr-2" />
              Get Lifetime Access - 20€
            </Button>
            <p className="text-sm mt-4 opacity-90">
              30-day money-back guarantee • Secure payment • Instant access
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Premium;
