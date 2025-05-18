import FeatureShowcase from "@/components/ui/featureshowcase";

export default function FeatureShowcaseDemo() {
  return (
    <FeatureShowcase
      texts={[
        '"INNOVATION MEETS',
        "PRECISION IN EVERY",
        "FRAME WE CREATE",
        "FOR TOMORROW'S",
        'VISIONARIES"',
      ]}
      videoLength={3}
      mediaContent={
        <video
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          style={{ backgroundColor: "#000" }}
        >
          <source src="/assets/Scrollmagic.mp4" type="video/mp4" />
        </video>
      }
    />
  );
}
