'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TemplateCarouselProps {
  images: string[];
  templateTitle: string;
}

export function TemplateCarousel({
  images,
  templateTitle,
}: TemplateCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className='lg:hidden'>
        <div className='relative overflow-hidden rounded-xl border border-border bg-card'>
          <div className='w-full aspect-video bg-muted'>
            <img
              src={images[currentIndex]}
              alt={`${templateTitle} screenshot ${currentIndex + 1}`}
              className='h-full w-full object-cover'
            />
          </div>

          <button
            onClick={handlePrevious}
            className='absolute left-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-background transition-colors'
            aria-label='Previous image'
          >
            <ChevronLeft className='h-4 w-4' />
          </button>

          <button
            onClick={handleNext}
            className='absolute right-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-background transition-colors'
            aria-label='Next image'
          >
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
      </div>

      <div className='hidden lg:grid grid-cols-3 gap-4'>
        {images.map((src, i) => (
          <div
            key={i}
            className='overflow-hidden rounded-xl border border-border bg-card'
          >
            <div className='w-full bg-muted aspect-video'>
              <img
                src={src}
                alt={`${templateTitle} screenshot ${i + 1}`}
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
