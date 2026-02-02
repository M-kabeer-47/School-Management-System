"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Percent, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import { DiscountedStudentsTable } from "@/components/admin/finance";
import { discountedStudents } from "@/lib/admin/mock-data/finance";

export default function DiscountedStudentsPage() {
    const [search, setSearch] = useState("");
    const [discountFilter, setDiscountFilter] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    const uniqueDiscountTypes = [...new Set(discountedStudents.map((d) => d.discountType))];

    const filteredStudents = useMemo(() => {
        return discountedStudents.filter((student) => {
            const matchesSearch =
                search === "" ||
                student.studentName.toLowerCase().includes(search.toLowerCase()) ||
                student.admissionNo.toLowerCase().includes(search.toLowerCase());
            const matchesDiscount =
                discountFilter === "all" || student.discountType === discountFilter;
            return matchesSearch && matchesDiscount;
        });
    }, [search, discountFilter]);

    const totalMonthlyDiscount = filteredStudents.reduce(
        (sum, s) => sum + s.monthlyDiscount,
        0
    );

    const clearFilters = () => {
        setSearch("");
        setDiscountFilter("all");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Page Header */}
            <PageHeader
                title="Discounted Students"
                subtitle="Students receiving fee discounts or scholarships"
            >
                <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                    Export
                </Button>
            </PageHeader>

            {/* Summary Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <div className="flex flex-wrap items-center gap-6">
                    <div>
                        <p className="text-sm text-blue-600 font-medium">Total Students</p>
                        <p className="text-3xl font-bold text-blue-700">
                            {filteredStudents.length}
                        </p>
                    </div>
                    <div className="h-12 w-px bg-blue-200" />
                    <div>
                        <p className="text-sm text-blue-600 font-medium">Monthly Discount Value</p>
                        <p className="text-3xl font-bold text-blue-700">
                            Rs. {totalMonthlyDiscount.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <SearchBar
                            placeholder="Search by name or admission no..."
                            value={search}
                            onChange={setSearch}
                        />
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:w-auto"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                        {discountFilter !== "all" && (
                            <span className="ml-2 px-2 py-0.5 bg-accent text-white text-xs rounded-full">
                                1
                            </span>
                        )}
                    </Button>
                </div>

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
                                        Discount Type
                                    </label>
                                    <Select value={discountFilter} onValueChange={setDiscountFilter}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="All Discount Types" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="all">All Discount Types</SelectItem>
                                            {uniqueDiscountTypes.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div />
                                <div className="flex items-end">
                                    <Button variant="outline" onClick={clearFilters} className="w-full">
                                        Clear Filters
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Results Count */}
            <div className="text-sm text-text-secondary px-6">
                Showing {filteredStudents.length} of {discountedStudents.length} students
            </div>

            {/* Students Table */}
            <DiscountedStudentsTable students={filteredStudents} />

            {/* Empty State */}
            {filteredStudents.length === 0 && (
                <div className="text-center py-12">
                    <Percent className="w-12 h-12 text-text-muted mx-auto mb-3" />
                    <p className="text-text-secondary">No discounted students found</p>
                </div>
            )}
        </motion.div>
    );
}
