"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";

interface ParallaxCard {
  lightBg: string;
  darkBg: string;
  content: React.ReactNode;
}

interface ParallaxCardsProps {
  cards?: ParallaxCard[];
  height?: number | string;
}

export default function ParallaxCards({
  cards,
  height = "100vh",
}: ParallaxCardsProps) {
  const cardCount = cards?.length || 0;

  return (
    <section className="relative w-full" style={{ height }}>
      <div style={{ height: `${cardCount * 70}vh` }} className="relative">
        {cards?.map((card, index) => (
          <div key={index} className="sticky top-0 h-[70vh] z-[1]">
            <Card
              className={`w-full h-full flex items-center justify-center text-center p-8 rounded-none ${card.lightBg} ${card.darkBg}`}
            >
              {card.content}
            </Card>
          </div>
        ))}
      </div>
      <div className="h-screen bg-white dark:bg-black" />
    </section>
  );
}
