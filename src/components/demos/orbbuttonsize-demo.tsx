import { OrbButton } from '@/components/ui/orb-button';

export default function OrbButtonSizeDemo() {
  return (
    <div className='flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center'>
      <OrbButton size='sm'>Small</OrbButton>
      <OrbButton size='default'>Default</OrbButton>
      <OrbButton size='lg'>Large</OrbButton>
    </div>
  );
}
