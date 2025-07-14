
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

interface InstitutionSubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  onSubscribe: (institutionName: string, institutionDomain: string) => void;
  loading?: boolean;
}

const InstitutionSubscriptionModal: React.FC<InstitutionSubscriptionModalProps> = ({
  open,
  onClose,
  onSubscribe,
  loading = false
}) => {
  const { t } = useTranslation();
  const [institutionName, setInstitutionName] = useState('');
  const [institutionDomain, setInstitutionDomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (institutionName.trim() && institutionDomain.trim()) {
      onSubscribe(institutionName.trim(), institutionDomain.trim());
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('subscription.institution.setup')}</DialogTitle>
          <DialogDescription>
            {t('subscription.institution.setupDescription')}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="institutionName">
              {t('subscription.institution.name')}
            </Label>
            <Input
              id="institutionName"
              type="text"
              placeholder="Universidad de Barcelona"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="institutionDomain">
              {t('subscription.institution.domain')}
            </Label>
            <Input
              id="institutionDomain"
              type="text"
              placeholder="ub.edu"
              value={institutionDomain}
              onChange={(e) => setInstitutionDomain(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">
              {t('subscription.institution.domainHelp')}
            </p>
          </div>
        </form>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {t('common.cancel')}
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={loading || !institutionName.trim() || !institutionDomain.trim()}
            className="bg-[#FFA500] hover:bg-[#E6940D] text-white"
          >
            {loading ? t('common.loading') : t('subscription.continue')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InstitutionSubscriptionModal;
