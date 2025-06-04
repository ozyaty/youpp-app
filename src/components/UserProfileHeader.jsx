import React from 'react';
import { useParams } from 'react-router-dom';
import { useTelegram } from '@/contexts/TelegramContext';
import { BadgeCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserProfileHeader = () => {
  const { id } = useParams();
  const { currentUser, users } = useTelegram();

  const user = users.find((u) => u.id === id) || currentUser;
  if (!user) return null;

  const avatarFallback = user.name?.charAt(0) || 'U';

  return (
    <div className="relative w-full">
      {/* Cover Image */}
      {user.coverImage && (
        <img
          src={user.coverImage}
          alt="Cover"
          className="h-32 w-full object-cover rounded-b-md"
        />
      )}

      {/* Avatar & Name */}
      <div className="flex flex-col items-center -mt-12">
        <Avatar className="w-20 h-20 border-4 border-white shadow-md bg-white">
          <AvatarImage
            src={
              user.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
            }
            alt={user.name}
          />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>

        <div className="mt-2 flex items-center gap-1">
          <h1 className="text-xl font-bold text-telegram-text">
            {user.name}
          </h1>
          {user.isPremium && <BadgeCheck size={18} className="text-blue-500" />}
        </div>

        {user.username && (
          <p className="text-sm text-telegram-hint">@{user.username}</p>
        )}
      </div>
    </div>
  );
};

export default UserProfileHeader;
