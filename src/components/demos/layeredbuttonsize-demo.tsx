import { LayeredButton } from "@/components/ui/layered-button";

export default function LayeredButtonSizeDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <LayeredButton size="sm">Small</LayeredButton>
      <LayeredButton size="default">Default</LayeredButton>
      <LayeredButton size="lg">Large</LayeredButton>
    </div>
  );
}
