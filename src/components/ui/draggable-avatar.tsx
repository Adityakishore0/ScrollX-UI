'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, PanInfo } from 'motion/react';

interface DraggableAvatarProps {
  image?: string;
  borderColor?: string;
  range?: number;
  size?: number;
}

export default function DraggableAvatar({
  image = 'https://cdn.pixabay.com/photo/2023/06/26/04/38/ai-generated-8088680_1280.jpg',
  borderColor = '#60A5FA',
  range = 300,
  size = 100,
}: DraggableAvatarProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [constraints, setConstraints] = useState({
    left: -range,
    right: range,
    top: -range,
    bottom: range,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<HTMLDivElement>(null);
  const lineLength = 45;
  const lineLengthHolding = 30;
  const markerSize = 12;

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const maxX = Math.min(range, window.innerWidth - rect.left - size);
        const maxY = Math.min(
          range,
          window.innerHeight - rect.top - size - lineLength - markerSize,
        );
        const minX = Math.max(-range, -rect.left);
        const minY = Math.max(-range, -rect.top);

        setConstraints({
          left: minX,
          right: maxX,
          top: minY,
          bottom: maxY,
        });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [range, size, lineLength, markerSize]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    setIsHolding(false);
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);

    if (distance > range && motionRef.current) {
      const angle = Math.atan2(info.offset.y, info.offset.x);
      const newX = Math.cos(angle) * range;
      const newY = Math.sin(angle) * range;

      motionRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    }
  };

  const currentLineLength = isHolding ? lineLengthHolding : lineLength;

  return (
    <div ref={containerRef} className='relative'>
      <motion.div
        ref={motionRef}
        drag
        dragElastic={0}
        dragMomentum={false}
        dragConstraints={constraints}
        onPointerDown={() => setIsHolding(true)}
        onPointerUp={() => setIsHolding(false)}
        onDragEnd={handleDragEnd}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        className='cursor-grab active:cursor-grabbing relative'
        style={{ width: size, height: size }}
        whileTap={{ scale: 1.05 }}
      >
        <motion.div
          className='relative w-full h-full rounded-full overflow-hidden'
          style={{
            border: `3px solid ${borderColor}`,
          }}
          animate={{
            boxShadow: isHolding
              ? '0 20px 50px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.15)'
              : '0 8px 30px rgba(0,0,0,0.12)',
          }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={image}
            alt='Avatar'
            className='w-full h-full object-cover'
            draggable={false}
          />
        </motion.div>

        <motion.span
          className='absolute left-1/2'
          style={{
            bottom: `-${currentLineLength + markerSize + 4}px`,
            transform: 'translateX(-50%)',
          }}
          animate={{
            bottom: `-${currentLineLength + markerSize + 4}px`,
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            className='block'
            style={{
              width: '2px',
              backgroundColor: borderColor,
              marginLeft: `${(markerSize - 2) / 2}px`,
            }}
            animate={{
              height: `${currentLineLength}px`,
            }}
            transition={{ duration: 0.2 }}
          />
          <span
            className='block rounded-full'
            style={{
              width: `${markerSize}px`,
              height: `${markerSize}px`,
              backgroundColor: borderColor,
            }}
          />
        </motion.span>
      </motion.div>
    </div>
  );
}
