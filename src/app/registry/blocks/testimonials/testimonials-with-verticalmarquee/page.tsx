'use client';

import { motion } from 'motion/react';
import KineticTestimonial from '@/components/ui/kinetic-testimonials';

const testimonials = [
  {
    name: 'Maren Holst',
    handle: 'Design Lead · Cramer',
    review:
      'LayerStack transformed the way we present content. The depth and motion feel intentional, not like an afterthought bolted onto a flat layout.',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format',
  },
  {
    name: 'Jonas Albrecht',
    handle: 'Head of Product · Kinear',
    review:
      'We rebuilt our landing page in a weekend. Performance stayed sharp, the layouts snapped perfectly — and our conversion rate went up 34%.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format',
  },
  {
    name: 'Sade Okonkwo',
    handle: 'Creative Director · Xercel',
    review:
      'The stacking mechanic is genius. It mirrors how our users think about hierarchy — layer by layer, never overwhelming, always clear.',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80&auto=format',
  },
  {
    name: 'Erik Sundqvist',
    handle: 'Staff Engineer · Wotion',
    review:
      "I've tried every scroll-jacking library. This is the first one where my engineers didn't push back. Clean API, zero layout drama.",
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format',
  },
  {
    name: 'Aisha Patel',
    handle: 'Product Designer · Ripe',
    review:
      'The component library is exceptional. Every detail feels considered, and the developer experience is smooth from start to finish.',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80&auto=format',
  },
  {
    name: 'Liam Chen',
    handle: 'CTO · SitHub',
    review:
      'The performance optimizations are impressive. Even with complex layouts and animations, everything runs buttery smooth across devices.',
    avatar:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80&auto=format',
  },
];

export default function TestimonialsVerticalMarquee() {
  const titleWords = 'Loved by thousands of happy creators'.split(' ');

  return (
    <section className='relative w-full bg-background'>
      <div className='relative z-10 flex flex-col items-center w-full'>
        <div className='flex flex-col items-center gap-4 text-center py-12 md:py-16'>
          <h2 className='text-4xl md:text-6xl font-bold text-foreground tracking-tight'>
            {titleWords.map((word, index) => (
              <motion.span
                key={`title-${word}-${index}`}
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
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='text-base md:text-lg text-muted-foreground max-w-2xl px-4'
          >
            Hear from our community of builders, designers, and creators who
            trust us to power their vision
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className='w-full'
        >
          <KineticTestimonial
            testimonials={testimonials}
            title=''
            subtitle=''
            desktopColumns={5}
            tabletColumns={3}
            mobileColumns={2}
            speed={1}
          />
        </motion.div>
      </div>
    </section>
  );
}
