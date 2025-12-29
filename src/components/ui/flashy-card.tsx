"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FlashyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  onStateChange?: (isActive: boolean) => void;
  disabled?: boolean;
  iconClassName?: string;
  rippleClassName?: string;
  glareClassName?: string;
  defaultSrc?: string;
  activeSrc?: string;
  activeType?: "image" | "video";
}

interface FlashyCardContentProps {
  children: React.ReactNode;
}

const FlashyCardDefault: React.FC<FlashyCardContentProps> = ({ children }) => {
  return <>{children}</>;
};

const FlashyCardActive: React.FC<FlashyCardContentProps> = ({ children }) => {
  return <>{children}</>;
};

const FlashyCard = React.forwardRef<HTMLDivElement, FlashyCardProps>(
  (
    {
      children,
      className,
      onStateChange,
      disabled = false,
      iconClassName,
      rippleClassName,
      glareClassName,
      defaultSrc,
      activeSrc,
      activeType,
      ...props
    },
    ref
  ) => {
    const [isSelected, setIsSelected] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    const glareRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    React.useImperativeHandle(ref, () => cardRef.current as HTMLDivElement);

    const childArray = React.Children.toArray(children);
    const defaultContentChild = childArray.find(
      (child) => React.isValidElement(child) && child.type === FlashyCardDefault
    );
    const activeContentChild = childArray.find(
      (child) => React.isValidElement(child) && child.type === FlashyCardActive
    );

    const defaultContent =
      defaultContentChild ||
      (defaultSrc && (
        <div className="aspect-[4/3] relative">
          <img
            src={defaultSrc}
            alt="Default content"
            className="w-full h-full object-cover"
          />
        </div>
      ));

    const isVideo = (src: string) => {
      const videoExtensions = [".mp4", ".webm", ".ogg", ".mov"];
      return videoExtensions.some((ext) => src.toLowerCase().endsWith(ext));
    };

    const shouldShowVideo =
      activeType === "video" ||
      (!activeType && activeSrc && isVideo(activeSrc));

    useEffect(() => {
      if (shouldShowVideo && videoRef.current) {
        const video = videoRef.current;
        video.load();
        const handleCanPlay = () => setVideoReady(true);
        video.addEventListener("canplay", handleCanPlay);
        return () => video.removeEventListener("canplay", handleCanPlay);
      }
    }, [shouldShowVideo]);

    const activeContent =
      activeContentChild ||
      (activeSrc && (
        <div className="aspect-[4/3] relative">
          {shouldShowVideo ? (
            <video
              key="active-video"
              ref={videoRef}
              src={activeSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={activeSrc}
              alt="Active content"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ));

    const handleClick = () => {
      if (isAnimating || disabled) return;

      setIsAnimating(true);

      const card = cardRef.current;

      if (!isSelected) {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }

        if (card) {
          card.style.transition =
            "border-color 300ms ease, box-shadow 300ms ease";
          card.style.borderColor = "hsl(var(--primary))";
          card.style.boxShadow = "0 25px 50px -12px hsl(var(--primary) / 0.3)";
        }

        setTimeout(() => {
          const el = glareRef.current;
          if (el) {
            el.style.transition = "none";
            el.style.backgroundPosition = "-100% -100%, 0 0";

            requestAnimationFrame(() => {
              el.style.transition = "650ms ease";
              el.style.backgroundPosition = "100% 100%, 0 0";
            });
          }
        }, 300);

        setTimeout(() => {
          setIsSelected(true);
          setIsAnimating(false);
          onStateChange?.(true);
        }, 950);
      } else {
        if (card) {
          card.style.transition =
            "border-color 300ms ease, box-shadow 300ms ease";
          card.style.borderColor = "hsl(var(--border))";
          card.style.boxShadow = "none";
        }

        setTimeout(() => {
          const el = glareRef.current;
          if (el) {
            el.style.transition = "none";
            el.style.backgroundPosition = "-100% -100%, 0 0";

            requestAnimationFrame(() => {
              el.style.transition = "650ms ease";
              el.style.backgroundPosition = "100% 100%, 0 0";
            });
          }
        }, 300);

        setTimeout(() => {
          setIsSelected(false);
          setIsAnimating(false);
          onStateChange?.(false);
        }, 950);
      }
    };

    return (
      <div
        ref={cardRef}
        className={cn(
          "relative rounded-xl bg-card border-2 transition-all duration-300",
          isSelected ? "border-primary shadow-2xl" : "border-border",
          className
        )}
        {...props}
      >
        <div
          ref={glareRef}
          className={cn(
            "absolute inset-0 pointer-events-none z-20 rounded-xl",
            glareClassName
          )}
          style={{
            background:
              "linear-gradient(-45deg, hsla(0,0%,0%,0) 60%, rgba(255,255,255,0.5) 70%, hsla(0,0%,0%,0) 100%)",
            backgroundSize: "250% 250%, 100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "-100% -100%, 0 0",
          }}
        />

        <div className="relative rounded-xl overflow-hidden bg-card">
          <div
            className={cn(
              "transition-opacity duration-300",
              isSelected ? "opacity-100" : "opacity-0 absolute inset-0"
            )}
          >
            {activeContent}
          </div>
          <div
            className={cn(
              "transition-opacity duration-300",
              !isSelected ? "opacity-100" : "opacity-0 absolute inset-0"
            )}
          >
            {defaultContent}
          </div>
        </div>

        {shouldShowVideo && !isSelected && (
          <div className="absolute inset-0 pointer-events-none opacity-0 -z-10">
            <video
              src={activeSrc}
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="relative h-0 z-30">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30">
            {!isButtonHovered && !isSelected && !disabled && (
              <div
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 z-30 pointer-events-none",
                  rippleClassName
                )}
              >
                <div
                  className="absolute inset-0 border-2 border-primary/30 rounded-full"
                  style={{
                    animation:
                      "ripple 2.5s cubic-bezier(0, 0.2, 0.8, 1) infinite",
                  }}
                />
                <div
                  className="absolute inset-0 border-2 border-primary/40 rounded-full"
                  style={{
                    animation:
                      "ripple 2.5s cubic-bezier(0, 0.2, 0.8, 1) infinite 0.5s",
                  }}
                />
                <div
                  className="absolute inset-0 border-2 border-primary/50 rounded-full"
                  style={{
                    animation: "ripple 2.5s ease-out infinite 1s",
                  }}
                />
              </div>
            )}

            <button
              onClick={handleClick}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              disabled={isAnimating || disabled}
              aria-label={isSelected ? "Deactivate card" : "Activate card"}
              className={cn(
                "relative z-40 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300",
                isAnimating || disabled ? "opacity-50 cursor-not-allowed" : "",
                isButtonHovered || isSelected
                  ? "bg-primary shadow-lg shadow-primary/50 hover:scale-110 active:scale-95"
                  : "bg-transparent border-2 border-primary/50",
                iconClassName
              )}
            >
              <svg
                className={cn(
                  "w-7 h-7 transition-colors duration-300",
                  isButtonHovered || isSelected
                    ? "text-primary-foreground"
                    : "text-primary"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                {isSelected ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes ripple {
            0% {
              transform: scale(0.5);
              opacity: 1;
            }
            100% {
              transform: scale(3);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  }
);

FlashyCard.displayName = "FlashyCard";
FlashyCardDefault.displayName = "FlashyCardDefault";
FlashyCardActive.displayName = "FlashyCardActive";

export { FlashyCard, FlashyCardDefault, FlashyCardActive };
