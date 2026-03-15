'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface SpotlightItem {
  title: string;
  description: string;
}

interface FeaturesWithSpotlightProps {
  heading?: string;
  items?: SpotlightItem[];
  autoPlayInterval?: number;
  showDots?: boolean;
  className?: string;
}

export default function FeaturesWithSpotlight({
  heading = 'Most SaaS Products fail at',
  items = [
    {
      title: 'Slow and hard to scale',
      description:
        'Servers buckle under load, latency spikes at the worst times, and engineers are stuck fixing fires instead of shipping.',
    },
    {
      title: 'Siloed across your stack',
      description:
        'Your data lives in five places and talks to none of them. Decisions get made on guesswork because the truth is always somewhere else.',
    },
    {
      title: 'Painful to onboard onto',
      description:
        'New teammates spend weeks just getting oriented. Docs are outdated, flows are buried, and no one agrees on how things work.',
    },
    {
      title: 'Designed to resist change',
      description:
        'Every small tweak requires a big effort. The codebase grows heavier, the team moves slower, and momentum quietly dies.',
    },
  ],
  autoPlayInterval = 5000,
  showDots = true,
  className,
}: FeaturesWithSpotlightProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [descIndex, setDescIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [items.length, autoPlayInterval, resetKey]);

  useEffect(() => {
    const t = setTimeout(() => {
      setDescIndex(activeIndex);
    }, 350);
    return () => clearTimeout(t);
  }, [activeIndex]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    setResetKey((k) => k + 1);
  };

  return (
    <section
      className={cn(
        'w-full bg-white dark:bg-zinc-950 py-16 md:py-24',
        className,
      )}
    >
      <div className='max-w-6xl mx-auto px-6'>
        <div className='hidden md:flex flex-row'>
          <div className='w-1/2 pr-12 flex flex-col gap-10 border-r border-zinc-200 dark:border-zinc-800'>
            <h2 className='text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight'>
              {heading}
            </h2>
            <ul className='flex flex-col gap-4'>
              {items.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSelect(index)}
                    className={cn(
                      'text-left text-base md:text-lg font-medium transition-all duration-300 cursor-pointer',
                      activeIndex === index
                        ? 'text-zinc-900 dark:text-zinc-100'
                        : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400',
                    )}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className='w-1/2 pl-12 flex items-center min-h-40 overflow-hidden'>
            <AnimatePresence mode='wait'>
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, filter: 'blur(6px)', y: 20 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(6px)', y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className='text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed'
              >
                {items[activeIndex].description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className='flex md:hidden flex-col items-center text-center gap-8'>
          <h2 className='text-xl font-bold text-zinc-900 dark:text-zinc-100'>
            {heading}
          </h2>

          <div className='flex flex-col items-center gap-3 px-4 min-h-32 overflow-hidden'>
            <div className='overflow-hidden'>
              <AnimatePresence mode='wait'>
                <motion.h3
                  key={`title-${activeIndex}`}
                  initial={{ opacity: 0, filter: 'blur(6px)', y: 20 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  exit={{ opacity: 0, filter: 'blur(6px)', y: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className='text-base font-semibold text-zinc-900 dark:text-zinc-100'
                >
                  {items[activeIndex].title}
                </motion.h3>
              </AnimatePresence>
            </div>

            <div className='overflow-hidden'>
              <AnimatePresence mode='wait'>
                <motion.p
                  key={`desc-${descIndex}`}
                  initial={{ opacity: 0, filter: 'blur(6px)', y: 20 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  exit={{ opacity: 0, filter: 'blur(6px)', y: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className='text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed'
                >
                  {items[descIndex].description}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {showDots && (
            <div className='flex gap-2'>
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  aria-label={item.title}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    activeIndex === index
                      ? 'w-6 bg-zinc-900 dark:bg-zinc-100'
                      : 'w-1.5 bg-zinc-300 dark:bg-zinc-700',
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
