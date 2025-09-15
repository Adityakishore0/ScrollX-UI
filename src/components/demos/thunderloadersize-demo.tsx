import { ThunderLoader } from "@/components/ui/thunder-loader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ThunderLoaderSizeDemo() {
  const loaders = [
    { size: "xs" as const, label: "xs" },
    { size: "sm" as const, label: "sm" },
    { size: "md" as const, label: "md" },
    { size: "lg" as const, label: "lg" },
    { size: "xl" as const, label: "xl" },
    { size: "2xl" as const, label: "2xl" },
  ];

  return (
    <Card className="w-full h-full p-0">
      <CardContent>
        <div className="flex flex-wrap justify-center">
          {loaders.map(({ size, label }) => (
            <div
              key={size}
              className="flex flex-col items-center w-1/2 lg:w-1/3 box-border px-2 pb-4"
            >
              <div className="h-20 flex items-center justify-center">
                <ThunderLoader size={size} showFill={false} />
              </div>
              <Badge className="mt-2">{label}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
