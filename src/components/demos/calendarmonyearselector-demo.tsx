"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";

export default function CalendarMonYearSelectorDemo() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 11)
  );
  const [monthAndYear, setMonthAndYear] = React.useState(true);
  const [monthOnly, setMonthOnly] = React.useState(false);
  const [yearOnly, setYearOnly] = React.useState(false);

  const captionLayout = monthAndYear
    ? "dropdown"
    : monthOnly
    ? "dropdown-months"
    : yearOnly
    ? "dropdown-years"
    : "dropdown";

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        mode="single"
        defaultMonth={date}
        selected={date}
        onSelect={setDate}
        captionLayout={captionLayout}
        className="rounded-lg border shadow-sm"
      />
      <DropdownMenu>
        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="dropdown" className="px-1 pb-2">
            Dropdown
          </Label>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="justify-between inline-flex">
              {monthAndYear
                ? "Month and Year"
                : monthOnly
                ? "Month Only"
                : "Year Only"}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="mt-2 left-1/2 -translate-x-1/2 inline-block w-auto">
          <DropdownMenuCheckboxItem
            checked={monthAndYear}
            onCheckedChange={(checked) => {
              setMonthAndYear(!!checked);
              setMonthOnly(false);
              setYearOnly(false);
            }}
          >
            Month and Year
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={monthOnly}
            onCheckedChange={(checked) => {
              setMonthAndYear(false);
              setMonthOnly(!!checked);
              setYearOnly(false);
            }}
          >
            Month Only
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={yearOnly}
            onCheckedChange={(checked) => {
              setMonthAndYear(false);
              setMonthOnly(false);
              setYearOnly(!!checked);
            }}
          >
            Year Only
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
