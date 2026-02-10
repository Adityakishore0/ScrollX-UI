import { AlarmClockIcon } from '@/components/icons/alarm-clock';
import { ContrastIcon } from '@/components/icons/contrast';
import { ConnectIcon } from '@/components/icons/connect';
import { FrameIcon } from '@/components/icons/frame';
import { SettingsIcon } from '@/components/icons/settings';
import { ZapIcon } from '@/components/icons/zap';
import { AuroraDotsWrapper } from '@/components/auroradots-wrapper';
import { FeatureCard } from '@/components/feature-card';

const features = [
  {
    title: 'Animations',
    description:
      'Add stunning animations to your UI with minimal effort. Transform your static website into dynamic, engaging interfaces.',
    icon: AlarmClockIcon,
    className: 'md:row-span-2',
    iconSize: 124,
    iconSizeMobile: 48,
  },
  {
    title: 'Themeable',
    description: 'Each component is designed for light & dark mode.',
    icon: ContrastIcon,
    className: 'md:col-span-2',
  },
  {
    title: 'Customizable',
    description: 'Every component is designed to be easily customized.',
    icon: SettingsIcon,
  },
  {
    title: 'Performance',
    description: 'Optimized for performance, ensuring smooth animations.',
    icon: ZapIcon,
  },
  {
    title: 'Responsive',
    description: 'Component adapts beautifully to different screen sizes.',
    icon: FrameIcon,
    className: 'md:col-span-2',
  },
  {
    title: 'CLI & Manual',
    description: 'Get started in minutes with our comprehensive documentation.',
    icon: ConnectIcon,
  },
];

export function FeaturesSection() {
  return (
    <section className='w-full py-20 px-4 md:px-8 bg-linear-to-b from-white to-gray-50 dark:from-[#0b0b0b] dark:via-[#090909] dark:to-[#0b0b0b] select-none'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16 space-y-4'>
          <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>
            The foundation for modern interfaces.
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            High-performance primitives for modern web applications.
          </p>
        </div>

        <AuroraDotsWrapper
          className='rounded-3xl bg-linear-to-b from-[#0b0b0b] via-[#090909] to-[#0b0b0b] p-6'
          particleColor='99, 102, 241'
          glowIntensity={0.25}
          animationSpeed={60}
          hoverRadius={12}
          hoverGlowIntensity={1.2}
        >
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]'>
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </AuroraDotsWrapper>
      </div>
    </section>
  );
}
