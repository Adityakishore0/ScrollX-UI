'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Timeline, TimelineText } from '@/components/ui/timeline';
import PixelBackground from '@/components/ui/pixel-background';

const Navbar: React.FC = () => (
  <nav className='flex w-full items-center justify-between border-t border-b border-zinc-200 dark:border-zinc-800 px-6 py-4'>
    <div className='flex items-center gap-2'>
      <div className='size-7 rounded-lg bg-yellow-400' />
      <h1 className='text-base font-bold md:text-xl text-zinc-900 dark:text-white'>
        ScrollX UI
      </h1>
    </div>
    <button
      type='button'
      className='rounded-lg bg-neutral-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-700 dark:hover:bg-zinc-200'
    >
      Get Started
    </button>
  </nav>
);

export default function HeroSectionwithPixelBackground() {
  return (
    <div className='relative min-h-screen w-full bg-white dark:bg-[#0a0a0a] overflow-hidden'>
      <div
        className='absolute inset-x-0 top-0 h-64 pointer-events-none'
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, transparent 100%)',
        }}
      >
        <PixelBackground
          gap={6}
          speed={60}
          colors='#d4d4d4,#e5e5e5,#c4c4c4,#bababa'
          opacity={0.7}
          direction='top'
          className='w-full h-full dark:[&>canvas]:hidden'
        />
        <PixelBackground
          gap={6}
          speed={60}
          colors='#1a1a1a,#2a2a2a,#333333,#111111'
          opacity={1}
          direction='top'
          className='w-full h-full hidden dark:block absolute inset-0'
        />
      </div>

      <div className='relative flex min-h-screen flex-col'>
        <Navbar />

        <div className='flex flex-1 flex-col items-center justify-center px-6 py-12'>
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className='mb-8 flex items-center gap-2'
          >
            <span className='text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500'>
              Est. 2026
            </span>
            <span className='h-px w-8 bg-zinc-300 dark:bg-zinc-700' />
            <span className='text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500'>
              Studio
            </span>
          </motion.div>

          <div className='flex flex-col items-center gap-1'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className='text-zinc-900 dark:text-white text-4xl md:text-7xl lg:text-9xl font-black tracking-tight leading-none text-center'
            >
              We Design
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className='text-zinc-900 dark:text-white text-4xl md:text-7xl lg:text-9xl font-black tracking-tight leading-none text-center'
            >
              The Future
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.44,
                ease: [0.22, 1, 0.36, 1],
              }}
              className='mt-2'
            >
              <Timeline
                rotation={-1.2}
                initialLeft={10}
                minWidth={56}
                containerClassName='bg-white dark:bg-[#0a0a0a]'
                handleClassName='bg-white dark:bg-[#0a0a0a] border-yellow-400'
                handleIndicatorClassName='bg-yellow-400'
              >
                <TimelineText className='text-yellow-500 dark:text-yellow-400 text-4xl md:text-7xl lg:text-9xl font-black tracking-tight py-3'>
                  Of Interfaces
                </TimelineText>
              </Timeline>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            className='mt-12 max-w-md text-center text-sm leading-relaxed text-zinc-500 dark:text-zinc-500'
          >
            Crafting digital experiences that live at the intersection of
            motion, precision, and uncompromising visual intent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
            className='mt-10 flex items-center gap-4'
          >
            <button
              type='button'
              className='border-2 border-yellow-400 bg-yellow-400 px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-yellow-300 hover:border-yellow-300'
            >
              Start a Project
            </button>
            <button
              type='button'
              className='border-2 border-zinc-300 dark:border-zinc-700 px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300 transition-colors duration-300 hover:border-zinc-500 dark:hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            >
              View Work
            </button>
          </motion.div>
        </div>
      </div>

      <div className='pointer-events-none absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-zinc-300/60 dark:via-zinc-700/40 to-transparent' />
    </div>
  );
}
