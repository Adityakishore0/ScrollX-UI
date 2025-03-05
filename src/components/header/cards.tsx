export default function CodeCards() {
  const cards = [
    {
      id: 1,
      zIndex: 30,
      offset: 'translate-x-0 translate-y-0',
      filename: 'components/Header.tsx',
      code: `import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold">My Website</h1>
    </header>
  );
};

export default Header;`,
    },
    {
      id: 2,
      zIndex: 20,
      offset: 'translate-x-3 translate-y-3',
      filename: 'pages/About.tsx',
      code: `import React from 'react';
const About: React.FC = () => {
  return (
    <section className="p-8">
      <h2 className="text-2xl font-semibold">About Us</h2>
      <p className="text-gray-700">We build awesome.</p>
    </section>
  );
};
export default About;`,
    },
    {
      id: 3,
      zIndex: 10,
      offset: 'translate-x-6 translate-y-6',
      filename: 'utils/helpers.ts',
      code: `export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: '2-digit'
  }).format(date);
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};`,
    },
  ];

  return (
    <div className='relative flex justify-center items-center h-screen'>
      {cards.map((card) => (
        <div
          key={card.id}
          style={{ zIndex: card.zIndex }} // ✅ Apply zIndex via inline style
          className={`absolute ${card.offset} bg-neutral-800 rounded-xl shadow-2xl overflow-hidden border border-neutral-700
            w-[260.3px] h-[280.4px] sm:w-[456px] sm:h-[280.4px]`}
        >
          {/* Editor Toolbar */}
          <div className='bg-neutral-900 p-3 border-b border-neutral-800 flex items-center'>
            <div className='flex space-x-2'>
              <div className='w-3 h-3 rounded-full bg-red-500'></div>
              <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
              <div className='w-3 h-3 rounded-full bg-green-500'></div>
            </div>
            <div className='ml-4 px-3 py-1 bg-neutral-800 rounded text-xs text-center text-gray-400 flex-grow max-w-xs'>
              {card.filename}
            </div>
          </div>

          {/* Code Content */}
          <div className='p-4 text-left h-full overflow-auto'>
            <pre className='text-sm text-gray-300 font-mono'>
              <code>{card.code}</code>
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
}
