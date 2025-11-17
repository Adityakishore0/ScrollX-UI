"use client";

import { useState } from "react";
import FlipStack from "@/components/ui/flipstack";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FlipStackDemo() {
  const [direction, setDirection] = useState<"top" | "bottom">("top");

  const cards = [
    {
      id: 1,
      content: (
        <img
          src="https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Isabelle Carlos"
          className="w-full h-[420px] object-cover"
        />
      ),
    },
    {
      id: 2,
      content: (
        <img
          src="https://plus.unsplash.com/premium_photo-1692340973636-6f2ff926af39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Lana Akash"
          className="w-full h-[420px] object-cover"
        />
      ),
    },
    {
      id: 3,
      content: (
        <img
          src="https://github.com/Adityakishore0.png?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Ahdeetai"
          className="w-full h-[420px] object-cover"
        />
      ),
    },
    {
      id: 4,
      content: (
        <img
          src="https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Isabella Mendes"
          className="w-full h-[420px] object-cover scale-x-[-1]"
        />
      ),
    },
    {
      id: 5,
      content: (
        <img
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Meera Patel"
          className="w-full h-[420px] object-cover"
        />
      ),
    },
  ];

  return (
    <>
      <div className="w-full lg:hidden flex flex-col items-center gap-4">
        <FlipStack cards={cards} mobileDirection={direction} />

        <Select
          value={direction}
          onValueChange={(v) => setDirection(v as "top" | "bottom")}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Direction</SelectLabel>
              <SelectItem value="top">Top</SelectItem>
              <SelectItem value="bottom">Bottom</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="hidden lg:flex absolute inset-0 overflow-visible items-center justify-center pt-[14rem]">
        <FlipStack cards={cards} />
      </div>
    </>
  );
}
