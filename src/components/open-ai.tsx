'use client';

import Link from 'next/link';
import { OpenAI, Claude } from '@lobehub/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface OpeninAIProps {
  docUrl: string;
}

const aiOptions = [
  {
    value: 'chatgpt',
    label: 'Open in ChatGPT',
    icon: <OpenAI size={16} />,
    getUrl: (prompt: string) =>
      `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    value: 'claude',
    label: 'Open in Claude',
    icon: <Claude size={16} />,
    getUrl: (prompt: string) =>
      `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
];

function OpeninAIMenu({
  animate,
  prompt,
}: {
  animate: boolean;
  prompt: string;
}) {
  return (
    <DropdownMenu animate={animate}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='gap-1.5'>
          Open in AI
          <ChevronDown className='w-3.5 h-3.5' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='ml-2 w-fit! min-w-0!'>
        {aiOptions.map((option) => (
          <DropdownMenuItem key={option.value} asChild>
            <Link
              href={option.getUrl(prompt)}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2'
            >
              {option.icon}
              {option.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function OpeninAI({ docUrl }: OpeninAIProps) {
  const prompt = `I'm looking at this scrollxui documentation: ${docUrl}\nHelp me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`;

  return (
    <>
      <div className='md:hidden'>
        <OpeninAIMenu animate={false} prompt={prompt} />
      </div>
      <div className='hidden md:block'>
        <OpeninAIMenu animate={true} prompt={prompt} />
      </div>
    </>
  );
}
