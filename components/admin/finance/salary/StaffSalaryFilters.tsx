"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/ui/SearchBar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import { Filter } from "lucide-react";

export interface SalaryFilters {
    search: string;
    department: string;
    staffType: string;
}

interface StaffSalaryFiltersProps {
    filters: SalaryFilters;
    onFilterChange: (key: keyof SalaryFilters, value: string) => void;
    onClearFilters: () => void;
    departments: string[];
    showFilters: boolean;
    onToggleFilters: () => void;
}

export function StaffSalaryFilters({
    filters,
    onFilterChange,
    onClearFilters,
    departments,
    showFilters,
    onToggleFilters,
}: StaffSalaryFiltersProps) {
    const activeFilterCount = [filters.department, filters.staffType].filter(
        (v) => v !== "all"
    ).length;

    return (
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                    <SearchBar
                        placeholder="Search by name, department, or designation..."
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
                        <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">
                                    Department
                                </label>
                                <Select
                                    value={filters.department}
                                    onValueChange={(value) => onFilterChange("department", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Departments" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="all">All Departments</SelectItem>
                                        {departments.map((dept) => (
                                            <SelectItem key={dept} value={dept}>
                                                {dept}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">
                                    Staff Type
                                </label>
                                <Select
                                    value={filters.staffType}
                                    onValueChange={(value) => onFilterChange("staffType", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Types" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="teaching">Teaching</SelectItem>
                                        <SelectItem value="non-teaching">Non-Teaching</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-end">
                                <Button variant="outline" onClick={onClearFilters} className="w-full">
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
