import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Repeat, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTelegram } from '@/contexts/TelegramContext';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const RepostDialog = ({ post, isOpen, onOpenChange }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updatePost, currentUser, addPost: createNewPost } = useTelegram();

  const handleSimpleRepost = () => {
    const newRepostedState = !post.reposted; // This might need adjustment based on actual repost logic
    const newRepostsCount = post.reposts + 1; // Always increment for a new repost
    updatePost({ ...post, reposted: true, reposts: newRepostsCount }); // Mark original as having been reposted
    
    if (currentUser) {
        const repostContent = `Reposted from @${post.author.username}:\n\n"${post.content.substring(0,100)}${post.content.length > 100 ? '...' : ''}"`;
        const newPost = {
            id: `repost-${post.id}-${Date.now()}`,
            author: currentUser,
            content: repostContent,
            originalPostId: post.id,
            image: post.image, 
            timeAgo: 'just now',
            likes: 0,
            comments: 0,
            reposts: 0,
            liked: false,
            repostedByCurrentUser: true, // Indicate current user made this repost
            isRepost: true,
            createdAt: new Date().toISOString(),
        };
        createNewPost(newPost);
    }

    toast({
      title: "Reposted",
    });
    onOpenChange(false);
  };

  const handleQuoteRepost = () => {
    navigate('/create', { state: { quotingPost: post } });
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-telegram-secondary-bg border-telegram-divider">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-telegram-text">Repost Options</AlertDialogTitle>
          <AlertDialogDescription className="text-telegram-hint">
            Choose how you want to share this post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-col sm:space-x-0 gap-2">
          <Button 
            className="w-full telegram-button bg-green-500 hover:bg-green-600 text-white"
            onClick={(e) => { e.stopPropagation(); handleSimpleRepost(); }}
          >
            <Repeat size={16} className="mr-2" /> Repost
          </Button>
          <Button 
            variant="outline" 
            className="w-full telegram-button-secondary border-telegram-button-color text-telegram-button-color hover:bg-telegram-button-color/10"
            onClick={(e) => { e.stopPropagation(); handleQuoteRepost(); }}
          >
            <Edit2 size={16} className="mr-2" /> Quote
          </Button>
          <AlertDialogCancel 
            className="w-full mt-2 telegram-button-secondary border-telegram-hint text-telegram-hint hover:bg-telegram-hint/10"
            onClick={(e) => e.stopPropagation()}
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RepostDialog;