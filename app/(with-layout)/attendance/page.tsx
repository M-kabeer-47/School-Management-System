"use client";

import { useState } from "react";
import { AttendanceCalendar } from "@/components/student/attendance/AttendanceCalendar";
import {
  AttendanceStats as AttendanceStatsComponent,
  AttendanceHero,
  AttendanceMonthStats,
  AttendanceKey,
} from "@/components/student/attendance/AttendanceStats";
import { AttendanceRecord } from "@/lib/student/types/attendance";
import { isSameDay } from "date-fns"; // Removed addDays, subDays, isWeekend as they were used in generator
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { PageHeaderIcons } from "@/utils/navigation/icons";

import { allRecords, stats } from "@/lib/student/mock-data/attendance";
// Removed local generators

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRecord, setSelectedRecord] = useState<
    AttendanceRecord | undefined
  >(allRecords.find((r) => isSameDay(r.date, new Date())));

  const handleDateSelect = (date: Date, record?: AttendanceRecord) => {
    setSelectedDate(date);
    setSelectedRecord(record);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className=""
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-bold font-heading text-text-primary flex items-center gap-2 md:gap-3"
          >
            Attendance
            <PageHeaderIcons.Attendance className="w-8 h-8 md:w-12 md:h-12" />
          </motion.h1>
          <p className="text-text-secondary mt-1 md:mt-2 text-xs md:text-base">
            Track your child&apos;s daily presence and regularity.
          </p>
        </div>

        <Button className="bg-accent-gradient hover:bg-accent/90 text-accent-foreground px-4 py-2 md:px-5 md:py-2.5 rounded-xl font-semibold shadow-lg shadow-accent/20 transition-all self-start md:self-auto text-sm md:text-base">
          + Apply for Leave
        </Button>
      </div>

      {/* MOBILE LAYOUT - Below 1000px: Separate rows for Hero and Month */}
      <div className="flex flex-col gap-4 [@media(min-width:1000px)]:hidden">
        {/* Row 1: Hero (percentage) - full width on small screens */}
        <div className="h-40 sm:h-44">
          <AttendanceHero stats={stats} />
        </div>

        {/* Row 2: Month Stats - full width */}
        <div className="h-auto">
          <AttendanceMonthStats stats={stats} />
        </div>

        {/* Row 3: Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-surface border border-border rounded-2xl p-4 shadow-sm"
        >
          <AttendanceCalendar
            records={allRecords}
            onDateSelect={handleDateSelect}
          />
        </motion.div>

        {/* Row 4: Key */}
        <AttendanceKey />
      </div>

      {/* TABLET LAYOUT - 1000px to 1200px: Stats row above calendar, key below */}
      <div className="hidden [@media(min-width:1000px)]:flex [@media(min-width:1200px)]:hidden flex-col gap-4">
        {/* Row 1: Hero + Month Stats side by side */}
        <div className="flex gap-4 h-44">
          <div className="w-[35%]">
            <AttendanceHero stats={stats} />
          </div>
          <div className="w-[65%]">
            <AttendanceMonthStats stats={stats} />
          </div>
        </div>

        {/* Row 2: Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-surface border border-border rounded-2xl p-5 shadow-sm"
        >
          <AttendanceCalendar
            records={allRecords}
            onDateSelect={handleDateSelect}
          />
        </motion.div>

        {/* Row 3: Key */}
        <AttendanceKey />
      </div>

      {/* DESKTOP LAYOUT - 1200px and above: Sidebar layout */}
      <div className="hidden [@media(min-width:1200px)]:flex flex-row-reverse gap-6 items-start">
        {/* Right Sidebar: Stats Panel */}
        <aside className="w-[320px] xl:w-[380px] flex-shrink-0 sticky top-24">
          <AttendanceStatsComponent stats={stats} />
        </aside>

        {/* Main Content: Calendar */}
        <main className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-surface border border-border rounded-2xl p-6 shadow-sm"
          >
            <AttendanceCalendar
              records={allRecords}
              onDateSelect={handleDateSelect}
            />
          </motion.div>
        </main>
      </div>
    </motion.div>
  );
}
