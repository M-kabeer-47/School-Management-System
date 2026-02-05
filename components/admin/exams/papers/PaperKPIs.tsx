"use client";

import { StatCard } from "@/components/ui/StatCard";
import {
  BookFilledIcon,
  ClockFilledIcon,
  AlertFilledIcon,
  CalendarFilledIcon,
} from "@/components/ui/icons/FilledIcons";

interface PaperKPIsProps {
  total: number;
  uploaded: number;
  pending: number;
  overdue: number;
}

export function PaperKPIs({
  total,
  uploaded,
  pending,
  overdue,
}: PaperKPIsProps) {
  const kpiData = [
    {
      label: "Total Papers",
      value: total,
      icon: BookFilledIcon,
      color: "text-info",
      bg: "bg-info/10",
    },
    {
      label: "Papers Pending",
      value: pending,
      icon: ClockFilledIcon,
      color: "text-pending",
      bg: "bg-pending/10",
    },
    {
      label: "Critical Overdue",
      value: overdue,
      icon: AlertFilledIcon,
      color: "text-error",
      bg: "bg-error/10",
    },
    {
      label: "Upcoming Deadline",
      value: "Mar 12", // In real app, this would be dynamic
      icon: CalendarFilledIcon,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, idx) => (
        <StatCard key={kpi.label} {...kpi} delay={idx * 0.1} />
      ))}
    </div>
  );
}
