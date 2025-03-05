import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface ThemeContextProps {
  theme: 'light' | 'dark' | 'system' | null;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: null, // Start with `null` to avoid hydration mismatch
  setTheme: () => {
    /** No-op: Function intentionally left empty */
  },
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system' | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as
        | 'light'
        | 'dark'
        | 'system';
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        setTheme(prefersDark ? 'dark' : 'light');
      }
    }
  }, []);

  useEffect(() => {
    if (theme) {
      const applyTheme = (selectedTheme: 'light' | 'dark' | 'system') => {
        let activeTheme = selectedTheme;
        if (selectedTheme === 'system') {
          const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
          ).matches;
          activeTheme = prefersDark ? 'dark' : 'light';
        }
        document.documentElement.classList.toggle(
          'dark',
          activeTheme === 'dark'
        );
        localStorage.setItem('theme', selectedTheme);
      };
      applyTheme(theme);
    }
  }, [theme]);

  // Avoid rendering children until theme is determined (fixes hydration mismatch)
  if (theme === null) return null;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
