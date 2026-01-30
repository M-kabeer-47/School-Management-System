"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/ui/SearchBar";
import { ClassSelect } from "./ClassSelect";
import { StudentFilters as StudentFiltersType } from "@/lib/admin/types/student";
import { Filter } from "lucide-react";

interface StudentFiltersProps {
  filters: StudentFiltersType;
  onFilterChange: (key: keyof StudentFiltersType, value: string) => void;
  onClearFilters: () => void;
  uniqueClasses: string[];
  uniqueSections: string[];
  showFilters: boolean;
  onToggleFilters: () => void;
}

export function StudentFilters({
  filters,
  onFilterChange,
  onClearFilters,
  uniqueClasses,
  uniqueSections,
  showFilters,
  onToggleFilters,
}: StudentFiltersProps) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <SearchBar
            placeholder="Search by name, admission number, or email..."
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
          {(filters.class !== "all" || filters.section !== "all") && (
            <span className="ml-2 px-2 py-0.5 bg-accent text-white text-xs rounded-full">
              {Object.values(filters).filter(
                (val) => val !== "all" && val !== "",
              ).length - (filters.search ? 1 : 0)}
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
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-4">
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
