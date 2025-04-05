"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // ✅ Import Next.js hook

export default function OnThisPage() {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const pathname = usePathname(); // ✅ Get the current route

  useEffect(() => {
    const seen = new Set<string>();
    const elements = Array.from(document.querySelectorAll("h2, h3, h4")).map(
      (element, index) => {
        let id = element.id || `heading-${index}`;
        if (seen.has(id)) {
          id += `-${index}`;
        }
        seen.add(id);

        return {
          id,
          text: element.textContent || "",
          level: parseInt(element.tagName.charAt(1)),
        };
      }
    );

    setHeadings(elements);
  }, [pathname]); // ✅ Rerun effect when pathname changes

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
