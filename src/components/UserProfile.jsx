import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useTelegram } from '@/contexts/TelegramContext';

import UserProfileHeader from './UserProfileHeader';
import UserProfileInfo from './UserProfileInfo';
import UserProfileTabs from './UserProfileTabs';
import EditProfileDialog from './EditProfileDialog';

const UserProfile = ({ user, posts: userSpecificPosts, onUpdateProfile }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { updateUserProfile: globalUpdateUserProfile } = useTelegram(); 

  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    bio: '',
    location: '',
    website: '',
    avatar: '',
    coverImage: '',
  });

  useEffect(() => {
    if (user) {
      setEditFormData({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        avatar: user.avatar || '',
        coverImage: user.coverImage || '',
      });
    }
  }, [user]);


  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleFollow = () => {
    toast({
      title: `Following ${user.name}`,
      description: `You are now following ${user.name}. (Functionality not fully implemented)`,
    });
  };
  
  const handleMessage = () => {
    toast({
      title: `Message ${user.name}`,
      description: `Navigating to messages for ${user.name}. (Functionality not fully implemented)`,
    });
    navigate('/messages'); 
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, imageType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result;
        setEditFormData(prev => ({ ...prev, [imageType]: newImage }));
        if (user.isCurrentUser && (onUpdateProfile || globalUpdateUserProfile)) {
          const updateFunc = onUpdateProfile || globalUpdateUserProfile;
          updateFunc({ ...user, [imageType]: newImage });
           toast({ title: `${imageType.charAt(0).toUpperCase() + imageType.slice(1)} Updated`, description: `Your ${imageType} has been changed.`});
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const openEditDialog = () => {
     if (user) {
      setEditFormData({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        avatar: user.avatar || '',
        coverImage: user.coverImage || '',
      });
    }
    setIsEditing(true);
  };

  const handleEditSubmit = () => {
    const updateFunc = onUpdateProfile || globalUpdateUserProfile;
    if (updateFunc) {
      updateFunc({...user, ...editFormData});
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved.",
      });
      setIsEditing(false);
    }
  };
  
  if (!user) {
    return <div>Loading profile...</div>; 
  }

  return (
    <div className="pb-4">
      <UserProfileHeader
        user={user}
        editFormData={editFormData}
        avatarInputRef={avatarInputRef}
        coverInputRef={coverInputRef}
        handleImageChange={handleImageChange}
        handleFollow={handleFollow}
        handleMessage={handleMessage}
        openEditDialog={openEditDialog}
      >
        {user.isCurrentUser && (
          <EditProfileDialog
            isOpen={isEditing}
            onOpenChange={setIsEditing}
            editFormData={editFormData}
            handleEditFormChange={handleEditFormChange}
            handleEditSubmit={handleEditSubmit}
          />
        )}
      </UserProfileHeader>
      <UserProfileInfo user={user} />
      <UserProfileTabs user={user} posts={userSpecificPosts || []} />
    </div>
  );
};

export default UserProfile;