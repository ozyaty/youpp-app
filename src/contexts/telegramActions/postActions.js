import { generateId } from './dataInitialization';

export const addPostHandler = (postContent, imageFile, currentUser, setPosts, navigate) => {
  if (!currentUser) {
    console.error("Cannot add post: currentUser is null.");
    return;
  }
  const newPost = {
    id: generateId(),
    author: {
      id: currentUser.id,
      name: currentUser.name,
      username: currentUser.username,
      avatar: currentUser.avatar,
    },
    content: postContent,
    image: imageFile ? URL.createObjectURL(imageFile) : null,
    imageFile: imageFile ? imageFile.name : null, 
    timeAgo: 'Just now',
    likes: 0,
    comments: 0,
    reposts: 0,
    liked: false,
    reposted: false,
    bookmarked: false,
  };
  setPosts(prevPosts => {
    const updatedPosts = [newPost, ...prevPosts];
    localStorage.setItem('telegramPosts', JSON.stringify(updatedPosts));
    return updatedPosts;
  });
  navigate('/');
};

export const quotePostHandler = (originalPost, quoteText, currentUser, setPosts, navigate) => {
  if (!currentUser) {
    console.error("Cannot quote post: currentUser is null.");
    return;
  }
  const newPost = {
    id: generateId(),
    author: {
      id: currentUser.id,
      name: currentUser.name,
      username: currentUser.username,
      avatar: currentUser.avatar,
    },
    content: quoteText,
    image: null,
    timeAgo: 'Just now',
    likes: 0,
    comments: 0,
    reposts: 0,
    liked: false,
    reposted: false,
    bookmarked: false,
    isQuote: true,
    originalPost: {
      id: originalPost.id,
      author: originalPost.author,
      content: originalPost.content,
      image: originalPost.image,
    }
  };
    setPosts(prevPosts => {
    const updatedPosts = [newPost, ...prevPosts];
    localStorage.setItem('telegramPosts', JSON.stringify(updatedPosts));
    return updatedPosts;
  });
  navigate('/');
};

export const repostSimpleHandler = (originalPost, currentUser, setPosts) => {
  if (!currentUser) {
    console.error("Cannot repost: currentUser is null.");
    return;
  }
  const newPost = {
    id: generateId(),
    author: {
      id: currentUser.id,
      name: currentUser.name,
      username: currentUser.username,
      avatar: currentUser.avatar,
    },
    content: `Reposted from @${originalPost.author.username}`,
    image: null,
    timeAgo: 'Just now',
    likes: 0,
    comments: 0,
    reposts: 0,
    liked: false,
    reposted: false, 
    bookmarked: false,
    isRepost: true,
    originalPost: {
      id: originalPost.id,
      author: originalPost.author,
      content: originalPost.content,
      image: originalPost.image,
    }
  };
  
  let updatedOriginalPost = null;
  setPosts(prevPosts => {
    const postsWithNewRepost = [newPost, ...prevPosts];
    const finalPosts = postsWithNewRepost.map(p => {
      if (p.id === originalPost.id) {
        updatedOriginalPost = { ...p, reposts: (p.reposts || 0) + 1, reposted: true };
        return updatedOriginalPost;
      }
      return p;
    });
    localStorage.setItem('telegramPosts', JSON.stringify(finalPosts));
    return finalPosts;
  });
};

export const toggleLikeHandler = (postId, setPosts) => {
  setPosts(prevPosts => {
    const updatedPosts = prevPosts.map(post => {
      if (post.id === postId) {
        const newLikedState = !post.liked;
        const newLikesCount = newLikedState ? post.likes + 1 : Math.max(0, post.likes - 1);
        return { ...post, liked: newLikedState, likes: newLikesCount };
      }
      return post;
    });
    localStorage.setItem('telegramPosts', JSON.stringify(updatedPosts));
    return updatedPosts;
  });
};

export const toggleBookmarkHandler = (postId, setCurrentUser, setPosts) => {
  let updatedBookmarkedPostsIds = [];
  setCurrentUser(prevUser => {
    const isBookmarked = prevUser.bookmarkedPosts?.includes(postId);
    if (isBookmarked) {
      updatedBookmarkedPostsIds = prevUser.bookmarkedPosts.filter(id => id !== postId);
    } else {
      updatedBookmarkedPostsIds = [...(prevUser.bookmarkedPosts || []), postId];
    }
    const updatedUser = { ...prevUser, bookmarkedPosts: updatedBookmarkedPostsIds };
    localStorage.setItem('telegramCurrentUser', JSON.stringify(updatedUser));
    return updatedUser;
  });

  setPosts(prevPosts => {
    const updatedPosts = prevPosts.map(post => 
      post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
    );
    localStorage.setItem('telegramPosts', JSON.stringify(updatedPosts));
    return updatedPosts;
  });
};

export const addCommentHandler = (postId, commentText, currentUser, setComments, setPosts) => {
  if (!currentUser) {
    console.error("Cannot add comment: currentUser is null.");
    return;
  }
  const newComment = {
    id: generateId(),
    postId,
    author: {
      id: currentUser.id,
      name: currentUser.name,
      username: currentUser.username,
      avatar: currentUser.avatar,
    },
    content: commentText,
    timeAgo: 'Just now',
    likes: 0,
    liked: false,
  };
  setComments(prevComments => {
    const updatedComments = [newComment, ...prevComments];
    localStorage.setItem('telegramComments', JSON.stringify(updatedComments));
    return updatedComments;
  });
  setPosts(prevPosts => {
    const updatedPosts = prevPosts.map(post => 
      post.id === postId ? { ...post, comments: (post.comments || 0) + 1 } : post
    );
    localStorage.setItem('telegramPosts', JSON.stringify(updatedPosts));
    return updatedPosts;
  });
};