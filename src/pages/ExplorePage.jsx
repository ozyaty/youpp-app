import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '@/components/SearchBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { trends, suggestedUsers, posts } from '@/data/mockData';

const ExplorePage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      toast({
        title: "Search",
        description: `Searching for "${query}"`,
      });
    }
  };
  
  const handleFollow = (user) => {
    toast({
      title: `Following ${user.name}`,
      description: `You are now following ${user.name}`,
    });
  };
  
  if (isLoading) {
    return (
      <div>
        <SearchBar onSearch={handleSearch} />
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-2 border-telegram-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pb-16">
      <SearchBar onSearch={handleSearch} />
      
      {searchQuery ? (
        <div className="p-4">
          <p className="text-telegram-secondaryText mb-4">
            Search results for "{searchQuery}"
          </p>
          <div className="text-center py-8 text-telegram-secondaryText">
            <p>No results found</p>
            <p className="text-sm mt-2">Try searching for something else</p>
          </div>
        </div>
      ) : (
        <>
          {/* Trending Topics */}
          <section className="mt-4 px-4">
            <h2 className="text-lg font-bold mb-3">Trending Topics</h2>
            <div className="bg-white rounded-lg shadow-sm border border-telegram-divider overflow-hidden">
              {trends.map((trend, index) => (
                <motion.div 
                  key={trend.id}
                  className={`p-4 ${index !== trends.length - 1 ? 'border-b border-telegram-divider' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(0, 136, 204, 0.05)' }}
                >
                  <h3 className="font-semibold text-telegram-blue">{trend.name}</h3>
                  <p className="text-sm text-telegram-secondaryText">{trend.posts.toLocaleString()} posts</p>
                </motion.div>
              ))}
            </div>
          </section>
          
          {/* Suggested Users */}
          <section className="mt-6 px-4">
            <h2 className="text-lg font-bold mb-3">Who to Follow</h2>
            <div className="bg-white rounded-lg shadow-sm border border-telegram-divider overflow-hidden">
              {suggestedUsers.map((user, index) => (
                <motion.div 
                  key={user.id}
                  className={`p-4 flex items-center justify-between ${index !== suggestedUsers.length - 1 ? 'border-b border-telegram-divider' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(0, 136, 204, 0.05)' }}
                >
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-telegram-secondaryText">@{user.username}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-telegram-blue hover:bg-telegram-darkBlue text-white"
                    onClick={() => handleFollow(user)}
                  >
                    Follow
                  </Button>
                </motion.div>
              ))}
            </div>
          </section>
          
          {/* Popular Photos */}
          <section className="mt-6 px-4 pb-4">
            <h2 className="text-lg font-bold mb-3">Popular Photos</h2>
            <div className="grid grid-cols-2 gap-2">
              {posts
                .filter(post => post.image)
                .slice(0, 4)
                .map((post, index) => (
                  <motion.div 
                    key={post.id}
                    className="aspect-square bg-telegram-divider rounded-lg overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <img  
                      className="w-full h-full object-cover" 
                      alt={`Popular photo by ${post.author.name}`}
                      src="https://images.unsplash.com/photo-1595799640363-f4d34dc9e915" 
                    />
                  </motion.div>
                ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ExplorePage;
