import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

const NotificationItem = ({ notification }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (notification.postId) {
      navigate(`/post/${notification.postId}`);
    } else if (notification.userId) {
      navigate(`/profile/${notification.userId}`);
    }
  };
  
  return (
    <motion.div 
      className={`p-4 border-b border-telegram-divider flex items-start space-x-3 cursor-pointer ${
        notification.unread ? 'bg-telegram-blue/5' : ''
      }`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ backgroundColor: 'rgba(0, 136, 204, 0.1)' }}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
        <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <span className="font-semibold">{notification.user.name}</span>
            <span className="text-telegram-secondaryText ml-1">@{notification.user.username}</span>
          </div>
          <span className="text-xs text-telegram-secondaryText">{notification.timeAgo}</span>
        </div>
        
        <p className="text-sm mt-1">{notification.message}</p>
        
        {notification.content && (
          <div className="mt-2 p-3 bg-telegram-divider/30 rounded-md text-sm text-telegram-secondaryText">
            {notification.content}
          </div>
        )}
      </div>
      
      {notification.unread && (
        <div className="w-2 h-2 rounded-full bg-telegram-blue mt-2"></div>
      )}
    </motion.div>
  );
};

export default NotificationItem;