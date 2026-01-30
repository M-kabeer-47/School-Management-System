"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import { Student, StudentFilters } from "@/lib/admin/types/student";
import {
  allStudents,
  getUniqueClasses,
  getUniqueSections,
} from "@/lib/admin/mock-data/students";
import { StudentFilters as StudentFiltersComponent } from "@/components/admin/students/StudentFilters";
import { StudentTable } from "@/components/admin/students/StudentTable";
import { Pagination } from "@/components/admin/students/Pagination";
import {
  Plus,
  Download,
  Upload,
  Trash2,
  ArrowUpCircle,
  MessageSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PromoteStudentModal } from "@/components/admin/students/PromoteStudentModal";

export default function StudentsPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<StudentFilters>({
    search: "",
    class: "all",
    section: "all",
  });

  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Get unique values for filters
  const uniqueClasses = getUniqueClasses();
  const uniqueSections = getUniqueSections();

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return allStudents.filter((student) => {
      const searchMatch =
        filters.search === "" ||
        student.studentName
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        student.admissionNo
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        student.fatherName
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        student.email?.toLowerCase().includes(filters.search.toLowerCase());

      const classMatch =
        filters.class === "all" || student.class === filters.class;
      const sectionMatch =
        filters.section === "all" || student.section === filters.section;

      return searchMatch && classMatch && sectionMatch;
    });
  }, [filters]);

  // Pagination
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredStudents.slice(startIndex, endIndex);
  }, [filteredStudents, currentPage]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const handleFilterChange = (key: keyof StudentFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      class: "all",
      section: "all",
    });
    setCurrentPage(1);
  };

  const handleStudentAction = (action: string, student: Student) => {
    console.log(`${action} student:`, student.studentName);
    if (action === "view") {
      router.push(`/admin/students/${student.id}`);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedStudentIds.length === paginatedStudents.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(paginatedStudents.map((s) => s.id));
    }
  };

  const handlePromoteStudents = (
    targetClass: string,
    targetSection: string,
  ) => {
    console.log(
      `Promoting ${selectedStudentIds.length} students to Class ${targetClass} Section ${targetSection}`,
    );
    // Here you would call your API to update the students
    setSelectedStudentIds([]); // Clear selection after action
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
            Students
          </h1>
          <p className="text-text-secondary mt-1">
            Manage student records and information
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
          <Button>
            <Plus className="w-4 h-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Filters (containing Search) */}
        <StudentFiltersComponent
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
          uniqueClasses={uniqueClasses}
          uniqueSections={uniqueSections}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        {/* Results Count & Bulk Actions Container */}
        <div className="space-y-4">
          {/* Bulk Action Toolbar */}
          <AnimatePresence mode="wait">
            {selectedStudentIds.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="bg-accent/5 border border-accent/20 rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-accent">
                    {selectedStudentIds.length} students selected
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-error border-error/20 hover:bg-error/10 hover:text-error"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Selected
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => setIsPromoteModalOpen(true)}
                    >
                      <ArrowUpCircle className="w-4 h-4" />
                      Promote Selected
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-sm text-text-secondary px-6">
            Showing {paginatedStudents.length} of {filteredStudents.length}{" "}
            students
          </div>
        </div>
      </div>

      {/* Students Table */}
      <StudentTable
        students={paginatedStudents}
        onStudentAction={handleStudentAction}
        selectedIds={selectedStudentIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
      />

      {/* Promote Modal */}
      <PromoteStudentModal
        isOpen={isPromoteModalOpen}
        onClose={() => setIsPromoteModalOpen(false)}
        selectedCount={selectedStudentIds.length}
        onPromote={handlePromoteStudents}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredStudents.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </motion.div>
  );
}
