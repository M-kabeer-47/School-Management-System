"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Printer, FileText, Filter, X, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { Pagination } from "@/components/admin/students/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { ClassSelect } from "@/components/admin/students/ClassSelect";
import { PrintChallanTable } from "@/components/admin/finance";
import { ChallanPrintTemplate } from "@/components/admin/finance/ChallanPrintTemplate";
import { getUniqueClasses } from "@/lib/admin/mock-data/students";
import { challanData } from "@/lib/admin/mock-data/finance";
import { ChallanData, FeeChallan } from "@/lib/admin/types/finance";
import { publishChallans } from "@/lib/shared/challan-store";

const ITEMS_PER_PAGE = 10;

export default function PrintChallanPage() {
    const [challans] = useState<ChallanData[]>(challanData);
    const [search, setSearch] = useState("");
    const [classFilter, setClassFilter] = useState("all");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [previewChallan, setPreviewChallan] = useState<ChallanData | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [isPrinting, setIsPrinting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [publishedIds, setPublishedIds] = useState<string[]>([]);

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

    // Pagination
    const paginatedChallans = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredChallans.slice(startIndex, endIndex);
    }, [filteredChallans, currentPage]);

    const totalPages = Math.ceil(filteredChallans.length / ITEMS_PER_PAGE);

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

    const handlePrint = () => {
        setIsPrinting(true);
        setTimeout(() => {
            window.print();
            setIsPrinting(false);
        }, 100);
    };

    const handleBulkPrint = () => {
        // For bulk print, we'd need to show all selected challans
        console.log("Printing challans for:", selectedIds);
        handlePrint();
    };

    const handlePublishToPortal = () => {
        const selectedChallans = challans.filter((c) => selectedIds.includes(c.id));
        const asFeeChallan: FeeChallan[] = selectedChallans.map((c) => ({
            id: c.id,
            challanNo: c.challanNo,
            studentId: c.id,
            studentName: c.studentName,
            fatherName: c.fatherName,
            class: c.class,
            section: c.section,
            admissionNo: c.admissionNo,
            month: c.month,
            academicYear: "2025-2026",
            issueDate: new Date().toISOString().split("T")[0],
            dueDate: c.dueDate,
            lineItems: c.items.map((item, i) => ({
                id: `li-${i}`,
                name: item.name,
                amount: item.amount,
            })),
            totalAmount: c.total,
            discountAmount: 0,
            netAmount: c.total,
            status: "pending" as const,
        }));
        publishChallans(asFeeChallan);
        setPublishedIds((prev) => [...prev, ...selectedIds]);
    };

    const allSelectedPublished =
        selectedIds.length > 0 && selectedIds.every((id) => publishedIds.includes(id));

    const clearFilters = () => {
        setSearch("");
        setClassFilter("all");
        setCurrentPage(1);
    };

    return (
        <>
            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-area, .print-area * {
                        visibility: visible;
                    }
                    .print-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        background: white;
                    }
                    .no-print {
                        display: none !important;
                    }
                    @page {
                        size: A4 landscape;
                        margin: 10mm;
                    }
                }
            `}</style>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 no-print"
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
                <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <div>
                            <p className="font-medium text-purple-800 dark:text-purple-300">Bulk Print Instructions</p>
                            <p className="text-sm text-purple-600 dark:text-purple-400">
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
                            className="bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-xl px-4 py-3 flex items-center justify-between"
                        >
                            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                {selectedIds.length} challans selected
                            </span>
                            <div className="flex items-center gap-2">
                                {allSelectedPublished ? (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled
                                        className="border-green-300 text-green-700 gap-1.5 opacity-80"
                                    >
                                        <Check className="w-4 h-4" />
                                        Published
                                    </Button>
                                ) : (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handlePublishToPortal}
                                        className="border-green-300 text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 gap-1.5"
                                    >
                                        <Upload className="w-4 h-4" />
                                        Publish to Portal
                                    </Button>
                                )}
                                <Button
                                    size="sm"
                                    className="bg-purple-600 hover:bg-purple-700"
                                    onClick={handleBulkPrint}
                                >
                                    <Printer className="w-4 h-4" />
                                    Print All Selected
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Challans Table with Pagination */}
                <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
                    <PrintChallanTable
                        challans={paginatedChallans}
                        selectedIds={selectedIds}
                        onToggleSelect={handleToggleSelect}
                        onToggleSelectAll={handleSelectAll}
                        onPreview={setPreviewChallan}
                        publishedIds={publishedIds}
                    />
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredChallans.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                />

                {/* Empty State */}
                {filteredChallans.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-text-muted mx-auto mb-3" />
                        <p className="text-text-secondary">No challans found</p>
                    </div>
                )}
            </motion.div>

            {/* Preview Modal */}
            <AnimatePresence>
                {previewChallan && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 no-print"
                        onClick={() => setPreviewChallan(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-[950px] w-full max-h-[95vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Fee Challan Preview</h2>
                                    <p className="text-sm text-gray-500">
                                        {previewChallan.studentName} - {previewChallan.challanNo}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button
                                        onClick={handlePrint}
                                        disabled={isPrinting}
                                        className="bg-purple-600 hover:bg-purple-700"
                                    >
                                        <Printer className="w-4 h-4" />
                                        {isPrinting ? "Printing..." : "Print Challan"}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setPreviewChallan(null)}
                                        className="max-w-[40px]"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Challan Preview Content */}
                            <div className="p-6 bg-gray-50">
                                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                                    <ChallanPrintTemplate challan={previewChallan} />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Print Area - Hidden on screen, visible when printing */}
            {previewChallan && (
                <div className="print-area hidden print:block">
                    <ChallanPrintTemplate challan={previewChallan} />
                </div>
            )}
        </>
    );
}
