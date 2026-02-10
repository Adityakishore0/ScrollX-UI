'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface TextModifierProps extends React.HTMLAttributes<HTMLDivElement> {
  highlightColorClass?: string;
  markerColorClass?: string;
  opacity?: number;
  animationDuration?: number;
  animationDelay?: number;
  animate?: boolean;
  triggerOnView?: boolean;
  repeat?: boolean;
  padding?: string;
}

const TextModifier: React.FC<TextModifierProps> = ({
  children,
  highlightColorClass = 'bg-yellow-200',
  markerColorClass = 'bg-yellow-500',
  opacity = 0.8,
  animationDuration = 0.6,
  animationDelay = 0,
  animate = true,
  triggerOnView = true,
  repeat = false,
  padding = '0.125rem 0.375rem',
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(!triggerOnView);
  const textRef = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!triggerOnView || !textRef.current) return;
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!repeat && observerRef.current) observerRef.current.disconnect();
        } else if (repeat) setIsVisible(false);
      },
      { threshold: 0.1, rootMargin: '-50px' },
    );
    observerRef.current.observe(textRef.current);
    return () => observerRef.current?.disconnect();
  }, [triggerOnView, repeat]);

  const shouldAnimate = animate && isVisible;
  const markerSize = 8;

  const renderMarkers = () => {
    const lineLength = 25;
    const offset = 4;
    return (
      <>
        <motion.span
          className='absolute'
          style={{ top: '-9px', left: `-${offset}px` }}
          initial={{ opacity: 0, y: -5 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
          transition={{
            duration: 0.3,
            delay: animationDelay + animationDuration * 0.8,
            ease: 'easeOut',
          }}
        >
          <span
            className={`block rounded-full ${markerColorClass}`}
            style={{ width: `${markerSize}px`, height: `${markerSize}px` }}
          />
          <span
            className={`block ${markerColorClass}`}
            style={{
              width: '2px',
              height: `${lineLength}px`,
              marginLeft: `${(markerSize - 2) / 2}px`,
            }}
          />
        </motion.span>
        <motion.span
          className='absolute'
          style={{ bottom: '-9px', right: `-${offset}px` }}
          initial={{ opacity: 0, y: 5 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
          transition={{
            duration: 0.3,
            delay: animationDelay + animationDuration,
            ease: 'easeOut',
          }}
        >
          <span
            className={`block ${markerColorClass}`}
            style={{
              width: '2px',
              height: `${lineLength}px`,
              marginLeft: `${(markerSize - 2) / 2}px`,
            }}
          />
          <span
            className={`block rounded-full ${markerColorClass}`}
            style={{ width: `${markerSize}px`, height: `${markerSize}px` }}
          />
        </motion.span>
      </>
    );
  };

  const textContent = (
    <span ref={textRef} className={`relative ${className}`}>
      {children}
    </span>
  );

  const content = (
    <span className='relative inline' style={{ padding }}>
      <motion.span
        className={`${highlightColorClass} rounded`}
        style={{
          opacity,
          boxDecorationBreak: 'clone',
          WebkitBoxDecorationBreak: 'clone',
          padding: '0.125rem 0.25rem',
          display: 'inline',
        }}
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity } : { opacity: 0 }}
        transition={{
          duration: animationDuration,
          delay: animationDelay,
          ease: 'easeOut',
        }}
      >
        {textContent}
      </motion.span>
      {renderMarkers()}
    </span>
  );

  return <div {...props}>{content}</div>;
};

export default TextModifier;
