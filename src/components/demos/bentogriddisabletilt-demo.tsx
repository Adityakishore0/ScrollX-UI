import { BarChart3, Globe, Lock, Sparkles, Users, Zap } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

const items = [
  {
    title: 'Deep Analytics',
    description:
      'Gain actionable insights from your data with powerful analytics tools.',
    icon: <BarChart3 className='h-4 w-4 text-neutral-500' />,
    containerClassName: 'md:col-span-1',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'Enterprise Security',
    description:
      'Bank-grade encryption and compliance tools to keep your data safe.',
    icon: <Lock className='h-4 w-4 text-neutral-500' />,
    containerClassName: 'md:col-span-2',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'Global CDN',
    description:
      'Deliver content at lightning speed to users anywhere in the world.',
    icon: <Globe className='h-4 w-4 text-neutral-500' />,
    containerClassName: 'md:col-span-1',
    image:
      'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'AI-Powered Features',
    description:
      'Supercharge your workflow with intelligent suggestions and automation.',
    icon: <Sparkles className='h-4 w-4 text-neutral-500' />,
    containerClassName: 'md:col-span-1',
    image:
      'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'The Joy of Creation',
    description: 'Experience the thrill of bringing ideas to life.',
    icon: <Sparkles className='h-4 w-4 text-neutral-500' />,
    containerClassName: 'md:col-span-1 md:row-span-2',
    image:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'The Spirit of Adventure',
    description: 'Embark on exciting journeys and thrilling discoveries.',
    icon: <Sparkles className='h-4 w-4 text-neutral-500' />,
    containerClassName: 'md:col-span-2',
    image:
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&auto=format&fit=crop&q=60',
  },
];

export default function BentoGridDisableTiltDemo() {
  return (
    <BentoGrid>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          icon={item.icon}
          containerClassName={item.containerClassName}
          disableTilt
          header={
            <div className='relative flex h-full min-h-24 w-full overflow-hidden rounded-xl'>
              <img
                src={item.image}
                alt={item.title}
                className='h-full w-full object-cover transition-transform duration-500 group-hover/bento:scale-105'
              />
              <div className='absolute inset-0 bg-black/10 dark:bg-black/30' />
            </div>
          }
        />
      ))}
    </BentoGrid>
  );
}
