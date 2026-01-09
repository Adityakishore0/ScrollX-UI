export interface NavItem {
  title: string;
  href: string;
  category?: string;
  color?: string;
  categoryClassName?: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    title: "Sections",
    href: "",
    children: [
      { title: "Get Started", href: "/docs" },
      { title: "Components", href: "/docs/components" },
      { title: "Changelog", href: "/docs/changelog" },
    ],
  },

  {
    title: "Getting Started",
    href: "",
    children: [
      { title: "Installation", href: "/docs/installation" },
      { title: "llms.txt", href: "/llms.txt" },
    ],
  },
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
      { title: "Animated Button", href: "/docs/components/animated-button" },
      { title: "Animated Tabs", href: "/docs/components/animated-tabs" },
      {
        title: "Animated Testimonials",
        href: "/docs/components/animated-testimonials",
      },
      {
        title: "Animated TextGenerate",
        href: "/docs/components/animated-textgenerate",
      },
      { title: "Announcement", href: "/docs/components/announcement" },
      { title: "Aspect Ratio", href: "/docs/components/aspect-ratio" },
      { title: "Avatar", href: "/docs/components/avatar" },
      {
        title: "Avatar Group",
        href: "/docs/components/avatar-group",
        category: "new",
      },
      {
        title: "Aurora Dots",
        href: "/docs/components/aurora-dots",
        category: "new",
      },
      {
        title: "Background Meteors",
        href: "/docs/components/backgroundmeteors",
      },
      { title: "Background Paths", href: "/docs/components/background-paths" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "BarsWave", href: "/docs/components/barswave", category: "new" },
      { title: "Beams Upstream", href: "/docs/components/beams-upstream" },
      {
        title: "Bolt Strike",
        href: "/docs/components/bolt-strike",
        category: "new",
      },
      { title: "Border Glide", href: "/docs/components/border-glide" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Calendar", href: "/docs/components/calendar" },
      { title: "Card", href: "/docs/components/card" },
      {
        title: "Card Flip",
        href: "/docs/components/card-flip",
      },
      {
        title: "Card Tilt",
        href: "/docs/components/card-tilt",
      },
      { title: "Carousel", href: "/docs/components/carousel" },
      { title: "Checkbox Pro", href: "/docs/components/checkbox-pro" },
      { title: "Clock", href: "/docs/components/clock" },
      { title: "CodeBlock", href: "/docs/components/codeblock" },
      { title: "Collapsible", href: "/docs/components/collapsible" },
      { title: "Cursor Highlight", href: "/docs/components/cursor-highlight" },
      { title: "Cursor ImageTrail", href: "/docs/components/cursorimagetrail" },
      {
        title: "Decorated Text",
        href: "/docs/components/decorated-text",
      },
      {
        title: "Dot Wave",
        href: "/docs/components/dot-wave",
        category: "new",
      },
      {
        title: "Draggable Avatar",
        href: "/docs/components/draggable-avatar",
      },
      {
        title: "Drift Card",
        href: "/docs/components/drift-card",
      },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      {
        title: "DualSparks",
        href: "/docs/components/dualsparks",
        category: "new",
      },
      {
        title: "Electric Text",
        href: "/docs/components/electric-text",
      },
      {
        title: "Expandable Cards",
        href: "/docs/components/expandable-cards",
      },
      { title: "Expandable Dock", href: "/docs/components/expandable-dock" },
      { title: "Facescape", href: "/docs/components/facescape" },
      {
        title: "Fancy Text",
        href: "/docs/components/fancy-text",
        category: "new",
      },
      {
        title: "Flashy Card",
        href: "/docs/components/flashy-card",
        category: "new",
      },
      {
        title: "FlipFlow",
        href: "/docs/components/flipflow",
        category: "new",
      },
      {
        title: "FlipStack",
        href: "/docs/components/flipstack",
      },
      { title: "Flowing Logos", href: "/docs/components/flowing-logos" },
      { title: "Folder", href: "/docs/components/folder" },
      { title: "Folder Tree", href: "/docs/components/folder-tree" },
      { title: "Follow Cursor", href: "/docs/components/followcursor" },
      { title: "Glass", href: "/docs/components/glass" },
      { title: "Globe", href: "/docs/components/globe" },
      {
        title: "GlowingBorderCard",
        href: "/docs/components/glowingbordercard",
      },
      { title: "Gravity", href: "/docs/components/gravity" },
      { title: "Hero Sections", href: "/docs/components/hero-sections" },
      { title: "Hold ToConfirm", href: "/docs/components/hold-toconfirm" },
      { title: "Hyperlink", href: "/docs/components/hyperlink" },
      { title: "Input OTP", href: "/docs/components/input-otp" },
      {
        title: "Interactive Input",
        href: "/docs/components/interactive-input",
      },
      { title: "Iphone", href: "/docs/components/iphone" },
      { title: "Kbd", href: "/docs/components/kbd" },
      {
        title: "Kinetic Testimonials",
        href: "/docs/components/kinetic-testimonials",
      },
      { title: "Label", href: "/docs/components/label" },
      { title: "Lamphome", href: "/docs/components/lamphome" },
      {
        title: "Layered Button",
        href: "/docs/components/layered-button",
        category: "new",
      },
      {
        title: "Layered Text",
        href: "/docs/components/layered-text",
      },
      { title: "Loader", href: "/docs/components/loader" },
      { title: "Login Form", href: "/docs/components/loginform" },
      { title: "Logo Stepper", href: "/docs/components/logo-stepper" },
      { title: "lustre Text", href: "/docs/components/lustretext" },
      { title: "Magic Dock", href: "/docs/components/magicdock" },
      {
        title: "Media Card",
        href: "/docs/components/media-card",
        category: "new",
      },
      {
        title: "Meteor Orbit",
        href: "/docs/components/meteor-orbit",
      },
      { title: "Modern Loader", href: "/docs/components/modern-loader" },
      {
        title: "MorphoText Flip",
        href: "/docs/components/morphotextflip",
      },
      {
        title: "Morphy Button",
        href: "/docs/components/morphy-button",
      },
      {
        title: "Motion Grid",
        href: "/docs/components/motion-grid",
      },
      { title: "MotionCards", href: "/docs/components/motioncards" },
      {
        title: "Motion Navbar",
        href: "/docs/components/motion-navbar",
      },
      {
        title: "MovingLines Background",
        href: "/docs/components/movinglines-background",
      },
      { title: "Navbar Flow", href: "/docs/components/navbar-flow" },
      { title: "Not Found", href: "/docs/components/not-found" },
      { title: "Pagination", href: "/docs/components/pagination" },
      { title: "Parallax Cards", href: "/docs/components/parallaxcards" },
      { title: "Particles", href: "/docs/components/particles" },
      {
        title: "Pixel Background",
        href: "/docs/components/pixel-background",
      },
      {
        title: "Pixel Highlight",
        href: "/docs/components/pixel-highlight",
        category: "new",
      },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Profile Card", href: "/docs/components/profilecard" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Radial Flow", href: "/docs/components/radialflow" },
      {
        title: "Radio Group",
        href: "/docs/components/radio-group",
      },
      { title: "Radial Socials", href: "/docs/components/radial-socials" },
      {
        title: "Reveal Text",
        href: "/docs/components/reveal-text",
      },
      { title: "ScrollArea Pro", href: "/docs/components/scroll-areapro" },
      {
        title: "Sensitive Text",
        href: "/docs/components/sensitive-text",
        category: "new",
      },
      { title: "Seperator Pro", href: "/docs/components/seperatorpro" },
      {
        title: "Shiny Button",
        href: "/docs/components/shiny-button",
      },
      { title: "Side Sheet", href: "/docs/components/side-sheet" },
      { title: "Signup Form", href: "/docs/components/signupform" },
      { title: "Slider", href: "/docs/components/slider" },
      { title: "Social Orbit", href: "/docs/components/social-orbit" },
      { title: "Spotlight Card", href: "/docs/components/spotlightcard" },
      { title: "Splitter", href: "/docs/components/splitter" },
      {
        title: "Spark Waves",
        href: "/docs/components/spark-waves",
        category: "new",
      },
      {
        title: "Stagger Button",
        href: "/docs/components/stagger-button",
      },
      { title: "Stagger Chars", href: "/docs/components/stagger-chars" },
      { title: "Stats Carousel", href: "/docs/components/statscarousel" },
      { title: "Stats Count", href: "/docs/components/statscount" },
      { title: "Status", href: "/docs/components/status" },
      {
        title: "Striped Grid",
        href: "/docs/components/striped-grid",
      },
      { title: "Table", href: "/docs/components/table" },
      {
        title: "Testimonial Carousel",
        href: "/docs/components/testimonial-carousel",
      },
      { title: "Text Highlighter", href: "/docs/components/text-highlighter" },
      {
        title: "Text Modifier",
        href: "/docs/components/text-modifier",
      },
      {
        title: "Text Spotlight",
        href: "/docs/components/text-spotlight",
      },
      { title: "Theme Switch", href: "/docs/components/theme-switch" },
      { title: "Thunder Loader", href: "/docs/components/thunder-loader" },
      { title: "Timeline", href: "/docs/components/timeline" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Toggle Vault", href: "/docs/components/toggle-vault" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Top Sheet", href: "/docs/components/top-sheet" },
      { title: "Transition", href: "/docs/components/transition" },
      { title: "Type Animation", href: "/docs/components/typeanimation" },
      { title: "Venom Beam", href: "/docs/components/venom-beam" },
      { title: "Vercel Card", href: "/docs/components/vercel-card" },
      { title: "Wavy Button", href: "/docs/components/wavy-button" },
      { title: "Whitestripes", href: "/docs/components/whitestripes" },
    ],
  },
];

export default navigation;
