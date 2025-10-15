import WavyButton from "@/components/ui/wavy-button";

export default function WavyButtonRadiusDemo() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
      <WavyButton variant="outline" radius="none" size="default">
        None
      </WavyButton>

      <WavyButton variant="outline" radius="sm" size="default">
        Small
      </WavyButton>

      <WavyButton variant="outline" radius="default" size="default">
        Default
      </WavyButton>

      <WavyButton variant="outline" radius="lg" size="default">
        Large
      </WavyButton>
    </div>
  );
}
