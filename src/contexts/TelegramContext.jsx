import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { initializeDataHandler } from './telegramActions/dataInitialization';
import { updateUserProfileHandler, toggleFollowUserHandler } from './telegramActions/userActions';
import {
  addPostHandler, quotePostHandler, repostSimpleHandler,
  toggleLikeHandler, toggleBookmarkHandler, addCommentHandler
} from './telegramActions/postActions';
import { markNotificationAsReadHandler } from './telegramActions/notificationActions';
import { showAlertHandler, closeAppHandler } from './telegramActions/telegramWebAppActions';

import {
  currentUser as mockCurrentUserInitial,
  users as mockUsersInitial,
  posts as mockPostsInitial,
  comments as mockCommentsInitial,
  notifications as mockNotificationsInitial,
  trends as mockTrendsInitial,
  suggestedUsers as mockSuggestedUsersInitial
} from '@/data/mockData';

const TelegramContext = createContext();
export const useTelegram = () => useContext(TelegramContext);

export const TelegramProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [trends, setTrends] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [headerConfig, setHeaderConfig] = useState({
    showBackButton: false,
    rightAction: null,
  });

  const navigate = useNavigate();

  const commonSetters = {
    setCurrentUser, setUsers, setPosts, setComments,
    setNotifications, setTrends, setSuggestedUsers, setIsInitialized
  };

  const commonData = {
    mockCurrentUserInitial, mockUsersInitial, mockPostsInitial,
    mockCommentsInitial, mockNotificationsInitial, mockTrendsInitial, mockSuggestedUsersInitial
  };

  const initializeData = useCallback(() => {
    initializeDataHandler(commonSetters, commonData);
  }, []);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const updateUserProfile = useCallback((updatedProfileData) => {
    updateUserProfileHandler(updatedProfileData, setCurrentUser, setUsers);
  }, []);

  const addPost = useCallback((postContent, imageFile) => {
    addPostHandler(postContent, imageFile, currentUser, setPosts, navigate);
  }, [currentUser, navigate]);

  const quotePost = useCallback((originalPost, quoteText) => {
    quotePostHandler(originalPost, quoteText, currentUser, setPosts, navigate);
  }, [currentUser, navigate]);

  const repostSimple = useCallback((originalPost) => {
    repostSimpleHandler(originalPost, currentUser, setPosts);
  }, [currentUser]);

  const toggleLike = useCallback((postId) => {
    toggleLikeHandler(postId, setPosts);
  }, []);

  const toggleBookmark = useCallback((postId) => {
    toggleBookmarkHandler(postId, setCurrentUser, setPosts);
  }, []);

  const addComment = useCallback((postId, commentText) => {
    addCommentHandler(postId, commentText, currentUser, setComments, setPosts);
  }, [currentUser]);

  const toggleFollowUser = useCallback((userIdToFollow) => {
    toggleFollowUserHandler(userIdToFollow, currentUser, users, setUsers, setCurrentUser);
  }, [currentUser, users]);

  const markNotificationAsRead = useCallback((notificationId) => {
    markNotificationAsReadHandler(notificationId, setNotifications);
  }, []);

  const showAlert = useCallback((message, callback) => {
    showAlertHandler(message, callback);
  }, []);

  const closeApp = useCallback(() => {
    closeAppHandler();
  }, []);

  const value = {
    currentUser,
    users,
    posts,
    comments,
    notifications,
    trends,
    suggestedUsers,
    isInitialized,
    headerConfig,
    setHeaderConfig,
    actions: {
      updateUserProfile,
      addPost,
      quotePost,
      repostSimple,
      toggleLike,
      toggleBookmark,
      addComment,
      toggleFollowUser,
      markNotificationAsRead,
      initializeData,
      showAlert,
      closeApp,
    },
  };

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};
