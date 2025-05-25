import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTelegram } from '@/contexts/TelegramContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { headerConfig } = useTelegram();

  const {
    showBackButton = false,
    rightAction = null
  } = headerConfig;

  const goBack = () => {
    if (location.pathname === '/') return;
    navigate(-1);
  };

  return (
    <motion.header
      className="fixed top-[env(safe-area-inset-top)] left-0 right-0 z-50 h-14 px-4 bg-[#0088cc]/70 text-white shadow-md backdrop-blur-md flex items-center justify-between"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {showBackButton && (
        <button
          onClick={goBack}
          className="z-10 text-white p-1"
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
        <img src="/youpp-logo.png" alt="Youpp Logo" className="h-12 object-contain" />
      </div>

      {rightAction && (
        <div className="z-10">
          {rightAction}
        </div>
      )}
    </motion.header>
  );
};

export default Header;
