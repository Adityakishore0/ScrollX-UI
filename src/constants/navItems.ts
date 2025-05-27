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
        title: "Animated Testimonials",
        href: "/docs/components/animated-testimonials",
        category: "new",
      },
      { title: "Aspect Ratio", href: "/docs/components/aspect-ratio" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Carousel", href: "/docs/components/carousel" },
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
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Toast", href: "/docs/components/toast" },
    ],
  },

  {
    title: "Forms",
    href: "",
    children: [
      { title: "Checkbox", href: "/docs/forms/checkbox" },
      { title: "Input", href: "/docs/forms/input" },
      { title: "Radio", href: "/docs/forms/radio" },
      { title: "Select", href: "/docs/forms/select" },
      { title: "Slider", href: "/docs/forms/slider" },
      { title: "Switch", href: "/docs/forms/switch" },
      { title: "Textarea", href: "/docs/forms/textarea" },
    ],
  },

  {
    title: "Utilities",
    href: "",
    children: [
      { title: "Typography", href: "/docs/utilities/typography" },
      { title: "Grid", href: "/docs/utilities/grid" },
      { title: "Flexbox", href: "/docs/utilities/flexbox" },
      { title: "Spacing", href: "/docs/utilities/spacing" },
      { title: "Colors", href: "/docs/utilities/colors" },
      { title: "Shadows", href: "/docs/utilities/shadows" },
    ],
  },

  {
    title: "Theming",
    href: "",
    children: [
      { title: "Dark Mode", href: "/docs/theming/dark-mode" },
      { title: "Custom Themes", href: "/docs/theming/custom-themes" },
    ],
  },

  { title: "CLI", href: "/docs/cli" },
  { title: "Changelog", href: "/docs/changelog" },
];

export default navigation;
