import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AspectRatioDemo() {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="relative w-full overflow-hidden rounded-md"
    >
      <Image
        src="https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Notebook and coffee by Giulia Bertelli on Unsplash"
        fill
        className="h-full w-full not-prose rounded-md object-cover"
      />
    </AspectRatio>
  );
}
