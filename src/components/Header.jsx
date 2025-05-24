import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTelegram } from '@/contexts/TelegramContext';
import { useScrollDirection } from '@/hooks/useScrollDirection';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollDir = useScrollDirection();
  const { headerConfig } = useTelegram();

  const {
    showBackButton = false,
    rightAction = null,
  } = headerConfig;

  const goBack = () => {
    if (location.pathname === '/') return;
    navigate(-1);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-20 w-full h-14 px-4 bg-[#0088cc]/70 text-white shadow-md backdrop-blur-md flex items-center justify-between transition-transform duration-300"
      animate={{ y: scrollDir === 'down' ? -70 : 0 }}
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
