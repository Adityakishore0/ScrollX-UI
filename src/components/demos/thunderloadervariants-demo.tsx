import { ThunderLoader } from "@/components/ui/thunder-loader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ThunderLoaderVariantsDemo() {
  const variants = [
    { variant: "default", label: "default" },
    { variant: "electric", label: "electric" },
    { variant: "fire", label: "fire" },
    { variant: "ice", label: "ice" },
    { variant: "rainbow", label: "rainbow" },
    { variant: "subtle", label: "subtle" },
  ];

  return (
    <Card className="w-full h-full p-0">
      <CardContent>
        <div className="flex flex-wrap justify-center">
          {variants.map(({ variant, label }) => (
            <div
              key={variant}
              className="flex flex-col items-center w-1/2 lg:w-1/3 box-border px-2 pb-4"
            >
              <div className="h-20 flex items-center justify-center">
                <ThunderLoader
                  size="lg"
                  variant={
                    variant as
                      | "default"
                      | "electric"
                      | "fire"
                      | "ice"
                      | "rainbow"
                      | "subtle"
                  }
                />
              </div>
              <Badge className="mt-2">{label}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
