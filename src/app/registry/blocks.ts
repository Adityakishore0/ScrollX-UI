export const blocks = [
  { category: 'bento', name: 'bento-with-focus' },
  { category: 'contact-sections', name: 'contact-with-pixelbackground' },
  { category: 'contact-sections', name: 'contact-with-globe' },
  { category: 'cta-sections', name: 'cta-section-with-avatars' },
  { category: 'cta-sections', name: 'cta-section-with-floating-gallery' },
  { category: 'download-sections', name: 'download-with-iphone' },
  { category: 'features', name: 'features-with-panel' },
  { category: 'features', name: 'features-with-spotlight' },
  { category: 'footers', name: 'footer-with-minimal-outline' },
  { category: 'footers', name: 'footer-with-faded-brand' },
  { category: 'footers', name: 'footer-with-newsletter' },
  {
    category: 'frequently-asked-questions',
    name: 'frequently-asked-questions-with-accordion',
  },
  {
    category: 'frequently-asked-questions',
    name: 'frequently-asked-questions-stack',
  },
  { category: 'hero-sections', name: 'hero-with-cards' },
  { category: 'hero-sections', name: 'hero-with-iphone' },
  { category: 'hero-sections', name: 'hero-with-layers' },
  { category: 'hero-sections', name: 'hero-with-pixelbackground' },
  { category: 'hero-sections', name: 'hero-with-reel' },
  { category: 'logo-cloud', name: 'logo-cloud-flipflow' },
  { category: 'logo-cloud', name: 'logo-cloud-marquee' },
  { category: 'logo-cloud', name: 'logo-cloud-with-minimal-animation' },
  { category: 'not-found', name: 'not-found-with-glitchytext' },
  { category: 'pricing-sections', name: 'pricing-minimal' },
  { category: 'pricing-sections', name: 'pricing-with-switch' },
  { category: 'testimonials', name: 'testimonials-with-carousel' },
  { category: 'testimonials', name: 'testimonials-with-marquee' },
  { category: 'testimonials', name: 'testimonials-with-verticalmarquee' },
  { category: 'waitlist-sections', name: 'waitlist-with-iphone' },
  { category: 'waitlist-sections', name: 'waitlist-with-layers' },
] as const;

export type BlockEntry = (typeof blocks)[number];

export type BlockKey = `${BlockEntry['category']}/${BlockEntry['name']}`;
