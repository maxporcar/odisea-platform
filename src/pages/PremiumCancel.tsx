
import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import SubscribeButton from '@/components/SubscribeButton';

const PremiumCancel = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full rounded-2xl shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-t-2xl">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-white/20 p-3">
                <XCircle className="w-12 h-12" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Subscription Cancelled</CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600 mb-6">
              No worries! Your subscription process was cancelled. You can always try again when you're ready.
            </p>
            
            <div className="space-y-4">
              <SubscribeButton className="w-full" />
              
              <Button variant="outline" asChild className="w-full rounded-xl">
                <Link to="/" className="flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">
              Questions? <Link to="/contact" className="text-primary hover:underline">Contact our support team</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PremiumCancel;
