import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { useTelegram } from '@/contexts/TelegramContext';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AccountDetailsPage = () => {
  const { currentUser, updateUserProfile } = useTelegram();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: currentUser?.name || '',
    username: currentUser?.username || '',
    email: currentUser?.email || 'test@example.com', 
    phone: currentUser?.phone || '+1234567890', 
    bio: currentUser?.bio || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    toast({
      title: "Account Updated",
      description: "Your account details have been saved.",
    });
  };

  if (!currentUser) {
    return (
      <div>
        <Header title="Account Details" showBackButton />
        <div className="p-4 text-center">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="pb-4">
      <Header title="Account Details" showBackButton />
      <motion.div
        className="p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center mb-6">
          <Avatar className="h-24 w-24 mb-3">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback className="text-3xl">{currentUser.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold text-telegram-text">{currentUser.name}</h2>
          <p className="text-sm text-telegram-hint">@{currentUser.username}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-telegram-hint">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="telegram-input"
            />
          </div>
          <div>
            <Label htmlFor="username" className="text-telegram-hint">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="telegram-input"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-telegram-hint">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="telegram-input"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-telegram-hint">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="telegram-input"
              placeholder="+1 234 567 8900"
            />
          </div>
          <div>
            <Label htmlFor="bio" className="text-telegram-hint">Bio</Label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="telegram-input w-full"
              placeholder="Tell us about yourself..."
            />
          </div>
          <Button type="submit" className="w-full telegram-button">
            Save Changes
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AccountDetailsPage;