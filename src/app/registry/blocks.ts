export const blocks = [
  { category: 'cta-sections', name: 'cta-section-with-avatars' },
  {
    category: 'frequently-asked-questions',
    name: 'frequently-asked-questions-with-accordion',
  },
  {
    category: 'frequently-asked-questions',
    name: 'frequently-asked-questions-stack',
  },
  { category: 'hero-sections', name: 'hero-with-iphone' },
  { category: 'hero-sections', name: 'hero-with-layers' },
  { category: 'hero-sections', name: 'hero-with-pixelbackground' },
  { category: 'logo-cloud', name: 'logo-cloud-flipflow' },
  { category: 'logo-cloud', name: 'logo-cloud-marquee' },
] as const;

export type BlockEntry = (typeof blocks)[number];

export type BlockKey = `${BlockEntry['category']}/${BlockEntry['name']}`;
