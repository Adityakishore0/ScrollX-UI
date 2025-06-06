export interface NavItem {
  title: string;
  href: string;
  category?: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  { title: "Getting Started", href: "" },
  { title: "Introduction", href: "/docs/introduction" },
  { title: "Installation", href: "/docs/installation" },

  {
    title: "Installation Guide",
    href: "",
    children: [
      { title: "CLI", href: "/docs/installation/cli" },
      { title: "Manual", href: "/docs/installation/manual" },
      {
        title: "Tailwind Setup",
        href: "/docs/installation/install-tailwindcss",
      },
    ],
  },

  {
    title: "Components",
    href: "",
    children: [
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Alert Dialog", href: "/docs/components/alert-dialog" },
      {
        title: "Animated Button",
        href: "/docs/components/animated-button",
      },
      {
        title: "Animated Showcase",
        href: "/docs/components/animated-showcase",
      },
      {
        title: "Animated Tabs",
        href: "/docs/components/animated-tabs",
      },
      {
        title: "Animated Testimonials",
        href: "/docs/components/animated-testimonials",
      },
      { title: "Aspect Ratio", href: "/docs/components/aspect-ratio" },
      { title: "Avatar", href: "/docs/components/avatar" },
      {
        title: "Background Meteors",
        href: "/docs/components/backgroundmeteors",
      },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Carousel", href: "/docs/components/carousel" },
      { title: "CodeBlock", href: "/docs/components/codeblock" },
      { title: "Cursor ImageTrail", href: "/docs/components/cursorimagetrail" },
      { title: "Dropdown", href: "/docs/components/dropdown" },
      {
        title: "Follow Cursor",
        href: "/docs/components/followcursor",
        category: "new",
      },
      {
        title: "GlowingBorderCard",
        href: "/docs/components/glowingbordercard",
      },
      {
        title: "Globe",
        href: "/docs/components/globe",
      },
      {
        title: "Hero Sections",
        href: "/docs/components/hero-sections",
        category: "new",
      },
      {
        title: "Interactive Input",
        href: "/docs/components/interactive-input",
      },
      { title: "Lamphome", href: "/docs/components/lamphome" },
      {
        title: "Light Trail",
        href: "/docs/components/light-trail",
      },
      {
        title: "lustre Text",
        href: "/docs/components/lustretext",
      },
      {
        title: "Magic Dock",
        href: "/docs/components/magicdock",
      },
      { title: "Modal", href: "/docs/components/modal" },
      {
        title: "Pagination",
        href: "/docs/components/pagination",
      },
      { title: "Popover", href: "/docs/components/popover" },
      {
        title: "Particles",
        href: "/docs/components/particles",
        category: "new",
      },
      {
        title: "Profile Card",
        href: "/docs/components/profilecard",
      },
      {
        title: "Radial Flow",
        href: "/docs/components/radialflow",
        category: "new",
      },
      {
        title: "Spotlight Card",
        href: "/docs/components/spotlightcard",
      },
      {
        title: "Seperator Pro",
        href: "/docs/components/seperatorpro",
      },
      {
        title: "Theme Switch",
        href: "/docs/components/theme-switch",
      },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Toast", href: "/docs/components/toast" },
    ],
  },
];

export default navigation;
