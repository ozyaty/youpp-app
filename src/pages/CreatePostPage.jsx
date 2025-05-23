import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useTelegram } from '@/contexts/TelegramContext';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser, addPost } = useTelegram();
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    if (!content.trim() && !imagePreview) {
      toast({
        title: "Error",
        description: "Please add some text or an image to your post.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
      },
      content: content.trim(),
      image: imagePreview, 
      timeAgo: 'just now',
      likes: 0,
      comments: 0,
      reposts: 0,
      liked: false,
      reposted: false,
    };

    addPost(newPost);
    
    toast({
      title: "Success",
      description: "Your post has been published!",
    });
    setIsSubmitting(false);
    navigate('/');
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    const imageUploadInput = document.getElementById('image-upload');
    if(imageUploadInput) imageUploadInput.value = "";
  };
  
  return (
    <div>
      <Header 
        title="New Post" 
        showBackButton 
        rightAction={
          <Button 
            onClick={handleSubmit}
            disabled={(!content.trim() && !imagePreview) || isSubmitting}
            className="bg-telegram-blue hover:bg-telegram-darkBlue text-white"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : null}
            Post
          </Button>
        }
      />
      
      <motion.div 
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${currentUser?.name}&background=random`} alt={currentUser?.name} />
            <AvatarFallback>{currentUser?.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <Textarea
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border-none resize-none focus:ring-0 p-0 text-base bg-transparent"
              rows={5}
              autoFocus
            />
            
            {imagePreview && (
              <motion.div 
                className="relative mt-3 rounded-lg overflow-hidden border border-telegram-divider"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <img  
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-auto rounded-lg object-contain max-h-96"
                 />
                <button 
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80 transition-colors"
                >
                  <X size={18} />
                </button>
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="mt-4 border-t border-telegram-divider pt-4 flex justify-between items-center">
          <div>
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-telegram-blue hover:bg-telegram-blue/10 transition-colors">
                <Image size={20} />
              </div>
            </label>
            <input 
              type="file" 
              id="image-upload" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload}
            />
          </div>
          
          <div className="text-sm text-telegram-secondaryText">
            {content.length > 0 && (
              <span>{content.length} characters</span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreatePostPage;