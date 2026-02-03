"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  ArrowLeft,
} from "lucide-react";
import {
  format,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
  setMonth,
  setYear,
  getYear,
  isBefore,
  startOfDay,
  set,
} from "date-fns";
import { cn } from "@/lib/common/utils";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  error?: string;
}

type View = "year" | "month" | "day";

// ═══════════════════════════════════════════════════════════════════
// YEAR PICKER VIEW
// ═══════════════════════════════════════════════════════════════════

interface YearPickerProps {
  currentYear: number;
  onSelectYear: (year: number) => void;
  onPrevDecade: () => void;
  onNextDecade: () => void;
}

function YearPicker({
  currentYear,
  onSelectYear,
  onPrevDecade,
  onNextDecade,
}: YearPickerProps) {
  // Show a grid of 12 years roughly centered on currentYear or the decade
  const startYear = Math.floor(currentYear / 12) * 12;
  const years = Array.from({ length: 12 }, (_, i) => startYear + i);

  return (
    <>
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <button
          onClick={onPrevDecade}
          className="p-1.5 hover:bg-surface-active rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-text-secondary" />
        </button>
        <span className="text-sm font-bold text-text-primary">
          {startYear} - {startYear + 11}
        </span>
        <button
          onClick={onNextDecade}
          className="p-1.5 hover:bg-surface-active rounded-lg transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-text-secondary" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onSelectYear(year)}
            className={cn(
              "py-2 text-sm font-medium rounded-lg transition-colors hover:bg-surface-hover",
              year === new Date().getFullYear() &&
                "text-accent font-bold bg-accent/10",
            )}
          >
            {year}
          </button>
        ))}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MONTH PICKER VIEW
// ═══════════════════════════════════════════════════════════════════

interface MonthPickerProps {
  year: number;
  onSelectMonth: (monthIndex: number) => void;
  onBack: () => void;
}

function MonthPicker({ year, onSelectMonth, onBack }: MonthPickerProps) {
  const months = [
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

  return (
    <>
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
        <button
          onClick={onBack}
          className="p-1.5 hover:bg-surface-active rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-text-secondary" />
        </button>
        <span className="text-sm font-bold text-text-primary">{year}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {months.map((m, idx) => (
          <button
            key={m}
            onClick={() => onSelectMonth(idx)}
            className="py-2 text-sm font-medium rounded-lg transition-colors hover:bg-surface-hover"
          >
            {m}
          </button>
        ))}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DAY PICKER VIEW (Standard Calendar)
// ═══════════════════════════════════════════════════════════════════

interface DayPickerProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (date: Date) => void;
  onTitleClick: () => void; // Go back to Year/Month selection
}

function DayPicker({
  currentMonth,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
  onTitleClick,
}: DayPickerProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = [];
  let day = calendarStart;
  while (day <= calendarEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <>
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <button
          onClick={onPrevMonth}
          className="p-1.5 hover:bg-surface-active rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-text-secondary" />
        </button>
        <button
          onClick={onTitleClick}
          className="text-sm font-bold text-text-primary hover:text-accent transition-colors"
        >
          {format(currentMonth, "MMMM yyyy")}
        </button>
        <button
          onClick={onNextMonth}
          className="p-1.5 hover:bg-surface-active rounded-lg transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-text-secondary" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 px-3 pt-2">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-[10px] text-text-muted text-center py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 px-3 pb-3">
        {days.map((d, idx) => (
          <button
            key={idx}
            onClick={() => onSelectDate(d)}
            disabled={!isSameMonth(d, currentMonth)}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-md text-xs font-medium transition-all",
              !isSameMonth(d, currentMonth)
                ? "text-transparent cursor-default"
                : isToday(d)
                  ? "bg-accent/10 text-accent"
                  : "text-text-primary hover:bg-surface-hover",
            )}
          >
            {isSameMonth(d, currentMonth) ? format(d, "d") : ""}
          </button>
        ))}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export default function SmartDatePicker({
  value,
  onChange,
  placeholder = "Select Date",
  disabled = false,
  error,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Default to YEAR view if no value is set, otherwise standard DAY view
  const [view, setView] = useState<View>(value ? "day" : "year");

  const [displayDate, setDisplayDate] = useState(
    value ? new Date(value) : new Date(),
  );

  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // When opening, if no value, start at Year selection for ease of DOB
  const handleOpen = () => {
    if (!disabled) {
      if (!value) setView("year");
      setIsOpen(!isOpen);
    }
  };

  const handleSelectYear = (year: number) => {
    const newDate = setYear(displayDate, year);
    setDisplayDate(newDate);
    setView("month");
  };

  const handleSelectMonth = (monthIndex: number) => {
    const newDate = setMonth(displayDate, monthIndex);
    setDisplayDate(newDate);
    setView("day");
  };

  const handleSelectDate = (date: Date) => {
    onChange(format(date, "yyyy-MM-dd"));
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={handleOpen}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border text-left transition-all",
          error
            ? "border-error bg-error/5 text-error"
            : isOpen
              ? "border-accent ring-2 ring-accent/20 bg-accent/5"
              : "border-border bg-surface hover:border-border-strong hover:bg-surface-hover",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <CalendarIcon
          className={cn(
            "w-5 h-5 flex-shrink-0 transition-colors",
            isOpen ? "text-accent" : "text-text-muted",
          )}
        />
        <span
          className={cn(
            "flex-1 text-sm font-medium truncate",
            value ? "text-text-primary" : "text-text-muted",
          )}
        >
          {value ? format(new Date(value), "MMMM d, yyyy") : placeholder}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 min-w-[280px] bg-surface border border-border rounded-xl shadow-xl shadow-black/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {view === "year" && (
            <YearPicker
              currentYear={getYear(displayDate)}
              onSelectYear={handleSelectYear}
              onPrevDecade={() => setDisplayDate((d) => subMonths(d, 12 * 12))} // Approx jump
              onNextDecade={() => setDisplayDate((d) => addMonths(d, 12 * 12))}
            />
          )}
          {view === "month" && (
            <MonthPicker
              year={getYear(displayDate)}
              onSelectMonth={handleSelectMonth}
              onBack={() => setView("year")}
            />
          )}
          {view === "day" && (
            <DayPicker
              currentMonth={displayDate}
              onPrevMonth={() => setDisplayDate(subMonths(displayDate, 1))}
              onNextMonth={() => setDisplayDate(addMonths(displayDate, 1))}
              onSelectDate={handleSelectDate}
              onTitleClick={() => setView("year")}
            />
          )}
        </div>
      )}
    </div>
  );
}
