"use client";

import { motion } from "framer-motion";
import { User, ChevronRight, CheckCircle2, UserX } from "lucide-react";
import { clsx } from "clsx";
import {
  ResultStatusBadge,
  getResultStatus,
  getProgressBarColor,
} from "@/utils/status-styles";

// Reuse the same theme colors from ClassCard
const themeColors = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-500/10",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-100 dark:border-blue-500/20",
    accent: "bg-blue-500 dark:bg-blue-400",
  },
  green: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-100 dark:border-emerald-500/20",
    accent: "bg-emerald-500 dark:bg-emerald-400",
  },
  purple: {
    bg: "bg-violet-50 dark:bg-violet-500/10",
    text: "text-violet-700 dark:text-violet-300",
    border: "border-violet-100 dark:border-violet-500/20",
    accent: "bg-violet-500 dark:bg-violet-400",
  },
  orange: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-100 dark:border-amber-500/20",
    accent: "bg-amber-500 dark:bg-amber-400",
  },
  pink: {
    bg: "bg-rose-50 dark:bg-rose-500/10",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-100 dark:border-rose-500/20",
    accent: "bg-rose-500 dark:bg-rose-400",
  },
  teal: {
    bg: "bg-teal-50 dark:bg-teal-500/10",
    text: "text-teal-700 dark:text-teal-300",
    border: "border-teal-100 dark:border-teal-500/20",
    accent: "bg-teal-500 dark:bg-teal-400",
  },
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    text: "text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-100 dark:border-indigo-500/20",
    accent: "bg-indigo-500 dark:bg-indigo-400",
  },
  cyan: {
    bg: "bg-cyan-50 dark:bg-cyan-500/10",
    text: "text-cyan-700 dark:text-cyan-300",
    border: "border-cyan-100 dark:border-cyan-500/20",
    accent: "bg-cyan-500 dark:bg-cyan-400",
  },
};

export type ColorTheme = keyof typeof themeColors;

// Helper to get theme based on index for visual variety
export function getThemeByIndex(index: number): ColorTheme {
  const themes = Object.keys(themeColors) as ColorTheme[];
  return themes[index % themes.length];
}

interface ResultSectionCardProps {
  id: string;
  className: string;
  section: string;
  subject: string;
  teacherName: string;
  totalStudents: number;
  checkedCount: number;
  absentCount: number;
  completionPercent: number;
  colorTheme?: ColorTheme;
  index?: number;
  onViewDetails: () => void;
}

export function ResultSectionCard({
  className: classGrade,
  section,
  subject,
  teacherName,
  totalStudents,
  checkedCount,
  absentCount,
  completionPercent,
  colorTheme,
  index = 0,
  onViewDetails,
}: ResultSectionCardProps) {
  const theme = themeColors[colorTheme || getThemeByIndex(index)];
  const status = getResultStatus(completionPercent);
  const eligibleStudents = totalStudents - absentCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
      className="group relative bg-surface border border-border rounded-xl overflow-hidden h-full flex flex-col hover:border-accent/30 transition-colors"
    >
      {/* Top Banner / Header */}
      <div
        className={clsx(
          "px-5 py-4 flex justify-between items-start border-b border-dashed",
          theme.border,
          theme.bg,
        )}
      >
        <div>
          <h3
            className={clsx(
              "text-xs font-bold uppercase tracking-wider mb-0.5 opacity-80",
              theme.text,
            )}
          >
            {classGrade}
          </h3>
          <div className="flex items-baseline gap-1">
            <span
              className={clsx("text-2xl font-bold font-heading", theme.text)}
            >
              Section {section}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        <ResultStatusBadge status={status} size="sm" />
      </div>

      {/* Main Content */}
      <div className="p-5 flex-1 flex flex-col gap-4">
        {/* Subject Name with Teacher */}
        <div className="space-y-1">
          <span className="text-xs text-text-secondary uppercase font-semibold tracking-wide">
            Subject
          </span>
          <p className="text-lg font-bold text-text-primary">{subject}</p>
          <div className="flex items-center gap-2 mt-1">
            <div
              className={clsx(
                "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                theme.bg,
              )}
            >
              <User className={clsx("w-3 h-3", theme.text)} />
            </div>
            <span className="text-sm text-text-secondary">
              {teacherName}
            </span>
          </div>
        </div>

        {/* Statistics Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-text-secondary uppercase font-semibold tracking-wide">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Checked</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-text-primary">
                {checkedCount}
              </span>
              <span className="text-sm text-text-muted">/ {eligibleStudents}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-text-secondary uppercase font-semibold tracking-wide">
              <UserX className="w-3.5 h-3.5" />
              <span>Absent</span>
            </div>
            <div className="text-xl font-bold text-text-muted">{absentCount}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary font-medium">Progress</span>
            <span className="font-bold text-text-primary">
              {completionPercent.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-surface-active rounded-full h-2.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercent}%` }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={clsx("h-full rounded-full", getProgressBarColor(completionPercent))}
            />
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-end">
          <button
            onClick={onViewDetails}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent/10 rounded-lg transition-colors shrink-0"
          >
            View Details
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
