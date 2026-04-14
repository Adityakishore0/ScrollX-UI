'use client';

import { useEffect } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { useThemeToggle } from '@/hooks/useThemeToggle';

function ClientBodyContent({ children }: { children: React.ReactNode }) {
  useThemeToggle();

  useEffect(() => {
    document.body.classList.add('antialiased');
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }
  }, []);

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <ClientBodyContent>{children}</ClientBodyContent>
    </ThemeProvider>
  );
}
