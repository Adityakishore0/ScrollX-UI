import { ThunderLoader } from "@/components/ui/thunder-loader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ThunderLoaderEffectsDemo() {
  return (
    <Card className="w-full h-full p-0">
      <CardContent>
        <div className="flex flex-wrap justify-center">
          <div className="flex flex-col items-center w-1/2 p-2">
            <ThunderLoader size="xl" animate="thunder" />
            <Badge className="mt-2">Animate</Badge>
          </div>
          <div className="flex flex-col items-center w-1/2 p-2">
            <ThunderLoader size="xl" showGlow={true} showFill={false} />
            <Badge className="mt-2">Glow</Badge>
          </div>
          <div className="flex flex-col items-center w-1/2 p-2">
            <ThunderLoader size="xl" showGlow={false} showFill={true} />
            <Badge className="mt-2">Fill</Badge>
          </div>
          <div className="flex flex-col items-center w-1/2 p-2">
            <ThunderLoader size="xl" showGlow={false} showFill={false} />
            <Badge className="mt-2">Static</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
