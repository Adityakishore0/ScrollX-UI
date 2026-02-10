'use client';

import Clock from '@/components/ui/clock';
import Link from 'next/link';

export default function ClockDemo() {
  return (
    <div className='relative w-full bg-background flex items-center justify-center overflow-hidden py-12'>
      <div className='relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6 max-w-7xl'>
        <div className='w-60 sm:w-full md:w-100'>
          <Clock />
        </div>
        <div className='flex flex-col items-center md:items-start text-center  md:text-left space-y-3'>
          <h1 className='text-3xl md:text-4xl font-bold  bg-linear-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white bg-clip-text text-transparent'>
            <span className='block'>Build Faster</span>
            <span className='block bg-linear-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white bg-clip-text text-transparent'>
              with ScrollX UI
            </span>
          </h1>

          <p className='text-sm text-muted-foreground max-w-48 sm:max-w-sm'>
            A modern component library
            <wbr />
            with ready-to-use
            <wbr />
            components
          </p>

          <Link
            href='/docs/components'
            className='mt-4 inline-block px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors'
          >
            SEE COMPONENTS
          </Link>
        </div>
      </div>
    </div>
  );
}
