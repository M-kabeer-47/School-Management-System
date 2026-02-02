"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Printer, FileText, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { ClassSelect } from "@/components/admin/students/ClassSelect";
import { PrintChallanTable } from "@/components/admin/finance";
import { getUniqueClasses } from "@/lib/admin/mock-data/students";
import { challanData } from "@/lib/admin/mock-data/finance";
import { ChallanData } from "@/lib/admin/types/finance";

export default function PrintChallanPage() {
    const [challans] = useState<ChallanData[]>(challanData);
    const [search, setSearch] = useState("");
    const [classFilter, setClassFilter] = useState("all");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [previewChallan, setPreviewChallan] = useState<ChallanData | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const printRef = useRef<HTMLDivElement>(null);

    const uniqueClasses = getUniqueClasses();

    const filteredChallans = useMemo(() => {
        return challans.filter((challan) => {
            const matchesSearch =
                search === "" ||
                challan.studentName.toLowerCase().includes(search.toLowerCase()) ||
                challan.admissionNo.toLowerCase().includes(search.toLowerCase());
            const matchesClass = classFilter === "all" || challan.class === classFilter;
            return matchesSearch && matchesClass;
        });
    }, [challans, search, classFilter]);

    const handleSelectAll = () => {
        if (selectedIds.length === filteredChallans.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredChallans.map((c) => c.id));
        }
    };

    const handleToggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handlePrint = (challan?: ChallanData) => {
        if (challan) setPreviewChallan(challan);
        setTimeout(() => window.print(), 100);
    };

    const handleBulkPrint = () => {
        console.log("Printing challans for:", selectedIds);
        window.print();
    };

    const clearFilters = () => {
        setSearch("");
        setClassFilter("all");
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
                title="Print Fee Challans"
                subtitle="Print single or bulk fee challans for students"
            >
                {selectedIds.length > 0 && (
                    <Button onClick={handleBulkPrint}>
                        <Printer className="w-4 h-4" />
                        Print Selected ({selectedIds.length})
                    </Button>
                )}
            </PageHeader>

            {/* Info Card */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <div>
                        <p className="font-medium text-purple-800">Bulk Print Instructions</p>
                        <p className="text-sm text-purple-600">
                            Select multiple students using checkboxes and click "Print Selected" to
                            print all at once
                        </p>
                    </div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <SearchBar
                            placeholder="Search by name or admission number..."
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
                        {classFilter !== "all" && (
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
                                <ClassSelect
                                    label="Class"
                                    value={classFilter}
                                    onChange={setClassFilter}
                                    options={uniqueClasses}
                                    placeholder="All Classes"
                                    allLabel="All Classes"
                                />
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

            {/* Bulk Selection Actions */}
            <AnimatePresence>
                {selectedIds.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-purple-100 border border-purple-200 rounded-xl px-4 py-3 flex items-center justify-between"
                    >
                        <span className="text-sm font-medium text-purple-700">
                            {selectedIds.length} challans selected for printing
                        </span>
                        <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={handleBulkPrint}
                        >
                            <Printer className="w-4 h-4" />
                            Print All Selected
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results Count */}
            <div className="text-sm text-text-secondary px-6">
                Showing {filteredChallans.length} of {challans.length} challans
            </div>

            {/* Challans Table */}
            <PrintChallanTable
                challans={filteredChallans}
                selectedIds={selectedIds}
                onToggleSelect={handleToggleSelect}
                onToggleSelectAll={handleSelectAll}
                onPreview={setPreviewChallan}
            />

            {/* Empty State */}
            {filteredChallans.length === 0 && (
                <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-text-muted mx-auto mb-3" />
                    <p className="text-text-secondary">No challans found</p>
                </div>
            )}

            {/* Preview Modal */}
            <AnimatePresence>
                {previewChallan && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setPreviewChallan(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Challan Preview */}
                            <div ref={printRef} className="p-6 print:p-0">
                                {/* Header */}
                                <div className="text-center border-b-2 border-gray-800 pb-4 mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900">City Public School</h2>
                                    <p className="text-sm text-gray-600">123 Education Street, City</p>
                                    <p className="text-lg font-semibold mt-2 text-gray-800">FEE CHALLAN</p>
                                </div>

                                {/* Student Info */}
                                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                    <div>
                                        <p className="text-gray-500">Challan No</p>
                                        <p className="font-bold">{previewChallan.challanNo}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Due Date</p>
                                        <p className="font-bold">{previewChallan.dueDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Student Name</p>
                                        <p className="font-bold">{previewChallan.studentName}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Father Name</p>
                                        <p className="font-bold">{previewChallan.fatherName}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Admission No</p>
                                        <p className="font-bold">{previewChallan.admissionNo}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Class</p>
                                        <p className="font-bold">
                                            {previewChallan.class} - {previewChallan.section}
                                        </p>
                                    </div>
                                </div>

                                {/* Fee Items */}
                                <table className="w-full text-sm mb-4">
                                    <thead>
                                        <tr className="border-b border-gray-300">
                                            <th className="text-left py-2">Description</th>
                                            <th className="text-right py-2">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {previewChallan.items.map((item, idx) => (
                                            <tr key={idx} className="border-b border-gray-200">
                                                <td className="py-2">{item.name}</td>
                                                <td className="text-right py-2">
                                                    Rs. {item.amount.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="font-bold">
                                            <td className="py-2">Total</td>
                                            <td className="text-right py-2">
                                                Rs. {previewChallan.total.toLocaleString()}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* Footer */}
                                <div className="text-center text-xs text-gray-500 mt-6 pt-4 border-t">
                                    <p>Please pay before the due date to avoid late fee charges</p>
                                    <p className="mt-1">Month: {previewChallan.month}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="px-6 pb-6 flex gap-3 print:hidden">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setPreviewChallan(null)}
                                >
                                    Close
                                </Button>
                                <Button
                                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                                    onClick={() => handlePrint(previewChallan)}
                                >
                                    <Printer className="w-4 h-4" />
                                    Print
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
