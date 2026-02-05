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
import { ResultStatus } from "@/utils/status-styles";

interface ResultsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedClass: string;
  onClassChange: (value: string) => void;
  selectedStatus: "all" | ResultStatus;
  onStatusChange: (value: "all" | ResultStatus) => void;
  uniqueClasses: string[];
}

export function ResultsFilters({
  searchQuery,
  onSearchChange,
  selectedClass,
  onClassChange,
  selectedStatus,
  onStatusChange,
  uniqueClasses,
}: ResultsFiltersProps) {
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

      {/* Class Filter */}
      <Select value={selectedClass} onValueChange={onClassChange}>
        <SelectTrigger className="w-[160px]" size="sm">
          <SelectValue placeholder="All Classes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Classes</SelectItem>
          {uniqueClasses.map((cls) => (
            <SelectItem key={cls} value={cls}>
              {cls}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select
        value={selectedStatus}
        onValueChange={(value) => onStatusChange(value as "all" | ResultStatus)}
      >
        <SelectTrigger className="w-[160px]" size="sm">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="complete">Complete</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="not-started">Not Started</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
