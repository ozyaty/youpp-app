import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Post from '@/components/Post'; // Assuming Post component is in the same directory or correctly pathed

const UserProfileTabs = ({ user, posts }) => {
  const mediaPosts = posts.filter(post => post.image);
  const likedPosts = posts.filter(post => post.liked); // This is a simplification

  return (
    <Tabs defaultValue="posts" className="mt-6">
      <TabsList className="w-full flex bg-transparent border-b border-telegram-divider sticky top-[49px] z-[5] backdrop-blur-sm bg-telegram-bg">
        <TabsTrigger 
          value="posts" 
          className="flex-1 telegram-tab data-[state=active]:telegram-tab-active rounded-none"
        >
          Posts ({posts.filter(p => !p.isRepost).length})
        </TabsTrigger>
        <TabsTrigger 
          value="replies" 
          className="flex-1 telegram-tab data-[state=active]:telegram-tab-active rounded-none"
        >
          Replies
        </TabsTrigger>
        <TabsTrigger 
          value="media" 
          className="flex-1 telegram-tab data-[state=active]:telegram-tab-active rounded-none"
        >
          Media ({mediaPosts.length})
        </TabsTrigger>
        <TabsTrigger 
          value="likes" 
          className="flex-1 telegram-tab data-[state=active]:telegram-tab-active rounded-none"
        >
          Likes ({likedPosts.length})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="posts" className="mt-0 px-0 md:px-4">
         {posts.filter(p => !p.isRepost).length > 0 ? (
            posts.filter(p => !p.isRepost).map((post) => (
              <Post key={`profile-post-${post.id}`} post={post} />
            ))
          ) : (
            <div className="text-center py-8 text-telegram-hint">
              <p>{user.name} hasn't posted anything yet.</p>
            </div>
          )}
      </TabsContent>

      <TabsContent value="replies" className="mt-4 px-4">
        <div className="text-center py-8 text-telegram-hint">
          <p>Replies will appear here.</p>
          <p className="text-xs">(Functionality not fully implemented)</p>
        </div>
      </TabsContent>
      
      <TabsContent value="media" className="mt-4 px-4">
        {mediaPosts.length > 0 ? (
          <div className="grid grid-cols-3 gap-1">
            {mediaPosts.map((post, index) => (
                <div key={`media-${post.id || index}`} className="aspect-square bg-telegram-divider rounded-md overflow-hidden">
                  <img 
                    className="w-full h-full object-cover" 
                    alt={`Media post by ${user.name} ${index + 1}`}
                    src={post.image === true ? `https://source.unsplash.com/random/400x400?sig=${index}` : post.image} />
                </div>
              ))}
          </div>
          ) : (
          <div className="text-center py-8 text-telegram-hint">
            <p>{user.name} hasn't posted any media yet.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="likes" className="mt-4 px-4">
         {likedPosts.length > 0 ? (
            likedPosts.map((post) => (
              <Post key={`liked-post-${post.id}`} post={post} />
            ))
          ) : (
          <div className="text-center py-8 text-telegram-hint">
            <p>Liked posts will appear here.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default UserProfileTabs;