'use client';

import * as React from 'react';
import { motion, type Variants } from 'motion/react';
import { BarChart3, Bell, Brain, Layers, Users } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { cn } from '@/lib/utils';

interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  containerClassName?: string;
  image: string;
}

interface BentoGridBlockProps {
  heading?: string;
  subheading?: string;
  items?: BentoItem[];
  className?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
};

const defaultItems: BentoItem[] = [
  {
    title: 'Deep Analytics',
    description:
      'Visualize trends and track key metrics with powerful real-time data dashboards.',
    icon: <BarChart3 className='h-4 w-4' />,
    containerClassName: 'md:col-span-2',
    image:
      'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'Push Alerts',
    description:
      'A recognizable notification indicator, alerting users to new messages or updates in real time.',
    icon: <Bell className='h-4 w-4' />,
    containerClassName: 'md:col-span-2',
    image:
      'https://images.unsplash.com/photo-1636743094110-5e153f93ad7e?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'AI Suggestions',
    description:
      'Switch easily between intelligent modes and let AI surface the right data.',
    icon: <Brain className='h-4 w-4' />,
    containerClassName: 'md:col-span-2',
    image:
      'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'Preferences',
    description:
      'Allows users to customize how and when they receive notifications, ensuring a tailored experience.',
    icon: <Layers className='h-4 w-4' />,
    containerClassName: 'md:col-span-3',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'Collaboration',
    description:
      'Work together in real time. Invite your team, share context, and move faster as one unit.',
    icon: <Users className='h-4 w-4' />,
    containerClassName: 'md:col-span-3',
    image:
      'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&auto=format&fit=crop&q=60',
  },
];

export default function BentoWithFocus({
  heading = 'All the tools your team needs to launch',
  subheading = 'Build analytics pipelines, smart alerts, AI suggestions, user preferences, and real-time collaboration tools using clean and fully composable components.',
  items = defaultItems,
  className,
}: BentoGridBlockProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <section
      className={cn(
        'w-full bg-white dark:bg-zinc-950 px-4 py-20 md:px-8',
        className,
      )}
    >
      <div className='mx-auto max-w-5xl'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className='mb-12 text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl lg:text-5xl max-w-xl mx-auto'>
              {heading}
            </h2>
            <p className='mt-4 text-sm text-zinc-500 dark:text-zinc-400 md:text-base max-w-xl mx-auto'>
              {subheading}
            </p>
          </motion.div>

          <BentoGrid className='md:grid-cols-6'>
            {items.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={cn('w-full h-full', item.containerClassName)}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                animate={{
                  scale:
                    hoveredIndex === null ? 1 : hoveredIndex === i ? 1 : 0.97,
                  opacity:
                    hoveredIndex === null ? 1 : hoveredIndex === i ? 1 : 0.5,
                  filter:
                    hoveredIndex === null
                      ? 'blur(0px)'
                      : hoveredIndex === i
                        ? 'blur(0px)'
                        : 'blur(1.5px)',
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <BentoGridItem
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  disableTilt
                  className='bg-white border-zinc-200 text-zinc-900 dark:bg-zinc-900/80 dark:border-white/5 dark:text-white'
                  header={
                    <div className='relative flex h-full min-h-40 w-full overflow-hidden rounded-xl'>
                      <img
                        src={item.image}
                        alt={item.title}
                        className='h-full w-full object-cover'
                      />
                      <div className='absolute inset-0 bg-linear-to-b from-transparent via-white/40 to-white dark:via-zinc-900/60 dark:to-zinc-900' />
                    </div>
                  }
                />
              </motion.div>
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
}

export { BentoWithFocus };
