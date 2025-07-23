
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { Crown, Check, Users, MapPin, BookOpen, Star, ArrowRight, Shield, Calendar, MessageCircle, Zap, Clock, Euro } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import SubscribeButton from '@/components/SubscribeButton';
import ContactForm from '@/components/ContactForm';

const Premium = () => {
  const { user, profile } = useAuth();
  const { subscription, loading } = useSubscription();
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Countdown timer that resets every 8 hours
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const eightHoursInMs = 8 * 60 * 60 * 1000;
      const cycleStart = Math.floor(now / eightHoursInMs) * eightHoursInMs;
      const cycleEnd = cycleStart + eightHoursInMs;
      const difference = cycleEnd - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        return { hours, minutes, seconds };
      }
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  const handleLimitedOfferClick = () => {
    // Create a click event for the subscribe button
    const subscribeButton = document.querySelector('[data-subscribe-button]');
    if (subscribeButton) {
      (subscribeButton as HTMLElement).click();
    }
  };

  const features = [
    {
      icon: <MessageCircle className="w-6 h-6 text-green-600" />,
      title: "Mentoring Support",
      description: "Get personalized guidance from experienced mentors who've been through your journey"
    },
    {
      icon: <MapPin className="w-6 h-6 text-green-600" />,
      title: "Verified Housing",
      description: "Access to pre-screened, safe housing options in your destination country"
    },
    {
      icon: <BookOpen className="w-6 h-6 text-green-600" />,
      title: "Complete Guides",
      description: "Step-by-step cultural and practical guides for seamless integration"
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: "Exclusive Community",
      description: "Connect with current students and successful alumni in your field"
    },
    {
      icon: <Calendar className="w-6 h-6 text-green-600" />,
      title: "Smart Checklist",
      description: "Personalized timeline that adapts to your specific program and destination"
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Priority Support",
      description: "24/7 direct access to our expert support team"
    }
  ];

  const benefits = [
    "Save 3+ months of research time",
    "Avoid costly housing mistakes",
    "Connect with the right people from day one",
    "Get insider tips from successful students",
    "Never miss important deadlines",
    "Feel confident and prepared"
  ];

  const testimonials = [
    {
      name: "María García",
      destination: "Germany",
      quote: "Odisea+ paid for itself in the first week. I avoided so many mistakes and found the perfect housing before even arriving!",
      rating: 5,
      savings: "Saved €2,000+ on housing deposits"
    },
    {
      name: "Carlos Ruiz",
      destination: "Canada",
      quote: "The mentoring support was incredible. Having someone guide me through the process made all the difference.",
      rating: 5,
      savings: "Landed dream internship"
    },
    {
      name: "Ana López",
      destination: "Australia",
      quote: "Worth every penny! The community connections alone made my transition so much easier.",
      rating: 5,
      savings: "Connected with 50+ students"
    }
  ];

  const isSubscribed = subscription?.subscribed || false;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Crown className="w-12 h-12 text-warm-amber" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-warm-amber bg-clip-text text-transparent">
                Odisea+
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Your Study Abroad Success, Guaranteed
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students who chose the smart path to studying abroad
            </p>
            
            {isSubscribed ? (
              <div className="flex items-center justify-center gap-4 mb-8">
                <Badge variant="default" className="bg-green-100 text-green-800 px-4 py-2">
                  <Crown className="w-4 h-4 mr-2" />
                  Premium Active
                </Badge>
                <Button asChild size="lg">
                  <Link to="/dashboard">
                    Access Your Premium Features
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white mb-8 cursor-pointer hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
                onClick={handleLimitedOfferClick}
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className="w-6 h-6" />
                  <span className="text-lg font-semibold">Limited Time Offer</span>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">€19.99</div>
                  <div className="text-lg opacity-90 mb-4">One-time payment • Lifetime access</div>
                  <div className="text-sm opacity-80 mb-4">No monthly fees • Cancel anytime</div>
                  <div className="bg-white/20 rounded-lg px-4 py-3 mb-4">
                    <div className="text-sm font-medium mb-2">Offer expires in:</div>
                    <div className="flex items-center justify-center gap-4 text-2xl font-bold">
                      <div className="flex flex-col items-center">
                        <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="text-xs opacity-80">Hours</span>
                      </div>
                      <span>:</span>
                      <div className="flex flex-col items-center">
                        <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="text-xs opacity-80">Minutes</span>
                      </div>
                      <span>:</span>
                      <div className="flex flex-col items-center">
                        <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="text-xs opacity-80">Seconds</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm opacity-90">Click here to claim your lifetime access!</div>
                </div>
              </div>
            )}
          </div>

          {/* Value Proposition */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-3xl font-bold mb-6">Why Students Choose Odisea+</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary/10 rounded-2xl p-8">
              <div className="text-center">
                <Zap className="w-16 h-16 text-warm-amber mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-4">Success Rate</h4>
                <div className="text-4xl font-bold text-primary mb-2">97%</div>
                <p className="text-muted-foreground">of Odisea+ users successfully complete their study abroad journey</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">Everything You Need to Succeed</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 hover:border-primary/20 transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-xl mb-3">{feature.title}</h4>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">Real Results from Real Students</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-gradient-to-br from-primary/5 to-warm-amber/5 border-2 border-primary/10">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-warm-amber text-warm-amber" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-lg">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground mb-2">Studied in {testimonial.destination}</p>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                        {testimonial.savings}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h3>
            <Tabs defaultValue="individual" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="individual">Individual Students</TabsTrigger>
                <TabsTrigger value="institution">Universities</TabsTrigger>
              </TabsList>
              
              <TabsContent value="individual" className="mt-8">
                <Card className="border-4 border-primary shadow-2xl">
                  <CardHeader className="text-center pb-8">
                    <div className="flex justify-center mb-4">
                      <Crown className="w-12 h-12 text-warm-amber" />
                    </div>
                    <CardTitle className="text-3xl">Odisea+ Lifetime</CardTitle>
                    <CardDescription className="text-lg">Everything you need for study abroad success</CardDescription>
                    <div className="flex items-center justify-center gap-2 mt-6">
                      <Euro className="w-8 h-8 text-primary" />
                      <span className="text-5xl font-bold text-primary">19.99</span>
                    </div>
                    <p className="text-muted-foreground text-lg">One-time payment • Lifetime access</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4 mb-8">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span>{feature.title}</span>
                        </div>
                      ))}
                    </div>
                    {!isSubscribed && (
                      <div data-subscribe-button>
                        <SubscribeButton type="individual" className="w-full py-4 text-lg font-semibold" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="institution" className="mt-8">
                <div className="space-y-8">
                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle className="text-3xl">University Partnership</CardTitle>
                      <CardDescription className="text-lg">
                        Custom solutions for educational institutions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h4 className="font-semibold text-xl mb-4">What's Included:</h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                              <span>All individual features</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                              <span>Bulk student management</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                              <span>Institution dashboard</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                              <span>Custom branding</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                              <span>Analytics & reporting</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-xl mb-4">Perfect For:</h4>
                          <div className="space-y-2 text-muted-foreground">
                            <p>• Universities with study abroad programs</p>
                            <p>• International education consultants</p>
                            <p>• Student mobility offices</p>
                            <p>• Educational agencies</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <ContactForm />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Final CTA */}
          {!isSubscribed && (
            <div className="text-center bg-gradient-to-r from-primary to-warm-amber rounded-2xl p-12 text-white">
              <Crown className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-4xl font-bold mb-4">Ready to Transform Your Study Abroad Journey?</h3>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of successful students who chose Odisea+
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <SubscribeButton type="individual" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold" />
                <div className="text-white/80 text-sm">
                  30-day money-back guarantee
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Premium;
