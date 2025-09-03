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
      { title: "Dark Mode", href: "/docs/installation/dark-mode" },
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
        title: "Animated Tabs",
        href: "/docs/components/animated-tabs",
      },
      {
        title: "Animated Testimonials",
        href: "/docs/components/animated-testimonials",
      },
      {
        title: "Animated TextGenerate",
        href: "/docs/components/animated-textgenerate",
      },
      { title: "Aspect Ratio", href: "/docs/components/aspect-ratio" },
      { title: "Avatar", href: "/docs/components/avatar" },
      {
        title: "Background Meteors",
        href: "/docs/components/backgroundmeteors",
      },
      {
        title: "Background Paths",
        href: "/docs/components/background-paths",
      },
      { title: "Badge", href: "/docs/components/badge" },
      {
        title: "Beams Upstream",
        href: "/docs/components/beams-upstream",
      },
      {
        title: "Border Glide",
        href: "/docs/components/border-glide",
        category: "new",
      },
      { title: "Button", href: "/docs/components/button" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Carousel", href: "/docs/components/carousel" },
      { title: "CodeBlock", href: "/docs/components/codeblock" },
      { title: "Cursor ImageTrail", href: "/docs/components/cursorimagetrail" },
      {
        title: "Dropdown Menu",
        href: "/docs/components/dropdown-menu",
        category: "new",
      },
      {
        title: "Expandable Dock",
        href: "/docs/components/expandable-dock",
      },
      {
        title: "FlipStack",
        href: "/docs/components/flipstack",
        category: "new",
      },
      {
        title: "Follow Cursor",
        href: "/docs/components/followcursor",
      },
      {
        title: "Flowing Logos",
        href: "/docs/components/flowing-logos",
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
        title: "Gravity",
        href: "/docs/components/gravity",
        category: "new",
      },
      {
        title: "Hero Sections",
        href: "/docs/components/hero-sections",
      },
      {
        title: "Hold ToConfirm",
        href: "/docs/components/hold-toconfirm",
        category: "new",
      },
      { title: "Input OTP", href: "/docs/components/input-otp" },
      {
        title: "Interactive Input",
        href: "/docs/components/interactive-input",
      },
      {
        title: "Kinetic Testimonials",
        href: "/docs/components/kinetic-testimonials",
        category: "new",
      },
      { title: "Lamphome", href: "/docs/components/lamphome" },
      { title: "Loader", href: "/docs/components/loader", category: "new" },
      {
        title: "lustre Text",
        href: "/docs/components/lustretext",
      },
      {
        title: "Magic Dock",
        href: "/docs/components/magicdock",
      },
      {
        title: "MotionCards",
        href: "/docs/components/motioncards",
        category: "new",
      },
      { title: "MorphoText Flip", href: "/docs/components/morphotextflip" },
      {
        title: "Navbar Flow",
        href: "/docs/components/navbar-flow",
        category: "new",
      },
      { title: "Not Found", href: "/docs/components/not-found" },
      {
        title: "Pagination",
        href: "/docs/components/pagination",
      },
      {
        title: "Particles",
        href: "/docs/components/particles",
        category: "new",
      },
      {
        title: "Parallax Cards",
        href: "/docs/components/parallaxcards",
      },
      {
        title: "Profile Card",
        href: "/docs/components/profilecard",
      },
      {
        title: "Radial Flow",
        href: "/docs/components/radialflow",
      },
      {
        title: "Radial Socials",
        href: "/docs/components/radial-socials",
        category: "new",
      },
      {
        title: "Side Sheet",
        href: "/docs/components/side-sheet",
        category: "new",
      },
      {
        title: "Stats Count",
        href: "/docs/components/statscount",
      },
      {
        title: "Stagger Chars",
        href: "/docs/components/stagger-chars",
        category: "new",
      },
      {
        title: "Stats Carousel",
        href: "/docs/components/statscarousel",
        category: "new",
      },
      {
        title: "Splitter",
        href: "/docs/components/splitter",
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
        title: "ScrollArea Pro",
        href: "/docs/components/scroll-areapro",
        category: "new",
      },
      {
        title: "Text Highlighter",
        href: "/docs/components/text-highlighter",
        category: "new",
      },
      {
        title: "Theme Switch",
        href: "/docs/components/theme-switch",
      },
      {
        title: "Top Sheet",
        href: "/docs/components/top-sheet",
        category: "new",
      },
      { title: "Toast", href: "/docs/components/toast" },
      {
        title: "Toggle Vault",
        href: "/docs/components/toggle-vault",
        category: "new",
      },
      { title: "Type Animation", href: "/docs/components/typeanimation" },
      { title: "Venom Beam", href: "/docs/components/venom-beam" },
      { title: "Whitestripes", href: "/docs/components/whitestripes" },
    ],
  },
];

export default navigation;
