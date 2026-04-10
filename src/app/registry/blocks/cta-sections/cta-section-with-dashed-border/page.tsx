'use client';

import { cn } from '@/lib/utils';
import { Headset } from 'lucide-react';

interface CTASectionWithDashedBorderProps {
  heading?: string;
  highlightedText?: string;
  accentText?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  testimonial?: string;
  testimonialName?: string;
  testimonialRole?: string;
  className?: string;
}

export default function CTASectionWithDashedBorder({
  heading = 'Scale your business with',
  highlightedText = '10 engineers',
  accentText = 'first month completely free',
  primaryButtonLabel = 'Start now',
  secondaryButtonLabel = 'Chat with us',
  testimonial = "This is the most reliable platform ever when it comes to building. Ten on ten recommended. I just can't stop thinking about what comes next with this tool.",
  testimonialName = 'Lynlyn small',
  testimonialRole = 'Full stack developer',
  className,
}: CTASectionWithDashedBorderProps) {
  return (
    <section
      className={cn(
        'relative z-20 mx-auto my-20 grid w-full max-w-6xl grid-cols-1 justify-start overflow-hidden bg-linear-to-br from-gray-100 to-white md:my-40 md:overflow-visible md:grid-cols-3 dark:from-neutral-900 dark:to-neutral-950',
        className,
      )}
    >
      <BorderLine position='top' />
      <BorderLine position='bottom' />
      <BorderLine position='left' />
      <BorderLine position='right' />

      <div className='p-8 md:col-span-2 md:p-14'>
        <h2 className='text-left text-xl font-medium tracking-tight text-neutral-500 md:text-3xl dark:text-neutral-200'>
          {heading}{' '}
          <span className='font-bold text-black dark:text-white'>
            {highlightedText}{' '}
          </span>
          and get
          <span className='font-bold text-indigo-500 dark:text-indigo-500'>
            {' '}
            {accentText}
          </span>
          .
        </h2>

        <div className='flex flex-col items-start sm:flex-row sm:items-center sm:gap-4'>
          <button className='group mt-8 flex items-center space-x-2 rounded-lg bg-linear-to-b from-indigo-500 to-indigo-700 px-4 py-2 text-base text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]'>
            <span>{primaryButtonLabel}</span>
          </button>

          <button className='group mt-8 flex items-center space-x-2 rounded-lg border border-neutral-200 px-4 py-2 text-base text-black shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] dark:border-neutral-800 dark:text-white'>
            <span>{secondaryButtonLabel}</span>
            <Headset className='mt-0.5 h-3 w-3 stroke-[1px] text-black transition-transform duration-200 group-hover:translate-x-1 dark:text-white' />
          </button>
        </div>
      </div>

      <div className='border-t border-dashed p-8 md:border-l md:border-t-0 md:p-14'>
        <p className='text-base text-neutral-700 dark:text-neutral-200'>
          &ldquo;{testimonial}&rdquo;
        </p>
        <div className='mt-4 flex flex-col items-start gap-1 text-sm'>
          <p className='font-bold text-neutral-800 dark:text-neutral-200'>
            {testimonialName}
          </p>
          <p className='text-neutral-500 dark:text-neutral-400'>
            {testimonialRole}
          </p>
        </div>
      </div>
    </section>
  );
}

interface BorderLineProps {
  position: 'top' | 'bottom' | 'left' | 'right';
}

function BorderLine({ position }: BorderLineProps) {
  const isHorizontal = position === 'top' || position === 'bottom';

  return (
    <div
      className={cn(
        'absolute z-30',
        isHorizontal
          ? 'left-0 h-(--height) w-full md:left-[calc(var(--offset)/2*-1)] md:w-[calc(100%+var(--offset))] bg-size-[var(--width)_var(--height)] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] mask-exclude bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]'
          : 'top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-(--width) bg-size-[var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] mask-exclude bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]',
        position === 'top' && 'top-0',
        position === 'bottom' && 'bottom-0 top-auto',
        position === 'left' && 'left-4',
        position === 'right' && 'left-auto right-4',
      )}
      style={
        {
          '--background': '#ffffff',
          '--color': 'rgba(0, 0, 0, 0.2)',
          '--color-dark': 'rgba(255, 255, 255, 0.2)',
          '--fade-stop': '90%',
          '--offset': isHorizontal ? '200px' : '80px',
          '--height': isHorizontal ? '1px' : '5px',
          '--width': isHorizontal ? '5px' : '1px',
        } as React.CSSProperties
      }
    />
  );
}
