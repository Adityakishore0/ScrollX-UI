'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { FancyText } from '@/components/ui/fancy-text';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function FancyTextDemo() {
  const [key, setKey] = useState(0);
  const [rotate, setRotate] = useState(false);

  const handleReload = () => {
    setRotate(true);
    setKey((prev) => prev + 1);
    setTimeout(() => setRotate(false), 600);
  };

  return (
    <>
      <Button
        onClick={handleReload}
        className='absolute right-4 top-4 p-2 z-20'
        aria-label='Reload animation'
        variant='outline'
      >
        <motion.div
          animate={{ rotate: rotate ? 360 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <RefreshCw className='w-6 h-6' />
        </motion.div>
      </Button>

      <div
        key={key}
        className={twMerge(
          'flex min-h-87.5 w-full items-center justify-center rounded p-10',
        )}
      >
        <FancyText
          key={key}
          className='text-4xl md:text-8xl font-black leading-none text-black/10 dark:text-white/10'
          fillClassName='text-black dark:text-white'
          stagger={0.06}
          duration={1.2}
          delay={0.2}
        >
          Authentic.
        </FancyText>
      </div>
    </>
  );
}
