"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextHighlighterProps {
  children: React.ReactNode;
  highlightColor?: string;
  highlightOpacity?: number;
  animationDuration?: number;
  animationDelay?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
  type?: "wavy" | "zigzag";
  triggerOnView?: boolean;
  repeat?: boolean;
}

const TextHighlighter: React.FC<TextHighlighterProps> = ({
  children,
  highlightColor = "#ff6b9d",
  highlightOpacity = 1,
  animationDuration = 1.2,
  animationDelay = 0,
  strokeWidth = 2,
  className = "",
  style = {},
  type = "wavy",
  triggerOnView = true,
  repeat = false,
}) => {
  const textRef = React.useRef<HTMLSpanElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const measureText = () => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    };
    measureText();
    window.addEventListener("resize", measureText);
    return () => window.removeEventListener("resize", measureText);
  }, [children]);

  const highlightVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: highlightOpacity,
      transition: {
        pathLength: {
          duration: animationDuration,
          ease: "easeInOut",
          delay: animationDelay,
        },
        opacity: {
          duration: 0.3,
          delay: animationDelay,
        },
      },
    },
  };

  const scaleSVGPath = (
    pathData: string,
    originalWidth: number,
    originalHeight: number,
    targetWidth: number,
    targetHeight: number
  ) => {
    const scaleX = targetWidth / originalWidth;
    const scaleY = targetHeight / originalHeight;
    return pathData.replace(
      /([ML])\s*(\d+(?:\.\d+)?),(\d+(?:\.\d+)?)/g,
      (match, command, x, y) => {
        const scaledX = parseFloat(x) * scaleX;
        const scaledY = parseFloat(y) * scaleY;
        return `${command}${scaledX.toFixed(1)},${scaledY.toFixed(1)}`;
      }
    );
  };

  const renderHighlight = () => {
    if (dimensions.width <= 0) return null;

    const padding = 8;
    const svgWidth = dimensions.width + padding * 2;
    const svgStyle: React.CSSProperties = {
      position: "absolute",
      pointerEvents: "none",
      left: `-${padding}px`,
      overflow: "visible",
    };

    const FIXED_WAVY_HEIGHT = 36;
    const FIXED_ZIGZAG_HEIGHT = 40;

    if (type === "wavy") {
      const originalPath =
        "M274,331 L278,331 L281,331 L285,331 L291,327 L295,324 L298,321 L302,321 L306,317 L309,317 L313,317 L316,314 L319,311 L323,307 L326,303 L334,299 L337,296 L341,296 L344,296 L351,293 L354,289 L358,289 L365,286 L369,286 L372,283 L375,283 L379,283 L386,279 L390,279 L393,279 L397,279 L400,279 L403,279 L410,275 L414,271 L418,271 L421,271 L425,271 L428,271 L431,271 L438,271 L446,271 L449,271 L456,268 L459,268 L463,268 L466,268 L470,268 L474,268 L477,268 L481,268 L484,268 L487,268 L491,268 L494,268 L498,268 L502,268 L505,268 L509,268 L512,268 L515,268 L519,268 L522,268 L526,268 L530,268 L533,268 L537,268 L540,268 L543,268 L547,268 L550,271 L558,275 L561,278 L565,282 L568,288 L575,292 L578,295 L578,299 L578,303 L578,306 L578,310 L578,313 L578,316 L578,320 L578,323 L576,327 L572,331 L572,334 L569,338 L565,344 L562,344 L558,348 L554,348 L551,351 L548,355 L544,355 L541,359 L537,359 L534,359 L530,359 L523,362 L520,362 L513,362 L509,362 L506,362 L502,362 L498,362 L495,362 L492,362 L488,362 L485,359 L485,355 L487,352 L491,349 L491,345 L494,342 L498,335 L505,331 L512,327 L515,324 L519,321 L526,317 L530,317 L533,314 L537,314 L540,314 L543,311 L547,307 L550,307 L558,303 L561,303 L568,299 L571,299 L575,299 L582,296 L586,296 L589,296 L596,293 L599,289 L606,286 L610,286 L614,286 L617,286 L621,286 L624,286 L631,283 L634,283 L638,283 L642,283 L645,283 L649,283 L655,279 L659,279 L662,279 L666,279 L673,279 L680,275 L683,271 L694,268 L698,268 L701,268 L711,265 L715,265 L718,265 L726,265 L729,265 L736,261 L739,261 L743,261 L746,261 L750,261 L754,261 L761,258 L764,255 L767,255 L771,255 L774,255 L778,255 L782,255 L785,255 L789,255 L792,255 L795,255 L799,255 L802,255";
      const originalWidth = 802;
      const originalHeight = 362;
      const svgHeight = FIXED_WAVY_HEIGHT;
      const scaledPath = scaleSVGPath(
        originalPath,
        originalWidth,
        originalHeight,
        svgWidth - padding * 2,
        svgHeight
      );

      return (
        <svg
          className="absolute pointer-events-none"
          style={{
            ...svgStyle,
            bottom: `-${svgHeight * 0.3}px`,
            width: `${svgWidth}px`,
            height: `${svgHeight}px`,
          }}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
        >
          <motion.path
            d={scaledPath}
            stroke={highlightColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={highlightVariants}
            initial="hidden"
            animate={triggerOnView ? "visible" : "hidden"}
            whileInView={triggerOnView ? "visible" : undefined}
            viewport={
              triggerOnView ? { once: !repeat, margin: "-50px" } : undefined
            }
          />
        </svg>
      );
    }

    if (type === "zigzag") {
      const originalPath =
        "M246,507 L250,503 L253,499 L257,499 L263,496 L270,492 L278,489 L285,486 L288,482 L295,485 L298,488 L302,499 L306,503 L306,506 L309,509 L313,509 L316,509 L319,509 L326,507 L334,503 L337,503 L347,499 L351,496 L354,492 L358,489 L365,486 L369,488 L369,491 L369,495 L369,499 L369,503 L369,506 L369,509 L372,513 L375,513 L379,513 L382,513 L393,510 L400,507 L407,503 L418,499 L425,496 L428,496 L438,492 L442,489 L446,491 L446,495 L446,499 L446,503 L449,506 L453,506 L456,506 L466,503 L474,499 L477,496 L481,496 L491,492 L498,489 L505,486 L509,486 L515,482 L519,482 L522,482 L526,485 L526,488 L526,491 L526,495 L526,499 L526,503 L526,506 L530,509 L533,509 L537,507 L540,507 L547,503 L550,499 L554,499 L558,499 L561,499 L565,499 L568,499 L571,499 L578,499 L582,499 L589,499 L593,499 L603,496 L610,492 L614,489 L621,486 L621,488 L618,495 L618,499 L618,503 L618,506 L621,509 L627,507 L634,507 L638,507 L642,503 L645,506 L649,506 L655,509 L659,509 L662,509 L666,509 L670,509 L677,509 L680,509 L683,509 L687,509 L690,509 L694,507 L698,507 L701,507 L705,507 L708,503 L715,499 L718,499 L722,499 L729,496";
      const originalWidth = 729;
      const originalHeight = 513;
      const svgHeight = FIXED_ZIGZAG_HEIGHT;
      const scaledPath = scaleSVGPath(
        originalPath,
        originalWidth,
        originalHeight,
        svgWidth - padding * 2,
        svgHeight
      );

      return (
        <svg
          className="absolute pointer-events-none"
          style={{
            ...svgStyle,
            bottom: `-${svgHeight * 0.2}px`,
            width: `${svgWidth}px`,
            height: `${svgHeight}px`,
          }}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
        >
          <motion.path
            d={scaledPath}
            stroke={highlightColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={highlightVariants}
            initial="hidden"
            animate={!triggerOnView ? "visible" : undefined}
            whileInView={triggerOnView ? "visible" : undefined}
            viewport={
              triggerOnView ? { once: !repeat, margin: "-50px" } : undefined
            }
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <span className={cn("relative inline-block", className)} style={style}>
      <span ref={textRef} className="relative z-10">
        {children}
      </span>
      {renderHighlight()}
    </span>
  );
};

export default TextHighlighter;
