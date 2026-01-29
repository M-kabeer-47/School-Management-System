"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Users,
  BookOpen,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { MarksEntryStatus } from "@/lib/instructor/types/exams";
import { cn } from "@/lib/shadcn/utils";

interface MarksStatusCardProps {
  status: MarksEntryStatus;
  index: number;
}

export const MarksStatusCard = ({ status, index }: MarksStatusCardProps) => {
  const pendingCount = status.totalStudents - status.submittedCount;
  const progress = Math.round(
    (status.submittedCount / status.totalStudents) * 100,
  );

  const getStatusConfig = () => {
    switch (status.status) {
      case "submitted":
        return {
          icon: CheckCircle2,
          label: "Submitted",
          color: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-100",
        };
      case "in-progress":
        return {
          icon: Loader2,
          label: "In Progress",
          color: "text-orange-600",
          bg: "bg-orange-50",
          border: "border-orange-100",
        };
      default:
        return {
          icon: AlertCircle,
          label: "Pending",
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-100",
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  const isDeadlineSoon = () => {
    const deadline = new Date(status.deadline);
    const today = new Date();
    const daysLeft = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    return daysLeft <= 3 && daysLeft >= 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-text-primary font-heading text-lg">
              {status.className} - {status.section}
            </h3>
            <p className="text-text-muted text-sm flex items-center gap-1.5 mt-0.5">
              <BookOpen className="w-3.5 h-3.5" />
              {status.subject}
            </p>
          </div>
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1",
              statusConfig.bg,
              statusConfig.color,
              statusConfig.border,
            )}
          >
            <StatusIcon className="w-3 h-3" />
            {statusConfig.label}
          </span>
        </div>

        {/* Exam Name */}
        <p className="text-sm text-text-secondary mb-4">{status.examName}</p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-text-muted">Progress</span>
            <span className="font-medium text-text-primary">
              {status.submittedCount}/{status.totalStudents} students
            </span>
          </div>
          <div className="h-2 w-full bg-surface-active rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                status.status === "submitted"
                  ? "bg-green-500"
                  : status.status === "in-progress"
                    ? "bg-orange-500"
                    : "bg-gray-300",
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div
            className={cn(
              "flex items-center gap-1.5 text-xs",
              isDeadlineSoon() && status.status !== "submitted"
                ? "text-red-600 font-medium"
                : "text-text-muted",
            )}
          >
            <Clock className="w-3.5 h-3.5" />
            Deadline:{" "}
            {new Date(status.deadline).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </div>

          {status.status !== "submitted" ? (
            <Link
              href={`/instructor/classes/${status.classId}/marks?examId=${status.id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors"
            >
              Enter Marks
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href={`/instructor/classes/${status.classId}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            >
              View Details
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};
