import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const CreatePostButton = () => {
  const navigate = useNavigate();
  
  return (
    <motion.button
      className="fixed bottom-20 right-4 bg-telegram-blue text-white rounded-full p-4 shadow-lg z-20"
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