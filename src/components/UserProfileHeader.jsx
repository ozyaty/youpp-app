import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit3, MessageSquare, Camera, Image as ImageIcon } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

const UserProfileHeader = ({ 
  user, 
  editFormData, 
  avatarInputRef, 
  coverInputRef, 
  handleImageChange, 
  handleFollow, 
  handleMessage, 
  openEditDialog,
  children 
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="h-40 group">
        {editFormData.coverImage ? (
          <img 
            className="w-full h-full object-cover" 
            alt={`${user.name}'s cover image`}
            src={editFormData.coverImage} />
        ) : (
            <div className="w-full h-full flex items-center justify-center cover-placeholder">
              <ImageIcon className="opacity-50" />
            </div>
        )}
        {user.isCurrentUser && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => coverInputRef.current?.click()}
            aria-label="Change cover image"
          >
            <Camera size={18} />
          </Button>
        )}
        <input 
          type="file" 
          ref={coverInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={(e) => handleImageChange(e, 'coverImage')} 
        />
      </div>
      
      <motion.div 
        className="absolute -bottom-12 left-4 group"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Avatar className="h-24 w-24 border-4 border-telegram-secondary-bg shadow-lg relative">
          <AvatarImage src={editFormData.avatar || `https://ui-avatars.com/api/?name=${user.name.replace(/\s/g, '+')}&background=random&color=fff`} alt={user.name} />
          <AvatarFallback className="text-2xl avatar-fallback-themed">{user.name?.charAt(0)}</AvatarFallback>
          {user.isCurrentUser && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute inset-0 m-auto bg-black/40 hover:bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-full h-full"
              onClick={() => avatarInputRef.current?.click()}
              aria-label="Change profile picture"
            >
              <Camera size={24} />
            </Button>
          )}
        </Avatar>
        <input 
          type="file" 
          ref={avatarInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={(e) => handleImageChange(e, 'avatar')} 
        />
      </motion.div>
      
      <div className="absolute right-4 -bottom-10 flex space-x-2">
        {user.isCurrentUser ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="telegram-button-secondary backdrop-blur-sm" onClick={openEditDialog}>
                <Edit3 size={16} className="mr-2" /> Edit Profile
              </Button>
            </DialogTrigger>
            {children}
          </Dialog>
        ) : (
          <>
            <Button onClick={handleMessage} variant="outline" className="telegram-button-secondary backdrop-blur-sm">
              <MessageSquare size={16} className="mr-2" /> Message
            </Button>
            <Button onClick={handleFollow} className="telegram-button">
              {user.isFollowing ? 'Following' : 'Follow'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfileHeader;