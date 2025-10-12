import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface VercelCardProps
  extends Omit<HTMLMotionProps<"div">, "whileHover" | "transition"> {
  showIcons?: boolean;
  iconClassName?: string;
  animateOnHover?: boolean;
  glowEffect?: boolean;
  bordered?: boolean;
}

function VercelCard({
  children,
  className,
  showIcons = true,
  iconClassName,
  animateOnHover = false,
  glowEffect = false,
  bordered = true,
  ...props
}: VercelCardProps) {
  return (
    <motion.div
      className={cn(
        "group/canvas-card relative flex flex-col items-center justify-center w-full h-full min-h-[200px]",
        bordered &&
          "border border-black/[0.2] dark:border-white/[0.2] rounded-xl",
        className
      )}
      whileHover={animateOnHover ? { scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {showIcons && (
        <>
          <Icon
            className={cn(
              "absolute -left-3 -top-3 h-6 w-6 text-black dark:text-white",
              iconClassName
            )}
          />
          <Icon
            className={cn(
              "absolute -bottom-3 -left-3 h-6 w-6 text-black dark:text-white",
              iconClassName
            )}
          />
          <Icon
            className={cn(
              "absolute -right-3 -top-3 h-6 w-6 text-black dark:text-white",
              iconClassName
            )}
          />
          <Icon
            className={cn(
              "absolute -bottom-3 -right-3 h-6 w-6 text-black dark:text-white",
              iconClassName
            )}
          />
        </>
      )}

      {glowEffect && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover/canvas-card:opacity-100"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      )}

      <div className="relative h-full w-full p-6 flex flex-col items-center justify-center">
        {children}
      </div>
    </motion.div>
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

export { VercelCard };
