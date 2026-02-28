'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Phone, Star } from 'lucide-react';
import { AvatarGroup } from '@/components/ui/avatar-group';
import { StripeButton } from '@/components/ui/stripe-button';

interface Avatar {
  imageUrl: string;
  name: string;
}

interface CTASectionwithAvatarsProps {
  title?: string;
  description?: string;
  avatars?: Avatar[];
  className?: string;
  buttonLabel?: string;
  trustLabel?: string;
}

const defaultAvatars: Avatar[] = [
  { imageUrl: 'https://i.pravatar.cc/80?img=11', name: 'Mia Chen' },
  { imageUrl: 'https://i.pravatar.cc/80?img=15', name: 'Jake Ellis' },
  { imageUrl: 'https://i.pravatar.cc/80?img=23', name: 'Sara Osei' },
  { imageUrl: 'https://i.pravatar.cc/80?img=32', name: 'Tom Wade' },
  { imageUrl: 'https://i.pravatar.cc/80?img=47', name: 'Priya Nair' },
  { imageUrl: 'https://i.pravatar.cc/80?img=54', name: 'Lena Brandt' },
];

const StarRating = ({ count = 5 }: { count?: number }) => (
  <div className='flex items-center justify-center gap-1'>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 + i * 0.08, duration: 0.3, type: 'spring' }}
      >
        <Star className='w-6 h-6 text-amber-400 fill-amber-400' />
      </motion.div>
    ))}
  </div>
);

export default function CTASectionwithAvatars({
  title = 'Hyper-Real AI. Crafted to Perfection.',
  description = 'Reserve your spot before the doors close. The first 100 members unlock 50% off — photorealism at scale, no waiting, no compromise.',
  avatars = defaultAvatars,
  className,
  buttonLabel = 'Book a call',
  trustLabel = 'Trusted by 27,000+ creators',
}: CTASectionwithAvatarsProps) {
  const words = title.split(' ');

  return (
    <section className={cn('relative w-full overflow-hidden py-24', className)}>
      <div className='mx-auto max-w-lg px-6 flex flex-col items-center text-center gap-8'>
        <h1 className='relative z-10 text-3xl font-bold tracking-tight text-zinc-800 md:text-4xl lg:text-5xl dark:text-zinc-100'>
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
          className='relative z-10 text-base text-zinc-500 dark:text-zinc-400'
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className='flex flex-col items-center gap-3'
        >
          <AvatarGroup avatarUrls={avatars} />
          <StarRating count={5} />
          <p className='text-sm text-zinc-400 dark:text-zinc-500'>
            {trustLabel}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <StripeButton size='lg'>
            <span className='flex items-center gap-2'>
              {buttonLabel}
              <Phone className='w-4 h-4' />
            </span>
          </StripeButton>
        </motion.div>
      </div>
    </section>
  );
}
