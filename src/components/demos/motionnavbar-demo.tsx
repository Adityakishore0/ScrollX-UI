"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavDropdown,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/motion-navbar";
import { LayoutGrid, Sparkles, Layers, UserCircle } from "lucide-react";

export default function NavbarDemo() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Docs", href: "#" },
    { label: "Showcase", href: "#" },
  ];

  const dropdownItems = [
    { label: "Motion Navbar", href: "#", icon: LayoutGrid },
    { label: "Morphy Button", href: "#", icon: Sparkles },
    { label: "Vercel Card", href: "#", icon: Layers },
    { label: "Profilecard", href: "#", icon: UserCircle },
  ];

  return (
    <div className="relative not-prose w-full">
      {showNavbar && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar>
            <NavbarLogo className="bg-white text-black pr-1" />
            <NavBody>
              <NavDropdown label="Components" items={dropdownItems} />
              <NavItems items={navItems} />
              <NavbarButton href="https://github.com/Adityakishore0/ScrollX-UI">
                Star On Github
              </NavbarButton>
            </NavBody>

            <MobileNav>
              <MobileNavHeader>
                <MobileNavToggle
                  isOpen={isOpen}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </MobileNavHeader>

              <MobileNavMenu>
                <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
                  <p className="ml-1 text-sm font-semibold text-neutral-200 dark:text-neutral-800 tracking-wide mb-3">
                    Components
                  </p>
                  <div className="space-y-3 pl-2">
                    {dropdownItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between text-sm text-neutral-400 dark:text-neutral-600 hover:text-black dark:hover:text-white transition"
                        >
                          <span>{item.label}</span>
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="space-y-3 pl-1">
                    {navItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm font-semibold text-neutral-200 dark:text-neutral-800 hover:text-black dark:hover:text-white transition"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="w-full flex justify-center border-t border-neutral-200 dark:border-neutral-800 px-5 py-4">
                  <NavbarButton
                    href="https://github.com/Adityakishore0/ScrollX-UI"
                    className="w-full text-center justify-center"
                  >
                    Star On Github
                  </NavbarButton>
                </div>
              </MobileNavMenu>
            </MobileNav>
          </Navbar>
        </div>
      )}

      <div className="pt-32 text-center">
        <p className="text-black dark:text-white text-lg">
          Motion Navbar will show on top of the page
        </p>
        <button
          onClick={() => setShowNavbar(!showNavbar)}
          className="mt-6 px-4 py-2 text-sm font-medium bg-black text-white dark:bg-white dark:text-black rounded-md shadow-md transition"
        >
          {showNavbar ? "Hide Navbar" : "Show Navbar"}
        </button>
      </div>
    </div>
  );
}
