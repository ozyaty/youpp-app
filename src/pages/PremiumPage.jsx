import React, { useEffect } from 'react';
import { useTelegram } from '@/contexts/TelegramContext';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Lock, Rocket, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import PageWrapper from '@/components/PageWrapper';

const PremiumPage = () => {
  const { setHeaderConfig, currentUser, actions } = useTelegram();
  const { toast } = useToast();

  useEffect(() => {
    setHeaderConfig({
      title: 'Premium',
      showBackButton: true,
    });

    return () => {
      setHeaderConfig({ title: null, showBackButton: false });
    };
  }, [setHeaderConfig]);

  const handleUpgrade = () => {
    actions.updateUserProfile({ ...currentUser, isPremium: true });

    toast({
      title: 'Premium Activated!',
      description: 'You are now a Premium member 🎉',
    });
  };

  const features = [
    { icon: <Star size={18} />, label: 'Verified Badge' },
    { icon: <Lock size={18} />, label: 'Premium-Only Features' },
    { icon: <Rocket size={18} />, label: 'Priority Access to New Tools' },
    { icon: <Shield size={18} />, label: 'Increased Security & Visibility' },
  ];

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-5 pb-[6rem]"
      >
        <div className="text-center mt-4 mb-6">
          <div className="text-4xl">💎</div>
          <h2 className="text-2xl font-bold mt-2">Get Premium</h2>
          <p className="text-telegram-secondaryText mt-1">
            Unlock exclusive features and boost your visibility.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-telegram-divider p-4 shadow-sm space-y-3">
          {features.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="text-blue-500">{item.icon}</div>
              <p className="text-sm font-medium text-telegram-text">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          {currentUser?.isPremium ? (
            <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
              <CheckCircle size={20} />
              You are already Premium!
            </div>
          ) : (
            <Button
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-base mt-2"
            >
              Upgrade with Crypto
            </Button>
          )}
        </div>
      </motion.div>
    </PageWrapper>
  );
};

export default PremiumPage;
