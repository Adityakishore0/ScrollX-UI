"use client";

import React from "react";
import {
  BorderGlide,
  BorderGlideCard,
  BorderGlideContent,
} from "@/components/ui/border-glide";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Isabelle Carlos",
    handle: "@isabellecarlos",
    text: "ScrollX UI has completely transformed how I build interfaces.",
    image:
      "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    name: "Lana Akash",
    handle: "@lanaakash",
    text: "ScrollX UI makes my projects look professional with minimal effort.",
    image:
      "https://plus.unsplash.com/premium_photo-1692340973636-6f2ff926af39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: 3,
    name: "Liam O’Connor",
    handle: "@liamoc",
    text: "ScrollX UI cool components save me hours of development",
    image:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

export default function BorderGlideDemo() {
  return (
    <BorderGlide
      className="max-w-lg mx-auto h-[300px] sm:h-[280px]"
      autoPlayInterval={6000}
      borderDuration={4000}
      borderColor="radial-gradient(ellipse, #3b82f6, transparent)"
      borderWidth="8rem"
    >
      {testimonials.map((testimonial) => (
        <BorderGlideCard
          key={testimonial.id}
          className="w-full h-full rounded-xl shadow-lg"
        >
          <BorderGlideContent className="flex flex-col h-full justify-between p-6 text-center space-y-4">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="w-20 h-20 border-2 border-blue-500">
                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="font-medium text-lg">{testimonial.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {testimonial.handle}
              </div>
              <p className="text-gray-800 dark:text-gray-200 italic">
                "{testimonial.text}"
              </p>
            </div>
          </BorderGlideContent>
        </BorderGlideCard>
      ))}
    </BorderGlide>
  );
}
