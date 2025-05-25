import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTelegram } from '@/contexts/TelegramContext';
import PageWrapper from '@/components/PageWrapper';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { telegramUser, showAlert, closeApp } = useTelegram();

  const handleLogout = () => {
    showAlert("Are you sure you want to log out?", (confirmed) => {
      if (confirmed) {
        toast({
          title: "Logged out",
          description: "You have been logged out successfully",
        });

        setTimeout(() => {
          closeApp();
        }, 1500);
      }
    });
  };

  const settingsItems = [
    {
      icon: Moon,
      title: "Dark Mode",
      description: "Toggle dark mode on/off",
      action: () => {
        toast({
          title: "Dark Mode",
          description: "Dark mode setting changed",
        });
      }
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage notification settings",
      action: () => {
        toast({
          title: "Notifications",
          description: "Notification settings opened",
        });
      }
    },
    {
      icon: Shield,
      title: "Privacy",
      description: "Manage privacy settings",
      action: () => {
        toast({
          title: "Privacy",
          description: "Privacy settings opened",
        });
      }
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      description: "Get help and contact support",
      action: () => {
        toast({
          title: "Help & Support",
          description: "Help center opened",
        });
      }
    },
    {
      icon: LogOut,
      title: "Log Out",
      description: "Log out of your account",
      action: handleLogout,
      danger: true
    }
  ];

  return (
    <PageWrapper>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-telegram-blue rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {telegramUser?.photo_url ? (
            <img
              src={telegramUser.photo_url}
              alt={telegramUser.first_name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            telegramUser?.first_name?.charAt(0) || 'U'
          )}
        </div>

        <div>
          <h2 className="text-lg font-bold">
            {telegramUser?.first_name} {telegramUser?.last_name}
          </h2>
          {telegramUser?.username && (
            <p className="text-telegram-secondaryText">@{telegramUser.username}</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-telegram-divider overflow-hidden">
        {settingsItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.title}
              className={`w-full flex items-center p-4 text-left ${
                index !== settingsItems.length - 1 ? 'border-b border-telegram-divider' : ''
              } ${item.danger ? 'text-red-500' : ''}`}
              onClick={item.action}
              whileTap={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                item.danger ? 'bg-red-100' : 'bg-telegram-blue/10'
              }`}>
                <Icon size={20} className={item.danger ? 'text-red-500' : 'text-telegram-blue'} />
              </div>

              <div className="flex-1">
                <h3 className={`font-semibold ${item.danger ? 'text-red-500' : ''}`}>{item.title}</h3>
                <p className={`text-sm ${item.danger ? 'text-red-400' : 'text-telegram-secondaryText'}`}>
                  {item.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 text-center text-sm text-telegram-secondaryText">
        <p>Telegram Social App</p>
        <p>Version 1.0.0</p>
      </div>
    </PageWrapper>
  );
};

export default SettingsPage;
