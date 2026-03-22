'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Reel, ReelItem } from '@/components/ui/reel';
import { OrbButton } from '@/components/ui/orb-button';

const reelItems: ReelItem[] = [
  {
    id: 'reel-0',
    type: 'image',
    src: 'https://scrollxui.dev/assets/blocks/hero-sections.png',
  },
  {
    id: 'reel-1',
    type: 'image',
    src: 'https://scrollxui.dev/assets/blocks/footers.png',
  },
  {
    id: 'reel-2',
    type: 'image',
    src: 'https://scrollxui.dev/assets/blocks/bento.png',
  },
  {
    id: 'reel-3',
    type: 'image',
    src: 'https://scrollxui.dev/assets/blocks/pricing-sections.png',
  },
  {
    id: 'reel-4',
    type: 'image',
    src: 'https://scrollxui.dev/assets/blocks/contact-sections.png',
  },
  {
    id: 'reel-5',
    type: 'image',
    src: 'https://scrollxui.dev/assets/blocks/testimonials.png',
  },
];

function Navbar() {
  return (
    <nav className='flex w-full items-center justify-between border-t border-b border-zinc-200 px-4 py-4 dark:border-zinc-800'>
      <div className='flex items-center gap-2'>
        <div className='size-7 rounded-lg bg-zinc-950 dark:bg-zinc-50' />
        <h1 className='text-base font-bold md:text-2xl text-zinc-900 dark:text-white'>
          ScrollX UI
        </h1>
      </div>
      <OrbButton size='sm'>Get Started</OrbButton>
    </nav>
  );
}

export default function HeroWithReel() {
  return (
    <div className='min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 flex flex-col overflow-hidden transition-colors duration-500'>
      <Navbar />

      <div className='flex-1 flex flex-col items-center pt-10 pb-16 text-center px-4'>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className='text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white max-w-2xl leading-tight tracking-tight'
        >
          Launch Faster with{' '}
          <em className='font-bold italic text-zinc-700 dark:text-zinc-300'>
            Production-Ready
          </em>
          <br />
          UI Blocks
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38, ease: 'easeOut' }}
          className='mt-5 text-base text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed'
        >
          Ship polished landing pages in hours. Pick a block, customize it, and
          move from idea to release without rebuilding layout primitives.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.52 }}
          className='mt-8'
        >
          <OrbButton>Try it Free</OrbButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className='mt-12 w-full'
        >
          <Reel
            items={reelItems}
            rows={2}
            pauseOnHover={false}
            direction='alternate'
          />
        </motion.div>
      </div>
    </div>
  );
}
