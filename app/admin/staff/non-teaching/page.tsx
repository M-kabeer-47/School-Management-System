"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Plus, Download, Upload, Trash2 } from "lucide-react";
import { StaffFilters, StaffTable, StaffDetailsDrawer } from "@/components/admin/staff";
import { Pagination } from "@/components/admin/students/Pagination";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { NonTeachingStaff, StaffFilters as StaffFiltersType, AnyStaff } from "@/lib/admin/types/staff";
import { nonTeachingStaff, getUniqueDepartments } from "@/lib/admin/mock-data/staff";

export default function NonTeachingStaffPage() {
    const router = useRouter();
    const [filters, setFilters] = useState<StaffFiltersType>({
        search: "",
        department: "all",
        status: "all",
    });

    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // Drawer state
    const [selectedStaff, setSelectedStaff] = useState<NonTeachingStaff | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Delete state
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const itemsPerPage = 10;
    const departments = getUniqueDepartments("non-teaching");

    // Filter staff based on search and filters
    const filteredStaff = useMemo(() => {
        return nonTeachingStaff.filter((staff) => {
            const searchMatch =
                filters.search === "" ||
                staff.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                staff.email.toLowerCase().includes(filters.search.toLowerCase()) ||
                staff.staffCode.toLowerCase().includes(filters.search.toLowerCase()) ||
                staff.department.toLowerCase().includes(filters.search.toLowerCase());

            const departmentMatch =
                filters.department === "all" || staff.department === filters.department;
            const statusMatch =
                filters.status === "all" || staff.status === filters.status;

            return searchMatch && departmentMatch && statusMatch;
        });
    }, [filters]);

    // Pagination
    const paginatedStaff = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredStaff.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredStaff, currentPage]);

    const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

    const handleFilterChange = (key: keyof StaffFiltersType, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setFilters({ search: "", department: "all", status: "all" });
        setCurrentPage(1);
    };

    const handleStaffAction = (action: string, staff: AnyStaff) => {
        if (action === "view") {
            setSelectedStaff(staff as NonTeachingStaff);
            setIsDrawerOpen(true);
        }
    };

    const handleToggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };

    const handleToggleSelectAll = () => {
        if (selectedIds.length === paginatedStaff.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(paginatedStaff.map((s) => s.id));
        }
    };

    const handleDeleteSelected = async () => {
        setIsDeleting(true);
        console.log(`Deleting ${selectedIds.length} staff:`, selectedIds);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsDeleting(false);
        setIsDeleteOpen(false);
        setSelectedIds([]);
    };

    const handleEdit = (staff: AnyStaff) => {
        console.log("Edit staff:", staff.name);
        // Navigate to edit page or open edit modal
    };

    const handleDeactivate = (staff: AnyStaff) => {
        console.log("Deactivate staff:", staff.name);
        // Call API to deactivate
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-heading">
                        Non-Teaching Staff
                    </h1>
                    <p className="text-text-secondary mt-1">
                        Manage administrative and support staff
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4" />
                        Import
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                    <Button onClick={() => router.push("/admin/staff/non-teaching/add")}>
                        <Plus className="w-4 h-4" />
                        Add Staff
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <StaffFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                departments={departments}
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
                searchPlaceholder="Search by name, email, or staff code..."
            />

            {/* Bulk Actions & Count */}
            <div className="space-y-4">
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
                                    {selectedIds.length} staff selected
                                </span>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-error border-error/20 hover:bg-error/10 hover:text-error"
                                    onClick={() => setIsDeleteOpen(true)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Selected
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="text-sm text-text-secondary px-6">
                    Showing {paginatedStaff.length} of {filteredStaff.length} staff
                </div>
            </div>

            {/* Staff Table */}
            <StaffTable
                staff={paginatedStaff}
                onStaffAction={handleStaffAction}
                selectedIds={selectedIds}
                onToggleSelect={handleToggleSelect}
                onToggleSelectAll={handleToggleSelectAll}
            />

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredStaff.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />

            {/* Staff Details Drawer */}
            <StaffDetailsDrawer
                staff={selectedStaff}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onEdit={handleEdit}
                onDeactivate={handleDeactivate}
            />

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDeleteSelected}
                title="Delete Staff"
                message={`Are you sure you want to delete ${selectedIds.length} selected staff member(s)? This action cannot be undone.`}
                confirmText="Delete"
                variant="danger"
                isLoading={isDeleting}
            />
        </motion.div>
    );
}
