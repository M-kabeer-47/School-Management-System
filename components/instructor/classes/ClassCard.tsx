import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Globe,
  Languages,
  Code2,
  Palette,
  Music,
  Dumbbell,
  Book,
  Moon,
  Map,
  BookOpen, // Added back for default
  ScrollText, // For History/Pak Studies
  Landmark, // Alternative for History
} from "lucide-react";
import { clsx } from "clsx";

interface ClassCardProps {
  id: string;
  name: string;
  section: string;
  subject: string;
  studentCount: number;
}

// Map subjects to specific Lucide icons
const getSubjectIcon = (subject: string) => {
  const normalized = subject.toLowerCase();
  if (normalized.includes("math")) return Calculator;
  if (normalized.includes("physics") || normalized.includes("science"))
    return Atom;
  if (normalized.includes("chemistry")) return FlaskConical;
  if (normalized.includes("biology")) return Dna;
  if (normalized.includes("history") || normalized.includes("pak"))
    return Landmark; // Pak Studies/History
  if (
    normalized.includes("english") ||
    normalized.includes("urdu") ||
    normalized.includes("sindhi")
  )
    return Languages;
  if (normalized.includes("islamiat") || normalized.includes("islamic"))
    return Moon;
  if (normalized.includes("computer") || normalized.includes("ict"))
    return Code2;
  if (normalized.includes("art")) return Palette;
  if (normalized.includes("music")) return Music;
  if (normalized.includes("gym") || normalized.includes("physical"))
    return Dumbbell;

  return BookOpen; // Default
};

export function ClassCard({
  id,
  name,
  section,
  subject,
  studentCount,
}: ClassCardProps) {
  const SubjectIcon = getSubjectIcon(subject);

  return (
    <Link
      href={`/instructor/classes/${id}`}
      className="group relative flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
    >
      {/* Top Banner with Accent Gradient - Reduced Height */}
      <div className="h-20 bg-accent-gradient relative overflow-hidden p-4">
        {/* Decorative Circles/Texture */}
        <div className="absolute -right-4 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-background/10 to-transparent" />
      </div>

      <div className="p-5 pt-12 flex-1 flex flex-col relative">
        {/* Floating Subject Icon - Improved visibility */}
        <div className="absolute -top-10 left-6 w-16 h-16 rounded-2xl bg-surface border border-border shadow-lg flex items-center justify-center text-accent group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300 z-10 ring-4 ring-surface/50">
          <SubjectIcon className="w-8 h-8" strokeWidth={1.5} />
        </div>

        {/* Action Icon */}
        <div className="absolute top-4 right-5 w-8 h-8 rounded-full bg-surface-active/50 border border-border/50 flex items-center justify-center text-text-muted group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300">
          <ArrowRight className="w-4 h-4" />
        </div>

        {/* Content */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="font-heading font-bold text-xl text-text-primary leading-tight group-hover:text-accent transition-colors">
              {name}
            </h3>
            <span className="text-sm font-semibold text-white bg-accent-gradient px-3 py-0.5 rounded-md shadow-sm">
              {section}
            </span>
          </div>

          <p className="text-sm font-medium text-text-muted flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            {subject}
          </p>
        </div>

        {/* Footer Stats & Action */}
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden">
              {/* Mock Avatars */}
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-surface bg-slate-200" />
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-surface bg-slate-300" />
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-surface bg-slate-400" />
            </div>
            <div className="text-sm hidden sm:block">
              <span className="font-bold text-text-primary">
                {studentCount}
              </span>
              <span className="text-text-muted ml-1">Students</span>
            </div>
          </div>

          <div className="px-4 py-1.5 rounded-lg bg-surface-active group-hover:bg-accent group-hover:text-white text-text-secondary text-sm font-semibold transition-all duration-300 shadow-sm border border-transparent group-hover:border-accent-light/20">
            View
          </div>
        </div>
      </div>
    </Link>
  );
}
