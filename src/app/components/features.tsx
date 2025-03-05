'use client';
import React from 'react';

const Features: React.FC = () => {
  return (
    <section id='features' className='py-20 bg-neutral-900'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center max-w-3xl mx-auto mb-16 animate__animated animate__fadeIn'>
          <h2 className='text-3xl font-bold  bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4'>
            Prebuilt Components for Modern Web Development
          </h2>
          <p className='text-lg text-neutral-600'>
            Accessible, Free, and Doubly Awesome!
          </p>
        </div>

        <div className='grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-8 mb-16'>
          <div className='bg-neutral-50 w-56 h-56 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate__animated animate__fadeInUp'></div>

          <div className='bg-neutral-50 w-56 h-56 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate__animated animate__fadeInUp animate__delay-1s'></div>

          <div className='bg-neutral-50 w-56 h-56 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate__animated animate__fadeInUp'></div>

          <div className='bg-neutral-50 w-56 h-56 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate__animated animate__fadeInUp animate__delay-1s'></div>

          <div className='bg-neutral-50 w-56 h-56 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate__animated animate__fadeInUp animate__delay-2s'></div>
        </div>
      </div>
    </section>
  );
};

export default Features;
