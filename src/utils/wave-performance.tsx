import { useState, useEffect } from "react";
import {
  detectDevicePerformance,
  getWaveSettings,
  WaveSettings,
} from "@/lib/performance";

export function useWavePerformance() {
  const [waveSettings, setWaveSettings] = useState<WaveSettings>({
    arcCount: 4,
    centerGlowIntensity: 0.08,
    speed: 18,
    centerGlowRadius: 300,
    arcSpacing: 580,
    position: "both",
  });

  useEffect(() => {
    const updateWaveSettings = () => {
      const width = window.innerWidth;
      const performance = detectDevicePerformance();
      const settings = getWaveSettings(performance, width);
      setWaveSettings(settings);
    };

    updateWaveSettings();
    window.addEventListener("resize", updateWaveSettings);
    return () => window.removeEventListener("resize", updateWaveSettings);
  }, []);

  return waveSettings;
}
