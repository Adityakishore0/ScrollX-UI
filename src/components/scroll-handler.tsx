"use client";

import { useEffect, useRef } from "react";
import navigation from "@/constants/navItems";

export default function ScrollHandler() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTokenRef = useRef(0);

  useEffect(() => {
    const componentsSection = navigation.find(
      (item) => item.title === "Components"
    );
    const components = componentsSection?.children || [];

    const handleFilterByLetter = (event: CustomEvent<{ letter: string }>) => {
      const { letter } = event.detail;

      scrollTokenRef.current += 1;
      const currentToken = scrollTokenRef.current;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 🔴 HARD STOP any ongoing smooth scroll
      window.scrollTo({ top: window.scrollY, behavior: "auto" });

      if (letter === "ALL") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const targetComponent = components.find(
        (comp) => comp.title.charAt(0).toUpperCase() === letter
      );

      if (!targetComponent) return;

      timeoutRef.current = setTimeout(() => {
        // ❌ Ignore outdated scroll attempts
        if (scrollTokenRef.current !== currentToken) return;

        const componentCards = document.querySelectorAll<HTMLAnchorElement>(
          'a[data-component-card="true"]'
        );

        const targetElement = Array.from(componentCards).find(
          (card) => card.getAttribute("href") === targetComponent.href
        );

        if (!targetElement) return;

        const offset = 120;
        const absoluteTop =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          offset;

        window.scrollTo({
          top: absoluteTop,
          behavior: "smooth",
        });
      }, 150);
    };

    window.addEventListener(
      "filterByLetter",
      handleFilterByLetter as EventListener
    );

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener(
        "filterByLetter",
        handleFilterByLetter as EventListener
      );
    };
  }, []);

  return null;
}
