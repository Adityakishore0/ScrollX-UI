"use client";

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
  startTransition,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Circle, Sparkle } from "lucide-react";
import navigation, { NavItem } from "@/constants/navItems";
import { SeparatorPro } from "@/components/ui/seperatorpro";
import { Status } from "@/components/ui/status";
import { cn } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ANIMATION_CONFIG = Object.freeze({
  modal: { duration: 0.15 },
  content: { duration: 0.15, ease: "easeOut" as const },
});

export function SearchModal(props: SearchModalProps) {
  return <SearchModalComponent {...props} />;
}

const STYLES = Object.freeze({
  maxHeight: "300px",
  scrollbarWidth: "thin" as const,
  scrollbarColor: "#ccc transparent",
});

const CSS_CLASSES = Object.freeze({
  button:
    "w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg group",
  span: "group-hover:border-b group-hover:border-black dark:group-hover:border-white pb-px transition-all duration-200",
});

let flattenedItems: NavItem[] | null = null;
let searchIndex: Map<string, NavItem[]> | null = null;

const getFlattenedNavigation = (): NavItem[] => {
  if (flattenedItems) return flattenedItems;
  const result: NavItem[] = [];
  const stack = [...navigation];
  while (stack.length > 0) {
    const item = stack.pop()!;
    result.push(item);
    if (item.children) stack.push(...item.children);
  }
  flattenedItems = result;
  return result;
};

const buildSearchIndex = (items: NavItem[]): Map<string, NavItem[]> => {
  if (searchIndex) return searchIndex;
  const index = new Map<string, NavItem[]>();
  for (const item of items) {
    const title = item.title.toLowerCase();
    for (let i = 0; i < title.length; i++) {
      for (let j = i + 1; j <= title.length; j++) {
        const substring = title.slice(i, j);
        if (!index.has(substring)) index.set(substring, []);
        const arr = index.get(substring)!;
        if (!arr.includes(item)) arr.push(item);
      }
    }
  }
  searchIndex = index;
  return index;
};

const searchItems = (query: string): NavItem[] => {
  if (!query) return [];
  const items = getFlattenedNavigation();
  const index = buildSearchIndex(items);
  const lowerQuery = query.toLowerCase();
  const results = index.get(lowerQuery);
  if (results && results.length <= 10) return results;
  const fallbackResults: NavItem[] = [];
  for (const item of items) {
    if (item.title.toLowerCase().includes(lowerQuery)) {
      fallbackResults.push(item);
      if (fallbackResults.length >= 10) break;
    }
  }
  return fallbackResults;
};

const OptimizedStatusBadge = memo(
  ({
    category,
    categoryClassName,
    isHovered,
  }: {
    category: string;
    categoryClassName?: string;
    isHovered: boolean;
  }) => {
    const defaultClassName = useMemo(
      () =>
        "bg-green-900 text-green-400 font-medium rounded-full border border-green-500 px-2 py-0.5 text-xs",
      []
    );

    return (
      <Status
        className={cn(
          "flex-shrink-0 transition-all duration-200",
          categoryClassName || defaultClassName
        )}
        shiny={isHovered}
        shinySpeed={3}
      >
        {category}
      </Status>
    );
  }
);

OptimizedStatusBadge.displayName = "OptimizedStatusBadge";

const NavigationItem = memo(
  ({
    item,
    onClick,
    isChild = false,
  }: {
    item: NavItem;
    onClick: (href: string) => void;
    isChild?: boolean;
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = useCallback(() => {
      if (item.href) onClick(item.href);
    }, [item.href, onClick]);

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
    }, []);

    const categoryBadge = useMemo(() => {
      if (!item.category) return null;
      return (
        <OptimizedStatusBadge
          category={item.category}
          categoryClassName={item.categoryClassName}
          isHovered={isHovered}
        />
      );
    }, [item.category, item.categoryClassName, isHovered]);

    return (
      <button
        className={CSS_CLASSES.button}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={!item.href}
      >
        <div className="flex items-center">
          <div className="flex items-center">
            {isChild && (
              <Sparkle className="w-3 h-3 text-black dark:text-white opacity-80 mr-2 flex-shrink-0" />
            )}
            <span className={cn("truncate", item.href ? CSS_CLASSES.span : "")}>
              {item.title}
            </span>
          </div>
          {categoryBadge && <div className="ml-2">{categoryBadge}</div>}
        </div>
      </button>
    );
  }
);

NavigationItem.displayName = "NavigationItem";

const NavigationSection = memo(
  ({
    item,
    onNavigate,
  }: {
    item: NavItem;
    onNavigate: (href: string) => void;
  }) => (
    <div className="mb-3">
      <div className="flex items-center mb-1">
        <Circle className="w-3 h-3 text-black dark:text-white opacity-80 mr-2 flex-shrink-0" />
        <p className="text-gray-600 dark:text-neutral-400 text-sm truncate">
          {item.title}
        </p>
      </div>
      <div className="pl-2">
        {item.href && (
          <NavigationItem item={item} onClick={onNavigate} isChild={true} />
        )}
        {item.children?.map((child) => (
          <NavigationItem
            key={child.href || child.title}
            item={child}
            onClick={onNavigate}
            isChild={true}
          />
        ))}
      </div>
    </div>
  )
);

NavigationSection.displayName = "NavigationSection";

const SearchResults = memo(
  ({
    results,
    onNavigate,
  }: {
    results: NavItem[];
    onNavigate: (href: string) => void;
  }) => (
    <>
      <p className="text-gray-600 dark:text-neutral-400 text-sm mb-2">
        Search Results
      </p>
      {results.map((item) => (
        <NavigationItem
          key={`${item.title}-${item.href}`}
          item={item}
          onClick={onNavigate}
          isChild={true}
        />
      ))}
    </>
  )
);

SearchResults.displayName = "SearchResults";

const TwitterLink = memo(() => {
  const handleClick = useCallback(() => {
    window.open("https://x.com/Ahdeetai", "_blank");
  }, []);
  return (
    <button className={CSS_CLASSES.button} onClick={handleClick}>
      <div className="flex items-center">
        <Sparkle className="w-3 h-3 text-black dark:text-white opacity-80 mr-2 flex-shrink-0" />
        <span className={CSS_CLASSES.span}>Twitter @Ahdeetai</span>
      </div>
    </button>
  );
});

TwitterLink.displayName = "TwitterLink";

const DefaultContent = memo(
  ({ onNavigate }: { onNavigate: (href: string) => void }) => (
    <>
      <div className="mb-4">
        <p className="text-gray-600 dark:text-neutral-400 text-sm">
          Follow for updates
        </p>
        <TwitterLink />
      </div>
      {navigation.map((item) => (
        <div key={item.title}>
          {["Components", "Installation Guide", "Getting Started"].includes(
            item.title
          ) && <SeparatorPro variant="default" className="my-4" />}
          <NavigationSection item={item} onNavigate={onNavigate} />
        </div>
      ))}
    </>
  )
);

DefaultContent.displayName = "DefaultContent";

const NoResults = memo(() => (
  <div className="text-center py-8">
    <p className="text-gray-800 dark:text-white">No results found</p>
  </div>
));

NoResults.displayName = "NoResults";

const ModalContent = memo(
  ({
    hasSearchQuery,
    hasSearchResults,
    searchResults,
    onNavigate,
  }: {
    hasSearchQuery: boolean;
    hasSearchResults: boolean;
    searchResults: NavItem[];
    onNavigate: (href: string) => void;
  }) => (
    <AnimatePresence mode="wait">
      {hasSearchQuery ? (
        <motion.div
          key="search-results"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={ANIMATION_CONFIG.content}
          className="mb-4"
        >
          {hasSearchResults ? (
            <SearchResults results={searchResults} onNavigate={onNavigate} />
          ) : (
            <NoResults />
          )}
        </motion.div>
      ) : (
        <motion.div
          key="default-content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={ANIMATION_CONFIG.content}
        >
          <DefaultContent onNavigate={onNavigate} />
        </motion.div>
      )}
    </AnimatePresence>
  )
);

ModalContent.displayName = "ModalContent";

const SearchModalComponent = memo(({ isOpen, onClose }: SearchModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deferredQuery, setDeferredQuery] = useState("");

  const searchResults = useMemo(
    () => searchItems(deferredQuery),
    [deferredQuery]
  );

  const handleNavigate = useCallback(
    (href: string) => {
      window.location.href = href;
      onClose();
    },
    [onClose]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      startTransition(() => {
        setDeferredQuery(value.trim());
      });
    },
    []
  );

  const handleClose = useCallback(() => {
    setSearchQuery("");
    setDeferredQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    document.addEventListener("keydown", handleKeyDown, { passive: true });

    requestAnimationFrame(() => {
      if (inputRef.current && !/Mobi|Android/i.test(navigator.userAgent)) {
        inputRef.current.focus();
      }
    });

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const hasSearchQuery = deferredQuery.length > 0;
  const hasSearchResults = searchResults.length > 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={ANIMATION_CONFIG.modal}
        className="w-full max-w-md bg-white dark:bg-neutral-900 text-black dark:text-white rounded-xl shadow-lg p-5"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center w-full">
            <Search className="w-4 h-4 text-gray-600 dark:text-neutral-400 mr-2 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search..."
              className="w-full bg-transparent border-none outline-none text-lg placeholder-gray-600 dark:placeholder-neutral-400"
              autoFocus
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
          <button
            onClick={handleClose}
            className="text-gray-600 dark:text-neutral-400 hover:text-black dark:hover:text-white flex-shrink-0 transition-colors duration-200"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          className="mt-4 border-t border-gray-300 dark:border-neutral-700 pt-3 overflow-y-auto relative custom-scrollbar"
          style={STYLES}
        >
          <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #ccc;
              border-radius: 4px;
              transition: background-color 0.2s ease;
            }
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #ccc transparent;
            }
            .custom-scrollbar:not(:hover)::-webkit-scrollbar-thumb {
              background: transparent;
            }
            .custom-scrollbar:not(:hover) {
              scrollbar-color: transparent transparent;
            }
            @media (prefers-color-scheme: dark) {
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: #444;
              }
              .custom-scrollbar {
                scrollbar-color: #444 transparent;
              }
            }
          `}</style>

          <div className="overflow-y-auto pr-1">
            <ModalContent
              hasSearchQuery={hasSearchQuery}
              hasSearchResults={hasSearchResults}
              searchResults={searchResults}
              onNavigate={handleNavigate}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
});

SearchModalComponent.displayName = "SearchModalComponent";
