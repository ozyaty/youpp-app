import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity as ActivityIcon, Users, BarChart2 } from 'lucide-react';
import { useTelegram } from '@/contexts/TelegramContext';

const ActivityPage = () => {
  const { setHeaderConfig } = useTelegram();

  useEffect(() => {
    setHeaderConfig({ title: 'Activity', showBackButton: true });

    return () => {
      setHeaderConfig({ title: null, showBackButton: false, rightAction: null });
    };
  }, [setHeaderConfig]);

  const activities = [
    { id: 1, type: 'login', description: 'Logged in from new device', time: '2 hours ago', icon: ActivityIcon },
    { id: 2, type: 'profile_update', description: 'Updated profile picture', time: '1 day ago', icon: Users },
    { id: 3, type: 'post_engagement', description: 'Your post "Tech Trends" received 50 likes', time: '3 days ago', icon: BarChart2 },
    { id: 4, type: 'security_alert', description: 'Unusual login attempt detected', time: '1 week ago', icon: ActivityIcon, alert: true },
  ];

  return (
    <div className="pb-16">
      <motion.div
        className="p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-telegram-text">Recent Account Activity</h2>
        {activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className={`p-3 rounded-lg flex items-start space-x-3 ${
                    activity.alert
                      ? 'bg-red-500/10 border border-red-500/30'
                      : 'bg-telegram-secondary-bg border border-telegram-divider'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      activity.alert ? 'bg-red-500/20' : 'bg-telegram-button-color/20'
                    }`}
                  >
                    <Icon size={18} className={activity.alert ? 'text-red-500' : 'text-telegram-button-color'} />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        activity.alert ? 'text-red-700 dark:text-red-400' : 'text-telegram-text'
                      }`}
                    >
                      {activity.description}
                    </p>
                    <p
                      className={`text-xs ${
                        activity.alert ? 'text-red-600 dark:text-red-500' : 'text-telegram-hint'
                      }`}
                    >
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 text-telegram-hint">
            <ActivityIcon size={48} className="mx-auto mb-3" />
            <p>No recent activity to display.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ActivityPage;
