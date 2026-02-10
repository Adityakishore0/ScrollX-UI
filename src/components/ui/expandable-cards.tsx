'use client';
import { useState } from 'react';
import { motion, Variants } from 'motion/react';
import { cn } from '@/lib/utils';

interface ExpandableCard {
  id: number;
  content: React.ReactNode;
}

interface ExpandableCardsProps {
  cards: ExpandableCard[];
  defaultExpanded?: number;
  className?: string;
}

export default function ExpandableCards({
  cards,
  defaultExpanded = 1,
  className,
}: ExpandableCardsProps) {
  const [expandedId, setExpandedId] = useState<number>(defaultExpanded);

  const cardVariants: Variants = {
    expanded: {
      flex: 3,
      transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
    },
    collapsed: {
      flex: 1,
      transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
    },
  };

  return (
    <div className={cn('flex gap-3 sm:gap-4 w-full h-full', className)}>
      {cards.map((card) => {
        const isExpanded = expandedId === card.id;

        return (
          <motion.div
            key={card.id}
            className='relative h-full overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer'
            variants={cardVariants}
            initial={isExpanded ? 'expanded' : 'collapsed'}
            animate={isExpanded ? 'expanded' : 'collapsed'}
            onMouseEnter={() => setExpandedId(card.id)}
          >
            <div className='absolute inset-0'>{card.content}</div>

            {!isExpanded && (
              <motion.div
                className='absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300'
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
