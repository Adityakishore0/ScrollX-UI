"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import navigation from "@/constants/navItems";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen w-64 p-6 transition-all duration-300",
        "bg-white dark:bg-[#09090b] backdrop-blur-xl border-r border-gray-200 dark:border-gray-800",
        "overflow-y-auto"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        scrollbarWidth: isHovered ? "thin" : "none",
        overflowY: "auto",
      }}
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        📖 Docs
      </h2>

      <nav className="space-y-3">
        {navigation.map((item) => (
          <div key={item.title}>
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "block px-3 py-2 font-semibold rounded-md transition-all relative",
                  "hover:bg-gray-100 dark:hover:bg-gray-800 hover:underline hover:decoration-2 hover:underline-offset-4",
                  pathname === item.href
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 translate-x-1 shadow-inner pl-4"
                    : "text-gray-700 dark:text-gray-400"
                )}
              >
                {item.title}
              </Link>
            ) : (
              <span className="block px-3 py-2 font-semibold text-gray-900 dark:text-gray-100">
                {item.title}
              </span>
            )}

            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "block px-6 py-2 text-sm rounded-md transition-all relative",
                  "hover:bg-gray-100 dark:hover:bg-gray-800 hover:underline hover:decoration-2 hover:underline-offset-4",
                  pathname === child.href
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 translate-x-1 shadow-inner pl-7"
                    : "text-gray-700 dark:text-gray-400"
                )}
              >
                <div className="flex items-center gap-2">
                  {child.title}
                  {child.category === "new" && (
                    <span className="bg-green-900 text-green-400 text-xs font-medium px-2 py-0.5 rounded-full border border-green-500">
                      New
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <style jsx>{`
        aside::-webkit-scrollbar {
          width: ${isHovered ? "6px" : "0px"};
        }
        aside::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.3);
          border-radius: 4px;
        }
        aside:hover::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.5);
        }
      `}</style>
    </aside>
  );
}
