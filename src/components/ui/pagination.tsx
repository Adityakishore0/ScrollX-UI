"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/components/ui/button";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { motion, HTMLMotionProps } from "framer-motion";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1 sm:gap-2", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("list-none", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  shiny?: boolean;
  shinySpeed?: number;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a"> &
  Pick<BadgeProps, "variant">;

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  (
    {
      className,
      isActive = false,
      shiny = isActive,
      shinySpeed = 5,
      size = "icon",
      variant = isActive ? "default" : "outline",
      children,
      ...props
    },
    ref
  ) => {
    const MotionBadge = motion(Badge);

    return (
      <a
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          size === "icon"
            ? "h-8 w-8 sm:h-9 sm:w-9"
            : "h-9 px-3 py-1 sm:h-10 sm:px-4 sm:py-2",
          className
        )}
        {...props}
      >
        <MotionBadge
          variant={variant}
          shiny={shiny}
          shinySpeed={shinySpeed}
          className={cn(
            "h-full w-full items-center justify-center",
            "border shadow-sm",
            isActive
              ? "bg-primary text-primary-foreground border-primary"
              : "border-input bg-background",
            !isActive && "hover:bg-accent hover:text-accent-foreground",
            size === "icon" ? "p-0" : "px-2 py-1 sm:px-3 sm:py-1"
          )}
          whileHover={
            !isActive
              ? {
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }
              : {}
          }
          whileTap={
            !isActive
              ? {
                  scale: 0.95,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }
              : {}
          }
          animate={
            isActive
              ? {
                  scale: [1, 1.02, 1],
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                  },
                }
              : {}
          }
        >
          {children}
        </MotionBadge>
      </a>
    );
  }
);
PaginationLink.displayName = "PaginationLink";

interface PaginationNavigationProps
  extends React.ComponentProps<typeof PaginationLink> {
  className?: string;
}

const PaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  PaginationNavigationProps
>(({ className, ...props }, ref) => {
  const MotionDiv = motion.div;

  return (
    <PaginationLink
      ref={ref}
      aria-label="Go to previous page"
      size="default"
      className={cn("pl-2 sm:pl-2.5", className)}
      {...props}
    >
      <MotionDiv
        className="flex items-center gap-1"
        whileHover={{ x: -2 }}
        whileTap={{ x: -4 }}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </MotionDiv>
    </PaginationLink>
  );
});
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<
  HTMLAnchorElement,
  PaginationNavigationProps
>(({ className, ...props }, ref) => {
  const MotionDiv = motion.div;

  return (
    <PaginationLink
      ref={ref}
      aria-label="Go to next page"
      size="default"
      className={cn("pr-2 sm:pr-2.5", className)}
      {...props}
    >
      <MotionDiv
        className="flex items-center gap-1"
        whileHover={{ x: 2 }}
        whileTap={{ x: 4 }}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </MotionDiv>
    </PaginationLink>
  );
});
PaginationNext.displayName = "PaginationNext";

interface PaginationEllipsisProps extends HTMLMotionProps<"span"> {
  className?: string;
}

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(({ className, ...props }, ref) => {
  const MotionSpan = motion.span;

  return (
    <MotionSpan
      ref={ref}
      aria-hidden
      className={cn(
        "flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-muted-foreground",
        className
      )}
      whileHover={{ scale: 1.1 }}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </MotionSpan>
  );
});
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
