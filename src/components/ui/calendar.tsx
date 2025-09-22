"use client";

import * as React from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

interface Modifiers {
  [key: string]:
    | Date[]
    | ((date: Date) => boolean)
    | { dayOfWeek?: number[]; before?: Date; after?: Date };
}

interface FormatOptions {
  locale?: string;
  [key: string]: unknown;
}

interface CalendarBaseProps {
  className?: string;
  classNames?: {
    [key: string]: string;
  };

  showOutsideDays?: boolean;
  showWeekNumber?: boolean;
  numberOfMonths?: number;
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
  fromYear?: number;
  toYear?: number;
  fromMonth?: Date;
  toMonth?: Date;
  yearOrder?: "asc" | "desc";

  disabled?:
    | Date[]
    | ((date: Date) => boolean)
    | { before?: Date; after?: Date; dayOfWeek?: number[] };

  modifiers?: Modifiers;
  modifiersClassNames?: { [key: string]: string };

  locale?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;

  labels?: {
    labelMonthDropdown?: () => string;
    labelYearDropdown?: () => string;
    labelNext?: () => string;
    labelPrevious?: () => string;
  };

  formatters?: {
    formatCaption?: (date: Date, options?: FormatOptions) => string;
    formatDay?: (date: Date) => string;
    formatMonthDropdown?: (date: Date) => string;
    formatYearDropdown?: (date: Date) => string;
    formatWeekNumber?: (weekNumber: number) => string;
    formatWeekdayName?: (date: Date) => string;
  };

  onMonthChange?: (date: Date) => void;
  onDayClick?: (date: Date, modifiers: string[]) => void;
  onDayMouseEnter?: (date: Date, modifiers: string[]) => void;
  onDayMouseLeave?: (date: Date, modifiers: string[]) => void;

  footer?: React.ReactNode;
  components?: {
    DayButton?: React.ComponentType<CalendarDayButtonProps>;
    [key: string]: React.ComponentType<CalendarDayButtonProps> | undefined;
  };

  animate?: boolean;
  dir?: "ltr" | "rtl";
  autoFocus?: boolean;
  defaultMonth?: Date;

  ISOWeek?: boolean;
  fixedWeeks?: boolean;

  buttonVariant?: string;
}

interface CalendarProps extends CalendarBaseProps {
  mode?: "single" | "multiple" | "range";
  selected?: Date | Date[] | DateRange;
  onSelect?:
    | ((date: Date | undefined) => void)
    | ((dates: Date[] | undefined) => void)
    | ((range: DateRange | undefined) => void)
    | Dispatch<SetStateAction<Date[]>>;
  required?: boolean;
  max?: number;
}

interface CalendarDayButtonProps {
  day: { date: Date };
  modifiers: { [key: string]: boolean };
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  "data-date"?: string;
  "data-modifiers"?: string;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const CalendarDayButton: React.FC<CalendarDayButtonProps> = ({
  day,
  modifiers,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled,
  className,
  style,
  ...props
}) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </Button>
  );
};

function Calendar(props: CalendarProps) {
  const {
    className,
    classNames = {},
    mode = "single",
    selected,
    onSelect,
    showOutsideDays = true,
    showWeekNumber = false,
    numberOfMonths = 1,
    captionLayout = "label",
    fromYear = new Date().getFullYear() - 100,
    toYear = new Date().getFullYear(),
    fromMonth,
    toMonth,
    yearOrder = "desc",
    disabled,
    modifiers = {},
    modifiersClassNames = {},
    locale = "en-US",
    weekStartsOn = 0,
    firstWeekContainsDate = 1,
    labels = {},
    formatters = {},
    onMonthChange,
    onDayClick,
    onDayMouseEnter,
    onDayMouseLeave,
    footer,
    components = {},
    animate = false,
    dir = "ltr",
    autoFocus = false,
    defaultMonth,
    ISOWeek = false,
    fixedWeeks = false,
    ...restProps
  } = props;

  const [currentDates, setCurrentDates] = React.useState(() => {
    const baseDate =
      defaultMonth || (selected instanceof Date ? selected : new Date());
    return Array.from({ length: numberOfMonths }, (_, index) => {
      const date = new Date(baseDate);
      date.setMonth(date.getMonth() + index);
      return date;
    });
  });

  const [showMonthPicker, setShowMonthPicker] = React.useState(false);
  const [showYearPicker, setShowYearPicker] = React.useState(false);
  const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest("[data-calendar-container]")) {
        setShowMonthPicker(false);
        setShowYearPicker(false);
      }
    };

    if (showMonthPicker || showYearPicker) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showMonthPicker, showYearPicker]);

  const getMonthNames = () => {
    if (formatters.formatMonthDropdown) {
      return shortMonths.map((_, index) =>
        formatters.formatMonthDropdown!(new Date(2023, index, 1))
      );
    }
    return shortMonths;
  };

  const getWeekDayNames = () => {
    const days = [...weekDays];
    for (let i = 0; i < weekStartsOn; i++) {
      days.push(days.shift()!);
    }
    return days;
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    return (firstDay - weekStartsOn + 7) % 7;
  };

  const getWeekNumber = (date: Date): number => {
    if (ISOWeek) {
      const d = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil(
        ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
      );
    }

    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const jan4 = new Date(target.getFullYear(), 0, 4);
    const dayDiff = (target.getTime() - jan4.getTime()) / 86400000;
    return 1 + Math.ceil(dayDiff / 7);
  };

  const isDateDisabled = (date: Date): boolean => {
    if (!disabled) return false;

    if (Array.isArray(disabled)) {
      return disabled.some((d) => d.toDateString() === date.toDateString());
    }

    if (typeof disabled === "function") {
      return disabled(date);
    }

    if (typeof disabled === "object") {
      if (disabled.before && date < disabled.before) return true;
      if (disabled.after && date > disabled.after) return true;
      if (disabled.dayOfWeek && disabled.dayOfWeek.includes(date.getDay()))
        return true;
    }

    return false;
  };

  const getDayModifiers = (
    date: Date,
    currentMonth: number,
    currentYear: number
  ) => {
    const dayModifiers: { [key: string]: boolean } = {};

    dayModifiers.today = isToday(date);
    dayModifiers.selected = isSelected(date);
    dayModifiers.disabled = isDateDisabled(date);
    dayModifiers.outside = !isCurrentMonth(date, currentMonth, currentYear);
    dayModifiers.hovered = hoveredDate
      ? date.toDateString() === hoveredDate.toDateString()
      : false;

    if (
      mode === "range" &&
      selected &&
      typeof selected === "object" &&
      "from" in selected
    ) {
      const range = selected as DateRange;
      if (range.from) {
        dayModifiers.range_start =
          date.toDateString() === range.from.toDateString();
      }
      if (range.to) {
        dayModifiers.range_end =
          date.toDateString() === range.to.toDateString();
      }
      if (range.from && range.to && date > range.from && date < range.to) {
        dayModifiers.range_middle = true;
      }

      if (range.from && !range.to && hoveredDate) {
        const startDate = range.from < hoveredDate ? range.from : hoveredDate;
        const endDate = range.from < hoveredDate ? hoveredDate : range.from;

        if (date > startDate && date < endDate) {
          dayModifiers.range_middle_preview = true;
        }
        if (date.toDateString() === endDate.toDateString()) {
          dayModifiers.range_end_preview = true;
        }
      }
    }

    Object.entries(modifiers).forEach(([key, modifier]) => {
      if (Array.isArray(modifier)) {
        dayModifiers[key] = modifier.some(
          (d) => d.toDateString() === date.toDateString()
        );
      } else if (typeof modifier === "function") {
        dayModifiers[key] = modifier(date);
      } else if (typeof modifier === "object") {
        let hasModifier = false;
        if (modifier.dayOfWeek && modifier.dayOfWeek.includes(date.getDay())) {
          hasModifier = true;
        }
        if (modifier.before && date < modifier.before) {
          hasModifier = true;
        }
        if (modifier.after && date > modifier.after) {
          hasModifier = true;
        }
        dayModifiers[key] = hasModifier;
      }
    });

    return dayModifiers;
  };

  const generateCalendarDays = (currentMonth: number, currentYear: number) => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    if (showOutsideDays || firstDay > 0) {
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

      for (let i = firstDay - 1; i >= 0; i--) {
        const date = new Date(prevYear, prevMonth, daysInPrevMonth - i);
        days.push({
          day: daysInPrevMonth - i,
          date,
          isCurrentMonth: false,
          weekNumber:
            showWeekNumber && i === firstDay - 1 ? getWeekNumber(date) : null,
        });
      }
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      days.push({
        day,
        date,
        isCurrentMonth: true,
        weekNumber:
          showWeekNumber && date.getDay() === weekStartsOn
            ? getWeekNumber(date)
            : null,
      });
    }

    const totalCells = fixedWeeks ? 42 : Math.ceil(days.length / 7) * 7;
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    for (let day = 1; days.length < totalCells; day++) {
      const date = new Date(nextYear, nextMonth, day);
      if (showOutsideDays) {
        days.push({
          day,
          date,
          isCurrentMonth: false,
          weekNumber:
            showWeekNumber && date.getDay() === weekStartsOn
              ? getWeekNumber(date)
              : null,
        });
      }
    }

    return days;
  };

  const isCurrentMonth = (
    date: Date,
    currentMonth: number,
    currentYear: number
  ) => {
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  };

  const isSelected = (date: Date): boolean => {
    if (!selected) return false;

    if (mode === "single" && selected instanceof Date) {
      return date.toDateString() === selected.toDateString();
    }

    if (mode === "multiple" && Array.isArray(selected)) {
      return selected.some((d) => d.toDateString() === date.toDateString());
    }

    if (
      mode === "range" &&
      selected &&
      typeof selected === "object" &&
      "from" in selected
    ) {
      const range = selected as DateRange;
      if (!range.from) return false;
      if (!range.to) return date.toDateString() === range.from.toDateString();
      return date >= range.from && date <= range.to;
    }

    return false;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    const modifiers = Object.keys(
      getDayModifiers(date, date.getMonth(), date.getFullYear())
    ).filter(
      (key) => getDayModifiers(date, date.getMonth(), date.getFullYear())[key]
    );
    onDayClick?.(date, modifiers);

    if (mode === "single") {
      (onSelect as ((date: Date | undefined) => void) | undefined)?.(date);
    } else if (mode === "multiple") {
      const multipleOnSelect = onSelect as
        | ((dates: Date[] | undefined) => void)
        | undefined;
      const currentSelected = (selected as Date[]) || [];
      const isAlreadySelected = currentSelected.some(
        (d) => d.toDateString() === date.toDateString()
      );

      if (isAlreadySelected) {
        multipleOnSelect?.(
          currentSelected.filter(
            (d) => d.toDateString() !== date.toDateString()
          )
        );
      } else {
        multipleOnSelect?.([...currentSelected, date]);
      }
    } else if (mode === "range") {
      const rangeOnSelect = onSelect as
        | ((range: DateRange | undefined) => void)
        | undefined;
      const currentRange = (selected as DateRange) || {};

      if (!currentRange.from) {
        rangeOnSelect?.({ from: date, to: undefined });
      } else if (currentRange.from && currentRange.to) {
        if (
          date.getTime() === currentRange.from.getTime() ||
          date.getTime() === currentRange.to.getTime()
        ) {
          rangeOnSelect?.({ from: undefined, to: undefined });
        } else if (date >= currentRange.from && date <= currentRange.to) {
          rangeOnSelect?.({ from: currentRange.from, to: date });
        } else if (date < currentRange.from) {
          rangeOnSelect?.({ from: date, to: currentRange.to });
        } else {
          rangeOnSelect?.({ from: currentRange.from, to: date });
        }
      } else if (currentRange.from && !currentRange.to) {
        if (date < currentRange.from) {
          rangeOnSelect?.({ from: date, to: currentRange.from });
        } else if (date.getTime() === currentRange.from.getTime()) {
          rangeOnSelect?.({ from: undefined, to: undefined });
        } else {
          rangeOnSelect?.({ from: currentRange.from, to: date });
        }
      }
    }
  };

  const handleDateMouseEnter = (date: Date) => {
    const modifiers = Object.keys(
      getDayModifiers(date, date.getMonth(), date.getFullYear())
    ).filter(
      (key) => getDayModifiers(date, date.getMonth(), date.getFullYear())[key]
    );
    setHoveredDate(date);
    onDayMouseEnter?.(date, modifiers);
  };

  const handleDateMouseLeave = (date: Date) => {
    const modifiers = Object.keys(
      getDayModifiers(date, date.getMonth(), date.getFullYear())
    ).filter(
      (key) => getDayModifiers(date, date.getMonth(), date.getFullYear())[key]
    );
    setHoveredDate(null);
    onDayMouseLeave?.(date, modifiers);
  };

  const handleMonthSelect = (month: number, monthIndex: number = 0) => {
    const newDates = [...currentDates];
    newDates[monthIndex] = new Date(
      newDates[monthIndex].getFullYear(),
      month,
      1
    );

    for (let i = monthIndex + 1; i < numberOfMonths; i++) {
      newDates[i] = new Date(newDates[i - 1]);
      newDates[i].setMonth(newDates[i].getMonth() + 1);
    }

    setCurrentDates(newDates);
    setShowMonthPicker(false);
    onMonthChange?.(newDates[0]);
  };

  const handleYearSelect = (year: number, monthIndex: number = 0) => {
    const newDates = [...currentDates];
    newDates[monthIndex] = new Date(year, newDates[monthIndex].getMonth(), 1);

    for (let i = monthIndex + 1; i < numberOfMonths; i++) {
      newDates[i] = new Date(newDates[i - 1]);
      newDates[i].setMonth(newDates[i].getMonth() + 1);
    }

    setCurrentDates(newDates);
    setShowYearPicker(false);
    onMonthChange?.(newDates[0]);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDates = currentDates.map((date) => {
      const newDate = new Date(date);
      if (direction === "prev") {
        if (fromMonth && newDate <= fromMonth) return date;
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        if (toMonth && newDate >= toMonth) return date;
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
    setCurrentDates(newDates);
    onMonthChange?.(newDates[0]);
  };

  const generateYears = () => {
    const years = [];
    for (let year = fromYear; year <= toYear; year++) {
      years.push(year);
    }
    return yearOrder === "desc" ? years.reverse() : years;
  };

  const weekDayNames = getWeekDayNames();
  const monthNames = getMonthNames();

  const renderCaption = (monthIndex: number) => {
    const currentDate = currentDates[monthIndex];
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthName = formatters.formatCaption
      ? formatters.formatCaption(currentDate)
      : `${months[currentMonth]} ${currentYear}`;

    if (captionLayout === "label") {
      return (
        <div className="flex h-8 w-full items-center justify-center text-sm font-medium text-foreground">
          {monthName}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1">
        {(captionLayout === "dropdown" ||
          captionLayout === "dropdown-months") && (
          <Button
            variant="outline"
            onClick={() => {
              setShowMonthPicker(!showMonthPicker);
              setShowYearPicker(false);
            }}
            className="h-8 px-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            {monthNames[currentMonth]}
            <ChevronDownIcon className="ml-1 h-3.5 w-3.5" />
          </Button>
        )}

        {captionLayout === "dropdown-years" && (
          <span className="text-sm font-medium text-foreground">
            {monthNames[currentMonth]}
          </span>
        )}

        {(captionLayout === "dropdown" ||
          captionLayout === "dropdown-years") && (
          <Button
            variant="outline"
            onClick={() => {
              setShowYearPicker(!showYearPicker);
              setShowMonthPicker(false);
            }}
            className="h-8 px-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            {currentYear}
            <ChevronDownIcon className="ml-1 h-3.5 w-3.5" />
          </Button>
        )}

        {captionLayout === "dropdown-months" && (
          <span className="text-sm font-medium text-foreground">
            {currentYear}
          </span>
        )}
      </div>
    );
  };

  const CalendarDayButtonComponent = components.DayButton || CalendarDayButton;

  return (
    <div
      className={cn(
        "bg-background text-foreground group/calendar p-3 border border-border rounded-md shadow-sm",
        animate && "transition-all",
        numberOfMonths > 1 && "flex flex-col gap-4 sm:flex-row",
        className
      )}
      dir={dir}
      data-calendar-container
      {...restProps}
    >
      {Array.from({ length: numberOfMonths }, (_, monthIndex) => {
        const currentDate = currentDates[monthIndex];
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const calendarDays = generateCalendarDays(currentMonth, currentYear);

        return (
          <div key={monthIndex} className="relative">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateMonth("prev")}
                className={cn(
                  "flex items-center justify-center h-8 w-8 hover:bg-accent hover:text-accent-foreground",
                  numberOfMonths === 1 && "flex",
                  numberOfMonths > 1 && monthIndex === 0 && "flex",
                  numberOfMonths > 1 && monthIndex > 0 && "hidden"
                )}
                aria-label={labels.labelPrevious?.() || "Previous month"}
                disabled={fromMonth && currentDate <= fromMonth}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>

              {renderCaption(monthIndex)}

              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateMonth("next")}
                className={cn(
                  "flex items-center justify-center hover:bg-accent hover:text-accent-foreground",
                  numberOfMonths === 1 && "flex",
                  numberOfMonths > 1 && monthIndex === 0 && "flex sm:hidden",
                  numberOfMonths > 1 &&
                    monthIndex === numberOfMonths - 1 &&
                    "hidden sm:flex",
                  numberOfMonths > 1 &&
                    monthIndex > 0 &&
                    monthIndex < numberOfMonths - 1 &&
                    "hidden"
                )}
                aria-label={labels.labelNext?.() || "Next month"}
                disabled={toMonth && currentDate >= toMonth}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>

            {showMonthPicker && (
              <div className="absolute top-10 bottom-0 left-0 right-0 z-40 bg-popover border border-border rounded-lg shadow-lg">
                <div className="p-4 h-full overflow-y-auto flex justify-center">
                  <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
                    {months.map((month, index) => (
                      <Button
                        key={month}
                        variant="ghost"
                        onClick={() => handleMonthSelect(index, monthIndex)}
                        className={cn(
                          "h-10 text-sm font-medium justify-center w-full min-w-0 hover:bg-accent hover:text-accent-foreground",
                          index === currentMonth &&
                            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                        )}
                      >
                        {month.slice(0, 3)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {showYearPicker && (
              <div className="absolute top-10 bottom-0 left-0 right-0 z-40 bg-popover border border-border rounded-lg shadow-lg">
                <div className="p-4 h-full overflow-y-auto">
                  <div className="grid grid-cols-4 gap-2">
                    {generateYears().map((year) => (
                      <Button
                        key={year}
                        variant="ghost"
                        onClick={() => handleYearSelect(year, monthIndex)}
                        className={cn(
                          "h-9 text-sm font-medium justify-center hover:bg-accent hover:text-accent-foreground w-full",
                          year === currentYear &&
                            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                        )}
                      >
                        {year}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div
              className={cn(
                "grid mb-2",
                showWeekNumber ? "grid-cols-8" : "grid-cols-7"
              )}
            >
              {showWeekNumber && (
                <div
                  className="flex items-center justify-center text-sm font-normal text-muted-foreground"
                  style={{ height: "var(--cell-size, 2rem)" }}
                >
                  #
                </div>
              )}
              {weekDayNames.map((day) => (
                <div
                  key={day}
                  className={cn(
                    "flex items-center justify-center text-xs font-normal text-muted-foreground",
                    "[height:var(--cell-size,2rem)] [min-height:var(--cell-size,2rem)]"
                  )}
                >
                  {formatters.formatWeekdayName
                    ? formatters.formatWeekdayName(new Date())
                    : day}
                </div>
              ))}
            </div>

            <div
              className={cn(
                "grid gap-1",
                showWeekNumber ? "grid-cols-8" : "grid-cols-7"
              )}
            >
              {calendarDays.map((dayObj, index) => {
                const modifiers = getDayModifiers(
                  dayObj.date,
                  currentMonth,
                  currentYear
                );
                const modifiersArray = Object.keys(modifiers).filter(
                  (key) => modifiers[key]
                );
                const dayClassNames = modifiersArray
                  .map((modifier) => modifiersClassNames[modifier] || "")
                  .join(" ");

                const DayButtonComponent = CalendarDayButtonComponent;

                return (
                  <React.Fragment key={`${monthIndex}-${index}`}>
                    {dayObj.weekNumber !== null && showWeekNumber && (
                      <div
                        className={cn(
                          "flex items-center justify-center text-xs text-muted-foreground",
                          "[height:var(--cell-size,2rem)] [width:var(--cell-size,2rem)]",
                          "[min-height:var(--cell-size,2rem)] [min-width:var(--cell-size,2rem)]"
                        )}
                      >
                        {formatters.formatWeekNumber
                          ? formatters.formatWeekNumber(dayObj.weekNumber)
                          : dayObj.weekNumber}
                      </div>
                    )}
                    <DayButtonComponent
                      day={{ date: dayObj.date }}
                      modifiers={modifiers}
                      onClick={() => handleDateClick(dayObj.date)}
                      onMouseEnter={() => handleDateMouseEnter(dayObj.date)}
                      onMouseLeave={() => handleDateMouseLeave(dayObj.date)}
                      disabled={modifiers.disabled}
                      className={cn(
                        "text-xs font-normal flex flex-col items-center justify-center p-0.5 relative gap-0.5",
                        "[height:var(--cell-size,2rem)] [width:var(--cell-size,2rem)]",
                        "[min-height:var(--cell-size,2rem)] [min-width:var(--cell-size,2rem)]",
                        "hover:bg-accent hover:text-accent-foreground",
                        !dayObj.isCurrentMonth &&
                          showOutsideDays &&
                          "text-muted-foreground opacity-40",
                        !dayObj.isCurrentMonth &&
                          !showOutsideDays &&
                          "invisible",
                        modifiers.selected &&
                          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                        modifiers.today &&
                          !modifiers.selected &&
                          "bg-accent text-accent-foreground font-semibold",
                        modifiers.range_start &&
                          "bg-primary text-primary-foreground rounded-l-md rounded-r-none",
                        modifiers.range_end &&
                          "bg-primary text-primary-foreground rounded-r-md rounded-l-none",
                        modifiers.range_middle &&
                          "bg-accent text-accent-foreground rounded-none",
                        modifiers.range_middle_preview &&
                          "bg-muted text-muted-foreground rounded-none opacity-50",
                        modifiers.range_end_preview &&
                          "bg-primary/50 text-primary-foreground rounded-r-md rounded-l-none opacity-50",
                        modifiers.disabled &&
                          "text-muted-foreground opacity-50 cursor-not-allowed hover:bg-transparent",
                        dayClassNames,
                        classNames.day
                      )}
                      data-date={dayObj.date.toISOString()}
                      data-modifiers={modifiersArray.join(" ")}
                    >
                      {formatters.formatDay
                        ? formatters.formatDay(dayObj.date)
                        : dayObj.day}
                    </DayButtonComponent>
                  </React.Fragment>
                );
              })}
            </div>

            {footer && (
              <div className="mt-4 text-center text-sm text-muted-foreground">
                {footer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export { Calendar, CalendarDayButton };
