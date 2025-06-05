import React from "react";

import { MousePointer } from "lucide-react";
import CursorImageTrail from "@/components/ui/cursorimagetrail";

export default function CursorImageTrailDynamic() {
  return (
    <CursorImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      animationStyle="dynamic"
      images={Array.from(
        { length: 16 },
        (_, i) => `/images/active/${i + 1}.jpg`
      )}
    >
      <section className="grid h-screen w-full place-content-center bg-white text-black dark:bg-black dark:text-neutral-200 antialiased">
        <p className="flex items-center gap-2 text-5xl font-extrabold uppercase tracking-wide transition-colors duration-500">
          <MousePointer className="w-10 h-10" />
          <span>Hover me</span>
        </p>
      </section>
    </CursorImageTrail>
  );
}
