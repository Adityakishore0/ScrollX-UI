"use client";
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className="z-50"
        {...props}
        asChild
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.3,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            x: [0, -4, 4, -3, 3, -2, 2, -1, 1, 0],
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            y: 10,
            x: [0, -3, 3, -2, 2, -1, 1, 0],
          }}
          transition={{
            opacity: { duration: 0.2 },
            scale: {
              duration: 0.6,
              type: "spring",
              damping: 12,
              stiffness: 400,
              mass: 0.8,
            },
            y: {
              duration: 0.5,
              type: "spring",
              damping: 10,
              stiffness: 300,
              mass: 0.9,
            },
            x: {
              duration: 0.7,
              delay: 0.2,
              ease: "easeOut",
              times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1],
            },
            exit: {
              opacity: { duration: 0.25 },
              scale: { duration: 0.25, ease: "easeIn" },
              y: { duration: 0.25, ease: "easeIn" },
              x: {
                duration: 0.4,
                ease: "easeOut",
                times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 1],
              },
            },
          }}
          className={cn(
            "bg-primary text-primary-foreground w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
            className
          )}
        >
          {children}
          <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
        </motion.div>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
