'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function useThemeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        (event.key === 'd' || event.key === 'D') &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !event.shiftKey
      ) {
        event.preventDefault();
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [theme, setTheme]);
}
