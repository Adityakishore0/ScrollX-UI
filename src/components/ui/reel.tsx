'use client';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export interface ReelItem {
  id: string;
  type: 'image' | 'video';
  src: string;
}

interface FlowProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  repeat?: number;
  pauseOnHover?: boolean;
  applyMask?: boolean;
  duration?: number;
}

const Flow = ({
  children,
  repeat = 9,
  pauseOnHover = false,
  reverse = false,
  applyMask = true,
  duration = 30,
  className,
  ...props
}: FlowProps) => (
  <div
    {...props}
    className={cn(
      'group relative flex h-full w-full overflow-hidden p-1 [--gap:16px] gap-(--gap) flex-row',
      className,
    )}
    style={{ '--duration': `${duration}s` } as React.CSSProperties}
  >
    {Array.from({ length: repeat }).map((_, index) => (
      <div
        key={`item-${index}`}
        className={cn(
          'flex shrink-0 gap-(--gap) animate-canopy-horizontal flex-row',
          {
            'group-hover:paused': pauseOnHover,
            'direction-reverse': reverse,
          },
        )}
      >
        {children}
      </div>
    ))}
    {applyMask && (
      <div className='pointer-events-none absolute inset-0 z-10 h-full w-full bg-linear-to-r from-background via-transparent to-background' />
    )}
  </div>
);

const ReelCard = ({ src, type }: { src: string; type: 'image' | 'video' }) => (
  <Card className='h-40 w-64 shrink-0 overflow-hidden p-0'>
    <CardContent className='h-full w-full p-0'>
      {type === 'image' ? (
        <img src={src} alt='' className='h-full w-full object-cover' />
      ) : (
        <video
          src={src}
          muted
          loop
          playsInline
          autoPlay
          className='h-full w-full object-cover'
        />
      )}
    </CardContent>
  </Card>
);

const Reel = ({
  items,
  rows = 3,
  repeat = 9,
  pauseOnHover = true,
  applyMask = true,
  duration = 30,
  direction = 'alternate',
  className,
}: {
  items: ReelItem[];
  rows?: number;
  repeat?: number;
  pauseOnHover?: boolean;
  applyMask?: boolean;
  duration?: number;
  direction?: 'alternate' | 'forward' | 'reverse';
  className?: string;
}) => (
  <div className={cn('w-full overflow-hidden', className)}>
    {Array.from({ length: rows }).map((_, index) => {
      const reverse =
        direction === 'forward'
          ? false
          : direction === 'reverse'
            ? true
            : index % 2 !== 0;

      return (
        <Flow
          key={`flow-${index}`}
          reverse={reverse}
          repeat={repeat}
          pauseOnHover={pauseOnHover}
          applyMask={applyMask}
          duration={duration}
        >
          {items.map((item) => (
            <ReelCard key={item.id} src={item.src} type={item.type} />
          ))}
        </Flow>
      );
    })}
  </div>
);

export { Reel };
