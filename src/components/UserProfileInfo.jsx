import React from 'react';
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react';

const UserProfileInfo = ({ user }) => {
  return (
    <div className="mt-16 px-4">
      <h1 className="text-xl font-bold text-telegram-text">{user.name}</h1>
      <p className="text-telegram-hint">@{user.username}</p>
      
      <p className="mt-3 text-sm whitespace-pre-wrap text-telegram-text">{user.bio || "No bio available."}</p>
      
      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-telegram-hint">
        {user.location && (
          <div className="flex items-center">
            <MapPin size={14} className="mr-1" />
            <span>{user.location}</span>
          </div>
        )}
        
        {user.website && (
          <div className="flex items-center">
            <LinkIcon size={14} className="mr-1" />
            <a href={user.website.startsWith('http') ? user.website : `https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-telegram-link hover:underline">
              {user.website}
            </a>
          </div>
        )}
        
        {user.joinDate && (
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>Joined {user.joinDate}</span>
          </div>
        )}
      </div>
      
      <div className="flex mt-4 text-sm">
        <div className="mr-4">
          <span className="font-bold text-telegram-text">{user.following}</span>
          <span className="text-telegram-hint ml-1">Following</span>
        </div>
        <div>
          <span className="font-bold text-telegram-text">{user.followers}</span>
          <span className="text-telegram-hint ml-1">Followers</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;