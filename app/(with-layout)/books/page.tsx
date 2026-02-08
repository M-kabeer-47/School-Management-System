"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { booksListData } from "@/lib/student/mock-data/books";
import { mockProfile } from "@/lib/student/mock-data/profile";
import Link from "next/link";

export default function BooksListPage() {
  const studentClass = `Class ${mockProfile.student.class}`;
  const myBooksList = booksListData.find((b) => b.className === studentClass);

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
          Books List
          <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-accent" />
        </motion.h1>
        <p className="text-text-secondary mt-1 md:mt-2 text-xs md:text-base">
          Required textbooks and stationery for your class.
        </p>
      </div>

      {myBooksList ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href={`/pdf-viewer?url=${encodeURIComponent(myBooksList.pdfUrl)}&title=${encodeURIComponent(myBooksList.title)}`}
            className="block group"
          >
            <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 hover:border-accent/30 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <FileText className="w-7 h-7 text-accent" />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                    {myBooksList.className}
                  </span>
                  <h3 className="text-base md:text-lg font-semibold text-text-primary mt-2 group-hover:text-accent transition-colors">
                    {myBooksList.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-1.5">
                    {myBooksList.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-text-muted flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Updated:{" "}
                      {new Date(myBooksList.updatedDate).toLocaleDateString(
                        "en-PK",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                    <span className="text-xs text-accent font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      View PDF <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ) : (
        <div className="bg-surface rounded-2xl border border-border p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-surface-active flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No Books List Available
          </h3>
          <p className="text-text-muted text-sm">
            The books list for {studentClass} has not been uploaded yet. Please
            check back later.
          </p>
        </div>
      )}
    </motion.div>
  );
}
