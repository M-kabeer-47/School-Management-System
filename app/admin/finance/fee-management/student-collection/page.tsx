"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    User,
    ArrowLeft,
    Search,
    Download,
    Calendar,
    Receipt,
    CheckCircle,
    Clock,
    AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { feeChallans, recentPayments } from "@/lib/admin/mock-data/finance";
import { allStudents } from "@/lib/admin/mock-data/students";
import { cn } from "@/lib/shadcn/utils";

export default function StudentCollectionPage() {
    const [search, setSearch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState<typeof allStudents[0] | null>(null);

    const filteredStudents = allStudents.filter(
        (s) =>
            search !== "" &&
            (s.studentName.toLowerCase().includes(search.toLowerCase()) ||
                s.admissionNo.toLowerCase().includes(search.toLowerCase()))
    ).slice(0, 5);

    // Get student's challans
    const studentChallans = selectedStudent
        ? feeChallans.filter((c) => c.studentName === selectedStudent.studentName)
        : [];

    const studentPayments = selectedStudent
        ? recentPayments.filter((p) => p.studentName === selectedStudent.studentName)
        : [];

    const totalPaid = studentChallans
        .filter((c) => c.status === "paid")
        .reduce((sum, c) => sum + c.netAmount, 0);

    const totalPending = studentChallans
        .filter((c) => c.status === "pending" || c.status === "overdue")
        .reduce((sum, c) => sum + c.netAmount, 0);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "paid":
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case "pending":
                return <Clock className="w-4 h-4 text-yellow-600" />;
            case "overdue":
                return <AlertTriangle className="w-4 h-4 text-red-600" />;
            default:
                return <Receipt className="w-4 h-4 text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-700 border-green-200";
            case "pending":
                return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "overdue":
                return "bg-red-100 text-red-700 border-red-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
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
            <div className="flex items-center gap-3">
                <Link href="/admin/finance/fee-management">
                    <Button variant="ghost" size="sm" className="gap-1">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-heading flex items-center gap-3">
                        Student Fee Record
                        <User className="w-7 h-7 text-accent" />
                    </h1>
                    <p className="text-text-secondary mt-1">
                        View complete fee history for a student
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input
                    placeholder="Search student by name or admission number..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        if (e.target.value === "") setSelectedStudent(null);
                    }}
                    className="pl-10"
                />

                {/* Search Results Dropdown */}
                {filteredStudents.length > 0 && !selectedStudent && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-lg z-10 overflow-hidden">
                        {filteredStudents.map((student) => (
                            <div
                                key={student.id}
                                onClick={() => {
                                    setSelectedStudent(student);
                                    setSearch(student.studentName);
                                }}
                                className="flex items-center gap-3 p-3 hover:bg-surface-hover cursor-pointer border-b border-border last:border-0"
                            >
                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                    <User className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <p className="font-medium text-text-primary">
                                        {student.studentName}
                                    </p>
                                    <p className="text-xs text-text-muted">
                                        {student.admissionNo} • {student.class} - {student.section}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Selected Student View */}
            {selectedStudent && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Student Card */}
                    <div className="bg-background rounded-2xl border border-border p-5 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                            <User className="w-8 h-8 text-accent" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-text-primary">
                                {selectedStudent.studentName}
                            </h2>
                            <p className="text-text-secondary">
                                {selectedStudent.admissionNo} • {selectedStudent.class} -{" "}
                                {selectedStudent.section}
                            </p>
                            <p className="text-sm text-text-muted">
                                S/O {selectedStudent.fatherName}
                            </p>
                        </div>
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                            Download Statement
                        </Button>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <p className="text-sm text-green-600 font-medium">Total Paid</p>
                            <p className="text-2xl font-bold text-green-700">
                                Rs. {totalPaid.toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                            <p className="text-sm text-orange-600 font-medium">
                                Pending Amount
                            </p>
                            <p className="text-2xl font-bold text-orange-700">
                                Rs. {totalPending.toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <p className="text-sm text-blue-600 font-medium">Total Challans</p>
                            <p className="text-2xl font-bold text-blue-700">
                                {studentChallans.length}
                            </p>
                        </div>
                    </div>

                    {/* Fee History Timeline */}
                    <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-4">
                            Fee History
                        </h3>

                        {studentChallans.length > 0 ? (
                            <div className="space-y-4">
                                {studentChallans.map((challan) => (
                                    <div
                                        key={challan.id}
                                        className="bg-background rounded-xl border border-border p-4"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-3">
                                                {getStatusIcon(challan.status)}
                                                <div>
                                                    <p className="font-semibold text-text-primary">
                                                        {challan.challanNo}
                                                    </p>
                                                    <p className="text-sm text-text-muted">
                                                        {challan.month}
                                                    </p>
                                                </div>
                                            </div>
                                            <span
                                                className={cn(
                                                    "px-2.5 py-1 rounded-full text-xs font-semibold border capitalize",
                                                    getStatusColor(challan.status)
                                                )}
                                            >
                                                {challan.status}
                                            </span>
                                        </div>

                                        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                                            <div className="flex items-center gap-4 text-sm text-text-secondary">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    Due: {new Date(challan.dueDate).toLocaleDateString()}
                                                </span>
                                                {challan.paidDate && (
                                                    <span className="text-green-600">
                                                        Paid: {new Date(challan.paidDate).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="font-bold text-text-primary">
                                                Rs. {challan.netAmount.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-surface rounded-xl">
                                <Receipt className="w-12 h-12 text-text-muted mx-auto mb-3" />
                                <p className="text-text-secondary">
                                    No fee records found for this student
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Empty State */}
            {!selectedStudent && search === "" && (
                <div className="text-center py-12 bg-surface rounded-2xl">
                    <Search className="w-12 h-12 text-text-muted mx-auto mb-3" />
                    <p className="text-text-secondary">
                        Search for a student to view their fee collection record
                    </p>
                </div>
            )}
        </motion.div>
    );
}
