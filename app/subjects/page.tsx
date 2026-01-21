"use client";

import { motion } from "framer-motion";
import { SubjectList } from "@/components/subjects";
import { subjects } from "@/lib/mockData/subjects";

export default function SubjectsPage() {
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
          Subjects
          <span className="text-xl md:text-3xl">📚</span>
        </motion.h1>
        <p className="text-text-secondary mt-1 md:mt-2 text-xs md:text-base">
          View all subjects and their teachers.
        </p>
      </div>

      {/* Subject List */}
      <SubjectList subjects={subjects} />
    </motion.div>
  );
}
