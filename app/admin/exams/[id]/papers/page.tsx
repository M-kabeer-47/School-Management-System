"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Bell, Download } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { PaperKPIs } from "@/components/admin/exams/papers/PaperKPIs";
import { PaperFilters } from "@/components/admin/exams/papers/PaperFilters";
import { PaperStatusTable } from "@/components/admin/exams/papers/PaperStatusTable";

import { EXAM_SERIES, PAPER_STATUS_DATA } from "@/lib/admin/mock-data/exams";

export default function PaperStatusPage() {
  const params = useParams();
  const series = EXAM_SERIES.find((s) => s.id === params.id) || EXAM_SERIES[0];

  // ============================
  // STATE
  // ============================
  const uniqueGrades = Array.from(
    new Set(PAPER_STATUS_DATA.map((p) => p.grade)),
  ).sort();

  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Get sections based on selected grade
  const sectionsForGrade = useMemo(() => {
    if (selectedGrade === "all") {
      return Array.from(
        new Set(PAPER_STATUS_DATA.map((p) => p.section)),
      ).sort();
    }
    return Array.from(
      new Set(
        PAPER_STATUS_DATA.filter((p) => p.grade === selectedGrade).map(
          (p) => p.section,
        ),
      ),
    ).sort();
  }, [selectedGrade]);

  // ============================
  // FILTER & SORT LOGIC
  // ============================
  const filteredData = useMemo(() => {
    let data = [...PAPER_STATUS_DATA];

    // 1. Grade Filter
    if (selectedGrade !== "all") {
      data = data.filter((p) => p.grade === selectedGrade);
    }

    // 2. Section Filter
    if (selectedSection !== "all") {
      data = data.filter((p) => p.section === selectedSection);
    }

    // 3. Text Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (p) =>
          p.subject.toLowerCase().includes(q) ||
          p.teacher.toLowerCase().includes(q),
      );
    }

    // 4. Status Filter
    const isOverdue = (p: (typeof PAPER_STATUS_DATA)[0]) =>
      !p.isUploaded &&
      (p.deadline?.includes("ago") || p.deadline?.includes("Yesterday"));

    if (statusFilter !== "all") {
      if (statusFilter === "uploaded") {
        data = data.filter((p) => p.isUploaded);
      } else if (statusFilter === "pending") {
        data = data.filter((p) => !p.isUploaded && !isOverdue(p));
      } else if (statusFilter === "overdue") {
        data = data.filter((p) => isOverdue(p));
      }
    }

    // 5. Sorting: Overdue > Pending > Uploaded
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

  // Handle pagination logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Reset to first page when any filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGrade, selectedSection, statusFilter, searchQuery]);

  // Derived KPIs
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
    const overdue = baseData.filter(
      (p) =>
        !p.isUploaded &&
        (p.deadline?.includes("ago") || p.deadline?.includes("Yesterday")),
    ).length;

    return { total, uploaded, pending, overdue };
  }, [selectedGrade, selectedSection]);

  const clearFilters = () => {
    setSelectedGrade("all");
    setSelectedSection("all");
    setStatusFilter("all");
    setSearchQuery("");
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin/exams"
              className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-text-primary font-heading tracking-tight">
            Paper Status Tracker
          </h1>
          <p className="text-text-secondary">
            Tracking submissions for{" "}
            <span className="font-semibold text-text-primary">
              {series.title}
            </span>
          </p>
        </div>
      </div>

      {/* KPI CARDS - Modularized */}
      <PaperKPIs {...kpis} />

      {/* FILTER & SEARCH COMMAND CENTER - Modularized & Enhanced */}
      <PaperFilters
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
        uniqueSections={sectionsForGrade}
        stats={kpis}
      />

      {/* DATA TABLE - Modularized */}
      <div className="space-y-6">
        <PaperStatusTable data={paginatedData} onClearFilters={clearFilters} />

        {/* PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
