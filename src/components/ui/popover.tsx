"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        asChild
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.3, y: 20 }}
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
            transition: {
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
          }}
          className={cn(
            "bg-popover text-popover-foreground z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
            className
          )}
        >
          {children}
        </motion.div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
