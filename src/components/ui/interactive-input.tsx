"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface CustomCSSProperties extends React.CSSProperties {
  "--shimmer-color"?: string;
  "--radius"?: string;
  "--speed"?: string;
  "--cut"?: string;
  "--bg"?: string;
  "--spread"?: string;
  "--border-width"?: string;
  "--border-segment"?: string;
}

const inputVariants = cva(
  "group relative z-0 bg-white dark:bg-[rgba(0,0,0,1)] flex items-center overflow-hidden whitespace-nowrap transform-gpu transition-all duration-300 ease-in-out focus-within:shadow-glow-scoped",
  {
    variants: {
      variant: {
        default: "text-cyan-400 border border-cyan-400/20 hover:text-cyan-300",
        outline:
          "bg-transparent text-cyan-400 border border-cyan-400 hover:text-cyan-300",
        ghost: "bg-transparent text-cyan-400 hover:bg-cyan-950/30",
        glow: "text-cyan-400 border border-cyan-400/30 hover:text-cyan-300 hover:shadow-glow",
      },
      inputSize: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 py-1 text-xs",
        lg: "h-12 px-8 py-3 text-base",
        icon: "h-10 w-10",
      },
      glow: {
        true: "hover:shadow-[0_0_5px_#03e9f4,0_0_25px_#03e9f4]",
        false: "",
      },
      textEffect: {
        normal: "group-hover:tracking-normal",
        spread: "group-hover:tracking-wider",
      },
      uppercase: {
        true: "",
        false: "",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        none: "rounded-none",
        custom: "rounded-[0.95rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
      glow: false,
      textEffect: "normal",
      uppercase: true,
      rounded: "custom",
    },
  }
);

export interface InteractiveInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
  hideAnimations?: boolean;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  style?: CustomCSSProperties;
}

const InteractiveInput = React.forwardRef<
  HTMLInputElement,
  InteractiveInputProps
>(
  (
    {
      className,
      variant,
      inputSize,
      glow,
      textEffect,
      uppercase,
      rounded,
      asChild = false,
      hideAnimations = false,
      shimmerColor = "#03e9f4",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(0, 0, 0, 1)",
      style,
      ...props
    },
    ref
  ) => {
    const InputComp = asChild ? Slot : "input";

    const combinedStyle: CustomCSSProperties = {
      ...style,
      "--shimmer-color": shimmerColor,
      "--radius": borderRadius,
      "--speed": shimmerDuration,
      "--cut": shimmerSize,
      "--bg": background,
      "--spread": "90deg",
      borderRadius: rounded === "custom" ? borderRadius : undefined,
    };

    const inputStyle = `
      @keyframes InteractiveInput-shimmer-slide {
        to {
          transform: translate(calc(100cqw - 100%), 0);
        }
      }
      
      @keyframes InteractiveInput-spin-around {
        0% {
          transform: translateZ(0) rotate(0);
        }
        15%, 35% {
          transform: translateZ(0) rotate(90deg);
        }
        65%, 85% {
          transform: translateZ(0) rotate(270deg);
        }
        100% {
          transform: translateZ(0) rotate(360deg);
        }
      }
      
      @keyframes InteractiveInput-spread {
        0% {
          letter-spacing: normal;
          transform: perspective(var(--radius)) rotateY(0deg);
        }
        50% {
          letter-spacing: var(--cut);
          transform: perspective(var(--radius)) rotateY(var(--spread));
        }
        100% {
          letter-spacing: normal;
          transform: perspective(var(--radius)) rotateY(0deg);
        }
      }
      
      .animate-shimmer-slide-scoped {
        animation: InteractiveInput-shimmer-slide var(--speed) ease-in-out infinite alternate;
      }
      
      .animate-spin-around-scoped {
        animation: InteractiveInput-spin-around calc(var(--speed) * 2) infinite linear;
      }
      
      .shadow-glow-scoped {
        box-shadow: 0 0 5px var(--shimmer-color),
                    0 0 25px var(--shimmer-color),
                    0 0 50px var(--shimmer-color);
      }

      /* Mobile optimization scoped to this component */
      @media (max-width: 768px) {
        .animated-input-mobile {
          --radius: 60px;
          --speed: 2.5s;
          --cut: 0.03em;
        }
      }
    `;

    return (
      <div
        className={cn(
          "animated-input animated-input-mobile",
          inputVariants({
            variant,
            inputSize,
            glow,
            textEffect,
            uppercase,
            rounded,
            className,
          }),
          glow && "shadow-glow-scoped"
        )}
        style={combinedStyle}
      >
        <style jsx>{inputStyle}</style>

        {!hideAnimations && (
          <div className="absolute inset-0 overflow-visible -z-30 blur-[2px] [container-type:size]">
            <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide-scoped [aspect-ratio:1]">
              <div className="absolute -inset-full w-auto rotate-0 animate-spin-around-scoped [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
            </div>
          </div>
        )}

        <div
          className="absolute -z-20 [background:var(--bg)]"
          style={{ inset: shimmerSize, borderRadius }}
        />

        <InputComp
          className="w-full h-full bg-transparent outline-none border-none relative z-10 text-inherit placeholder:text-cyan-400/50"
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

InteractiveInput.displayName = "InteractiveInput";

export { InteractiveInput, inputVariants };
