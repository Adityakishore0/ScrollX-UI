'use client';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useState } from 'react';

interface CardData {
  name: string;
}

interface FlowProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  repeat?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  applyMask?: boolean;
}

const Flow = ({
  children,
  vertical = false,
  repeat = 4,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = true,
  ...props
}: FlowProps) => (
  <div
    {...props}
    className={cn(
      'group relative flex h-full w-full overflow-hidden p-1 [--duration:10s] [--gap:12px] gap-(--gap)',
      vertical ? 'flex-col' : 'flex-row',
      className,
    )}
  >
    {Array.from({ length: repeat }).map((_, index) => (
      <div
        key={`item-${index}`}
        className={cn('flex shrink-0 gap-(--gap)', {
          'group-hover:paused': pauseOnHover,
          'direction-reverse': reverse,
          'animate-canopy-horizontal flex-row': !vertical,
          'animate-canopy-vertical flex-col': vertical,
        })}
      >
        {children}
      </div>
    ))}
    {applyMask && (
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-10 h-full w-full',
          vertical
            ? 'bg-linear-to-b from-background via-transparent to-background'
            : 'bg-linear-to-r from-background via-transparent to-background',
        )}
      />
    )}
  </div>
);

const Card = ({
  card,
  className,
  colorClass,
  backColorClass,
}: {
  card: CardData;
  className?: string;
  colorClass: string;
  backColorClass: string;
}) => {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className={cn('h-20 w-48 shrink-0 cursor-pointer', className)}
      onMouseEnter={() => setFlip(true)}
      onMouseLeave={() => setFlip(false)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className='relative h-full w-full'
        animate={{ rotateX: flip ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className='absolute inset-0 rounded-2xl overflow-hidden'
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div
            className={cn(
              'h-full w-full border-4 border-black dark:border-white rounded-2xl flex items-center justify-center px-4',
              colorClass,
            )}
          >
            <span
              className='text-black font-black text-3xl italic tracking-normal'
              style={{ fontFamily: 'Impact, sans-serif' }}
            >
              {card.name}
            </span>
          </div>
        </motion.div>

        <motion.div
          className='absolute inset-0 rounded-2xl overflow-hidden'
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)',
          }}
        >
          <div
            className={cn(
              'h-full w-full border-4 border-black dark:border-white rounded-2xl flex items-center justify-center px-4',
              backColorClass,
            )}
          >
            <span
              className='text-black font-black text-3xl not-italic tracking-normal'
              style={{ fontFamily: 'Impact, sans-serif' }}
            >
              {card.name}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const FlipFlow = ({
  data,
  className,
  cardClassName,
  colors = [
    'bg-linear-to-br from-orange-500 to-orange-600',
    'bg-linear-to-br from-blue-400 to-blue-500',
    'bg-linear-to-br from-green-400 to-green-500',
    'bg-linear-to-br from-pink-300 to-pink-400',
    'bg-linear-to-br from-yellow-300 to-yellow-400',
    'bg-linear-to-br from-purple-400 to-purple-500',
  ],
  backColors = [
    'bg-linear-to-br from-cyan-500 to-cyan-600',
    'bg-linear-to-br from-rose-400 to-rose-500',
    'bg-linear-to-br from-amber-400 to-amber-500',
    'bg-linear-to-br from-teal-300 to-teal-400',
    'bg-linear-to-br from-indigo-300 to-indigo-400',
    'bg-linear-to-br from-lime-400 to-lime-500',
  ],
}: {
  data: CardData[];
  className?: string;
  cardClassName?: string;
  colors?: string[];
  backColors?: string[];
}) => (
  <div className={cn('w-full overflow-hidden', className)}>
    {[false, true, false].map((reverse, index) => (
      <Flow
        key={`flow-${index}`}
        reverse={reverse}
        className='[--duration:30s]'
        pauseOnHover
        applyMask
        repeat={9}
      >
        {data.map((card, j) => (
          <Card
            key={`${card.name}-${j}`}
            card={card}
            className={cardClassName}
            colorClass={colors[j % colors.length]}
            backColorClass={backColors[j % backColors.length]}
          />
        ))}
      </Flow>
    ))}
  </div>
);

export { FlipFlow };
