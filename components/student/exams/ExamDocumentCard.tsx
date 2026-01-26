"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Calendar, ExternalLink } from "lucide-react";
import { ExamDocument } from "@/lib/student/types/exams";
import { cn } from "@/lib/shadcn/utils";
import Link from "next/link";

interface ExamDocumentCardProps {
  document: ExamDocument;
  index?: number;
}

export const ExamDocumentCard = ({
  document,
  index = 0,
}: ExamDocumentCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isExamSlip = document.type === "exam-slip";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-all group"
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
              isExamSlip ? "bg-accent-gradient" : "bg-info-light",
            )}
          >
            <FileText
              className={cn("w-7 h-7", isExamSlip ? "text-white" : "text-info")}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                isExamSlip
                  ? "bg-accent-light text-accent"
                  : "bg-info-light text-info",
              )}
            >
              {isExamSlip ? "Exam Slip" : "Date Sheet"}
            </span>
            <h3 className="font-semibold text-text-primary mt-2 text-base md:text-lg">
              {document.title}
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              {document.examName}
            </p>
            {document.date && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-text-muted">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(document.date)}
              </div>
            )}
          </div>
        </div>

        {/* View Button */}
        <Link
          href={`/pdf-viewer?url=${encodeURIComponent(document.pdfUrl)}&title=${encodeURIComponent(document.title)}`}
          className="mt-4 w-full h-11 bg-surface hover:bg-surface-hover border border-border rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-text-primary transition-colors group-hover:border-accent group-hover:text-accent"
        >
          <ExternalLink className="w-4 h-4" />
          View PDF
        </Link>
      </div>
    </motion.div>
  );
};
