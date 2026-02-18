'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Tabs } from '@/components/ui/tabs';

interface BlockTabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  title?: string;
}

export default function BlockTabs({
  children,
  defaultValue = 'cli',
  title = 'Installation',
}: BlockTabsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className='not-prose w-full rounded-2xl border border-border bg-card overflow-hidden my-6'>
      <button
        onClick={() => setOpen((o) => !o)}
        type='button'
        className='flex w-full items-center justify-between px-6 py-4 text-left hover:bg-accent/40 transition-colors group'
      >
        <h2 className='text-xl font-bold text-foreground tracking-tight'>
          {title}
        </h2>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground group-hover:text-foreground transition-all duration-300 ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      <div
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
        className='grid transition-[grid-template-rows] duration-300 ease-in-out'
      >
        <div className='overflow-hidden min-h-0'>
          <div className='border-t border-border' />
          <div className='px-6 pb-6 pt-4'>
            <Tabs defaultValue={defaultValue}>{children}</Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
