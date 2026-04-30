'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function useThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (target) {
        const tag = target.tagName;

        const isTyping =
          tag === 'INPUT' ||
          tag === 'TEXTAREA' ||
          tag === 'SELECT' ||
          target.isContentEditable ||
          target.closest('[contenteditable="true"]') !== null ||
          target.closest('[role="textbox"]') !== null;

        if (isTyping) return;
      }

      if (
        (event.key === 'd' || event.key === 'D') &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !event.shiftKey
      ) {
        event.preventDefault();
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [resolvedTheme, setTheme]);
}
