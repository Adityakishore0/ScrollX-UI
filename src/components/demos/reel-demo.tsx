import { Reel, ReelItem } from '@/components/ui/reel';

const items: ReelItem[] = [
  {
    id: '1',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  },
  {
    id: '2',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
  },
  {
    id: '3',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1566679056462-2075774c8c07?w=600&q=80',
  },
  {
    id: '4',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80',
  },
  {
    id: '5',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80',
  },
  {
    id: '6',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
  },
  {
    id: '7',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
  },
  {
    id: '8',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  },
  {
    id: '9',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80',
  },
  {
    id: '10',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&q=80',
  },
  {
    id: '11',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=600&q=80',
  },
  {
    id: '12',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=80',
  },
];

export default function ReelDemo() {
  return <Reel rows={2} pauseOnHover={false} items={items} />;
}
