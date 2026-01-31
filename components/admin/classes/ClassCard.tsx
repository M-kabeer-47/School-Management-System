"use client";

import { motion } from "framer-motion";
import { Users, MoreVertical, DoorOpen, User } from "lucide-react";
import { ClassSectionData } from "@/lib/admin/types/classes";
import { clsx } from "clsx";

interface ClassCardProps {
  data: ClassSectionData;
  onClick: () => void;
}

const themeColors = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-100",
    accent: "bg-blue-500",
  },
  green: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
    accent: "bg-emerald-500",
  },
  purple: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-100",
    accent: "bg-violet-500",
  },
  orange: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-100",
    accent: "bg-amber-500",
  },
  pink: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-100",
    accent: "bg-rose-500",
  },
  teal: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-100",
    accent: "bg-teal-500",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-100",
    accent: "bg-red-500",
  },
  yellow: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-100",
    accent: "bg-yellow-500",
  },
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-100",
    accent: "bg-indigo-500",
  },
  cyan: {
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    border: "border-cyan-100",
    accent: "bg-cyan-500",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
    accent: "bg-emerald-500",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-100",
    accent: "bg-violet-500",
  },
};

export function ClassCard({ data, onClick }: ClassCardProps) {
  const theme = themeColors[data.colorTheme] || themeColors.blue;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group relative bg-surface border border-border rounded-xl overflow-hidden cursor-pointer h-full flex flex-col hover:border-accent/30 transition-colors"
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
            {data.grade}
          </h3>
          <div className="flex items-baseline gap-1">
            <span
              className={clsx("text-2xl font-bold font-heading", theme.text)}
            >
              Section {data.section}
            </span>
          </div>
        </div>

        <button className="p-1.5 rounded-full hover:bg-white/50 text-text-secondary transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-5 flex-1 flex flex-col gap-6">
        {/* Statistics Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-text-secondary uppercase font-semibold tracking-wide">
              <Users className="w-3.5 h-3.5" />
              <span>Students</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-text-primary">
                {data.stats.current}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-text-secondary uppercase font-semibold tracking-wide">
              <DoorOpen className="w-3.5 h-3.5" />
              <span>Room</span>
            </div>
            <div className="text-xl font-bold text-text-primary">
              {data.room}
            </div>
          </div>
        </div>

        {/* Teacher Section */}
        <div className="mt-auto pt-4 border-t border-border flex items-center gap-3">
          <div
            className={clsx(
              "w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-white shadow-sm overflow-hidden",
              theme.bg,
            )}
          >
            {data.classTeacher.avatar ? (
              <img
                src={data.classTeacher.avatar}
                alt={data.classTeacher.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className={clsx("w-4 h-4", theme.text)} />
            )}
          </div>
          <div className="min-w-0">
            <div className="text-xs text-text-secondary font-medium">
              Class Teacher
            </div>
            <div className="text-sm font-semibold text-text-primary truncate">
              {data.classTeacher.name}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
