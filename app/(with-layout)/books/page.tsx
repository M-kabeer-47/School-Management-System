"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { booksListData } from "@/lib/student/mock-data/books";
import Link from "next/link";

export default function BooksListPage() {
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
          View the required textbooks and stationery for each class.
        </p>
      </div>

      {/* Books List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {booksListData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={`/pdf-viewer?url=${encodeURIComponent(item.pdfUrl)}&title=${encodeURIComponent(item.title)}`}
              className="block group"
            >
              <div className="bg-surface rounded-2xl border border-border p-5 hover:border-accent/30 hover:shadow-md transition-all duration-200">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                        {item.className}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-text-primary mt-1.5 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-text-muted flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Updated: {new Date(item.updatedDate).toLocaleDateString("en-PK", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
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
        ))}
      </div>

      {booksListData.length === 0 && (
        <div className="bg-surface rounded-2xl border border-border p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-surface-active flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No Books Lists Available
          </h3>
          <p className="text-text-muted text-sm">
            Books lists have not been uploaded yet. Please check back later.
          </p>
        </div>
      )}
    </motion.div>
  );
}
