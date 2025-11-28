import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type ElectricTextProps = {
  children: React.ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  strokeWidth?: number;
  className?: string;
  glowIntensity?: "low" | "medium" | "high";
  fillColor?: string;
  showFill?: boolean;
};

function hexToRgba(hex: string, alpha = 1): string {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  let h = hex.replace("#", "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const int = parseInt(h, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const ElectricText: React.FC<ElectricTextProps> = ({
  children,
  color = "#5227FF",
  speed = 1,
  chaos = 1,
  strokeWidth = 2,
  className = "",
  glowIntensity = "medium",
  fillColor = "rgba(0,0,0,0.8)",
  showFill = true,
}) => {
  const rawId = useId().replace(/[:]/g, "");
  const filterId = `text-turbulent-${rawId}`;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [svgFontSize, setSvgFontSize] = useState(120);

  const updateAnim = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const dyAnims = Array.from(
      svg.querySelectorAll<SVGAnimateElement>(
        'feOffset > animate[attributeName="dy"]'
      )
    );
    const dxAnims = Array.from(
      svg.querySelectorAll<SVGAnimateElement>(
        'feOffset > animate[attributeName="dx"]'
      )
    );

    const baseDur = 6;
    const dur = Math.max(0.001, baseDur / (speed || 1));
    [...dyAnims, ...dxAnims].forEach((a) => a.setAttribute("dur", `${dur}s`));

    const disp = svg.querySelector("feDisplacementMap");
    if (disp) disp.setAttribute("scale", String(30 * (chaos || 1)));

    requestAnimationFrame(() => {
      [...dyAnims, ...dxAnims].forEach((a: SVGAnimateElement) => {
        if (typeof a.beginElement === "function") {
          try {
            a.beginElement();
          } catch {}
        }
      });
    });
  }, [speed, chaos]);

  useEffect(() => {
    updateAnim();
  }, [updateAnim]);

  useLayoutEffect(() => {
    if (measureRef.current) {
      const computedStyle = window.getComputedStyle(measureRef.current);
      const fontSize = parseFloat(computedStyle.fontSize);
      const scaledSize = Math.max(60, Math.min(200, fontSize * 3));
      setSvgFontSize(scaledSize);
    }
    setTimeout(updateAnim, 10);
  }, [children, strokeWidth, className, updateAnim]);

  const glowSettings = {
    low: {
      blur1: 10,
      blur2: 2,
      blur3: 1,
      opacity1: 0.2,
      opacity2: 0.5,
      opacity3: 0.6,
    },
    medium: {
      blur1: 20,
      blur2: 4,
      blur3: 2,
      opacity1: 0.3,
      opacity2: 0.7,
      opacity3: 0.8,
    },
    high: {
      blur1: 32,
      blur2: 8,
      blur3: 4,
      opacity1: 0.5,
      opacity2: 0.9,
      opacity3: 1,
    },
  }[glowIntensity];

  return (
    <div className={cn("relative inline-block", className)}>
      <div
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none whitespace-nowrap"
      >
        {children}
      </div>
      <svg
        ref={svgRef}
        viewBox="0 0 1000 300"
        className="w-full h-full block"
        style={{ overflow: "visible" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              result="noise1"
              seed="1"
            />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate
                attributeName="dy"
                values="700; 0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              result="noise2"
              seed="1"
            />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate
                attributeName="dy"
                values="0; -700"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              result="noise3"
              seed="2"
            />
            <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
              <animate
                attributeName="dx"
                values="490; 0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              result="noise4"
              seed="2"
            />
            <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
              <animate
                attributeName="dx"
                values="0; -490"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend
              in="part1"
              in2="part2"
              mode="color-dodge"
              result="combinedNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>

        {showFill && (
          <>
            <text
              x="500"
              y="150"
              dominantBaseline="central"
              textAnchor="middle"
              stroke={hexToRgba(color, glowSettings.opacity1)}
              strokeWidth={strokeWidth * 3}
              fill="none"
              fontSize={svgFontSize}
              fontWeight="bold"
              style={{ filter: `blur(${glowSettings.blur1}px)` }}
            >
              {children}
            </text>

            <text
              x="500"
              y="150"
              dominantBaseline="central"
              textAnchor="middle"
              stroke={hexToRgba(color, 0.6)}
              strokeWidth={strokeWidth * 1.5}
              fill="none"
              fontSize={svgFontSize}
              fontWeight="bold"
              style={{
                filter: `blur(${glowSettings.blur2}px)`,
                opacity: glowSettings.opacity2,
              }}
            >
              {children}
            </text>
          </>
        )}

        <text
          x="500"
          y="150"
          dominantBaseline="central"
          textAnchor="middle"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          fontSize={svgFontSize}
          fontWeight="bold"
          filter={`url(#${filterId})`}
        >
          {children}
        </text>

        {showFill && (
          <>
            <text
              x="500"
              y="150"
              dominantBaseline="central"
              textAnchor="middle"
              stroke={color}
              strokeWidth={strokeWidth * 0.5}
              fill="none"
              fontSize={svgFontSize}
              fontWeight="bold"
              style={{
                filter: `blur(${glowSettings.blur3}px)`,
                opacity: glowSettings.opacity3,
              }}
            >
              {children}
            </text>

            <text
              x="500"
              y="150"
              dominantBaseline="central"
              textAnchor="middle"
              fill={fillColor}
              fontSize={svgFontSize}
              fontWeight="bold"
            >
              {children}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

export { ElectricText };
