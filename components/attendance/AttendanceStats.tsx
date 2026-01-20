"use client";

import { AttendanceStats as StatsType } from "@/lib/types/attendance";
import { motion } from "framer-motion";

interface AttendanceStatsProps {
  stats: StatsType;
}

// Helper for visual calculation
const useAttendanceVisuals = (stats: StatsType) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = stats.attendancePercentage;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getStatus = (pct: number) => {
    if (pct >= 95)
      return { message: "Excellent!", emoji: "🎉", color: "text-success" };
    if (pct >= 85)
      return { message: "Great job!", emoji: "🌟", color: "text-success" };
    if (pct >= 75)
      return { message: "Keep it up!", emoji: "👍", color: "text-warning" };
    return { message: "Needs attention", emoji: "⚠️", color: "text-error" };
  };
  const status = getStatus(progress);

  return { radius, circumference, strokeDashoffset, status, progress };
};

// Sub-components for flexible layout
export const AttendanceHero = ({ stats }: { stats: StatsType }) => {
  const { circumference, strokeDashoffset, status, progress } =
    useAttendanceVisuals(stats);

  // Use viewBox for proper SVG scaling - radius 40, viewBox 100x100
  const svgSize = 100;
  const svgRadius = 40;
  const svgStrokeWidth = 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-surface via-surface to-success-light/10 border border-border rounded-2xl p-3 md:p-6 shadow-sm relative overflow-hidden h-full flex flex-row items-center justify-between"
    >
      <div className="flex-1 min-w-0 z-10">
        <div className="inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-success/10 border border-success/20 mb-2 md:mb-3">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-success animate-pulse"></span>
          <span className="text-success font-semibold text-[10px] mdtext-sm">
            Present Today
          </span>
        </div>
        <h2
          className={`text-xl font-bold font-heading ${status.color} mb-0.5 md:mb-1 flex items-center gap-1 md:gap-2`}
        >
          {status.message}{" "}
          <span className="text-2xl">{status.emoji}</span>
        </h2>
        <p className="text-text-secondary text-[10px] md:text-sm leading-tight hidden md:block">
          <span className="font-bold text-text-primary text-lg">
            {stats.present}
          </span>
          <span className="mx-0.5 md:mx-1">/</span>
          <span className="font-medium">{stats.totalDays}</span> Days
        </p>
      </div>

      {/* Right: Circular Progress Ring - with viewBox for proper scaling */}
      <div className="relative w-28 h-28 md:w-28 md:h-28 flex-shrink-0 ml-2">
        <svg
          className="w-full h-full transform -rotate-90 drop-shadow-sm"
          viewBox={`0 0 ${svgSize} ${svgSize}`}
        >
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={svgRadius}
            className="stroke-surface-active"
            strokeWidth={svgStrokeWidth}
            fill="none"
          />
          <motion.circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={svgRadius}
            className="stroke-success"
            strokeWidth={svgStrokeWidth}
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-lg md:text-2xl font-bold font-heading text-text-primary">
            {progress}%
          </span>
        </div>
      </div>

      {/* Decorative Gradient Blob */}
      <div className="absolute -top-16 -right-16 w-32 md:w-48 h-32 md:h-48 bg-success/10 rounded-full blur-3xl pointer-events-none"></div>
    </motion.div>
  );
};

export const AttendanceMonthStats = ({ stats }: { stats: StatsType }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.1 }}
    className="bg-surface border border-border rounded-2xl p-3 md:p-5 shadow-sm h-full flex flex-col justify-center"
  >
    <div className="flex items-center justify-between mb-2 md:mb-3">
      <h4 className="text-xs md:text-sm font-bold text-text-primary">
        This Month
      </h4>
      <span className="text-[10px] md:text-xs text-text-muted">Jan 2026</span>
    </div>

    {/* Mobile: Horizontal Stack, Desktop: Grid */}
    <div className="flex flex-row md:grid md:grid-cols-3 gap-2 overflow-x-auto md:overflow-visible pb-1 md:pb-0 scrollbar-hide">
      {/* Stats Items - Flexible width on mobile */}
      {[
        {
          label: "Present",
          val: stats.present,
          color: "bg-success",
          text: "P",
        },
        { label: "Absent", val: stats.absent, color: "bg-error", text: "A" },
        {
          label: "Holiday",
          val: stats.holiday,
          color: "bg-text-muted",
          text: "H",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="flex-1 min-w-[70px] text-center p-2 border border-border rounded-xl flex flex-col items-center justify-center"
        >
          <div
            className={`w-4 h-4 md:w-5 md:h-5 rounded ${item.color} mb-1 flex items-center justify-center text-white text-[9px] md:text-[10px] font-bold`}
          >
            {item.text}
          </div>
          <p className="text-base md:text-2xl font-bold text-text-primary leading-tight">
            {item.val}
          </p>
          <p className="text-[9px] md:text-[10px] text-text-muted uppercase font-bold tracking-wider">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  </motion.div>
);

export const AttendanceKey = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.2 }}
    className="bg-surface border border-border rounded-2xl p-4 md:p-5 shadow-sm"
  >
    <h4 className="text-sm font-bold text-text-primary mb-3 md:mb-4">
      Attendance Key
    </h4>
    <div className="grid grid-cols-2 md:grid-cols-2 gap-y-2 gap-x-4">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-success flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow-sm">
          P
        </div>
        <span className="text-xs md:text-sm text-text-secondary font-medium">
          Present
        </span>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-error flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow-sm">
          A
        </div>
        <span className="text-xs md:text-sm text-text-secondary font-medium">
          Absent
        </span>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-text-muted flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow-sm">
          H
        </div>
        <span className="text-xs md:text-sm text-text-secondary font-medium">
          Holiday
        </span>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-accent flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow-sm">
          LV
        </div>
        <span className="text-xs md:text-sm text-text-secondary font-medium">
          Leave
        </span>
      </div>
    </div>
  </motion.div>
);

export const AttendanceStats = ({ stats }: AttendanceStatsProps) => {
  // Circular Progress Logic
  const radius = 40; // Smaller radius for responsiveness default
  const circumference = 2 * Math.PI * radius;
  const progress = stats.attendancePercentage;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Dynamic Message logic
  const getStatus = (pct: number) => {
    if (pct >= 95)
      return { message: "Excellent!", emoji: "🎉", color: "text-success" };
    if (pct >= 85)
      return { message: "Great job!", emoji: "🌟", color: "text-success" };
    if (pct >= 75)
      return { message: "Keep it up!", emoji: "👍", color: "text-warning" };
    return { message: "Needs attention", emoji: "⚠️", color: "text-error" };
  };
  const status = getStatus(progress);

  return (
    <div className="flex flex-col gap-5">
      <AttendanceHero stats={stats} />
      <AttendanceMonthStats stats={stats} />
      <AttendanceKey />
    </div>
  );
};
