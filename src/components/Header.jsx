import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ title, showBackButton = false, rightAction = null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const goBack = () => {
    if (location.pathname === '/') {
      return;
    }
    navigate(-1);
  };

  return (
    <motion.header 
    className="telegram-header flex items-center justify-between px-4 py-2 bg-[#0088cc] text-white shadow-md"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center flex-1 min-w-0">
        {showBackButton && (
          <button 
            onClick={goBack}
            className="mr-3 text-black -ml-2 p-1"
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="text-lg font-bold truncate sm:block hidden">
          {title || 'Telegram Social'}
        </h1>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <img src="/youpp-logo.png" alt="Youpp Logo" className="h-10" />
      </div>

      {rightAction && (
        <div className="ml-auto flex-shrink-0 pl-2">
          {rightAction}
        </div>
      )}
    </motion.header>
  );
};

export default Header;
