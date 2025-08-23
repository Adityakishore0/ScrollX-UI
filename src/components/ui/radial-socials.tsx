"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

interface RadialSocialsContextType {
  animatedIcons: Set<string>;
  rotationStarted: boolean;
  animationDelay: number;
  expandDuration: number;
  calculatePosition: (
    radius: number,
    angle: number
  ) => { x: number; y: number };
}

interface RadialIconData {
  icon: React.ReactNode;
  className?: string;
}

interface RadialSocialsProps {
  children: React.ReactNode;
  className?: string;
  animationDelay?: number;
  expandDuration?: number;
}

interface RadialSocialsContentProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

interface RadialCircularProps {
  children: React.ReactNode;
  radius: number;
  duration?: number;
  className?: string;
  circleLineClassName?: string;
  startAngle?: number;
}

interface RadialIconProps extends RadialIconData {
  className?: string;
  angle?: number;
}

interface InternalRadialCircularProps extends RadialCircularProps {
  circleIndex?: number;
  globalIconStartIndex?: number;
}

interface InternalRadialIconProps extends RadialIconProps {
  radius?: number;
  iconIndex?: number;
  circleIndex?: number;
  totalIcons?: number;
  globalIconIndex?: number;
  duration?: number;
}

interface RadialSocialsContentInternalProps extends RadialSocialsContentProps {
  setTotalIcons?: (count: number) => void;
}

const RadialSocialsContext = createContext<RadialSocialsContextType | null>(
  null
);

const useRadialSocials = () => {
  const context = useContext(RadialSocialsContext);
  if (!context) {
    throw new Error(
      "RadialSocials components must be used within RadialSocials"
    );
  }
  return context;
};

const RadialIcon = React.forwardRef<HTMLDivElement, InternalRadialIconProps>(
  (
    {
      icon,
      className,
      radius = 80,
      iconIndex = 0,
      circleIndex = 0,
      totalIcons = 1,
      globalIconIndex = 0,
      duration = 20,
      angle,
      ...props
    },
    ref
  ) => {
    const {
      animatedIcons,
      expandDuration,
      calculatePosition,
      rotationStarted,
    } = useRadialSocials();
    const iconAngle =
      angle !== undefined ? angle : (360 / totalIcons) * iconIndex;
    const position = calculatePosition(radius, iconAngle);
    const isAnimated = animatedIcons.has(globalIconIndex.toString());

    return (
      <div
        ref={ref}
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          marginLeft: `-20px`,
          marginTop: `-20px`,
          transform: isAnimated
            ? `translate(${position.x}px, ${position.y}px) scale(1)`
            : "translate(0px, 0px) scale(0)",
          transition: `transform ${expandDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
          opacity: isAnimated ? 1 : 0,
        }}
        {...props}
      >
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/90 text-card-foreground hover:bg-card hover:text-card-foreground transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-border/50 shadow-lg",
            className
          )}
          style={{
            animation: rotationStarted
              ? `counter-rotate-${circleIndex} ${duration}s linear infinite`
              : "none",
          }}
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
    );
  }
);

const RadialCircular = React.forwardRef<
  HTMLDivElement,
  InternalRadialCircularProps
>(
  (
    {
      children,
      radius,
      duration = 20,
      className,
      circleLineClassName,
      circleIndex = 0,
      globalIconStartIndex = 0,
      startAngle = 0,
      ...props
    },
    ref
  ) => {
    const { rotationStarted } = useRadialSocials();

    const icons = React.Children.toArray(children).filter(
      (child): child is React.ReactElement<InternalRadialIconProps> =>
        React.isValidElement(child) && child.type === RadialIcon
    );

    return (
      <div ref={ref} className="absolute inset-0" {...props}>
        <div
          className={cn(
            "absolute rounded-full border-2 border-black/30 dark:border-white/30",
            circleLineClassName,
            className
          )}
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            left: "50%",
            top: "50%",
            marginLeft: `-${radius}px`,
            marginTop: `-${radius}px`,
            boxShadow:
              "0 0 10px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.1)",
          }}
        />

        <div
          className="absolute"
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            left: "50%",
            top: "50%",
            marginLeft: `-${radius}px`,
            marginTop: `-${radius}px`,
            animation: rotationStarted
              ? `rotate-${circleIndex} ${duration}s linear infinite`
              : "none",
          }}
        >
          {React.Children.map(children, (child, iconIndex) => {
            if (
              React.isValidElement<InternalRadialIconProps>(child) &&
              child.type === RadialIcon
            ) {
              return React.cloneElement(child, {
                radius,
                iconIndex,
                circleIndex,
                totalIcons: icons.length,
                globalIconIndex: globalIconStartIndex + iconIndex,
                duration,
                key: `${circleIndex}-${iconIndex}`,
              });
            }
            return child;
          })}
        </div>
      </div>
    );
  }
);

const RadialSocials = React.forwardRef<HTMLDivElement, RadialSocialsProps>(
  (
    {
      children,
      className,
      animationDelay = 150,
      expandDuration = 800,
      ...props
    },
    ref
  ) => {
    const [animatedIcons, setAnimatedIcons] = useState<Set<string>>(new Set());
    const [rotationStarted, setRotationStarted] = useState(false);
    const [totalIcons, setTotalIcons] = useState(0);

    const calculatePosition = (radius: number, angle: number) => {
      const radian = (angle * Math.PI) / 180;
      return {
        x: Math.cos(radian) * radius,
        y: Math.sin(radian) * radius,
      };
    };

    useEffect(() => {
      if (totalIcons > 0) {
        setAnimatedIcons(new Set());

        Array.from({ length: totalIcons }, (_, index) => index).forEach(
          (index) => {
            setTimeout(() => {
              setAnimatedIcons((prev) => new Set([...prev, index.toString()]));
            }, index * animationDelay);
          }
        );

        const totalAnimationTime = totalIcons * animationDelay + expandDuration;
        setTimeout(() => {
          setRotationStarted(true);
        }, totalAnimationTime);
      }
    }, [totalIcons, animationDelay, expandDuration]);

    const contextValue: RadialSocialsContextType = {
      animatedIcons,
      rotationStarted,
      animationDelay,
      expandDuration,
      calculatePosition,
    };

    return (
      <RadialSocialsContext.Provider value={contextValue}>
        <div ref={ref} className={cn("w-full h-full", className)} {...props}>
          {React.Children.map(children, (child) => {
            if (
              React.isValidElement<RadialSocialsContentInternalProps>(child)
            ) {
              return React.cloneElement(child, { setTotalIcons });
            }
            return child;
          })}
        </div>
      </RadialSocialsContext.Provider>
    );
  }
);

const RadialSocialsContent = React.forwardRef<
  HTMLDivElement,
  RadialSocialsContentInternalProps
>(
  (
    { children, className, containerClassName, setTotalIcons, ...props },
    ref
  ) => {
    const circles = React.Children.toArray(children).filter(
      (child): child is React.ReactElement<InternalRadialCircularProps> =>
        React.isValidElement(child) && child.type === RadialCircular
    );

    useEffect(() => {
      let totalIconCount = 0;

      circles.forEach((circle) => {
        const icons = React.Children.toArray(circle.props.children).filter(
          (child): child is React.ReactElement<InternalRadialIconProps> =>
            React.isValidElement(child) && child.type === RadialIcon
        );
        totalIconCount += icons.length;
      });

      if (setTotalIcons) {
        setTotalIcons(totalIconCount);
      }
    }, [children, setTotalIcons, circles]);

    let cumulativeIconCount = 0;
    const circlesWithIconCount = circles.map((circle) => {
      const icons = React.Children.toArray(circle.props.children).filter(
        (child): child is React.ReactElement<InternalRadialIconProps> =>
          React.isValidElement(child) && child.type === RadialIcon
      );
      const startIndex = cumulativeIconCount;
      cumulativeIconCount += icons.length;
      return { circle, startIndex, iconCount: icons.length };
    });

    return (
      <>
        <div
          ref={ref}
          className={cn(
            "w-full h-full flex items-center justify-center p-4",
            containerClassName
          )}
          {...props}
        >
          <div
            className={cn(
              "relative aspect-square w-full max-w-md flex items-center justify-center",
              className
            )}
          >
            {circlesWithIconCount.map(({ circle, startIndex }, circleIndex) => {
              return React.cloneElement(circle, {
                circleIndex,
                globalIconStartIndex: startIndex,
                key: circleIndex,
              });
            })}
          </div>
        </div>

        <style jsx>{`
          ${circles
            .map(
              (_, index) => `
            @keyframes rotate-${index} {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes counter-rotate-${index} {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
          `
            )
            .join("\n")}
        `}</style>
      </>
    );
  }
);

RadialSocials.displayName = "RadialSocials";
RadialSocialsContent.displayName = "RadialSocialsContent";
RadialCircular.displayName = "RadialCircular";
RadialIcon.displayName = "RadialIcon";

export {
  RadialSocials,
  RadialSocialsContent,
  RadialCircular,
  RadialIcon,
  type RadialSocialsProps,
  type RadialSocialsContentProps,
  type RadialCircularProps,
  type RadialIconProps,
  type RadialIconData,
};
