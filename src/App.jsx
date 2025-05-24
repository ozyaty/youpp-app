import Header from './components/Header';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import { TelegramProvider, useTelegram } from '@/contexts/TelegramContext';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useTelegram();

  const [isReady, setIsReady] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('appTheme') || 'light');

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }

    const currentTheme = 'light';
    setTheme(currentTheme);
    localStorage.setItem('appTheme', currentTheme);

    setTimeout(() => {
      setIsReady(true);
    }, 500);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-telegram-bg">
        <div className="w-16 h-16 border-4 border-telegram-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const showBottomNav = !['/create', '/menu', '/account-details', '/privacy-security', '/bookmarks', '/activity', '/help-support'].includes(location.pathname) && !location.pathname.startsWith('/post/');

  const isOwnProfile = location.pathname === `/profile/${currentUser?.id}`;

  return (
    <div className="telegram-container">
      <Header
        rightAction={
          isOwnProfile ? (
            <Button variant="ghost" size="icon" className="text-white" onClick={() => navigate('/menu')}>
              <Menu size={24} />
            </Button>
          ) : null
        }
      />
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
  );
};

const App = () => (
  <TelegramProvider>
    <AppContent />
  </TelegramProvider>
);

export default App;
