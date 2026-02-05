"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/common/utils";
import React from "react";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string; // Tailwind text color class, e.g., "text-blue-500"
  bg: string; // Tailwind bg color class, e.g., "bg-blue-500/10"
  delay?: number;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  color,
  bg,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="relative p-6 rounded-2xl border border-border bg-surface flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden group"
    >
      <div
        className={cn(
          "relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm shrink-0 transition-transform group-hover:scale-105",
          bg,
          color,
        )}
      >
        <Icon className="w-7 h-7" />
      </div>
      <div className="relative z-10">
        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <h3 className="text-2xl font-bold text-text-primary tracking-tight">
          {value}
        </h3>
      </div>
    </motion.div>
  );
}
