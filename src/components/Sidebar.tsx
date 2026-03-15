'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import navigation from '@/constants/navItems';
import { useState, useRef, useEffect } from 'react';
import { Status } from '@/components/ui/status';
import { ChevronRight } from 'lucide-react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

interface SidebarProps {
  onNavigate?: () => void;
}

function AnimatedChildren({
  isExpanded,
  children,
}: {
  isExpanded: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(
    isExpanded ? undefined : 0,
  );

  useEffect(() => {
    if (!ref.current) return;
    if (isExpanded) {
      setHeight(ref.current.scrollHeight);
      const timer = setTimeout(() => setHeight(undefined), 250);
      return () => clearTimeout(timer);
    } else {
      setHeight(ref.current.scrollHeight);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight(0));
      });
    }
  }, [isExpanded]);

  return (
    <div
      style={{
        height: height === undefined ? 'auto' : height,
        overflow: 'hidden',
        transition: 'height 250ms ease',
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      navigation.map((item) => [item.title, item.defaultOpen ?? true]),
    ),
  );

  const toggle = (title: string) =>
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <ScrollArea.Root className='h-full w-full overflow-hidden group'>
      <ScrollArea.Viewport className='h-full w-full p-6'>
        <nav className='space-y-3'>
          {navigation.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expanded[item.title];
            const Icon = item.icon;

            return (
              <div key={item.title}>
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      'flex w-full items-center gap-2 font-semibold rounded-md transition-all select-none',
                      pathname === item.href
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : 'text-gray-700 dark:text-gray-400',
                      'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black',
                    )}
                    style={{ fontSize: '0.95rem', padding: '0.5rem 0.75rem' }}
                  >
                    {Icon && <Icon className='h-4 w-4 shrink-0 opacity-60' />}
                    <span className='flex-1'>{item.title}</span>
                    {item.category && (
                      <Status
                        className={cn(
                          'shrink-0',
                          item.categoryClassName ||
                            'bg-green-900 text-green-400 font-medium rounded-full border border-green-500',
                        )}
                        shiny={true}
                        shinySpeed={2}
                      >
                        {item.category}
                      </Status>
                    )}
                    {hasChildren && (
                      <ChevronRight
                        className={cn(
                          'h-3.5 w-3.5 shrink-0 transition-transform duration-200 opacity-50',
                          isExpanded && 'rotate-90',
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggle(item.title);
                        }}
                      />
                    )}
                  </Link>
                ) : (
                  <div
                    onClick={() => hasChildren && toggle(item.title)}
                    className={cn(
                      'flex w-full items-center gap-2 font-semibold text-gray-900 dark:text-gray-100 select-none rounded-md',
                      hasChildren && 'cursor-pointer',
                    )}
                    style={{ fontSize: '0.95rem', padding: '0.5rem 0.75rem' }}
                  >
                    {Icon && <Icon className='h-4 w-4 shrink-0 opacity-60' />}
                    <span className='flex-1'>{item.title}</span>
                    {item.category && (
                      <Status
                        className={cn(
                          'shrink-0',
                          item.categoryClassName ||
                            'bg-green-900 text-green-400 font-medium rounded-full border border-green-500',
                        )}
                        shiny={true}
                        shinySpeed={2}
                      >
                        {item.category}
                      </Status>
                    )}
                    {hasChildren && (
                      <ChevronRight
                        className={cn(
                          'h-3.5 w-3.5 shrink-0 transition-transform duration-200 opacity-50',
                          isExpanded && 'rotate-90',
                        )}
                      />
                    )}
                  </div>
                )}

                {hasChildren && (
                  <AnimatedChildren isExpanded={!!isExpanded}>
                    <div
                      className='mt-1 border-l border-neutral-200 dark:border-neutral-700'
                      style={{ marginLeft: '1.25rem', paddingLeft: '0.75rem' }}
                    >
                      {item.children!.map((child) => {
                        const typedChild = child as typeof child & {
                          categoryClassName?: string;
                        };
                        return (
                          <Link
                            key={typedChild.href}
                            href={typedChild.href}
                            onClick={onNavigate}
                            className={cn(
                              'flex w-fit select-none rounded transition-all',
                              pathname === typedChild.href
                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                : 'text-gray-700 dark:text-gray-400',
                              'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black',
                            )}
                            style={{
                              fontSize: '0.85rem',
                              padding: '0.4rem 0.75rem',
                              margin: '0.15rem 0',
                            }}
                          >
                            <div className='flex items-center gap-1 whitespace-nowrap overflow-hidden'>
                              <span className='truncate'>
                                {typedChild.title}
                              </span>
                              {typedChild.category && (
                                <Status
                                  className={cn(
                                    'shrink-0',
                                    typedChild.categoryClassName ||
                                      'bg-green-900 text-green-400 font-medium rounded-full border border-green-500',
                                  )}
                                  shiny={true}
                                  shinySpeed={2}
                                >
                                  {typedChild.category}
                                </Status>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </AnimatedChildren>
                )}
              </div>
            );
          })}
        </nav>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation='vertical'
        className='flex touch-none select-none w-1.5 p-px transition-opacity duration-300 opacity-0 group-hover:opacity-100'
      >
        <ScrollArea.Thumb className='relative flex-1 rounded-full bg-neutral-400 dark:bg-neutral-600' />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
