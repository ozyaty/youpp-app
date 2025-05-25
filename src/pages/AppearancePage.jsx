import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageWrapper from '@/components/PageWrapper'; // ✅ ADDED

const AppearancePage = ({ currentTheme, setTheme }) => {
  const themes = [
    { id: 'light', name: 'Light Mode', icon: Sun },
    { id: 'dark', name: 'Dark Mode', icon: Moon },
  ];

  return (
    <PageWrapper> {/* ✅ WRAPPED for spacing */}
      <motion.div
        className="p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-telegram-text">Select Theme</h2>

        <div className="space-y-3">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isActive = currentTheme === themeOption.id;

            return (
              <Button
                key={themeOption.id}
                variant="outline"
                className={`w-full justify-start h-14 text-left telegram-button-secondary ${
                  isActive ? 'ring-2 ring-telegram-link bg-telegram-link/10 text-telegram-link' : ''
                }`}
                onClick={() => setTheme(themeOption.id)}
              >
                <Icon size={20} className={`mr-3 ${isActive ? 'text-telegram-link' : 'text-telegram-icon'}`} />
                <span className={`text-md ${isActive ? 'text-telegram-link font-semibold' : 'text-telegram-text'}`}>
                  {themeOption.name}
                </span>
              </Button>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-telegram-secondary-bg rounded-lg border border-telegram-divider">
          <h3 className="text-md font-semibold mb-2 text-telegram-text">Preview</h3>
          <p className="text-sm text-telegram-hint">
            This is how your app will look. The{' '}
            {currentTheme === 'dark'
              ? 'dark theme uses a darker color palette with a deep background and vibrant blues, which can be easier on the eyes in low light conditions.'
              : 'light theme uses a brighter, clean color palette, ideal for well-lit environments.'}
          </p>

          <div className="mt-4 p-3 rounded-md bg-telegram-bg border border-telegram-divider">
            <p className="text-telegram-text text-sm">Sample Text</p>
            <p className="text-telegram-hint text-xs">A hint or secondary text</p>
            <Button className="mt-2 telegram-button text-xs py-1 px-2 h-auto">Sample Button</Button>
          </div>
        </div>
      </motion.div>
    </PageWrapper>
  );
};

export default AppearancePage;
