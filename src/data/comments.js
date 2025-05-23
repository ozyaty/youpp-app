import React from "react";
export const comments = [
  {
    id: 'comment1',
    postId: 'post1',
    author: {
      id: 'user3',
      name: 'Sarah Miller',
      username: 'sarahm',
      avatar: ''
    },
    content: 'I need to try this place! What\'s it called?',
    timeAgo: '1h',
    likes: 5,
    liked: false
  },
  {
    id: 'comment2',
    postId: 'post1',
    author: {
      id: 'user4',
      name: 'David Chen',
      username: 'davidc',
      avatar: ''
    },
    content: 'Their pastries are amazing too!',
    timeAgo: '45m',
    likes: 3,
    liked: true
  },
  {
    id: 'comment3',
    postId: 'post2',
    author: {
      id: 'user1',
      name: 'Current User',
      username: 'currentuser',
      avatar: ''
    },
    content: 'Stunning photo! What camera do you use?',
    timeAgo: '3h',
    likes: 7,
    liked: false
  }
];