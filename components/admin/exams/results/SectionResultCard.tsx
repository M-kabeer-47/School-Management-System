"use client";

import { motion } from "framer-motion";
import { ChevronRight, User } from "lucide-react";
import { clsx } from "clsx";
import {
  ResultStatusBadge,
  StatusDot,
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

// Subject data within a section
export interface SubjectProgress {
  id: string;
  subject: string;
  teacherName: string;
  completionPercent: number;
  checkedCount: number;
  totalStudents: number;
  absentCount: number;
}

interface SectionResultCardProps {
  className: string;
  section: string;
  subjects: SubjectProgress[];
  colorTheme?: ColorTheme;
  index?: number;
  onViewSubjectDetails: (subjectId: string) => void;
}

export function SectionResultCard({
  className: classGrade,
  section,
  subjects,
  colorTheme,
  index = 0,
  onViewSubjectDetails,
}: SectionResultCardProps) {
  const theme = themeColors[colorTheme || getThemeByIndex(index)];

  // Calculate overall progress for this section
  const completedSubjects = subjects.filter(
    (s) => s.completionPercent === 100
  ).length;
  const overallProgress =
    subjects.length > 0
      ? subjects.reduce((acc, s) => acc + s.completionPercent, 0) /
        subjects.length
      : 0;
  const overallStatus = getResultStatus(overallProgress);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="group relative bg-surface border border-border rounded-xl overflow-hidden flex flex-col"
    >
      {/* Top Banner / Header */}
      <div
        className={clsx(
          "px-5 py-4 flex justify-between items-start border-b border-dashed",
          theme.border,
          theme.bg
        )}
      >
        <div>
          <h3
            className={clsx(
              "text-xs font-bold uppercase tracking-wider mb-0.5 opacity-80",
              theme.text
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

        {/* Overall Status Badge */}
        <ResultStatusBadge status={overallStatus} size="sm" />
      </div>

      {/* Subject Rows */}
      <div className="flex-1 divide-y divide-border">
        {subjects.map((subject) => {
          const subjectStatus = getResultStatus(subject.completionPercent);
          const eligible = subject.totalStudents - subject.absentCount;

          return (
            <div
              key={subject.id}
              onClick={() => onViewSubjectDetails(subject.id)}
              className="px-5 py-4 flex items-center gap-4 hover:bg-surface-hover cursor-pointer transition-colors group/row"
            >
              {/* Subject Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-text-primary truncate">
                    {subject.subject}
                  </span>
                  <StatusDot status={subjectStatus} size="sm" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                  <User className="w-3 h-3" />
                  <span className="truncate">{subject.teacherName}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-3 shrink-0">
                {/* Progress Bar */}
                <div className="w-24 hidden sm:block">
                  <div className="w-full bg-surface-active rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.completionPercent}%` }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className={clsx(
                        "h-full rounded-full",
                        getProgressBarColor(subject.completionPercent)
                      )}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right w-16">
                  <div className="text-sm font-bold text-text-primary">
                    {subject.completionPercent.toFixed(0)}%
                  </div>
                  <div className="text-xs text-text-muted">
                    {subject.checkedCount}/{eligible}
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-4 h-4 text-text-muted group-hover/row:text-accent transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Summary */}
      <div
        className={clsx(
          "px-5 py-3 border-t flex items-center justify-between text-sm",
          theme.border,
          theme.bg
        )}
      >
        <span className={clsx("font-medium", theme.text)}>
          {completedSubjects} of {subjects.length} subjects complete
        </span>
        <span className={clsx("font-bold", theme.text)}>
          {overallProgress.toFixed(0)}% overall
        </span>
      </div>
    </motion.div>
  );
}
