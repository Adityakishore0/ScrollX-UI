import Image from 'next/image';
import { useState } from 'react';

interface TSdivrevealProps {
  backgroundColour?: string;
  textColor?: string;
  descriptionColor?: string;
}

const TSdivreveal: React.FC<TSdivrevealProps> = ({
  backgroundColour = 'white',
  textColor = 'white',
  descriptionColor = 'gray-300',
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
      className={`flex justify-center items-center min-h-screen bg-${backgroundColour} p-6`}
    >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl'>
        {images.map((image, index) => (
          <HoverCard
            key={index}
            image={image}
            textColor={textColor}
            descriptionColor={descriptionColor}
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
}

const HoverCard: React.FC<HoverCardProps> = ({
  image,
  textColor,
  descriptionColor,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const toggleReveal = () => {
    setIsRevealed((prev) => !prev);
  };

  return (
    <div className='relative w-80 h-96 bg-white shadow-2xl rounded-xl overflow-hidden group'>
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

      <div
        className={`absolute bottom-0 left-0 w-full ${
          isRevealed ? 'h-16' : 'h-full'
        } flex flex-col justify-center items-center bg-black text-${textColor} transition-all duration-500 rounded-b-xl group-hover:h-16`}
      >
        <h2 className='text-lg font-bold transition-all duration-500 group-hover:text-2xl'>
          {image.name}
        </h2>
        <p
          className={`text-sm text-${descriptionColor} transition-opacity duration-500 ${
            isRevealed ? 'opacity-0' : 'opacity-100'
          } group-hover:opacity-0`}
        >
          {image.description}
        </p>

        <button
          onClick={toggleReveal}
          className='absolute bottom-2 flex justify-center items-center text-white text-xl'
        >
          {isRevealed ? '▲' : '▼'}
        </button>
      </div>
    </div>
  );
};

export default TSdivreveal;
