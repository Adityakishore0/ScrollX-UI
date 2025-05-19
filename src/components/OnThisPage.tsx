"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function OnThisPage() {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const pathname = usePathname();

  useEffect(() => {
    const contentRoot = document.querySelector<HTMLDivElement>(".prose");
    if (!contentRoot) {
      setHeadings([]);
      return;
    }

    const excludedClasses = [
      "my-6",
      "overflow-hidden",
      "rounded-lg",
      "border",
      "border-gray-200",
      "dark:border-gray-800",
    ];
    const previewWrappers = Array.from(
      contentRoot.querySelectorAll<HTMLDivElement>("div.my-6")
    ).filter((div) => excludedClasses.every((c) => div.classList.contains(c)));

    const rawHeadings = Array.from(
      contentRoot.querySelectorAll<HTMLHeadingElement>("h1, h2, h3, h4")
    );

    const filtered = rawHeadings.filter(
      (h) => !previewWrappers.some((wrapper) => wrapper.contains(h))
    );

    const slugCount = new Map<string, number>();
    const toc = filtered.map((el) => {
      const text = el.textContent?.trim() ?? "";
      const base = slugify(text);
      const count = slugCount.get(base) ?? 0;
      slugCount.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count}`;

      el.id = id;
      el.style.scrollMarginTop = "100px";

      return {
        id,
        text,
        level: +el.tagName[1],
      };
    });

    const stopIndex = toc.findIndex(
      (h) => h.text.toLowerCase() === "api reference"
    );
    const truncatedToc = stopIndex === -1 ? toc : toc.slice(0, stopIndex + 1);

    setHeadings(truncatedToc);
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 100;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.history.pushState(null, "", `#${id}`);
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!headings.length) return null;

  return (
    <div className="relative">
      <h4 className="text-sm font-medium mb-4">On This Page</h4>

      <div className="group">
        <ScrollArea
          className="h-[50vh] pr-3
          [&>[data-radix-scroll-area-viewport]]:overflow-y-auto
          [&_[data-radix-scroll-area-scrollbar]]:opacity-0
          [&_[data-radix-scroll-area-scrollbar]]:transition-opacity
          [&_[data-radix-scroll-area-scrollbar]]:duration-300
          group-hover:[&_[data-radix-scroll-area-scrollbar]]:opacity-100
          [&_[data-radix-scroll-area-scrollbar]]:hover:bg-transparent
          dark:[&_[data-radix-scroll-area-scrollbar]]:hover:bg-transparent"
        >
          <nav className="space-y-1">
            {headings.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={(e) => handleClick(e, h.id)}
                className={`block text-sm py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  h.level === 2
                    ? "font-medium"
                    : "pl-4 text-gray-600 dark:text-gray-400"
                }`}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
}
