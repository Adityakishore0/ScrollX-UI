'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const DEFAULT_TASKS = [
  'How it all started',
  'Our values and approach',
  'Working together',
  'Union rules and integration',
  'Team structure',
  'Communication norms',
  'Feedback culture',
  'Onboarding wrap-up',
];

export interface ChecklistCellProps extends React.HTMLAttributes<HTMLDivElement> {
  tasks?: string[];
  initialCompleted?: number;
  finalCompleted?: number;
  stepInterval?: number;
  hoverToPlay?: boolean;
}

function FilledCheck() {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='shrink-0'
    >
      <circle cx='9' cy='9' r='9' fill='#22c55e' />
      <path
        d='M5.5 9.5l2.5 2.5 4.5-5'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function EmptyCircle({ muted }: { muted?: boolean }) {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='shrink-0'
    >
      <circle
        cx='9'
        cy='9'
        r='8'
        stroke={muted ? '#e4e4e7' : '#d4d4d8'}
        strokeWidth='1.5'
      />
    </svg>
  );
}

const FADE_DURATION = 350;

const ChecklistCell = React.forwardRef<HTMLDivElement, ChecklistCellProps>(
  (
    {
      className,
      tasks = DEFAULT_TASKS,
      initialCompleted = 3,
      finalCompleted,
      stepInterval = 1700,
      hoverToPlay = false,
      ...props
    },
    ref,
  ) => {
    const total = tasks.length;
    const maxDone =
      finalCompleted !== undefined
        ? Math.min(finalCompleted, total - 1)
        : total - 1;

    const [active, setActive] = React.useState(!hoverToPlay);
    const [phase, setPhase] = React.useState<'playing' | 'fading'>('playing');
    const [done, setDone] = React.useState(initialCompleted);
    const [winStart, setWinStart] = React.useState(1);
    const [sliding, setSliding] = React.useState(false);
    const [checkingSlot, setCheckingSlot] = React.useState(false);

    const pct = (done / total) * 100;
    const hasNext = winStart + 3 < total;

    const resetState = React.useCallback(() => {
      setDone(initialCompleted);
      setWinStart(1);
      setSliding(false);
      setCheckingSlot(false);
    }, [initialCompleted]);

    React.useEffect(() => {
      if (!active || phase !== 'playing') return;
      if (done >= maxDone || !hasNext) {
        const t = setTimeout(() => setPhase('fading'), 2000);
        return () => clearTimeout(t);
      }

      const t = setTimeout(() => {
        setSliding(true);

        const t2 = setTimeout(() => {
          setWinStart((w) => w + 1);
          setSliding(false);

          const t3 = setTimeout(() => {
            setCheckingSlot(true);
            setDone((d) => d + 1);
            const t4 = setTimeout(() => setCheckingSlot(false), 500);
            return () => clearTimeout(t4);
          }, 80);
          return () => clearTimeout(t3);
        }, 700);
        return () => clearTimeout(t2);
      }, stepInterval);

      return () => clearTimeout(t);
    }, [active, phase, done, maxDone, hasNext, stepInterval]);

    React.useEffect(() => {
      if (phase !== 'fading') return;

      const tReset = setTimeout(resetState, FADE_DURATION + 50);
      const tPlay = setTimeout(() => setPhase('playing'), FADE_DURATION + 150);

      return () => {
        clearTimeout(tReset);
        clearTimeout(tPlay);
      };
    }, [phase, resetState]);

    const handleMouseEnter = React.useCallback(() => {
      if (hoverToPlay) setActive(true);
    }, [hoverToPlay]);

    const handleMouseLeave = React.useCallback(() => {
      if (hoverToPlay) {
        setActive(false);
        setPhase('fading');
      }
    }, [hoverToPlay]);

    const slots = hasNext
      ? tasks.slice(winStart, winStart + 4)
      : tasks.slice(winStart, winStart + 3);

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-4 p-4', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className='flex items-center gap-3'>
          <div className='h-2 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800'>
            <motion.div
              className='h-full rounded-full bg-zinc-900 dark:bg-zinc-100'
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          <div className='flex items-center whitespace-nowrap text-[11px] text-zinc-400 overflow-hidden'>
            <div
              className='relative h-4 overflow-hidden'
              style={{ minWidth: '7px' }}
            >
              <AnimatePresence mode='popLayout' initial={false}>
                <motion.span
                  key={done}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className='absolute inset-0 flex items-center justify-end'
                >
                  {done}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className='mx-0.5'>/</span>
            <span>{total} Completed</span>
          </div>
        </div>

        <motion.div
          className='relative h-33 overflow-hidden'
          animate={{ opacity: phase === 'fading' ? 0 : 1 }}
          transition={{
            duration: FADE_DURATION / 1000,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <div className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-linear-to-t from-white to-transparent dark:from-zinc-950' />

          <AnimatePresence initial={false}>
            {slots.map((task, i) => {
              const globalIdx = winStart + i;
              const isDone = globalIdx < done;
              const isMidAndChecking = i === 1 && checkingSlot;
              const isChecked = isDone || isMidAndChecking;
              const isIncoming = i === 3;

              return (
                <motion.div
                  key={`${globalIdx}`}
                  initial={
                    isIncoming
                      ? { y: 132 + 20, opacity: 0 }
                      : { y: i * 44, opacity: 1 }
                  }
                  animate={{
                    y: sliding ? (i - 1) * 44 : i * 44,
                    opacity: sliding && i === 0 ? 0 : 1,
                  }}
                  exit={{ y: -44, opacity: 0 }}
                  transition={{ duration: 0.48, ease: [0.4, 0, 0.2, 1] }}
                  className='absolute left-0 right-0 flex items-center gap-2.5 px-0.5 py-2.5'
                >
                  <AnimatePresence mode='wait'>
                    {isChecked ? (
                      <motion.div
                        key='check'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 320,
                          damping: 18,
                          mass: 0.8,
                        }}
                      >
                        <FilledCheck />
                      </motion.div>
                    ) : (
                      <motion.div
                        key='circle'
                        initial={{ scale: 1 }}
                        animate={{ scale: 1 }}
                      >
                        <EmptyCircle muted={isIncoming} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <span
                    className={cn(
                      'text-sm transition-colors duration-300',
                      isIncoming
                        ? 'text-zinc-400 dark:text-zinc-600'
                        : 'text-zinc-800 dark:text-zinc-200',
                    )}
                  >
                    {task}
                  </span>

                  <ChevronRight className='ml-auto h-3.5 w-3.5 shrink-0 text-zinc-200 dark:text-zinc-700' />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  },
);

ChecklistCell.displayName = 'ChecklistCell';

export { ChecklistCell, DEFAULT_TASKS };
export default ChecklistCell;
