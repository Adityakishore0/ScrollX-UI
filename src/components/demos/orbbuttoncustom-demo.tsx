import { OrbButton } from '@/components/ui/orb-button';
import { TrendingUp } from 'lucide-react';

export default function OrbButtonCustomDemo() {
  return (
    <OrbButton
      dotClassName='bg-emerald-500 dark:bg-emerald-500'
      Icon={TrendingUp}
    >
      Explore
    </OrbButton>
  );
}
