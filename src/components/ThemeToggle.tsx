'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-5 h-5" />;
      case 'dark':
        return <Moon className="w-5 h-5" />;
      case 'system':
        return <Monitor className="w-5 h-5" />;
      default:
        return <Sun className="w-5 h-5" />;
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        fixed top-4 right-4 z-50
        p-3 rounded-full
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        shadow-lg hover:shadow-xl
        transition-all duration-200
        hover:scale-105
        text-gray-700 dark:text-gray-300
        hover:text-gray-900 dark:hover:text-white
      "
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
      title={`Current: ${theme} theme`}
    >
      {getIcon()}
    </button>
  );
}
