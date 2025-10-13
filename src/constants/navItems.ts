export interface NavItem {
  title: string;
  href: string;
  category?: string;
  color?: string;
  categoryClassName?: string;
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
      {
        title: "CLI",
        href: "/docs/installation/cli",
        category: "3.0",
        categoryClassName:
          "ml-2 rounded-md border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-xs leading-none text-neutral-700 no-underline group-hover:no-underline dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400",
      },
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
      {
        title: "Announcement",
        href: "/docs/components/announcement",
        category: "new",
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
      },
      { title: "Button", href: "/docs/components/button" },
      { title: "Card", href: "/docs/components/card" },
      {
        title: "Card Flip",
        href: "/docs/components/card-flip",
        category: "new",
      },
      { title: "Carousel", href: "/docs/components/carousel" },
      {
        title: "Calendar",
        href: "/docs/components/calendar",
        category: "new",
      },
      {
        title: "Checkbox Pro",
        href: "/docs/components/checkbox-pro",
      },
      { title: "CodeBlock", href: "/docs/components/codeblock" },
      {
        title: "Collapsible",
        href: "/docs/components/collapsible",
        category: "new",
      },
      {
        title: "Cursor Highlight",
        href: "/docs/components/cursor-highlight",
      },
      { title: "Cursor ImageTrail", href: "/docs/components/cursorimagetrail" },
      {
        title: "Dropdown Menu",
        href: "/docs/components/dropdown-menu",
      },
      {
        title: "Expandable Dock",
        href: "/docs/components/expandable-dock",
      },
      {
        title: "Facescape",
        href: "/docs/components/facescape",
        category: "new",
      },
      {
        title: "FlipStack",
        href: "/docs/components/flipstack",
      },
      {
        title: "Follow Cursor",
        href: "/docs/components/followcursor",
      },
      {
        title: "Flowing Logos",
        href: "/docs/components/flowing-logos",
      },
      {
        title: "Folder Tree",
        href: "/docs/components/folder-tree",
      },
      { title: "Glass", href: "/docs/components/glass", category: "new" },
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
      },
      {
        title: "Hero Sections",
        href: "/docs/components/hero-sections",
      },
      {
        title: "Hold ToConfirm",
        href: "/docs/components/hold-toconfirm",
      },
      {
        title: "Hyperlink",
        href: "/docs/components/hyperlink",
        category: "new",
      },
      {
        title: "Iphone",
        href: "/docs/components/iphone",
      },
      { title: "Input OTP", href: "/docs/components/input-otp" },
      {
        title: "Interactive Input",
        href: "/docs/components/interactive-input",
      },
      {
        title: "Kbd",
        href: "/docs/components/kbd",
        category: "new",
      },
      {
        title: "Kinetic Testimonials",
        href: "/docs/components/kinetic-testimonials",
      },
      { title: "Label", href: "/docs/components/label" },
      { title: "Lamphome", href: "/docs/components/lamphome" },
      { title: "Loader", href: "/docs/components/loader" },
      {
        title: "Login Form",
        href: "/docs/components/loginform",
      },
      {
        title: "lustre Text",
        href: "/docs/components/lustretext",
      },
      {
        title: "Magic Dock",
        href: "/docs/components/magicdock",
      },
      {
        title: "Modern Loader",
        href: "/docs/components/modern-loader",
        category: "new",
      },
      {
        title: "MotionCards",
        href: "/docs/components/motioncards",
      },
      { title: "MorphoText Flip", href: "/docs/components/morphotextflip" },
      {
        title: "Navbar Flow",
        href: "/docs/components/navbar-flow",
      },
      { title: "Not Found", href: "/docs/components/not-found" },
      {
        title: "Pagination",
        href: "/docs/components/pagination",
      },
      {
        title: "Particles",
        href: "/docs/components/particles",
      },
      {
        title: "Parallax Cards",
        href: "/docs/components/parallaxcards",
      },
      {
        title: "Popover",
        href: "/docs/components/popover",
        category: "new",
      },
      {
        title: "Profile Card",
        href: "/docs/components/profilecard",
      },
      {
        title: "Progress",
        href: "/docs/components/progress",
        category: "new",
      },
      {
        title: "Radial Flow",
        href: "/docs/components/radialflow",
      },
      {
        title: "Radial Socials",
        href: "/docs/components/radial-socials",
      },
      {
        title: "Side Sheet",
        href: "/docs/components/side-sheet",
      },
      {
        title: "Slider",
        href: "/docs/components/slider",
        category: "new",
      },
      { title: "Status", href: "/docs/components/status" },
      {
        title: "Stats Count",
        href: "/docs/components/statscount",
      },
      {
        title: "Stagger Chars",
        href: "/docs/components/stagger-chars",
      },
      {
        title: "Stats Carousel",
        href: "/docs/components/statscarousel",
      },
      {
        title: "Splitter",
        href: "/docs/components/splitter",
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
      },
      {
        title: "Signup Form",
        href: "/docs/components/signupform",
        category: "new",
      },
      {
        title: "Table",
        href: "/docs/components/table",
      },
      {
        title: "Text Highlighter",
        href: "/docs/components/text-highlighter",
      },
      {
        title: "Testimonial Carousel",
        href: "/docs/components/testimonial-carousel",
        category: "new",
      },
      {
        title: "Theme Switch",
        href: "/docs/components/theme-switch",
      },
      {
        title: "Thunder Loader",
        href: "/docs/components/thunder-loader",
      },
      {
        title: "Timeline",
        href: "/docs/components/timeline",
        category: "new",
      },
      {
        title: "Top Sheet",
        href: "/docs/components/top-sheet",
      },
      { title: "Toast", href: "/docs/components/toast" },
      {
        title: "Toggle Vault",
        href: "/docs/components/toggle-vault",
      },
      {
        title: "Tooltip",
        href: "/docs/components/tooltip",
      },
      {
        title: "Transition",
        href: "/docs/components/transition",
      },
      { title: "Type Animation", href: "/docs/components/typeanimation" },
      { title: "Venom Beam", href: "/docs/components/venom-beam" },
      {
        title: "Vercel Card",
        href: "/docs/components/vercel-card",
        category: "new",
      },
      { title: "Whitestripes", href: "/docs/components/whitestripes" },
    ],
  },
];

export default navigation;
