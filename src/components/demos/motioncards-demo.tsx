import MotionCards, { MotionCardContent } from "@/components/ui/motioncards";
import {
  Component,
  Layers,
  LayoutPanelTop,
  Package,
  Scroll,
} from "lucide-react";

export default function MotionCardsDemo() {
  return (
    <MotionCards interval={1300}>
      <MotionCardContent className="flex gap-3">
        <Layers className="w-6 h-6" />
        <span className=" font-semibold">Beautiful Cool Components</span>
      </MotionCardContent>

      <MotionCardContent className="flex gap-3">
        <Component className="w-6 h-6" />
        <span className=" font-semibold">Customizable UI Blocks</span>
      </MotionCardContent>

      <MotionCardContent className="flex gap-3">
        <LayoutPanelTop className="w-6 h-6" />
        <span className=" font-semibold">Responsive Layouts</span>
      </MotionCardContent>

      <MotionCardContent className="flex gap-3">
        <Scroll className="w-6 h-6" />
        <span className=" font-semibold">Smooth Scroll Animations</span>
      </MotionCardContent>

      <MotionCardContent className="flex gap-3">
        <Package className="w-6 h-6" />
        <span className=" font-semibold">
          Open Source UI Components Library
        </span>
      </MotionCardContent>
    </MotionCards>
  );
}
