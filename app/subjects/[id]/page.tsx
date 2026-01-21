"use client";

import { useParams } from "next/navigation";
import { SubjectDetailPage } from "@/components/subjects/detail";
import { getSubjectDetail } from "@/lib/mockData/subjectDetail";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SubjectDetail() {
  const params = useParams();
  const subjectId = params.id as string;

  const subject = getSubjectDetail(subjectId);

  // Handle not found
  if (!subject) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="text-6xl mb-4">📚</div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Subject Not Found
        </h1>
        <p className="text-text-secondary mb-6">
          The subject you're looking for doesn't exist.
        </p>
        <Link
          href="/subjects"
          className="flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent-hover text-accent-foreground font-medium rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Subjects
        </Link>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Back Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-4"
      >
        <Link
          href="/subjects"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Subjects</span>
        </Link>
      </motion.div>

      {/* Subject Detail Page */}
      <SubjectDetailPage subject={subject} />
    </div>
  );
}
