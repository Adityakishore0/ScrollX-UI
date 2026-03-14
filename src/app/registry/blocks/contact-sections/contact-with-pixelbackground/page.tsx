'use client';

import PixelBackground from '@/components/ui/pixel-background';
import { Button } from '@/components/ui/button';
import { StaggerButton } from '@/components/ui/stagger-button';
import { Mail, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactWithPixelBackgroundProps {
  title?: string;
  description?: string;
  salesEmail?: string;
  supportEmail?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export default function ContactWithPixelBackground({
  title = 'Get in Touch',
  description = "Have a question, feedback, or need support? We're here to help and will respond as soon as possible.",
  salesEmail = 'hello@yourapp.com',
  supportEmail = 'support@yourapp.com',
  ctaText = 'Talk to Us',
  ctaHref = '#',
  className,
}: ContactWithPixelBackgroundProps) {
  return (
    <div className={cn('max-w-2xl mx-auto px-4 py-16', className)}>
      <div className='border rounded-xl relative'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border bg-primary z-10 rounded-xl px-4 py-1 whitespace-nowrap'>
          <span className='text-background text-sm font-medium'>Contact</span>
        </div>

        <div
          className='absolute inset-x-0 top-0 h-1/2 rounded-t-xl overflow-hidden'
          style={{
            maskImage: 'linear-gradient(to bottom, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
          }}
        >
          <PixelBackground
            gap={6}
            speed={60}
            colors='#1a1a1a,#2a2a2a,#333333,#111111,#d4d4d4,#e5e5e5,#c4c4c4,#bababa'
            opacity={1}
            direction='top'
            className='w-full h-full absolute inset-0'
          />
        </div>

        <div className='relative flex flex-col items-center gap-6 text-center pt-16 pb-10 px-10'>
          <div className='flex flex-col items-center gap-3'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
              {title}
            </h2>
            <p className='mx-auto max-w-lg text-muted-foreground text-balance'>
              {description}
            </p>
          </div>

          <div className='flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm'>
            <Button
              asChild
              variant='outline'
              className='w-full min-w-0 gap-2 text-xs'
            >
              <a href={`mailto:${salesEmail}`} className='min-w-0'>
                <Mail className='w-3.5 h-3.5 shrink-0' />
                <span className='truncate'>{salesEmail}</span>
              </a>
            </Button>
            <Button
              asChild
              variant='outline'
              className='w-full min-w-0 gap-2 text-xs'
            >
              <a href={`mailto:${supportEmail}`} className='min-w-0'>
                <Headphones className='w-3.5 h-3.5 shrink-0' />
                <span className='truncate'>{supportEmail}</span>
              </a>
            </Button>
          </div>

          <a href={ctaHref}>
            <StaggerButton text={ctaText} hoverText={ctaText} direction='up' />
          </a>
        </div>
      </div>
    </div>
  );
}
