"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Laptop, Moon, Sun } from "lucide-react";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

interface MediaContent {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
  autoplay?: boolean;
  link?: string;
  linkTarget?: "_blank" | "_self";
}

interface FlexNavbarProps {
  logo?: React.ReactNode;
  brandName?: string;
  tagline?: string;
  launchText?: string;
  navLinks?: NavLink[];
  media?: MediaContent;
  mediaButtonText?: string;
  onMediaClick?: () => void;
  collapsedWidth?: string;
  collapsedMaxWidth?: string;
  collapsedHeight?: string;
  expandedWidth?: string;
  expandedMaxWidth?: string;
  expandedHeight?: string;
  expandedHeightMobile?: string;
  animationDuration?: number;
  animationEasing?: number[];
  showThemeToggle?: boolean;
  onExpand?: (isExpanded: boolean) => void;
}

const FlexNavbar: React.FC<FlexNavbarProps> = ({
  logo = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn(
        "shrink-0 w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black dark:text-white"
      )}
    >
      <path
        fill="currentColor"
        d="M5.999 17a3 3 0 0 1-1.873-.658a2.98 2.98 0 0 1-1.107-2.011a2.98 2.98 0 0 1 .639-2.206l4-5c.978-1.225 2.883-1.471 4.143-.523l1.674 1.254l2.184-2.729a3 3 0 1 1 4.682 3.747l-4 5c-.977 1.226-2.882 1.471-4.143.526l-1.674-1.256l-2.184 2.729A2.98 2.98 0 0 1 5.999 17M10 8a1 1 0 0 0-.781.374l-4 5.001a1 1 0 0 0-.213.734c.03.266.161.504.369.67a.996.996 0 0 0 1.406-.155l3.395-4.244L13.4 12.8c.42.316 1.056.231 1.381-.176l4-5.001a1 1 0 0 0 .213-.734a1 1 0 0 0-.369-.67a.996.996 0 0 0-1.406.156l-3.395 4.242L10.6 8.2A1 1 0 0 0 10 8m9 13H5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2"
      />
    </svg>
  ),
  brandName = "STARTUP",
  tagline = "The helpful software company",
  launchText = "Launching 2026",
  navLinks = [
    { label: "Technology", href: "#technology" },
    { label: "Company", href: "#company" },
    { label: "Careers", href: "#careers" },
    { label: "Journal", href: "#journal" },
    { label: "Beta", href: "#beta" },
  ],
  media = {
    type: "video",
    src: "https://www.pexels.com/download/video/3254009/",
    alt: "Our story",
  },
  mediaButtonText = "Our story",
  onMediaClick,
  collapsedWidth = "90vw",
  collapsedMaxWidth = "20rem",
  collapsedHeight = "3.75rem",
  expandedWidth = "95vw",
  expandedMaxWidth = "48.75rem",
  expandedHeight = "28rem",
  expandedHeightMobile = "33rem",
  animationDuration = 0.5,
  animationEasing = [0.4, 0, 0.2, 1],
  showThemeToggle = true,
  onExpand,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showMediaControls, setShowMediaControls] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);

    if (!newState && media.type === "video" && videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
      setShowMediaControls(true);
    }

    onExpand?.(newState);
  };

  const handleMediaClick = () => {
    if (media.link && (media.type === "image" || !isVideoPlaying)) {
      window.open(media.link, media.linkTarget || "_blank");
      return;
    }

    if (media.type === "video" && videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
        setShowMediaControls(true);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
        setShowMediaControls(false);
      }
    }
    if (onMediaClick) {
      onMediaClick();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={cn("fixed inset-0 bg-black/50 z-40")}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={false}
        animate={
          isExpanded
            ? {
                width: expandedWidth,
                maxWidth: expandedMaxWidth,
                minHeight: isMobile ? expandedHeightMobile : expandedHeight,
                borderRadius: "0.5rem",
              }
            : {
                width: collapsedWidth,
                maxWidth: collapsedMaxWidth,
                height: collapsedHeight,
                borderRadius: "0.875rem",
              }
        }
        transition={{ duration: animationDuration, ease: animationEasing }}
        className={cn(
          "fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-black shadow-lg z-50 overflow-hidden"
        )}
        style={{ top: isMobile ? "1rem" : "2rem" }}
      >
        <div
          className={cn("absolute z-10")}
          style={{
            top: isMobile ? "0.75rem" : "1rem",
            left: isMobile ? "1rem" : "1.5rem",
            right: isMobile ? "1rem" : "1.5rem",
          }}
        >
          <div className={cn("flex justify-between items-center relative")}>
            <div className={cn("flex-shrink-0")}>{logo}</div>

            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 font-medium tracking-tight text-black dark:text-white"
              )}
              style={{ fontSize: isMobile ? "1rem" : "1.125rem" }}
            >
              {brandName}
            </div>

            <motion.button
              onClick={handleToggle}
              className={cn(
                "flex items-center justify-center flex-shrink-0 relative"
              )}
              style={{ width: "2rem", height: "2rem" }}
              aria-label={isExpanded ? "Close menu" : "Open menu"}
            >
              <motion.span
                className={cn("absolute w-full bg-black dark:bg-white")}
                style={{ height: "0.125rem" }}
                animate={{
                  rotate: isExpanded ? 45 : 0,
                  y: isExpanded ? 0 : -3,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className={cn("absolute w-full bg-black dark:bg-white")}
                style={{ height: "0.125rem" }}
                animate={{
                  opacity: isExpanded ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className={cn("absolute w-full bg-black dark:bg-white")}
                style={{ height: "0.125rem" }}
                animate={{
                  rotate: isExpanded ? -45 : 0,
                  y: isExpanded ? 0 : 3,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              style={{
                paddingTop: isMobile ? "4rem" : "5rem",
                paddingLeft: isMobile ? "1.5rem" : "3.75rem",
                paddingRight: isMobile ? "1.5rem" : "3.75rem",
                paddingBottom: isMobile ? "2.5rem" : "2.5rem",
              }}
            >
              <div
                className={cn("flex flex-col")}
                style={{ gap: isMobile ? "1rem" : "1.5rem" }}
              >
                <div
                  className={cn("flex flex-col md:flex-row")}
                  style={{ gap: isMobile ? "1.5rem" : "5rem" }}
                >
                  <div
                    className={cn("flex flex-col")}
                    style={{ gap: isMobile ? "0.75rem" : "1rem" }}
                  >
                    {navLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className={cn(
                          "font-medium text-gray-900 dark:text-gray-50 hover:text-gray-600 dark:hover:text-gray-300 transition-colors whitespace-nowrap"
                        )}
                        style={{ fontSize: isMobile ? "1.25rem" : "1.875rem" }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>

                  <div className={cn("flex-1 min-w-0")}>
                    <div
                      className={cn(
                        "relative rounded-xl overflow-hidden bg-slate-700 dark:bg-slate-800 aspect-video w-full cursor-pointer"
                      )}
                      onMouseEnter={() => setShowMediaControls(true)}
                      onMouseLeave={() =>
                        isVideoPlaying && setShowMediaControls(false)
                      }
                      onClick={() => {
                        if (media.type === "image" || !isVideoPlaying) {
                          handleMediaClick();
                        } else {
                          setShowMediaControls(true);
                        }
                      }}
                    >
                      {media.type === "video" ? (
                        <>
                          <video
                            ref={videoRef}
                            src={media.src}
                            poster={media.poster}
                            className={cn("w-full h-full object-cover")}
                            loop
                            muted
                            playsInline
                            preload="auto"
                            autoPlay={media.autoplay}
                            onPlay={() => setIsVideoPlaying(true)}
                            onPause={() => setIsVideoPlaying(false)}
                          />
                          <AnimatePresence>
                            {showMediaControls && (
                              <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={(e: React.MouseEvent) => {
                                  e.stopPropagation();
                                  handleMediaClick();
                                }}
                                className={cn(
                                  "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 dark:bg-white/90 hover:bg-white text-black dark:text-black rounded-full font-medium flex items-center transition-colors"
                                )}
                                style={{
                                  paddingLeft: isMobile ? "1.25rem" : "1.75rem",
                                  paddingRight: isMobile
                                    ? "1.25rem"
                                    : "1.75rem",
                                  paddingTop: isMobile ? "0.5rem" : "0.75rem",
                                  paddingBottom: isMobile
                                    ? "0.5rem"
                                    : "0.75rem",
                                  fontSize: isMobile ? "0.75rem" : "0.875rem",
                                  gap: "0.5rem",
                                }}
                              >
                                <span style={{ fontSize: "0.75rem" }}>
                                  {isVideoPlaying ? "⏸" : "▶"}
                                </span>
                                {mediaButtonText}
                              </motion.button>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <>
                          <img
                            src={media.src}
                            alt={media.alt || "Media content"}
                            className={cn("w-full h-full object-cover")}
                          />
                          {media.link && (
                            <div
                              className={cn(
                                "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 dark:bg-white/90 hover:bg-white text-black dark:text-black rounded-full font-medium flex items-center transition-colors"
                              )}
                              style={{
                                paddingLeft: isMobile ? "1.25rem" : "1.75rem",
                                paddingRight: isMobile ? "1.25rem" : "1.75rem",
                                paddingTop: isMobile ? "0.5rem" : "0.75rem",
                                paddingBottom: isMobile ? "0.5rem" : "0.75rem",
                                fontSize: isMobile ? "0.75rem" : "0.875rem",
                                gap: "0.5rem",
                              }}
                            >
                              {mediaButtonText}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex flex-row justify-between items-center w-full gap-2 sm:gap-4 text-gray-400 dark:text-gray-500 text-xs sm:text-sm"
                  )}
                >
                  <div className={cn("hidden sm:block flex-shrink-0")}>
                    {tagline}
                  </div>
                  <div className={cn("flex-shrink-0")}>{launchText}</div>
                  {showThemeToggle && (
                    <div className={cn("flex-shrink-0")}>
                      <ThemeSwitch
                        variant="icon-click"
                        modes={["light", "dark", "system"]}
                        icons={[
                          <Sun key="sun-icon" size={16} />,
                          <Moon key="moon-icon" size={16} />,
                          <Laptop key="laptop-icon" size={16} />,
                        ]}
                        showInactiveIcons="all"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export { FlexNavbar };
