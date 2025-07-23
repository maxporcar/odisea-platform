
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { Crown, Check, Users, MapPin, BookOpen, Star, ArrowRight, Shield, Calendar, MessageCircle } from 'lucide-react';
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

  const features = [
    {
      icon: <MessageCircle className="w-5 h-5 text-green-600" />,
      title: "Mentoring Support",
      description: "Guidance from experienced mentors"
    },
    {
      icon: <MapPin className="w-5 h-5 text-green-600" />,
      title: "Housing Recommendations",
      description: "Vetted housing options for each destination"
    },
    {
      icon: <BookOpen className="w-5 h-5 text-green-600" />,
      title: "Advanced Destination Guides",
      description: "In-depth cultural and practical guides"
    },
    {
      icon: <Users className="w-5 h-5 text-green-600" />,
      title: "Community Access",
      description: "Connect with students and alumni"
    },
    {
      icon: <Calendar className="w-5 h-5 text-green-600" />,
      title: "Interactive Checklist",
      description: "Personalized preparation timeline"
    },
    {
      icon: <Shield className="w-5 h-5 text-green-600" />,
      title: "Priority Support",
      description: "Direct access to our support team"
    }
  ];

  const testimonials = [
    {
      name: "María García",
      destination: "Germany",
      quote: "The housing recommendations saved me months of searching. I found the perfect place before even arriving!",
      rating: 5
    },
    {
      name: "Carlos Ruiz",
      destination: "Canada",
      quote: "The mentoring support was invaluable. Having someone who went through the same process made all the difference.",
      rating: 5
    },
    {
      name: "Ana López",
      destination: "Australia",
      quote: "The interactive checklist kept me organized and on track. I never missed a deadline!",
      rating: 5
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
              <Crown className="w-8 h-8 text-warm-amber" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-warm-amber bg-clip-text text-transparent">
                Odisea+
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              Unlock the full potential of your study abroad journey with premium features designed for success
            </p>
            
            {isSubscribed && (
              <div className="flex items-center justify-center gap-4 mb-8">
                <Badge variant="default" className="bg-green-100 text-green-800 px-4 py-2">
                  <Crown className="w-4 h-4 mr-2" />
                  Premium Active
                </Badge>
                <Button asChild>
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Premium Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-warm-amber text-warm-amber" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">Studied in {testimonial.destination}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Plans Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
            <Tabs defaultValue="individual" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="individual">Individual</TabsTrigger>
                <TabsTrigger value="institution">Institution</TabsTrigger>
              </TabsList>
              
              <TabsContent value="individual" className="mt-8">
                <Card className="border-2 border-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl">Individual Plan</CardTitle>
                    <CardDescription>Perfect for individual students planning their study abroad journey</CardDescription>
                    <div className="flex items-baseline gap-1 mt-4">
                      <span className="text-3xl font-bold">€9.99</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{feature.title}</span>
                        </li>
                      ))}
                    </ul>
                    {!isSubscribed && (
                      <SubscribeButton type="individual" className="w-full" />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="institution" className="mt-8">
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">Institution Plan</CardTitle>
                      <CardDescription>
                        Ideal for universities and educational institutions. Get in touch with us for custom pricing and features.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-sm">All individual features</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-sm">Bulk student management</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-sm">Institution dashboard</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-sm">Custom branding</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-sm">Dedicated support</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <ContactForm />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary to-warm-amber rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Premium Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students who have successfully studied abroad with Odisea+
            </p>
            {!isSubscribed && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SubscribeButton type="individual" className="bg-white text-primary hover:bg-gray-100 px-8 py-3" />
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary px-8 py-3" asChild>
                  <Link to="/testimonios">Read More Stories</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Premium;
