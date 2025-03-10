'use client';
import React, { useContext, useEffect, useState } from 'react';

import Darkl from '@/svg/Darkl.svg';
import Lightd from '@/svg/Lightd.svg';
import Lightl from '@/svg/Lightl.svg';

import { ThemeContext } from '../context/ThemeContext';
import useNavbarScripts from '../hooks/useNavbarScripts';

const Navbar: React.FC = () => {
  useNavbarScripts();
  const { theme, setTheme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (theme === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  const toggleTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setDropdownOpen(false);
  };

  return (
    <div id='root'>
      <nav
        id='header'
        className={`fixed w-full z-50 ${
          theme === 'dark'
            ? 'bg-[rgb(20,20,20)] text-neutral-50'
            : 'bg-white text-neutral-900'
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <a
                href='#'
                className={`text-xl font-bold flex items-center ${
                  theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                }`}
              >
                <span>SCROLLX UI</span>
              </a>
            </div>
            <div className='hidden md:block'>
              <ul className='flex space-x-6'>
                <li>
                  <a
                    href='#hero'
                    className={`hover:text-primary transition-colors duration-300 ${
                      theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                    }`}
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href='#features'
                    className={`hover:text-primary transition-colors duration-300 ${
                      theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                    }`}
                  >
                    Showcase
                  </a>
                </li>
                <li>
                  <a
                    href='/Docs'
                    className={`hover:text-primary transition-colors duration-300 ${
                      theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                    }`}
                  >
                    Docs
                  </a>
                </li>
                <li>
                  <a
                    href='#testimonials'
                    className={`hover:text-primary transition-colors duration-300 ${
                      theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                    }`}
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href='#faq'
                    className={`hover:text-primary transition-colors duration-300 ${
                      theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                    }`}
                  >
                    FAQ
                  </a>
                </li>
                <li className='relative'>
                  <button
                    type='button'
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`font-medium rounded-full hover: focus:outline-hidden focus: ${
                      theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                    }`}
                  >
                    <span className='group inline-flex shrink-0 justify-center items-center size-9'>
                      {theme === 'dark' ? (
                        <Lightd className='w-6 h-6' />
                      ) : (
                        <Darkl className='w-6 h-6' />
                      )}
                    </span>
                  </button>
                  {dropdownOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-20 ${
                        theme === 'dark'
                          ? 'bg-white text-gray-700'
                          : 'bg-[rgb(20,20,20)]  text-neutral-50'
                      }`}
                    >
                      <button
                        onClick={() => toggleTheme('light')}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          theme === 'dark'
                            ? 'hover:bg-[rgb(20,20,20)] hover:text-neutral-50'
                            : 'hover:bg-gray-100 hover:text-neutral-900'
                        }`}
                      >
                        Light Mode{' '}
                        {theme === 'dark' ? (
                          <Lightl className='w-6 h-6' />
                        ) : (
                          <Lightl className='w-6 h-6' />
                        )}
                      </button>
                      <button
                        onClick={() => toggleTheme('dark')}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          theme === 'dark'
                            ? 'hover:bg-[rgb(20,20,20)] hover:text-neutral-50'
                            : 'hover:bg-gray-100 hover:text-neutral-900'
                        }`}
                      >
                        Dark Mode{' '}
                        {theme === 'dark' ? (
                          <Darkl className='w-6 h-6' />
                        ) : (
                          <Darkl className='w-6 h-6' />
                        )}
                      </button>
                      <button
                        onClick={() => toggleTheme('system')}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          theme === 'dark'
                            ? 'hover:bg-[rgb(20,20,20)] hover:text-neutral-50'
                            : 'hover:bg-gray-100 hover:text-neutral-900'
                        }`}
                      >
                        System Preference
                      </button>
                    </div>
                  )}
                </li>
              </ul>
            </div>
            <div className='md:hidden flex items-center'>
              <button
                id='mobile-menu-button'
                aria-label='Open menu'
                className={`text-gray-300 hover:text-white focus:outline-none ${
                  theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                }`}
              >
                <svg
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  ></path>
                </svg>
              </button>
              <button
                type='button'
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`ml-4 font-medium rounded-full hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 ${
                  theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                }`}
              >
                <span className='group inline-flex shrink-0 justify-center items-center size-9'>
                  {theme === 'dark' ? (
                    <Lightd className='w-6 h-6' />
                  ) : (
                    <Darkl className='w-6 h-6' />
                  )}
                </span>
              </button>
              {dropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20'>
                  <br />
                  <br />
                  <button
                    onClick={() => toggleTheme('light')}
                    className=' px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2'
                  >
                    Light Mode{' '}
                    {theme === 'dark' ? (
                      <Lightl className='w-6 h-6' />
                    ) : (
                      <Lightl className='w-6 h-6' />
                    )}
                  </button>
                  <button
                    onClick={() => toggleTheme('dark')}
                    className=' px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2'
                  >
                    Dark Mode{' '}
                    {theme === 'dark' ? (
                      <Darkl className='w-6 h-6' />
                    ) : (
                      <Darkl className='w-6 h-6' />
                    )}
                  </button>
                  <button
                    onClick={() => toggleTheme('system')}
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'
                  >
                    System Preference
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          id='mobile-menu'
          className={`hidden md:hidden pb-3 animate__animated animate__fadeIn ${
            theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'
          }`}
        >
          <ul className='px-4 pt-2 pb-3 space-y-1'>
            <li>
              <a
                href='#hero'
                className={`block px-3 py-2 rounded-md hover:bg-neutral-700 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                }`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href='#features'
                className={`block px-3 py-2 rounded-md hover:bg-neutral-700 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                }`}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href='#how-it-works'
                className={`block px-3 py-2 rounded-md hover:bg-neutral-700 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                }`}
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href='#demo'
                className={`block px-3 py-2 rounded-md hover:bg-neutral-700 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                }`}
              >
                Demo
              </a>
            </li>
            <li>
              <a
                href='#pricing'
                className={`block px-3 py-2 rounded-md hover:bg-neutral-700 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                }`}
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href='#testimonials'
                className={`block px-3 py-2 rounded-md hover:bg-neutral-700 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                }`}
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href='#faq'
                className={`block px-3 py-2 rounded-md hover:bg-neutral-700 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                }`}
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href='#contact'
                className={`block px-3 py-2 rounded-md hover:bg-neutral-700 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'
                }`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
