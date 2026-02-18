'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MovingLinesBackground } from '@/components/ui/movinglines-background';
import { Iphone } from '@/components/ui/iphone';

const HEADLINE = 'Anything. Anyone. Anywhere.';

const Navbar: React.FC = () => (
  <nav className='flex w-full items-center justify-between border-t border-b border-zinc-200 px-4 py-4 dark:border-zinc-800'>
    <div className='flex items-center gap-2'>
      <div className='size-7 rounded-lg bg-black dark:bg-white' />
      <h1 className='text-base font-bold md:text-2xl text-zinc-900 dark:text-white'>
        Taskoo
      </h1>
    </div>
    <button
      type='button'
      className='whitespace-nowrap rounded-lg bg-black dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-black transition-all duration-300 hover:-translate-y-0.5'
    >
      Get Started
    </button>
  </nav>
);

const HeroSectionWithIphone: React.FC = () => {
  const words = HEADLINE.split(' ');

  return (
    <MovingLinesBackground
      speed='5s'
      opacity={0.5}
      direction='right'
      className='min-h-screen mx-auto w-full max-w-7xl bg-zinc-50 dark:bg-zinc-950'
    >
      <div className='relative w-full max-w-7xl flex flex-col items-center justify-center'>
        <Navbar />
        <div className='absolute inset-y-0 left-0 h-full w-px bg-zinc-200/80 dark:bg-zinc-800/80'>
          <div className='absolute top-0 h-40 w-px bg-linear-to-b from-transparent via-zinc-400 to-transparent dark:via-zinc-500' />
        </div>
        <div className='absolute inset-y-0 right-0 h-full w-px bg-zinc-200/80 dark:bg-zinc-800/80'>
          <div className='absolute h-40 w-px bg-linear-to-b from-transparent via-zinc-400 to-transparent dark:via-zinc-500' />
        </div>
        <div className='absolute inset-x-0 bottom-0 h-px w-full bg-zinc-200/80 dark:bg-zinc-800/80'>
          <div className='absolute mx-auto h-px w-40 bg-linear-to-r from-transparent via-zinc-400 to-transparent dark:via-zinc-500' />
        </div>

        <div className='px-4 py-10 md:py-20 w-full flex flex-col items-center'>
          <h1 className='relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-zinc-800 md:text-4xl lg:text-7xl dark:text-zinc-100'>
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: 'easeInOut',
                }}
                className='mr-2 inline-block'
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <div className='relative w-full flex flex-col items-center mt-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className='relative z-10 w-full max-w-sm px-4'
              style={{ height: '320px', overflow: 'hidden' }}
            >
              <Iphone showHeader imgUrl='/images/iphone-app.png' />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.2 }}
              className='relative z-20 w-full rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900'
            >
              <div className='w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700'>
                <img
                  src='https://images.pexels.com/photos/892757/pexels-photo-892757.jpeg'
                  alt='Landing page preview'
                  className='aspect-video h-auto w-full object-cover'
                  height={1000}
                  width={1000}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MovingLinesBackground>
  );
};

export default HeroSectionWithIphone;
