import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Repeat, Bookmark, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTelegram } from '@/contexts/TelegramContext';

const PostActions = ({ post, isDetailed, onRepostClick }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updatePost, currentUser, updateUserProfile } = useTelegram();

  const handleLike = (e) => {
    e.stopPropagation();
    const newLikedState = !post.liked;
    const newLikesCount = newLikedState ? post.likes + 1 : post.likes - 1;
    updatePost({ ...post, liked: newLikedState, likes: newLikesCount });
    toast({
      title: newLikedState ? "Post liked" : "Post unliked",
    });
  };

  const handleComment = (e) => {
    e.stopPropagation();
    if (!isDetailed) {
      navigate(`/post/${post.id}`);
    } else {
      // Focus comment input if on detailed page
      document.getElementById('comment-input')?.focus();
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.author.name}`,
        text: post.content.substring(0, 100) + "...",
        url: `${window.location.origin}/post/${post.id}`,
      })
      .then(() => toast({ title: "Shared successfully!"}))
      .catch((error) => toast({ title: "Share failed", description: error.message, variant: "destructive" }));
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
      toast({
        title: "Link Copied",
        description: "Post link copied to clipboard.",
      });
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    if (!currentUser) return;

    const isBookmarked = currentUser.bookmarkedPosts?.includes(post.id);
    let updatedBookmarks;

    if (isBookmarked) {
      updatedBookmarks = currentUser.bookmarkedPosts.filter(id => id !== post.id);
    } else {
      updatedBookmarks = [...(currentUser.bookmarkedPosts || []), post.id];
    }
    updateUserProfile({ ...currentUser, bookmarkedPosts: updatedBookmarks });
    toast({
      title: isBookmarked ? "Removed from Bookmarks" : "Added to Bookmarks",
    });
  };

  const isBookmarked = currentUser?.bookmarkedPosts?.includes(post.id);

  return (
    <div className="flex justify-between items-center mt-4 ml-12 pl-1">
      <Button 
        variant="ghost" 
        size="sm" 
        className="post-action-button"
        onClick={handleLike}
      >
        <Heart className={post.liked ? "heart-icon-active" : ""} />
        <span>{post.likes}</span>
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="post-action-button"
        onClick={handleComment}
      >
        <MessageCircle />
        <span>{post.comments}</span>
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="post-action-button"
        onClick={(e) => {e.stopPropagation(); onRepostClick();}}
      >
        <Repeat className={post.reposted ? "repost-icon-active" : ""} />
        <span>{post.reposts}</span>
      </Button>

      <Button 
        variant="ghost" 
        size="sm" 
        className="post-action-button"
        onClick={handleBookmark}
      >
        <Bookmark className={isBookmarked ? "bookmark-icon-active" : ""} />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="post-action-button"
        onClick={handleShare}
      >
        <Share />
      </Button>
    </div>
  );
};

export default PostActions;