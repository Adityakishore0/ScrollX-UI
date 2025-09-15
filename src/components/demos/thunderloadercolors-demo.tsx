import { ThunderLoader } from "@/components/ui/thunder-loader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ThunderLoaderColorsDemo() {
  return (
    <Card className="w-full h-full ">
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center space-y-3">
            <ThunderLoader
              size="xl"
              fillColor="#10b981"
              glowColor="#059669"
              baseColor="#047857"
            />
            <Badge>Custom Green</Badge>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <ThunderLoader
              size="xl"
              fillColor="#f97316"
              glowColor="#ea580c"
              baseColor="#c2410c"
            />
            <Badge>Custom Orange</Badge>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <ThunderLoader
              size="xl"
              fillColor="#8b5cf6"
              glowColor="#7c3aed"
              baseColor="#6d28d9"
            />
            <Badge>Custom Purple</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
