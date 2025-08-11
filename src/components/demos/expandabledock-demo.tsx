"use client";

import React, { useState } from "react";
import {
  Search,
  Package,
  Zap,
  Settings,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import ExpandableDock from "@/components/ui/expandable-dock";
import navigation from "@/constants/navItems";

export default function ExpandableDockDemo() {
  const [query, setQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState(
    new Set(["COMPONENTS"])
  );

  const groupedNavigation = [
    {
      title: "GETTING STARTED",
      icon: Zap,
      children: navigation.filter((item) =>
        ["Getting Started", "Introduction", "Installation"].includes(item.title)
      ),
    },
    {
      title: "INSTALLATION GUIDE",
      icon: Settings,
      children:
        navigation.find((item) => item.title === "Installation Guide")
          ?.children || [],
    },
    {
      title: "COMPONENTS",
      icon: Package,
      children:
        navigation.find((item) => item.title === "Components")?.children || [],
    },
  ];

  const filteredItems = groupedNavigation
    .map((section) => ({
      ...section,
      children: section.children.filter(
        (child) =>
          query === "" ||
          child.title.toLowerCase().includes(query.toLowerCase()) ||
          section.title.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter(
      (section) =>
        section.children.length > 0 ||
        section.title.toLowerCase().includes(query.toLowerCase())
    );

  const toggleSection = (title: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(title)) newExpanded.delete(title);
    else newExpanded.add(title);
    setExpandedSections(newExpanded);
  };

  return (
    <div className="flex flex-col justify-center  px-4">
      <h1 className="text-center text-2xl font-semibold mb-6 ">
        The Dock will show on bottom of the page
      </h1>

      <ExpandableDock
        headerContent={
          <div className="flex items-center gap-3 text-black dark:text-white w-full">
            <Search className="w-5 h-5" />
            <span className="font-medium">Search Components</span>
            <div className="ml-auto text-xs bg-white/20 dark:bg-black/20 text-black dark:text-white px-2 py-1 rounded">
              {filteredItems.reduce(
                (acc, section) => acc + section.children.length,
                0
              )}{" "}
              results
            </div>
          </div>
        }
        className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700"
      >
        <div className="flex flex-col h-full">
          <div className="mb-6 flex items-center gap-3 bg-gray-100 dark:bg-black rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-600">
            <Search className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search components, guides, and more..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[70vh]">
            {filteredItems.length > 0 ? (
              filteredItems.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <section.icon className="w-3 h-3" />
                      <span>{section.title}</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        ({section.children.length})
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform group-hover:text-gray-900 dark:group-hover:text-white ${
                        expandedSections.has(section.title) ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedSections.has(section.title) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-4">
                      {section.children.map((child, cIdx) => (
                        <button
                          key={cIdx}
                          onClick={() => (window.location.href = child.href)}
                          className="text-left p-3 rounded-lg text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 group"
                        >
                          <div className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                            {child.title}
                            {child.category === "new" && (
                              <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full flex items-center gap-1">
                                <Sparkles className="w-2 h-2" />
                                NEW
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Component • Ready to use
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  No results found
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Try adjusting your search terms or{" "}
                  <button
                    onClick={() => setQuery("")}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    clear the search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ExpandableDock>
    </div>
  );
}
