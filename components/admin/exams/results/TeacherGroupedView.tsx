"use client";

import { useMemo, useState } from "react";
import { User, Bell, Eye } from "lucide-react";
import { clsx } from "clsx";

import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import {
  ResultStatusBadge,
  getResultStatus,
  getProgressBarColor,
} from "@/utils/status-styles";
import { ResultAssignment } from "./ResultsTable";

interface TeacherGroup {
  teacherId: string;
  teacherName: string;
  assignments: ResultAssignment[];
  totalSubjects: number;
  completedSubjects: number;
  overallProgress: number;
}

interface TeacherGroupedViewProps {
  assignments: ResultAssignment[];
  onViewDetails: (assignmentId: string) => void;
  onSendReminder: (teacherName: string, subject: string) => void;
  emptyMessage?: string;
}

const ITEMS_PER_PAGE = 5;

export function TeacherGroupedView({
  assignments,
  onViewDetails,
  onSendReminder,
  emptyMessage = "No teachers found matching your filters.",
}: TeacherGroupedViewProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Group assignments by teacher
  const groupedByTeacher = useMemo(() => {
    const groups = new Map<string, TeacherGroup>();

    assignments.forEach((assignment) => {
      const existing = groups.get(assignment.teacherId);
      if (existing) {
        existing.assignments.push(assignment);
        existing.totalSubjects++;
        if (assignment.completionPercent === 100) {
          existing.completedSubjects++;
        }
      } else {
        groups.set(assignment.teacherId, {
          teacherId: assignment.teacherId,
          teacherName: assignment.teacherName,
          assignments: [assignment],
          totalSubjects: 1,
          completedSubjects: assignment.completionPercent === 100 ? 1 : 0,
          overallProgress: 0,
        });
      }
    });

    // Calculate overall progress for each teacher
    groups.forEach((group) => {
      const totalPercent = group.assignments.reduce(
        (sum, a) => sum + a.completionPercent,
        0
      );
      group.overallProgress = Math.round(totalPercent / group.totalSubjects);
    });

    return Array.from(groups.values()).sort(
      (a, b) => a.overallProgress - b.overallProgress
    );
  }, [assignments]);

  // Paginate teacher groups
  const paginatedTeachers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return groupedByTeacher.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [groupedByTeacher, currentPage]);

  const totalPages = Math.ceil(groupedByTeacher.length / ITEMS_PER_PAGE);

  if (groupedByTeacher.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-xl p-12 text-center">
        <div className="text-text-muted">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {paginatedTeachers.map((teacher) => {
          const status = getResultStatus(teacher.overallProgress);

          return (
            <div
              key={teacher.teacherId}
              className="bg-surface border border-border rounded-xl overflow-hidden"
            >
              {/* Teacher Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-surface-active/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {teacher.teacherName}
                    </h3>
                    <p className="text-sm text-text-muted">
                      {teacher.completedSubjects} of {teacher.totalSubjects}{" "}
                      subjects complete
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-surface rounded-full h-2 overflow-hidden">
                      <div
                        className={clsx(
                          "h-full rounded-full transition-all",
                          getProgressBarColor(teacher.overallProgress)
                        )}
                        style={{ width: `${teacher.overallProgress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-text-secondary w-12">
                      {teacher.overallProgress}%
                    </span>
                  </div>
                  <ResultStatusBadge status={status} size="sm" />
                </div>
              </div>

              {/* Teacher's Assignments Table */}
              <Table>
                <TableHeader>
                  <TableHeadRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-center">Progress</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableHeadRow>
                </TableHeader>
                <TableBody>
                  {teacher.assignments.map((assignment) => {
                    const assignmentStatus = getResultStatus(
                      assignment.completionPercent
                    );
                    const eligible =
                      assignment.totalStudents - assignment.absentCount;

                    return (
                      <TableRow
                        key={assignment.id}
                        className="cursor-pointer hover:bg-surface-hover"
                        onClick={() => onViewDetails(assignment.id)}
                      >
                        <TableCell>
                          <div className="font-medium text-text-primary">
                            {assignment.className}
                          </div>
                          <div className="text-xs text-text-muted">
                            Section {assignment.section}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{assignment.subject}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-3">
                            <div className="w-24 bg-surface-active rounded-full h-2 overflow-hidden">
                              <div
                                className={clsx(
                                  "h-full rounded-full transition-all",
                                  getProgressBarColor(assignment.completionPercent)
                                )}
                                style={{
                                  width: `${assignment.completionPercent}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {assignment.checkedCount}/{eligible}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <ResultStatusBadge status={assignmentStatus} size="sm" />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {assignment.completionPercent < 100 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSendReminder(
                                    assignment.teacherName,
                                    assignment.subject
                                  );
                                }}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-pending bg-pending/10 hover:bg-pending/20 transition-colors"
                                title="Send reminder to teacher"
                              >
                                <Bell className="w-3.5 h-3.5" />
                                Remind
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewDetails(assignment.id);
                              }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-accent bg-accent/10 hover:bg-accent/20 transition-colors"
                              title="View student results"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              View
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={groupedByTeacher.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
