"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

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
}

export function PapersFilters({
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
}: PaperFiltersProps) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 flex flex-wrap items-center gap-4">
      {/* Search */}
      <div className="flex-1 min-w-[200px]">
        <Input
          type="text"
          placeholder="Search subjects, teachers..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
          className="h-10"
        />
      </div>

      {/* Grade Filter */}
      <Select value={selectedGrade} onValueChange={onGradeChange}>
        <SelectTrigger className="w-[160px]" size="sm">
          <SelectValue placeholder="All Classes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Classes</SelectItem>
          {uniqueGrades.map((grade) => (
            <SelectItem key={grade} value={grade}>
              {grade}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Section Filter */}
      <Select value={selectedSection} onValueChange={onSectionChange}>
        <SelectTrigger className="w-[160px]" size="sm">
          <SelectValue placeholder="All Sections" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sections</SelectItem>
          {uniqueSections.map((section) => (
            <SelectItem key={section} value={section}>
              Section {section}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[160px]" size="sm">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="uploaded">Uploaded</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="overdue">Overdue</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
