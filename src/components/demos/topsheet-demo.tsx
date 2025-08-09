"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  TopSheet,
  TopSheetClose,
  TopSheetContent,
  TopSheetDescription,
  TopSheetFooter,
  TopSheetHeader,
  TopSheetTitle,
  TopSheetTrigger,
} from "@/components/ui/top-sheet";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TopSheetDemo() {
  const [level, setLevel] = useState(4);

  const increaseLevel = () => setLevel((prev) => Math.min(prev + 1, 8));
  const decreaseLevel = () => setLevel((prev) => Math.max(prev - 1, 0));

  return (
    <TopSheet>
      <TopSheetTrigger asChild>
        <Button>Open Sheet</Button>
      </TopSheetTrigger>
      <TopSheetContent className="flex flex-col h-full overflow-hidden">
        <TopSheetHeader className="flex-shrink-0 px-6 pt-6">
          <TopSheetTitle>Drink Water</TopSheetTitle>
          <TopSheetDescription>
            Track and maintain your daily water intake.
          </TopSheetDescription>
        </TopSheetHeader>

        {/* Main content area that fills available space */}
        <div className="flex items-center justify-center gap-6 flex-1 min-h-0 px-6">
          {/* Minus Button - Left */}
          <Button
            variant="outline"
            size="icon"
            onClick={decreaseLevel}
            className="w-12 h-12 flex-shrink-0"
          >
            <Minus className="h-6 w-6" />
          </Button>

          {/* Glass of water + Label - Scales with available space */}
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

          {/* Plus Button - Right */}
          <Button
            variant="outline"
            size="icon"
            onClick={increaseLevel}
            className="w-12 h-12 flex-shrink-0"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        <TopSheetFooter className="flex-shrink-0 px-6 pb-6">
          <TopSheetClose asChild>
            <Button>Close</Button>
          </TopSheetClose>
        </TopSheetFooter>
      </TopSheetContent>
    </TopSheet>
  );
}
