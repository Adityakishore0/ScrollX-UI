'use client';

import React from 'react';

import Footer from '@/app/components/footer';
import { ThemeProvider } from '@/app/context/ThemeContext';

import Docsbar from '../components/docsbar';
import Sidebar from '../components/sidebar';

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
