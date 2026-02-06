"use client";

import { Homework } from "@/lib/student/types/homework";
import { Calendar } from "lucide-react";
import { HomeworkStatusBadge, HomeworkStatus } from "@/utils/status-styles";

interface HomeworkCardProps {
  homework: Homework;
}

export const HomeworkCard = ({ homework }: HomeworkCardProps) => {
  // Map homework status to our centralized status type
  const getHomeworkStatus = (status: Homework["status"]): HomeworkStatus => {
    return status === "Checked" ? "checked" : "not-checked";
  };

  return (
    <div className="bg-accent-light/4 border border-border rounded-xl p-4">
      {/* Content */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Subject indicator dot with gradient */}
          <div className="w-2 h-2 rounded-full bg-accent-gradient flex-shrink-0 mt-1.5" />
          <h3 className="text-base md:text-lg font-bold text-text-primary">
            {homework.subject}
          </h3>
        </div>
        <HomeworkStatusBadge status={getHomeworkStatus(homework.status)} size="sm" />
      </div>

      {/* Description - renders HTML from rich text editor */}
      <div
        className="text-sm md:text-base leading-relaxed mb-3 ml-5 prose"
        dangerouslySetInnerHTML={{ __html: homework.description }}
      />

      {/* Check by date */}
      <div className="flex items-center gap-1.5 text-xs md:text-sm text-text-muted ml-5">
        <Calendar className="w-4 h-4 flex-shrink-0" />
        <span>
          <span className="font-medium">Check by:</span>{" "}
          {homework.toBeCheckedOn}
        </span>
      </div>
    </div>
  );
};
