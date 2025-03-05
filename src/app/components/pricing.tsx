'use client';
import React, { useState } from 'react';

const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>(
    'monthly'
  );
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const handleAnnualClick = () => {
    setBillingPeriod('annual');
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section
      id='pricing'
      className='py-20 bg-gradient-to-b from-neutral-900 to-black'
    >
      <style jsx>{`
        .glow {
          position: relative;
        }
        .glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          box-shadow: 0 0 20px rgba(0, 0, 255, 0.5);
          animation: glow 2s infinite alternate;
        }
        @keyframes glow {
          from {
            box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
          }
          to {
            box-shadow: 0 0 20px rgba(0, 0, 255, 1);
          }
        }
        .glow-border {
          position: relative;
          overflow: hidden;
        }
        .glow-border::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 2px solid transparent;
          border-image: linear-gradient(
            90deg,
            rgba(0, 0, 255, 0.5),
            rgba(0, 0, 255, 1)
          );
          border-image-slice: 1;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          animation: trail 6s infinite linear;
        }
        @keyframes trail {
          to {
            offset-distance: 100%;
          }
        }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out, padding 0.3s ease-out;
        }
        .faq-answer.open {
          max-height: 200px; /* Adjust as needed */
          padding-top: 1rem;
        }
      `}</style>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center max-w-3xl mx-auto mb-16 animate__animated animate__fadeIn'>
          <h2 className='text-3xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold mb-4'>
            Simple, Transparent Pricing
          </h2>
          <p className='text-lg text-neutral-600'>
            Choose the plan that fits your needs. All plans include the full
            power of Scrollout AI's website generation capabilities.
          </p>
        </div>

        <div className='flex justify-center mb-12 animate__animated animate__fadeIn animate__delay-1s'>
          <div className='bg-neutral-100 p-1 rounded-lg inline-flex'>
            <button
              id='monthly-toggle'
              className={`px-6 py-2 text-sm font-medium rounded-md ${
                billingPeriod === 'monthly'
                  ? 'bg-primary bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'
                  : 'text-neutral-700 hover:text-neutral-900'
              } focus:outline-none transition-colors duration-200`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              id='annual-toggle'
              className={`px-6 py-2 text-sm font-medium rounded-md ${
                billingPeriod === 'annual'
                  ? 'bg-primary bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'
                  : 'text-neutral-700 hover:text-neutral-900'
              } focus:outline-none transition-colors duration-200`}
              onClick={handleAnnualClick}
            >
              Annual{' '}
              <span className='text-xs text-green-600 ml-1'>Save 20%</span>
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto'>
          <div className='bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate__animated animate__fadeInUp'>
            <div className='p-6 sm:p-8'>
              <h3 className='text-xl font-semibold text-neutral-900 mb-1'>
                Starter
              </h3>
              <p className='text-neutral-600 mb-6'>
                Perfect for individual projects
              </p>
              <div className='flex items-baseline mb-6'>
                <span className='text-4xl font-bold text-neutral-900'>
                  {billingPeriod === 'monthly' ? '$19' : '$182'}
                </span>
                <span className='text-neutral-600 ml-2'>
                  {billingPeriod === 'monthly' ? '/month' : '/year'}
                </span>
              </div>
              <ul className='space-y-3 mb-8'>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>
                    5 website generations per month
                  </span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>
                    Up to 5 pages per site
                  </span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>
                    Basic customization options
                  </span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>Export as ZIP file</span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>Email support</span>
                </li>
              </ul>
              <a
                href='#contact'
                className='block w-full py-3 px-4 text-center rounded-lg border-2 border-primary text-primary hover:bg-neutral-800 hover:text-white font-medium transition-colors duration-300'
              >
                Get Started
              </a>
            </div>
          </div>

          <div className='bg-white rounded-2xl overflow-hidden border-2 border-primary shadow-xl relative transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 md:-mt-4 md:-mb-4 animate__animated animate__fadeInUp animate__delay-1s'>
            <div className='absolute top-0 right-0 bg-primary text-white py-1 px-4 text-sm font-medium rounded-bl-lg'>
              Most Popular
            </div>

            <div className='p-6 sm:p-8'>
              <h3 className='text-xl font-semibold text-neutral-900 mb-1'>
                Pro
              </h3>
              <p className='text-neutral-600 mb-6'>
                Best for freelancers &amp; agencies
              </p>
              <div className='flex items-baseline mb-6'>
                <span className='text-4xl font-bold text-neutral-900'>
                  {billingPeriod === 'monthly' ? '$49' : '$470'}
                </span>
                <span className='text-neutral-600 ml-2'>
                  {billingPeriod === 'monthly' ? '/month' : '/year'}
                </span>
              </div>
              <ul className='space-y-3 mb-8'>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>
                    25 website generations per month
                  </span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>
                    Up to 8 pages per site
                  </span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>
                    Advanced customization options
                  </span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>One-click deployment</span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>
                    Save templates for reuse
                  </span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>Priority support</span>
                </li>
              </ul>
              <a
                href='#contact'
                className='block w-full py-3 px-4 text-center rounded-lg text-neutral-900 bg-primary hover:bg-blue-600 hover:text-white font-medium transition-colors duration-300 shadow-lg hover:shadow-blue-500/30'
              >
                Get Started
              </a>
            </div>
          </div>

          <div className='bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate__animated animate__fadeInUp animate__delay-2s'>
            <div className='p-6 sm:p-8'>
              <h3 className='text-xl font-semibold text-neutral-900 mb-1'>
                Business
              </h3>
              <p className='text-neutral-600 mb-6'>For teams and businesses</p>
              <div className='flex items-baseline mb-6'>
                <span className='text-4xl font-bold text-neutral-900'>
                  {billingPeriod === 'monthly' ? '$99' : '$950'}
                </span>
                <span className='text-neutral-600 ml-2'>
                  {billingPeriod === 'monthly' ? '/month' : '/year'}
                </span>
              </div>
              <ul className='space-y-3 mb-8'>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>
                    Unlimited website generations
                  </span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>
                    Up to 8 pages per site
                  </span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>
                    Premium customization options
                  </span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>
                    Multiple team members (5)
                  </span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>Brand customization</span>
                </li>
                <li className='flex items-start'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0'
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
                  <span className='text-neutral-700'>
                    Dedicated support manager
                  </span>
                </li>
              </ul>
              <a
                href='#contact'
                className='block w-full py-3 px-4 text-center rounded-lg border-2 border-primary text-primary hover:bg-neutral-800 hover:text-white font-medium transition-colors duration-300'
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>

        <div className='max-w-5xl mx-auto border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-lg animate__animated animate__fadeIn animate__delay-2s'>
          <div className='px-6 py-4 bg-neutral-50 border-b border-neutral-200'>
            <h3 className='text-lg font-semibold text-neutral-900'>
              Feature Comparison
            </h3>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-neutral-200'>
              <thead>
                <tr className='bg-neutral-50'>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider'
                  >
                    Feature
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider'
                  >
                    Starter
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-center text-xs font-medium text-primary uppercase tracking-wider bg-blue-50'
                  >
                    Pro
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider'
                  >
                    Business
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-neutral-200'>
                <tr>
                  <td className='px-6 py-4 text-sm text-neutral-900'>
                    Website Generations
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    5 per month
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center bg-blue-50'>
                    25 per month
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    Unlimited
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 text-sm text-neutral-900'>
                    Pages Per Website
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    Up to 5
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center bg-blue-50'>
                    Up to 8
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    Up to 8
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 text-sm text-neutral-900'>
                    Tailwind Components
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    Basic
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center bg-blue-50'>
                    Advanced
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    Premium
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 text-sm text-neutral-900'>
                    Deployment Options
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    <span>ZIP download</span>
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center bg-blue-50'>
                    <span>ZIP + One-click deploy</span>
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    <span>ZIP + One-click deploy + CI/CD</span>
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 text-sm text-neutral-900'>
                    Team Members
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    1
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center bg-blue-50'>
                    3
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    5
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 text-sm text-neutral-900'>
                    Template Library
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    <svg
                      className='h-5 w-5 text-red-500 mx-auto'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M6 18L18 6M6 6l12 12'
                      ></path>
                    </svg>
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center bg-blue-50'>
                    <svg
                      className='h-5 w-5 text-green-500 mx-auto'
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
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    <svg
                      className='h-5 w-5 text-green-500 mx-auto'
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
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 text-sm text-neutral-900'>
                    API Access
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    <svg
                      className='h-5 w-5 text-red-500 mx-auto'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M6 18L18 6M6 6l12 12'
                      ></path>
                    </svg>
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center bg-blue-50'>
                    <svg
                      className='h-5 w-5 text-red-500 mx-auto'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M6 18L18 6M6 6l12 12'
                      ></path>
                    </svg>
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    <svg
                      className='h-5 w-5 text-green-500 mx-auto'
                      fill='none'
                      viewBox='0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5 13l4 4L19 7'
                      ></path>
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 text-sm text-neutral-900'>
                    Priority Support
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    <svg
                      className='h-5 w-5 text-red-500 mx-auto'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M6 18L18 6M6 6l12 12'
                      ></path>
                    </svg>
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center bg-blue-50'>
                    <svg
                      className='h-5 w-5 text-green-500 mx-auto'
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
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    <svg
                      className='h-5 w-5 text-green-500 mx-auto'
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
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 text-sm text-neutral-900'>
                    White Label Option
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    <svg
                      className='h-5 w-5 text-red-500 mx-auto'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M6 18L18 6M6 6l12 12'
                      ></path>
                    </svg>
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center bg-blue-50'>
                    <svg
                      className='h-5 w-5 text-red-500 mx-auto'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M6 18L18 6M6 6l12 12'
                      ></path>
                    </svg>
                  </td>
                  <td className='px-6 py-4 text-sm text-neutral-700 text-center'>
                    <svg
                      className='h-5 w-5 text-green-500 mx-auto'
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
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          id='faq'
          className='max-w-3xl mx-auto mt-20 animate__animated animate__fadeIn animate__delay-3s'
        >
          <h3 className='text-xl font-semibold text-neutral-50 mb-6 text-center'>
            Frequently Asked Questions
          </h3>
          <div className='space-y-4'>
            {[
              {
                question: 'What is Scrollout AI and how does it work?',
                answer:
                  'It leverages the AI to understand your needs and generates a full Next.js, Tailwind CSS, and TypeScript project. You can see the development process in real-time with hot reloading, make adjustments, and either deploy your site or download the complete source code.',
              },
              {
                question: 'Do you offer a free trial?',
                answer:
                  'Yes, you can try Scrollout AI with one free website generation, no credit card required. This allows you to see the quality and capabilities of our platform before committing to a subscription.',
              },
              {
                question: 'Can I change plans later?',
                answer:
                  'Absolutely! You can upgrade or downgrade your plan at any time. If you upgrade, the new pricing will take effect immediately. If you downgrade, the new pricing will apply at the start of your next billing cycle.',
              },
              {
                question: "Do I own the code that's generated?",
                answer:
                  'Yes, you own 100% of the code generated by Scrollout AI. You can use it for personal or commercial projects without any attribution requirements.',
              },
              {
                question: 'What kind of support do you offer?',
                answer:
                  'We offer multiple levels of support depending on your subscription plan:\n\n' +
                  'All Plans: Comprehensive documentation, knowledge base, and community forums.\n' +
                  'Starter Plan: Email support with a 48-hour response time.\n' +
                  'Pro Plan: Priority email support with a 24-hour response time.\n' +
                  'Business Plan: Dedicated support manager and live chat support.\n\n' +
                  'Additionally, we regularly publish tutorials, webinars, and best practices to help you get the most out of Scrollout AI.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className='bg-neutral-50 rounded-lg overflow-hidden'
              >
                <button
                  className='flex justify-between items-center w-full p-4 text-left text-neutral-900 font-medium focus:outline-none'
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`h-5 w-5 text-neutral-500 transform transition-transform duration-200 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M19 9l-7 7-7-7'
                    ></path>
                  </svg>
                </button>
                <div
                  className={`faq-answer ${openFAQ === index ? 'open' : ''}`}
                >
                  <div className='px-4 pb-4'>
                    <p className='text-neutral-600'>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='text-center mt-16 animate__animated animate__fadeIn animate__delay-3s'>
          <a
            href='#demo'
            className='inline-block bg-primary hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-blue-500/30 glow-border'
          >
            Try Scrollout AI For Free
          </a>
          <p className='text-neutral-600 mt-3'>No credit card required</p>
        </div>
      </div>
      <div className='mt-12 text-center animate__animated animate__fadeIn animate__delay-1s'>
        <h3 className='text-lg font-medium text-neutral-50 mb-3'>
          Still have questions?
        </h3>
        <a
          href='#contact'
          className='inline-block px-8 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-medium rounded-lg transition-colors duration-300'
        >
          Contact our team
        </a>
      </div>
    </section>
  );
};

export default Pricing;
