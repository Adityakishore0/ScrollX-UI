import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface TSdivrevealProps {
  backgroundColour?: string;
  textColor?: string;
  descriptionColor?: string;
  cardHeight?: string;
  cardWidth?: string;
}

const TSdivreveal: React.FC<TSdivrevealProps> = ({
  backgroundColour = 'white',
  textColor = 'white',
  descriptionColor = 'gray-300',
  cardHeight = 'h-96',
  cardWidth = 'w-60',
}) => {
  const images = [
    {
      src: '/images/Earbuds.png',
      name: 'Earbuds',
      description: 'Wireless and noise-canceling.',
    },
    {
      src: '/images/Watch.png',
      name: 'Watch',
      description: 'Smart features with a sleek design.',
    },
    {
      src: '/images/Shoes.png',
      name: 'Shoes',
      description: 'Comfortable and stylish sneakers.',
    },
  ];

  return (
    <div
      className={twMerge(
        clsx(
          'mt-6 w-full min-h-[40vh] p-4 bg-black rounded-lg relative flex flex-col sm:flex-row',
          'sm:justify-center sm:items-center', // Center content smoothly on `sm:` and larger
          `bg-${backgroundColour}`
        )
      )}
    >
      <div className='grid grid-cols-1 gap-6 max-w-6xl lg:grid-cols-3'>
        {images.map((image, index) => (
          <HoverCard
            key={index}
            image={image}
            textColor={textColor}
            descriptionColor={descriptionColor}
            cardHeight={cardHeight}
            cardWidth={cardWidth}
          />
        ))}
      </div>
    </div>
  );
};

interface HoverCardProps {
  image: { src: string; name: string; description: string };
  textColor: string;
  descriptionColor: string;
  cardHeight: string;
  cardWidth: string;
}

const HoverCard: React.FC<HoverCardProps> = ({
  image,
  textColor,
  descriptionColor,
  cardHeight,
  cardWidth,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const toggleReveal = () => setIsRevealed((prev) => !prev);

  return (
    <div
      className={twMerge(
        clsx(
          'relative bg-white shadow-2xl rounded-xl overflow-hidden group',
          cardHeight,
          cardWidth
        )
      )}
    >
      {/* Image */}
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
        <Image
          src={image.src}
          alt={image.name}
          width={350}
          height={400}
          className='object-cover w-full h-full rounded-xl'
        />
      </div>

      {/* Hover Reveal Section */}
      <div
        className={twMerge(
          clsx(
            'absolute bottom-0 left-0 w-full flex flex-col justify-center items-center bg-black transition-all duration-500 rounded-b-xl group-hover:h-16',
            isRevealed ? 'h-16' : 'h-full'
          )
        )}
      >
        <h2
          className={twMerge(
            clsx(
              'text-lg font-bold transition-all duration-500 group-hover:text-2xl',
              `text-${textColor}`
            )
          )}
        >
          {image.name}
        </h2>
        <p
          className={twMerge(
            clsx(
              'text-sm transition-opacity duration-500',
              `text-${descriptionColor}`,
              isRevealed ? 'opacity-0' : 'opacity-100',
              'group-hover:opacity-0'
            )
          )}
        >
          {image.description}
        </p>

        <button
          onClick={toggleReveal}
          className={twMerge(
            clsx(
              'absolute bottom-2 flex justify-center items-center text-xl',
              `text-${textColor}`
            )
          )}
        >
          {isRevealed ? '▲' : '▼'}
        </button>
      </div>
    </div>
  );
};

export default TSdivreveal;
