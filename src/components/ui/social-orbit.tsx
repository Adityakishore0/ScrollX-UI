"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SocialIcon {
  icon: React.ReactNode;
  orbitIndex?: number;
  position?: number;
}

interface SocialOrbitProps {
  icons?: SocialIcon[];
  text?: string;
  textClassName?: string;
  textOrbitIndex?: number;
  children?: React.ReactNode;
  rippleCount?: number;
  rippleDuration?: number;
  textDuration?: number;
  iconDelay?: number;
  iconDuration?: number;
  orbitDuration?: number;
  size?: number;
  className?: string;
}

export function SocialOrbit({
  icons = [],
  text = "",
  textClassName = "",
  textOrbitIndex = 2,
  children,
  rippleCount = 5,
  rippleDuration = 2,
  textDuration = 20,
  iconDelay = 150,
  iconDuration = 800,
  orbitDuration = 30,
  size = 500,
  className = "",
}: SocialOrbitProps) {
  const [animatedIcons, setAnimatedIcons] = useState<Set<number>>(new Set());
  const [rotationStarted, setRotationStarted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    icons.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedIcons((prev) => new Set([...prev, index]));
      }, index * iconDelay);
    });
    const totalAnimationTime = icons.length * iconDelay + iconDuration;
    setTimeout(() => setRotationStarted(true), totalAnimationTime);
  }, [icons, iconDelay, iconDuration]);

  const baseInset = 40;
  const rippleBoxes = Array.from({ length: rippleCount }, (_, i) => {
    const insetPercent = baseInset - i * 8;
    const radiusPercent = 50 - insetPercent;
    return {
      inset: `${insetPercent}%`,
      radius: (size / 2) * (radiusPercent / 50),
      zIndex: 99 - i,
      delay: i * 0.2,
      opacity: 1 - i * 0.15,
    };
  });

  const textRippleIndex = Math.min(textOrbitIndex, rippleBoxes.length - 1);
  const textRippleRadius = rippleBoxes[textRippleIndex].radius;
  const letters = Array.from(text);

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

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0">
        {rippleBoxes.map((box, i) => (
          <motion.div
            key={`ripple-${i}`}
            className="absolute rounded-full border-2 border-border/50 bg-gradient-to-b from-muted/10 to-muted/20"
            style={{
              width: box.radius * 2,
              height: box.radius * 2,
              left: "50%",
              top: "50%",
              marginLeft: -box.radius,
              marginTop: -box.radius,
              zIndex: box.zIndex,
              opacity: box.opacity,
            }}
            animate={{
              scale: [1, 1.15, 1],
              boxShadow: [
                "rgba(0,0,0,0.3) 0px 10px 10px 0px",
                "rgba(0,0,0,0.3) 0px 30px 20px 0px",
                "rgba(0,0,0,0.3) 0px 10px 10px 0px",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: rippleDuration,
              delay: box.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {text && (
        <motion.div
          className="absolute cursor-pointer"
          style={{
            width: textRippleRadius * 2,
            height: textRippleRadius * 2,
            left: "50%",
            top: "50%",
            marginLeft: -textRippleRadius,
            marginTop: -textRippleRadius,
            zIndex: 100,
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: rotationStarted ? [0, 360] : 0,
          }}
          transition={{
            scale: {
              repeat: Infinity,
              duration: rippleDuration,
              delay: rippleBoxes[textRippleIndex].delay,
              ease: "easeInOut",
            },
            rotate: {
              repeat: Infinity,
              duration: isHovering ? textDuration / 4 : textDuration,
              ease: "linear",
            },
          }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          {letters.map((letter, i) => {
            const angle = (360 / letters.length) * i;
            const radian = (angle * Math.PI) / 180;
            const x = Math.cos(radian) * textRippleRadius;
            const y = Math.sin(radian) * textRippleRadius;
            return (
              <div
                key={`letter-${i}`}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
              >
                <motion.span
                  className={cn(
                    "inline-block text-lg font-bold text-foreground/90 transition-all duration-300 hover:text-foreground hover:scale-110",
                    textClassName
                  )}
                  style={{
                    animation: rotationStarted
                      ? `counter-orbit ${
                          isHovering ? textDuration / 4 : textDuration
                        }s linear infinite`
                      : "none",
                  }}
                >
                  {letter}
                </motion.span>
              </div>
            );
          })}
        </motion.div>
      )}

      {Object.entries(iconsByOrbit).map(([orbitIdx, orbitIcons]) => {
        const orbitIndex = Math.min(parseInt(orbitIdx), rippleBoxes.length - 1);
        const iconRippleRadius = rippleBoxes[orbitIndex].radius;
        return (
          <motion.div
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
            animate={{
              scale: [1, 1.15, 1],
              rotate: rotationStarted ? [0, 360] : 0,
            }}
            transition={{
              scale: {
                repeat: Infinity,
                duration: rippleDuration,
                delay: rippleBoxes[orbitIndex].delay,
                ease: "easeInOut",
              },
              rotate: {
                repeat: Infinity,
                duration: orbitDuration,
                ease: "linear",
              },
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
                    transition: `transform ${iconDuration}ms cubic-bezier(0.34,1.56,0.64,1)`,
                    opacity: isAnimated ? 1 : 0,
                  }}
                >
                  <motion.div
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-background text-foreground border border-border shadow-lg"
                    style={{
                      animation: rotationStarted
                        ? `counter-orbit ${orbitDuration}s linear infinite`
                        : "none",
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    {social.icon}
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
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

      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes counter-orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
