import React from "react";
import KineticTestimonial from "@/components/ui/kinetic-testimonials";

const testimonials = [
  {
    name: "Ava Thompson",
    handle: "@ava_thompson",
    review:
      "ScrollX UI is a game-changer! The animations are smooth, and the UI is beyond stunning.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Elijah Carter",
    handle: "@elijah_ui",
    review:
      "Absolutely mesmerizing! The attention to detail in ScrollX UI is incredible.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Sophia Martinez",
    handle: "@sophia_codes",
    review:
      "As a front-end developer, I love how intuitive and powerful ScrollX UI is. It's a must-have tool!",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Michael Brown",
    handle: "@michaelb_dev",
    review:
      "This changed the way I build interfaces. The animations are top-notch!",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Liam Anderson",
    handle: "@liamdesigns",
    review:
      "The best UI toolkit I've ever used! Smooth animations and top-notch performance.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Olivia Hayes",
    handle: "@olivia_h",
    review:
      "This is absolutely mind-blowing. AI-powered UI is the future, and ScrollX UI is leading the way!",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Daniel Lee",
    handle: "@daniel_dev",
    review:
      "Brilliant execution! The user experience feels effortless and elegant.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Sarah Green",
    handle: "@sarahgreen",
    review:
      "I can't stop recommending this. It makes everything feel premium and polished!",
    avatar:
      "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Mia Patel",
    handle: "@miapatel",
    review: "ScrollX UI took my web app to the next level. Highly recommend!",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "James Walker",
    handle: "@jameswalker",
    review:
      "This is the future of web design! Can't believe something this good is available for free.",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Emma Johnson",
    handle: "@emma_uiux",
    review:
      "Phenomenal work! Every detail is thoughtfully crafted for an amazing experience.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Ethan Roberts",
    handle: "@ethan_rob",
    review: "This toolkit has completely changed my workflow. Incredible work!",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Isabella Davis",
    handle: "@bella_designs",
    review:
      "The seamless integration and intuitive interface make this tool indispensable for modern web development.",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Noah Wilson",
    handle: "@noah_dev",
    review:
      "Performance is outstanding! My sites load faster and look more professional than ever.",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Charlotte Moore",
    handle: "@charlotte_ui",
    review:
      "The learning curve is minimal, but the impact is massive. This is what modern development tools should be.",
    avatar:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Lucas Taylor",
    handle: "@lucas_codes",
    review:
      "Revolutionary approach to UI development. The AI suggestions are spot-on every time.",
    avatar:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Amelia Clark",
    handle: "@amelia_design",
    review:
      "Client satisfaction has gone through the roof since I started using ScrollX UI.",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    name: "Benjamin Lewis",
    handle: "@ben_frontend",
    review:
      "The animation library is extensive and the performance optimizations are incredible.",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

export default function KineticTestimonialDemo() {
  return (
    <KineticTestimonial
      testimonials={testimonials}
      className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-black dark:to-black md:py-0 py-0 not-prose"
      cardClassName="hover:scale-105 shadow-lg"
      avatarClassName="ring-2 ring-purple-500"
      desktopColumns={3}
      tabletColumns={3}
      mobileColumns={2}
      speed={1.5}
      title="Customer Reviews"
      subtitle="What our users think about our product"
    />
  );
}
