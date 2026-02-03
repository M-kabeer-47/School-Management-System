"use client";

import * as React from "react";
import { clsx } from "clsx";
import { cn } from "@/lib/student/utils";

export interface PillTabOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

interface PillTabsProps {
  options: PillTabOption[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function PillTabs({
  options,
  value,
  onValueChange,
  className,
}: PillTabsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 pb-2 overflow-x-auto no-scrollbar",
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onValueChange(option.value)}
          className={clsx(
            "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2",
            value === option.value
              ? "bg-accent text-white shadow-md"
              : "bg-surface hover:bg-surface-hover text-text-secondary border border-border",
          )}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}
