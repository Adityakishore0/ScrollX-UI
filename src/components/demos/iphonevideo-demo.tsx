import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Iphone } from "@/components/ui/iphone";

export default function IphoneDemo() {
  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <Iphone showHeader>
        <div className="absolute inset-0 flex items-center justify-center">
          <AspectRatio ratio={4 / 5} className="w-full h-full">
            <video
              className="w-full h-full object-cover"
              src="https://www.pexels.com/download/video/32594925/"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </AspectRatio>
        </div>
      </Iphone>
    </div>
  );
}
