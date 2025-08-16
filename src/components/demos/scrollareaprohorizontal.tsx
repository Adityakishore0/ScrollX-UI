import * as React from "react";
import Image from "next/image";
import { ScrollAreaPro } from "@/components/ui/scroll-areapro";

export interface Artwork {
  artist: string;
  art: string;
}

export const works: Artwork[] = [
  {
    artist: "Lawrence Krowdeed",
    art: "https://images.unsplash.com/photo-1610396025780-c251e6a03e82",
  },
  {
    artist: "烧不酥在上海 老的",
    art: "https://images.unsplash.com/photo-1584079888920-645ebab59746",
  },
  {
    artist: "Hulki Okan Tabak",
    art: "https://images.unsplash.com/photo-1590992133988-6ffb251c607e",
  },
  {
    artist: "Sam Baroudi",
    art: "https://images.unsplash.com/photo-1674034417801-e21ffd8fc4bf",
  },
];

export default function ScrollAreaProHorizontal() {
  return (
    <div className="flex  items-center justify-center">
      <ScrollAreaPro
        className="w-96 rounded-md border"
        crossDirectionalScroll
        showProgress="horizontal"
      >
        <div className="flex w-max space-x-4 px-4 py-4">
          {works.map((artwork) => (
            <figure key={artwork.artist} className="shrink-0">
              <div className="overflow-hidden rounded-md">
                <Image
                  src={artwork.art}
                  alt={`Photo by ${artwork.artist}`}
                  className="aspect-[3/4] object-cover grayscale"
                  width={300}
                  height={400}
                />
              </div>
              <figcaption className="pt-2 text-xs text-muted-foreground">
                Photo by{" "}
                <span className="font-semibold text-foreground">
                  {artwork.artist}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </ScrollAreaPro>
    </div>
  );
}
