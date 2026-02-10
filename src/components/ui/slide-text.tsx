'use client';
import * as React from 'react';
import { motion, type Variants, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SlideTextProps {
  text: string;
  staggerDelay?: number;
  staggerDuration?: number;
  pauseDuration?: number;
  className?: string;
}

const SlideText = React.forwardRef<HTMLSpanElement, SlideTextProps>(
  (
    {
      text,
      staggerDelay = 0.025,
      staggerDuration = 0.4,
      pauseDuration = 1.5,
      className,
    },
    ref,
  ) => {
    const [phase, setPhase] = React.useState<'initial' | 'down' | 'up'>(
      'initial',
    );
    const chars = React.useMemo(() => Array.from(text), [text]);
    const prefersReducedMotion = useReducedMotion();

    const totalAnimationTime = React.useMemo(
      () => (chars.length * staggerDelay + staggerDuration) * 1000,
      [chars.length, staggerDelay, staggerDuration],
    );

    React.useEffect(() => {
      if (prefersReducedMotion) return;

      const down = setTimeout(() => {
        setPhase('down');
      }, pauseDuration * 1000);

      return () => clearTimeout(down);
    }, [pauseDuration, prefersReducedMotion]);

    React.useEffect(() => {
      if (prefersReducedMotion || phase !== 'down') return;

      const up = setTimeout(
        () => {
          setPhase('up');
        },
        totalAnimationTime + pauseDuration * 1000,
      );

      return () => clearTimeout(up);
    }, [phase, totalAnimationTime, pauseDuration, prefersReducedMotion]);

    React.useEffect(() => {
      if (prefersReducedMotion || phase !== 'up') return;

      const reset = setTimeout(() => {
        setPhase('initial');
      }, totalAnimationTime);

      return () => clearTimeout(reset);
    }, [phase, totalAnimationTime, prefersReducedMotion]);

    React.useEffect(() => {
      if (prefersReducedMotion || phase !== 'initial') return;

      const restart = setTimeout(() => {
        setPhase('down');
      }, pauseDuration * 1000);

      return () => clearTimeout(restart);
    }, [phase, pauseDuration, prefersReducedMotion]);

    const containerVariants: Variants = {
      initial: {},
      down: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        },
      },
      up: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        },
      },
    };

    const stackVariants: Variants = {
      initial: { y: '0%' },
      down: ({ index }: { index: number }) =>
        prefersReducedMotion
          ? { y: '0%' }
          : {
              y: '-100%',
              transition: {
                duration: staggerDuration,
                delay: index * staggerDelay,
                ease: 'easeOut',
              },
            },
      up: ({ index, total }: { index: number; total: number }) =>
        prefersReducedMotion
          ? { y: '0%' }
          : {
              y: '0%',
              transition: {
                duration: staggerDuration,
                delay: (total - 1 - index) * staggerDelay,
                ease: 'easeOut',
              },
            },
    };

    return (
      <span
        ref={ref}
        className={cn(
          'relative inline-block leading-none select-none overflow-hidden',
          className,
        )}
      >
        <motion.span
          className='relative h-fit leading-none inline-flex transform-gpu will-change-transform'
          variants={containerVariants}
          initial='initial'
          animate={phase}
          style={{ perspective: 1000 }}
        >
          {chars.map((char, index) => {
            const isSpace = char === ' ';

            return (
              <span
                key={index}
                className='inline-block h-[1.2em] align-baseline overflow-hidden relative'
                style={{ lineHeight: 1.2 }}
              >
                <motion.span
                  className='block relative'
                  variants={stackVariants}
                  custom={{ index, total: chars.length }}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                    lineHeight: 1.2,
                  }}
                >
                  <span className='flex h-[1.2em] leading-none relative items-center'>
                    {isSpace ? '\u00A0' : char}
                  </span>
                  <span className='flex h-[1.2em] leading-none absolute top-full left-0 items-center'>
                    {isSpace ? '\u00A0' : char}
                  </span>
                </motion.span>
              </span>
            );
          })}
        </motion.span>
      </span>
    );
  },
);

SlideText.displayName = 'SlideText';

export { SlideText };
export type { SlideTextProps };
