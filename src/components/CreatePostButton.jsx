import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const CreatePostButton = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      className="fixed right-4 z-30 bg-telegram-blue text-white rounded-full p-4 shadow-lg"
      style={{
        bottom: `calc(4.5rem + env(safe-area-inset-bottom))`, // float above BottomNav + inset
        WebkitBottom: `calc(4.5rem + env(safe-area-inset-bottom))`
      }}
      onClick={() => navigate('/create')}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <Plus size={24} />
    </motion.button>
  );
};

export default CreatePostButton;
