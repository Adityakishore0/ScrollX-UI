import WavyButton from "@/components/ui/wavy-button";

export default function WavyButtonSizesDemo() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <WavyButton variant="outline" size="sm" radius="default">
        Small
      </WavyButton>

      <WavyButton variant="outline" size="default" radius="default">
        Default
      </WavyButton>

      <WavyButton variant="outline" size="lg" radius="default">
        Large
      </WavyButton>

      <WavyButton variant="outline" size="xl" radius="default">
        XL
      </WavyButton>
    </div>
  );
}
