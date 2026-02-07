"use client";

import { motion } from "framer-motion";
import {
  Clock,
  FileText,
  Calendar,
  ExternalLink,
  User,
  GraduationCap,
} from "lucide-react";
import { timetableDocuments } from "@/lib/instructor/mock-data/timetable";
import Link from "next/link";
import { clsx } from "clsx";

const typeConfig = {
  "teacher-timetable": {
    icon: User,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    label: "Personal",
  },
  "class-timetable": {
    icon: GraduationCap,
    color: "text-accent",
    bg: "bg-accent/10",
    badge: "bg-accent/10 text-accent",
    label: "Class",
  },
  "exam-timetable": {
    icon: FileText,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    badge: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    label: "Exam",
  },
};

export default function InstructorTimetablePage() {
  const personalTimetable = timetableDocuments.filter(
    (d) => d.type === "teacher-timetable",
  );
  const classTimetables = timetableDocuments.filter(
    (d) => d.type === "class-timetable",
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Page Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold font-heading text-text-primary flex items-center gap-3"
        >
          Timetable
          <Clock className="w-7 h-7 text-accent" />
        </motion.h1>
        <p className="text-text-secondary mt-1 text-sm">
          View your teaching schedule and class timetables.
        </p>
      </div>

      {/* Personal Timetable */}
      {personalTimetable.length > 0 && (
        <section>
          <h2 className="text-base font-bold text-text-primary mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-500" /> My Schedule
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {personalTimetable.map((doc, index) => (
              <TimetableCard key={doc.id} document={doc} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Class Timetables */}
      {classTimetables.length > 0 && (
        <section>
          <h2 className="text-base font-bold text-text-primary mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-accent" /> Class Timetables
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {classTimetables.map((doc, index) => (
              <TimetableCard key={doc.id} document={doc} index={index} />
            ))}
          </div>
        </section>
      )}

      {timetableDocuments.length === 0 && (
        <div className="bg-surface rounded-2xl border border-border p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-surface-active flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No Timetables Available
          </h3>
          <p className="text-text-muted text-sm">
            Timetables have not been uploaded yet. Please check back later.
          </p>
        </div>
      )}
    </motion.div>
  );
}

function TimetableCard({
  document: doc,
  index,
}: {
  document: (typeof timetableDocuments)[0];
  index: number;
}) {
  const config = typeConfig[doc.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={`/pdf-viewer?url=${encodeURIComponent(doc.pdfUrl)}&title=${encodeURIComponent(doc.title)}`}
        className="block group"
      >
        <div className="bg-surface rounded-xl border border-border p-4 hover:border-accent/30 hover:shadow-md transition-all duration-200">
          <div className="flex items-start gap-3">
            <div
              className={clsx(
                "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform",
                config.bg,
              )}
            >
              <Icon className={clsx("w-5 h-5", config.color)} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={clsx(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                    config.badge,
                  )}
                >
                  {config.label}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                {doc.title}
              </h3>
              <p className="text-xs text-text-muted mt-0.5 line-clamp-1">
                {doc.description}
              </p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(doc.uploadDate).toLocaleDateString("en-PK", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="text-xs text-accent font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
