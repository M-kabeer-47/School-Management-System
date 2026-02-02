"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Download, Printer, X, Receipt } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import {
    FeeCollectionFilters,
    FeeCollectionTable,
    FeeDetailsDrawer,
    FeeFilters,
} from "@/components/admin/finance";
import { getUniqueClasses, getUniqueSections } from "@/lib/admin/mock-data/students";
import { studentFeeRecords } from "@/lib/admin/mock-data/finance";
import { StudentFeeRecord } from "@/lib/admin/types/finance";

export default function FeeCollectionPage() {
    const [records] = useState<StudentFeeRecord[]>(studentFeeRecords);
    const [filters, setFilters] = useState<FeeFilters>({
        search: "",
        class: "all",
        section: "all",
        status: "all",
    });
    const [showFilters, setShowFilters] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<StudentFeeRecord | null>(null);

    const uniqueClasses = getUniqueClasses();
    const uniqueSections = getUniqueSections();

    const filteredRecords = useMemo(() => {
        return records.filter((record) => {
            const matchesSearch =
                filters.search === "" ||
                record.studentName.toLowerCase().includes(filters.search.toLowerCase()) ||
                record.admissionNo.toLowerCase().includes(filters.search.toLowerCase()) ||
                record.fatherName.toLowerCase().includes(filters.search.toLowerCase());

            const matchesStatus = filters.status === "all" || record.status === filters.status;
            const matchesClass = filters.class === "all" || record.class === filters.class;
            const matchesSection = filters.section === "all" || record.section === filters.section;

            return matchesSearch && matchesStatus && matchesClass && matchesSection;
        });
    }, [records, filters]);

    // Stats
    const totalCollected = filteredRecords
        .filter((r) => r.status === "paid")
        .reduce((sum, r) => sum + r.paidAmount, 0);
    const totalPending = filteredRecords
        .filter((r) => r.status !== "paid")
        .reduce((sum, r) => sum + r.pendingAmount, 0);

    const handleFilterChange = (key: keyof FeeFilters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({ search: "", class: "all", section: "all", status: "all" });
    };

    const handleToggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleToggleSelectAll = () => {
        if (selectedIds.length === filteredRecords.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredRecords.map((r) => r.id));
        }
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
                title="Fee Collection"
                subtitle="View student fees and collect payments"
            >
                <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                    Export
                </Button>
            </PageHeader>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-background rounded-2xl border border-border p-5 shadow-sm">
                    <p className="text-sm text-text-muted font-medium">Total Collected</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                        Rs. {totalCollected.toLocaleString()}
                    </p>
                </div>
                <div className="bg-background rounded-2xl border border-border p-5 shadow-sm">
                    <p className="text-sm text-text-muted font-medium">Pending Amount</p>
                    <p className="text-2xl font-bold text-orange-600 mt-1">
                        Rs. {totalPending.toLocaleString()}
                    </p>
                </div>
                <div className="bg-background rounded-2xl border border-border p-5 shadow-sm">
                    <p className="text-sm text-text-muted font-medium">Total Students</p>
                    <p className="text-2xl font-bold text-text-primary mt-1">
                        {filteredRecords.length}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <FeeCollectionFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                uniqueClasses={uniqueClasses}
                uniqueSections={uniqueSections}
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
            />

            {/* Bulk Actions */}
            <AnimatePresence mode="wait">
                {selectedIds.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="bg-accent/5 border border-accent/20 rounded-xl px-4 py-3 flex items-center justify-between">
                            <span className="text-sm font-medium text-accent">
                                {selectedIds.length} students selected
                            </span>
                            <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline">
                                    <Printer className="w-4 h-4" />
                                    Print Challans
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => setSelectedIds([])}>
                                    <X className="w-4 h-4" />
                                    Clear
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results Count */}
            <div className="text-sm text-text-secondary px-6">
                Showing {filteredRecords.length} of {records.length} students
            </div>

            {/* Table */}
            <FeeCollectionTable
                records={filteredRecords}
                selectedIds={selectedIds}
                onToggleSelect={handleToggleSelect}
                onToggleSelectAll={handleToggleSelectAll}
                onViewDetails={setSelectedRecord}
            />

            {/* Empty State */}
            {filteredRecords.length === 0 && (
                <div className="text-center py-12">
                    <Receipt className="w-12 h-12 text-text-muted mx-auto mb-3" />
                    <p className="text-text-secondary">No students found</p>
                </div>
            )}

            {/* Details Drawer */}
            <FeeDetailsDrawer
                record={selectedRecord}
                isOpen={!!selectedRecord}
                onClose={() => setSelectedRecord(null)}
            />
        </motion.div>
    );
}
