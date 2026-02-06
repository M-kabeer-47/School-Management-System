"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import {
    ComplaintsFilters as FiltersType,
    ComplaintCategory,
    categoryLabels,
} from "@/lib/admin/types/complaints";

interface ComplaintsFiltersProps {
    filters: FiltersType;
    onFilterChange: (key: keyof FiltersType, value: string) => void;
    onClearFilters: () => void;
    showFilters: boolean;
    onToggleFilters: () => void;
}

export default function ComplaintsFilters({
    filters,
    onFilterChange,
    onClearFilters,
    showFilters,
    onToggleFilters,
}: ComplaintsFiltersProps) {
    const activeFilterCount = [
        filters.status !== "all" ? 1 : 0,
        filters.source !== "all" ? 1 : 0,
        filters.category !== "all" ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    return (
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                    <SearchBar
                        placeholder="Search by subject, name, or message..."
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
                        <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Status Filter */}
                            <div>
                                <label className="text-sm font-medium text-text-secondary mb-2 block">
                                    Status
                                </label>
                                <Select
                                    value={filters.status}
                                    onValueChange={(v) => onFilterChange("status", v)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Statuses</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="in-progress">In Progress</SelectItem>
                                        <SelectItem value="resolved">Resolved</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Source Filter */}
                            <div>
                                <label className="text-sm font-medium text-text-secondary mb-2 block">
                                    Source
                                </label>
                                <Select
                                    value={filters.source}
                                    onValueChange={(v) => onFilterChange("source", v)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Sources" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Sources</SelectItem>
                                        <SelectItem value="student">Students</SelectItem>
                                        <SelectItem value="instructor">Instructors</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Category Filter */}
                            <div>
                                <label className="text-sm font-medium text-text-secondary mb-2 block">
                                    Category
                                </label>
                                <Select
                                    value={filters.category}
                                    onValueChange={(v) => onFilterChange("category", v)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {(Object.keys(categoryLabels) as ComplaintCategory[]).map(
                                            (cat) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {categoryLabels[cat]}
                                                </SelectItem>
                                            )
                                        )}
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
