import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };
  
  const clearSearch = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };
  
  return (
    <motion.div 
      className="relative px-4 py-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search 
            size={18} 
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
              isFocused ? 'text-telegram-blue' : 'text-telegram-secondaryText'
            }`} 
          />
          
          <Input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="pl-10 pr-10 bg-telegram-divider/30 border-none focus:ring-1 focus:ring-telegram-blue"
          />
          
          <AnimatePresence>
            {query && (
              <motion.button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-telegram-secondaryText hover:text-telegram-text"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <X size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar;