"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Download, Filter, X } from "lucide-react";
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
import { Pagination } from "@/components/admin/students/Pagination";
import { StaffSalaryTable, SalaryDetailsDrawer } from "@/components/admin/finance/salary";
import { staffSalaries, getDepartments } from "@/lib/admin/mock-data/salary";
import { StaffSalary } from "@/lib/admin/types/salary";

const ITEMS_PER_PAGE = 10;

export default function StaffSalariesPage() {
    const [filters, setFilters] = useState({
        search: "",
        department: "all",
        staffType: "all",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStaff, setSelectedStaff] = useState<StaffSalary | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const departments = getDepartments();

    const filteredStaff = useMemo(() => {
        return staffSalaries.filter((staff) => {
            const searchMatch =
                filters.search === "" ||
                staff.staffName.toLowerCase().includes(filters.search.toLowerCase()) ||
                staff.department.toLowerCase().includes(filters.search.toLowerCase()) ||
                staff.designation.toLowerCase().includes(filters.search.toLowerCase());

            const deptMatch =
                filters.department === "all" || staff.department === filters.department;

            const typeMatch =
                filters.staffType === "all" || staff.staffType === filters.staffType;

            return searchMatch && deptMatch && typeMatch;
        });
    }, [filters]);

    const totalPages = Math.ceil(filteredStaff.length / ITEMS_PER_PAGE);
    const paginatedStaff = filteredStaff.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const hasActiveFilters =
        filters.search !== "" ||
        filters.department !== "all" ||
        filters.staffType !== "all";

    const clearFilters = () => {
        setFilters({ search: "", department: "all", staffType: "all" });
        setCurrentPage(1);
    };

    const handleSelectStaff = (staff: StaffSalary) => {
        setSelectedStaff(staff);
        setIsDrawerOpen(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <PageHeader
                title="Staff Salaries"
                subtitle="View and manage staff salary information"
            >
                <Button variant="outline">
                    <Download className="w-4 h-4" />
                    Export
                </Button>
            </PageHeader>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <SearchBar
                        placeholder="Search by name, department, or designation..."
                        value={filters.search}
                        onChange={(value) => {
                            setFilters((prev) => ({ ...prev, search: value }));
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <div className="flex gap-3">
                    <Select
                        value={filters.department}
                        onValueChange={(value) => {
                            setFilters((prev) => ({ ...prev, department: value }));
                            setCurrentPage(1);
                        }}
                    >
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Department" />
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

                    <Select
                        value={filters.staffType}
                        onValueChange={(value) => {
                            setFilters((prev) => ({ ...prev, staffType: value }));
                            setCurrentPage(1);
                        }}
                    >
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Staff Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="teaching">Teaching</SelectItem>
                            <SelectItem value="non-teaching">Non-Teaching</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                    </Select>

                    {hasActiveFilters && (
                        <Button variant="ghost" onClick={clearFilters}>
                            <X className="w-4 h-4" />
                            Clear
                        </Button>
                    )}
                </div>
            </div>

            {/* Summary */}
            <div className="flex items-center justify-between text-sm">
                <p className="text-text-secondary">
                    Showing <span className="font-medium text-text-primary">{paginatedStaff.length}</span> of{" "}
                    <span className="font-medium text-text-primary">{filteredStaff.length}</span> staff members
                </p>
                <p className="text-text-secondary">
                    Total Net Salary:{" "}
                    <span className="font-semibold text-accent">
                        Rs. {filteredStaff.reduce((sum, s) => sum + s.netSalary, 0).toLocaleString()}
                    </span>
                </p>
            </div>

            {/* Table */}
            <StaffSalaryTable staff={paginatedStaff} onSelectStaff={handleSelectStaff} />

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredStaff.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
            />

            {/* Salary Details Drawer */}
            <SalaryDetailsDrawer
                staff={selectedStaff}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </motion.div>
    );
}
