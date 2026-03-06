'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { OrbButton } from '@/components/ui/orb-button';

const CARDS = [
  {
    src: 'https://images.unsplash.com/photo-1621268119110-2736e7f2618e?w=400&q=80',
    alt: 'Friends',
    rotate: -22,
    delay: 0.9,
    z: 10,
  },
  {
    src: 'https://images.unsplash.com/photo-1672908158815-89073b2efef8?w=400&q=80',
    alt: 'Woman portrait',
    rotate: -11,
    delay: 0.75,
    z: 20,
  },
  {
    src: 'https://images.unsplash.com/photo-1498746607408-1e56960e3bdd',
    alt: 'Man portrait',
    rotate: 0,
    delay: 0.6,
    z: 30,
  },
  {
    src: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&q=80',
    alt: 'Portrait',
    rotate: 11,
    delay: 0.75,
    z: 20,
  },
  {
    src: 'https://images.unsplash.com/photo-1724414913941-18e868c16af3?w=400&q=80',
    alt: 'Street style',
    rotate: 22,
    delay: 0.9,
    z: 10,
  },
];

const Navbar: React.FC = () => (
  <nav className='flex w-full items-center justify-between border-t border-b border-zinc-200 px-4 py-4 dark:border-zinc-800'>
    <div className='flex items-center gap-2'>
      <div className='size-7 rounded-lg bg-zinc-950 dark:bg-zinc-50' />
      <h1 className='text-base font-bold md:text-2xl text-zinc-900 dark:text-white'>
        Scrapee
      </h1>
    </div>
    <OrbButton size='sm'>Get Started</OrbButton>
  </nav>
);

const HeroSectionwithCards: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 flex flex-col overflow-hidden transition-colors duration-500'>
      <Navbar />

      <div className='flex-1 flex flex-col items-center pt-10 pb-0 text-center px-4'>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className='text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white max-w-2xl leading-tight tracking-tight'
        >
          Create{' '}
          <em className='font-bold italic text-zinc-700 dark:text-zinc-300'>
            Social Content
          </em>
          <br />
          that&apos;s ready to perform
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38, ease: 'easeOut' }}
          className='mt-5 text-base text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed'
        >
          Create, schedule, and optimize your entire social strategy in minutes,
          not hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.52 }}
          className='mt-8'
        >
          <OrbButton>Try it Free</OrbButton>
        </motion.div>

        <div
          className='relative mt-10 flex items-end justify-center'
          style={{ height: 380, width: '100%' }}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: card.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              className='absolute bottom-0 origin-bottom'
              style={{
                rotate: card.rotate,
                zIndex: card.z,
                translateX: `${(i - 2) * 120}px`,
              }}
            >
              <Card className='w-48 h-72 md:w-56 md:h-80 p-0 overflow-hidden shadow-xl ring-2 ring-white/60 dark:ring-zinc-700/60 border-0 rounded-2xl'>
                <CardContent className='p-0 w-full h-full'>
                  <img
                    src={card.src}
                    alt={card.alt}
                    className='w-full h-full object-cover'
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSectionwithCards;
