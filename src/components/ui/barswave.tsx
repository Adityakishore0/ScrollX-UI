'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface BarsWaveProps {
  barCount?: number;
  minHeight?: number;
  maxHeight?: number;
  fillColor?: string;
  borderColor?: string;
  barOpacity?: number;
  animationDuration?: number;
  variant?: 'filled' | 'outlined';
  className?: string;
  children?: React.ReactNode;
}

export function BarsWave({
  barCount = 15,
  minHeight = 15,
  maxHeight = 85,
  fillColor,
  borderColor,
  barOpacity = 1,
  animationDuration = 3,
  variant = 'outlined',
  className,
  children,
}: BarsWaveProps) {
  const halfCount = Math.ceil(barCount / 2);

  const [barAnimations] = useState(() => {
    return Array.from({ length: halfCount }, (_, i) => {
      const heights = [
        Math.random() * (maxHeight - minHeight) + minHeight,
        Math.random() * (maxHeight - minHeight) + minHeight,
        Math.random() * (maxHeight - minHeight) + minHeight,
      ];

      return {
        id: i,
        heights: [...heights, heights[0]],
        delay: Math.random() * 2,
        duration: animationDuration + Math.random() * 2,
      };
    });
  });

  const allBars = React.useMemo(() => {
    const leftBars = barAnimations.map((bar, i) => ({
      ...bar,
      id: `left-${i}`,
      position: i,
    }));

    const rightBars = [...barAnimations].reverse().map((bar, i) => ({
      ...bar,
      id: `right-${i}`,
      position: halfCount + i,
    }));

    return [...leftBars, ...rightBars].slice(0, barCount);
  }, [barAnimations, halfCount, barCount]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div className='absolute inset-0 flex items-end justify-around gap-1 px-4'>
        {allBars.map((bar) => (
          <motion.div
            key={bar.id}
            className={cn(
              'w-full max-w-20 rounded-t-md',
              variant === 'filled'
                ? 'bg-gray-900/10 dark:bg-white/10'
                : 'bg-transparent border-2 border-gray-900/20 dark:border-white/20',
            )}
            style={{
              ...(fillColor &&
                variant === 'filled' && { backgroundColor: fillColor }),
              ...(borderColor &&
                variant === 'outlined' && { borderColor: borderColor }),
              opacity: barOpacity,
            }}
            initial={{ height: `${bar.heights[0]}%` }}
            animate={{
              height: bar.heights.map((h) => `${h}%`),
            }}
            transition={{
              duration: bar.duration,
              delay: bar.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {children && <div className='relative z-10'>{children}</div>}
    </div>
  );
}
