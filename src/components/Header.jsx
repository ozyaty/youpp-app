import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ title, showBackButton = false, rightAction = null }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (location.pathname === '/') return;
    navigate(-1);
  };

  return (
    <motion.header
      className="relative w-full h-14 px-4 bg-[#0088cc] text-white shadow-md flex items-center justify-between"
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
        <img src="/youpp-logo.png" alt="Youpp Logo" className="h-8 object-contain" />
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
