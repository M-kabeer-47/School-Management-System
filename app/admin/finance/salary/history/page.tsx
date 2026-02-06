"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Download, X, FileText } from "lucide-react";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableHeadRow,
    TableRow,
} from "@/components/ui/Table";
import { Pagination } from "@/components/admin/students/Pagination";
import { salaryPayments, getDepartments } from "@/lib/admin/mock-data/salary";
import { cn } from "@/lib/common/utils";
import { PaymentStatusBadge, PaymentStatus, GeneralStatusBadge } from "@/utils/status-styles";

const ITEMS_PER_PAGE = 10;

export default function PaymentHistoryPage() {
    const [filters, setFilters] = useState({
        search: "",
        department: "all",
        status: "all",
        month: "all",
    });
    const [currentPage, setCurrentPage] = useState(1);

    const departments = getDepartments();
    const months = [...new Set(salaryPayments.map(p => p.month))];

    const filteredPayments = useMemo(() => {
        return salaryPayments.filter((payment) => {
            const searchMatch =
                filters.search === "" ||
                payment.staffName.toLowerCase().includes(filters.search.toLowerCase()) ||
                payment.department.toLowerCase().includes(filters.search.toLowerCase());

            const deptMatch =
                filters.department === "all" || payment.department === filters.department;

            const statusMatch =
                filters.status === "all" || payment.status === filters.status;

            const monthMatch =
                filters.month === "all" || payment.month === filters.month;

            return searchMatch && deptMatch && statusMatch && monthMatch;
        });
    }, [filters]);

    const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);
    const paginatedPayments = filteredPayments.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const hasActiveFilters =
        filters.search !== "" ||
        filters.department !== "all" ||
        filters.status !== "all" ||
        filters.month !== "all";

    const clearFilters = () => {
        setFilters({ search: "", department: "all", status: "all", month: "all" });
        setCurrentPage(1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <PageHeader
                title="Payment History"
                subtitle="View all salary payment records"
            >
                <Button variant="outline">
                    <Download className="w-4 h-4" />
                    Export
                </Button>
            </PageHeader>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <SearchBar
                        placeholder="Search by staff name or department..."
                        value={filters.search}
                        onChange={(value) => {
                            setFilters((prev) => ({ ...prev, search: value }));
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <div className="flex flex-wrap gap-3">
                    <Select
                        value={filters.month}
                        onValueChange={(value) => {
                            setFilters((prev) => ({ ...prev, month: value }));
                            setCurrentPage(1);
                        }}
                    >
                        <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Months</SelectItem>
                            {months.map((month) => (
                                <SelectItem key={month} value={month}>
                                    {month}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

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
                        value={filters.status}
                        onValueChange={(value) => {
                            setFilters((prev) => ({ ...prev, status: value }));
                            setCurrentPage(1);
                        }}
                    >
                        <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="partial">Partial</SelectItem>
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

            {/* Payments Table */}
            <Table>
                <TableHeader>
                    <TableHeadRow>
                        <TableHead className="w-[220px]">Staff Member</TableHead>
                        <TableHead className="w-[130px]">Month</TableHead>
                        <TableHead className="w-[140px]">Department</TableHead>
                        <TableHead className="w-[120px] text-right">Net Salary</TableHead>
                        <TableHead className="w-[120px] text-right">Paid Amount</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[120px]">Paid Date</TableHead>
                    </TableHeadRow>
                </TableHeader>
                <TableBody>
                    {paginatedPayments.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="h-32 text-center">
                                <div className="flex flex-col items-center justify-center">
                                    <FileText className="w-10 h-10 text-text-muted mb-2" />
                                    <p className="text-text-muted">No payment records found</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginatedPayments.map((payment) => (
                            <TableRow key={payment.id} className="hover:bg-surface-hover transition-colors">
                                <TableCell>
                                    <div>
                                        <p className="font-medium text-text-primary">
                                            {payment.staffName}
                                        </p>
                                        <p className="text-xs text-text-muted">
                                            {payment.designation}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-text-primary">
                                    {payment.month}
                                </TableCell>
                                <TableCell className="text-text-secondary">
                                    {payment.department}
                                </TableCell>
                                <TableCell className="text-right font-medium text-text-primary">
                                    Rs. {payment.netSalary.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right font-semibold text-accent">
                                    Rs. {payment.paidAmount.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {payment.status === "partial" ? (
                                        <GeneralStatusBadge status="warning" size="sm" />
                                    ) : (
                                        <PaymentStatusBadge
                                            status={payment.status as PaymentStatus}
                                            size="sm"
                                        />
                                    )}
                                </TableCell>
                                <TableCell className="text-text-secondary text-sm">
                                    {payment.paidDate
                                        ? new Date(payment.paidDate).toLocaleDateString('en-GB')
                                        : "—"}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredPayments.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
            />
        </motion.div>
    );
}
