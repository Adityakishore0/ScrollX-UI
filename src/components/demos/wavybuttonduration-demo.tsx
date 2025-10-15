import WavyButton from "@/components/ui/wavy-button";

export default function WavyButtonDurationDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
      <WavyButton variant="outline" animationDuration={2} splitDelay={0.1}>
        Slow
      </WavyButton>

      <WavyButton variant="outline" animationDuration={0.4} splitDelay={0.02}>
        Fast
      </WavyButton>

      <WavyButton
        variant="outline"
        animationDuration={0.8}
        splitDelay={0.05}
        strokeWidth={40}
      >
        Custom
      </WavyButton>
    </div>
  );
}
