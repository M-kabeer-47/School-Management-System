"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, User } from "lucide-react";

import { Pagination } from "@/components/ui/Pagination";
import { StatCard } from "@/components/ui/StatCard";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import {
  StudentStatusBadge,
  ResultStatusBadge,
  getResultStatus,
  StudentStatus,
} from "@/utils/status-styles";
import {
  CheckCircleFilledIcon,
  ClockFilledIcon,
  AbsentFilledIcon,
} from "@/components/ui/icons/FilledIcons";

import { RESULT_CHECKING_PROGRESS } from "@/lib/admin/mock-data/exams";

const ITEMS_PER_PAGE = 15;

export default function StudentDetailsPage() {
  const params = useParams();
  const examId = params.id as string;
  const assignmentId = params.assignmentId as string;

  const [currentPage, setCurrentPage] = useState(1);

  // Find the assignment
  const assignment = useMemo(() => {
    for (const teacher of RESULT_CHECKING_PROGRESS) {
      const found = teacher.assignments.find((a) => a.id === assignmentId);
      if (found) {
        return {
          ...found,
          teacherName: teacher.teacherName,
          teacherId: teacher.teacherId,
          deadline: teacher.deadline,
          isLocked: teacher.isLocked,
        };
      }
    }
    return null;
  }, [assignmentId]);

  // Paginate students
  const paginatedStudents = useMemo(() => {
    if (!assignment) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return assignment.students.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [assignment, currentPage]);

  const totalPages = assignment
    ? Math.ceil(assignment.students.length / ITEMS_PER_PAGE)
    : 0;

  // Summary stats
  const stats = useMemo(() => {
    if (!assignment) return { checked: 0, unchecked: 0, absent: 0 };
    return {
      checked: assignment.students.filter((s) => s.status === "checked").length,
      unchecked: assignment.students.filter((s) => s.status === "unchecked").length,
      absent: assignment.students.filter((s) => s.status === "absent").length,
    };
  }, [assignment]);

  if (!assignment) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-text-primary mb-2">
            Assignment not found
          </h2>
          <p className="text-text-secondary mb-4">
            The requested assignment could not be found.
          </p>
          <Link
            href={`/admin/exams/${examId}/results`}
            className="text-accent hover:underline"
          >
            Back to Results
          </Link>
        </div>
      </div>
    );
  }

  const eligibleStudents = assignment.totalStudents - assignment.absentCount;
  const status = getResultStatus(assignment.completionPercent);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pb-10"
    >
      {/* HEADER */}
      <div className="space-y-4">
        <Link
          href={`/admin/exams/${examId}/results`}
          className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1 text-sm font-medium w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Results
        </Link>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary font-heading tracking-tight">
              {assignment.className} - Section {assignment.section}
            </h1>
            <p className="text-xl text-text-secondary mt-1">
              {assignment.subject}
            </p>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-accent" />
                </div>
                <span className="text-text-secondary">
                  Teacher:{" "}
                  <span className="font-semibold text-text-primary">
                    {assignment.teacherName}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <ResultStatusBadge status={status} size="md" />
            <p className="text-sm text-text-secondary">
              {assignment.checkedCount} / {eligibleStudents} checked ({assignment.completionPercent.toFixed(0)}%)
            </p>
          </div>
        </div>
      </div>

      {/* SUMMARY KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          label="Checked"
          value={stats.checked}
          icon={CheckCircleFilledIcon}
          color="text-success"
          bg="bg-success/10"
          delay={0}
        />
        <StatCard
          label="Pending"
          value={stats.unchecked}
          icon={ClockFilledIcon}
          color="text-pending"
          bg="bg-pending/10"
          delay={0.1}
        />
        <StatCard
          label="Absent"
          value={stats.absent}
          icon={AbsentFilledIcon}
          color="text-neutral"
          bg="bg-neutral/10"
          delay={0.2}
        />
      </div>

      {/* STUDENTS TABLE */}
      <Table>
        <TableHeader>
          <TableHeadRow>
            <TableHead>Student Name</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Marks</TableHead>
          </TableHeadRow>
        </TableHeader>
        <TableBody>
          {paginatedStudents.map((student) => (
            <TableRow key={student.studentId}>
              <TableCell>
                <span className="font-medium">{student.studentName}</span>
              </TableCell>
              <TableCell className="text-center">
                <StudentStatusBadge status={student.status as StudentStatus} />
              </TableCell>
              <TableCell className="text-center">
                {student.status === "checked" ? (
                  <span className="font-semibold">
                    {student.marksObtained}
                    <span className="text-text-muted font-normal">
                      {" "}/ {student.totalMarks}
                    </span>
                  </span>
                ) : student.status === "absent" ? (
                  <span className="text-text-muted">—</span>
                ) : (
                  <span className="text-text-muted">Pending</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={assignment.students.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </motion.div>
  );
}
