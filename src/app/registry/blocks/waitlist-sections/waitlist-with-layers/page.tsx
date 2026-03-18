'use client';

import React from 'react';
import { motion } from 'motion/react';
import { LayerStack, Card } from '@/components/ui/layer-stack';

interface WaitlistWithLayerStackProps {
  headline?: string;
  subheadline?: string;
  emailPlaceholder?: string;
  buttonText?: string;
}

const items = [
  {
    tag: '01',
    image:
      'https://images.unsplash.com/photo-1621268119110-2736e7f2618e?w=400&q=80',
  },
  {
    tag: '02',
    image:
      'https://images.unsplash.com/photo-1672908158815-89073b2efef8?w=400&q=80',
  },
  {
    tag: '03',
    image: 'https://images.unsplash.com/photo-1498746607408-1e56960e3bdd',
  },
  {
    tag: '04',
    image:
      'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&q=80',
  },
  {
    tag: '05',
    image:
      'https://images.unsplash.com/photo-1724414913941-18e868c16af3?w=400&q=80',
  },
];

export default function WaitlistWithLayerStack({
  headline = 'Join the\nwaitlist',
  subheadline = 'Be the first to experience our platform. Join our exclusive waitlist to get early access, special perks, and stay updated as we prepare to launch.',
  emailPlaceholder = 'Email address',
  buttonText = 'Join the waitlist',
}: WaitlistWithLayerStackProps) {
  return (
    <div className='relative min-h-screen w-full bg-zinc-50 dark:bg-zinc-950'>
      <div className='absolute inset-y-0 left-0 h-full w-px bg-zinc-200/80 dark:bg-zinc-800/80' />
      <div className='absolute inset-y-0 right-0 h-full w-px bg-zinc-200/80 dark:bg-zinc-800/80' />
      <div className='absolute inset-x-0 top-0 h-px w-full bg-zinc-200/80 dark:bg-zinc-800/80' />

      <div className='relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row items-center justify-between gap-8 px-4 py-12 md:py-20'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className='flex w-full lg:w-1/2 flex-col justify-center'
        >
          <div className='max-w-xl'>
            <h1 className='mb-6 text-5xl font-black italic leading-tight text-zinc-900 md:text-6xl lg:text-7xl dark:text-zinc-100'>
              {headline.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < headline.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            {subheadline && (
              <p className='mb-8 text-base text-zinc-600 md:text-lg dark:text-zinc-400'>
                {subheadline}
              </p>
            )}

            <div className='flex w-full max-w-lg flex-col gap-4 sm:flex-row'>
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
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='w-full lg:w-1/2 flex items-center justify-center'
        >
          <LayerStack
            cardWidth={280}
            cardGap={14}
            stageHeight={400}
            lastCardFullWidth={true}
            className='w-full'
          >
            {items.map((item) => (
              <Card
                key={item.tag}
                className='bg-card text-foreground border border-border overflow-hidden'
              >
                <div className='relative h-full w-full'>
                  <img
                    src={`${item.image}?w=600&q=75&auto=format`}
                    alt=''
                    loading='lazy'
                    decoding='async'
                    className='absolute inset-0 h-full w-full object-cover'
                    style={{
                      contentVisibility: 'auto',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                    }}
                  />
                  <div className='absolute top-6 left-6'>
                    <span className='text-[11px] font-medium tracking-[0.16em] uppercase text-white/80'>
                      {item.tag}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </LayerStack>
        </motion.div>
      </div>
    </div>
  );
}
