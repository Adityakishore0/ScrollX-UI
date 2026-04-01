'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
  opacity: number;
  zIndex: number;
  rotate: number;
  scale: number;
}

interface SquonkCtx {
  size: number;
  radius: number;
  CX: number;
  FLOOR: number;
  boxes: Box[];
  elasticity: number;
  bounceHeight: number;
  squashAmount: number;
  stretchAmount: number;
}

const SquonkContext = React.createContext<SquonkCtx | null>(null);

function easeIn(t: number) {
  return t * t * t;
}
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeBounce(t: number) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) {
    return n1 * t * t;
  } else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75;
  } else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375;
  } else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function compute(
  p: number,
  W: number,
  H: number,
  FLOOR: number,
  CX: number,
  ABOVE: number,
  elasticity: number,
  bounceHeight: number,
  squashAmount: number,
  stretchAmount: number,
) {
  const pFall = 0.28,
    pSquish = 0.44,
    pRebound = 0.54,
    pSink = 0.8,
    pSettle = 0.89;

  const actualSquash = squashAmount * elasticity;
  const actualStretch = stretchAmount * elasticity;
  const actualBounce = bounceHeight * elasticity;

  let ground: Box = {
    x: CX,
    y: FLOOR,
    w: W,
    h: H,
    opacity: 1,
    zIndex: 1,
    rotate: 0,
    scale: 1,
  };
  let faller: Box = {
    x: CX,
    y: ABOVE,
    w: W,
    h: H,
    opacity: 0,
    zIndex: 2,
    rotate: 0,
    scale: 1,
  };

  if (p < pFall) {
    const tp = easeIn(p / pFall);
    faller = {
      x: CX,
      y: lerp(ABOVE, FLOOR - H, tp),
      w: W,
      h: H,
      opacity: 1,
      zIndex: 2,
      rotate: 0,
      scale: 1,
    };
  } else if (p < pSquish) {
    const tp = (p - pFall) / (pSquish - pFall);
    const squish = Math.sin(tp * Math.PI);
    const gH = H - squish * actualSquash;
    const gW = W + squish * actualStretch;
    const gX = CX - (gW - W) / 2;
    const gY = FLOOR + (H - gH);
    ground = {
      x: gX,
      y: gY,
      w: gW,
      h: gH,
      opacity: 1,
      zIndex: 1,
      rotate: 0,
      scale: 1,
    };
    faller = {
      x: CX,
      y: gY - H,
      w: W,
      h: H,
      opacity: 1,
      zIndex: 2,
      rotate: 0,
      scale: 1,
    };
  } else if (p < pRebound) {
    const tp = easeOut((p - pSquish) / (pRebound - pSquish));
    const gH = lerp(H, H - actualSquash * 0.24, tp);
    const gY = FLOOR + (H - gH);
    const bounce = Math.sin(tp * Math.PI) * actualBounce;
    ground = {
      x: CX,
      y: gY,
      w: W,
      h: gH,
      opacity: 1,
      zIndex: 1,
      rotate: 0,
      scale: 1,
    };
    faller = {
      x: CX,
      y: gY - H - bounce,
      w: W,
      h: H,
      opacity: 1,
      zIndex: 2,
      rotate: 0,
      scale: 1,
    };
  } else if (p < pSink) {
    const tp = easeInOut((p - pRebound) / (pSink - pRebound));
    const gH = lerp(H - actualSquash * 0.24, 0, tp);
    const gY = FLOOR + (H - gH);
    ground = {
      x: CX,
      y: gY,
      w: W,
      h: gH,
      opacity: 1,
      zIndex: 1,
      rotate: 0,
      scale: 1,
    };
    faller = {
      x: CX,
      y: gY - H,
      w: W,
      h: H,
      opacity: 1,
      zIndex: 2,
      rotate: 0,
      scale: 1,
    };
  } else if (p < pSettle) {
    const tp = easeOut((p - pSink) / (pSettle - pSink));
    const squish = Math.sin(tp * Math.PI) * 0.4;
    const nH = H - squish * actualSquash * 0.2;
    const nW = W + squish * actualStretch * 0.2;
    const nX = CX - (nW - W) / 2;
    const nY = FLOOR + (H - nH);
    ground = {
      x: CX,
      y: ABOVE,
      w: W,
      h: H,
      opacity: 0,
      zIndex: 1,
      rotate: 0,
      scale: 1,
    };
    faller = {
      x: nX,
      y: nY,
      w: nW,
      h: nH,
      opacity: 1,
      zIndex: 2,
      rotate: 0,
      scale: 1,
    };
  } else {
    const tp = easeInOut((p - pSettle) / (1 - pSettle));
    const settleSquish = Math.sin(easeOut(1) * Math.PI) * 0.4;
    const startH = H - settleSquish * actualSquash * 0.2;
    const startW = W + settleSquish * actualStretch * 0.2;
    const startX = CX - (startW - W) / 2;
    const startY = FLOOR + (H - startH);
    ground = {
      x: CX,
      y: ABOVE,
      w: W,
      h: H,
      opacity: lerp(0, 1, tp),
      zIndex: 1,
      rotate: 0,
      scale: 1,
    };
    faller = {
      x: lerp(startX, CX, tp),
      y: lerp(startY, FLOOR, tp),
      w: lerp(startW, W, tp),
      h: lerp(startH, H, tp),
      opacity: 1,
      zIndex: 2,
      rotate: 0,
      scale: 1,
    };
  }

  return { ground, faller };
}

interface SquonkProps extends React.ComponentProps<'div'> {
  size?: number;
  radius?: number;
  cycleDuration?: number;
  elasticity?: number;
  bounceHeight?: number;
  squashAmount?: number;
  stretchAmount?: number;
  easing?: 'linear' | 'bounce' | 'smooth';
}

function Squonk({
  className,
  children,
  size = 96,
  radius,
  cycleDuration = 4000,
  elasticity = 1,
  bounceHeight,
  squashAmount,
  stretchAmount,
  easing = 'linear',
  ...props
}: SquonkProps) {
  const W = size,
    H = size;
  const FLOOR = size * 2.2;
  const CX = size * 0.18;
  const ABOVE = -(size * 1.5);

  const finalRadius = radius ?? size * 0.23;
  const finalBounceHeight = bounceHeight ?? size * 0.094;
  const finalSquashAmount = squashAmount ?? size * 0.365;
  const finalStretchAmount = stretchAmount ?? size * 0.302;

  const childrenArray = React.Children.toArray(children);
  const N = childrenArray.length;

  const rafRef = React.useRef<number>(0);
  const t0Ref = React.useRef<number | null>(null);
  const prevPRef = React.useRef(0);
  const groundIndexRef = React.useRef(0);
  const fallerIndexRef = React.useRef(1);

  const [boxes, setBoxes] = React.useState<Box[]>(() => {
    const initialBoxes: Box[] = [];
    for (let i = 0; i < N; i++) {
      if (i === 0) {
        initialBoxes.push({
          x: CX,
          y: FLOOR,
          w: W,
          h: H,
          opacity: 1,
          zIndex: 1,
          rotate: 0,
          scale: 1,
        });
      } else if (i === 1) {
        initialBoxes.push({
          x: CX,
          y: ABOVE,
          w: W,
          h: H,
          opacity: 0,
          zIndex: 2,
          rotate: 0,
          scale: 1,
        });
      } else {
        initialBoxes.push({
          x: CX,
          y: ABOVE,
          w: W,
          h: H,
          opacity: 0,
          zIndex: 0,
          rotate: 0,
          scale: 1,
        });
      }
    }
    return initialBoxes;
  });

  React.useEffect(() => {
    if (N < 2) return;

    const tick = (ts: number) => {
      if (!t0Ref.current) t0Ref.current = ts;
      const p = clamp(
        ((ts - t0Ref.current) % cycleDuration) / cycleDuration,
        0,
        1,
      );

      let easedP = p;
      if (easing === 'bounce') {
        easedP = easeBounce(p);
      } else if (easing === 'smooth') {
        easedP = easeInOut(p);
      }

      if (prevPRef.current > 0.92 && p < 0.05) {
        groundIndexRef.current = (groundIndexRef.current + 1) % N;
        fallerIndexRef.current = (fallerIndexRef.current + 1) % N;
      }
      prevPRef.current = p;

      const { ground, faller } = compute(
        easedP,
        W,
        H,
        FLOOR,
        CX,
        ABOVE,
        elasticity,
        finalBounceHeight,
        finalSquashAmount,
        finalStretchAmount,
      );

      setBoxes((prev) => {
        const newBoxes = [...prev];
        newBoxes[groundIndexRef.current] = { ...ground, zIndex: 1 };
        newBoxes[fallerIndexRef.current] = { ...faller, zIndex: 2 };

        for (let i = 0; i < N; i++) {
          if (i !== groundIndexRef.current && i !== fallerIndexRef.current) {
            newBoxes[i] = { ...newBoxes[i], opacity: 0, zIndex: 0 };
          }
        }

        return newBoxes;
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [
    W,
    H,
    cycleDuration,
    N,
    FLOOR,
    CX,
    ABOVE,
    elasticity,
    finalBounceHeight,
    finalSquashAmount,
    finalStretchAmount,
    easing,
  ]);

  React.useEffect(() => {
    if (N < 2) return;
    setBoxes((prev) => {
      const newBoxes = [...prev];
      while (newBoxes.length < N) {
        newBoxes.push({
          x: CX,
          y: ABOVE,
          w: W,
          h: H,
          opacity: 0,
          zIndex: 0,
          rotate: 0,
          scale: 1,
        });
      }
      while (newBoxes.length > N) {
        newBoxes.pop();
      }
      return newBoxes;
    });
  }, [N, W, H, CX, ABOVE]);

  return (
    <SquonkContext.Provider
      value={{
        size,
        radius: finalRadius,
        CX,
        FLOOR,
        boxes,
        elasticity,
        bounceHeight: finalBounceHeight,
        squashAmount: finalSquashAmount,
        stretchAmount: finalStretchAmount,
      }}
    >
      <div
        data-slot='squonk'
        className={cn('flex justify-center items-end', className)}
        {...props}
      >
        <div
          style={{
            position: 'relative',
            width: W + CX + 20,
            height: FLOOR + H,
            overflow: 'hidden',
          }}
        >
          {childrenArray.map((child, idx) => (
            <div key={idx} data-slot={`squonk-slot-${idx}`} data-index={idx}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </SquonkContext.Provider>
  );
}

function SquonkContent({
  className,
  style,
  children,
  index,
  ...props
}: React.ComponentProps<'div'> & { index: number }) {
  const ctx = React.useContext(SquonkContext);
  if (!ctx) return null;

  const { boxes, radius } = ctx;
  const b = boxes[index];
  if (!b) return null;

  return (
    <div
      data-slot='squonk-content'
      className={cn('absolute overflow-hidden', className)}
      style={{
        left: b.x,
        top: b.y,
        width: b.w,
        height: Math.max(0, b.h),
        borderRadius: Math.min(radius, Math.max(0, b.h) * 0.3),
        opacity: b.opacity,
        zIndex: b.zIndex,
        transform: `rotate(${b.rotate}deg) scale(${b.scale})`,
        transformOrigin: 'bottom center',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export { Squonk, SquonkContent };
