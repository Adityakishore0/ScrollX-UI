'use client';
import { Showcase } from '@/components/ui/showcase';

const sections = [
  {
    label: 'Step 1',
    heading: 'Adventure',
    description: 'A lone hiker stands on a rocky cliff above the fog.',
    media:
      'https://images.pexels.com/photos/16985451/pexels-photo-16985451.jpeg',
  },
  {
    label: 'Step 2',
    heading: 'Lights',
    description: 'Vibrant green aurora borealis glows over snowy pines.',
    media:
      'https://images.pexels.com/photos/28853379/pexels-photo-28853379.jpeg',
  },
  {
    label: 'Step 3',
    heading: 'View',
    description: 'Palm trees silhouetted against a tropical sunset.',
    media: 'https://images.pexels.com/photos/3426870/pexels-photo-3426870.jpeg',
  },
];

export default function ShowcaseDemo() {
  return (
    <div className='w-full h-112.5 flex items-center justify-center'>
      <Showcase
        items={sections}
        cycleDelay={6000}
        mediaClass='h-50 md:h-auto'
      />
    </div>
  );
}
