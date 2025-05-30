import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NotificationItem from '@/components/NotificationItem';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { notifications } from '@/data/mockData';
import { useTelegram } from '@/contexts/TelegramContext';
import PageWrapper from '@/components/PageWrapper';

const NotificationsPage = () => {
  const { setHeaderConfig } = useTelegram();
  const [isLoading, setIsLoading] = useState(true);
  const [allNotifications, setAllNotifications] = useState([]);

  useEffect(() => {
    setHeaderConfig({ title: 'Notifications', showBackButton: false });

    const timer = setTimeout(() => {
      setAllNotifications(notifications);
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      setHeaderConfig({ title: null, showBackButton: false });
    };
  }, [setHeaderConfig]);

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-2 border-telegram-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full flex bg-transparent border-b border-telegram-divider">
          <TabsTrigger
            value="all"
            className="flex-1 telegram-tab data-[state=active]:telegram-tab-active"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="mentions"
            className="flex-1 telegram-tab data-[state=active]:telegram-tab-active"
          >
            Mentions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
              hidden: {},
            }}
          >
            {allNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}

            {allNotifications.length === 0 && (
              <div className="text-center py-8 text-telegram-secondaryText">
                <p>No notifications yet</p>
              </div>
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="mentions">
          <div className="text-center py-8 text-telegram-secondaryText">
            <p>No mentions yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
};

export default NotificationsPage;
