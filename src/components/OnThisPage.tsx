"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
    const slugCountMap = new Map<string, number>();

    const elements = Array.from(
      document.querySelectorAll("h1, h2, h3, h4")
    ).map((element) => {
      const text = element.textContent || "";
      const slug = slugify(text);

      const count = slugCountMap.get(slug) || 0;
      slugCountMap.set(slug, count + 1);
      const id = count === 0 ? slug : `${slug}-${count}`;

      element.id = id;
      (element as HTMLElement).style.scrollMarginTop = "100px";

      return {
        id,
        text,
        level: parseInt(element.tagName.charAt(1)),
      };
    });

    setHeadings(elements);
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      history.pushState({}, "", `#${id}`);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="text-sm font-medium mb-4">On This Page</h4>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => handleClick(e, heading.id)}
            className={`block text-sm py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 
            ${
              heading.level === 2
                ? "font-medium"
                : "pl-4 text-gray-600 dark:text-gray-400"
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
