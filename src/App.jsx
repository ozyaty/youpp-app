import Header from './components/Header';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';

// Pages
import HomePage from '@/pages/HomePage';
import ExplorePage from '@/pages/ExplorePage';
import ProfilePage from '@/pages/ProfilePage';
import NotificationsPage from '@/pages/NotificationsPage';
import CreatePostPage from '@/pages/CreatePostPage';
import PostDetailPage from '@/pages/PostDetailPage';
import MenuPage from '@/pages/MenuPage';
import MessagesPage from '@/pages/MessagesPage';
import AccountDetailsPage from '@/pages/AccountDetailsPage';
// import AppearancePage from '@/pages/AppearancePage'; // Removed for now
import PrivacySecurityPage from '@/pages/PrivacySecurityPage';
import BookmarksPage from '@/pages/BookmarksPage';
import ActivityPage from '@/pages/ActivityPage';
import HelpSupportPage from '@/pages/HelpSupportPage';


// Components
import BottomNavigation from '@/components/BottomNavigation';
import { TelegramProvider } from '@/contexts/TelegramContext';

const App = () => {
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);
  // Default to light theme, localStorage can override if 'dark' was set previously
  // but UI to change it is removed.
  const [theme, setTheme] = useState(localStorage.getItem('appTheme') || 'light'); 

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
    
    // Force light theme if appearance page is removed
    // Or allow previous theme if you want to keep dark mode accessible via localStorage
    const currentTheme = 'light'; // Forcing light mode
    setTheme(currentTheme);
    localStorage.setItem('appTheme', currentTheme);
    
    setTimeout(() => {
      setIsReady(true);
    }, 500);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    // localStorage.setItem('appTheme', theme); // Already set in initial useEffect
  }, [theme]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-telegram-bg">
        <div className="w-16 h-16 border-4 border-telegram-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const showBottomNav = !['/create', '/menu', '/account-details', '/privacy-security', '/bookmarks', '/activity', '/help-support'].includes(location.pathname) && !location.pathname.startsWith('/post/');


  return (
    <TelegramProvider>
      <div className="telegram-container">
      <Header />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/profile/:id?" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/account-details" element={<AccountDetailsPage />} />
            {/* <Route path="/appearance" element={<AppearancePage currentTheme={theme} setTheme={setTheme} />} /> */}
            <Route path="/privacy-security" element={<PrivacySecurityPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/help-support" element={<HelpSupportPage />} />
          </Routes>
        </AnimatePresence>
        
        {showBottomNav && <BottomNavigation />}
        
        <Toaster />
      </div>
    </TelegramProvider>
  );
};

export default App;