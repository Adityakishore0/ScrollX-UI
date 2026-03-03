'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function DragHandle({
  onMouseDown,
  left,
}: {
  onMouseDown: (e: React.MouseEvent) => void;
  left: string | number;
}) {
  return (
    <div
      onMouseDown={onMouseDown}
      style={{ left }}
      className={twMerge(
        'group absolute top-0 bottom-0 z-20 -translate-x-1/2',
        'flex w-3 cursor-col-resize items-center justify-center',
        'after:absolute after:inset-y-0 after:left-1/2 after:w-px after:-translate-x-1/2',
        'after:bg-neutral-300 dark:after:bg-neutral-700 after:transition-colors',
        'hover:after:bg-neutral-400 dark:hover:after:bg-neutral-500',
      )}
    >
      <div
        className={twMerge(
          'relative z-10 flex h-8 w-3 items-center justify-center rounded-full',
          'border border-neutral-300 dark:border-neutral-600',
          'bg-white dark:bg-neutral-800',
          'shadow-sm transition-colors duration-150',
          'group-hover:border-neutral-400 dark:group-hover:border-neutral-400',
        )}
      >
        <svg
          width='6'
          height='10'
          viewBox='0 0 6 10'
          fill='none'
          className='text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors'
        >
          {[0, 4].flatMap((x) =>
            [0, 3.5, 7].map((y) => (
              <circle
                key={`${x}-${y}`}
                cx={x + 1}
                cy={y + 1}
                r='1'
                fill='currentColor'
              />
            )),
          )}
        </svg>
      </div>
    </div>
  );
}

export function useResizablePreview(minWidth = 390) {
  const outerRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const [resizedWidth, setResizedWidth] = useState<number | null>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(0);

  const onDragHandleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartWidth.current =
      paneRef.current?.getBoundingClientRect().width ?? 0;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !outerRef.current) return;
      const outerWidth = outerRef.current.getBoundingClientRect().width;
      const delta = e.clientX - dragStartX.current;
      const next = Math.min(
        Math.max(dragStartWidth.current + delta, minWidth),
        outerWidth,
      );
      setResizedWidth(next);
    };
    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [minWidth]);

  const resetWidth = useCallback(() => setResizedWidth(null), []);

  return { outerRef, paneRef, resizedWidth, onDragHandleMouseDown, resetWidth };
}

export function HatchedZone() {
  return (
    <div className='flex-1 bg-[repeating-linear-gradient(135deg,transparent,transparent_6px,rgba(0,0,0,0.025)_6px,rgba(0,0,0,0.025)_7px)] dark:bg-[repeating-linear-gradient(135deg,transparent,transparent_6px,rgba(255,255,255,0.02)_6px,rgba(255,255,255,0.02)_7px)]' />
  );
}
