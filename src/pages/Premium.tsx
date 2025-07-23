
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { Crown, CheckCircle, Users, MapPin, BookOpen, Star, ArrowRight, Shield, Calendar, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/Layout';
import SubscribeButton from '@/components/SubscribeButton';

const Premium = () => {
  const { user, profile } = useAuth();
  const { subscription, loading } = useSubscription();

  const features = [
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: "Priority Mentoring Support",
      description: "Get personalized guidance from experienced mentors who have studied abroad",
      premium: true
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Exclusive Housing Recommendations",
      description: "Access to vetted housing options and insider tips for each destination",
      premium: true
    },
    {
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      title: "Advanced Destination Guides",
      description: "In-depth cultural guides, visa information, and practical living tips",
      premium: true
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Community Access",
      description: "Connect with other students planning similar journeys and alumni networks",
      premium: true
    },
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      title: "Interactive Checklist",
      description: "Personalized preparation timeline with country-specific tasks and deadlines",
      premium: true
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Priority Support",
      description: "Direct access to our support team for urgent questions and assistance",
      premium: true
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

  const pricingPlans = [
    {
      name: "Individual",
      price: "€9.99",
      period: "per month",
      description: "Perfect for individual students planning their study abroad journey",
      features: [
        "All premium features",
        "Priority support",
        "Interactive checklist",
        "Community access",
        "Housing recommendations"
      ],
      type: "individual" as const
    },
    {
      name: "Institution",
      price: "€49.99",
      period: "per month",
      description: "Ideal for universities and educational institutions",
      features: [
        "All individual features",
        "Bulk student management",
        "Institution dashboard",
        "Custom branding",
        "Dedicated support"
      ],
      type: "institution" as const,
      popular: true
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
            
            {isSubscribed ? (
              <div className="flex items-center justify-center gap-4">
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
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SubscribeButton type="individual" className="px-8 py-3" />
                <SubscribeButton type="institution" className="px-8 py-3" />
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
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

          {/* Pricing */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-primary border-2' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="flex items-baseline gap-1 mt-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <SubscribeButton type={plan.type} className="w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
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
