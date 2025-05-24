import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Post from '@/components/Post';
import CreatePostButton from '@/components/CreatePostButton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useTelegram } from '@/contexts/TelegramContext';

const HomePage = () => {
  const { posts: feedPosts, currentUser, setHeaderConfig } = useTelegram();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set header config when component mounts
    setHeaderConfig({
      title: 'Home',
      showBackButton: false,
      rightAction: null,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); 
    return () => clearTimeout(timer);
  }, [setHeaderConfig]);

  const followingPosts = feedPosts.filter(post => post.author.id !== currentUser?.id);

  return (
    <div className="pb-16">
      <Tabs defaultValue="foryou" className="w-full">
        <TabsList className="w-full flex bg-transparent border-b border-telegram-divider">
          <TabsTrigger 
            value="foryou" 
            className="flex-1 telegram-tab data-[state=active]:telegram-tab-active"
          >
            For You
          </TabsTrigger>
          <TabsTrigger 
            value="following" 
            className="flex-1 telegram-tab data-[state=active]:telegram-tab-active"
          >
            Following
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="foryou" className="mt-2 px-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-2 border-telegram-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : feedPosts.length === 0 ? (
            <div className="text-center py-16 text-telegram-secondaryText">
              <p className="text-lg">No posts yet.</p>
              <p>Be the first to share something!</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: {},
              }}
            >
              {feedPosts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </motion.div>
          )}
        </TabsContent>
        
        <TabsContent value="following" className="mt-2 px-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-2 border-telegram-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : followingPosts.length === 0 ? (
            <div className="text-center py-16 text-telegram-secondaryText">
              <p className="text-lg">Nothing from your followed accounts yet.</p>
              <p>Explore to find new people to follow!</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: {},
              }}
            >
              {followingPosts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </motion.div>
          )}
        </TabsContent>
      </Tabs>

      <CreatePostButton />
    </div>
  );
};

export default HomePage;
