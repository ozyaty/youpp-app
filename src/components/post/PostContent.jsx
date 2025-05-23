import React from 'react';

const PostContent = ({ post, isDetailed }) => {
  return (
    <div className={`mt-2 ml-12 pl-1 ${isDetailed ? '' : 'pointer-events-none'}`}>
      <p className="text-sm whitespace-pre-wrap text-telegram-text">{post.content}</p>
      
      {post.image && (
        <div className="mt-3 rounded-lg overflow-hidden border border-telegram-divider">
          <img
            className="w-full h-auto object-cover" 
            alt={`Post image by ${post.author.name}`}
            src={post.image === true ? "https://images.unsplash.com/photo-1697256200022-f61abccad430" : post.image} />
        </div>
      )}
    </div>
  );
};

export default PostContent;