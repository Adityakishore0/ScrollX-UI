"use client";
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/ui/announcement";
import { ArrowUpRightIcon } from "lucide-react";

export default function AnnouncementDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Announcement className="bg-rose-100 text-rose-700 w-full">
        <AnnouncementTag>Error</AnnouncementTag>
        <AnnouncementTitle>
          Something went wrong
          <ArrowUpRightIcon className="shrink-0 opacity-70" size={16} />
        </AnnouncementTitle>
      </Announcement>

      <Announcement className="bg-emerald-100 text-emerald-700 w-full">
        <AnnouncementTag movingBorder>Success</AnnouncementTag>
        <AnnouncementTitle>
          New feature added
          <ArrowUpRightIcon className="shrink-0 opacity-70" size={16} />
        </AnnouncementTitle>
      </Announcement>

      <Announcement className="bg-orange-100 text-orange-700 w-full">
        <AnnouncementTag>Warning</AnnouncementTag>
        <AnnouncementTitle>
          Approaching your limit
          <ArrowUpRightIcon className="shrink-0 opacity-70" size={16} />
        </AnnouncementTitle>
      </Announcement>

      <Announcement className="bg-sky-100 text-sky-700 w-full">
        <AnnouncementTag movingBorder>Info</AnnouncementTag>
        <AnnouncementTitle>
          Welcome to the platform
          <ArrowUpRightIcon className="shrink-0 opacity-70" size={16} />
        </AnnouncementTitle>
      </Announcement>
    </div>
  );
}
