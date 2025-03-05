'use client';
import React from 'react';

import useDemoScripts from '@/app/hooks/useDemoScripts';

const Demo: React.FC = () => {
  useDemoScripts();
  return (
    <section id='demo' className='py-20 bg-neutral-900 text-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center max-w-3xl mx-auto mb-16 animate__animated animate__fadeIn'>
          <h2 className='text-3xl font-bold mb-4'>
            Try Scrollout AI In Action
          </h2>
          <p className='text-lg text-gray-300'>
            Experience the power of our AI-driven website generator. Input your
            requirements and watch as your website comes to life.
          </p>
        </div>

        <div className='bg-neutral-800 rounded-xl overflow-hidden shadow-2xl border border-neutral-700 max-w-5xl mx-auto mb-16 animate__animated animate__fadeInUp'>
          <div className='flex border-b border-neutral-700'>
            <button
              className='demo-tab-btn active px-6 py-4 focus:outline-none text-blue-400 border-b-2 border-blue-400 font-medium text-sm sm:text-base'
              data-tab='input'
            >
              1. Input Requirements
            </button>
            <button
              className='demo-tab-btn px-6 py-4 focus:outline-none text-gray-400 hover:text-gray-300 font-medium text-sm sm:text-base'
              data-tab='generating'
            >
              2. AI Generation
            </button>
            <button
              className='demo-tab-btn px-6 py-4 focus:outline-none text-gray-400 hover:text-gray-300 font-medium text-sm sm:text-base'
              data-tab='preview'
            >
              3. Live Preview
            </button>
            <button
              className='demo-tab-btn px-6 py-4 focus:outline-none text-gray-400 hover:text-gray-300 font-medium text-sm sm:text-base'
              data-tab='deploy'
            >
              4. Deploy
            </button>
          </div>

          <div className='p-6'>
            <div className='demo-tab-content active' id='input-tab'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-xl font-semibold mb-4'>
                    Describe Your Website
                  </h3>
                  <p className='text-gray-300 mb-4'>
                    Tell us about your project and we'll generate a custom
                    website for you.
                  </p>

                  <div className='space-y-4'>
                    <div>
                      <label className='block text-gray-300 mb-2 text-sm font-medium'>
                        Website Type
                      </label>
                      <select className='w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'>
                        <option>Portfolio</option>
                        <option>E-commerce</option>
                        <option>Business</option>
                        <option>Blog</option>
                        <option>Landing Page</option>
                      </select>
                    </div>

                    <div>
                      <label className='block text-gray-300 mb-2 text-sm font-medium'>
                        Description
                      </label>
                      <textarea
                        rows={5}
                        placeholder='Describe your website in detail...'
                        className='w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                      ></textarea>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-gray-300 mb-2 text-sm font-medium'>
                          Color Theme
                        </label>
                        <select className='w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'>
                          <option>Blue</option>
                          <option>Green</option>
                          <option>Purple</option>
                          <option>Dark</option>
                          <option>Light</option>
                        </select>
                      </div>

                      <div>
                        <label className='block text-gray-300 mb-2 text-sm font-medium'>
                          Pages (up to 8)
                        </label>
                        <select className='w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'>
                          <option>4 Pages</option>
                          <option>5 Pages</option>
                          <option>6 Pages</option>
                          <option>7 Pages</option>
                          <option>8 Pages</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    className='mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium flex items-center justify-center transition-colors duration-300 demo-next-btn'
                    data-next='generating'
                  >
                    Generate Website
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 ml-2'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13 7l5 5m0 0l-5 5m5-5H6'
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className='lg:pl-6'>
                  <h3 className='text-xl font-semibold mb-4'>
                    Advanced Options
                  </h3>

                  <div className='space-y-4'>
                    <div>
                      <label className='block text-gray-300 mb-2 text-sm font-medium'>
                        Features
                      </label>
                      <div className='space-y-2'>
                        <div className='flex items-center'>
                          <input
                            type='checkbox'
                            id='feature-contact'
                            className='w-4 h-4 bg-neutral-700 border-neutral-600 rounded text-blue-500 focus:ring-blue-500'
                          />
                          <label
                            htmlFor='feature-contact'
                            className='ml-2 text-gray-300'
                          >
                            Contact Form
                          </label>
                        </div>
                        <div className='flex items-center'>
                          <input
                            type='checkbox'
                            id='feature-blog'
                            className='w-4 h-4 bg-neutral-700 border-neutral-600 rounded text-blue-500 focus:ring-blue-500'
                          />
                          <label
                            htmlFor='feature-blog'
                            className='ml-2 text-gray-300'
                          >
                            Blog/News Section
                          </label>
                        </div>
                        <div className='flex items-center'>
                          <input
                            type='checkbox'
                            id='feature-gallery'
                            className='w-4 h-4 bg-neutral-700 border-neutral-600 rounded text-blue-500 focus:ring-blue-500'
                          />
                          <label
                            htmlFor='feature-gallery'
                            className='ml-2 text-gray-300'
                          >
                            Image Gallery
                          </label>
                        </div>
                        <div className='flex items-center'>
                          <input
                            type='checkbox'
                            id='feature-auth'
                            className='w-4 h-4 bg-neutral-700 border-neutral-600 rounded text-blue-500 focus:ring-blue-500'
                          />
                          <label
                            htmlFor='feature-auth'
                            className='ml-2 text-gray-300'
                          >
                            Authentication
                          </label>
                        </div>
                        <div className='flex items-center'>
                          <input
                            type='checkbox'
                            id='feature-dark'
                            className='w-4 h-4 bg-neutral-700 border-neutral-600 rounded text-blue-500 focus:ring-blue-500'
                          />
                          <label
                            htmlFor='feature-dark'
                            className='ml-2 text-gray-300'
                          >
                            Dark/Light Mode Toggle
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className='block text-gray-300 mb-2 text-sm font-medium'>
                        Animation Level
                      </label>
                      <div className='flex items-center'>
                        <input
                          type='range'
                          className='w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer'
                        />
                      </div>
                      <div className='flex justify-between text-xs text-gray-400 mt-1'>
                        <span>Minimal</span>
                        <span>Balanced</span>
                        <span>Advanced</span>
                      </div>
                    </div>

                    <div>
                      <label className='block text-gray-300 mb-2 text-sm font-medium'>
                        Special Instructions
                      </label>
                      <textarea
                        rows={3}
                        placeholder='Any specific requirements or preferences...'
                        className='w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='demo-tab-content hidden' id='generating-tab'>
              <div className='text-center py-8'>
                <div className='inline-block relative'>
                  <div className='w-24 h-24 border-t-4 border-r-4 border-blue-500 border-solid rounded-full animate-spin mb-6 mx-auto'></div>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-10 w-10 text-blue-500'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5'
                      ></path>
                    </svg>
                  </div>
                </div>
                <h3 className='text-xl font-semibold mb-2'>
                  Generating Your Website
                </h3>
                <p className='text-gray-300 mb-6'>
                  Scrollout AI is creating your custom Next.js project
                </p>

                <div
                  id='progress-container'
                  className='w-full bg-neutral-700 rounded-full h-4 max-w-md mx-auto'
                >
                  <div
                    id='progress-bar'
                    className='bg-blue-500 h-4 rounded-full'
                    style={{ width: '45%' }}
                  ></div>
                </div>

                <div className='mt-8'>
                  <div className='bg-neutral-700 p-4 rounded-lg text-left max-w-2xl mx-auto font-mono text-sm text-gray-300'>
                    <div
                      id='generation-log'
                      className='space-y-1 h-48 overflow-y-auto'
                    >
                      <div className='flex items-start'>
                        <span className='text-green-400 mr-2'>✓</span>
                        <span>Initializing Next.js project structure</span>
                      </div>
                      <div className='flex items-start'>
                        <span className='text-green-400 mr-2'>✓</span>
                        <span>Setting up Tailwind CSS configuration</span>
                      </div>
                      <div className='flex items-start'>
                        <span className='text-green-400 mr-2'>✓</span>
                        <span>Creating TypeScript configuration</span>
                      </div>
                      <div className='flex items-start'>
                        <span className='text-blue-400 animate-pulse mr-2'>
                          ⟳
                        </span>
                        <span>Generating page components...</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className='mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium flex items-center justify-center mx-auto transition-colors duration-300 demo-next-btn opacity-50'
                  data-next='preview'
                  disabled={true}
                >
                  Continue to Preview
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 ml-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M13 7l5 5m0 0l-5 5m5-5H6'
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className='demo-tab-content hidden' id='preview-tab'>
              <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-xl font-semibold'>Website Preview</h3>
                  <div className='flex space-x-3'>
                    <button className='flex items-center justify-center p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
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
                    <button className='flex items-center justify-center p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
                        ></path>
                      </svg>
                    </button>
                    <button className='flex items-center justify-center p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className='border border-neutral-700 rounded-lg overflow-hidden relative'>
                  <div className='bg-neutral-700 p-2 flex items-center space-x-2'>
                    <div className='flex space-x-1'>
                      <div className='w-3 h-3 rounded-full bg-red-500'></div>
                      <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
                      <div className='w-3 h-3 rounded-full bg-green-500'></div>
                    </div>
                    <div className='bg-neutral-600 rounded py-1 px-3 text-xs text-neutral-300 flex-grow text-center overflow-hidden text-ellipsis whitespace-nowrap'>
                      https://preview.scrollout.ai/your-project
                    </div>
                    <button className='text-neutral-400 hover:text-white'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5'
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div className='h-96 bg-white relative'>
                    <div className='absolute inset-0 bg-gradient-to-b from-blue-900 to-indigo-900 flex flex-col'>
                      <div className='bg-opacity-20 bg-black p-4 flex justify-between items-center'>
                        <div className='text-white font-bold'>Company Name</div>
                        <div className='flex space-x-4 text-white text-sm'>
                          <div>Home</div>
                          <div>About</div>
                          <div>Services</div>
                          <div>Contact</div>
                        </div>
                      </div>

                      <div className='flex-grow flex items-center justify-center p-8'>
                        <div className='text-center'>
                          <h2 className='text-4xl font-bold text-white mb-4'>
                            Welcome to Our Website
                          </h2>
                          <p className='text-blue-100 mb-6 max-w-md mx-auto'>
                            We provide amazing services that will help your
                            business grow and thrive in the digital landscape.
                          </p>
                          <button className='px-6 py-2 bg-white text-blue-900 rounded-lg font-medium'>
                            Get Started
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className='absolute bottom-4 right-4 bg-green-500 text-white text-xs rounded-full px-3 py-1 flex items-center animate-pulse'>
                      <svg
                        className='w-3 h-3 mr-1'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                        ></path>
                      </svg>
                      <span>Hot Reloading Active</span>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                  <div className='col-span-2'>
                    <h4 className='font-medium text-gray-300 mb-3'>
                      Quick Edits
                    </h4>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-gray-400 text-sm mb-1'>
                          Hero Heading
                        </label>
                        <input
                          type='text'
                          value='Welcome to Our Website'
                          className='w-full bg-neutral-700 border border-neutral-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                      </div>
                      <div>
                        <label className='block text-gray-400 text-sm mb-1'>
                          Primary Button Text
                        </label>
                        <input
                          type='text'
                          value='Get Started'
                          className='w-full bg-neutral-700 border border-neutral-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                      </div>
                      <div>
                        <label className='block text-gray-400 text-sm mb-1'>
                          Primary Color
                        </label>
                        <div className='flex'>
                          <input
                            type='color'
                            value='#3B82F6'
                            className='bg-neutral-700 border border-neutral-600 rounded-l-lg p-1 w-12 h-10'
                          />
                          <input
                            type='text'
                            value='#3B82F6'
                            className='w-full bg-neutral-700 border border-neutral-600 rounded-r-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-0'
                          />
                        </div>
                      </div>
                      <div>
                        <label className='block text-gray-400 text-sm mb-1'>
                          Font Family
                        </label>
                        <select className='w-full bg-neutral-700 border border-neutral-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'>
                          <option>Inter</option>
                          <option>Poppins</option>
                          <option>Montserrat</option>
                          <option>Roboto</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className='font-medium text-gray-300 mb-3'>Pages</h4>
                    <div className='bg-neutral-700 rounded-lg overflow-hidden'>
                      <div className='p-3 border-b border-neutral-600 flex items-center justify-between'>
                        <span className='text-sm font-medium'>
                          Site Structure
                        </span>
                        <button className='text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded transition-colors'>
                          Add Page
                        </button>
                      </div>
                      <ul className='p-2 space-y-1 text-sm'>
                        <li className='bg-neutral-600 text-white p-2 rounded flex items-center justify-between'>
                          <span>Home</span>
                          <span className='text-xs text-gray-300'>
                            index.tsx
                          </span>
                        </li>
                        <li className='text-gray-300 p-2 rounded flex items-center justify-between hover:bg-neutral-600 cursor-pointer'>
                          <span>About</span>
                          <span className='text-xs text-gray-400'>
                            about.tsx
                          </span>
                        </li>
                        <li className='text-gray-300 p-2 rounded flex items-center justify-between hover:bg-neutral-600 cursor-pointer'>
                          <span>Services</span>
                          <span className='text-xs text-gray-400'>
                            services.tsx
                          </span>
                        </li>
                        <li className='text-gray-300 p-2 rounded flex items-center justify-between hover:bg-neutral-600 cursor-pointer'>
                          <span>Contact</span>
                          <span className='text-xs text-gray-400'>
                            contact.tsx
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='flex justify-end mt-4'>
                  <button
                    className='px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium flex items-center justify-center transition-colors duration-300 demo-next-btn'
                    data-next='deploy'
                  >
                    Continue to Deploy
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 ml-2'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13 7l5 5m0 0l-5 5m5-5H6'
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className='demo-tab-content hidden' id='deploy-tab'>
              <div className='max-w-3xl mx-auto'>
                <h3 className='text-xl font-semibold mb-6 text-center'>
                  Your Website is Ready!
                </h3>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>
                  <div className='bg-neutral-700 p-6 rounded-xl'>
                    <div className='flex items-center mb-4'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-8 w-8 text-blue-400 mr-3'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                        ></path>
                      </svg>
                      <h4 className='text-lg font-medium'>Download Project</h4>
                    </div>
                    <p className='text-gray-300 mb-6'>
                      Get a complete zip file with all source code, ready to
                      customize further or run locally.
                    </p>
                    <button className='w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 mr-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                        ></path>
                      </svg>
                      Download ZIP (4.2 MB)
                    </button>
                    <div className='mt-4 text-xs text-gray-400 text-center'>
                      Includes all Next.js, TypeScript and Tailwind CSS files
                    </div>
                  </div>

                  <div className='bg-neutral-700 p-6 rounded-xl'>
                    <div className='flex items-center mb-4'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-8 w-8 text-green-400 mr-3'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 11l7-7 7 7M5 19l7-7 7 7'
                        ></path>
                      </svg>
                      <h4 className='text-lg font-medium'>One-Click Deploy</h4>
                    </div>
                    <p className='text-gray-300 mb-6'>
                      Deploy your website directly to your preferred hosting
                      provider in one click.
                    </p>
                    <div className='grid grid-cols-3 gap-3 mb-6'>
                      <button className='p-3 bg-black hover:bg-neutral-800 rounded-lg flex items-center justify-center transition-colors'>
                        <svg
                          className='h-6 w-6'
                          viewBox='0 0 24 24'
                          fill='white'
                        >
                          <path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.824a9.176 9.176 0 1 1 0 18.352 9.176 9.176 0 0 1 0-18.352zm-2.195 6.982H7.58v4.997h2.225v-4.997zm4.4 0h-2.187v4.997h2.188v-4.997zm2.176 0h-2.227v4.997h2.227v-4.997z'></path>
                        </svg>
                      </button>
                      <button className='p-3 bg-[#1E293B] hover:bg-[#334155] rounded-lg flex items-center justify-center transition-colors'>
                        <svg
                          className='h-6 w-6'
                          viewBox='0 0 24 24'
                          fill='white'
                        >
                          <path d='M12 12.372L7.065 9.627v2.744L12 15.1l4.935-2.728V9.628L12 12.372zm0-3.27l4.938-2.728-4.938-2.745-4.937 2.745L12 9.1zm8.204 1.896c-.664-.374-1.307-.747-1.95-1.12v5.36c0 .125-.026.152-.154.21a9.936 9.936 0 0 1-2.12.846 11.69 11.69 0 0 1-3.984.4 10.867 10.867 0 0 1-3.892-.753c-.746-.303-1.454-.681-2.115-1.133-.05-.033-.084-.062-.084-.144V9.903l-2.94-1.7v8.148c.01.16.043.204.16.27a12.47 12.47 0 0 0 4.507 1.9c1.61.353 3.253.413 4.889.179a11.88 11.88 0 0 0 4.497-1.583c.986-.575 1.853-1.31 2.598-2.192.07-.083.092-.163.092-.27V7.726l-1.405.81.001.192z'></path>
                        </svg>
                      </button>
                      <button className='p-3 bg-[#000000] hover:bg-neutral-800 rounded-lg flex items-center justify-center transition-colors'>
                        <svg
                          className='h-6 w-6'
                          viewBox='0 0 24 24'
                          fill='white'
                        >
                          <path d='M21.2 8.4c-1.1-2.4-3.4-3.9-6-3.9h-3.2c-0.6-1.8-2.3-3-4.2-3s-3.6 1.2-4.2 3h-0.6c-1.7 0-3 1.3-3 3s1.3 3 3 3h14.3c1.7 0 3.2-0.9 4-2.2 0.1-0.2 0-0.4-0.1-0.6V8.4z M7.9 5.1c0.8 0 1.5 0.5 1.8 1.2-0.3 0.1-0.6 0.3-0.9 0.5-0.4 0.4-0.7 0.9-0.9 1.4-1 0-1.9 0-1.9 0-0.3-1.3 0.4-3.1 1.9-3.1z'></path>
                        </svg>
                      </button>
                    </div>
                    <button className='w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 mr-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 11l7-7 7 7M5 19l7-7 7 7'
                        ></path>
                      </svg>
                      Deploy Now
                    </button>
                    <div className='mt-4 text-xs text-gray-400 text-center'>
                      Connect your account to deploy directly
                    </div>
                  </div>
                </div>

                <div className='bg-neutral-800 rounded-xl p-6 mb-10'>
                  <h4 className='font-semibold mb-4'>
                    What's Included in Your Project:
                  </h4>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <h5 className='text-blue-400 font-medium mb-2'>
                        Next.js Features
                      </h5>
                      <ul className='space-y-1 text-sm text-gray-300'>
                        <li className='flex items-start'>
                          <svg
                            className='h-5 w-5 text-green-500 mr-2 flex-shrink-0'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M5 13l4 4L19 7'
                            ></path>
                          </svg>
                          <span>Server-Side Rendering (SSR)</span>
                        </li>
                        <li className='flex items-start'>
                          <svg
                            className='h-5 w-5 text-green-500 mr-2 flex-shrink-0'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M5 13l4 4L19 7'
                            ></path>
                          </svg>
                          <span>API Routes</span>
                        </li>
                        <li className='flex items-start'>
                          <svg
                            className='h-5 w-5 text-green-500 mr-2 flex-shrink-0'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M5 13l4 4L19 7'
                            ></path>
                          </svg>
                          <span>Optimized Images</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className='text-blue-400 font-medium mb-2'>
                        Code Quality
                      </h5>
                      <ul className='space-y-1 text-sm text-gray-300'>
                        <li className='flex items-start'>
                          <svg
                            className='h-5 w-5 text-green-500 mr-2 flex-shrink-0'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M5 13l4 4L19 7'
                            ></path>
                          </svg>
                          <span>TypeScript Type Safety</span>
                        </li>
                        <li className='flex items-start'>
                          <svg
                            className='h-5 w-5 text-green-500 mr-2 flex-shrink-0'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M5 13l4 4L19 7'
                            ></path>
                          </svg>
                          <span>ESLint Configuration</span>
                        </li>
                        <li className='flex items-start'>
                          <svg
                            className='h-5 w-5 text-green-500 mr-2 flex-shrink-0'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M5 13l4 4L19 7'
                            ></path>
                          </svg>
                          <span>Responsive Tailwind Components</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='text-center'>
                  <button className='px-8 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-medium rounded-lg transition-colors duration-300'>
                    Create a New Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='max-w-4xl mx-auto text-center animate__animated animate__fadeIn'>
          <div className='bg-neutral-800 rounded-xl p-8 border border-neutral-700 shadow-lg'>
            <div className='flex justify-center mb-6'>
              <svg
                className='h-12 w-12 text-blue-400'
                fill='currentColor'
                viewBox='0 0 32 32'
              >
                <path d='M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z'></path>
              </svg>
            </div>
            <blockquote className='text-xl md:text-2xl text-gray-200 mb-6'>
              Scrollout AI saved us weeks of development time. We described our
              e-commerce idea, and within minutes had a fully functional Next.js
              website that we could customize further. The TypeScript
              integration makes it robust and maintainable.
            </blockquote>
            <div className='flex items-center justify-center'>
              <div className='mr-4 w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center text-lg font-bold text-blue-400'>
                JD
              </div>
              <div className='text-left'>
                <div className='font-medium'>Jamie Davidson</div>
                <div className='text-sm text-gray-400'>CTO, TechVentures</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
