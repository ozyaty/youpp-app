import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, HelpCircle, LogOut, UserCircle, Bookmark, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useTelegram } from '@/contexts/TelegramContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PageWrapper from '@/components/PageWrapper'; // ✅

const MenuPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser, showAlert, closeApp, setHeaderConfig } = useTelegram();

  useEffect(() => {
    setHeaderConfig({ showBackButton: true, rightAction: null });

    return () => {
      setHeaderConfig({ showBackButton: false, rightAction: null });
    };
  }, [setHeaderConfig]);

  const handleLogout = () => {
    showAlert("Are you sure you want to log out?", (confirmed) => {
      if (confirmed) {
        toast({
          title: "Logged out",
          description: "You have been logged out successfully.",
        });

        setTimeout(() => {
          if (window.Telegram?.WebApp) {
            closeApp();
          } else {
            navigate('/');
          }
        }, 1500);
      }
    });
  };

  const menuItems = [
    {
      icon: UserCircle,
      title: "Account",
      description: "Manage your account details",
      action: () => navigate('/account-details')
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Control your privacy and security",
      action: () => navigate('/privacy-security')
    },
    {
      icon: Bookmark,
      title: "Bookmarks",
      description: "View your saved posts",
      action: () => navigate('/bookmarks')
    },
    {
      icon: BarChart3,
      title: "Activity",
      description: "View your account activity",
      action: () => navigate('/activity')
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      description: "Get help and contact support",
      action: () => navigate('/help-support')
    },
    {
      icon: LogOut,
      title: "Log Out",
      description: `Log out @${currentUser?.username || 'user'}`,
      action: handleLogout,
      danger: true
    }
  ];

  return (
    <PageWrapper>
      <motion.div
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center space-x-3 mb-6 p-3 bg-telegram-secondary-bg rounded-lg">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${currentUser?.name}&background=random`}
              alt={currentUser?.name}
            />
            <AvatarFallback className="text-lg">
              {currentUser?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-md font-semibold text-telegram-text">
              {currentUser?.name}
            </h2>
            {currentUser?.username && (
              <p className="text-sm text-telegram-hint">@{currentUser.username}</p>
            )}
          </div>
        </div>

        <div className="bg-telegram-bg rounded-lg shadow-sm border border-telegram-divider overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.title}
                className={`w-full flex items-center p-3.5 text-left ${
                  index !== menuItems.length - 1 ? 'border-b border-telegram-divider' : ''
                } ${item.danger ? 'text-red-600 hover:bg-red-500/10' : 'hover:bg-telegram-secondary-bg/80'}`}
                onClick={item.action}
                whileTap={{ backgroundColor: item.danger ? 'rgba(220, 38, 38, 0.1)' : 'rgba(var(--telegram-theme-secondary-bg-color-rgb), 0.5)' }}
                transition={{ duration: 0.05 }}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mr-3 ${
                  item.danger ? 'bg-red-500/20' : 'bg-telegram-button-color/20'
                }`}>
                  <Icon size={18} className={item.danger ? 'text-red-500' : 'text-telegram-button-color'} />
                </div>

                <div className="flex-1">
                  <h3 className={`font-medium text-sm ${item.danger ? 'text-red-600' : 'text-telegram-text'}`}>{item.title}</h3>
                  {item.description && (
                    <p className={`text-xs ${item.danger ? 'text-red-500/80' : 'text-telegram-hint'}`}>
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-telegram-hint">
          <p>Telegram Social App</p>
          <p>Version 1.0.1</p>
        </div>
      </motion.div>
    </PageWrapper>
  );
};

export default MenuPage;
