"use client";

import { TopicUnit, TopicStatus } from "@/lib/student/types/subjectDetail";
import { motion } from "framer-motion";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import { ResultStatusBadge, ResultStatus } from "@/utils/status-styles";

interface TopicsListProps {
  topicUnits: TopicUnit[];
}

const getResultStatusFromTopic = (status: TopicStatus): ResultStatus => {
  if (status === "Completed") return "complete";
  if (status === "In progress") return "in-progress";
  return "not-started"; // Not started
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
                return (
                  <TableRow key={topicIndex}>
                    <TableCell className="text-center font-semibold text-text-secondary">
                      {topicIndex + 1}
                    </TableCell>
                    <TableCell className="font-medium text-text-primary">
                      {topic.name}
                    </TableCell>
                    <TableCell className="text-center">
                      <ResultStatusBadge
                        status={getResultStatusFromTopic(topic.status)}
                        size="sm"
                      />
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
