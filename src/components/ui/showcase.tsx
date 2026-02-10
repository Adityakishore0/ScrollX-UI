'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Step {
  label?: string;
  heading: string;
  description: string;
  media: string;
}

interface ShowcaseProps {
  items: Step[];
  containerClass?: string;
  cycleDelay?: number;
  mediaClass?: string;
}

function Showcase({
  items,
  containerClass,
  cycleDelay = 3000,
  mediaClass = 'h-100',
}: ShowcaseProps) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const isInitial = !hasAnimated;

  const handleClick = (idx: number) => {
    if (idx === active) return;
    setPrevious(active);
    setActive(idx);
    setHasAnimated(true);
  };

  const handleAnimationComplete = () => {
    setPrevious(active);
    setActive((c) => (c + 1) % items.length);
    setHasAnimated(true);
  };

  return (
    <div
      className={cn(
        'flex flex-col-reverse md:flex-row w-full md:items-stretch max-w-360 mx-auto',
        containerClass,
      )}
    >
      <div className='flex flex-col w-full md:w-1/2 border border-black/10 dark:border-white/10 divide-y divide-black/10 dark:divide-white/10 md:border-t'>
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            layoutId={item.heading}
            onClick={() => handleClick(idx)}
            className='p-4 md:p-10 relative cursor-pointer'
          >
            <h3 className='text-base md:text-lg leading-none text-black dark:text-white'>
              {item.heading}
            </h3>
            <p className='mt-2 text-sm text-neutral-500'>{item.description}</p>
            {idx === active && (
              <motion.div
                key={`bar-${active}`}
                className='absolute h-px bottom-0 left-0 bg-black dark:bg-white'
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: cycleDelay / 1000,
                  ease: 'linear',
                }}
                onAnimationComplete={handleAnimationComplete}
              />
            )}
          </motion.div>
        ))}
      </div>

      <div
        className={cn(
          'w-full md:w-1/2 border border-black/10 dark:border-white/10 md:border-l-0 border-b-0 md:border-b md:border-t relative p-4 md:p-5 overflow-hidden',
          mediaClass,
        )}
      >
        <div className='absolute inset-0'>
          <Image
            src={items[previous].media}
            alt={items[previous].heading}
            fill
            className='rounded object-cover'
          />
        </div>

        {!isInitial && (
          <motion.div
            key={active}
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
            className='absolute inset-0'
          >
            <Image
              src={items[active].media}
              alt={items[active].heading}
              fill
              className='rounded object-cover'
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

Showcase.displayName = 'Showcase';

export { Showcase };
