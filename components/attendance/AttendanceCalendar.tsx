"use client";

import { useState } from "react";
import { Icons } from "@/utils/sidebar/icons";
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
} from "date-fns";
import { AttendanceRecord, AttendanceStatus } from "@/lib/types/attendance";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface AttendanceCalendarProps {
  records: AttendanceRecord[];
  onDateSelect: (date: Date, record?: AttendanceRecord) => void;
}

export const AttendanceCalendar = ({
  records,
  onDateSelect,
}: AttendanceCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Calendar Generation
  const generateCalendarDays = (month: Date) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const days = [];
    let currentDate = calendarStart;

    while (currentDate <= calendarEnd) {
      const recordForDate = records.find((r) => isSameDay(r.date, currentDate));
      days.push({
        date: new Date(currentDate),
        dateNumber: currentDate.getDate(),
        isCurrentMonth: isSameMonth(currentDate, month),
        isToday: isToday(currentDate),
        record: recordForDate,
      });
      currentDate = addDays(currentDate, 1);
    }
    return days;
  };

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDateClick = (day: { date: Date; record?: AttendanceRecord }) => {
    setSelectedDate(day.date);
    onDateSelect(day.date, day.record);
  };

  const calendarDays = generateCalendarDays(currentMonth);
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  // Status colors with better contrast
  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case "Present":
        return "bg-success text-white";
      case "Absent":
        return "bg-error text-white";
      case "Leave":
        return "bg-accent text-accent-foreground";
      case "Holiday":
        return "bg-text-muted text-white";
      default:
        return "text-text-primary hover:bg-surface-active";
    }
  };

  return (
    <div className="w-full">
      {/* Header with Month Navigation */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-bold font-heading text-text-primary">
          {format(currentMonth, "MMMM yyyy")}
        </h3>

        <div className="flex gap-1">
          <button
            onClick={handlePreviousMonth}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-active hover:bg-surface-hover transition-colors text-text-secondary active:scale-95"
            aria-label="Previous month"
          >
            <Icons.ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-active hover:bg-surface-hover transition-colors text-text-secondary active:scale-95"
            aria-label="Next month"
          >
            <Icons.ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Day Headers - Single letter for compactness */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {dayNames.map((day, i) => (
          <div
            key={i}
            className="text-xs font-bold text-text-muted text-center py-2 uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid with Animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMonth.toISOString()}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-7 gap-1"
        >
          {calendarDays.map((day, index) => {
            const isSelected =
              selectedDate && isSameDay(day.date, selectedDate);

            const cellClasses = clsx(
              "h-10 md:h-18 relative flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer",
              !day.isCurrentMonth && "opacity-20 pointer-events-none",
              day.record
                ? getStatusColor(day.record.status)
                : "text-text-primary hover:bg-surface-active",
              isSelected &&
                "ring-2 ring-accent ring-offset-2 ring-offset-surface shadow-md z-10",
              day.isToday &&
                !day.record &&
                "bg-accent/10 text-accent font-bold",
            );

            return (
              <div
                key={index}
                className={cellClasses}
                onClick={() => day.isCurrentMonth && handleDateClick(day)}
                role="button"
                tabIndex={day.isCurrentMonth ? 0 : -1}
              >
                {day.dateNumber}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
