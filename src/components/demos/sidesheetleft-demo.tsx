"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SideSheet,
  SideSheetTrigger,
  SideSheetContent,
  SideSheetHeader,
  SideSheetTitle,
  SideSheetDescription,
  SideSheetFooter,
  SideSheetClose,
} from "@/components/ui/side-sheet";

export default function SideSheetLeftDemo() {
  const [level, setLevel] = useState(4);

  const increaseLevel = () => setLevel((prev) => Math.min(prev + 1, 8));
  const decreaseLevel = () => setLevel((prev) => Math.max(prev - 1, 0));

  return (
    <SideSheet side="left" className="w-screen">
      <SideSheetTrigger asChild>
        <Button>Open Left</Button>
      </SideSheetTrigger>
      <SideSheetContent className="flex flex-col h-full overflow-hidden">
        <SideSheetHeader className="flex-shrink-0 px-6 pt-6">
          <SideSheetTitle>Drink Water</SideSheetTitle>
          <SideSheetDescription>
            Track and maintain your daily water intake.
          </SideSheetDescription>
        </SideSheetHeader>
        <div className="flex items-center justify-center gap-6 flex-1 min-h-0 px-6">
          <Button
            variant="outline"
            size="icon"
            onClick={decreaseLevel}
            className="w-12 h-12 flex-shrink-0"
          >
            <Minus className="h-6 w-6" />
          </Button>
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col-reverse border-2 rounded-b-lg overflow-hidden border-black dark:border-white w-24 h-32">
              {[...Array(8)].map((_, i) => {
                const isFilled = i < level;
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 transition-colors duration-300",
                      isFilled ? "bg-black dark:bg-white" : "bg-transparent"
                    )}
                  />
                );
              })}
            </div>
            <span className="mt-3 text-sm font-medium">
              {level} Glass{level !== 1 ? "es" : ""} Drank
            </span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={increaseLevel}
            className="w-12 h-12 flex-shrink-0"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        <SideSheetFooter className="flex-shrink-0 px-6 pb-6">
          <SideSheetClose asChild>
            <Button>Close</Button>
          </SideSheetClose>
        </SideSheetFooter>
      </SideSheetContent>
    </SideSheet>
  );
}
