"use client";
import { useEffect, useRef, useState } from "react";
import { useSpring } from "@react-spring/web";
import createGlobe from "cobe";

interface Marker {
  location: [number, number];
  size: number;
}

interface GlobeProps {
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
  markers?: Marker[];
  scale?: number;
  className?: string;
  rotateToLocation?: string | [number, number];
  autoRotate?: boolean;
  rotateCities?: string[];
  rotationSpeed?: number;
}

const cityCoordinates: Record<string, [number, number]> = {
  "san francisco": [37.7749, -122.4194],
  "new york": [40.7128, -74.006],
  london: [51.5074, -0.1278],
  tokyo: [35.6762, 139.6503],
  paris: [48.8566, 2.3522],
  moscow: [55.7558, 37.6176],
  dubai: [25.2048, 55.2708],
  singapore: [1.3521, 103.8198],
};

const locationToAngles = (lat: number, long: number): [number, number] => [
  Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
  (lat * Math.PI) / 180,
];

interface GlobeRenderer {
  destroy: () => void;
}

export default function Globe({
  baseColor = [0.3, 0.3, 0.3],
  markerColor = [0.1, 0.8, 1],
  glowColor = [1, 1, 1],
  markers = [
    { location: [37.7595, -122.4367], size: 0.03 },
    { location: [40.7128, -74.006], size: 0.1 },
  ],
  scale = 1,
  className = "aspect-square w-full max-w-[600px]",
  rotateToLocation,
  autoRotate = true,
  rotateCities = [],
  rotationSpeed = 3000,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const focusRef = useRef<[number, number] | null>(null);
  const phiRef = useRef(0);
  const rotationInterval = useRef<NodeJS.Timeout | null>(null);
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const globeRef = useRef<GlobeRenderer | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, []);

  useEffect(() => {
    if (rotateCities.length === 0) return;

    const rotateToNextCity = () => {
      const nextIndex = (currentCityIndex + 1) % rotateCities.length;
      const city = rotateCities[nextIndex].toLowerCase();
      const coordinates = cityCoordinates[city];

      if (coordinates) {
        focusRef.current = locationToAngles(...coordinates);
        setCurrentCityIndex(nextIndex);
      }
    };

    if (isVisible) {
      const city = rotateCities[currentCityIndex].toLowerCase();
      const coordinates = cityCoordinates[city];
      if (coordinates) {
        focusRef.current = locationToAngles(...coordinates);
      }

      rotationInterval.current = setInterval(rotateToNextCity, rotationSpeed);
    }

    return () => {
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current);
      }
    };
  }, [rotateCities, currentCityIndex, rotationSpeed, isVisible]);

  useEffect(() => {
    if (!rotateToLocation) {
      focusRef.current = null;
      return;
    }

    let coordinates: [number, number];
    if (typeof rotateToLocation === "string") {
      const city = rotateToLocation.toLowerCase();
      coordinates = cityCoordinates[city] || [0, 0];
    } else {
      coordinates = rotateToLocation;
    }

    focusRef.current = locationToAngles(...coordinates);
  }, [rotateToLocation]);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    let width = canvasRef.current.offsetWidth || 300;
    const doublePi = Math.PI * 2;
    let currentPhi = 0;
    let currentTheta = 0;
    const animationFrame: number | null = null;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth || 300;
      }
    };

    window.addEventListener("resize", onResize);

    try {
      globeRef.current = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: baseColor || [0.3, 0.3, 0.3],
        markerColor: markerColor || [0.1, 0.8, 1],
        glowColor: glowColor || [1, 1, 1],
        markers: markers || [],
        scale: scale || 1,
        onRender: (state) => {
          if (!state) return;

          if (autoRotate && !pointerInteracting.current && !focusRef.current) {
            phiRef.current += 0.01;
          }

          if (focusRef.current) {
            const [focusPhi, focusTheta] = focusRef.current;
            const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
            const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;

            currentPhi +=
              distPositive < distNegative
                ? distPositive * 0.08
                : -distNegative * 0.08;
            currentTheta = currentTheta * 0.92 + focusTheta * 0.08;
          } else {
            currentPhi = phiRef.current + r.get();
          }

          state.phi = currentPhi;
          state.theta = focusRef.current ? currentTheta : 0;
          state.width = width * 2;
          state.height = width * 2;
        },
      });

      if (canvasRef.current) {
        setTimeout(() => {
          if (canvasRef.current) canvasRef.current.style.opacity = "1";
        }, 100);
      }
    } catch (error) {
      console.error("Error creating globe:", error);
    }

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
      window.removeEventListener("resize", onResize);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [
    baseColor,
    markerColor,
    glowColor,
    markers,
    scale,
    r,
    autoRotate,
    isVisible,
  ]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          canvasRef.current?.style?.setProperty("cursor", "grabbing");
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current?.style?.setProperty("cursor", "grab");
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current?.style?.setProperty("cursor", "grab");
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({ r: delta / 200 });
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({ r: delta / 100 });
          }
        }}
        className="w-full h-full cursor-grab opacity-0 transition-opacity duration-1000"
        style={{ contain: "layout paint size" }}
      />
    </div>
  );
}
