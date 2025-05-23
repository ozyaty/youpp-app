import React from 'react';
import { Heart, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Comment = ({ comment }) => {
  return (
    <motion.div 
      className="py-3 border-b border-telegram-divider"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center">
                <h4 className="font-semibold text-sm">{comment.author.name}</h4>
                <span className="text-telegram-secondaryText text-xs ml-2">@{comment.author.username} · {comment.timeAgo}</span>
              </div>
              <p className="text-sm mt-1">{comment.content}</p>
            </div>
            
            <Button variant="ghost" size="icon" className="h-6 w-6 text-telegram-secondaryText">
              <MoreHorizontal size={14} />
            </Button>
          </div>
          
          <div className="flex items-center mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-telegram-secondaryText hover:text-telegram-blue hover:bg-telegram-blue/10 p-1 h-6"
            >
              <Heart size={14} className={comment.liked ? "fill-telegram-blue text-telegram-blue" : ""} />
              <span className="ml-1 text-xs">{comment.likes}</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Comment;