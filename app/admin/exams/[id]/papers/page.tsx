"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Users, LayoutGrid } from "lucide-react";

import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/Tabs";
import { Pagination } from "@/components/ui/Pagination";
import {
  PapersTable,
  PaperRecord,
  TeacherGroupedPapersView,
  PapersFilters,
  PaperKPIs,
} from "@/components/admin/exams/papers";

import { EXAM_SERIES, PAPER_STATUS_DATA } from "@/lib/admin/mock-data/exams";

// ============================
// UTILITIES
// ============================
function isOverdue(paper: PaperRecord): boolean {
  return (
    !paper.isUploaded &&
    (paper.deadline?.includes("ago") || paper.deadline?.includes("Yesterday"))
  );
}

// ============================
// MAIN COMPONENT
// ============================
export default function PaperStatusPage() {
  const params = useParams();
  const series = EXAM_SERIES.find((s) => s.id === params.id) || EXAM_SERIES[0];

  // ============================
  // STATE
  // ============================
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string | null>("section");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // ============================
  // DATA PROCESSING
  // ============================
  const uniqueGrades = useMemo(() => {
    return Array.from(new Set(PAPER_STATUS_DATA.map((p) => p.grade))).sort(
      (a, b) => {
        const numA = parseInt(a.replace(/\D/g, ""));
        const numB = parseInt(b.replace(/\D/g, ""));
        return numA - numB;
      }
    );
  }, []);

  const uniqueSections = useMemo(() => {
    if (selectedGrade === "all") {
      return Array.from(
        new Set(PAPER_STATUS_DATA.map((p) => p.section))
      ).sort();
    }
    return Array.from(
      new Set(
        PAPER_STATUS_DATA.filter((p) => p.grade === selectedGrade).map(
          (p) => p.section
        )
      )
    ).sort();
  }, [selectedGrade]);

  // ============================
  // FILTERING & SORTING
  // ============================
  const filteredData = useMemo(() => {
    let data = [...PAPER_STATUS_DATA];

    if (selectedGrade !== "all") {
      data = data.filter((p) => p.grade === selectedGrade);
    }

    if (selectedSection !== "all") {
      data = data.filter((p) => p.section === selectedSection);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (p) =>
          p.subject.toLowerCase().includes(q) ||
          p.teacher.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      if (statusFilter === "uploaded") {
        data = data.filter((p) => p.isUploaded);
      } else if (statusFilter === "pending") {
        data = data.filter((p) => !p.isUploaded && !isOverdue(p));
      } else if (statusFilter === "overdue") {
        data = data.filter((p) => isOverdue(p));
      }
    }

    // Sorting: Overdue > Pending > Uploaded
    return data.sort((a, b) => {
      const aOverdue = isOverdue(a);
      const bOverdue = isOverdue(b);
      const aPending = !a.isUploaded;
      const bPending = !b.isUploaded;

      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;
      if (aPending && !bPending) return -1;
      if (!aPending && bPending) return 1;
      return 0;
    });
  }, [selectedGrade, selectedSection, statusFilter, searchQuery]);

  // ============================
  // PAGINATION
  // ============================
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGrade, selectedSection, statusFilter, searchQuery]);

  // ============================
  // KPIs
  // ============================
  const kpis = useMemo(() => {
    let baseData = PAPER_STATUS_DATA;
    if (selectedGrade !== "all") {
      baseData = baseData.filter((p) => p.grade === selectedGrade);
    }
    if (selectedSection !== "all") {
      baseData = baseData.filter((p) => p.section === selectedSection);
    }

    const total = baseData.length;
    const uploaded = baseData.filter((p) => p.isUploaded).length;
    const pending = total - uploaded;
    const overdue = baseData.filter((p) => isOverdue(p)).length;

    return { total, uploaded, pending, overdue };
  }, [selectedGrade, selectedSection]);

  // ============================
  // HANDLERS
  // ============================
  const handleNotify = (teacher: string, subject: string) => {
    alert(`Reminder sent to ${teacher} for ${subject}`);
  };

  const handleView = (paperId: string) => {
    // In real app, navigate to paper details
    alert(`Viewing paper: ${paperId}`);
  };

  const handleClearFilters = () => {
    setSelectedGrade("all");
    setSelectedSection("all");
    setStatusFilter("all");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedGrade !== "all" ||
    selectedSection !== "all" ||
    statusFilter !== "all" ||
    searchQuery !== "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-10"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin/exams"
              className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-text-primary font-heading tracking-tight">
            Paper Status Tracker
          </h1>
          <p className="text-text-secondary mt-1 text-lg">
            Tracking submissions for{" "}
            <span className="font-semibold text-text-primary">
              {series.title}
            </span>
          </p>
        </div>
      </div>

      {/* KPI CARDS */}
      <PaperKPIs {...kpis} />

      {/* FILTERS */}
      <PapersFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGrade={selectedGrade}
        onGradeChange={(v) => {
          setSelectedGrade(v);
          setSelectedSection("all"); // Reset section when grade changes
        }}
        selectedSection={selectedSection}
        onSectionChange={setSelectedSection}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        uniqueGrades={uniqueGrades}
        uniqueSections={uniqueSections}
      />

      {/* RESULTS COUNT */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Showing{" "}
          <span className="font-semibold text-text-primary">
            {filteredData.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-text-primary">
            {PAPER_STATUS_DATA.length}
          </span>{" "}
          papers
        </p>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-accent hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* TABS FOR VIEW MODE */}
      <Tabs value={activeTab} onValueChange={setActiveTab} variant="default">
        <TabsList>
          <TabsTab value="section">
            <LayoutGrid className="w-4 h-4" />
            By Section
          </TabsTab>
          <TabsTab value="teacher">
            <Users className="w-4 h-4" />
            By Teacher
          </TabsTab>
        </TabsList>

        {/* SECTION VIEW */}
        <TabsPanel value="section" className="mt-4">
          <PapersTable
            papers={paginatedData}
            onNotify={handleNotify}
            onView={handleView}
            emptyMessage={
              statusFilter === "uploaded"
                ? "No uploaded papers found."
                : "No papers found matching your filters."
            }
          />

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredData.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </TabsPanel>

        {/* TEACHER VIEW */}
        <TabsPanel value="teacher" className="mt-4">
          <TeacherGroupedPapersView
            papers={filteredData}
            onNotify={handleNotify}
            onView={handleView}
            emptyMessage="No teachers found matching your filters."
          />
        </TabsPanel>
      </Tabs>
    </motion.div>
  );
}
