'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Iphone } from '@/components/ui/iphone';

interface DownloadWithIphoneProps {
  badge?: string;
  headline?: string;
  iphoneImgUrl?: string;
}

const AppleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    className={className}
  >
    <path
      fill='currentColor'
      d='M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25'
    />
  </svg>
);

const GooglePlayIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    className={className}
  >
    <path
      fill='currentColor'
      d='m22.018 13.298l-3.919 2.218l-3.515-3.493l3.543-3.521l3.891 2.202a1.49 1.49 0 0 1 0 2.594M1.337.924a1.5 1.5 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087zm12.207 10.065l3.258-3.238L3.45.195a1.47 1.47 0 0 0-.946-.179zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54z'
    />
  </svg>
);

export default function DownloadWithIphone({
  badge = 'Now Available!',
  headline = 'Anything. Anyone.\nAnywhere.',
  iphoneImgUrl = 'https://cdn.pixabay.com/photo/2013/07/13/12/43/girl-160172_1280.png',
}: DownloadWithIphoneProps) {
  const words = headline.replace(/\n/g, ' ').split(' ');

  return (
    <div className='relative min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 overflow-hidden'>
      <div className='relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-4 pt-8 md:pt-20'>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-6 sm:mb-10 tall:mb-16'
        >
          <span className='inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-zinc-900'>
            <span>✦</span>
            {badge}
          </span>
        </motion.div>

        <h1 className='relative z-10 mx-auto mb-6 md:mb-12 max-w-4xl text-center text-5xl font-bold text-zinc-800 md:text-6xl lg:text-7xl dark:text-zinc-100'>
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
              className='mr-2 inline-block wrap-break-word'
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <div className='relative flex w-full items-center justify-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className='relative mx-auto w-full max-w-xs'
            style={{ height: '60vh', maxHeight: '420px' }}
          >
            <Iphone>
              <div className='absolute inset-0 z-10'>
                <img
                  src={iphoneImgUrl}
                  alt='App preview'
                  className='w-full h-full object-cover object-top'
                />

                <div className='absolute top-[35%] left-0 right-0 z-30 flex flex-col gap-2 px-4 md:hidden'>
                  <button
                    type='button'
                    className='flex items-center gap-2.5 rounded-2xl bg-black dark:bg-white px-4 py-2.5 shadow-lg transition-opacity hover:opacity-90 active:opacity-75'
                  >
                    <AppleIcon className='h-6 w-6 shrink-0 text-white dark:text-black' />
                    <div className='leading-tight'>
                      <p className='text-[9px] text-white/60 dark:text-black/60'>
                        Download on the
                      </p>
                      <p className='text-xs font-semibold text-white dark:text-black'>
                        App Store
                      </p>
                    </div>
                  </button>

                  <button
                    type='button'
                    className='flex items-center gap-2.5 rounded-2xl bg-black dark:bg-white px-4 py-2.5 shadow-lg transition-opacity hover:opacity-90 active:opacity-75'
                  >
                    <GooglePlayIcon className='h-5 w-5 shrink-0 text-white dark:text-black' />
                    <div className='leading-tight'>
                      <p className='text-[9px] text-white/60 dark:text-black/60'>
                        GET IT ON
                      </p>
                      <p className='text-xs font-semibold text-white dark:text-black'>
                        Google Play
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </Iphone>
          </motion.div>

          <motion.button
            type='button'
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className='absolute left-4 md:left-12 lg:left-24 hidden md:flex items-center gap-3 rounded-xl bg-black dark:bg-white px-4 py-2.5 shadow-sm transition-all hover:opacity-90 hover:shadow-md'
          >
            <AppleIcon className='h-9 w-9 text-white dark:text-black' />
            <div>
              <p className='text-[10px] text-white/60 dark:text-black/60'>
                Download on the
              </p>
              <p className='text-sm font-semibold text-white dark:text-black'>
                App Store
              </p>
            </div>
          </motion.button>

          <motion.button
            type='button'
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className='absolute right-4 md:right-12 lg:right-24 hidden md:flex items-center gap-3 rounded-xl bg-black dark:bg-white px-4 py-2.5 shadow-sm transition-all hover:opacity-90 hover:shadow-md'
          >
            <GooglePlayIcon className='h-7 w-7 text-white dark:text-black' />
            <div>
              <p className='text-[10px] text-white/60 dark:text-black/60'>
                GET IT ON
              </p>
              <p className='text-sm font-semibold text-white dark:text-black'>
                Google Play
              </p>
            </div>
          </motion.button>
        </div>
      </div>

      <div className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-t from-zinc-50 to-transparent dark:from-zinc-950' />
    </div>
  );
}
