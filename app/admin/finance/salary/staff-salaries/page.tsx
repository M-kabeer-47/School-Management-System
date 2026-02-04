"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Download, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { Pagination } from "@/components/admin/students/Pagination";
import {
    StaffSalaryTable,
    SalaryDetailsDrawer,
    StaffSalaryFilters,
    SalaryFilters,
} from "@/components/admin/finance/salary";
import { staffSalaries, getDepartments } from "@/lib/admin/mock-data/salary";
import { StaffSalary } from "@/lib/admin/types/salary";

const ITEMS_PER_PAGE = 10;

export default function StaffSalariesPage() {
    const [filters, setFilters] = useState<SalaryFilters>({
        search: "",
        department: "all",
        staffType: "all",
    });
    const [showFilters, setShowFilters] = useState(false);
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

    // Stats
    const totalNetSalary = filteredStaff.reduce((sum, s) => sum + s.netSalary, 0);
    const totalBaseSalary = filteredStaff.reduce((sum, s) => sum + s.baseSalary, 0);

    const handleFilterChange = (key: keyof SalaryFilters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

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

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-background rounded-2xl border border-border p-5 shadow-sm">
                    <p className="text-sm text-text-muted font-medium">Total Staff</p>
                    <p className="text-2xl font-bold text-text-primary mt-1">
                        {filteredStaff.length}
                    </p>
                </div>
                <div className="bg-background rounded-2xl border border-border p-5 shadow-sm">
                    <p className="text-sm text-text-muted font-medium">Total Base Salary</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                        Rs. {totalBaseSalary.toLocaleString()}
                    </p>
                </div>
                <div className="bg-background rounded-2xl border border-border p-5 shadow-sm">
                    <p className="text-sm text-text-muted font-medium">Total Net Salary</p>
                    <p className="text-2xl font-bold text-accent mt-1">
                        Rs. {totalNetSalary.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <StaffSalaryFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                departments={departments}
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
            />

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

            {/* Empty State */}
            {filteredStaff.length === 0 && (
                <div className="text-center py-12">
                    <Users className="w-12 h-12 text-text-muted mx-auto mb-3" />
                    <p className="text-text-secondary">No staff members found</p>
                </div>
            )}

            {/* Salary Details Drawer */}
            <SalaryDetailsDrawer
                staff={selectedStaff}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </motion.div>
    );
}
