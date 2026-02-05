"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/ui/SearchBar";
import { StaffFilters as StaffFiltersType } from "@/lib/admin/types/staff";
import { Filter } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";

interface StaffFiltersProps {
    filters: StaffFiltersType;
    onFilterChange: (key: keyof StaffFiltersType, value: string) => void;
    onClearFilters: () => void;
    departments: string[];
    showFilters: boolean;
    onToggleFilters: () => void;
    searchPlaceholder?: string;
}

export function StaffFilters({
    filters,
    onFilterChange,
    onClearFilters,
    departments,
    showFilters,
    onToggleFilters,
    searchPlaceholder = "Search by name, email, or staff code...",
}: StaffFiltersProps) {
    const activeFilterCount = [
        filters.department !== "all" ? 1 : 0,
        filters.status !== "all" ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    return (
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                    <SearchBar
                        placeholder={searchPlaceholder}
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
                            {/* Department Filter */}
                            <div>
                                <label className="text-sm font-medium text-text-secondary mb-2 block">
                                    Department
                                </label>
                                <Select
                                    value={filters.department}
                                    onValueChange={(value) => onFilterChange("department", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Departments" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Departments</SelectItem>
                                        {departments.map((dept) => (
                                            <SelectItem key={dept} value={dept}>
                                                {dept}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Status Filter */}
                            <div>
                                <label className="text-sm font-medium text-text-secondary mb-2 block">
                                    Status
                                </label>
                                <Select
                                    value={filters.status}
                                    onValueChange={(value) => onFilterChange("status", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="on-leave">On Leave</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Clear Filters */}
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
