'use client';

import { useEffect, useRef } from 'react';
import { toast } from '@/components/ui/toast';
import { CheckCheck } from 'lucide-react';

export function LoadedNotification({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shown = useRef(false);

  useEffect(() => {
    const target = ref.current?.parentElement;
    if (!target || shown.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        shown.current = true;

        toast({
          children: (
            <div className='flex items-center gap-2'>
              <CheckCheck />
              <span className='text-sm font-medium truncate max-w-[60vw]'>
                {name} loaded
              </span>
            </div>
          ),
          unstyled: true,
          closeButton: false,
          position: 'bottom-right',
          className:
            'fixed bottom-4 right-4 bg-background text-foreground border border-border rounded-lg shadow-lg px-4 py-2.5',
          duration: 1300,
        });

        observer.disconnect();
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [name]);

  return (
    <div
      ref={ref}
      aria-hidden
      className='absolute inset-0 pointer-events-none'
    />
  );
}
