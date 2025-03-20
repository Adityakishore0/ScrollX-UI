'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

const HomeStyle: React.FC = () => {
  const [pulled, setPulled] = useState(false);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start pt-10 transition-colors duration-500 ${
        pulled ? 'bg-slate-950 text-white' : 'bg-white text-black'
      }`}
    >
      <motion.div
        initial={{ width: '60%' }}
        animate={{ width: '50%' }}
        transition={{ duration: 1 }}
        className={`relative flex items-center justify-between w-3/5 h-12 px-4 border rounded-xl transition-colors duration-500 ${
          pulled ? 'border-white' : 'border-black'
        }`}
      >
        <Image
          src='/favicon/favicon-16x16.png'
          alt='Logo'
          width={24}
          height={24}
          className='cursor-pointer bg-black'
        />

        <div className='flex space-x-6 justify-center items-center'>
          <a href='/' className='text-lg font-medium hover:underline'>
            Home
          </a>
          <a href='/Docs' className='text-lg font-medium hover:underline'>
            Docs
          </a>

          <div className='relative flex items-center w-fit border border-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-xl'>
            <input
              type='text'
              placeholder='Search Components'
              className='text-sm text-muted-foreground dark:border-white/[0.2] py-2 px-4 w-40 sm:w-56 border-none bg-transparent focus:outline-none'
            />
            <kbd className='pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
              <span className='text-xs'>⌘</span>K
            </kbd>
            <button className='flex justify-center items-center px-3 py-2 bg-black text-white rounded-r-xl transition-colors duration-300 hover:bg-gray-800'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='h-4 w-4 text-white'
              >
                <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0'></path>
                <path d='M21 21l-6 -6'></path>
              </svg>
            </button>
          </div>
        </div>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: pulled ? '70px' : '50px' }}
          transition={{ duration: 1 }}
          className={`absolute right-2 top-12 w-1 cursor-pointer z-[999] transition-colors duration-500 ${
            pulled ? 'bg-white' : 'bg-black'
          }`}
          onClick={() => setPulled((prev) => !prev)}
        >
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full transition-colors duration-500 ${
              pulled ? 'bg-white' : 'bg-black'
            }`}
          ></div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: pulled ? '75%' : 0, opacity: pulled ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className='relative border-t border-cyan-400 mt-4 transition-all duration-500'
        style={{
          boxShadow: pulled
            ? '0 0 30px #00FFFF, 0 0 60px rgba(0, 255, 255, 0.8), 0 0 100px rgba(0, 255, 255, 0.6), 0 0 150px rgba(0, 255, 255, 0.3)'
            : 'none',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: pulled ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className='absolute top-full left-1/2 transform -translate-x-1/2 w-full h-32'
          style={{
            background: pulled
              ? 'radial-gradient(circle, rgba(0, 255, 255, 0.7) 0%, rgba(0, 255, 255, 0.3) 50%, rgba(0, 255, 255, 0) 100%)'
              : 'none',
            filter: pulled ? 'blur(30px)' : 'none',
          }}
        ></motion.div>
      </motion.div>
      <h1 className='mt-6 text-6xl font-bold tracking-wide'>SCROLLX UI</h1>
      <motion.div
        initial={{ width: '75%', opacity: 1 }}
        animate={{ width: pulled ? 0 : '75%', opacity: pulled ? 0 : 1 }}
        transition={{ duration: 1 }}
        className={`border-t mt-4 transition-colors duration-500 ${
          pulled ? 'border-white' : 'border-black'
        }`}
      ></motion.div>
      <p className='mt-4 text-center text-lg max-w-xl'>
        An open-source collection of animated, interactive & fully customizable
        components for building stunning, memorable user interfaces.
      </p>
      <div className='mt-8'>{/* Your component here */}</div>
    </div>
  );
};

export default HomeStyle;
