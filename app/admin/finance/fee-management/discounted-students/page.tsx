"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Percent,
  Download,
  Filter,
  Plus,
  CheckCircle,
  User,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { Pagination } from "@/components/admin/students/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/Command";
import {
  DiscountedStudentsTable,
  DiscountDetailsDrawer,
} from "@/components/admin/finance";
import { ClassSelect } from "@/components/admin/students/ClassSelect";
import MonthFilter from "@/components/ui/MonthFilter";
import Modal from "@/components/ui/Modal";
import {
  discountedStudents,
  feeDiscounts,
} from "@/lib/admin/mock-data/finance";
import { allStudents, getUniqueClasses } from "@/lib/admin/mock-data/students";
import { DiscountedStudent } from "@/lib/admin/types/finance";

const ITEMS_PER_PAGE = 10;

export default function DiscountedStudentsPage() {
  const [search, setSearch] = useState("");
  const [discountFilter, setDiscountFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer state
  const [selectedStudent, setSelectedStudent] =
    useState<DiscountedStudent | null>(null);

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

  // Student selection palette state
  const [isStudentPaletteOpen, setIsStudentPaletteOpen] = useState(false);

  const uniqueDiscountTypes = [
    ...new Set(discountedStudents.map((d) => d.discountType)),
  ];
  const uniqueClasses = getUniqueClasses();

  const filteredStudents = useMemo(() => {
    return discountedStudents.filter((student) => {
      const matchesSearch =
        search === "" ||
        student.studentName.toLowerCase().includes(search.toLowerCase()) ||
        student.admissionNo.toLowerCase().includes(search.toLowerCase());
      const matchesDiscount =
        discountFilter === "all" || student.discountType === discountFilter;

      const matchesMonth =
        monthFilter === "all" ||
        (() => {
          if (!student.validFrom) return false;
          const recordDate = new Date(student.validFrom);
          const [year, month] = monthFilter.split("-");
          return (
            recordDate.getFullYear() === parseInt(year) &&
            recordDate.getMonth() + 1 === parseInt(month)
          );
        })();

      return matchesSearch && matchesDiscount && matchesMonth;
    });
  }, [search, discountFilter, monthFilter]);

  // Pagination
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredStudents.slice(startIndex, endIndex);
  }, [filteredStudents, currentPage]);

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);

  const totalMonthlyDiscount = filteredStudents.reduce(
    (sum, s) => sum + s.monthlyDiscount,
    0,
  );

  const clearFilters = () => {
    setSearch("");
    setDiscountFilter("all");
    setMonthFilter("all");
    setCurrentPage(1);
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

  const handleStudentSelect = (studentId: string) => {
    setNewDiscount((prev) => ({ ...prev, studentId }));
    setIsStudentPaletteOpen(false);
  };

  // Students without discount for selection
  const availableStudents = allStudents.filter(
    (s) => !discountedStudents.some((ds) => ds.studentId === s.id),
  );

  // Get selected student details for display
  const selectedStudentForDiscount = allStudents.find(
    (s) => s.id === newDiscount.studentId,
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
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-5">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              Total Students
            </p>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
              {filteredStudents.length}
            </p>
          </div>
          <div className="h-12 w-px bg-blue-200 dark:bg-blue-800" />
          <div>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              Monthly Discount Value
            </p>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
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
            {(discountFilter !== "all" || monthFilter !== "all") && (
              <span className="ml-2 px-2 py-0.5 bg-accent text-white text-xs rounded-full">
                {
                  [discountFilter !== "all", monthFilter !== "all"].filter(
                    Boolean,
                  ).length
                }
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
                  <Select
                    value={discountFilter}
                    onValueChange={setDiscountFilter}
                  >
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
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Month
                  </label>
                  <MonthFilter value={monthFilter} onChange={setMonthFilter} />
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Students Table with Pagination */}
      <div className="bg-background rounded-2xl border border-border overflow-hidden shadow-sm">
        <DiscountedStudentsTable
          students={paginatedStudents}
          onViewDetails={handleViewDetails}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredStudents.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
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
        title={
          submitSuccess
            ? "Success!"
            : isEditMode
              ? "Edit Discount"
              : "Add Discount"
        }
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
              The discount has been {isEditMode ? "updated" : "added"}{" "}
              successfully.
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
                <button
                  type="button"
                  onClick={() => setIsStudentPaletteOpen(true)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:border-accent/50 hover:bg-surface-hover transition-all text-left"
                >
                  {selectedStudentForDiscount ? (
                    <>
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-text-primary truncate">
                          {selectedStudentForDiscount.studentName}
                        </p>
                        <p className="text-sm text-text-muted truncate">
                          {selectedStudentForDiscount.admissionNo} •{" "}
                          {selectedStudentForDiscount.class}-
                          {selectedStudentForDiscount.section}
                        </p>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-text-muted" />
                      </div>
                      <span className="text-text-muted">
                        Click to search and select a student...
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Discount Type */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Discount Type
              </label>
              <Select
                value={newDiscount.discountType}
                onValueChange={(value) =>
                  setNewDiscount((prev) => ({ ...prev, discountType: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select discount type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {feeDiscounts.map((discount) => (
                    <SelectItem key={discount.id} value={discount.name}>
                      {discount.name} (
                      {discount.type === "percentage"
                        ? `${discount.value}%`
                        : `Rs. ${discount.value}`}
                      )
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
                onChange={(e) =>
                  setNewDiscount((prev) => ({
                    ...prev,
                    discountPercentage: e.target.value,
                  }))
                }
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
                onChange={(e) =>
                  setNewDiscount((prev) => ({
                    ...prev,
                    reason: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="ghost"
                onClick={resetModal}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddDiscount}
                disabled={
                  isSubmitting ||
                  (!isEditMode && !newDiscount.studentId) ||
                  !newDiscount.discountType ||
                  !newDiscount.discountPercentage
                }
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

      {/* Student Selection Command Palette */}
      <CommandDialog
        open={isStudentPaletteOpen}
        onOpenChange={setIsStudentPaletteOpen}
      >
        <CommandInput placeholder="Search by name or admission number..." />
        <CommandList className="custom-scrollbar">
          <CommandEmpty>No students found.</CommandEmpty>
          <CommandGroup heading="Available Students">
            {availableStudents.map((student) => (
              <CommandItem
                key={student.id}
                onSelect={() => handleStudentSelect(student.id)}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-4 py-0.5">
                  <div className="w-9 h-9 rounded-full bg-surface-active flex items-center justify-center text-accent font-bold overflow-hidden border border-border group-data-[selected=true]:border-accent/40 transition-colors shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-text-primary">
                      {student.studentName}
                    </span>
                    <span className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">
                      {student.admissionNo} • {student.class}-{student.section}
                    </span>
                  </div>
                </div>

                {newDiscount.studentId === student.id && (
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent border border-accent/20">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </motion.div>
  );
}
