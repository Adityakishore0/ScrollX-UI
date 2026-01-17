"use client";

import React, { useState } from "react";
import { FlexNavbar } from "@/components/ui/flex-navbar";

export default function FlexNavbarDemo() {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <div className="relative not-prose w-full">
      {showNavbar && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <FlexNavbar
            brandName="ScrollX UI"
            tagline="Motion-first component library"
            launchText="Open-source"
            navLinks={[
              { label: "Components", href: "/docs/components" },
              { label: "Docs", href: "/docs" },
              {
                label: "GitHub",
                href: "https://github.com/Adityakishore0/ScrollX-UI",
              },
              { label: "Showcase", href: "/Showcase" },
            ]}
            media={{
              type: "video",
              src: "/assets/scrollxuilaunch.webm",
              autoplay: false,
            }}
            mediaButtonText="Watch intro"
          />
        </div>
      )}

      <div className="text-center">
        <p className="text-black dark:text-white text-sm">
          FlexNavbar will appear on top of the page
        </p>

        <button
          onClick={() => setShowNavbar((prev) => !prev)}
          className="mt-6 px-4 py-2 text-sm font-medium bg-black text-white dark:bg-white dark:text-black rounded-md shadow-md transition"
        >
          {showNavbar ? "Hide Navbar" : "Show Navbar"}
        </button>
      </div>
    </div>
  );
}
