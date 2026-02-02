"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Percent, Download, Filter, Plus, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { Input } from "@/components/ui/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import { DiscountedStudentsTable, DiscountDetailsDrawer } from "@/components/admin/finance";
import { ClassSelect } from "@/components/admin/students/ClassSelect";
import Modal from "@/components/ui/Modal";
import { discountedStudents, feeDiscounts } from "@/lib/admin/mock-data/finance";
import { allStudents, getUniqueClasses } from "@/lib/admin/mock-data/students";
import { DiscountedStudent } from "@/lib/admin/types/finance";

export default function DiscountedStudentsPage() {
    const [search, setSearch] = useState("");
    const [discountFilter, setDiscountFilter] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    // Drawer state
    const [selectedStudent, setSelectedStudent] = useState<DiscountedStudent | null>(null);

    // Add Discount Modal state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [newDiscount, setNewDiscount] = useState({
        studentId: "",
        discountType: "",
        discountPercentage: "",
        reason: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const uniqueDiscountTypes = [...new Set(discountedStudents.map((d) => d.discountType))];
    const uniqueClasses = getUniqueClasses();

    const filteredStudents = useMemo(() => {
        return discountedStudents.filter((student) => {
            const matchesSearch =
                search === "" ||
                student.studentName.toLowerCase().includes(search.toLowerCase()) ||
                student.admissionNo.toLowerCase().includes(search.toLowerCase());
            const matchesDiscount =
                discountFilter === "all" || student.discountType === discountFilter;
            return matchesSearch && matchesDiscount;
        });
    }, [search, discountFilter]);

    const totalMonthlyDiscount = filteredStudents.reduce(
        (sum, s) => sum + s.monthlyDiscount,
        0
    );

    const clearFilters = () => {
        setSearch("");
        setDiscountFilter("all");
    };

    const handleViewDetails = (student: DiscountedStudent) => {
        setSelectedStudent(student);
    };

    const handleEdit = (student: DiscountedStudent) => {
        setIsEditMode(true);
        setNewDiscount({
            studentId: student.studentId,
            discountType: student.discountType,
            discountPercentage: student.discountPercentage.toString(),
            reason: student.reason,
        });
        setSelectedStudent(null);
        setIsAddModalOpen(true);
    };

    const handleRemove = (student: DiscountedStudent) => {
        // In real app, would call API to remove discount
        console.log("Removing discount for:", student.studentName);
    };

    const handleAddDiscount = async () => {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitSuccess(true);
    };

    const resetModal = () => {
        setIsAddModalOpen(false);
        setIsEditMode(false);
        setSubmitSuccess(false);
        setNewDiscount({
            studentId: "",
            discountType: "",
            discountPercentage: "",
            reason: "",
        });
    };

    // Students without discount for selection
    const availableStudents = allStudents.filter(
        (s) => !discountedStudents.some((ds) => ds.studentId === s.id)
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Page Header */}
            <PageHeader
                title="Discounted Students"
                subtitle="Students receiving fee discounts or scholarships"
            >
                <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                    Export
                </Button>
                <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Add Discount
                </Button>
            </PageHeader>

            {/* Summary Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <div className="flex flex-wrap items-center gap-6">
                    <div>
                        <p className="text-sm text-blue-600 font-medium">Total Students</p>
                        <p className="text-3xl font-bold text-blue-700">
                            {filteredStudents.length}
                        </p>
                    </div>
                    <div className="h-12 w-px bg-blue-200" />
                    <div>
                        <p className="text-sm text-blue-600 font-medium">Monthly Discount Value</p>
                        <p className="text-3xl font-bold text-blue-700">
                            Rs. {totalMonthlyDiscount.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <SearchBar
                            placeholder="Search by name or admission no..."
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
                        {discountFilter !== "all" && (
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
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">
                                        Discount Type
                                    </label>
                                    <Select value={discountFilter} onValueChange={setDiscountFilter}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="All Discount Types" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="all">All Discount Types</SelectItem>
                                            {uniqueDiscountTypes.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
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

            {/* Results Count */}
            <div className="text-sm text-text-secondary px-6">
                Showing {filteredStudents.length} of {discountedStudents.length} students
            </div>

            {/* Students Table */}
            <DiscountedStudentsTable
                students={filteredStudents}
                onViewDetails={handleViewDetails}
            />

            {/* Empty State */}
            {filteredStudents.length === 0 && (
                <div className="text-center py-12">
                    <Percent className="w-12 h-12 text-text-muted mx-auto mb-3" />
                    <p className="text-text-secondary">No discounted students found</p>
                </div>
            )}

            {/* Discount Details Drawer */}
            <DiscountDetailsDrawer
                student={selectedStudent}
                isOpen={!!selectedStudent}
                onClose={() => setSelectedStudent(null)}
                onEdit={handleEdit}
                onRemove={handleRemove}
            />

            {/* Add/Edit Discount Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={resetModal}
                title={submitSuccess ? "Success!" : isEditMode ? "Edit Discount" : "Add Discount"}
                description={
                    submitSuccess
                        ? "Discount has been saved successfully"
                        : isEditMode
                            ? "Modify the discount details"
                            : "Assign a discount to a student"
                }
                icon={
                    submitSuccess ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                        <Percent className="w-6 h-6 text-accent" />
                    )
                }
                maxWidth="md"
            >
                {submitSuccess ? (
                    <div className="text-center py-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                        >
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </motion.div>
                        <p className="text-text-secondary">
                            The discount has been {isEditMode ? "updated" : "added"} successfully.
                        </p>
                        <Button className="mt-6" onClick={resetModal}>
                            Done
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4 pt-2">
                        {/* Student Selection */}
                        {!isEditMode && (
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">
                                    Select Student
                                </label>
                                <Select
                                    value={newDiscount.studentId}
                                    onValueChange={(value) => setNewDiscount(prev => ({ ...prev, studentId: value }))}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choose a student" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        {availableStudents.slice(0, 20).map((student) => (
                                            <SelectItem key={student.id} value={student.id}>
                                                {student.studentName} ({student.admissionNo}) - {student.class}-{student.section}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {/* Discount Type */}
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                Discount Type
                            </label>
                            <Select
                                value={newDiscount.discountType}
                                onValueChange={(value) => setNewDiscount(prev => ({ ...prev, discountType: value }))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select discount type" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {feeDiscounts.map((discount) => (
                                        <SelectItem key={discount.id} value={discount.name}>
                                            {discount.name} ({discount.type === "percentage" ? `${discount.value}%` : `Rs. ${discount.value}`})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Discount Percentage */}
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                Discount Percentage
                            </label>
                            <Input
                                type="number"
                                placeholder="Enter percentage (0-100)"
                                value={newDiscount.discountPercentage}
                                onChange={(e) => setNewDiscount(prev => ({ ...prev, discountPercentage: e.target.value }))}
                                min={0}
                                max={100}
                            />
                        </div>

                        {/* Reason */}
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                Reason
                            </label>
                            <textarea
                                placeholder="Enter reason for discount..."
                                value={newDiscount.reason}
                                onChange={(e) => setNewDiscount(prev => ({ ...prev, reason: e.target.value }))}
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button variant="ghost" onClick={resetModal} disabled={isSubmitting}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleAddDiscount}
                                disabled={isSubmitting || (!isEditMode && !newDiscount.studentId) || !newDiscount.discountType || !newDiscount.discountPercentage}
                            >
                                {isSubmitting ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                        />
                                        Saving...
                                    </>
                                ) : (
                                    <>{isEditMode ? "Update Discount" : "Add Discount"}</>
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </motion.div>
    );
}
