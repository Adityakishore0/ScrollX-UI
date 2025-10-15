import WavyButton from "@/components/ui/wavy-button";
import { ChevronUpIcon } from "lucide-react";

export default function WavyButtonIconDemo() {
  return (
    <WavyButton variant="outline" size="icon">
      <ChevronUpIcon />
    </WavyButton>
  );
}
