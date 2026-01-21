"use client";

import { SubjectDetail } from "@/lib/types/subjectDetail";
import { User, GraduationCap, Calendar, Users } from "lucide-react";

interface SubjectHeaderProps {
  subject: SubjectDetail;
}

export const SubjectHeader = ({ subject }: SubjectHeaderProps) => {
  // Helper to format term display (e.g., "Term 1" -> "First Term")
  const formatTerm = (term: string) => {
    if (term.includes("1")) return "First Term";
    if (term.includes("2")) return "Second Term";
    if (term.includes("3")) return "Third Term";
    return term;
  };

  return (
    <div className="relative overflow-hidden rounded-3xl mb-8">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-accent-gradient" />

      {/* Decorative Blob Effects */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative px-4 py-6 md:px-6 md:py-8 lg:p-8 z-10">
        {/* Title */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white tracking-tight leading-tight">
            {subject.name}
          </h1>
          {subject.nameUrdu && (
            <p className="text-white/70 text-base sm:text-lg mt-1 font-heading">
              {subject.nameUrdu}
            </p>
          )}
        </div>

        {/* Info Grid - Responsive: 2 cols mobile, 4 cols tablet+ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Class */}
          <div className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl px-3 py-2.5 md:px-4 md:py-3 border border-white/10">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white/60 text-[9px] md:text-[10px] uppercase font-bold tracking-wider">
                Class
              </p>
              <p className="text-white font-semibold text-xs md:text-sm truncate">
                {subject.grade}
              </p>
            </div>
          </div>

          {/* Section */}
          <div className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl px-3 py-2.5 md:px-4 md:py-3 border border-white/10">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white/60 text-[9px] md:text-[10px] uppercase font-bold tracking-wider">
                Section
              </p>
              <p className="text-white font-semibold text-xs md:text-sm truncate">
                {subject.section || "A"}
              </p>
            </div>
          </div>

          {/* Teacher */}
          <div className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl px-3 py-2.5 md:px-4 md:py-3 border border-white/10">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white/60 text-[9px] md:text-[10px] uppercase font-bold tracking-wider">
                Teacher
              </p>
              <p className="text-white font-semibold text-xs md:text-sm truncate">
                {subject.teacher.name}
              </p>
            </div>
          </div>

          {/* Term */}
          <div className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl px-3 py-2.5 md:px-4 md:py-3 border border-white/10">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white/60 text-[9px] md:text-[10px] uppercase font-bold tracking-wider">
                Term
              </p>
              <p className="text-white font-semibold text-xs md:text-sm truncate">
                {formatTerm(subject.term)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
