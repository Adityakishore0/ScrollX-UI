'use client';

import PixelBackground from '@/components/ui/pixel-background';

export default function PixelBackgroundDemo() {
  return (
    <PixelBackground className='relative h-100 w-full flex flex-col items-center justify-center'>
      <h2 className='bg-clip-text text-transparent text-center bg-linear-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight'>
        Pixel Animation, <br /> Background.
      </h2>
    </PixelBackground>
  );
}
