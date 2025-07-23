
import { useState } from 'react';

export const usePremiumModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feature, setFeature] = useState<string>('this feature');

  const openModal = (featureName?: string) => {
    if (featureName) {
      setFeature(featureName);
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    feature,
    openModal,
    closeModal,
  };
};
