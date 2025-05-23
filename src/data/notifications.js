import React from "react";
export const notifications = [
  {
    id: 'notif1',
    user: {
      id: 'user2',
      name: 'Alex Johnson',
      username: 'alexj',
      avatar: ''
    },
    type: 'like',
    message: 'liked your post',
    content: 'Working on a new project. Can\'t wait to share it with everyone!',
    timeAgo: '2h',
    unread: true,
    postId: 'post4'
  },
  {
    id: 'notif2',
    user: {
      id: 'user3',
      name: 'Sarah Miller',
      username: 'sarahm',
      avatar: ''
    },
    type: 'follow',
    message: 'started following you',
    timeAgo: '5h',
    unread: true,
    userId: 'user3'
  },
  {
    id: 'notif3',
    user: {
      id: 'user4',
      name: 'David Chen',
      username: 'davidc',
      avatar: ''
    },
    type: 'comment',
    message: 'commented on your post',
    content: 'Looks great! Looking forward to seeing it.',
    timeAgo: '1d',
    unread: false,
    postId: 'post4'
  },
  {
    id: 'notif4',
    user: {
      id: 'user2',
      name: 'Alex Johnson',
      username: 'alexj',
      avatar: ''
    },
    type: 'repost',
    message: 'reposted your post',
    content: 'Working on a new project. Can\'t wait to share it with everyone!',
    timeAgo: '2d',
    unread: false,
    postId: 'post4'
  }
];