"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";

export default function CalendarMultiMonthsDemo() {
  const [mode, setMode] = React.useState<"single" | "multiple">("single");
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(
    new Date(2025, 8, 11)
  );
  const [multipleDates, setMultipleDates] = React.useState<Date[]>([
    new Date(2025, 8, 11),
    new Date(2025, 9, 24),
  ]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        mode={mode}
        numberOfMonths={2}
        selected={mode === "single" ? singleDate : multipleDates}
        onSelect={mode === "single" ? setSingleDate : setMultipleDates}
        className="rounded-lg border shadow-sm"
        max={mode === "multiple" ? 5 : undefined}
      />
      <DropdownMenu>
        <div className="flex flex-col items-start gap-1">
          <Label className="px-1 pb-2">Selection Mode</Label>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="justify-between inline-flex w-40"
            >
              {mode === "single" ? "Single" : "Multiple"}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="mt-2 w-40">
          <DropdownMenuRadioGroup
            value={mode}
            onValueChange={(value) => setMode(value as "single" | "multiple")}
          >
            <DropdownMenuRadioItem value="single">Single</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="multiple">
              Multiple
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
