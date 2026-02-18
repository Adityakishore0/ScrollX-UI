'use client';

import { motion } from 'motion/react';
import { FlipFlow } from '@/components/ui/flipflow';
import { cn } from '@/lib/utils';

interface CardData {
  name: string;
}

interface LogoCloudFlipFlowProps {
  title?: string;
  description?: string;
  data?: CardData[];
  className?: string;
}

const defaultData: CardData[] = [
  { name: 'Phoenix' },
  { name: 'Oslo' },
  { name: 'Theo' },
  { name: 'Kansas' },
  { name: 'Cairo' },
];

export default function LogoCloudFlipFlow({
  title = 'Built with technologies trusted by',
  description = "ScrollX UI aligns with the ecosystem powering the world's most ambitious products.",
  data = defaultData,
  className,
}: LogoCloudFlipFlowProps) {
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
          <FlipFlow data={data} />
        </motion.div>
      </div>
    </section>
  );
}
