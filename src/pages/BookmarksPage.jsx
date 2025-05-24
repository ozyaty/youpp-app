import React, { useEffect } from 'react';
import Post from '@/components/Post';
import { useTelegram } from '@/contexts/TelegramContext';
import { motion } from 'framer-motion';
import { BookmarkX } from 'lucide-react';

const BookmarksPage = () => {
  const { posts, currentUser, setHeaderConfig } = useTelegram();

  useEffect(() => {
    setHeaderConfig({ title: 'Bookmarks', showBackButton: true });

    return () => {
      setHeaderConfig({ title: null, showBackButton: false, rightAction: null });
    };
  }, [setHeaderConfig]);

  const bookmarkedPosts = posts.filter(post =>
    currentUser?.bookmarkedPosts?.includes(post.id)
  );

  return (
    <div className="pb-16">
      <motion.div
        className="p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {bookmarkedPosts.length > 0 ? (
          <div className="space-y-4">
            {bookmarkedPosts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] text-telegram-hint">
            <BookmarkX size={64} className="mb-4" />
            <h2 className="text-xl font-semibold text-telegram-text">No Bookmarks Yet</h2>
            <p className="text-center mt-2">
              You haven't bookmarked any posts.
              <br />
              Tap the bookmark icon on a post to save it here.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BookmarksPage;
