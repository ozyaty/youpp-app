import React from "react";
export const currentUserData = {
  id: 'user1',
  name: 'Current User',
  username: 'currentuser',
  avatar: '',
  bio: 'This is my bio. I love sharing thoughts and connecting with people.',
  location: 'San Francisco, CA',
  website: 'mywebsite.com',
  joinDate: 'September 2023',
  following: 245,
  followers: 189,
  isCurrentUser: true,
  coverImage: true,
};

export const users = [
  {
    id: 'user2',
    name: 'Alex Johnson',
    username: 'alexj',
    avatar: '',
    bio: 'Tech enthusiast and coffee lover. Sharing my thoughts on the latest tech trends.',
    location: 'New York, NY',
    website: 'alexj.dev',
    joinDate: 'March 2022',
    following: 523,
    followers: 1289,
    isFollowing: true,
    isCurrentUser: false,
    coverImage: true,
  },
  {
    id: 'user3',
    name: 'Sarah Miller',
    username: 'sarahm',
    avatar: '',
    bio: 'Photographer and travel enthusiast. Capturing moments around the world.',
    location: 'London, UK',
    website: 'sarahphotos.com',
    joinDate: 'January 2021',
    following: 342,
    followers: 5678,
    isFollowing: false,
    isCurrentUser: false,
    coverImage: true,
  },
  {
    id: 'user4',
    name: 'David Chen',
    username: 'davidc',
    avatar: '',
    bio: 'Software engineer by day, gamer by night. Coding and gaming are my passions.',
    location: 'Seattle, WA',
    website: 'davidcodes.dev',
    joinDate: 'July 2022',
    following: 187,
    followers: 432,
    isFollowing: true,
    isCurrentUser: false,
    coverImage: true,
  }
];

export const suggestedUsers = [
  {
    id: 'user5',
    name: 'Emma Wilson',
    username: 'emmaw',
    avatar: '',
    bio: 'UX Designer and art enthusiast',
    followers: 2345
  },
  {
    id: 'user6',
    name: 'Michael Brown',
    username: 'michaelb',
    avatar: '',
    bio: 'Tech journalist and podcaster',
    followers: 5678
  },
  {
    id: 'user7',
    name: 'Sophia Lee',
    username: 'sophial',
    avatar: '',
    bio: 'Digital marketer and content creator',
    followers: 3456
  }
];