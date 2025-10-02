"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import LustreText from "@/components/ui/lustretext";

const EXPANDABLE_CONTENT_SYMBOL = Symbol.for("AnnouncementExpandedContent");

const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
} & React.SVGProps<SVGSVGElement>) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength?.();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x ?? 0
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y ?? 0
  );
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export type AnnouncementProps = Omit<ComponentProps<typeof Badge>, "ref"> & {
  styled?: boolean;
  animation?: "fade";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  shiny?: boolean;
  movingBorder?: boolean;
  movingBorderDuration?: number;
  movingBorderClassName?: string;
};

function AnnouncementComponent({
  variant = "outline",
  styled = false,
  animation = "fade",
  icon,
  iconPosition = "left",
  shiny = false,
  movingBorder = false,
  movingBorderDuration = 3000,
  movingBorderClassName,
  className,
  children,
  ...props
}: AnnouncementProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [hasExpandable, setHasExpandable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const expandedContentRef = useRef<ReactNode>(null);
  const mainContentRef = useRef<ReactNode[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const childArray = React.Children.toArray(children);
    const main: ReactNode[] = [];
    let expanded: ReactNode = null;
    let found = false;

    childArray.forEach((child) => {
      if (
        React.isValidElement(child) &&
        (child.type as unknown as Record<symbol, boolean>)[
          EXPANDABLE_CONTENT_SYMBOL
        ]
      ) {
        expanded = child.props.children;
        found = true;
      } else {
        main.push(child);
      }
    });

    expandedContentRef.current = expanded;
    mainContentRef.current = main;
    setHasExpandable(found);
  }, [children]);

  const updatePosition = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, []);

  useEffect(() => {
    if (!isOpen || !hasExpandable) return;

    updatePosition();

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      updatePosition();
    };

    const handleResize = () => {
      updatePosition();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, hasExpandable, updatePosition]);

  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  };

  const displayContent = shiny
    ? React.Children.map(mainContentRef.current, (child) =>
        typeof child === "string" ? <LustreText text={child} /> : child
      )
    : mainContentRef.current;

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  const badgeContent = (
    <Badge
      className={cn(
        "group relative max-w-full overflow-hidden rounded-full bg-background px-4 py-1.5 font-medium shadow-sm",
        styled && "border-foreground/5",
        className
      )}
      variant={variant}
      data-expandable={hasExpandable}
      {...props}
    >
      <div className="relative flex items-center gap-2">
        {icon && iconPosition === "left" && (
          <span className="shrink-0">{icon}</span>
        )}
        <div className="flex-1 flex items-center gap-2 truncate">
          {displayContent}
        </div>
        {icon && iconPosition === "right" && (
          <span className="shrink-0">{icon}</span>
        )}
        {hasExpandable ? (
          <button
            type="button"
            onClick={handleToggle}
            data-state={isOpen ? "open" : "closed"}
            className="flex shrink-0 items-center rounded p-1 hover:bg-foreground/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ml-1"
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-label={
              isOpen ? "Collapse announcement" : "Expand announcement"
            }
          >
            <ChevronDown
              className="size-3 shrink-0 transition-transform duration-300 data-[state=open]:rotate-180"
              aria-hidden="true"
              data-state={isOpen ? "open" : "closed"}
            />
          </button>
        ) : null}
      </div>
    </Badge>
  );

  return (
    <>
      <motion.div
        ref={containerRef}
        data-state={isOpen ? "open" : "closed"}
        {...animations[animation]}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative inline-block"
      >
        {movingBorder ? (
          <div className="relative overflow-hidden rounded-full bg-transparent p-[1px]">
            <div className="absolute inset-0 pointer-events-none">
              <MovingBorder duration={movingBorderDuration} rx="50%" ry="50%">
                <div
                  className={cn(
                    "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
                    movingBorderClassName
                  )}
                />
              </MovingBorder>
            </div>
            {badgeContent}
          </div>
        ) : (
          badgeContent
        )}
      </motion.div>
      {isMounted &&
        hasExpandable &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  top: `${dropdownPosition.top + 8}px`,
                  left: `${dropdownPosition.left}px`,
                  width: `${Math.max(dropdownPosition.width, 200)}px`,
                  zIndex: 50,
                }}
                className="rounded-lg border bg-popover text-popover-foreground p-4 text-sm shadow-lg"
                role="dialog"
                aria-modal="false"
                aria-label="Expanded announcement content"
              >
                {expandedContentRef.current}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

export const Announcement = AnnouncementComponent;

export type AnnouncementTagProps = HTMLAttributes<HTMLSpanElement> & {
  lustre?: boolean;
  movingBorder?: boolean;
  movingBorderDuration?: number;
  movingBorderClassName?: string;
};

export function AnnouncementTag({
  className,
  lustre = false,
  movingBorder = false,
  movingBorderDuration = 3000,
  movingBorderClassName,
  children,
  ...props
}: AnnouncementTagProps) {
  const tagContent = (
    <span
      className={cn(
        "relative inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-background",
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 rounded-full bg-foreground/5 opacity-70 pointer-events-none" />
      <span className="relative z-10">
        {React.Children.map(children, (child) =>
          lustre && typeof child === "string" ? (
            <LustreText text={child} />
          ) : (
            child
          )
        )}
      </span>
    </span>
  );

  if (movingBorder) {
    return (
      <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
        <span className="absolute inset-0 pointer-events-none">
          <MovingBorder duration={movingBorderDuration} rx="50%" ry="50%">
            <div
              className={cn(
                "h-12 w-12 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-80",
                movingBorderClassName
              )}
            />
          </MovingBorder>
        </span>
        <span className="relative">{tagContent}</span>
      </span>
    );
  }

  return tagContent;
}

export type AnnouncementTitleProps = HTMLAttributes<HTMLSpanElement> & {
  multiTags?: boolean;
  lustre?: boolean;
};

export function AnnouncementTitle({
  className,
  multiTags = false,
  lustre = false,
  children,
  ...props
}: AnnouncementTitleProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 py-1",
        multiTags ? "flex-wrap" : "truncate",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) =>
        lustre && typeof child === "string" ? (
          <LustreText text={child} />
        ) : (
          child
        )
      )}
    </span>
  );
}

export type AnnouncementContainerProps = HTMLAttributes<HTMLDivElement>;

export function AnnouncementContainer({
  className,
  ...props
}: AnnouncementContainerProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-1.5", className)}
      {...props}
    />
  );
}

export function AnnouncementExpandedContent({
  children,
}: {
  children: ReactNode;
}) {
  return null;
}

(AnnouncementExpandedContent as unknown as Record<symbol, boolean>)[
  EXPANDABLE_CONTENT_SYMBOL
] = true;
