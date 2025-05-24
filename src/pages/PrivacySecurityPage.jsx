import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, EyeOff, UserCheck, ShieldQuestion } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTelegram } from '@/contexts/TelegramContext';
import { useToast } from '@/components/ui/use-toast';

const PrivacySecurityPage = () => {
  const { currentUser, updateUserProfile, setHeaderConfig } = useTelegram();
  const { toast } = useToast();

  const [isPrivateProfile, setIsPrivateProfile] = useState(currentUser?.isPrivate || false);
  const [showActivityStatus, setShowActivityStatus] = useState(currentUser?.showActivityStatus !== undefined ? currentUser.showActivityStatus : true);

  useEffect(() => {
    setHeaderConfig({ title: 'Privacy & Security', showBackButton: true });

    return () => {
      setHeaderConfig({ title: null, showBackButton: false, rightAction: null });
    };
  }, [setHeaderConfig]);

  const handlePrivateProfileToggle = (checked) => {
    setIsPrivateProfile(checked);
    updateUserProfile({ ...currentUser, isPrivate: checked });
    toast({
      title: `Profile ${checked ? 'Set to Private' : 'Set to Public'}`,
      description: `Your profile visibility has been updated.`,
    });
  };

  const handleActivityStatusToggle = (checked) => {
    setShowActivityStatus(checked);
    updateUserProfile({ ...currentUser, showActivityStatus: checked });
    toast({
      title: `Activity Status ${checked ? 'Visible' : 'Hidden'}`,
      description: `Your activity status visibility has been updated.`,
    });
  };

  const privacyOptions = [
    {
      id: 'privateProfile',
      icon: isPrivateProfile ? Lock : Unlock,
      title: 'Private Profile',
      description: isPrivateProfile ? 'Only followers you approve can see your posts.' : 'Anyone can see your posts and profile.',
      control: <Switch checked={isPrivateProfile} onCheckedChange={handlePrivateProfileToggle} />,
    },
    {
      id: 'activityStatus',
      icon: EyeOff,
      title: 'Show Activity Status',
      description: 'Allow others to see when you were last active.',
      control: <Switch checked={showActivityStatus} onCheckedChange={handleActivityStatusToggle} />,
    },
    {
      id: 'blockedAccounts',
      icon: UserCheck,
      title: 'Blocked Accounts',
      description: 'Manage accounts you have blocked.',
      action: () => toast({ title: "Blocked Accounts", description: "Feature not yet implemented." }),
    },
    {
      id: 'twoFactor',
      icon: ShieldQuestion,
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account.',
      action: () => toast({ title: "Two-Factor Authentication", description: "Feature not yet implemented." }),
    }
  ];

  return (
    <div className="pb-16">
      <motion.div
        className="p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-telegram-bg rounded-lg shadow-sm border border-telegram-divider overflow-hidden">
          {privacyOptions.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`flex items-center p-3.5 ${
                  index !== privacyOptions.length - 1 ? 'border-b border-telegram-divider' : ''
                } ${item.action ? 'cursor-pointer hover:bg-telegram-secondary-bg/80' : ''}`}
                onClick={item.action}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mr-3 bg-telegram-button-color/20">
                  <Icon size={18} className="text-telegram-button-color" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-telegram-text">{item.title}</h3>
                  <p className="text-xs text-telegram-hint">{item.description}</p>
                </div>
                {item.control && <div className="ml-auto">{item.control}</div>}
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-xs text-telegram-hint text-center">
          Review your settings regularly to ensure your account remains secure and your privacy is protected.
        </p>
      </motion.div>
    </div>
  );
};

export default PrivacySecurityPage;
