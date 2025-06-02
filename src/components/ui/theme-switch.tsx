"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ThemeSwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  modes?: string[];
  icons?: React.ReactNode[];
  showActiveIconOnly?: boolean;
  showInactiveIcons?: "all" | "none" | "next";
  variant?: "default" | "icon-click";
}

const ThemeSwitch = React.forwardRef<HTMLDivElement, ThemeSwitchProps>(
  (
    {
      className,
      modes = ["light", "dark", "system"],
      icons = [],
      showActiveIconOnly = false,
      showInactiveIcons = "all",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const { theme, setTheme } = useTheme();

    const currentModeIndex = React.useMemo(() => {
      const index = modes.indexOf(theme || "");
      return index !== -1 ? index : 0;
    }, [theme, modes]);

    const handleToggle = React.useCallback(() => {
      const nextIndex = (currentModeIndex + 1) % modes.length;
      setTheme(modes[nextIndex]);
    }, [currentModeIndex, modes, setTheme]);

    const [isClient, setIsClient] = React.useState(false);
    React.useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) return null;

    const switchWidth = modes.length === 2 ? "w-14" : "w-20";

    const isIconVisible = (index: number) => {
      if (index === currentModeIndex) return true;
      switch (showInactiveIcons) {
        case "none":
          return false;
        case "next":
          return index === (currentModeIndex + 1) % modes.length;
        case "all":
        default:
          return true;
      }
    };

    return (
      <div
        className={cn(
          "relative inline-flex h-8 rounded-full border border-input bg-background p-1 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          switchWidth,
          className
        )}
        onClick={variant === "default" ? handleToggle : undefined}
        ref={ref}
        {...props}
      >
        {showActiveIconOnly ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background z-10">
              {icons[currentModeIndex]}
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full h-full items-center justify-between">
              {icons.map((icon, idx) => {
                const key = `theme-icon-${idx}`;
                const visible = isIconVisible(idx);

                return (
                  <div
                    key={key}
                    className={cn(
                      "flex h-6 w-6 cursor-pointer items-center justify-center rounded-full z-10 transition-opacity duration-200",
                      currentModeIndex === idx
                        ? "text-background"
                        : "text-muted-foreground",
                      visible ? "opacity-100" : "opacity-0"
                    )}
                    onClick={(e) => {
                      if (variant === "icon-click") {
                        e.stopPropagation();
                        setTheme(modes[idx]);
                      }
                    }}
                  >
                    {React.isValidElement(icon)
                      ? React.cloneElement(icon, { key: `icon-element-${idx}` })
                      : icon}
                  </div>
                );
              })}
            </div>

            <div
              className={cn(
                "absolute top-1 h-6 w-6 rounded-full bg-foreground transition-all duration-200 ease-in-out",
                currentModeIndex === 0
                  ? "left-1"
                  : currentModeIndex === 1
                  ? modes.length === 2
                    ? "left-7"
                    : "left-[calc(50%-12px)]"
                  : "left-[calc(100%-28px)]"
              )}
            />
          </>
        )}
      </div>
    );
  }
);

ThemeSwitch.displayName = "ThemeSwitch";

export { ThemeSwitch };
