'use client';

import { motion } from 'motion/react';
import { FlowingLogos } from '@/components/ui/flowing-logos';
import { cn } from '@/lib/utils';

interface Logo {
  name: string;
  image: string;
}

interface LogoCloudMarqueeProps {
  title?: string;
  description?: string;
  data?: Logo[];
  className?: string;
}

const defaultLogos: Logo[] = [
  { image: '/assets/logos/phoenix.svg', name: 'Phoenix' },
  { image: '/assets/logos/oslo.svg', name: 'Oslo' },
  { image: '/assets/logos/theo.svg', name: 'Theo' },
  { image: '/assets/logos/kansas.svg', name: 'Kansas' },
  { image: '/assets/logos/cairo.svg', name: 'Cairo' },
];

export default function LogoCloudMarquee({
  title = 'Built with technologies trusted by',
  description = 'ScrollX UI aligns with the ecosystem powering the world’s most ambitious products.',
  data = defaultLogos,
  className,
}: LogoCloudMarqueeProps) {
  const words = title.split(' ');

  return (
    <section className={cn('relative w-full overflow-hidden py-24', className)}>
      <div className='mx-auto max-w-6xl px-6'>
        <h1 className='relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold tracking-tight text-zinc-800 md:text-5xl lg:text-6xl dark:text-zinc-100'>
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: 'easeInOut',
              }}
              className='mr-2 inline-block'
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='relative z-10 mx-auto mt-6 max-w-2xl text-center text-base text-zinc-500 dark:text-zinc-400 md:text-lg'
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='relative mt-14'
        >
          <div className='pointer-events-none absolute inset-y-0 left-0 z-20 w-32 bg-linear-to-r from-white via-white/60 to-transparent dark:from-background dark:via-background/60 dark:to-transparent' />
          <div className='pointer-events-none absolute inset-y-0 right-0 z-20 w-32 bg-linear-to-l from-white via-white/60 to-transparent dark:from-background dark:via-background/60 dark:to-transparent' />
          <FlowingLogos
            data={data}
            variant='wide'
            className='[--duration:35s]'
          />
        </motion.div>
      </div>
    </section>
  );
}
