"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import navigation, { NavItem } from "@/constants/navItems";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<NavItem[]>([]);

  const allNavigationItems = useRef<NavItem[]>([]);

  useEffect(() => {
    const items: NavItem[] = [];

    const processItems = (navItems: NavItem[]) => {
      navItems.forEach((item) => {
        items.push(item);
        if (item.children) {
          processItems(item.children);
        }
      });
    };

    processItems(navigation);
    allNavigationItems.current = items;
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = allNavigationItems.current.filter((item) =>
      item.title.toLowerCase().includes(query)
    );

    setSearchResults(results);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleNavigate = (href: string) => {
    if (href) {
      window.location.href = href;
      onClose();
    }
  };

  const renderNavigationItems = () => {
    return navigation.map((item) => (
      <div key={item.title} className="mb-3">
        <p className="text-neutral-400 text-sm mb-1">{item.title}</p>
        <div className="pl-2">
          {item.href && (
            <button
              className="w-full text-left p-2 hover:bg-neutral-800 rounded-lg group"
              onClick={() => handleNavigate(item.href)}
            >
              <span className="group-hover:border-b group-hover:border-white pb-px transition-all duration-200">
                {item.title}
              </span>
            </button>
          )}

          {item.children?.map((child) => (
            <button
              key={child.href}
              className="w-full text-left p-2 hover:bg-neutral-800 rounded-lg group"
              onClick={() => handleNavigate(child.href)}
            >
              <span className="group-hover:border-b group-hover:border-white pb-px transition-all duration-200">
                {child.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md bg-neutral-900 text-white rounded-xl shadow-lg p-5"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center w-full">
            <Search className="w-4 h-4 text-neutral-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Type a command or search..."
              className="w-full bg-transparent border-none outline-none text-lg placeholder-neutral-400"
              autoFocus={!/Mobi|Android/i.test(navigator.userAgent)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          className="mt-4 border-t border-neutral-700 pt-3 overflow-y-auto"
          style={{
            maxHeight: "300px",
            scrollbarWidth: "thin",
            scrollbarColor: "#444 transparent",
          }}
        >
          <style jsx global>{`
            /* Custom scrollbar styles */
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }

            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #444;
              border-radius: 4px;
            }

            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #444 transparent;
            }

            /* Hide scrollbar when not hovering */
            .custom-scrollbar:not(:hover)::-webkit-scrollbar-thumb {
              background: transparent;
            }

            .custom-scrollbar:not(:hover) {
              scrollbar-color: transparent transparent;
            }
          `}</style>

          <div className="custom-scrollbar overflow-y-auto pr-1">
            {searchQuery && searchResults.length > 0 && (
              <div className="mb-4">
                <p className="text-neutral-400 text-sm mb-2">Search Results</p>
                {searchResults.map((item, index) => (
                  <button
                    key={`${item.title}-${index}`}
                    className="w-full text-left p-2 hover:bg-neutral-800 rounded-lg group"
                    onClick={() => item.href && handleNavigate(item.href)}
                    disabled={!item.href}
                  >
                    <span
                      className={cn(
                        "transition-all duration-200",
                        item.href
                          ? "group-hover:border-b group-hover:border-white pb-px"
                          : ""
                      )}
                    >
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {!searchQuery && (
              <>
                <div className="mb-4">
                  <p className="text-neutral-400 text-sm">Follow for updates</p>
                  <button
                    className="w-full text-left p-2 hover:bg-neutral-800 rounded-lg group"
                    onClick={() =>
                      window.open("https://x.com/AdityaFullstack", "_blank")
                    }
                  >
                    <span className="group-hover:border-b group-hover:border-white pb-px transition-all duration-200">
                      Twitter @AdityaFullstack
                    </span>
                  </button>
                </div>

                {renderNavigationItems()}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
