"use client";
import ThemeSwitchIcon from "@/components/demos/themeswitchicon";
import ScrollXHeading from "@/components/heading";
import NavbarFlow, {
  FeatureItem,
  HoverLink,
} from "@/components/ui/navbar-flow";
import React, { useState } from "react";

export default function NavbarFlowDemo() {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <div className="relative not-prose w-full ">
      {showNavbar && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <NavbarFlow
            emblem={
              <ScrollXHeading className="w-auto h-4 sm:h-5 whitespace-nowrap" />
            }
            links={[
              {
                text: "Components",
                submenu: (
                  <div className="flex flex-col space-y-2">
                    <HoverLink url="/components/button">Button</HoverLink>
                    <HoverLink url="/components/hero">Hero Section</HoverLink>
                    <HoverLink url="/components/navbar">Navbar</HoverLink>
                    <HoverLink url="/components/footer">Footer</HoverLink>
                    <HoverLink url="/components/cards">Cards</HoverLink>
                    <HoverLink url="/components/forms">Forms</HoverLink>
                  </div>
                ),
              },
              {
                text: "Templates",
                submenu: (
                  <div className="grid grid-cols-1 gap-2 w-48">
                    <FeatureItem
                      heading="Portfolio Template"
                      url="/templates/portfolio"
                      info="Clean, personal showcase for designers & developers."
                    />
                    <FeatureItem
                      heading="Business Template"
                      url="/templates/business"
                      info="Professional website layout for startups & businesses."
                    />
                    <FeatureItem
                      heading="Blog Template"
                      url="/templates/blog"
                      info="Minimal blog with modern reading experience."
                    />
                    <FeatureItem
                      heading="Landing Page"
                      url="/templates/landing"
                      info="High-converting landing page for product launches."
                    />
                  </div>
                ),
              },
              {
                text: "Showcase",
                submenu: (
                  <div className="flex flex-col space-y-2">
                    <HoverLink url="/showcase/astroship">Astroship</HoverLink>
                    <HoverLink url="/showcase/papermod">PaperMod</HoverLink>
                    <HoverLink url="/showcase/satori">Satori</HoverLink>
                    <HoverLink url="/showcase/scrollx">ScrollX UI</HoverLink>
                    <HoverLink url="/showcase/speedyfolio">
                      Speedyfolio
                    </HoverLink>
                  </div>
                ),
              },
              { text: "About", url: "/about" },
            ]}
            rightComponent={<ThemeSwitchIcon />}
          />
        </div>
      )}
      <div className="pt-32 text-center">
        <p className="text-black dark:text-white text-lg">
          The NavbarFlow will show on top of the page
        </p>

        <button
          onClick={() => setShowNavbar(!showNavbar)}
          className="mt-6 px-4 py-2 text-sm font-medium bg-black text-white dark:bg-white dark:text-black rounded-md shadow-md"
        >
          {showNavbar ? "Hide Navbar" : "Show Navbar"}
        </button>
      </div>
    </div>
  );
}
