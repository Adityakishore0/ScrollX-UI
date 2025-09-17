"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import navigation from "@/constants/navItems";
import { useState } from "react";
import { Status } from "@/components/ui/status";

export default function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen w-64 p-6 transition-all duration-300 overflow-y-auto border-r",
        "border-gray-200 dark:border-gray-800"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        scrollbarWidth: isHovered ? "thin" : "none",
        overflowY: "auto",
      }}
    >
      <h2 className="text-[1.25rem] font-bold text-gray-900 dark:text-gray-100 mb-6">
        Docs
      </h2>

      <nav className="space-y-3">
        {navigation.map((item) => (
          <div key={item.title}>
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "block font-semibold rounded-md transition-all relative",
                  pathname === item.href
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-gray-700 dark:text-gray-400",
                  "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                )}
                style={{ fontSize: "0.95rem", padding: "0.5rem 0.75rem" }}
              >
                {item.title}
              </Link>
            ) : (
              <span
                className="block font-semibold text-gray-900 dark:text-gray-100"
                style={{ fontSize: "0.95rem", padding: "0.5rem 0.75rem" }}
              >
                {item.title}
              </span>
            )}

            {item.children?.map((child) => {
              const typedChild = child as typeof child & {
                categoryClassName?: string;
              };

              return (
                <Link
                  key={typedChild.href}
                  href={typedChild.href}
                  className={cn(
                    "block rounded-md transition-all relative",
                    pathname === typedChild.href
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-gray-700 dark:text-gray-400",
                    "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                  )}
                  style={{
                    fontSize: "0.85rem",
                    padding: "0.4rem 0.75rem",
                    margin: "0.15rem 0",
                  }}
                >
                  <div className="flex items-center gap-1 whitespace-nowrap overflow-hidden">
                    <span className="truncate">{typedChild.title}</span>

                    {typedChild.category && (
                      <Status
                        className={cn(
                          "flex-shrink-0",
                          typedChild.categoryClassName ||
                            " bg-green-900 text-green-400 font-medium rounded-full border border-green-500"
                        )}
                        shiny={true}
                        shinySpeed={2}
                      >
                        {typedChild.category}
                      </Status>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <style jsx>{`
        aside::-webkit-scrollbar {
          width: ${isHovered ? "0.4rem" : "0rem"};
        }
        aside::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.3);
          border-radius: 0.25rem;
        }
        aside:hover::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.5);
        }
      `}</style>
    </aside>
  );
}
