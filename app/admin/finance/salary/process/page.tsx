"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle, CreditCard, CheckCircle2, Loader2, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { Pagination } from "@/components/admin/students/Pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableHeadRow,
    TableRow,
} from "@/components/ui/Table";
import { staffSalaries, getDepartments } from "@/lib/admin/mock-data/salary";
import { cn } from "@/lib/common/utils";

const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const ITEMS_PER_PAGE = 10;

export default function ProcessSalaryPage() {
    const currentYear = 2026;
    const currentMonth = "Feb";

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    const [selectedStaff, setSelectedStaff] = useState<Set<string>>(new Set());
    const [isProcessing, setIsProcessing] = useState(false);
    const [isProcessed, setIsProcessed] = useState(false);

    // Filters
    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const departments = getDepartments();

    // Filter staff
    const filteredStaff = useMemo(() => {
        return staffSalaries.filter((staff) => {
            const matchesSearch =
                search === "" ||
                staff.staffName.toLowerCase().includes(search.toLowerCase()) ||
                staff.department.toLowerCase().includes(search.toLowerCase()) ||
                staff.designation.toLowerCase().includes(search.toLowerCase());

            const matchesDepartment =
                departmentFilter === "all" || staff.department === departmentFilter;

            const matchesType =
                typeFilter === "all" || staff.staffType === typeFilter;

            return matchesSearch && matchesDepartment && matchesType;
        });
    }, [search, departmentFilter, typeFilter]);

    // Paginate
    const paginatedStaff = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredStaff.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredStaff, currentPage]);

    const totalPages = Math.ceil(filteredStaff.length / ITEMS_PER_PAGE);

    const activeFilterCount = [departmentFilter, typeFilter].filter(
        (v) => v !== "all"
    ).length;

    const allSelected = paginatedStaff.length > 0 && paginatedStaff.every(s => selectedStaff.has(s.id));
    const someSelected = paginatedStaff.some(s => selectedStaff.has(s.id)) && !allSelected;

    const toggleAll = () => {
        const newSet = new Set(selectedStaff);
        if (allSelected) {
            paginatedStaff.forEach(s => newSet.delete(s.id));
        } else {
            paginatedStaff.forEach(s => newSet.add(s.id));
        }
        setSelectedStaff(newSet);
    };

    const toggleStaff = (id: string) => {
        const newSet = new Set(selectedStaff);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedStaff(newSet);
    };

    const clearFilters = () => {
        setSearch("");
        setDepartmentFilter("all");
        setTypeFilter("all");
        setCurrentPage(1);
    };

    const selectedSalaries = staffSalaries.filter(s => selectedStaff.has(s.id));
    const totalAmount = selectedSalaries.reduce((sum, s) => sum + s.netSalary, 0);

    const handleProcess = async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsProcessing(false);
        setIsProcessed(true);
    };

    const handleReset = () => {
        setIsProcessed(false);
        setSelectedStaff(new Set());
    };

    if (isProcessed) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <PageHeader title="Process Salary" subtitle="Process monthly salary payments" />

                <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary mb-2">
                        Salary Processed Successfully!
                    </h2>
                    <p className="text-text-secondary mb-2">
                        Processed {selectedSalaries.length} staff members for {selectedMonth} {selectedYear}
                    </p>
                    <p className="text-lg font-semibold text-accent mb-6">
                        Total Amount: Rs. {totalAmount.toLocaleString()}
                    </p>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={handleReset}>
                            Process Another Month
                        </Button>
                        <Button onClick={() => window.history.back()}>
                            Back to Salary Management
                        </Button>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <PageHeader
                title="Process Salary"
                subtitle="Process monthly salary payments for staff"
            />

            {/* Month/Year Selection */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-text-primary mb-4">Select Period</h3>
                <div className="flex gap-4">
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            {MONTHS.map((month) => (
                                <SelectItem key={month} value={month}>
                                    {month}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <SearchBar
                            placeholder="Search by name, department, or designation..."
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
                        {activeFilterCount > 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-accent text-white text-xs rounded-full">
                                {activeFilterCount}
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
                                        Department
                                    </label>
                                    <Select
                                        value={departmentFilter}
                                        onValueChange={setDepartmentFilter}
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
                                        value={typeFilter}
                                        onValueChange={setTypeFilter}
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
                                    <Button variant="outline" onClick={clearFilters} className="w-full">
                                        Clear Filters
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bulk Actions */}
            <AnimatePresence mode="wait">
                {selectedStaff.size > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="bg-accent/5 border border-accent/20 rounded-xl px-4 py-3 flex items-center justify-between">
                            <span className="text-sm font-medium text-accent">
                                {selectedStaff.size} staff selected
                            </span>
                            <Button size="sm" variant="ghost" onClick={() => setSelectedStaff(new Set())}>
                                <X className="w-4 h-4" />
                                Clear Selection
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Staff Selection Table */}
            <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-semibold text-text-primary">
                        Select Staff to Process
                    </h3>
                    <p className="text-sm text-text-secondary">
                        {selectedStaff.size} of {filteredStaff.length} selected
                    </p>
                </div>
                <Table className="border-0 rounded-none shadow-none">
                    <TableHeader>
                        <TableHeadRow>
                            <TableHead className="w-[50px]">
                                <button
                                    onClick={toggleAll}
                                    className="flex items-center justify-center w-full h-full"
                                >
                                    <div
                                        className={cn(
                                            "w-5 h-5 rounded flex items-center justify-center transition-all border",
                                            allSelected
                                                ? "bg-accent border-white text-white"
                                                : someSelected
                                                    ? "bg-accent/20 border-white text-accent"
                                                    : "border-white hover:border-white"
                                        )}
                                    >
                                        {(allSelected || someSelected) && (
                                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        )}
                                    </div>
                                </button>
                            </TableHead>
                            <TableHead>Staff Member</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Net Salary</TableHead>
                        </TableHeadRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedStaff.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-text-muted">
                                    No staff members found
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedStaff.map((staff) => {
                                const isSelected = selectedStaff.has(staff.id);
                                return (
                                    <TableRow
                                        key={staff.id}
                                        isClickable={false}
                                        className={isSelected ? "bg-accent/10 dark:bg-accent/20" : ""}
                                    >
                                        <TableCell>
                                            <button
                                                onClick={() => toggleStaff(staff.id)}
                                                className="flex items-center justify-center w-full h-full"
                                            >
                                                <div
                                                    className={cn(
                                                        "w-5 h-5 rounded flex items-center justify-center transition-all border",
                                                        isSelected
                                                            ? "bg-accent border-accent text-white"
                                                            : "border-text-secondary/30 hover:border-accent bg-transparent"
                                                    )}
                                                >
                                                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                                </div>
                                            </button>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                {staff.avatar ? (
                                                    <img
                                                        src={staff.avatar}
                                                        alt={staff.staffName}
                                                        className="w-9 h-9 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-sm">
                                                        {staff.staffName.charAt(0)}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-text-primary">
                                                        {staff.staffName}
                                                    </p>
                                                    <p className="text-xs text-text-muted">
                                                        {staff.designation}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-text-secondary">
                                            {staff.department}
                                        </TableCell>
                                        <TableCell>
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-full text-xs font-semibold capitalize",
                                                staff.staffType === "teaching"
                                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                                                    : staff.staffType === "non-teaching"
                                                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400"
                                                        : "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400"
                                            )}>
                                                {staff.staffType.replace("-", " ")}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right font-semibold text-accent">
                                            Rs. {staff.netSalary.toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="p-4 border-t border-border">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={filteredStaff.length}
                            itemsPerPage={ITEMS_PER_PAGE}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>

            {/* Summary & Process Button */}
            {selectedStaff.size > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="sticky bottom-4 bg-surface border border-border rounded-xl p-4 shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-text-secondary">
                                Total for {selectedStaff.size} staff members
                            </p>
                            <p className="text-2xl font-bold text-accent">
                                Rs. {totalAmount.toLocaleString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-text-muted">
                                <AlertCircle className="w-4 h-4" />
                                This action cannot be undone
                            </div>
                            <Button
                                size="lg"
                                onClick={handleProcess}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="w-4 h-4" />
                                        Process Salary
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
