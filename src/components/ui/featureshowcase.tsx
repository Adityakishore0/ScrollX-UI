"use client";
import React, {
  useRef,
  useEffect,
  ReactNode,
  useState,
  useCallback,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import { RefreshCw as RefreshCwIcon } from "lucide-react";

interface FeatureShowcaseProps {
  texts: string[];
  mediaContent: ReactNode;
  videoLength?: number;
  videoPosition?: "left" | "right";
}

interface AnimatedTextProps {
  text: string;
  index: number;
  textCount: number;
  scrollYProgress: MotionValue<number>;
}

const AnimatedText = ({
  text,
  index,
  textCount,
  scrollYProgress,
}: AnimatedTextProps) => {
  const rangeStart = 0.5 + (0.5 / textCount) * index;
  const rangeEnd = rangeStart + (0.5 / textCount) * 0.6;

  const opacity = useTransform(scrollYProgress, [rangeStart, rangeEnd], [0, 1]);
  const y = useTransform(scrollYProgress, [rangeStart, rangeEnd], [30, 0]);

  return (
    <motion.div style={{ opacity }}>
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-950 dark:text-yellow-100"
        style={{ y }}
      >
        {text}
      </motion.h2>
    </motion.div>
  );
};

const FeatureShowcase = ({
  texts,
  mediaContent,
  videoLength = 3,
  videoPosition = "right",
}: FeatureShowcaseProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState(videoLength);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [showReloadIcon, setShowReloadIcon] = useState(false);
  const scrollRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const manualProgress = useMotionValue(0);

  useEffect(() => {
    setIsVideoReady(false);
    setIsAutoPlaying(false);
    setShowReloadIcon(false);
    manualProgress.set(0);

    const video = videoRef.current;

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    };
  }, [manualProgress]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      scrollRef.current = value;
      setShowReloadIcon(value >= 0.999);

      if (isAutoPlaying && value < 0.999) {
        setIsAutoPlaying(false);
        videoRef.current?.pause();
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, isAutoPlaying]);

  const getVideoTimeFromScroll = useCallback(
    (scrollPos: number) => {
      if (scrollPos < 0.3) return scrollPos * videoDuration;
      if (scrollPos < 0.5)
        return (0.3 + ((scrollPos - 0.3) / 0.2) * 0.3) * videoDuration;
      return (0.6 + ((scrollPos - 0.5) / 0.5) * 0.4) * videoDuration;
    },
    [videoDuration]
  );

  const handleVideoReady = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const setVideoState = () => {
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.currentTime = 0;
      setVideoDuration(video.duration);
      setIsVideoReady(true);
    };

    if (video.readyState > 3) {
      setVideoState();
    } else {
      video.addEventListener("loadedmetadata", setVideoState);
      video.addEventListener("canplaythrough", setVideoState);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    handleVideoReady();
    const errorHandler = () => console.error("Video error");

    video.addEventListener("error", errorHandler);
    return () => video.removeEventListener("error", errorHandler);
  }, [handleVideoReady]);

  useEffect(() => {
    const updateVideoFrame = () => {
      if (videoRef.current && isVideoReady && !isAutoPlaying) {
        const targetTime = getVideoTimeFromScroll(scrollRef.current);
        if (Math.abs(videoRef.current.currentTime - targetTime) > 0.05) {
          videoRef.current.currentTime = targetTime;
        }
      }
      rafRef.current = requestAnimationFrame(updateVideoFrame);
    };

    if (isVideoReady) {
      rafRef.current = requestAnimationFrame(updateVideoFrame);
    }
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isVideoReady, isAutoPlaying, getVideoTimeFromScroll]);

  useEffect(() => {
    if (!isAutoPlaying || !videoRef.current) return;

    let rafId: number;
    const updateProgress = () => {
      if (videoRef.current) {
        const progress =
          videoRef.current.currentTime / videoRef.current.duration;
        manualProgress.set(progress);
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    return () => cancelAnimationFrame(rafId);
  }, [isAutoPlaying, manualProgress]);

  const handleReload = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isVideoReady) return;

    try {
      setIsAutoPlaying(true);
      video.currentTime = 0;
      await video.play();
      setShowReloadIcon(false);
    } catch (error) {
      setIsAutoPlaying(false);
      console.error("Autoplay failed:", error);
    }
  }, [isVideoReady]);

  const stickyOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const progressBarWidth = useTransform(() =>
    isAutoPlaying
      ? `${manualProgress.get() * 100}%`
      : `${scrollYProgress.get() * 100}%`
  );

  return (
    <div
      ref={containerRef}
      className="relative h-[400vh]"
      style={{ scrollBehavior: "smooth" }}
    >
      <motion.div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ opacity: stickyOpacity }}
      >
        <div
          key={`${videoPosition}-${isVideoReady}`}
          className="w-full max-w-6xl mx-auto px-4"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div
              className={`w-full md:w-1/2 ${
                videoPosition === "left" ? "md:order-2" : "md:order-1"
              } order-2 md:order-1 flex flex-col mt-4 md:mt-0`}
            >
              <div className="space-y-2">
                {texts.map((text, index) => (
                  <AnimatedText
                    key={index}
                    text={text}
                    index={index}
                    textCount={texts.length}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
            <motion.div
              className={`w-full md:w-1/2 ${
                videoPosition === "left" ? "md:order-1" : "md:order-2"
              } order-1 md:order-2`}
              style={{ y: parallaxY, opacity: contentOpacity }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                {React.isValidElement(mediaContent) &&
                  React.cloneElement(mediaContent as React.ReactElement, {
                    ref: videoRef,
                    className: "w-full h-full object-cover",
                    muted: true,
                    playsInline: true,
                    preload: "auto",
                    onPlay: () => setIsAutoPlaying(true),
                    onPause: () => setIsAutoPlaying(false),
                  })}
                {showReloadIcon && (
                  <motion.button
                    onClick={handleReload}
                    className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/75 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RefreshCwIcon className="w-6 h-6 text-white animate-spin-once" />
                  </motion.button>
                )}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-pink-500"
                  style={{ width: progressBarWidth }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeatureShowcase;
