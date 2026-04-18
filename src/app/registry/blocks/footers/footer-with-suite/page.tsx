'use client';

import { cn } from '@/lib/utils';

interface NavLink {
  text: string;
  url: string;
}

interface FooterWithSuiteProps {
  brandName?: string;
  tagline?: string;
  navLinks?: NavLink[];
  socialLinks?: NavLink[];
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  email?: string;
  copyright?: string;
  className?: string;
}

const defaultNavLinks: NavLink[] = [
  { text: 'Home', url: '#' },
  { text: 'Work', url: '#' },
  { text: 'Services', url: '#' },
  { text: 'About', url: '#' },
  { text: 'Pricing', url: '#' },
  { text: 'Process', url: '#' },
  { text: 'Blog', url: '#' },
];

const defaultSocialLinks: NavLink[] = [
  { text: 'Twitter', url: '#' },
  { text: 'GitHub', url: '#' },
  { text: 'LinkedIn', url: '#' },
  { text: 'Legal', url: '#' },
];

export default function FooterWithSuite({
  brandName = 'Practicality',
  tagline = 'We ship fast, we ship right.',
  navLinks = defaultNavLinks,
  socialLinks = defaultSocialLinks,
  description = 'An indie product studio building tools developers actually want to use.',
  ctaText = 'Start a project',
  ctaUrl = '#',
  email = 'hello@practicality.dev',
  copyright = '© 2026 Practicality, Inc.',
  className,
}: FooterWithSuiteProps) {
  return (
    <footer
      className={cn(
        'w-full relative overflow-hidden bg-white dark:bg-neutral-950 select-none',
        className,
      )}
    >
      <div className='grid grid-cols-2 gap-8 px-8 pt-12 pb-4 md:px-12'>
        <div className='flex flex-col gap-0'>
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              className='py-0.75 text-[11px] tracking-[0.14em] uppercase text-neutral-900 dark:text-neutral-100 hover:text-neutral-400 dark:hover:text-neutral-500 transition-colors duration-200'
            >
              {link.text}
            </a>
          ))}

          <div className='h-5' />

          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              className='py-0.75 text-[11px] tracking-[0.14em] uppercase text-neutral-900 dark:text-neutral-100 hover:text-neutral-400 dark:hover:text-neutral-500 transition-colors duration-200'
            >
              {link.text}
            </a>
          ))}
        </div>

        <div className='flex flex-col gap-0'>
          <p className='text-[11px] tracking-[0.12em] uppercase text-neutral-900 dark:text-neutral-100 leading-relaxed'>
            {description}
          </p>

          <div className='h-5' />

          <p className='text-[11px] tracking-[0.12em] uppercase text-neutral-400 dark:text-neutral-500 leading-relaxed'>
            Got a product idea? A hard problem? Just want to talk?
          </p>

          <div className='h-4' />

          <a
            href={ctaUrl}
            className='text-[11px] tracking-[0.14em] uppercase text-neutral-900 dark:text-neutral-100 hover:text-neutral-400 dark:hover:text-neutral-500 transition-colors duration-200'
          >
            {ctaText}
          </a>

          <div className='h-4' />

          <a
            href={`mailto:${email}`}
            className='text-[11px] tracking-[0.14em] uppercase text-neutral-900 dark:text-neutral-100 hover:text-neutral-400 dark:hover:text-neutral-500 transition-colors duration-200 break-all'
          >
            {email}
          </a>

          <div className='h-4' />

          <p className='text-[11px] tracking-[0.12em] uppercase text-neutral-400 dark:text-neutral-500'>
            {copyright}
          </p>
        </div>
      </div>

      <p
        className='inset-x-0 text-center font-bold text-neutral-900 dark:text-neutral-100'
        style={{ fontSize: 'clamp(3rem, 15vw, 13rem)' }}
      >
        {brandName}
      </p>

      <div className='flex items-center justify-between px-8 md:px-12 py-3 border-t border-neutral-200 dark:border-neutral-800 mt-1'>
        <p className='text-[10px] tracking-[0.14em] uppercase text-neutral-400 dark:text-neutral-500'>
          {tagline}
        </p>
      </div>
    </footer>
  );
}

export { FooterWithSuite };
