'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { LayeredText } from '@/components/ui/layered-text';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function LayeredTextDemo() {
  const [key, setKey] = useState(0);
  const [rotate, setRotate] = useState(false);

  const handleReload = () => {
    setRotate(true);
    setKey((prev) => prev + 1);
    setTimeout(() => setRotate(false), 600);
  };

  return (
    <div
      key={key}
      className={twMerge(
        'relative flex min-h-87.5 w-full justify-center items-center rounded',
      )}
    >
      <LayeredText
        key={key}
        text='ScrollX UI'
        className='text-4xl md:text-6xl font-bold text-black dark:text-white [--stroke-color:#FFFFFF] dark:[--stroke-color:#000000]'
        layers={['#06B6D4', '#14B8A6', '#84CC16']}
        offsetX={2}
        offsetY={2}
        strokeWidth={2}
        animate={true}
      />

      <Button
        onClick={handleReload}
        className='absolute right-4 top-4 p-2'
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
    </div>
  );
}
