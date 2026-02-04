"use client";

import { AdminIcons } from "@/utils/admin/icons";
import { StatCard } from "@/components/admin/ui/StatCard";

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
      icon: AdminIcons.Paper,
      color: "text-info",
      bg: "bg-info/10",
    },
    {
      label: "Papers Pending",
      value: pending,
      icon: AdminIcons.Pending,
      color: "text-pending",
      bg: "bg-pending/10",
    },
    {
      label: "Critical Overdue",
      value: overdue,
      icon: AdminIcons.Overdue,
      color: "text-error",
      bg: "bg-error/10",
    },
    {
      label: "Upcoming Deadline",
      value: "Mar 12", // In real app, this would be dynamic
      icon: AdminIcons.Deadline,
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
