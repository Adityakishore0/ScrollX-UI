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
import { ChevronDown, Copy, Check, FileText } from 'lucide-react';
import { useState } from 'react';

interface OpeninAIProps {
  docUrl: string;
  mdUrl: string;
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

function OpeninAIMenu({ prompt, mdUrl }: { prompt: string; mdUrl: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (copied) return;
    try {
      const res = await fetch(mdUrl);
      const text = await res.text();

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  }

  return (
    <div className='flex items-center'>
      <Button
        variant='outline'
        size='sm'
        className='gap-1.5 rounded-r-none border-r-0 w-26.25 justify-start'
        onClick={handleCopy}
      >
        <span className='relative flex items-center justify-center w-3.5 h-3.5 shrink-0'>
          <Copy
            className={`absolute w-3.5 h-3.5 transition-all duration-200 ${
              copied
                ? 'opacity-0 scale-50 rotate-12'
                : 'opacity-100 scale-100 rotate-0'
            }`}
          />
          <Check
            className={`absolute w-3.5 h-3.5 transition-all duration-200 ${
              copied
                ? 'opacity-100 scale-100 rotate-0'
                : 'opacity-0 scale-50 -rotate-12'
            }`}
          />
        </span>
        <span className='relative h-4 flex items-center'>
          <span
            className={`transition-all duration-200 absolute whitespace-nowrap ${
              copied ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            Copy Page
          </span>
          <span
            className={`transition-all duration-200 absolute whitespace-nowrap ${
              copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            Copied!
          </span>
        </span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='sm' className='rounded-l-none px-2'>
            <ChevronDown className='w-3.5 h-3.5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-52'>
          <DropdownMenuItem asChild>
            <a
              href={mdUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2'
            >
              <FileText className='w-4 h-4' />
              View as Markdown
            </a>
          </DropdownMenuItem>
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
    </div>
  );
}

export default function OpeninAI({ docUrl, mdUrl }: OpeninAIProps) {
  const prompt = `I'm looking at this scrollxui documentation: ${docUrl}\nHelp me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`;

  return <OpeninAIMenu prompt={prompt} mdUrl={mdUrl} />;
}
