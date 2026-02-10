'use client';

import { useState } from 'react';
import PixelBackground from '@/components/ui/pixel-background';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PixelBackgroundDemo() {
  const [direction, setDirection] = useState<
    | 'center'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
  >('top-right');

  return (
    <div className='relative h-100 w-full'>
      <div className='absolute top-4 right-4 z-30'>
        <Select
          value={direction}
          onValueChange={(value) => setDirection(value as typeof direction)}
        >
          <SelectTrigger className='w-35'>
            <SelectValue placeholder='Select direction' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='center'>Center</SelectItem>
              <SelectItem value='top'>Top</SelectItem>
              <SelectItem value='bottom'>Bottom</SelectItem>
              <SelectItem value='left'>Left</SelectItem>
              <SelectItem value='right'>Right</SelectItem>
              <SelectItem value='top-left'>Top Left</SelectItem>
              <SelectItem value='top-right'>Top Right</SelectItem>
              <SelectItem value='bottom-left'>Bottom Left</SelectItem>
              <SelectItem value='bottom-right'>Bottom Right</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <PixelBackground
        direction={direction}
        className='relative h-100 w-full flex flex-col items-center justify-center'
      >
        <h2 className='bg-clip-text text-transparent text-center bg-linear-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight'>
          Pixel Animation, <br /> Background.
        </h2>
      </PixelBackground>
    </div>
  );
}
