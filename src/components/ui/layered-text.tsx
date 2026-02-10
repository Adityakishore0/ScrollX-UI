'use client';

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface LayeredTextProps {
  text: string;
  layers?: string[];
  offsetX?: number;
  offsetY?: number;
  strokeWidth?: number;
  animate?: boolean;
  animationDuration?: number;
  className?: string;
}

const LayeredText: React.FC<LayeredTextProps> = ({
  text,
  layers = ['#10B981', '#3B82F6', '#EF4444'],
  offsetX = 6,
  offsetY = 6,
  strokeWidth = 4,
  animate = true,
  animationDuration = 0.6,
  className,
}) => {
  return (
    <div className={cn('relative inline-block', className)}>
      <div className='relative select-none tracking-[-0.02em]'>
        {layers.map((color, index) => (
          <motion.div
            key={`layer-${index}`}
            className='absolute top-0 left-0'
            style={{
              color,
              transform: `translate(${offsetX * (layers.length - index)}px, ${
                offsetY * (layers.length - index)
              }px)`,
              zIndex: index,
            }}
            initial={animate ? { opacity: 0 } : undefined}
            animate={animate ? { opacity: 1 } : undefined}
            transition={
              animate
                ? {
                    duration: animationDuration,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }
                : undefined
            }
          >
            {text}
          </motion.div>
        ))}

        <motion.div
          className={cn('relative', className)}
          style={
            {
              WebkitTextStroke: `${strokeWidth}px var(--stroke-color)`,
              paintOrder: 'stroke fill',
              zIndex: layers.length,
            } as React.CSSProperties
          }
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 1 } : undefined}
          transition={
            animate
              ? {
                  duration: animationDuration,
                  delay: layers.length * 0.1,
                  ease: 'easeOut',
                }
              : undefined
          }
        >
          {text}
        </motion.div>
      </div>
    </div>
  );
};

export { LayeredText };
