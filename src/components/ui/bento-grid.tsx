'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { CardTilt, CardTiltContent } from '@/components/ui/card-tilt';

const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <div
    className={cn(
      'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3',
      className,
    )}
  >
    {children}
  </div>
);

const BentoGridItem = ({
  className,
  containerClassName,
  title,
  description,
  header,
  icon,
  disableTilt = false,
}: {
  className?: string;
  containerClassName?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  disableTilt?: boolean;
}) => {
  const inner = (
    <div
      className={cn(
        'group/bento shadow-input flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/20 dark:bg-black dark:shadow-none w-full h-full',
        className,
      )}
    >
      {header}
      <div className='transition duration-300 group-hover/bento:-translate-y-1'>
        {icon}
        <div className='mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200'>
          {title}
        </div>
        <div className='font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300'>
          {description}
        </div>
      </div>
    </div>
  );

  if (disableTilt) {
    return (
      <div className={cn('w-full h-full', containerClassName)}>{inner}</div>
    );
  }

  return (
    <CardTilt
      className={cn('w-full h-full', containerClassName)}
      tiltMaxAngle={12}
      scale={1.03}
    >
      <CardTiltContent className='w-full h-full'>{inner}</CardTiltContent>
    </CardTilt>
  );
};

export { BentoGrid, BentoGridItem };
