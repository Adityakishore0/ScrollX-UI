import { SlideText } from "@/components/ui/slide-text";

export default function SlideTextDemo() {
  return (
    <SlideText
      text="Innovation"
      staggerDelay={0.03}
      staggerDuration={0.5}
      pauseDuration={2}
      className="md:text-7xl text-4xl font-semibold"
    />
  );
}
