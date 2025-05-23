import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PostHeader = ({ post }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const navigateToAuthorProfile = (e) => {
    e.stopPropagation();
    if (post.author && post.author.id) {
      navigate(`/profile/${post.author.id}`);
    } else {
      console.warn("Author ID is missing, cannot navigate to profile.");
      toast({
        title: "Navigation Error",
        description: "Could not find author profile.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <div className="post-author-link cursor-pointer flex-shrink-0" onClick={navigateToAuthorProfile}>
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.name.replace(/\s/g, '+')}&background=random`} alt={post.author.name} />
          <AvatarFallback className="avatar-fallback-themed">{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="post-author-link cursor-pointer" onClick={navigateToAuthorProfile}>
            <h3 className="font-semibold text-sm hover:underline text-telegram-text">{post.author.name}</h3>
            <p className="text-telegram-hint text-xs">@{post.author.username} · {post.timeAgo}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="post-action-button h-8 w-8 text-telegram-hint">
                <MoreHorizontal size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-telegram-secondary-bg border-telegram-divider text-telegram-text">
              <DropdownMenuItem 
                onClick={(e) => { e.stopPropagation(); navigateToAuthorProfile(e); }} 
                className="hover:bg-telegram-secondary-bg/80 focus:bg-telegram-secondary-bg/80"
              >
                View Post Author
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  toast({ title: "Report Submitted", description: "Thank you for your feedback." });
                }} 
                className="hover:bg-telegram-secondary-bg/80 focus:bg-telegram-secondary-bg/80"
              >
                Report Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default PostHeader;