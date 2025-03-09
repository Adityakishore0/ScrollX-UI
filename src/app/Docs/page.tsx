'use client';

import React from 'react';
import Sidebar from '../components/sidebar';
import Docsbar from '../components/docsbar';

import Footer from '@/app/components/footer';

import { ThemeProvider } from '@/app/context/ThemeContext';

export default function Page() {
  return (
    <ThemeProvider>
      <div className=''>
        <Docsbar />
        <Sidebar />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
