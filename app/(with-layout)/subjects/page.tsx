"use client";

import { motion } from "framer-motion";
import { SubjectList } from "@/components/student/subjects/SubjectList";
``;
import { subjects } from "@/lib/student/mock-data/subjects";
import { FileDown } from "lucide-react";
import { PageHeaderIcons } from "@/utils/student/icons";
import { Button } from "@/components/ui/Button";

export default function SubjectsPage() {
  const handleDownloadAll = () => {
    // Download all syllabix
    subjects.forEach((subject) => {
      if (subject.syllabusUrl) {
        const link = document.createElement("a");
        link.href = subject.syllabusUrl;
        link.download = `${subject.name}-Syllabus.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  const handleViewAll = () => {
    // Open all syllabi in new tabs
    subjects.forEach((subject) => {
      if (subject.syllabusUrl) {
        window.open(subject.syllabusUrl, "_blank");
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page Header with Actions */}
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-bold font-heading text-text-primary flex items-center gap-2 md:gap-3"
          >
            Subjects
            <PageHeaderIcons.Subjects className="w-8 h-8 md:w-12 md:h-12" />
          </motion.h1>
          <p className="text-text-secondary mt-1 md:mt-2 text-xs md:text-base">
            View all subjects and their teachers.
          </p>
        </div>

        {/* Syllabus Action Buttons */}
        <div className="flex gap-2 sm:gap-3">
          <Button onClick={handleViewAll} variant="outline">
            <FileDown className="w-4 h-4" />
            <span className="inline">View Syllabus</span>
          </Button>
          <Button onClick={handleDownloadAll} variant="default">
            <FileDown className="w-4 h-4" />
            <span className="inline">Download Syllabus</span>
          </Button>
        </div>
      </div>

      {/* Subject List */}
      <SubjectList subjects={subjects} />
    </motion.div>
  );
}
