
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, feature = "this feature" }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Crown className="w-6 h-6 text-yellow-600 mr-2" />
              <span>Odisea+ Required</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center py-4">
          <div className="mb-4">
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Crown className="w-10 h-10 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Unlock {feature}
            </h3>
            <p className="text-gray-600 text-sm">
              Get lifetime access to all premium features for just 20€
            </p>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-700">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              Interactive preparation checklist
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              Exclusive community access
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              Detailed guides & priority support
            </div>
          </div>
          
          <div className="space-y-3">
            <Button asChild className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold">
              <Link to="/premium">
                <Crown className="w-4 h-4 mr-2" />
                Get Odisea+ - 20€
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            
            <Button variant="outline" onClick={onClose} className="w-full">
              Maybe later
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            One-time payment • Lifetime access • 30-day guarantee
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
