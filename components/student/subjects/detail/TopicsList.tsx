"use client";

import { TopicUnit, TopicStatus } from "@/lib/student/types/subjectDetail";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";

interface TopicsListProps {
  topicUnits: TopicUnit[];
}

const getStatusConfig = (status: TopicStatus) => {
  switch (status) {
    case "Completed":
      return {
        textColor: "text-success",
        bgColor: "bg-success/10",
        borderColor: "border-success/30",
      };
    case "In progress":
      return {
        textColor: "text-warning",
        bgColor: "bg-warning/10",
        borderColor: "border-warning/30",
      };
    case "Not started":
    default:
      return {
        textColor: "text-text-muted",
        bgColor: "bg-surface-active",
        borderColor: "border-border",
      };
  }
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export const TopicsList = ({ topicUnits }: TopicsListProps) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {topicUnits.map((unit, unitIndex) => (
        <motion.div key={unitIndex} variants={item}>
          {/* Unit/Chapter Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-6 rounded-full bg-accent-gradient" />
            <h3 className="text-base md:text-xl font-bold font-heading text-text-primary">
              {unit.unitName}
            </h3>
          </div>

          {/* Topics Table for this Unit */}
          <Table>
            <TableHeader>
              <TableHeadRow>
                <TableHead className="w-16 text-center">S.No.</TableHead>
                <TableHead>Topic Name</TableHead>
                <TableHead className="w-40 text-center">Status</TableHead>
              </TableHeadRow>
            </TableHeader>
            <TableBody>
              {unit.topics.map((topic, topicIndex) => {
                const config = getStatusConfig(topic.status);

                return (
                  <TableRow key={topicIndex}>
                    <TableCell className="text-center font-semibold text-text-secondary">
                      {topicIndex + 1}
                    </TableCell>
                    <TableCell className="font-medium text-text-primary">
                      {topic.name}
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={clsx(
                          "inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide border whitespace-nowrap",
                          config.bgColor,
                          config.textColor,
                          config.borderColor,
                        )}
                      >
                        {topic.status}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </motion.div>
      ))}
    </motion.div>
  );
};
