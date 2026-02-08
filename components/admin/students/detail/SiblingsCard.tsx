"use client";

import {
  Users,
  BadgePercent,
  GraduationCap,
  CheckCircle2,
  User,
  Info,
} from "lucide-react";
import { Student } from "@/lib/admin/types/student";
import { clsx } from "clsx";

interface SiblingsCardProps {
  currentStudent: Student;
  siblings: Student[];
}

export function SiblingsCard({
  currentStudent,
  siblings,
}: SiblingsCardProps) {
  if (siblings.length === 0) {
    return (
      <div className="bg-surface/50 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
            Siblings
          </h3>
        </div>
        <p className="text-sm text-text-muted">
          No siblings found in the system. Siblings are auto-detected by matching the father&apos;s CNIC number.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface/50 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
              Siblings in School
            </h3>
            <p className="text-xs text-text-muted">
              {siblings.length} sibling{siblings.length > 1 ? "s" : ""} detected via father&apos;s CNIC
            </p>
          </div>
        </div>

        {/* Auto-applied discount indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-xs font-semibold">Discount Auto-Applied</span>
        </div>
      </div>

      {/* Info banner */}
      <div className="px-6 py-2.5 bg-blue-50 dark:bg-blue-950/20 border-b border-blue-100 dark:border-blue-900/30 flex items-center gap-2">
        <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
        <p className="text-xs text-blue-600 dark:text-blue-400">
          Sibling discount is automatically applied based on school fee concession settings.
        </p>
      </div>

      {/* Siblings List */}
      <div className="divide-y divide-border">
        {siblings.map((sibling) => (
          <div
            key={sibling.id}
            className="p-4 flex items-center gap-4 hover:bg-surface-active/30 transition-colors"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-accent" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-text-primary truncate">
                  {sibling.studentName}
                </span>
                <span
                  className={clsx(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                    sibling.status === "Active"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
                  )}
                >
                  {sibling.status}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  Class {sibling.class}-{sibling.section}
                </span>
                <span className="text-xs text-text-muted">
                  Roll #{sibling.admissionNo}
                </span>
                {sibling.hasSiblingDiscount && (
                  <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                    <BadgePercent className="w-3 h-3" />
                    Discounted
                  </span>
                )}
              </div>
            </div>

            {/* Fee */}
            <div className="text-right shrink-0">
              <span className="text-sm font-bold text-text-primary">
                Rs. {sibling.monthlyFee.toLocaleString()}
              </span>
              <span className="text-xs text-text-muted block">/month</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
