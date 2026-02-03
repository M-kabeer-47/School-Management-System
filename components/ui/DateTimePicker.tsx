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
  isBefore,
  startOfDay,
} from "date-fns";
import { cn } from "@/lib/common/utils";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  showTime?: boolean;
  error?: string;
  inline?: boolean;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isDisabled: boolean;
}

type View = "calendar" | "time";

// ═══════════════════════════════════════════════════════════════════
// CALENDAR HEADER COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface CalendarHeaderProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

function CalendarHeader({
  currentMonth,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-border">
      <button
        type="button"
        onClick={onPrevMonth}
        className="p-1.5 hover:bg-surface-active rounded-lg transition-colors"
      >
        <ChevronLeft className="w-4 h-4 text-text-secondary" />
      </button>
      <span className="text-sm font-semibold text-text-primary font-heading">
        {format(currentMonth, "MMMM yyyy")}
      </span>
      <button
        type="button"
        onClick={onNextMonth}
        className="p-1.5 hover:bg-surface-active rounded-lg transition-colors"
      >
        <ChevronRight className="w-4 h-4 text-text-secondary" />
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CALENDAR GRID COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface CalendarGridProps {
  days: CalendarDay[];
  selectedDate: Date | null;
  onDateClick: (date: Date, isDisabled: boolean) => void;
}

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function CalendarGrid({ days, selectedDate, onDateClick }: CalendarGridProps) {
  return (
    <>
      {/* Day Names */}
      <div className="grid grid-cols-7 gap-0.5 px-3 pt-2">
        {DAY_NAMES.map((day) => (
          <div
            key={day}
            className="text-[10px] font-medium text-text-muted text-center py-0.5"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0.5 px-3 py-2">
        {days.map((day, index) => {
          const isSelected = selectedDate && isSameDay(day.date, selectedDate);
          const isTodayDate = isToday(day.date);

          let cellClasses =
            "w-8 h-8 flex items-center justify-center rounded-md text-xs transition-all font-medium ";

          if (!day.isCurrentMonth) {
            cellClasses += "text-text-muted/40";
          } else if (day.isDisabled) {
            cellClasses += "text-text-muted/40 cursor-not-allowed";
          } else if (isSelected) {
            cellClasses +=
              "bg-accent text-accent-foreground shadow-sm shadow-accent/25 cursor-pointer";
          } else if (isTodayDate) {
            cellClasses +=
              "bg-accent/10 text-accent hover:bg-accent/20 cursor-pointer";
          } else {
            cellClasses +=
              "text-text-primary hover:bg-surface-hover cursor-pointer";
          }

          return (
            <button
              key={index}
              type="button"
              onClick={() => onDateClick(day.date, day.isDisabled)}
              className={cellClasses}
              disabled={day.isDisabled || !day.isCurrentMonth}
            >
              {day.date.getDate()}
            </button>
          );
        })}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TIME PICKER VIEW COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface TimePickerViewProps {
  selectedDate: Date | null;
  time: string;
  onTimeChange: (time: string) => void;
  onBack: () => void;
  onConfirm: () => void;
}

function TimePickerView({
  selectedDate,
  time,
  onTimeChange,
  onBack,
  onConfirm,
}: TimePickerViewProps) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
        <button
          type="button"
          onClick={onBack}
          className="p-1.5 hover:bg-surface-active rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-text-secondary" />
        </button>
        <span className="text-sm font-semibold text-text-primary font-heading">
          Select Time
        </span>
      </div>

      {/* Selected Date Display */}
      <div className="px-3 py-3 border-b border-border bg-surface-hover/50">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-text-primary">
            {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""}
          </span>
        </div>
      </div>

      {/* Time Input */}
      <div className="p-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <input
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className="px-4 py-2 text-lg font-bold border border-border rounded-xl bg-surface text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none text-center tabular-nums"
          />
        </div>
        <p className="text-xs text-text-muted text-center mb-4">
          Choose the time for your deadline
        </p>
      </div>

      {/* Action Buttons */}
      <div className="px-3 pb-3 flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-2 text-text-secondary text-xs font-bold rounded-lg hover:bg-surface-active transition-colors border border-border"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 py-2 bg-accent text-accent-foreground text-xs font-bold rounded-lg hover:bg-accent-hover transition-colors shadow-sm shadow-accent/25"
        >
          Confirm
        </button>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export default function DateTimePicker({
  value,
  onChange,
  placeholder = "Select date and time",
  disabled = false,
  minDate,
  showTime = true,
  error,
  inline = false,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>("calendar");
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date(),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null,
  );
  const [time, setTime] = useState(
    value ? format(new Date(value), "HH:mm") : "23:59",
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset view when closing
  useEffect(() => {
    if (!isOpen) setView("calendar");
  }, [isOpen]);

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

  // Generate calendar days
  const generateCalendarDays = (): CalendarDay[] => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const days: CalendarDay[] = [];
    let currentDate = calendarStart;

    while (currentDate <= calendarEnd) {
      days.push({
        date: new Date(currentDate),
        isCurrentMonth: isSameMonth(currentDate, currentMonth),
        isDisabled: minDate
          ? isBefore(currentDate, startOfDay(minDate))
          : false,
      });
      currentDate = addDays(currentDate, 1);
    }

    return days;
  };

  const handleDateClick = (date: Date, isDisabled: boolean) => {
    if (isDisabled) return;
    setSelectedDate(date);
    if (showTime) {
      setView("time");
    } else {
      onChange(format(date, "yyyy-MM-dd'T'HH:mm"));
      setIsOpen(false);
    }
  };

  const handleConfirm = () => {
    if (selectedDate) {
      const [hours, minutes] = time.split(":").map(Number);
      const combined = new Date(selectedDate);
      combined.setHours(hours, minutes, 0, 0);
      onChange(format(combined, "yyyy-MM-dd'T'HH:mm"));
    }
    setIsOpen(false);
  };

  const displayValue = value
    ? format(
        new Date(value),
        showTime ? "MMM d, yyyy 'at' h:mm a" : "MMM d, yyyy",
      )
    : "";

  return (
    <div className="relative" ref={containerRef}>
      {/* Input Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border text-left transition-all",
          error
            ? "border-error bg-error/5 text-error"
            : isOpen
              ? "border-accent ring-2 ring-accent/20 bg-accent/5"
              : "border-border bg-surface hover:border-border-strong hover:bg-surface-hover",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        )}
        disabled={disabled}
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
            displayValue ? "text-text-primary" : "text-text-muted",
          )}
        >
          {displayValue || placeholder}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={cn(
            "min-w-[300px] bg-surface border border-border rounded-xl shadow-xl shadow-black/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-left",
            inline ? "relative mt-4 w-full shadow-none" : "absolute z-50 mt-2",
          )}
        >
          {view === "calendar" ? (
            <>
              <CalendarHeader
                currentMonth={currentMonth}
                onPrevMonth={() => setCurrentMonth(subMonths(currentMonth, 1))}
                onNextMonth={() => setCurrentMonth(addMonths(currentMonth, 1))}
              />
              <CalendarGrid
                days={generateCalendarDays()}
                selectedDate={selectedDate}
                onDateClick={handleDateClick}
              />
              <div className="px-3 pb-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 text-text-muted text-xs font-bold rounded-lg hover:bg-surface-active transition-colors border border-border"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <TimePickerView
              selectedDate={selectedDate}
              time={time}
              onTimeChange={setTime}
              onBack={() => setView("calendar")}
              onConfirm={handleConfirm}
            />
          )}
        </div>
      )}
    </div>
  );
}
