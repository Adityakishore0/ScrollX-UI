import { LayerStack, Card } from '@/components/ui/layer-stack';

const items = [
  {
    tag: '01',
    title: 'Ocean Horizon',
    body: 'Discover untouched coastlines shaped by wind, water, and the quiet beauty of nature.',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86',
  },
  {
    tag: '02',
    title: 'Cityscapes',
    body: 'Peak is the heart of your horizon. Viewing high is half the beauty.',
    image: 'https://images.unsplash.com/photo-1665430790518-7831e5790aa0',
  },
  {
    tag: '03',
    title: 'Nature Design',
    body: 'Wilderness that feels inescapable, not artificial — finding serenity with silence.',
    image: 'https://images.unsplash.com/photo-1528826542659-27db5adea13c',
  },
  {
    tag: '04',
    title: 'Visual Balance',
    body: 'Reflection that feels symmetrical, not accidental — doubling beauty.',
    image: 'https://images.unsplash.com/photo-1663188285007-23a6d501efb6',
  },
  {
    tag: '05',
    title: 'Forms & Light',
    body: 'Sculpture creates meaning. A golden glow is the ephemeral soul behind great land.',
    image: 'https://images.unsplash.com/photo-1691898480873-1869d1a344cf',
  },
  {
    tag: '06',
    title: 'City Rhythm',
    body: 'Every sign, light, and shadow is a conversation between city and traveler.',
    image: 'https://images.unsplash.com/photo-1648809211550-ec3e788b999d',
  },
];

export default function LayerStackDemo() {
  return (
    <LayerStack
      cardWidth={300}
      cardGap={14}
      stageHeight={380}
      lastCardFullWidth={true}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast) {
          return (
            <Card
              key={item.tag}
              className='bg-card text-foreground border border-border overflow-hidden'
            >
              <div className='flex h-full flex-col md:flex-row'>
                <div className='relative md:w-1/2 h-48 md:h-full overflow-hidden'>
                  <img
                    src={`${item.image}?w=600&q=75&auto=format`}
                    alt={item.title}
                    loading='lazy'
                    decoding='async'
                    className='absolute inset-0 h-full w-full object-cover'
                    style={{
                      contentVisibility: 'auto',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                    }}
                  />
                </div>

                <div className='flex md:w-1/2 flex-col justify-between p-8 gap-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-[11px] font-medium tracking-[0.16em] uppercase text-muted-foreground'>
                      {item.tag}
                    </span>
                    <div className='size-1.5 rounded-full bg-foreground/20 dark:bg-foreground/40' />
                  </div>
                  <div className='space-y-3'>
                    <div className='h-px w-8 bg-border' />
                    <h2 className='text-2xl font-semibold tracking-tight leading-tight'>
                      {item.title}
                    </h2>
                    <p className='text-sm leading-relaxed text-muted-foreground'>
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          );
        }

        return (
          <Card
            key={item.tag}
            className='bg-card text-foreground border border-border overflow-hidden'
          >
            <div className='flex h-full flex-col p-8 gap-4'>
              <div className='flex items-center justify-between'>
                <span className='text-[11px] font-medium tracking-[0.16em] uppercase text-muted-foreground'>
                  {item.tag}
                </span>
                <div className='size-1.5 rounded-full bg-foreground/20 dark:bg-foreground/40' />
              </div>

              <div className='relative flex-1 overflow-hidden rounded-sm'>
                <img
                  src={`${item.image}?w=600&q=75&auto=format`}
                  alt={item.title}
                  loading='lazy'
                  decoding='async'
                  className='absolute inset-0 h-full w-full object-cover'
                  style={{
                    contentVisibility: 'auto',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                  }}
                />
              </div>

              <div className='space-y-3'>
                <div className='h-px w-8 bg-border' />
                <h2 className='text-2xl font-semibold tracking-tight leading-tight'>
                  {item.title}
                </h2>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {item.body}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </LayerStack>
  );
}
