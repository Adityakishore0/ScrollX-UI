import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DecoratedTextProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  bordered?: boolean;
  showIcons?: boolean;
  iconClassName?: string;
  glowEffect?: boolean;
  flicker?: boolean;
}

function DecoratedText({
  text,
  children,
  className,
  bordered = true,
  showIcons = true,
  iconClassName,
  glowEffect = true,
  flicker = true,
}: DecoratedTextProps) {
  const content = text || children;

  return (
    <motion.span
      className={cn(
        "group/decorated relative inline-block",
        bordered && "border border-black/20 dark:border-white/20",
        className
      )}
    >
      {flicker && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.4, 1, 0] }}
          transition={{
            duration: 0.45,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: "easeOut",
          }}
          className="absolute inset-0 bg-black/10 dark:bg-white/10 pointer-events-none"
        />
      )}

      <motion.span
        initial={flicker ? { opacity: 0 } : false}
        animate={flicker ? { opacity: [0, 1, 0.3, 1] } : { opacity: 1 }}
        transition={
          flicker
            ? { duration: 1.5, ease: "easeInOut", times: [0, 0.4, 0.65, 1] }
            : undefined
        }
        className="relative z-10 inline-block leading-none"
      >
        {content}
      </motion.span>

      {showIcons && (
        <>
          <Icon
            className={cn(
              "absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-black dark:text-white",
              iconClassName
            )}
          />
          <Icon
            className={cn(
              "absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 h-3 w-3 text-black dark:text-white",
              iconClassName
            )}
          />
          <Icon
            className={cn(
              "absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 h-3 w-3 text-black dark:text-white",
              iconClassName
            )}
          />
          <Icon
            className={cn(
              "absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 h-3 w-3 text-black dark:text-white",
              iconClassName
            )}
          />
        </>
      )}

      {glowEffect && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 blur-xl transition-opacity duration-500 rounded-sm group-hover/decorated:opacity-100 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      )}
    </motion.span>
  );
}

function Icon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
}

export { DecoratedText };
