import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Post from '@/components/Post';
import Comment from '@/components/Comment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useTelegram } from '@/contexts/TelegramContext';
import PageWrapper from '@/components/PageWrapper';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { telegramUser, posts: allPosts, comments: allComments, addComment, currentUser, setHeaderConfig } = useTelegram();

  const [post, setPost] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    setHeaderConfig({ title: 'Post', showBackButton: true });
    return () => {
      setHeaderConfig({ title: null, showBackButton: false, rightAction: null });
    };
  }, [setHeaderConfig]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const foundPost = allPosts.find(p => p.id === id);
      if (foundPost) {
        setPost(foundPost);
        setPostComments(
          allComments
            .filter(c => c.postId === id)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } else {
        toast({
          title: "Post not found",
          description: "The post you are looking for could not be found.",
          variant: "destructive"
        });
        navigate('/');
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id, allPosts, allComments, navigate, toast]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim() || !post) return;

    const commentAuthor = currentUser || {
      id: telegramUser?.id?.toString() || 'guestUser',
      name: telegramUser?.first_name ? `${telegramUser.first_name} ${telegramUser.last_name || ''}`.trim() : 'Guest User',
      username: telegramUser?.username || 'guest',
      avatar: telegramUser?.photo_url || ''
    };

    const newCommentObj = {
      id: `comment-${Date.now()}`,
      postId: post.id,
      author: commentAuthor,
      content: newCommentText,
      timeAgo: 'just now',
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false
    };

    addComment(newCommentObj);
    setPostComments(prev => [newCommentObj, ...prev]);
    setNewCommentText('');

    toast({
      title: "Comment added",
      description: "Your comment has been added to the post",
    });
  };

  const displayAuthor = currentUser || {
    name: telegramUser?.first_name || 'You',
    avatar: telegramUser?.photo_url || '',
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-2 border-telegram-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      </PageWrapper>
    );
  }

  if (!post) {
    return (
      <PageWrapper>
        <div className="p-4 text-center">
          <p>The post you're looking for doesn't exist or has been removed.</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="p-4">
        <Post post={post} isDetailed />

        <div className="mt-4">
          <form onSubmit={handleAddComment} className="flex items-center space-x-2 mb-4">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src={displayAuthor.avatar} alt={displayAuthor.name} />
              <AvatarFallback>{displayAuthor.name?.charAt(0)}</AvatarFallback>
            </Avatar>

            <Input
              type="text"
              placeholder="Add a comment..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="flex-1 bg-telegram-divider/30 border-none"
            />

            <Button
              type="submit"
              disabled={!newCommentText.trim()}
              className="bg-telegram-blue hover:bg-telegram-darkBlue text-white"
            >
              Post
            </Button>
          </form>

          <h3 className="font-semibold mb-2">Comments ({postComments.length})</h3>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {}
            }}
          >
            {postComments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}

            {postComments.length === 0 && (
              <div className="text-center py-8 text-telegram-secondaryText">
                <p>No comments yet</p>
                <p className="text-sm mt-2">Be the first to comment on this post</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default PostDetailPage;
