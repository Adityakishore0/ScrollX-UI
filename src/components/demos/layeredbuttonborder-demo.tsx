import { LayeredButton } from "@/components/ui/layered-button";

export default function LayeredButtonBorderDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <LayeredButton borderWidth={2}>Thin Border</LayeredButton>
      <LayeredButton borderWidth={4}>Medium Border</LayeredButton>
      <LayeredButton borderWidth={6}>Thick Border</LayeredButton>
    </div>
  );
}
