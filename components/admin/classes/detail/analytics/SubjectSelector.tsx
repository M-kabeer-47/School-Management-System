"use client";

import { cn } from "@/lib/shadcn/utils";

interface Subject {
  id: string;
  name: string;
}

interface SubjectSelectorProps {
  subjects: Subject[];
  selectedSubjectId: string;
  onSelect: (id: string) => void;
}

export const SubjectSelector = ({
  subjects,
  selectedSubjectId,
  onSelect,
}: SubjectSelectorProps) => (
  <div className="flex flex-col gap-4 bg-surface border border-border p-6 rounded-2xl shadow-sm">
    <label className="text-sm font-bold text-text-muted uppercase tracking-wider">
      Select Subject
    </label>
    <div className="flex flex-wrap gap-2">
      {subjects.map((sub) => (
        <button
          key={sub.id}
          onClick={() => onSelect(sub.id)}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-bold transition-all border",
            selectedSubjectId === sub.id
              ? "bg-accent text-white border-accent shadow-md shadow-accent/20"
              : "bg-surface border-border text-text-secondary hover:border-accent/40",
          )}
        >
          {sub.name}
        </button>
      ))}
    </div>
  </div>
);
