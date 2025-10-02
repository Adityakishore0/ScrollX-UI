"use client";
import {
  Announcement,
  AnnouncementExpandedContent,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/ui/announcement";
import { ArrowUpRightIcon } from "lucide-react";

export default function AnnouncementDemo() {
  return (
    <Announcement>
      <AnnouncementTag movingBorder>Updates</AnnouncementTag>
      <AnnouncementTitle lustre>📢 Recent updates</AnnouncementTitle>
      <AnnouncementExpandedContent>
        <div className="flex flex-col gap-3">
          <Announcement className="w-full">
            <AnnouncementTag className="bg-red-800 text-white">
              Hot
            </AnnouncementTag>
            <AnnouncementTitle>
              KBD component added
              <ArrowUpRightIcon className="shrink-0 opacity-70" size={16} />
            </AnnouncementTitle>
          </Announcement>

          <Announcement movingBorder className="w-full">
            <AnnouncementTag className="bg-red-800 text-white">
              Hot
            </AnnouncementTag>
            <AnnouncementTitle>
              Facescape docs added
              <ArrowUpRightIcon className="shrink-0 opacity-70" size={16} />
            </AnnouncementTitle>
          </Announcement>

          <Announcement className="w-full">
            <AnnouncementTag className="bg-red-800 text-white">
              Hot
            </AnnouncementTag>
            <AnnouncementTitle>
              Modern Loader added
              <ArrowUpRightIcon className="shrink-0 opacity-70" size={16} />
            </AnnouncementTitle>
          </Announcement>

          <Announcement movingBorder className="w-full">
            <AnnouncementTag className="bg-red-800 text-white">
              Hot
            </AnnouncementTag>
            <AnnouncementTitle>
              iPhone Mockup added
              <ArrowUpRightIcon className="shrink-0 opacity-70" size={16} />
            </AnnouncementTitle>
          </Announcement>
        </div>
      </AnnouncementExpandedContent>
    </Announcement>
  );
}
