import { MediaCard, MediaCardItem } from "@/components/ui/media-card";

export default function MediaCardDemoImage() {
  return (
    <MediaCard
      className="w-full min-h-[350px] flex items-center justify-center p-10"
      dotClassName="bg-green-500 w-4 h-4"
      marqueeClassName="bg-green-500/95 text-white"
    >
      <MediaCardItem
        src="https://images.pexels.com/photos/2145820/pexels-photo-2145820.jpeg"
        alt="image"
        title="Beautiful Sunset."
        type="image"
        className="w-full max-w-sm"
      />
    </MediaCard>
  );
}
