import { MediaCard, MediaCardItem } from "@/components/ui/media-card";

export default function MediaCardDemo() {
  return (
    <MediaCard
      className="w-full min-h-[350px] flex items-center justify-center p-10"
      dotClassName="bg-blue-500 w-4 h-4"
      marqueeClassName="bg-blue-500/95 text-white"
    >
      <MediaCardItem
        src="https://www.pexels.com/download/video/1390942/"
        alt="Video"
        title="Lost in the view."
        type="video"
        className="w-full max-w-sm"
      />
    </MediaCard>
  );
}
