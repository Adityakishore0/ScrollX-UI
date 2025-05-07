import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
      shiny: {
        true: "relative overflow-hidden",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      shiny: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  shiny?: boolean;
  shinySpeed?: number;
}

function Badge({
  className,
  variant,
  shiny = false,
  shinySpeed = 5,
  children,
  ...props
}: BadgeProps) {
  const animationDuration = `${shinySpeed}s`;

  return (
    <div
      className={cn(badgeVariants({ variant, shiny }), className)}
      {...props}
    >
      <span className={shiny ? "relative z-10" : ""}>{children}</span>

      {shiny && (
        <span
          className="absolute inset-0 pointer-events-none animate-shine dark:hidden"
          style={{
            background:
              "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
            animationDuration,
            mixBlendMode: "screen",
          }}
        />
      )}

      {shiny && (
        <span
          className="absolute inset-0 pointer-events-none animate-shine hidden dark:block"
          style={{
            background:
              "linear-gradient(120deg, transparent 40%, rgba(0,0,150,0.25) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
            animationDuration,
            mixBlendMode: "multiply",
          }}
        />
      )}
    </div>
  );
}

export { Badge, badgeVariants };
