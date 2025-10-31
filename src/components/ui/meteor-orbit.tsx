"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SocialIcon {
  icon: React.ReactNode;
  orbitIndex?: number;
  position?: number;
}

interface MeteorOrbitProps {
  icons?: SocialIcon[];
  children?: React.ReactNode;
  rippleCount?: number;
  meteorSpeed?: number;
  size?: number;
  className?: string;
  meteorClassName?: string | string[];
  meteorGradients?: [string, string][];
}

export function MeteorOrbit({
  icons = [],
  children,
  rippleCount = 5,
  meteorSpeed = 4,
  size = 500,
  className,
  meteorClassName = "",
  meteorGradients = [],
}: MeteorOrbitProps) {
  const [animatedIcons, setAnimatedIcons] = useState<Set<number>>(new Set());
  const uniqueId = React.useId();

  React.useEffect(() => {
    icons.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedIcons((prev) => new Set([...prev, index]));
      }, index * 150);
    });
  }, [icons]);

  const baseInset = 40;
  const rippleBoxes = Array.from({ length: rippleCount }, (_, i) => {
    const insetPercent = baseInset - i * 8;
    const radiusPercent = 50 - insetPercent;
    return {
      inset: `${insetPercent}%`,
      radius: (size / 2) * (radiusPercent / 50),
      zIndex: 99 - i,
      delay: i * 0.3,
      opacity: 1 - i * 0.15,
    };
  });

  const calculatePosition = (
    index: number,
    total: number,
    radius: number,
    customAngle?: number
  ) => {
    const angle =
      customAngle !== undefined ? customAngle : (360 / total) * index;
    const radian = (angle * Math.PI) / 180;
    return { x: Math.cos(radian) * radius, y: Math.sin(radian) * radius };
  };

  const iconsByOrbit = icons.reduce((acc, icon, index) => {
    const orbitIdx = icon.orbitIndex ?? 0;
    if (!acc[orbitIdx]) acc[orbitIdx] = [];
    acc[orbitIdx].push({ ...icon, originalIndex: index });
    return acc;
  }, {} as Record<number, Array<SocialIcon & { originalIndex: number }>>);

  const normalizedMeteorClass = Array.isArray(meteorClassName)
    ? meteorClassName
    : [meteorClassName];

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0">
        {rippleBoxes.map((box, i) => (
          <div
            key={`ripple-${i}`}
            className="absolute rounded-full border-2 border-border/50"
            style={{
              width: box.radius * 2,
              height: box.radius * 2,
              left: "50%",
              top: "50%",
              marginLeft: -box.radius,
              marginTop: -box.radius,
              zIndex: box.zIndex,
              opacity: box.opacity,
              background: "transparent",
            }}
          >
            <motion.svg
              className="absolute"
              style={{
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
              viewBox={`0 0 ${box.radius * 2} ${box.radius * 2}`}
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: meteorSpeed + i * 0.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2,
              }}
            >
              <defs>
                <linearGradient
                  id={`${uniqueId}-gradient-${i}`}
                  gradientUnits="userSpaceOnUse"
                  x1={box.radius}
                  y1={0}
                  x2={box.radius + box.radius * Math.cos(Math.PI / 3)}
                  y2={box.radius + box.radius * Math.sin(Math.PI / 3)}
                >
                  {meteorGradients[i] ? (
                    <>
                      <stop
                        offset="0%"
                        stopColor={`${meteorGradients[i][0]}00`}
                      />
                      <stop
                        offset="60%"
                        stopColor={`${meteorGradients[i][0]}99`}
                      />
                      <stop offset="100%" stopColor={meteorGradients[i][1]} />
                    </>
                  ) : (
                    <>
                      <stop offset="0%" stopColor="rgba(34,211,238,0)" />
                      <stop offset="60%" stopColor="rgba(34,211,238,0.6)" />
                      <stop offset="100%" stopColor="rgba(34,211,238,1)" />
                    </>
                  )}
                </linearGradient>
              </defs>
              <path
                d={`M ${box.radius} 0 A ${box.radius} ${box.radius} 0 0 1 ${
                  box.radius + box.radius * Math.cos(Math.PI / 3)
                } ${box.radius + box.radius * Math.sin(Math.PI / 3)}`}
                stroke={`url(#${uniqueId}-gradient-${i})`}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                className={cn(
                  normalizedMeteorClass[i % normalizedMeteorClass.length]
                )}
              />
            </motion.svg>
          </div>
        ))}
      </div>

      {Object.entries(iconsByOrbit).map(([orbitIdx, orbitIcons]) => {
        const orbitIndex = Math.min(parseInt(orbitIdx), rippleBoxes.length - 1);
        const iconRippleRadius = rippleBoxes[orbitIndex].radius;
        return (
          <div
            key={`orbit-${orbitIdx}`}
            className="absolute"
            style={{
              width: iconRippleRadius * 2,
              height: iconRippleRadius * 2,
              left: "50%",
              top: "50%",
              marginLeft: -iconRippleRadius,
              marginTop: -iconRippleRadius,
              zIndex: 101 + parseInt(orbitIdx),
            }}
          >
            {orbitIcons.map((social, localIndex) => {
              const position = calculatePosition(
                localIndex,
                orbitIcons.length,
                iconRippleRadius,
                social.position
              );
              const isAnimated = animatedIcons.has(social.originalIndex);
              return (
                <div
                  key={`icon-${social.originalIndex}`}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: -24,
                    marginTop: -24,
                    transform: isAnimated
                      ? `translate(${position.x}px, ${position.y}px) scale(1)`
                      : "translate(0px,0px) scale(0)",
                    transition:
                      "transform 800ms cubic-bezier(0.34,1.56,0.64,1)",
                    opacity: isAnimated ? 1 : 0,
                  }}
                >
                  <motion.div
                    className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-full bg-background text-foreground border border-border shadow-lg"
                    )}
                    whileHover={{ scale: 1.2 }}
                  >
                    {social.icon}
                  </motion.div>
                </div>
              );
            })}
          </div>
        );
      })}

      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-[200] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.8, type: "spring" }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </div>
  );
}
