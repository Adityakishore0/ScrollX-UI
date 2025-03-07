'use client';
import Link from 'next/link';
import React, { useContext } from 'react';

import CopyPasteUI from '@/app/components/showcase';

import { ThemeContext } from '../context/ThemeContext';

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <aside
      className={`hidden sm:block z-30 h-[calc(100vh-3.5rem)] w-64 lg:sticky lg:self-start ${
        theme === 'dark'
          ? 'bg-[rgb(20,20,20)] text-neutral-50'
          : 'bg-neutral-50 text-neutral-900'
      }`}
    >
      <div dir='ltr' className='relative overflow-hidden h-full  lg:'>
        <style>
          {`
            [data-radix-scroll-area-viewport] {
              scrollbar-width: thin;
              scrollbar-color: ${
                theme === 'dark' ? '#4B5563 #1F2937' : '#D1D5DB #F3F4F6'
              };
            }
            [data-radix-scroll-area-viewport]::-webkit-scrollbar {
              width: 12px;
              opacity: 0;
              transition: opacity 0.3s;
            }
            [data-radix-scroll-area-viewport]:hover::-webkit-scrollbar {
              opacity: 1;
            }
            [data-radix-scroll-area-viewport]::-webkit-scrollbar-track {
              background: ${theme === 'dark' ? '#1F2937' : '#F3F4F6'};
            }
            [data-radix-scroll-area-viewport]::-webkit-scrollbar-thumb {
              background-color: ${theme === 'dark' ? '#4B5563' : '#D1D5DB'};
              border-radius: 10px;
              border: 2px solid ${theme === 'dark' ? '#1F2937' : '#F3F4F6'};
            }
          `}
        </style>
        <div
          data-radix-scroll-area-viewport
          className='h-full w-full rounded-[inherit]'
          style={{ overflowY: 'auto' }}
        >
          <div style={{ minWidth: '100%', display: 'table' }}>
            <div
              className={`space-y-6 pt-20 px-10 pb-10 ${
                theme === 'dark'
                  ? 'bg-[rgb(20,20,20)] text-neutral-50'
                  : 'bg-neutral-50 text-neutral-900'
              }`}
            >
              <div>
                <h2 className='text-lg font-bold'>Follow for updates</h2>
                <Link
                  href='#'
                  className={`${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                  } text-semibold mb-6`}
                >
                  Twitter @scrollX
                </Link>
              </div>
              <div>
                <h2 className='text-lg font-bold'>Installation</h2>
                <ul className='space-y-2'>
                  <li>
                    <Link
                      href='#'
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      } text-semibold mb-6`}
                    >
                      Install Next.js
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      } text-semibold mb-6`}
                    >
                      Install Tailwind CSS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      } text-semibold mb-6`}
                    >
                      Add utilities
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      } text-semibold mb-6`}
                    >
                      CLI
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className='text-lg font-bold'>All Components</h2>
                <ul className='space-y-2'>
                  <li>
                    <Link
                      href='#'
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      } text-semibold mb-6`}
                    >
                      3D Card Effect
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      } text-semibold mb-6`}
                    >
                      3D Pin
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      } text-semibold mb-6`}
                    >
                      Animated Modal
                    </Link>
                  </li>
                  <li className='flex items-center gap-2'>
                    <Link
                      href='#'
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      } text-semibold mb-6`}
                    >
                      Animated Testimonials
                    </Link>
                    <span className='bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded-full'>
                      New
                    </span>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      } text-semibold mb-6`}
                    >
                      Animated Tooltip
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      } text-semibold mb-6`}
                    >
                      Apple Cards Carousel
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      } text-semibold mb-6`}
                    >
                      Aurora Background
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      } text-semibold mb-6`}
                    >
                      Background Beam
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      } text-semibold mb-6`}
                    >
                      Aurora Background
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      } text-semibold mb-6`}
                    >
                      Background Beams
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      } text-semibold mb-6`}
                    >
                      Aurora Background
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      } text-semibold mb-6`}
                    >
                      Background Beams
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

const Layout = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className='flex'>
      <Sidebar />
      <main
        className={`flex-1 pt-20 h-[calc(100vh-3.5rem)] overflow-y-auto ${
          theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'
        }`}
      >
        <CopyPasteUI />
      </main>
    </div>
  );
};

export default Layout;
