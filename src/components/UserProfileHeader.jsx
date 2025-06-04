
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTelegram } from '@/contexts/TelegramContext';
import { BadgeCheck } from 'lucide-react';

const UserProfileHeader = () => {
  const { id } = useParams();
  const { currentUser, users } = useTelegram();

  const user = users.find((u) => u.id === id) || currentUser;

  if (!user) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6 mb-2">
      <h1 className="text-xl font-bold text-telegram-text flex items-center gap-1">
        {user.name}
        {user.isPremium && (
          <BadgeCheck size={18} className="text-blue-500" />
        )}
      </h1>
    </div>
  );
};

export default UserProfileHeader;
