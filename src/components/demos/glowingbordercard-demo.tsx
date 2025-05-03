import GlowingBorderCard from "@/components/ui/glowingbordercard";

export default function GlowingBorderCardDemo() {
  return (
    <div className="space-y-6 p-6">
      <GlowingBorderCard
        title="Glowing Border Card"
        description="Hover over this card to see the glowing border effect"
        fromColor="pink-600"
        toColor="purple-600"
      />
    </div>
  );
}
