import { ThunderLoader } from "@/components/ui/thunder-loader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ThunderLoaderEffectsDemo() {
  const speeds = [
    { label: "Fast", value: 1 },
    { label: "Normal", value: 2 },
    { label: "Slow", value: 4 },
  ];

  return (
    <Card className="w-full h-full">
      <CardContent className="pt-6">
        <div className="grid grid-cols-3 gap-6">
          {speeds.map(({ label, value }) => (
            <div key={`glow-${label}`} className="flex flex-col items-center">
              <ThunderLoader
                variant="electric"
                glowDuration={value}
                showGlow={true}
                showFill={false}
                animate={false}
                className="md:w-8 md:h-8 lg:w-16 lg:h-16"
              />
              <Badge className="mt-2">{label}</Badge>
            </div>
          ))}

          {speeds.map(({ label, value }) => (
            <div key={`fill-${label}`} className="flex flex-col items-center">
              <ThunderLoader
                variant="fire"
                fillDuration={value}
                showGlow={false}
                showFill={true}
                animate={false}
                className="md:w-8 md:h-8 lg:w-16 lg:h-16"
              />
              <Badge className="mt-2">{label}</Badge>
            </div>
          ))}

          {speeds.map(({ label, value }) => (
            <div
              key={`animate-${label}`}
              className="flex flex-col items-center"
            >
              <ThunderLoader
                variant="ice"
                animateDuration={value}
                showGlow={false}
                showFill={false}
                animate="thunder"
                className="md:w-8 md:h-8 lg:w-16 lg:h-16"
              />
              <Badge className="mt-2">{label}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
