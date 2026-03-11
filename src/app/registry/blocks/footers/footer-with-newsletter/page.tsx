'use client';

import { motion, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import { Instagram, Linkedin, ArrowRight } from 'lucide-react';

interface NavColumn {
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterWithNewsletterProps {
  logo?: {
    text: string;
    badge?: string;
  };
  tagline?: string;
  newsletterLabel?: string;
  newsletterPlaceholder?: string;
  newsletterConsent?: string;
  privacyPolicyUrl?: string;
  navColumns?: NavColumn[];
  socials?: {
    instagram?: string;
    linkedin?: string;
  };
  copyright?: string;
  credits?: string;
  className?: string;
}

const defaultNavColumns: NavColumn[] = [
  {
    links: [
      { text: 'Components', url: '#' },
      { text: 'Blocks', url: '#' },
      { text: 'Installation', url: '#' },
      { text: 'Changelog', url: '#' },
      { text: 'Roadmap', url: '#' },
      { text: 'Contributing', url: '#' },
    ],
  },
  {
    links: [
      { text: 'Blog', url: '#' },
      { text: 'Showcase', url: '#' },
      { text: 'License', url: '#' },
      { text: 'Privacy Policy', url: '#' },
      { text: 'Cookie Policy', url: '#' },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
};

export default function FooterWithNewsletter({
  logo = { text: 'ScrollX UI', badge: 'S' },
  tagline = 'We build components that scale.',
  newsletterLabel = 'Subscribe to our newsletter',
  newsletterPlaceholder = 'Email*',
  newsletterConsent = 'By subscribing you agree to our',
  privacyPolicyUrl = '#',
  navColumns = defaultNavColumns,
  socials = { instagram: '#', linkedin: '#' },
  copyright = '© ScrollX UI 2026',
  credits = 'scrollxui.dev',
  className,
}: FooterWithNewsletterProps) {
  return (
    <footer className={cn('w-full', className)}>
      <div className='bg-zinc-100 dark:bg-zinc-950 rounded-2xl overflow-hidden'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='px-8 pt-10 pb-0 md:px-12 md:pt-14'
        >
          <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
            <motion.div variants={itemVariants}>
              <span className='text-[clamp(2.8rem,9vw,5rem)] font-black leading-none tracking-tighter text-zinc-900 dark:text-white uppercase select-none'>
                {logo.text}
                {logo.badge && (
                  <span className='inline-flex items-center justify-center ml-1 w-[0.72em] h-[0.72em] rounded-full border-[0.07em] border-zinc-900 dark:border-white text-[0.45em] font-black align-middle relative -top-[0.08em]'>
                    {logo.badge}
                  </span>
                )}
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className='text-[clamp(1.1rem,3.5vw,2rem)] font-black uppercase leading-tight tracking-tight text-zinc-900 dark:text-white md:text-right md:max-w-sm'
            >
              {tagline}
            </motion.p>
          </div>

          <motion.div
            variants={itemVariants}
            className='mt-8 border-t border-zinc-300 dark:border-zinc-800'
          />

          <div className='mt-8 flex flex-col gap-10 md:flex-row md:gap-16 md:justify-between pb-8'>
            <motion.div
              variants={itemVariants}
              className='flex flex-col gap-3 md:max-w-xs w-full'
            >
              <p className='text-sm font-semibold text-zinc-800 dark:text-white'>
                {newsletterLabel}
              </p>
              <div className='flex items-center bg-white dark:bg-zinc-800 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700'>
                <input
                  type='email'
                  placeholder={newsletterPlaceholder}
                  className='flex-1 px-4 py-3 text-sm text-zinc-800 dark:text-white bg-transparent outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500'
                />
                <button
                  type='submit'
                  className='m-1.5 flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors'
                >
                  <ArrowRight className='w-4 h-4' />
                </button>
              </div>
              <p className='text-xs text-zinc-400 dark:text-zinc-500'>
                {newsletterConsent}{' '}
                <a
                  href={privacyPolicyUrl}
                  className='underline underline-offset-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors'
                >
                  our privacy policy
                </a>{' '}
                and it&apos;s terms.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className='grid grid-cols-2 gap-x-12 gap-y-2 md:gap-x-20 self-start'
            >
              {navColumns.map((col, colIdx) => (
                <ul key={colIdx} className='flex flex-col gap-2.5'>
                  {col.links.map((link, linkIdx) => (
                    <motion.li key={linkIdx} variants={itemVariants}>
                      <a
                        href={link.url}
                        className='text-sm font-bold uppercase tracking-wide text-zinc-600 dark:text-white hover:text-zinc-950 dark:hover:text-zinc-300 transition-colors'
                      >
                        {link.text}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className='border-t border-zinc-300 dark:border-zinc-800'
          />

          <motion.div
            variants={itemVariants}
            className='flex items-center justify-between py-5'
          >
            <p className='text-xs text-zinc-400 dark:text-zinc-500 w-1/3'>
              {copyright}
            </p>
            <div className='flex items-center justify-center gap-4 w-1/3'>
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  aria-label='Instagram'
                  className='flex items-center justify-center w-9 h-9 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-white hover:border-zinc-900 hover:text-zinc-900 dark:hover:border-white dark:hover:text-white transition-colors'
                >
                  <Instagram className='w-4 h-4' />
                </a>
              )}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  aria-label='LinkedIn'
                  className='flex items-center justify-center w-9 h-9 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-white hover:border-zinc-900 hover:text-zinc-900 dark:hover:border-white dark:hover:text-white transition-colors'
                >
                  <Linkedin className='w-4 h-4' />
                </a>
              )}
            </div>
            <p className='text-xs text-zinc-400 dark:text-zinc-500 w-1/3 text-right'>
              {credits}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}

export { FooterWithNewsletter };
