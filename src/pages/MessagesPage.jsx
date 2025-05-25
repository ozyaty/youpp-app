import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, MessageSquare } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import { useTelegram } from '@/contexts/TelegramContext';

const mockConversations = [
  { id: 'convo1', name: 'Alex Johnson', lastMessage: 'Sounds good! See you then.', time: '10:30 AM', unread: 2, avatar: '' },
  { id: 'convo2', name: 'Sarah Miller', lastMessage: 'Photo looks amazing! 😍', time: 'Yesterday', unread: 0, avatar: '' },
  { id: 'convo3', name: 'David Chen', lastMessage: 'Yeah, I can help with that.', time: 'Mon', unread: 0, avatar: '' },
  { id: 'convo4', name: 'Support Team', lastMessage: 'Your ticket has been updated.', time: 'Fri', unread: 1, avatar: '' },
];

const MessagesPage = () => {
  const { setHeaderConfig } = useTelegram();

  useEffect(() => {
    setHeaderConfig({ title: 'Messages', showBackButton: false });

    return () => {
      setHeaderConfig({ title: null, showBackButton: false });
    };
  }, [setHeaderConfig]);

  return (
    <PageWrapper>
      <div className="p-4">
        <div className="relative mb-4">
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-telegram-secondaryText" 
          />
          <Input
            type="text"
            placeholder="Search messages..."
            className="pl-10 bg-telegram-divider/30 border-none focus:ring-1 focus:ring-telegram-blue"
          />
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.07 } },
          hidden: {},
        }}
      >
        {mockConversations.map((convo, index) => (
          <motion.div
            key={convo.id}
            className={`flex items-center p-3 hover:bg-telegram-blue/5 cursor-pointer ${index !== mockConversations.length - 1 ? 'border-b border-telegram-divider' : ''}`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileTap={{ backgroundColor: 'rgba(0, 136, 204, 0.1)' }}
          >
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src={convo.avatar || `https://ui-avatars.com/api/?name=${convo.name.replace(' ', '+')}&background=random`} alt={convo.name} />
              <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm truncate">{convo.name}</h3>
                <span className="text-xs text-telegram-secondaryText">{convo.time}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-telegram-secondaryText truncate">{convo.lastMessage}</p>
                {convo.unread > 0 && (
                  <span className="bg-telegram-blue text-white text-xs font-semibold rounded-full px-2 py-0.5">
                    {convo.unread}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {mockConversations.length === 0 && (
        <div className="text-center py-16 text-telegram-secondaryText">
          <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">No messages yet.</p>
          <p>Start a conversation to see it here.</p>
        </div>
      )}
    </PageWrapper>
  );
};

export default MessagesPage;
