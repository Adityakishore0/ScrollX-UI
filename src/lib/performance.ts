type PerformanceLevel = "low" | "medium" | "high";

export interface WaveSettings {
  arcGlowRadii?: number[];
  arcCount: number;
  centerGlowIntensity: number;
  speed: number;
  centerGlowRadius: number;
  arcGlowIntensities?: number[];
  arcRadii?: number[];
  arcWaveAmps?: number[];
  arcSpacing: number;
  position: "top" | "bottom" | "left" | "right" | "both";
}

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
  };
  mozConnection?: {
    effectiveType?: string;
  };
  webkitConnection?: {
    effectiveType?: string;
  };
}

export function detectDevicePerformance(): PerformanceLevel {
  if (typeof window === "undefined") return "high";

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const nav = navigator as NavigatorWithMemory;
  const memory = nav.deviceMemory;
  const cores = navigator.hardwareConcurrency || 2;

  const connection =
    nav.connection || nav.mozConnection || nav.webkitConnection;
  const effectiveType = connection?.effectiveType;

  if (isMobile) {
    if (memory && memory < 4) return "low";
    if (cores < 4) return "low";
    if (effectiveType === "slow-2g" || effectiveType === "2g") return "low";
    return "medium";
  }

  if (memory && memory < 4) return "low";
  if (cores < 4) return "medium";
  if (effectiveType === "slow-2g" || effectiveType === "2g") return "low";

  return "high";
}

export function getWaveSettings(
  performance: PerformanceLevel,
  width: number
): WaveSettings {
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  if (performance === "low") {
    return {
      arcCount: isMobile ? 1 : 2,
      centerGlowIntensity: 0.01,
      speed: isMobile ? 1 : 5,
      centerGlowRadius: isMobile ? 100 : 150,
      arcRadii: isMobile ? [120] : [180, 210],
      arcWaveAmps: isMobile ? [8] : [12, 12],
      arcSpacing: isMobile ? 180 : 420,
      position: isMobile ? "top" : "both",
    };
  }

  if (performance === "medium") {
    if (isMobile) {
      return {
        arcCount: 2,
        centerGlowIntensity: 0.01,
        speed: 7,
        centerGlowRadius: 0,
        arcRadii: [140, 170],
        arcWaveAmps: [10, 10],
        arcSpacing: 100,
        position: "top",
      };
    }
    if (isTablet) {
      return {
        arcCount: 3,
        centerGlowIntensity: 0.06,
        speed: 6,
        centerGlowRadius: 250,
        arcRadii: [200, 230, 260],
        arcWaveAmps: [15, 15, 13],
        arcSpacing: 500,
        position: "both",
      };
    }
    return {
      arcCount: 3,
      centerGlowIntensity: 0.06,
      speed: 7,
      centerGlowRadius: 250,
      arcRadii: [200, 230, 260],
      arcWaveAmps: [15, 15, 13],
      arcSpacing: 550,
      position: "both",
    };
  }

  if (isMobile) {
    return {
      arcCount: 2,
      centerGlowIntensity: 0.05,
      speed: 3,
      centerGlowRadius: 180,
      arcRadii: [150, 180],
      arcWaveAmps: [12, 12],
      arcSpacing: 220,
      position: "top",
    };
  }

  if (isTablet) {
    return {
      arcCount: 4,
      centerGlowIntensity: 0.07,
      speed: 7,
      centerGlowRadius: 275,
      arcRadii: [220, 250, 280, 310],
      arcWaveAmps: [18, 18, 16, 16],
      arcSpacing: 520,
      position: "both",
    };
  }

  return {
    arcCount: 4,
    arcGlowIntensities: [0.44, 0.03, 0.02, 0.01],
    centerGlowIntensity: 0.08,
    speed: 8,
    centerGlowRadius: 0,
    arcRadii: [250, 280, 310, 340],
    arcWaveAmps: [20, 20, 18, 18],
    arcSpacing: 760,
    position: "top",
  };
}
