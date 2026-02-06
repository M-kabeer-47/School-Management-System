"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { cn } from "@/lib/common/utils";

// ═══════════════════════════════════════════════════════════════════
// TYPES & CONSTANTS
// ═══════════════════════════════════════════════════════════════════

interface MonthFilterProps {
  value: string; // "all" or "YYYY-MM"
  onChange: (value: string) => void;
  showAllOption?: boolean;
  allLabel?: string;
  className?: string;
}

const MONTH_NAMES = [
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

const SHORT_MONTHS = [
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

// ═══════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

function getRecentMonths(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const label = `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
    return { value, label };
  });
}

function formatMonthLabel(value: string, allLabel: string): string {
  if (value === "all") return allLabel;
  if (value === "custom") return "Select month...";
  const [year, month] = value.split("-");
  const monthIndex = parseInt(month, 10) - 1;
  return `${MONTH_NAMES[monthIndex]} ${year}`;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export default function MonthFilter({
  value,
  onChange,
  showAllOption = true,
  allLabel = "All Months",
  className,
}: MonthFilterProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [pickerView, setPickerView] = useState<"year" | "month">("year");
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const recentMonths = getRecentMonths(5);

  // Check if current value is a custom month (not in recent months and not "all")
  const isCustomMonth =
    value !== "all" && !recentMonths.some((m) => m.value === value);

  // Setup portal container
  useLayoutEffect(() => {
    setPortalContainer(document.body);
  }, []);

  // Update position when picker opens
  const updateCoords = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 4,
        left: rect.left,
        width: Math.max(rect.width, 260),
      });
    }
  };

  useEffect(() => {
    if (showPicker) {
      updateCoords();
      window.addEventListener("scroll", updateCoords, true);
      window.addEventListener("resize", updateCoords);
    }
    return () => {
      window.removeEventListener("scroll", updateCoords, true);
      window.removeEventListener("resize", updateCoords);
    };
  }, [showPicker]);

  // Close on outside click
  useEffect(() => {
    if (!showPicker) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        pickerRef.current &&
        !pickerRef.current.contains(target)
      ) {
        setShowPicker(false);
        setPickerView("year");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPicker]);

  const handleSelectChange = (newValue: string) => {
    if (newValue === "custom") {
      updateCoords();
      setShowPicker(true);
      setPickerView("year");
      setPickerYear(new Date().getFullYear());
    } else {
      setShowPicker(false);
      onChange(newValue);
    }
  };

  // Handle Select open state change - intercept when custom month is selected
  const handleOpenChange = (open: boolean) => {
    if (open && isCustomMonth) {
      // User clicked trigger with custom month selected - show picker instead
      updateCoords();
      setShowPicker(true);
      setPickerView("year");
      setPickerYear(new Date().getFullYear());
    }
  };

  const handleSelectYear = (year: number) => {
    setPickerYear(year);
    setPickerView("month");
  };

  const handleSelectMonth = (monthIndex: number) => {
    const monthValue = `${pickerYear}-${String(monthIndex + 1).padStart(2, "0")}`;
    onChange(monthValue);
    setShowPicker(false);
    setPickerView("year");
  };

  // Year grid
  const startYear = Math.floor(pickerYear / 12) * 12;
  const years = Array.from({ length: 12 }, (_, i) => startYear + i);

  const picker =
    showPicker && portalContainer ? (
      <div
        ref={pickerRef}
        className="fixed z-50 bg-surface border border-border rounded-xl shadow-xl shadow-black/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        style={{ top: coords.top, left: coords.left, width: coords.width }}
      >
        {/* Year Picker View */}
        {pickerView === "year" && (
          <>
            <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-surface-hover/50">
              <button
                type="button"
                onClick={() => setPickerYear((y) => y - 12)}
                className="p-1.5 hover:bg-surface-active rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-text-secondary" />
              </button>
              <span className="text-sm font-bold text-text-primary">
                {startYear} – {startYear + 11}
              </span>
              <button
                type="button"
                onClick={() => setPickerYear((y) => y + 12)}
                className="p-1.5 hover:bg-surface-active rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 p-3">
              {years.map((year) => (
                <button
                  type="button"
                  key={year}
                  onClick={() => handleSelectYear(year)}
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
        )}

        {/* Month Picker View */}
        {pickerView === "month" && (
          <>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-surface-hover/50">
              <button
                type="button"
                onClick={() => setPickerView("year")}
                className="p-1.5 hover:bg-surface-active rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-text-secondary" />
              </button>
              <span className="text-sm font-bold text-text-primary">
                {pickerYear}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 p-3">
              {SHORT_MONTHS.map((m, idx) => {
                const monthValue = `${pickerYear}-${String(idx + 1).padStart(2, "0")}`;
                return (
                  <button
                    type="button"
                    key={m}
                    onClick={() => handleSelectMonth(idx)}
                    className={cn(
                      "py-2 text-sm font-medium rounded-lg transition-colors",
                      value === monthValue
                        ? "bg-accent text-white"
                        : "text-text-primary hover:bg-surface-hover",
                    )}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Cancel Button */}
        <div className="px-3 pb-3">
          <button
            type="button"
            onClick={() => {
              setShowPicker(false);
              setPickerView("year");
            }}
            className="w-full py-2 text-text-muted text-xs font-medium rounded-lg hover:bg-surface-active transition-colors border border-border"
          >
            Cancel
          </button>
        </div>
      </div>
    ) : null;

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <Select
        value={isCustomMonth ? "custom" : value}
        onValueChange={handleSelectChange}
        onOpenChange={handleOpenChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={allLabel}>
            {formatMonthLabel(value, allLabel)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {showAllOption && <SelectItem value="all">{allLabel}</SelectItem>}
          {showAllOption && <SelectSeparator />}
          {recentMonths.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
          <SelectSeparator />
          <SelectItem value="custom">
            <span className="flex items-center gap-2 text-accent">
              <CalendarDays className="w-4 h-4" />
              Pick a specific month...
            </span>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Portal-rendered picker to escape overflow:hidden */}
      {portalContainer && createPortal(picker, portalContainer)}
    </div>
  );
}
