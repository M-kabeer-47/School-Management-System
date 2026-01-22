"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { HomeworkCard } from "@/components/homework";
import {
  homeworkList,
  getRecentHomework,
  getAllHomework,
} from "@/lib/mockData/homework";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff } from "lucide-react";
import { Homework } from "@/lib/types/homework";
import { Icons, PageHeaderIcons } from "@/utils/navigation/icons";

export default function HomeworkPage() {
  const [showAll, setShowAll] = useState(false);

  const recentHomework = getRecentHomework();
  const displayHomework = showAll ? getAllHomework() : recentHomework;

  const hasRecentHomework = recentHomework.length > 0;

  // Group homework by given date
  const groupedHomework = displayHomework.reduce(
    (groups, homework) => {
      const date = homework.givenOn;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(homework);
      return groups;
    },
    {} as Record<string, Homework[]>,
  );

  // Sort dates (most recent first)
  const sortedDates = Object.keys(groupedHomework).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page Header */}
      <div className="mb-6 md:mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-bold font-heading text-text-primary flex items-center gap-2 md:gap-3"
        >
          Homework
          <PageHeaderIcons.Homework className="w-8 h-8 md:w-12 md:h-12" />
        </motion.h1>
        <p className="text-text-secondary mt-1 md:mt-2 text-xs md:text-base">
          {hasRecentHomework
            ? "Your homework assignments grouped by date."
            : "No homework assigned recently."}
        </p>
      </div>

      {/* Empty State */}
      {!hasRecentHomework && !showAll ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-info-light border border-info/20 rounded-2xl p-6 md:p-8 text-center"
        >
          <div className="text-4xl md:text-5xl mb-3">📚</div>
          <h2 className="text-lg md:text-xl font-bold text-info mb-2">
            No Recent Homework
          </h2>
          <p className="text-text-secondary text-sm md:text-base">
            No homework has been assigned in the last 7 days.
          </p>
        </motion.div>
      ) : (
        /* Homework Sections - Grouped by Date in Big Cards */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-6 md:space-y-8"
        >
          {sortedDates.map((date) => (
            <div
              key={date}
              className="relative bg-surface border border-border rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Vertical accent bar on left */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent-gradient" />

              {/* Content with padding to account for accent bar */}
              <div className="pl-6 pr-4 md:pr-6 py-5">
                {/* Date Header */}
                <div className="mb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent-gradient flex items-center justify-center">
                      <Icons.ClipboardList className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-bold text-text-primary">
                        {date}
                      </h2>
                      <p className="text-xs md:text-sm text-text-muted">
                        {groupedHomework[date].length}{" "}
                        {groupedHomework[date].length === 1
                          ? "homework"
                          : "homeworks"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Homework items for this date */}
                <div className="space-y-3">
                  {groupedHomework[date].map((homework, index) => (
                    <div key={homework.id}>
                      <HomeworkCard homework={homework} />
                      {/* Divider between homework items (except last) */}
                      {index < groupedHomework[date].length - 1 && (
                        <div className="h-px bg-border/50 my-3" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* View All / Hide Old Button */}
      {homeworkList.length > recentHomework.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-8 flex justify-center"
        >
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            className="gap-2"
          >
            {showAll ? (
              <>
                <EyeOff className="w-4 h-4" />
                Hide Old Homework
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                View All Homework
              </>
            )}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
