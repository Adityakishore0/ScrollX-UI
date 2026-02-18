'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MovingLinesBackground } from '@/components/ui/movinglines-background';
import { LayerStack, Card } from '@/components/ui/layer-stack';

const HEADLINE = 'Stack beautiful layers without breaking your layout';

const items = [
  {
    tag: '01',
    title: 'Ocean Horizon',
    body: 'Discover untouched coastlines shaped by wind, water, and the quiet beauty of nature.',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86',
  },
  {
    tag: '02',
    title: 'Cityscapes',
    body: 'Peak is the heart of your horizon. Viewing high is half the beauty.',
    image: 'https://images.unsplash.com/photo-1665430790518-7831e5790aa0',
  },
  {
    tag: '03',
    title: 'Nature Design',
    body: 'Wilderness that feels inescapable, not artificial — finding serenity with silence.',
    image: 'https://images.unsplash.com/photo-1528826542659-27db5adea13c',
  },
  {
    tag: '04',
    title: 'Visual Balance',
    body: 'Reflection that feels symmetrical, not accidental — doubling beauty.',
    image: 'https://images.unsplash.com/photo-1663188285007-23a6d501efb6',
  },
  {
    tag: '05',
    title: 'Forms & Light',
    body: 'Sculpture creates meaning. A golden glow is the ephemeral soul behind great land.',
    image: 'https://images.unsplash.com/photo-1691898480873-1869d1a344cf',
  },
  {
    tag: '06',
    title: 'City Rhythm',
    body: 'Every sign, light, and shadow is a conversation between city and traveler.',
    image: 'https://images.unsplash.com/photo-1648809211550-ec3e788b999d',
  },
];

const Navbar: React.FC = () => (
  <nav className='flex w-full items-center justify-between border-t border-b border-zinc-200 px-4 py-4 dark:border-zinc-800'>
    <div className='flex items-center gap-2'>
      <div className='size-7 rounded-lg bg-linear-to-br from-indigo-500 to-violet-500' />
      <h1 className='text-base font-bold md:text-2xl text-zinc-900 dark:text-white'>
        LayerStack
      </h1>
    </div>
    <button
      type='button'
      className='whitespace-nowrap rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400'
    >
      Get Started
    </button>
  </nav>
);

const HeroSection: React.FC = () => {
  const words = HEADLINE.split(' ');

  return (
    <MovingLinesBackground
      speed='5s'
      opacity={0.5}
      direction='right'
      className='min-h-screen mx-auto w-full max-w-7xl bg-zinc-50 dark:bg-zinc-950'
    >
      <div className='relative  w-full max-w-7xl flex flex-col items-center justify-center'>
        <Navbar />
        <div className='absolute inset-y-0 left-0 h-full w-px bg-zinc-200/80 dark:bg-zinc-800/80'>
          <div className='absolute top-0 h-40 w-px bg-linear-to-b from-transparent via-indigo-500 to-transparent' />
        </div>
        <div className='absolute inset-y-0 right-0 h-full w-px bg-zinc-200/80 dark:bg-zinc-800/80'>
          <div className='absolute h-40 w-px bg-linear-to-b from-transparent via-violet-500 to-transparent' />
        </div>
        <div className='absolute inset-x-0 bottom-0 h-px w-full bg-zinc-200/80 dark:bg-zinc-800/80'>
          <div className='absolute mx-auto h-px w-40 bg-linear-to-r from-transparent via-indigo-500 to-transparent' />
        </div>

        <div className='px-4 py-10 md:py-20'>
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className='relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-zinc-500 dark:text-zinc-400'
          >
            LayerStack lets you present layered content with depth and motion
            while keeping performance sharp and layouts perfectly aligned. Build
            immersive sections that feel intentional, not accidental.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
            className='relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4'
          >
            <button
              type='button'
              className='w-60 transform rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700'
            >
              Explore Layers
            </button>
            <button
              type='button'
              className='w-60 transform rounded-lg border border-zinc-300 bg-white px-6 py-2 font-medium text-zinc-800 transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800'
            >
              View Documentation
            </button>
          </motion.div>

          <LayerStack
            cardWidth={300}
            cardGap={14}
            stageHeight={380}
            lastCardFullWidth={true}
            className='pt-8'
          >
            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              if (isLast) {
                return (
                  <Card
                    key={item.tag}
                    className='bg-card text-foreground border border-border overflow-hidden'
                  >
                    <div className='flex h-full flex-col md:flex-row'>
                      <div className='relative md:w-1/2 h-48 md:h-full overflow-hidden'>
                        <img
                          src={`${item.image}?w=600&q=75&auto=format`}
                          alt={item.title}
                          loading='lazy'
                          decoding='async'
                          className='absolute inset-0 h-full w-full object-cover'
                          style={{
                            contentVisibility: 'auto',
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                          }}
                        />
                      </div>
                      <div className='flex md:w-1/2 flex-col justify-between p-8 gap-4'>
                        <div className='flex items-center justify-between'>
                          <span className='text-[11px] font-medium tracking-[0.16em] uppercase text-muted-foreground'>
                            {item.tag}
                          </span>
                          <div className='size-1.5 rounded-full bg-foreground/20 dark:bg-foreground/40' />
                        </div>
                        <div className='space-y-3'>
                          <div className='h-px w-8 bg-border' />
                          <h2 className='text-2xl font-semibold tracking-tight leading-tight'>
                            {item.title}
                          </h2>
                          <p className='text-sm leading-relaxed text-muted-foreground'>
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              }

              return (
                <Card
                  key={item.tag}
                  className='bg-card text-foreground border border-border overflow-hidden'
                >
                  <div className='flex h-full flex-col p-8 gap-4'>
                    <div className='flex items-center justify-between'>
                      <span className='text-[11px] font-medium tracking-[0.16em] uppercase text-muted-foreground'>
                        {item.tag}
                      </span>
                      <div className='size-1.5 rounded-full bg-foreground/20 dark:bg-foreground/40' />
                    </div>
                    <div className='relative flex-1 overflow-hidden rounded-sm'>
                      <img
                        src={`${item.image}?w=600&q=75&auto=format`}
                        alt={item.title}
                        loading='lazy'
                        decoding='async'
                        className='absolute inset-0 h-full w-full object-cover'
                        style={{
                          contentVisibility: 'auto',
                          transform: 'translateZ(0)',
                          backfaceVisibility: 'hidden',
                        }}
                      />
                    </div>
                    <div className='space-y-3'>
                      <div className='h-px w-8 bg-border' />
                      <h2 className='text-2xl font-semibold tracking-tight leading-tight'>
                        {item.title}
                      </h2>
                      <p className='text-sm leading-relaxed text-muted-foreground'>
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </LayerStack>
        </div>
      </div>
    </MovingLinesBackground>
  );
};

export default HeroSection;
