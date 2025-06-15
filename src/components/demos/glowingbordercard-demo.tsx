import GlowingBorderCard from "@/components/ui/glowingbordercard";

export default function GlowingBorderCardDemo() {
  return (
    <GlowingBorderCard
      className="w-80 h-72"
      fromColor="purple-600"
      toColor="purple-600"
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-center">
        <h3 className="text-xl font-semibold mb-1">GlowingBorder Card</h3>
        <p className="text-sm text-muted-foreground">
          Hover to see the glowing border effect.
        </p>
      </div>
    </GlowingBorderCard>
  );
}
