import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, MessageSquare, Bell, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollDirection = useScrollDirection();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/explore', icon: Search, label: 'Explore' },
    { path: '/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <motion.div
      className={`fixed bottom-0 left-0 right-0 z-20 backdrop-blur-md bg-white/90 border-t border-telegram-divider flex justify-around py-2 px-1`}
      animate={{
        opacity: scrollDirection === 'down' ? 0.6 : 1,
        y: scrollDirection === 'down' ? 10 : 0,
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path === '/profile' && location.pathname.startsWith('/profile/'));
        const IconComponent = item.icon;

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center p-2 relative w-1/5 ${
              isActive ? 'text-telegram-blue' : 'text-telegram-secondaryText'
            }`}
          >
            <IconComponent size={24} />
            <span className="text-xs mt-1">{item.label}</span>
            {isActive && (
              <motion.div
                layoutId="bottomNavIndicator"
                className="absolute bottom-0 w-12 h-0.5 bg-telegram-blue rounded-t-full"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </motion.div>
  );
};

export default BottomNavigation;
