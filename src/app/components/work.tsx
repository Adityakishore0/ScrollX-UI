'use client';
import React from 'react';

const Work: React.FC = () => {
  return (
    <section id='how-it-works' className='py-20 bg-neutral-900'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center max-w-3xl mx-auto mb-16 animate__animated animate__fadeIn'>
          <h2 className='text-3xl font-bold text-neutral-50 mb-4'>
            How Scrollout AI Works
          </h2>
          <p className='text-lg text-neutral-600'>
            From idea to deployment in four simple steps. Our AI-powered
            platform handles the complex coding while you focus on your vision.
          </p>
        </div>

        <div className='relative'>
          <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white opacity-20'></div>

          <div className='relative z-10 mb-16 md:mb-0'>
            <div className='flex flex-col md:flex-row items-center'>
              <div className='flex-1 md:text-right order-2 md:order-1 pt-6 md:pt-0 md:pr-10 animate__animated animate__fadeInLeft'>
                <div className='bg-white p-6 rounded-xl shadow-md inline-block max-w-lg'>
                  <h3 className='text-xl font-bold text-neutral-900 mb-3'>
                    Describe Your Website
                  </h3>
                  <p className='text-neutral-600 mb-4'>
                    Tell us what you want to create. Provide details about your
                    website's purpose, target audience, preferred style, and
                    required functionality.
                  </p>
                  <div className='bg-neutral-100 p-4 rounded-lg'>
                    <code className='text-sm text-neutral-700 font-mono'>
                      "I need a portfolio website for a photographer with a
                      minimalist design, dark theme, and a gallery section that
                      supports filtering by category."
                    </code>
                  </div>
                </div>
              </div>
              <div className='bg-gradient-to-r from-blue-500 to-purple-500 text-white w-14 h-14 rounded-full flex items-center justify-center z-10 shadow-lg order-1 md:order-2 animate__animated animate__zoomIn md:absolute md:left-1/2 md:transform md:-translate-x-1/2'>
                <span className='text-xl font-bold'>1</span>
              </div>
              <div className='flex-1 order-3 md:pl-10 hidden md:block'></div>
            </div>
          </div>

          <div className='relative z-10 mb-16 md:mb-24'>
            <div className='flex flex-col md:flex-row items-center'>
              <div className='flex-1 order-3 pt-6 md:pt-0 md:pl-10 animate__animated animate__fadeInRight'>
                <div className='bg-white p-6 rounded-xl shadow-md inline-block max-w-lg'>
                  <h3 className='text-xl font-bold text-neutral-900 mb-3'>
                    AI Generates Structure
                  </h3>
                  <p className='text-neutral-600 mb-4'>
                    Our advanced AI analyzes your requirements and creates a
                    complete project structure with all necessary components,
                    pages, and styles.
                  </p>
                  <div className='bg-neutral-800 text-gray-300 p-4 rounded-lg font-mono text-xs overflow-hidden'>
                    <div className='flex items-center mb-2'>
                      <svg
                        className='w-5 h-5 mr-2 text-blue-400'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
                        ></path>
                      </svg>
                      <span>project-structure/</span>
                    </div>
                    <div className='ml-5 space-y-1'>
                      <div className='flex items-center'>
                        <svg
                          className='w-5 h-5 mr-1 text-blue-400'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
                          ></path>
                        </svg>
                        <span>pages/</span>
                      </div>
                      <div className='ml-6 flex items-center'>
                        <svg
                          className='w-5 h-5 mr-1 text-green-400'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                          ></path>
                        </svg>
                        <span>index.tsx</span>
                      </div>
                      <div className='ml-6 flex items-center'>
                        <svg
                          className='w-5 h-5 mr-1 text-green-400'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                          ></path>
                        </svg>
                        <span>gallery.tsx</span>
                      </div>
                      <div className='flex items-center'>
                        <svg
                          className='w-5 h-5 mr-1 text-blue-400'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
                          ></path>
                        </svg>
                        <span>components/</span>
                      </div>
                      <div className='ml-6 flex items-center'>
                        <svg
                          className='w-5 h-5 mr-1 text-green-400'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                          ></path>
                        </svg>
                        <span>Header.tsx</span>
                      </div>
                      <div className='ml-6 flex items-center'>
                        <svg
                          className='w-5 h-5 mr-1 text-green-400'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                          ></path>
                        </svg>
                        <span>GalleryGrid.tsx</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gradient-to-r from-blue-500 to-purple-500 text-white w-14 h-14 rounded-full flex items-center justify-center z-10 shadow-lg order-1 animate__animated animate__zoomIn animate__delay-1s md:absolute md:left-1/2 md:transform md:-translate-x-1/2'>
                <span className='text-xl font-bold'>2</span>
              </div>
              <div className='flex-1 order-2 md:text-right md:pr-10 hidden md:block'></div>
            </div>
          </div>

          <div className='relative z-10 mb-16 md:mb-24'>
            <div className='flex flex-col md:flex-row items-center'>
              <div className='flex-1 md:text-right order-2 md:order-1 pt-6 md:pt-0 md:pr-10 animate__animated animate__fadeInLeft animate__delay-1s'>
                <div className='bg-white p-6 rounded-xl shadow-md inline-block max-w-lg'>
                  <h3 className='text-xl font-bold text-neutral-900 mb-3'>
                    Live Preview &amp; Customization
                  </h3>
                  <p className='text-neutral-600 mb-4'>
                    Watch your website take shape in real-time with hot
                    reloading. Make adjustments and see changes instantly, with
                    AI suggestions for improvements.
                  </p>
                  <div className='relative bg-neutral-900 p-1 rounded-lg overflow-hidden shadow-lg'>
                    <div className='bg-neutral-800 p-2 flex items-center space-x-2 rounded-t-sm'>
                      <div className='flex space-x-1'>
                        <div className='w-2 h-2 rounded-full bg-red-500'></div>
                        <div className='w-2 h-2 rounded-full bg-yellow-500'></div>
                        <div className='w-2 h-2 rounded-full bg-green-500'></div>
                      </div>
                      <div className='bg-neutral-700 rounded-sm px-2 py-1 text-xs text-neutral-300 flex-grow text-center'>
                        localhost:3000
                      </div>
                    </div>
                    <div className='h-36 bg-neutral-900 flex items-center justify-center text-center p-4'>
                      <div>
                        <div className='inline-block px-4 py-1 bg-blue-500 text-xs text-white rounded-full mb-2'>
                          Live Preview
                        </div>
                        <div className='text-white text-sm'>
                          Your changes are being rendered in real-time as you
                          customize
                        </div>
                      </div>
                    </div>

                    <div className='absolute bottom-2 right-2 flex items-center bg-green-500 text-white text-xs rounded-full px-2 py-1 animate-pulse'>
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
                      <span>Hot Reloading</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gradient-to-r from-blue-500 to-purple-500 text-white w-14 h-14 rounded-full flex items-center justify-center z-10 shadow-lg order-1 md:order-2 animate__animated animate__zoomIn animate__delay-2s md:absolute md:left-1/2 md:transform md:-translate-x-1/2'>
                <span className='text-xl font-bold'>3</span>
              </div>
              <div className='flex-1 order-3 md:pl-10 hidden md:block'></div>
            </div>
          </div>

          <div className='relative z-10'>
            <div className='flex flex-col md:flex-row items-center'>
              <div className='flex-1 order-3 pt-6 md:pt-0 md:pl-10 animate__animated animate__fadeInRight animate__delay-2s'>
                <div className='bg-white p-6 rounded-xl shadow-md inline-block max-w-lg'>
                  <h3 className='text-xl font-bold text-neutral-900 mb-3'>
                    Deploy or Download
                  </h3>
                  <p className='text-neutral-600 mb-4'>
                    Once satisfied, deploy your website directly to your hosting
                    provider or download the entire project as a zip file for
                    further customization.
                  </p>
                  <div className='flex flex-col sm:flex-row gap-3 mt-4'>
                    <div className='flex-1 bg-neutral-100 p-4 rounded-lg flex flex-col items-center text-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-10 w-10 text-indigo-600 mb-2'
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
                      <h4 className='font-semibold text-neutral-800 mb-1'>
                        One-Click Deploy
                      </h4>
                      <p className='text-neutral-600 text-sm'>
                        Deploy directly to Vercel, Netlify, or GitHub Pages
                      </p>
                    </div>
                    <div className='flex-1 bg-neutral-100 p-4 rounded-lg flex flex-col items-center text-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-10 w-10 text-indigo-600 mb-2'
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
                      <h4 className='font-semibold text-neutral-800 mb-1'>
                        Download Project
                      </h4>
                      <p className='text-neutral-600 text-sm'>
                        Get a zip file with complete source code
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gradient-to-r from-blue-500 to-purple-500 text-white w-14 h-14 rounded-full flex items-center justify-center z-10 shadow-lg order-1 md:order-2 animate__animated animate__zoomIn animate__delay-3s md:absolute md:left-1/2 md:transform md:-translate-x-1/2'>
                <span className='text-xl font-bold'>4</span>
              </div>
              <div className='flex-1 order-2 md:text-right md:pr-10 hidden md:block'></div>
            </div>
          </div>
        </div>

        <div className='mt-24 bg-white rounded-2xl p-8 shadow-xl animate__animated animate__fadeIn'>
          <div className='text-center mb-10'>
            <h3 className='text-2xl font-bold text-neutral-900'>
              Why Use Scrollout AI?
            </h3>
            <p className='text-neutral-600 mt-2'>
              Streamline your web development workflow and focus on what matters
              most
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='flex flex-col items-center text-center'>
              <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 text-primary'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
                </svg>
              </div>
              <h4 className='text-lg font-semibold text-neutral-900 mb-2'>
                Save Time
              </h4>
              <p className='text-neutral-600'>
                Create complex websites in minutes instead of days or weeks
              </p>
            </div>

            <div className='flex flex-col items-center text-center'>
              <div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 text-secondary'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                  ></path>
                </svg>
              </div>
              <h4 className='text-lg font-semibold text-neutral-900 mb-2'>
                Best Practices
              </h4>
              <p className='text-neutral-600'>
                AI generates code following modern development standards and
                optimizations
              </p>
            </div>

            <div className='flex flex-col items-center text-center'>
              <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 text-purple-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z'
                  ></path>
                </svg>
              </div>
              <h4 className='text-lg font-semibold text-neutral-900 mb-2'>
                Fully Customizable
              </h4>
              <p className='text-neutral-600'>
                Generate the foundation and customize every aspect to match your
                unique needs
              </p>
            </div>
          </div>
        </div>

        <div className='mt-16 text-center animate__animated animate__fadeIn animate__delay-3s'>
          <a
            href='#demo'
            className='inline-block bg-white text-neutral-900 hover:bg-blue-600 hover:text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-blue-500/30'
          >
            Try Scrollout AI Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Work;
