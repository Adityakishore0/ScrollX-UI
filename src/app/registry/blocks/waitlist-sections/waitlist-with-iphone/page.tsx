'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Iphone } from '@/components/ui/iphone';

interface WaitlistWithIphoneProps {
  headline?: string;
  subheadline?: string;
  emailPlaceholder?: string;
  buttonText?: string;
  iphoneImgUrl?: string;
}

export default function WaitlistWithIphone({
  headline = 'Join the waitlist',
  subheadline = 'Be the first to experience our platform. Join our exclusive waitlist to get early access, special perks, and stay updated as we prepare to launch.',
  emailPlaceholder = 'Email address',
  buttonText = 'Join the waitlist',
  iphoneImgUrl = 'https://cdn.pixabay.com/photo/2013/07/13/12/43/girl-160172_1280.png',
}: WaitlistWithIphoneProps) {
  return (
    <div className='relative min-h-screen w-full bg-zinc-50 dark:bg-zinc-950'>
      <div className='absolute inset-y-0 left-0 h-full w-px bg-zinc-200/80 dark:bg-zinc-800/80' />
      <div className='absolute inset-y-0 right-0 h-full w-px bg-zinc-200/80 dark:bg-zinc-800/80' />
      <div className='absolute inset-x-0 top-0 h-px w-full bg-zinc-200/80 dark:bg-zinc-800/80' />

      <div className='relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pt-12 md:pt-20'>
        <div className='flex flex-1 flex-col items-center justify-center pb-0'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-8 w-full max-w-4xl text-center'
          >
            <h1 className='mb-4 text-4xl font-black italic leading-tight text-zinc-900 md:text-6xl lg:text-7xl dark:text-zinc-100'>
              {headline.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < headline.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            {subheadline && (
              <p className='mx-auto max-w-3xl text-base text-zinc-600 md:text-lg dark:text-zinc-400'>
                {subheadline}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mb-12 flex w-full max-w-lg flex-col items-center gap-4 sm:flex-row'
          >
            <input
              type='email'
              name='email'
              placeholder={emailPlaceholder}
              className='w-full rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm text-zinc-900 placeholder-zinc-500 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-400 dark:focus:border-zinc-100 dark:focus:ring-zinc-100'
            />
            <button
              type='button'
              className='w-full whitespace-nowrap rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800 sm:w-auto dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200'
            >
              {buttonText}
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='relative mx-auto w-full max-w-sm overflow-hidden'
          style={{ height: '55vh', maxHeight: '300px' }}
        >
          <Iphone showHeader imgUrl={iphoneImgUrl} />
        </motion.div>
      </div>
    </div>
  );
}
