import { MorphyButton } from "@/components/ui/morphy-button";

export default function MorphyButtonSizeDemo() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
      <MorphyButton size="sm">Small</MorphyButton>
      <MorphyButton size="default">Default</MorphyButton>
      <MorphyButton size="lg">Large</MorphyButton>
    </div>
  );
}
