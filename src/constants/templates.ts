export interface Template {
  slug: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  features: string[];
  techStack: string[];
  liveUrl: string;
  downloadUrl: string;
}

export const templates: Template[] = [
  {
    slug: 'developer-portfolio-template',
    title: 'Developer Portfolio Template',
    description:
      'A professional developer portfolio with sound effects, smooth animations, and a single config file setup. Built with Next.js 16, ScrollX UI, and shadcn/ui.',
    images: [
      '/assets/templates/developer_portfolio_template_hero.png',
      '/assets/templates/developer_portfolio_template_contact.png',
      '/assets/templates/developer_portfolio_template_skills.png',
    ],
    category: 'Portfolio',
    features: [
      'Single Config Setup',
      'Sound Effects',
      'Responsive Design',
      'Dark Mode',
      'Smooth Animations',
    ],
    techStack: [
      'Next.js 16',
      'TypeScript',
      'Tailwind CSS v4',
      'shadcn/ui',
      'Motion',
      'ScrollX UI',
    ],
    liveUrl: 'https://portfolio-scrollxui.netlify.app',
    downloadUrl:
      'https://github.com/adityakishore0/scrollxuidesign-portfolio_template/archive/refs/heads/main.zip',
  },
  {
    slug: 'ai-saas-template',
    title: 'AI SaaS Template',
    description:
      'A modern, production-ready AI SaaS landing page template with a clean design, responsive layout, and minimal setup. Built with Next.js 16, ScrollX UI, and shadcn/ui.',
    images: [
      '/assets/templates/ai_saas_template_hero.png',
      '/assets/templates/ai_saas_template_pricing.png',
      '/assets/templates/ai_saas_template_cta.png',
    ],
    category: 'SaaS',
    features: [
      'Easy Setup',
      'Responsive Design',
      'Dark Mode',
      'Smooth Animations',
      'Optimized for Vercel',
    ],
    techStack: [
      'Next.js 16',
      'TypeScript',
      'Tailwind CSS v4',
      'shadcn/ui',
      'Motion',
      'ScrollX UI',
    ],
    liveUrl: 'https://aisaas-template-scrollxui.netlify.app',
    downloadUrl:
      'https://github.com/Adityakishore0/scrollxuidesign-aisaas_template/archive/refs/heads/main.zip',
  },
];
