"use client";

import { motion } from "framer-motion";
import { FileText, History, ClipboardCheck } from "lucide-react";
import { ExamDocumentCard } from "@/components/student/exams/ExamDocumentCard";
import { ResultCard } from "@/components/student/exams/ResultCard";
import { examDocuments, previousResults } from "@/lib/student/mock-data/exams";

export default function ExamsPage() {
  const examSlip = examDocuments.find((d) => d.type === "exam-slip");
  const datesheet = examDocuments.find((d) => d.type === "datesheet");

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
          Exams
          <ClipboardCheck className="w-6 h-6 md:w-8 md:h-8 text-accent" />
        </motion.h1>
        <p className="text-text-secondary mt-1 md:mt-2 text-xs md:text-base">
          View exam slips, date sheets, and your previous term results.
        </p>
      </div>

      {/* Current Exam Section */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-accent" />
          <h2 className="text-lg md:text-xl font-semibold text-text-primary font-heading">
            Current Exam Documents
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examSlip && <ExamDocumentCard document={examSlip} index={0} />}
          {datesheet && <ExamDocumentCard document={datesheet} index={1} />}
        </div>

        {!examSlip && !datesheet && (
          <div className="bg-surface rounded-2xl border border-border p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-surface-active flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-text-muted" />
            </div>
            <p className="text-text-secondary font-medium">
              No exam documents available
            </p>
            <p className="text-text-muted text-sm mt-1">
              Documents will appear here when exams are scheduled
            </p>
          </div>
        )}
      </section>

      {/* Previous Results Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-accent" />
          <h2 className="text-lg md:text-xl font-semibold text-text-primary font-heading">
            Previous Term Results
          </h2>
        </div>

        <div className="space-y-4">
          {previousResults.length > 0 ? (
            previousResults.map((result, index) => (
              <ResultCard key={result.id} result={result} index={index} />
            ))
          ) : (
            <div className="bg-surface rounded-2xl border border-border p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-surface-active flex items-center justify-center mb-4">
                <History className="w-8 h-8 text-text-muted" />
              </div>
              <p className="text-text-secondary font-medium">
                No previous results available
              </p>
              <p className="text-text-muted text-sm mt-1">
                Your exam results will appear here
              </p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
