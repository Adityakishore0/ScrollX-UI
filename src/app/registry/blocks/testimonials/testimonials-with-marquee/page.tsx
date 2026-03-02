'use client';

import { motion } from 'motion/react';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    handle: 'Product Designer',
    description:
      'The attention to detail is incredible. Every interaction feels polished and intentional. My clients are always impressed with the final results.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format',
  },
  {
    name: 'David Chen',
    handle: 'Frontend Developer',
    description:
      "Best component library I've used. Clean code, great performance, and the documentation actually makes sense. Saved me weeks of development time.",
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format',
  },
  {
    name: 'Maria Santos',
    handle: 'Creative Director',
    description:
      'Finally found a tool that bridges the gap between design and development. The animations are smooth and the customization options are endless.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80&auto=format',
  },
  {
    name: 'James Anderson',
    handle: 'Full Stack Engineer',
    description:
      'Integration was seamless. No bloat, no unnecessary dependencies. Just clean, performant components that work exactly as expected.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format',
  },
  {
    name: 'Priya Sharma',
    handle: 'UI/UX Designer',
    description:
      'The design system is thoughtfully crafted. Every component feels cohesive and the accessibility features are built-in from the start.',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80&auto=format',
  },
  {
    name: 'Alex Turner',
    handle: 'Tech Lead',
    description:
      'Our team productivity doubled after switching. The components are reliable, well-tested, and the support has been exceptional.',
    image:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80&auto=format',
  },
  {
    name: 'Emma Williams',
    handle: 'Startup Founder',
    description:
      'Helped us launch our MVP in record time. The quality is top-notch and it scales beautifully as our product grows.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format',
  },
  {
    name: 'Ryan Martinez',
    handle: 'Software Architect',
    description:
      'Impressed by the architecture. The components are modular, maintainable, and integrate perfectly with our existing tech stack.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80&auto=format',
  },
];

export default function TestimonialsMarquee() {
  const titleWords = 'Trusted by developers worldwide'.split(' ');

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
            See what developers and designers are saying about their experience
            building with our components.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className='w-full'
        >
          <AnimatedTestimonials data={testimonials} />
        </motion.div>
      </div>
    </section>
  );
}
