import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import PostHeader from '@/components/post/PostHeader';
import PostContent from '@/components/post/PostContent';
import PostActions from '@/components/post/PostActions';
import RepostDialog from '@/components/post/RepostDialog';


const Post = ({ post, isDetailed = false }) => {
  const navigate = useNavigate();
  const [showRepostDialog, setShowRepostDialog] = React.useState(false);

  const handlePostClick = (e) => {
    if (!isDetailed) {
      const target = e.target;
      const isAuthorClick = target.closest('.post-author-link');
      const isActionClick = target.closest('.post-action-button'); // includes menu trigger
      const isMenuContent = target.closest('[role="menu"]');


      if (!isAuthorClick && !isActionClick && !isMenuContent) {
         navigate(`/post/${post.id}`);
      }
    }
  };
  
  return (
    <>
      <motion.div 
        className={`post-container telegram-card ${post.isRepost ? 'border-l-4 border-green-500 pl-3' : ''} ${!isDetailed && 'cursor-pointer'}`}
        onClick={handlePostClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={!isDetailed ? { backgroundColor: 'rgba(var(--telegram-secondary-bg-color-rgb), 0.3)' } : {}}
      >
        <div className="flex items-start space-x-3">
          <PostHeader post={post} />
        </div>
        <PostContent post={post} isDetailed={isDetailed} />
        <PostActions post={post} isDetailed={isDetailed} onRepostClick={() => setShowRepostDialog(true)} />
      </motion.div>

      <RepostDialog
        post={post}
        isOpen={showRepostDialog}
        onOpenChange={setShowRepostDialog}
      />
    </>
  );
};

export default Post;