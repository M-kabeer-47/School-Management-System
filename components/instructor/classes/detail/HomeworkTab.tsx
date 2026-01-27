"use client";

import { Button } from "@/components/ui/Button";
import { BookOpen, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/shadcn/utils";
import { Homework } from "@/lib/instructor/types/class-detail";

interface HomeworkTabProps {
  homeworks: Homework[];
}

export const HomeworkTab = ({ homeworks }: HomeworkTabProps) => {
  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-xl font-bold font-heading text-text-primary">
          Class Homework
        </h3>
        <span className="text-sm text-text-muted bg-surface px-3 py-1 rounded-full border border-border">
          Total: {homeworks.length}
        </span>
      </div>

      {/* Homework List */}
      <div className="grid gap-4">
        {homeworks.length > 0 ? (
          homeworks.map((hw) => (
            <div
              key={hw.id}
              className="bg-surface border border-border rounded-2xl p-5 hover:border-accent/30 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-text-primary leading-snug">
                      {hw.description}
                    </h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-text-muted">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {hw.deadline.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>
                          {hw.deadline.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold border capitalize",
                    hw.status === "active"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-green-50 text-green-700 border-green-200",
                  )}
                >
                  {hw.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-surface border border-border rounded-2xl">
            <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-bold text-text-primary mb-1">
              No Homework Assigned
            </h3>
            <p className="text-text-secondary">
              Click the button above to assign homework to this class.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
