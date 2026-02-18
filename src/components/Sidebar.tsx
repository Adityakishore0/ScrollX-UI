'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import navigation from '@/constants/navItems';
import { useState } from 'react';
import { Status } from '@/components/ui/status';

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        'h-full w-full p-6 transition-all duration-300 overflow-y-auto',
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        scrollbarWidth: isHovered ? 'thin' : 'none',
        overflowY: 'auto',
      }}
    >
      <nav className='space-y-3'>
        {navigation.map((item) => (
          <div key={item.title}>
            {item.href ? (
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  'flex items-center gap-1 font-semibold rounded-md transition-all relative',
                  pathname === item.href
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'text-gray-700 dark:text-gray-400',
                  'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black',
                )}
                style={{ fontSize: '0.95rem', padding: '0.5rem 0.75rem' }}
              >
                <span>{item.title}</span>
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
              </Link>
            ) : (
              <span
                className='flex items-center gap-1 font-semibold text-gray-900 dark:text-gray-100'
                style={{ fontSize: '0.95rem', padding: '0.5rem 0.75rem' }}
              >
                <span>{item.title}</span>
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
              </span>
            )}

            {item.children?.map((child) => {
              const typedChild = child as typeof child & {
                categoryClassName?: string;
              };

              return (
                <Link
                  key={typedChild.href}
                  href={typedChild.href}
                  onClick={onNavigate}
                  className={cn(
                    'flex w-fit rounded transition-all relative',
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
                    <span className='truncate'>{typedChild.title}</span>
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
        ))}
      </nav>

      <style jsx>{`
        div::-webkit-scrollbar {
          width: ${isHovered ? '0.4rem' : '0rem'};
        }
        div::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.3);
          border-radius: 0.25rem;
        }
        div:hover::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.5);
        }
      `}</style>
    </div>
  );
}
