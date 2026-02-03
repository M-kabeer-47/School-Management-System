"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { ResponsiveTabs } from "@/components/ui/ResponsiveTabs";
import { SearchBar } from "@/components/ui/SearchBar";
import { cn } from "@/lib/common/utils";

interface PaperFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedGrade: string;
  onGradeChange: (value: string) => void;
  selectedSection: string;
  onSectionChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  uniqueGrades: string[];
  uniqueSections: string[];
  stats: {
    total: number;
    overdue: number;
    pending: number;
    uploaded: number;
  };
}

export function PaperFilters({
  searchQuery,
  onSearchChange,
  selectedGrade,
  onGradeChange,
  selectedSection,
  onSectionChange,
  statusFilter,
  onStatusChange,
  uniqueGrades,
  uniqueSections,
  stats,
}: PaperFiltersProps) {
  const tabOptions = [
    {
      value: "all",
      label: (
        <span className="flex items-center gap-2">
          All Papers
          <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-full text-slate-700">
            {stats.total}
          </span>
        </span>
      ),
    },
    {
      value: "overdue",
      label: (
        <span className="flex items-center gap-2">
          Overdue
          <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full ring-1 ring-red-200">
            {stats.overdue}
          </span>
        </span>
      ),
    },
    {
      value: "pending",
      label: (
        <span className="flex items-center gap-2">
          Pending
          <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full ring-1 ring-orange-200">
            {stats.pending - stats.overdue}
          </span>
        </span>
      ),
    },
    {
      value: "uploaded",
      label: (
        <span className="flex items-center gap-2">
          Uploaded
          <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full ring-1 ring-emerald-200">
            {stats.uploaded}
          </span>
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Row 1: Full-Width Search */}
      <SearchBar
        placeholder="Search documents by subject, teacher name, or keywords..."
        value={searchQuery}
        onChange={onSearchChange}
        className="w-full"
      />

      {/* Row 2: Selectors & Status Tabs */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          {/* Grade Selector */}
          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-xs font-semibold text-text-muted uppercase tracking-widest whitespace-nowrap">
              Grade:
            </span>
            <div className="w-40 md:w-48">
              <Select value={selectedGrade} onValueChange={onGradeChange}>
                <SelectTrigger className="h-11 border-2 bg-surface hover:bg-white rounded-xl shadow-none">
                  <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Every Class</SelectItem>
                  {uniqueGrades.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Section Selector */}
          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-xs font-semibold text-text-muted uppercase tracking-widest whitespace-nowrap">
              Section:
            </span>
            <div className="w-32 md:w-40">
              <Select value={selectedSection} onValueChange={onSectionChange}>
                <SelectTrigger className="h-11 border-2 bg-surface hover:bg-white rounded-xl shadow-none">
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  {uniqueSections.map((s) => (
                    <SelectItem key={s} value={s}>
                      Section {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="w-full lg:w-auto">
          <ResponsiveTabs
            value={statusFilter}
            onValueChange={onStatusChange}
            options={tabOptions}
            className="w-full lg:w-auto"
          />
        </div>
      </div>
    </div>
  );
}
