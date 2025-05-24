import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import UserProfile from '@/components/UserProfile';
import Post from '@/components/Post';
import { useTelegram } from '@/contexts/TelegramContext';
import { Menu, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ProfilePage = () => {
  const { id: profileId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    currentUser,
    posts: allPosts,
    updateUserProfile,
    users: contextUsers,
    isInitialized,
    setHeaderConfig
  } = useTelegram();

  const [profileUser, setProfileUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isInitialized) {
      setIsLoading(true);
      return;
    }

    setIsLoading(true);
    const allAvailableUsers = [...contextUsers];
    if (currentUser && !allAvailableUsers.find(u => u.id === currentUser.id)) {
      allAvailableUsers.push(currentUser);
    }

    let targetUser;
    const effectiveProfileId = profileId || currentUser?.id?.toString();

    if (!effectiveProfileId) {
      toast({ title: "Error", description: "Could not determine user profile to display.", variant: "destructive" });
      setIsLoading(false);
      navigate('/');
      return;
    }

    if (effectiveProfileId === currentUser?.id?.toString()) {
      targetUser = { ...currentUser, isCurrentUser: true };
    } else {
      const foundUser = allAvailableUsers.find(u => u.id.toString() === effectiveProfileId);
      if (foundUser) {
        targetUser = { ...foundUser, isCurrentUser: false };
      } else {
        toast({ title: "User not found", description: "The requested profile could not be loaded.", variant: "destructive" });
        setIsLoading(false);
        navigate(`/profile/${currentUser.id}`);
        return;
      }
    }

    setProfileUser(targetUser);
    setUserPosts(allPosts.filter(post => post.author.id === targetUser.id));
    setIsLoading(false);

    // Set header config based on profile type
    setHeaderConfig({
      showBackButton: !targetUser.isCurrentUser,
      rightAction: targetUser.isCurrentUser ? (
        <Button variant="ghost" size="icon" className="text-white" onClick={() => navigate('/menu')}>
          <Menu size={24} />
        </Button>
      ) : (
        <Button variant="ghost" size="icon" className="text-white" onClick={handleMessageUser}>
          <MessageSquare size={24} />
        </Button>
      )
    });

    // Reset header when leaving page
    return () => {
      setHeaderConfig({ showBackButton: false, rightAction: null });
    };

  }, [profileId, currentUser, allPosts, contextUsers, navigate, toast, isInitialized, setHeaderConfig]);

  const isOwnProfile = profileUser?.id === currentUser?.id;

  const handleMessageUser = () => {
    toast({
      title: `Message ${profileUser.name}`,
      description: `Starting a new conversation with ${profileUser.name}. (Functionality not fully implemented)`,
    });
    navigate('/messages');
  };

  if (isLoading || !profileUser) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="w-12 h-12 border-4 border-telegram-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <UserProfile
          user={profileUser}
          posts={userPosts}
          onUpdateProfile={isOwnProfile ? updateUserProfile : null}
        />

        <div className="px-4 mt-4">
          {userPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}

          {userPosts.length === 0 && (
            <div className="text-center py-8 text-telegram-secondaryText">
              <p>{profileUser.name} hasn't posted anything yet.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
