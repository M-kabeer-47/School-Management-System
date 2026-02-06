"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import {
    ComplaintsFilters,
    ComplaintsTable,
    ComplaintDetailDrawer,
} from "@/components/admin/complaints";
import { Pagination } from "@/components/admin/complaints/Pagination";
import {
    AdminComplaint,
    ComplaintsFilters as FiltersType,
    ComplaintStatus,
} from "@/lib/admin/types/complaints";
import { mockComplaints } from "@/lib/admin/mock-data/complaints";
import ComplaintKPICards from "@/components/admin/complaints/ComplaintKPICards";

export default function ComplaintsPage() {
    const [filters, setFilters] = useState<FiltersType>({
        search: "",
        status: "all",
        source: "all",
        category: "all",
        month: "all",
    });

    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Drawer state
    const [selectedComplaint, setSelectedComplaint] = useState<AdminComplaint | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Local complaints state for updates
    const [complaints, setComplaints] = useState<AdminComplaint[]>(mockComplaints);

    const itemsPerPage = 10;

    // Filter complaints
    const filteredComplaints = useMemo(() => {
        return complaints.filter((complaint) => {
            const searchMatch =
                filters.search === "" ||
                complaint.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
                complaint.submittedBy.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                complaint.message.toLowerCase().includes(filters.search.toLowerCase());

            const statusMatch =
                filters.status === "all" || complaint.status === filters.status;
            const sourceMatch =
                filters.source === "all" || complaint.source === filters.source;
            const categoryMatch =
                filters.category === "all" || complaint.category === filters.category;
            const monthMatch =
                filters.month === "all" || complaint.submittedAt.startsWith(filters.month);

            return searchMatch && statusMatch && sourceMatch && categoryMatch && monthMatch;
        });
    }, [complaints, filters]);

    // Pagination
    const paginatedComplaints = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredComplaints.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredComplaints, currentPage]);

    const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);

    const handleFilterChange = (key: keyof FiltersType, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setFilters({ search: "", status: "all", source: "all", category: "all", month: "all" });
        setCurrentPage(1);
    };

    const handleViewComplaint = (complaint: AdminComplaint) => {
        setSelectedComplaint(complaint);
        setIsDrawerOpen(true);
    };

    const handleStatusChange = (complaint: AdminComplaint, newStatus: ComplaintStatus) => {
        setComplaints((prev) =>
            prev.map((c) =>
                c.id === complaint.id ? { ...c, status: newStatus } : c
            )
        );
        // Update selected complaint if it's the same
        if (selectedComplaint?.id === complaint.id) {
            setSelectedComplaint((prev) =>
                prev ? { ...prev, status: newStatus } : null
            );
        }
    };

    const handleSendResponse = (complaint: AdminComplaint, message: string) => {
        const newResponse = {
            id: `resp-${Date.now()}`,
            message,
            respondedBy: "Principal Anderson (Admin)",
            respondedAt: new Date().toISOString(),
        };

        setComplaints((prev) =>
            prev.map((c) =>
                c.id === complaint.id
                    ? { ...c, responses: [...c.responses, newResponse] }
                    : c
            )
        );

        // Update selected complaint
        if (selectedComplaint?.id === complaint.id) {
            setSelectedComplaint((prev) =>
                prev
                    ? { ...prev, responses: [...prev.responses, newResponse] }
                    : null
            );
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-heading flex items-center gap-2">
                        Complaints
                        <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                    </h1>
                    <p className="text-text-secondary mt-1">
                        View and manage complaints from students and instructors
                    </p>
                </div>
            </div>
            <ComplaintKPICards complaints={complaints} />

            {/* Filters */}
            <ComplaintsFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
            />

            {/* Results Count */}
            <div className="text-sm text-text-secondary px-1">
                Showing {paginatedComplaints.length} of {filteredComplaints.length} complaints
            </div>

            {/* Complaints Table */}
            <ComplaintsTable
                complaints={paginatedComplaints}
                onViewComplaint={handleViewComplaint}
            />

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredComplaints.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            )}

            {/* Complaint Detail Drawer */}
            <ComplaintDetailDrawer
                complaint={selectedComplaint}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onStatusChange={handleStatusChange}
                onSendResponse={handleSendResponse}
            />
        </motion.div>
    );
}
