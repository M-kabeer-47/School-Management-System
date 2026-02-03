"use client";

import { cn } from "@/lib/shadcn/utils";
import { Award, CheckCircle2, AlertTriangle, LucideIcon } from "lucide-react";

interface RatingInfo {
  label: string;
  color: string;
  icon: LucideIcon;
}

export const getRating = (percentage: number): RatingInfo => {
  if (percentage >= 80)
    return {
      label: "Excellent",
      color: "text-success bg-success/10 border-success/20",
      icon: Award,
    };
  if (percentage >= 70)
    return {
      label: "Good",
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      icon: CheckCircle2,
    };
  if (percentage >= 50)
    return {
      label: "Average",
      color: "text-warning bg-warning/10 border-warning/20",
      icon: CheckCircle2,
    };
  if (percentage >= 40)
    return {
      label: "Below Avg",
      color: "text-orange-500 bg-orange-500/10 border-orange-500/20",
      icon: AlertTriangle,
    };
  return {
    label: "Poor",
    color: "text-error bg-error/10 border-error/20",
    icon: AlertTriangle,
  };
};

export const GradebookRating = ({ percentage }: { percentage: number }) => {
  const rating = getRating(percentage);
  const Icon = rating.icon;

  return (
    <div
      className={cn(
        "flex justify-center items-center max-w-[130px] gap-1.5 px-1 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest",
        rating.color,
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{rating.label}</span>
    </div>
  );
};
