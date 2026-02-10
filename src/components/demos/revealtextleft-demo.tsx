'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { RevealText } from '@/components/ui/reveal-text';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function RevealTextDemo() {
  const [key, setKey] = useState(0);
  const [rotate, setRotate] = useState(false);

  const handleReload = () => {
    setRotate(true);
    setKey((p) => p + 1);
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
          <RefreshCw className='h-6 w-6' />
        </motion.div>
      </Button>

      <div
        key={key}
        className='flex min-h-87.5 w-full items-center justify-center p-10'
      >
        <RevealText
          key={key}
          mode='auto'
          direction='left'
          delay={0.2}
          stagger={0.15}
          className='text-5xl font-bold'
        >
          Smooth visuals in motion
        </RevealText>
      </div>
    </>
  );
}
