import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-dark-surface dark:text-gray-400 dark:hover:bg-dark-card dark:hover:text-gray-100 dark:focus:ring-offset-dark-bg"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun className={`h-5 w-5 transition-all ${theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
      <Moon className={`absolute h-5 w-5 transition-all ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
    </button>
  );
};

export default ThemeToggle;
