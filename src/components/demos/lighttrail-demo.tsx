"use client";

import { LightTrail } from "@/components/ui/light-trail";

export default function LighttrailDemo() {
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1561877202-53d0e24be55d?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3",
      alt: "Mountain forest with sunlight through trees",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1627894485200-b92fb4353967?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3",
      alt: "Snowy mountain peaks at night with starry sky",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1567601169793-64703dc5324a?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3",
      alt: "Dramatic mountain landscape with clouds",
    },
    // Add more images as needed
  ];

  return (
    <div className="w-full" style={{ height: "600px" }}>
      <LightTrail
        title="Mountains"
        description="Mountains are large natural elevations of the earth's surface that rise prominently above their surroundings."
        images={images}
        containerHeight="100%"
        scrollHeight="200vh"
      />
    </div>
  );
}
