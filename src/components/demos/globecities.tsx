"use client";
import Globe from "@/components/ui/globe";

export default function GlobeCities() {
  return (
    <Globe
      rotateCities={["new york", "london", "tokyo", "dubai", "paris"]}
      rotationSpeed={2000}
      markers={[
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [51.5074, -0.1278], size: 0.1 },
        { location: [35.6762, 139.6503], size: 0.1 },
        { location: [25.2048, 55.2708], size: 0.1 },
        { location: [48.8566, 2.3522], size: 0.1 },
      ]}
      glowColor={[0.1, 0.8, 1]}
      markerColor={[0.1, 0.8, 1]}
    />
  );
}
