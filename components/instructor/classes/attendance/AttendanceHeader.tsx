"use client";

import { ArrowLeft, CalendarCheck, BookOpen, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface AttendanceHeaderProps {
  classId: string;
  grade: string;
  section: string;
  lectureName: string;
  selectedDate: string;
  onEditSetup: () => void;
}

export default function AttendanceHeader({
  classId,
  grade,
  section,
  lectureName,
  selectedDate,
  onEditSetup,
}: AttendanceHeaderProps) {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
      <div>
        <Link
          href={`/instructor/classes/${classId}`}
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm font-medium group mb-2"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Class</span>
        </Link>
        <h1 className="text-2xl font-bold font-heading text-text-primary flex items-center gap-2">
          <CalendarCheck className="w-6 h-6 text-accent" />
          Take Attendance
        </h1>
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="text-text-secondary text-sm flex items-center gap-2">
            <span className="font-semibold text-text-primary bg-surface border border-border px-2 py-0.5 rounded-md">
              {grade} - {section}
            </span>
          </div>
          {/* Display Selected Details */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="font-medium text-text-primary">
                {lectureName || "No Topic Selected"}
              </span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              {new Date(selectedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
            <button
              onClick={onEditSetup}
              className="text-xs text-accent hover:underline font-medium ml-2"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
