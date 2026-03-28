'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchCellResult {
  path: string;
  title: string;
  highlight: string;
}

export interface SearchCellQuery {
  query: string;
  results: SearchCellResult[];
}

const DEFAULT_QUERIES: SearchCellQuery[] = [
  {
    query: 'Espresso machine',
    results: [
      {
        path: 'Manuals / Bar stand',
        title: 'Espresso machine manual',
        highlight: 'Espresso',
      },
      {
        path: 'Equipment / Inventory',
        title: 'Bar equipment checklist',
        highlight: 'machine',
      },
    ],
  },
  {
    query: 'How do I reset my password',
    results: [
      {
        path: 'Help / Account',
        title: 'How to reset your password',
        highlight: 'reset',
      },
      {
        path: 'Help / Security',
        title: 'Password and security settings',
        highlight: 'password',
      },
    ],
  },
  {
    query: 'Q3 sales report',
    results: [
      {
        path: 'Reports / Finance',
        title: 'Q3 2024 sales overview',
        highlight: 'Q3',
      },
      {
        path: 'Reports / Archive',
        title: 'Quarterly sales history',
        highlight: 'sales',
      },
    ],
  },
];

const SearchCellHighlight = ({
  title,
  highlight,
}: {
  title: string;
  highlight: string;
}) => {
  const idx = title.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx === -1) return <span>{title}</span>;
  return (
    <>
      {title.slice(0, idx)}
      <mark className='rounded bg-emerald-100 px-0.5 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400'>
        {title.slice(idx, idx + highlight.length)}
      </mark>
      {title.slice(idx + highlight.length)}
    </>
  );
};
SearchCellHighlight.displayName = 'SearchCellHighlight';

export interface SearchCellProps extends React.HTMLAttributes<HTMLDivElement> {
  queries?: SearchCellQuery[];
  typeSpeed?: number;
  eraseSpeed?: number;
  pauseDuration?: number;
  label?: string;
  showBadges?: boolean;
}

const SearchCell = React.forwardRef<HTMLDivElement, SearchCellProps>(
  (
    {
      className,
      queries = DEFAULT_QUERIES,
      typeSpeed = 75,
      eraseSpeed = 40,
      pauseDuration = 2400,
      label = 'Live search',
      showBadges = true,
      ...props
    },
    ref,
  ) => {
    const [queryIndex, setQueryIndex] = React.useState(0);
    const [text, setText] = React.useState('');
    const [showResults, setShowResults] = React.useState(false);
    const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);
    const queriesRef = React.useRef(queries);
    const typeSpeedRef = React.useRef(typeSpeed);
    const eraseSpeedRef = React.useRef(eraseSpeed);
    const pauseDurationRef = React.useRef(pauseDuration);
    React.useEffect(() => {
      queriesRef.current = queries;
    }, [queries]);
    React.useEffect(() => {
      typeSpeedRef.current = typeSpeed;
    }, [typeSpeed]);
    React.useEffect(() => {
      eraseSpeedRef.current = eraseSpeed;
    }, [eraseSpeed]);
    React.useEffect(() => {
      pauseDurationRef.current = pauseDuration;
    }, [pauseDuration]);

    const clear = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    const after = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timers.current.push(id);
    };

    React.useEffect(() => {
      clear();
      setShowResults(false);
      setText('');

      const full = queriesRef.current[queryIndex].query;
      let i = 0;
      let ticker: ReturnType<typeof setInterval>;

      const erase = () => {
        setShowResults(false);
        let j = full.length;
        ticker = setInterval(() => {
          j--;
          setText(full.slice(0, j));
          if (j === 0) {
            clearInterval(ticker);
            after(
              () => setQueryIndex((p) => (p + 1) % queriesRef.current.length),
              300,
            );
          }
        }, eraseSpeedRef.current);
      };

      ticker = setInterval(() => {
        i++;
        setText(full.slice(0, i));
        if (i === full.length) {
          clearInterval(ticker);
          after(() => setShowResults(true), 400);
          after(() => erase(), pauseDurationRef.current + 400);
        }
      }, typeSpeedRef.current);

      return () => {
        clear();
        clearInterval(ticker);
      };
    }, [queryIndex]);

    const currentResults = queries[queryIndex].results;

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-3 p-4', className)}
        {...props}
      >
        <div className='flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900'>
          <Search className='h-3.5 w-3.5 shrink-0 text-zinc-400' />
          <span className='min-w-0 flex-1 truncate text-sm text-zinc-800 dark:text-zinc-200'>
            {text}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className='ml-0.5 inline-block h-3.5 w-px bg-zinc-800 align-middle dark:bg-zinc-200'
            />
          </span>
        </div>

        <AnimatePresence mode='wait'>
          {showResults && (
            <motion.div
              key={queryIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25 }}
              className='rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900'
            >
              <p className='mb-2 text-[10px] uppercase tracking-widest text-zinc-400'>
                Found {currentResults.length}{' '}
                {currentResults.length === 1 ? 'result' : 'results'}
              </p>
              <div className='flex flex-col gap-2'>
                {currentResults.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.1,
                      ease: 'easeInOut',
                    }}
                    className={cn(
                      'flex flex-col gap-0.5',
                      i > 0 &&
                        'border-t border-zinc-100 pt-2 dark:border-zinc-800',
                    )}
                  >
                    <p className='text-[10px] text-zinc-400'>{r.path}</p>
                    <p className='text-sm text-zinc-800 dark:text-zinc-200'>
                      <SearchCellHighlight
                        title={r.title}
                        highlight={r.highlight}
                      />
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showBadges && (
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='flex gap-2'
              >
                <span className='rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] text-zinc-500 dark:border-zinc-700'>
                  {currentResults.length}{' '}
                  {currentResults.length === 1 ? 'result' : 'results'}
                </span>
                <span className='rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-600 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'>
                  {label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  },
);
SearchCell.displayName = 'SearchCell';

export { SearchCell, SearchCellHighlight, DEFAULT_QUERIES };
export default SearchCell;
