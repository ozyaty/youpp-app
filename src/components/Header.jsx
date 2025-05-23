import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ title, showBackButton = false, rightAction = null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const goBack = () => {
    if (location.pathname === '/') {
      // Potentially do nothing or navigate to a specific page if on home and back is pressed
      return;
    }
    navigate(-1);
  };
  
  return (
    <motion.header 
      className="telegram-header"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center flex-1 min-w-0"> {/* min-w-0 is important for truncate to work */}
        {showBackButton && (
          <button 
            onClick={goBack}
            className="mr-3 text-white -ml-2 p-1" // Adjusted margin for better alignment
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        {/* Title is now always on the left, and will truncate if too long */}
        <h1 className="text-lg font-bold truncate">{title || 'Telegram Social'}</h1>
      </div>
      
      {/* rightAction is for icons or buttons, not for the title */}
      {rightAction && (
        <div className="ml-auto flex-shrink-0 pl-2"> {/* Added pl-2 for spacing */}
          {rightAction}
        </div>
      )}
    </motion.header>
  );
};

export default Header;