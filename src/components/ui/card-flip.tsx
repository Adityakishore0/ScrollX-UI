"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

function CardFlip({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  children: [React.ReactNode, React.ReactNode];
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [front, back] = React.Children.toArray(children);

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ perspective: "1000px" }}
      {...props}
    >
      <motion.div
        className="relative w-full"
        initial={false}
        animate={{ rotateY: isFlipped ? -180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="w-full" style={{ backfaceVisibility: "hidden" }}>
          <div className="relative w-full">
            <button
              onClick={() => setIsFlipped(true)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
              aria-label="Show info"
            >
              <Info className="w-5 h-5 text-muted-foreground" />
            </button>
            {front}
          </div>
        </div>

        <div
          className="absolute inset-0 w-full"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(-180deg)",
          }}
        >
          <div className="relative w-full h-full">
            <button
              onClick={() => setIsFlipped(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
            {back}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CardFlipFront({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function CardFlipBack({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function CardFlipHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardFlipTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardFlipDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardFlipAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardFlipContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFlipFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  CardFlip,
  CardFlipFront,
  CardFlipBack,
  CardFlipHeader,
  CardFlipFooter,
  CardFlipTitle,
  CardFlipAction,
  CardFlipDescription,
  CardFlipContent,
};
