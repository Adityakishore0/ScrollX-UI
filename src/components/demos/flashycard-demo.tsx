import { FlashyCard } from "@/components/ui/flashy-card";

export default function FlashyCardDemo() {
  return (
    <FlashyCard
      className="w-full max-w-sm"
      defaultSrc="https://images.pexels.com/photos/1535907/pexels-photo-1535907.jpeg"
      activeSrc="https://www.pexels.com/download/video/1390942/"
      activeType="video"
    />
  );
}
