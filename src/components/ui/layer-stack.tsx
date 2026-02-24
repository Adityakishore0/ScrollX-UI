'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  useSpring,
  animate,
  type MotionValue,
} from 'motion/react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface LayerStackProps {
  children: React.ReactNode;
  className?: string;
  cardWidth?: number;
  cardGap?: number;
  stageHeight?: number;
  lastCardFullWidth?: boolean;
  mobileSensitivity?: number;
  ref?: React.Ref<HTMLDivElement>;
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

interface StackCardInternalProps {
  children: React.ReactElement<CardProps>;
  index: number;
  cardWidth: number;
  cardGap: number;
  scrollProgress: MotionValue<number>;
  maxScroll: number;
  renderedWidth: number;
  isMobile: boolean;
  cardRef?: (el: HTMLDivElement | null) => void;
}

function Card({ children, className, ref, ...props }: CardProps) {
  return (
    <div
      ref={ref}
      className={cn('size-full overflow-hidden rounded-[inherit]', className)}
      {...props}
    >
      {children}
    </div>
  );
}

const StackCardInternal = React.memo(function StackCardInternal({
  children,
  index,
  cardWidth,
  cardGap,
  scrollProgress,
  maxScroll,
  renderedWidth,
  isMobile,
  cardRef,
}: StackCardInternalProps) {
  const naturalX = index * (cardWidth + cardGap);
  const x = useTransform(
    scrollProgress,
    [0, 1],
    [naturalX, naturalX - maxScroll],
  );
  const stackDepth = useTransform(x, (v) => Math.max(0, -v));
  const clampedX = useTransform(x, (v) => Math.max(0, v));
  const scale = useTransform(stackDepth, [0, cardWidth * 3], [1, 0.95]);
  const yDrop = useTransform(
    stackDepth,
    [0, cardWidth],
    [0, isMobile ? 6 : 12],
  );
  const rotateYMobile = useMotionValue(0);
  const rotateYDesktop = useTransform(stackDepth, [0, cardWidth * 2], [0, -4]);
  const rotateY = isMobile ? rotateYMobile : rotateYDesktop;

  return (
    <motion.div
      ref={cardRef}
      style={{
        x: clampedX,
        y: yDrop,
        scale,
        rotateY,
        zIndex: index + 1,
        width: renderedWidth,
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        transformOrigin: 'bottom center',
        willChange: 'transform',
      }}
    >
      {React.cloneElement(children, {
        style: {
          ...children.props.style,
          width: '100%',
          height: '100%',
          margin: 0,
          boxSizing: 'border-box' as const,
        },
      })}
    </motion.div>
  );
});

function LayerStack({
  children,
  className,
  cardWidth = 320,
  cardGap = 16,
  stageHeight = 400,
  lastCardFullWidth = false,
  mobileSensitivity = 2,
  ref,
}: LayerStackProps) {
  const cards = React.Children.toArray(
    children,
  ) as React.ReactElement<CardProps>[];

  const stageRef = React.useRef<HTMLDivElement>(null);
  const rawScroll = React.useRef(0);
  const velocityRef = React.useRef(0);
  const lastTouchTime = React.useRef(0);
  const lastTouchX = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const [progressValue, setProgressValue] = React.useState(0);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const [autoHeight, setAutoHeight] = React.useState(stageHeight);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const effectiveCardWidth = React.useMemo(() => {
    if (isMobile && containerWidth > 0) return containerWidth - 32;
    return cardWidth;
  }, [isMobile, containerWidth, cardWidth]);

  React.useEffect(() => {
    if (!isMobile || containerWidth === 0) {
      setAutoHeight(stageHeight);
      return;
    }
    const frame = requestAnimationFrame(() => {
      const heights = cardRefs.current.map((el) => el?.scrollHeight ?? 0);
      const max = Math.max(...heights);
      if (max > 0) setAutoHeight(max + 32);
    });
    return () => cancelAnimationFrame(frame);
  }, [isMobile, containerWidth, effectiveCardWidth, stageHeight]);

  const scrollX = useMotionValue(0);
  const smoothScrollX = useSpring(scrollX, {
    stiffness: isMobile ? 250 : 400,
    damping: isMobile ? 30 : 40,
    mass: isMobile ? 0.4 : 0.5,
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  useMotionValueEvent(scrollX, 'change', (v) => {
    setProgressValue(v * 100);
  });

  const maxScroll = React.useMemo(
    () =>
      Math.max(
        0,
        cards.length * (effectiveCardWidth + cardGap) -
          cardGap -
          effectiveCardWidth,
      ),
    [cards.length, effectiveCardWidth, cardGap],
  );

  const updateScrollX = React.useCallback(
    (px: number) => {
      const clamped = Math.max(0, Math.min(maxScroll, px));
      rawScroll.current = clamped;
      scrollX.set(maxScroll > 0 ? clamped / maxScroll : 0);
    },
    [maxScroll, scrollX],
  );

  React.useEffect(() => {
    if (isMobile) return;
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      updateScrollX(rawScroll.current + e.deltaY * 0.5);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [updateScrollX, isMobile]);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let startScroll = 0;
    let isTouching = false;
    let isHorizontalScroll = false;

    const onTouchStart = (e: TouchEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      isTouching = true;
      isHorizontalScroll = false;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startScroll = rawScroll.current;
      lastTouchX.current = startX;
      lastTouchTime.current = Date.now();
      velocityRef.current = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isTouching) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = Math.abs(currentX - startX);
      const deltaY = Math.abs(currentY - startY);

      if (!isHorizontalScroll && deltaX < 10 && deltaY < 10) return;
      if (!isHorizontalScroll) isHorizontalScroll = deltaX > deltaY;

      if (isHorizontalScroll) {
        e.preventDefault();
        const currentTime = Date.now();
        const scrollDeltaX = (startX - currentX) * mobileSensitivity;
        const deltaTime = currentTime - lastTouchTime.current;

        if (deltaTime > 0) {
          velocityRef.current = (lastTouchX.current - currentX) / deltaTime;
        }

        lastTouchX.current = currentX;
        lastTouchTime.current = currentTime;

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          updateScrollX(startScroll + scrollDeltaX);
          rafRef.current = null;
        });
      }
    };

    const onTouchEnd = () => {
      if (!isHorizontalScroll) {
        isTouching = false;
        return;
      }
      isTouching = false;
      const velocity = velocityRef.current * 250 * mobileSensitivity;
      if (Math.abs(velocity) > 15) {
        const momentum = velocity * 0.4;
        const targetScroll = rawScroll.current + momentum;
        const clampedTarget = Math.max(0, Math.min(maxScroll, targetScroll));
        animate(rawScroll.current, clampedTarget, {
          type: 'spring',
          stiffness: 100,
          damping: 18,
          mass: 0.3,
          onUpdate: (v) => updateScrollX(v),
        });
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateScrollX, maxScroll, mobileSensitivity]);

  React.useEffect(() => {
    if (isMobile) return;

    let isDragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isDragging = true;
      dragStartX = e.clientX;
      dragStartScroll = rawScroll.current;
      e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateScrollX(dragStartScroll + (dragStartX - e.clientX));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const el = stageRef.current;
    if (!el) return;

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [updateScrollX, isMobile]);

  const onProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const target = ratio * maxScroll;
    const start = rawScroll.current;
    animate(0, 1, {
      duration: 0.5,
      ease: [0.32, 0, 0.67, 0],
      onUpdate: (v) => updateScrollX(start + (target - start) * v),
    });
  };

  return (
    <div ref={ref} className={cn('w-full select-none', className)}>
      <div
        ref={stageRef}
        className={cn(
          'relative w-full overflow-hidden rounded-xl',
          !isMobile && 'cursor-grab active:cursor-grabbing',
        )}
        style={{
          height: autoHeight,
          perspective: isMobile ? 1000 : 1400,
          transition: 'height 0.2s ease',
        }}
      >
        {cards.map((card, i) => {
          const isLastCard = i === cards.length - 1;
          const renderedWidth =
            lastCardFullWidth && isLastCard && containerWidth > 0
              ? containerWidth
              : effectiveCardWidth;

          return (
            <StackCardInternal
              key={i}
              index={i}
              cardWidth={effectiveCardWidth}
              cardGap={cardGap}
              scrollProgress={smoothScrollX}
              maxScroll={maxScroll}
              renderedWidth={renderedWidth}
              isMobile={isMobile}
              cardRef={(el: HTMLDivElement | null) => {
                cardRefs.current[i] = el;
              }}
            >
              {card}
            </StackCardInternal>
          );
        })}
      </div>

      <div className='mt-4 flex flex-col items-center gap-2'>
        <Progress
          variant='slim'
          value={progressValue}
          onClick={onProgressClick}
          className='w-60 cursor-pointer'
        />
        <p className='text-[10px] font-medium tracking-[0.14em] uppercase text-muted-foreground'>
          {isMobile ? 'drag' : 'drag or scroll'}
        </p>
      </div>
    </div>
  );
}

export { LayerStack, Card };
export type { LayerStackProps, CardProps };
