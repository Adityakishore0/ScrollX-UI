'use client';
import { useContext } from 'react';

import { Cover } from '@/components/ui/cover';

import { ThemeContext } from '@/app/context/ThemeContext';

import useFooterScripts from '../hooks/useFooterScripts';

const Footer: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  useFooterScripts();
  return (
    <div id='root'>
      <footer
        id='footer'
        className={`border-t py-20 flex flex-col items-center overflow-hidden ${
          theme === 'dark'
            ? 'bg-neutral-900 border-neutral-800 text-neutral-50 '
            : 'bg-neutral-50 border-neutral-300 text-neutral-900'
        }`}
      >
        <div className='container mx-auto px-4 md:px-6 '>
          <div className='py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
            <div>
              <a
                href='#hero'
                className='text-2xl font-bold font-primary text-pink-600 flex items-center mb-6'
              >
                <Cover>SCROLLX UI</Cover>
              </a>
              <p
                className={`${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                } text-semibold mb-6`}
              >
                A powerful library of pre-built UI components that helps
                developers create stunning interactive websites with ease.
              </p>
              <div className='flex space-x-4'>
                <a
                  href='#'
                  className={`${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                  } hover:text-pink-600 transition-colors duration-300`}
                  aria-label='Twitter'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84'></path>
                  </svg>
                </a>
                <a
                  href='#'
                  className={`${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                  } hover:text-pink-600 transition-colors duration-300`}
                  aria-label='GitHub'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                    ></path>
                  </svg>
                </a>
                <a
                  href='#'
                  className={`${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                  } hover:text-pink-600 transition-colors duration-300`}
                  aria-label='Discord'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z'></path>
                  </svg>
                </a>
                <a
                  href='#'
                  className={`${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                  } hover:text-pink-600 transition-colors duration-300`}
                  aria-label='YouTube'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className=' font-bold mb-6'>Quick Links</h3>
              <ul className='space-y-3'>
                <li>
                  <a
                    href='#hero'
                    className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                    } text-semibold  hover:text-pink-500 transition-colors duration-300`}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href='#features'
                    className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                    } text-semibold  hover:text-pink-500 transition-colors duration-300`}
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href='#components'
                    className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                    } text-semibold  hover:text-pink-500 transition-colors duration-300`}
                  >
                    Components
                  </a>
                </li>
                <li>
                  <a
                    href='#documentation'
                    className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                    } text-semibold  hover:text-pink-500 transition-colors duration-300`}
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href='#pricing'
                    className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                    } text-semibold  hover:text-pink-500 transition-colors duration-300`}
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href='#faq'
                    className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                    } text-semibold  hover:text-pink-500 transition-colors duration-300`}
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href='#contact'
                    className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                    } text-semibold  hover:text-pink-500 transition-colors duration-300`}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className=' font-bold mb-6'>Resources</h3>
              <ul className='space-y-3'>
                <li>
                  <a
                    href='/privacy'
                    className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                    } text-semibold  hover:text-pink-500 transition-colors duration-300`}
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href='/terms'
                    className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                    } text-semibold  hover:text-pink-500 transition-colors duration-300`}
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                    } text-semibold  hover:text-pink-500 transition-colors duration-300`}
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                    } text-semibold  hover:text-pink-500 transition-colors duration-300`}
                  >
                    Changelog
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                    } text-semibold  hover:text-pink-500 transition-colors duration-300`}
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className=' font-bold mb-6'>Subscribe</h3>
              <p
                className={`${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                } text-semibold mb-4  hover:text-pink-500 transition-colors duration-300`}
              >
                Join our newsletter to get the latest updates and news directly
                to your inbox.
              </p>
              <form className='flex flex-col  gap-2 mb-4'>
                <input
                  type='email'
                  placeholder='Your email address'
                  className='bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-pink-600 focus:outline-none focus:border-pink-500 transition-colors duration-300'
                />
                <button
                  type='submit'
                  className='bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg transition-colors duration-300'
                >
                  Subscribe
                </button>
              </form>
              <p
                className={`${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                } text-semibold  hover:text-pink-500 transition-colors duration-300`}
              >
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates.
              </p>
            </div>
          </div>

          <hr className='border-neutral-800' />

          <div className='py-8 flex flex-col md:flex-row justify-between items-center'>
            <div
              className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
              } text-sm mb-4 md:mb-0 hover:text-pink-500 transition-colors duration-300`}
            >
              © 2025 SCROLLX UI. All rights reserved.
            </div>
            <div className='flex space-x-6'>
              <a
                href='/privacy'
                className={`${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                } hover:text-pink-600 transition-colors duration-300`}
              >
                Privacy Policy
              </a>
              <a
                href='/terms'
                className={`${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                } hover:text-pink-600 transition-colors duration-300`}
              >
                Terms of Service
              </a>
              <a
                href='#'
                className={`${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                } hover:text-pink-600 transition-colors duration-300`}
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        <button
          id='back-to-top'
          className='fixed bottom-8 right-8 bg-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-pink-700 focus:outline-none opacity-100 visible'
          aria-label='Back to top'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M5 15l7-7 7 7'
            ></path>
          </svg>
        </button>
      </footer>
    </div>
  );
};

export default Footer;
