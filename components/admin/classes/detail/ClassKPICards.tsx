"use client";

import { KPIIcons } from "@/utils/navigation/icons";
import { cn } from "@/lib/shadcn/utils";

interface ClassKPICardsProps {
  totalStudents: number;
  totalBoys: number;
  totalGirls: number;
  avgAttendance: number;
}

export function ClassKPICards({
  totalStudents,
  totalBoys,
  totalGirls,
  avgAttendance,
}: ClassKPICardsProps) {
  const cards = [
    {
      label: "Total Students",
      value: totalStudents,
      icon: KPIIcons.TotalStudents,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-border",
    },
    {
      label: "Boys",
      value: totalBoys,
      icon: KPIIcons.Boy,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-border",
    },
    {
      label: "Girls",
      value: totalGirls,
      icon: KPIIcons.Girl,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      border: "border-border",
    },
    {
      label: "Avg. Attendance",
      value: `${avgAttendance}%`,
      icon: KPIIcons.AttendanceRate,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-border",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={cn(
            "relative p-6 rounded-2xl border bg-surface flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden",
            card.border,
          )}
        >
          <div
            className={cn(
              "relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm",
              card.bg,
              card.color,
            )}
          >
            <card.icon className="w-10 h-10" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-text-muted uppercase tracking-wider mb-1">
              {card.label}
            </p>
            <h3 className="text-3xl font-bold text-text-primary tracking-tight">
              {card.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
