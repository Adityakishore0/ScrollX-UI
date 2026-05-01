import { ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function TemplatesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className='flex-1 flex flex-col min-h-screen'>
        <div className='relative z-30'>{children}</div>
        <div className='sticky bottom-0'>
          <Footer />
        </div>
      </main>
    </>
  );
}
