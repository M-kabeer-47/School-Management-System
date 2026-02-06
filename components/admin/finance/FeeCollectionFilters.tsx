"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/ui/SearchBar";
import { ClassSelect } from "@/components/admin/students/ClassSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Filter } from "lucide-react";
import MonthFilter from "@/components/ui/MonthFilter";

export interface FeeFilters {
  search: string;
  class: string;
  section: string;
  status: "all" | "paid" | "pending" | "overdue";
  month: string;
}

interface FeeCollectionFiltersProps {
  filters: FeeFilters;
  onFilterChange: (key: keyof FeeFilters, value: string) => void;
  onClearFilters: () => void;
  uniqueClasses: string[];
  uniqueSections: string[];
  showFilters: boolean;
  onToggleFilters: () => void;
}

export function FeeCollectionFilters({
  filters,
  onFilterChange,
  onClearFilters,
  uniqueClasses,
  uniqueSections,
  showFilters,
  onToggleFilters,
}: FeeCollectionFiltersProps) {
  const activeFilterCount = [
    filters.class,
    filters.section,
    filters.status,
    filters.month,
  ].filter((v) => v !== "all").length;

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <SearchBar
            placeholder="Search by name, admission number, or father name..."
            value={filters.search}
            onChange={(value) => onFilterChange("search", value)}
          />
        </div>

        {/* Filter Toggle */}
        <Button
          variant="outline"
          onClick={onToggleFilters}
          className="lg:w-auto"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-accent text-white text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Options */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-5 gap-4">
              <ClassSelect
                label="Class"
                value={filters.class}
                onChange={(value) => onFilterChange("class", value)}
                options={uniqueClasses}
                placeholder="All Classes"
                allLabel="All Classes"
              />

              <ClassSelect
                label="Section"
                value={filters.section}
                onChange={(value) => onFilterChange("section", value)}
                options={uniqueSections}
                placeholder="All Sections"
                allLabel="All Sections"
              />

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Fee Status
                </label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => onFilterChange("status", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Month
                </label>
                <MonthFilter
                  value={filters.month}
                  onChange={(value) => onFilterChange("month", value)}
                />
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={onClearFilters}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
