import { TextSpotlight } from "@/components/ui/text-spotlight";

export default function TextSpotlightAutoPhoneDemo() {
  return (
    <TextSpotlight
      textClassName="text-xl md:text-4xl font-semibold"
      text="Hover over me and watch the soft spotlight glide around like magic across the text."
      spotlightColor="255, 255, 255"
      animateOnPhone={true}
      spotlightArea={90}
      spotlightSize={100}
    />
  );
}
