'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { templates } from '@/constants/templates';
import { TemplateCarousel } from '@/components/template-carousel';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { MorphyButton } from '@/components/ui/morphy-button';

export default function TemplatesClient() {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash) {
        const el = document.getElementById(hash.replace('#', ''));

        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const activeSlug =
    typeof window !== 'undefined'
      ? window.location.hash.replace('#', '')
      : null;

  return (
    <main className='flex-1 bg-background'>
      <div className='relative flex flex-col items-center justify-center px-4 pt-24 pb-16 text-center overflow-hidden border-b border-border'>
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <div className='h-100 w-175 rounded-full bg-foreground/5 blur-[120px]' />
        </div>

        <div className='relative mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground'>
          <Sparkles className='h-3.5 w-3.5' />
          <span>{templates.length} production-ready templates</span>
        </div>

        <h1 className='relative max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl'>
          Templates
        </h1>

        <p className='relative mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed'>
          Beautiful, responsive templates built with ScrollX UI components.
          <br />
          Copy the code, customize the design, and ship your project faster.
        </p>
      </div>

      <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16'>
        <div className='space-y-20'>
          {templates.map((template, index) => (
            <div
              key={template.slug}
              id={template.slug}
              className={cn(
                'group relative transition-all duration-500',
                activeSlug === template.slug &&
                  'ring-2 ring-primary/50 rounded-xl p-2',
              )}
            >
              <div className='lg:hidden'>
                <TemplateCarousel
                  images={template.images}
                  templateTitle={template.title}
                />

                <div className='mt-6 flex flex-col gap-4'>
                  <div>
                    <h2 className='text-2xl font-bold tracking-tight text-foreground mb-3'>
                      {template.title}
                    </h2>

                    <p className='text-base text-muted-foreground leading-relaxed mb-4'>
                      {template.description}
                    </p>

                    <div className='flex flex-wrap gap-2 mb-4'>
                      {template.techStack.map((tech) => (
                        <span
                          key={tech}
                          className='text-xs px-2.5 py-1 bg-foreground/5 text-foreground/80 rounded-md border border-border/50 font-medium'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className='flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6'>
                      {template.features.map((feature, i) => (
                        <div key={i} className='flex items-center gap-1.5'>
                          <div className='h-1 w-1 rounded-full bg-foreground/40' />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='flex flex-col gap-3'>
                    <Button variant='outline' asChild className='gap-2 w-full'>
                      <a href={template.liveUrl} target='_blank'>
                        <ExternalLink className='h-4 w-4' />
                        Live Preview
                      </a>
                    </Button>

                    <Button asChild className='gap-2 w-full'>
                      <a href={template.downloadUrl} download>
                        <Download className='h-4 w-4' />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className='hidden lg:flex lg:flex-col lg:gap-8'>
                <div className='flex flex-row items-start justify-between gap-6'>
                  <div className='flex-1 max-w-2xl'>
                    <h2 className='text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3'>
                      {template.title}
                    </h2>

                    <p className='text-base text-muted-foreground leading-relaxed mb-4'>
                      {template.description}
                    </p>

                    <div className='flex flex-wrap gap-2 mb-4'>
                      {template.techStack.map((tech) => (
                        <span
                          key={tech}
                          className='text-xs px-2.5 py-1 bg-foreground/5 text-foreground/80 rounded-md border border-border/50 font-medium'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className='flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground'>
                      {template.features.map((feature, i) => (
                        <div key={i} className='flex items-center gap-1.5'>
                          <div className='h-1 w-1 rounded-full bg-foreground/40' />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='flex flex-col items-stretch gap-3 shrink-0 w-44'>
                    <Button variant='outline' asChild className='gap-2 w-full'>
                      <a href={template.liveUrl} target='_blank'>
                        <ExternalLink className='h-4 w-4' />
                        Live Preview
                      </a>
                    </Button>

                    <Button asChild className='gap-2 w-full'>
                      <a href={template.downloadUrl} download>
                        <Download className='h-4 w-4' />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>

                <TemplateCarousel
                  images={template.images}
                  templateTitle={template.title}
                />
              </div>
            </div>
          ))}

          <div className='mx-auto max-w-300 px-5 lg:px-8'>
            <div
              className='relative mx-auto flex w-full max-w-300 flex-col items-center gap-6 rounded-[50px] px-12 py-16 text-center shadow-[0_12px_32px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.06)] overflow-hidden select-none transition-all duration-300'
              style={{
                background:
                  'linear-gradient(135deg, #8B7AFF, #A593FF, #6B5AEF, #7B6AFF, #5B4ADF, #9B8AFF)',
              }}
            >
              <div
                className='pointer-events-none absolute inset-0 z-1 rounded-[50px]'
                style={{
                  backgroundImage: "url('/images/grain.webp')",
                  backgroundSize: '400px 400px',
                  backgroundRepeat: 'repeat',
                  filter: 'brightness(4) contrast(1.2)',
                  mixBlendMode: 'lighten',
                  opacity: 1,
                }}
              />

              <h3 className='relative z-2 text-3xl sm:text-4xl font-bold tracking-tight dark:text-white/80 text-black'>
                More Templates Coming Soon
              </h3>

              <p className='relative z-2 max-w-lg text-base sm:text-lg dark:text-white/80 text-black leading-relaxed'>
                E-commerce, authentication pages, blog layouts and more.
                <br />
                Star us on GitHub to get notified when new templates drop.
              </p>
              <Link
                href='https://github.com/adityakishore0/ScrollX-UI'
                className='relative z-2 text-base font-medium tracking-tight transition-all'
              >
                <MorphyButton animate='reverse'>Star on GitHub</MorphyButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
