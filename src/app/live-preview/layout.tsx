import { ThemeSwitch } from '@/components/ui/theme-switch';
import { ScrollLockToggle } from '@/lib/scrolllock';
import { Moon, Sun, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LivePreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='relative isolate min-h-screen flex flex-col p-2 sm:p-16'>
      <div className='relative z-0'>{children}</div>

      <div className='fixed bottom-6 left-1/2 -translate-x-1/2 z-9999'>
        <div className='flex items-center gap-4 rounded-full border bg-background/70 backdrop-blur-md shadow-xl px-5 py-2'>
          <Link
            href='/blocks'
            className='p-2 rounded-full hover:bg-muted transition'
          >
            <ArrowLeft size={18} />
          </Link>

          <ThemeSwitch
            modes={['light', 'dark']}
            icons={[
              <Sun key='sun-icon' size={16} />,
              <Moon key='moon-icon' size={16} />,
            ]}
            showActiveIconOnly
          />

          <ScrollLockToggle />
        </div>
      </div>
    </main>
  );
}
