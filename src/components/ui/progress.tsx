'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.ComponentProps<
  typeof ProgressPrimitive.Root
> {
  variant?: 'default' | 'slim' | 'outline-solid';
  indicatorClassName?: string;
  indicatorStyle?: React.CSSProperties;
}

function Progress({
  className,
  value,
  variant = 'default',
  indicatorClassName,
  indicatorStyle,
  ...props
}: ProgressProps) {
  const isSlim = variant === 'slim';
  const isOutline = variant === 'outline-solid';

  return (
    <ProgressPrimitive.Root
      data-slot='progress'
      className={cn(
        'bg-primary/20 relative w-full overflow-hidden rounded-full border h-3',
        isSlim && 'bg-background border-black dark:border-white',
        isOutline &&
          'bg-primary/20 relative w-full overflow-hidden rounded-full border h-3 border-black dark:border-white',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot='progress-indicator'
        className={cn(
          'bg-primary transition-all',
          isSlim
            ? 'absolute top-1/2 -translate-y-1/2 h-[60%] rounded-full'
            : 'h-full',
          indicatorClassName,
        )}
        style={
          isSlim
            ? {
                left: '4px',
                width: `calc(${value || 0}% - 8px)`,
                ...indicatorStyle,
              }
            : { width: `${value || 0}%`, ...indicatorStyle }
        }
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
