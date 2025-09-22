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

export default function CalendarYearOrderSelectorDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [yearOrder, setYearOrder] = React.useState<"asc" | "desc">("asc");

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        yearOrder={yearOrder}
        captionLayout="dropdown"
        className="rounded-lg border shadow-sm"
      />

      <DropdownMenu>
        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="year-order" className="px-1 pb-2">
            Year Order
          </Label>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="justify-between inline-flex w-40"
            >
              {yearOrder === "asc" ? "Ascending" : "Descending"}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        </div>

        <DropdownMenuContent className="mt-2 left-1/2 -translate-x-1/2 w-40">
          <DropdownMenuRadioGroup
            value={yearOrder}
            onValueChange={(value) => setYearOrder(value as "asc" | "desc")}
          >
            <DropdownMenuRadioItem value="asc">Ascending</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="desc">
              Descending
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
