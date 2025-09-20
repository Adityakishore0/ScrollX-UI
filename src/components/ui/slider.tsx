"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const [isPressed, setIsPressed] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isKeyboardFocused, setIsKeyboardFocused] = React.useState(false);
  const lastInteractionWasTab = React.useRef(false);
  const pointerActive = React.useRef(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") lastInteractionWasTab.current = true;
    };
    const handlePointerDown = () => {
      pointerActive.current = true;
      lastInteractionWasTab.current = false;
    };
    const handlePointerUp = () => {
      pointerActive.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("touchstart", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, []);

  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max],
    [value, defaultValue, min, max]
  );

  const showGlass = isPressed || isDragging || isKeyboardFocused;

  return (
    <SliderPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative grow overflow-visible rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
          "bg-muted mx-2 sm:mx-4 lg:mx-6 z-0"
        )}
      >
        <SliderPrimitive.Range className="absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full rounded-full bg-primary z-0" />
      </SliderPrimitive.Track>

      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          onPointerDown={(e: React.PointerEvent<HTMLDivElement>) => {
            setIsPressed(true);
            pointerActive.current = true;
            lastInteractionWasTab.current = false;
          }}
          onPointerMove={(e: React.PointerEvent<HTMLDivElement>) =>
            e.buttons > 0 && setIsDragging(true)
          }
          onPointerUp={(e: React.PointerEvent<HTMLDivElement>) => {
            setIsPressed(false);
            setIsDragging(false);
            pointerActive.current = false;
          }}
          onPointerCancel={(e: React.PointerEvent<HTMLDivElement>) => {
            setIsPressed(false);
            setIsDragging(false);
            pointerActive.current = false;
          }}
          onFocus={() => {
            if (lastInteractionWasTab.current && !pointerActive.current)
              setIsKeyboardFocused(true);
          }}
          onBlur={() => setIsKeyboardFocused(false)}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (
              !isKeyboardFocused &&
              ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
                e.key
              )
            ) {
              e.preventDefault();
            }
          }}
          className={cn(
            "relative block shrink-0 rounded-full transition-all duration-200 ease-out z-10",
            "outline-none disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing",
            "h-5 w-8 sm:h-6 sm:w-10 lg:h-7 lg:w-12",
            showGlass
              ? "scale-105 bg-white/8 backdrop-blur-lg backdrop-brightness-100 border border-white/25 border-t-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] ring-2 ring-foreground/15"
              : "bg-background border border-primary shadow-sm"
          )}
        >
          {showGlass && (
            <div className="absolute top-0.5 left-1 right-1 h-0.5 rounded-full pointer-events-none opacity-60 bg-gradient-to-r from-white/60 via-white/30 to-white/60" />
          )}
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
