"use client";

import { Homework } from "@/lib/student/types/homework";
import { clsx } from "clsx";
import { Calendar, CheckCircle2 } from "lucide-react";

interface HomeworkCardProps {
  homework: Homework;
}

export const HomeworkCard = ({ homework }: HomeworkCardProps) => {
  const getStatusBadge = (status: Homework["status"]) => {
    const styles = {
      "Not checked": "bg-warning-light text-warning",
      Checked: "bg-success-light text-success",
    };

    return (
      <span
        className={clsx(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold",
          styles[status],
        )}
      >
        {status === "Checked" && <CheckCircle2 className="w-3.5 h-3.5" />}
        {status}
      </span>
    );
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
        {getStatusBadge(homework.status)}
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
