"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

export default function CalendarDisabledDaysDemo() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 11)
  );

  return (
    <Calendar
      mode="single"
      defaultMonth={date}
      selected={date}
      onSelect={setDate}
      disabled={{
        before: new Date(2025, 5, 11),
      }}
      className="rounded-lg border shadow-sm"
    />
  );
}
