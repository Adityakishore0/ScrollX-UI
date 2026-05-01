import FeaturesWithPanel from '@/app/registry/blocks/features/features-with-panel/page';

export function FeaturesSection() {
  return (
    <section className='w-full pt-20 px-4 md:px-8 bg-linear-to-b from-white to-gray-50 dark:from-[#0b0b0b] dark:via-[#090909] dark:to-[#0b0b0b] select-none'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center space-y-4'>
          <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>
            The foundation for modern interfaces.
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            High-performance primitives for modern web applications.
          </p>
        </div>
        <div className='-my-5'>
          <FeaturesWithPanel />
        </div>
      </div>
    </section>
  );
}
