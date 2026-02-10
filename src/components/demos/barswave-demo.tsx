'use client';

import { BarsWave } from '@/components/ui/barswave';

export default function BarsWaveDemo() {
  return (
    <BarsWave
      barCount={14}
      minHeight={20}
      maxHeight={80}
      variant='outlined'
      animationDuration={2}
      className='w-full h-87.5'
    >
      <h2 className='bg-clip-text text-transparent text-center bg-linear-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight'>
        Bars Animation, <br /> Background.
      </h2>
    </BarsWave>
  );
}
