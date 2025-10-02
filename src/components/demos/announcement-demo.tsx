"use client";
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/ui/announcement";
import { ArrowUpRightIcon } from "lucide-react";
export default function AnnouncementDemo() {
  return (
    <Announcement movingBorder>
      <AnnouncementTag lustre>Latest Update</AnnouncementTag>
      <AnnouncementTitle>
        iPhone mockup added
        <ArrowUpRightIcon
          className="shrink-0 text-muted-foreground"
          size={16}
        />
      </AnnouncementTitle>
    </Announcement>
  );
}
