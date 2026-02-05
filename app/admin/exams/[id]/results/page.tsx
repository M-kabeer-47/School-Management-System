"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Users, LayoutGrid } from "lucide-react";

import { StatCard } from "@/components/ui/StatCard";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/Tabs";
import { Pagination } from "@/components/ui/Pagination";
import {
  ResultsTable,
  ResultAssignment,
  TeacherGroupedView,
  ResultsFilters,
} from "@/components/admin/exams/results";
import { ResultStatus, getResultStatus } from "@/utils/status-styles";
import {
  BookFilledIcon,
  CheckCircleFilledIcon,
  ClockFilledIcon,
  AlertFilledIcon,
} from "@/components/ui/icons/FilledIcons";

import {
  EXAM_SERIES,
  RESULT_CHECKING_PROGRESS,
} from "@/lib/admin/mock-data/exams";

// ============================
// UTILITIES
// ============================
function getDaysRemaining(deadline: string): number {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function getDeadlineUrgency(days: number): {
  label: string;
  color: string;
  bg: string;
} {
  if (days < 0) {
    return { label: "Overdue", color: "text-error", bg: "bg-error/10" };
  } else if (days <= 2) {
    return { label: `${days}d left`, color: "text-error", bg: "bg-error/10" };
  } else if (days <= 5) {
    return {
      label: `${days}d left`,
      color: "text-pending",
      bg: "bg-pending/10",
    };
  } else {
    return { label: `${days}d left`, color: "text-success", bg: "bg-success/10" };
  }
}

// ============================
// MAIN COMPONENT
// ============================
export default function ResultManagementPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;
  const series = EXAM_SERIES.find((s) => s.id === examId) || EXAM_SERIES[0];

  // ============================
  // STATE
  // ============================
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | ResultStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string | null>("section");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // ============================
  // DATA PROCESSING
  // ============================
  const allAssignments: ResultAssignment[] = useMemo(() => {
    return RESULT_CHECKING_PROGRESS.flatMap((teacher) =>
      teacher.assignments.map((assignment) => ({
        ...assignment,
        teacherId: teacher.teacherId,
        teacherName: teacher.teacherName,
        deadline: teacher.deadline,
        isLocked: teacher.isLocked,
      }))
    );
  }, []);

  const uniqueClasses = useMemo(() => {
    return Array.from(new Set(allAssignments.map((a) => a.className))).sort(
      (a, b) => {
        const numA = parseInt(a.replace(/\D/g, ""));
        const numB = parseInt(b.replace(/\D/g, ""));
        return numA - numB;
      }
    );
  }, [allAssignments]);

  // ============================
  // FILTERING & SORTING
  // ============================
  const filteredAssignments = useMemo(() => {
    let filtered = allAssignments;

    if (selectedClass !== "all") {
      filtered = filtered.filter((a) => a.className === selectedClass);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((a) => {
        const status = getResultStatus(a.completionPercent);
        return status === selectedStatus;
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.subject.toLowerCase().includes(query) ||
          a.teacherName.toLowerCase().includes(query) ||
          a.className.toLowerCase().includes(query) ||
          a.section.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allAssignments, selectedClass, selectedStatus, searchQuery]);

  const sortedAssignments = useMemo(() => {
    return [...filteredAssignments].sort((a, b) => {
      if (a.completionPercent < 100 && b.completionPercent === 100) return -1;
      if (a.completionPercent === 100 && b.completionPercent < 100) return 1;
      return a.completionPercent - b.completionPercent;
    });
  }, [filteredAssignments]);

  // ============================
  // PAGINATION
  // ============================
  const paginatedAssignments = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedAssignments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedAssignments, currentPage]);

  const totalPages = Math.ceil(sortedAssignments.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedClass, selectedStatus, searchQuery]);

  // ============================
  // STATS
  // ============================
  const stats = useMemo(() => {
    const totalSubjects = allAssignments.length;
    const completeSubjects = allAssignments.filter(
      (a) => a.completionPercent === 100
    ).length;
    const inProgressSubjects = allAssignments.filter(
      (a) => a.completionPercent > 0 && a.completionPercent < 100
    ).length;

    const deadline = RESULT_CHECKING_PROGRESS[0]?.deadline || "";
    const daysRemaining = getDaysRemaining(deadline);
    const urgency = getDeadlineUrgency(daysRemaining);

    return {
      totalSubjects,
      completeSubjects,
      inProgressSubjects,
      deadline,
      urgency,
    };
  }, [allAssignments]);

  // ============================
  // HANDLERS
  // ============================
  const handleViewDetails = (assignmentId: string) => {
    router.push(`/admin/exams/${examId}/results/${assignmentId}`);
  };

  const handleSendReminder = (teacherName: string, subject: string) => {
    alert(`Reminder sent to ${teacherName} for ${subject}`);
  };

  const handleClearFilters = () => {
    setSelectedClass("all");
    setSelectedStatus("all");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedClass !== "all" || selectedStatus !== "all" || searchQuery !== "";

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
            Result Management
          </h1>
          <p className="text-text-secondary mt-1 text-lg">
            Track paper checking progress for{" "}
            <span className="font-semibold text-text-primary">
              {series.title}
            </span>
          </p>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Subjects"
          value={stats.totalSubjects}
          icon={BookFilledIcon}
          color="text-info"
          bg="bg-info/10"
          delay={0}
        />
        <StatCard
          label="Fully Checked"
          value={stats.completeSubjects}
          icon={CheckCircleFilledIcon}
          color="text-success"
          bg="bg-success/10"
          delay={0.1}
        />
        <StatCard
          label="In Progress"
          value={stats.inProgressSubjects}
          icon={ClockFilledIcon}
          color="text-pending"
          bg="bg-pending/10"
          delay={0.2}
        />
        <StatCard
          label={`Deadline ${stats.urgency.label}`}
          value={stats.deadline}
          icon={AlertFilledIcon}
          color={stats.urgency.color}
          bg={stats.urgency.bg}
          delay={0.3}
        />
      </div>

      {/* FILTERS */}
      <ResultsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedClass={selectedClass}
        onClassChange={setSelectedClass}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        uniqueClasses={uniqueClasses}
      />

      {/* RESULTS COUNT */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Showing{" "}
          <span className="font-semibold text-text-primary">
            {sortedAssignments.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-text-primary">
            {allAssignments.length}
          </span>{" "}
          subjects
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
          <ResultsTable
            assignments={paginatedAssignments}
            onViewDetails={handleViewDetails}
            onSendReminder={handleSendReminder}
            emptyMessage={
              selectedStatus === "complete"
                ? "No complete subjects found."
                : "No subjects found matching your filters."
            }
          />

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={sortedAssignments.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </TabsPanel>

        {/* TEACHER VIEW */}
        <TabsPanel value="teacher" className="mt-4">
          <TeacherGroupedView
            assignments={sortedAssignments}
            onViewDetails={handleViewDetails}
            onSendReminder={handleSendReminder}
            emptyMessage="No teachers found matching your filters."
          />
        </TabsPanel>
      </Tabs>
    </motion.div>
  );
}
