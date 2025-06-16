"use client";

import {
  CalendarIcon,
  ShieldCheckIcon,
  BrainIcon,
  CloudIcon,
  PlugIcon,
  UsersIcon,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { CardContent } from "@/components/ui/card";
import ParallaxCards from "@/components/ui/parallaxcards";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

const cardData: {
  title: string;
  description: string;
  icon: React.ReactNode;
  lightBg: string;
  darkBg: string;
  variant: ButtonVariant;
}[] = [
  {
    title: "Smart Scheduling",
    description:
      "Automatically book meetings at the best times — no more back-and-forth emails.",
    icon: <CalendarIcon className="w-8 h-8" />,
    lightBg: "bg-black text-white",
    darkBg: "dark:bg-white dark:text-black",
    variant: "success",
  },
  {
    title: "Privacy First",
    description:
      "Your data stays yours — always encrypted, never sold or shared.",
    icon: <ShieldCheckIcon className="w-8 h-8" />,
    lightBg: "bg-white text-black",
    darkBg: "dark:bg-black dark:text-white",
    variant: "gradient",
  },
  {
    title: "AI Suggestions",
    description:
      "Let AI recommend the best time slots, tasks, and workflows automatically.",
    icon: <BrainIcon className="w-8 h-8" />,
    lightBg: "bg-black text-white",
    darkBg: "dark:bg-white dark:text-black",
    variant: "light",
  },
  {
    title: "Cloud Sync",
    description:
      "Keep everything up-to-date across your devices with instant cloud sync.",
    icon: <CloudIcon className="w-8 h-8" />,
    lightBg: "bg-white text-black",
    darkBg: "dark:bg-black dark:text-white",
    variant: "dark",
  },
  {
    title: "Integrates Easily",
    description:
      "Works with tools you already love: Google, Notion, Slack, and more.",
    icon: <PlugIcon className="w-8 h-8" />,
    lightBg: "bg-black text-white",
    darkBg: "dark:bg-white dark:text-black",
    variant: "warning",
  },
  {
    title: "Team Ready",
    description:
      "Designed for teams — with roles, collaboration, and shared calendars.",
    icon: <UsersIcon className="w-8 h-8" />,
    lightBg: "bg-white text-black",
    darkBg: "dark:bg-black dark:text-white",
    variant: "success",
  },
];

export default function ParallaxCardsDemo() {
  const cards = cardData.map((card) => ({
    lightBg: card.lightBg,
    darkBg: card.darkBg,
    content: (
      <CardContent className="flex flex-col items-center justify-center h-full not-prose text-inherit">
        <div className="mb-4">{card.icon}</div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{card.title}</h2>
        <p className="text-lg max-w-2xl mb-6">{card.description}</p>
        <Button variant={card.variant}>Learn More →</Button>
      </CardContent>
    ),
  }));

  return <ParallaxCards cards={cards} />;
}
