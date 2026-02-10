'use client';

import { useState } from 'react';
import { CosmicBackground } from '@/components/ui/cosmic-background';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CosmicBackgroundDemo() {
  const [variant, setVariant] = useState('neon');
  const [quality, setQuality] = useState('ultra');
  const [interactive, setInteractive] = useState('true');
  const [overlay, setOverlay] = useState('false');
  const [speed, setSpeed] = useState('1');
  const [intensity, setIntensity] = useState('1');
  const [showSettings, setShowSettings] = useState(false);

  const compactTriggerClass = 'h-6 text-[10px] w-[80px]';

  return (
    <div className='relative h-100 w-full'>
      <button
        onClick={() => setShowSettings((prev) => !prev)}
        className='absolute top-4 right-4 z-30 bg-black/70 text-white px-2 py-1 rounded-sm text-xs'
      >
        {showSettings ? 'Hide Settings' : 'Show Settings'}
      </button>

      {showSettings && (
        <div className='absolute top-14 right-4 z-30 grid grid-cols-2 gap-2 bg-black/30 p-2 rounded-sm max-w-xs'>
          <div>
            <p className='text-white text-[10px] mb-1'>Variant</p>
            <Select value={variant} onValueChange={(v) => setVariant(v)}>
              <SelectTrigger className={compactTriggerClass}>
                <SelectValue placeholder='Variant' />
              </SelectTrigger>
              <SelectContent className='text-xs'>
                <SelectGroup>
                  <SelectItem value='neon'>Neon</SelectItem>
                  <SelectItem value='aurora'>Aurora</SelectItem>
                  <SelectItem value='cosmic'>Cosmic</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className='text-white text-[10px] mb-1'>Quality</p>
            <Select value={quality} onValueChange={(v) => setQuality(v)}>
              <SelectTrigger className={compactTriggerClass}>
                <SelectValue placeholder='Quality' />
              </SelectTrigger>
              <SelectContent className='text-xs'>
                <SelectGroup>
                  <SelectItem value='low'>Low</SelectItem>
                  <SelectItem value='medium'>Medium</SelectItem>
                  <SelectItem value='high'>High</SelectItem>
                  <SelectItem value='ultra'>Ultra</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className='text-white text-[10px] mb-1'>Interactive</p>
            <Select
              value={interactive}
              onValueChange={(v) => setInteractive(v)}
            >
              <SelectTrigger className={compactTriggerClass}>
                <SelectValue placeholder='Interactive' />
              </SelectTrigger>
              <SelectContent className='text-xs'>
                <SelectGroup>
                  <SelectItem value='true'>True</SelectItem>
                  <SelectItem value='false'>False</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className='text-white text-[10px] mb-1'>Overlay</p>
            <Select value={overlay} onValueChange={(v) => setOverlay(v)}>
              <SelectTrigger className={compactTriggerClass}>
                <SelectValue placeholder='Overlay' />
              </SelectTrigger>
              <SelectContent className='text-xs'>
                <SelectGroup>
                  <SelectItem value='true'>True</SelectItem>
                  <SelectItem value='false'>False</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className='text-white text-[10px] mb-1'>Speed</p>
            <Select value={speed} onValueChange={(v) => setSpeed(v)}>
              <SelectTrigger className={compactTriggerClass}>
                <SelectValue placeholder='Speed' />
              </SelectTrigger>
              <SelectContent className='text-xs'>
                <SelectGroup>
                  <SelectItem value='0.5'>0.5</SelectItem>
                  <SelectItem value='1'>1</SelectItem>
                  <SelectItem value='1.5'>1.5</SelectItem>
                  <SelectItem value='2'>2</SelectItem>
                  <SelectItem value='3'>3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className='text-white text-[10px] mb-1'>Intensity</p>
            <Select value={intensity} onValueChange={(v) => setIntensity(v)}>
              <SelectTrigger className={compactTriggerClass}>
                <SelectValue placeholder='Intensity' />
              </SelectTrigger>
              <SelectContent className='text-xs'>
                <SelectGroup>
                  <SelectItem value='0.5'>0.5</SelectItem>
                  <SelectItem value='1'>1</SelectItem>
                  <SelectItem value='1.5'>1.5</SelectItem>
                  <SelectItem value='2'>2</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <CosmicBackground
        variant={variant as 'neon' | 'aurora' | 'cosmic'}
        intensity={Number(intensity)}
        speed={Number(speed)}
        quality={quality as 'low' | 'medium' | 'high' | 'ultra'}
        interactive={interactive === 'true'}
        overlay={overlay === 'true'}
        className='relative h-100 w-full flex flex-col items-center justify-center'
      >
        {overlay === 'true' && (
          <h2 className='bg-clip-text text-transparent text-center bg-linear-to-b from-white to-neutral-200 drop-shadow-[0_0_20px_rgba(255,255,255,0.25)] text-2xl md:text-4xl lg:text-6xl py-2 md:py-10 relative z-20 font-bold tracking-tight'>
            Feeling cosmic?
          </h2>
        )}
      </CosmicBackground>
    </div>
  );
}
