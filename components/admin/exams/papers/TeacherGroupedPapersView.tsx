"use client";

import { useMemo, useState } from "react";
import { User, Bell, Eye, CheckCircle2, AlertCircle, Clock } from "lucide-react";
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
import { PaperRecord } from "./PapersTable";

interface TeacherGroup {
  teacherId: string;
  teacherName: string;
  papers: PaperRecord[];
  totalPapers: number;
  uploadedPapers: number;
  overduePapers: number;
}

interface TeacherGroupedPapersViewProps {
  papers: PaperRecord[];
  onNotify: (teacher: string, subject: string) => void;
  onView: (paperId: string) => void;
  emptyMessage?: string;
}

const ITEMS_PER_PAGE = 5;

function isOverdue(paper: PaperRecord): boolean {
  return (
    !paper.isUploaded &&
    (paper.deadline?.includes("ago") || paper.deadline?.includes("Yesterday"))
  );
}

export function TeacherGroupedPapersView({
  papers,
  onNotify,
  onView,
  emptyMessage = "No teachers found matching your filters.",
}: TeacherGroupedPapersViewProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Group papers by teacher
  const groupedByTeacher = useMemo(() => {
    const groups = new Map<string, TeacherGroup>();

    papers.forEach((paper) => {
      const existing = groups.get(paper.teacher);
      if (existing) {
        existing.papers.push(paper);
        existing.totalPapers++;
        if (paper.isUploaded) {
          existing.uploadedPapers++;
        }
        if (isOverdue(paper)) {
          existing.overduePapers++;
        }
      } else {
        groups.set(paper.teacher, {
          teacherId: paper.teacher,
          teacherName: paper.teacher,
          papers: [paper],
          totalPapers: 1,
          uploadedPapers: paper.isUploaded ? 1 : 0,
          overduePapers: isOverdue(paper) ? 1 : 0,
        });
      }
    });

    return Array.from(groups.values()).sort((a, b) => {
      // Sort by overdue count (descending), then by pending count
      if (a.overduePapers !== b.overduePapers) {
        return b.overduePapers - a.overduePapers;
      }
      const aPending = a.totalPapers - a.uploadedPapers;
      const bPending = b.totalPapers - b.uploadedPapers;
      return bPending - aPending;
    });
  }, [papers]);

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
          const pendingCount = teacher.totalPapers - teacher.uploadedPapers;
          const uploadPercentage = Math.round(
            (teacher.uploadedPapers / teacher.totalPapers) * 100
          );

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
                      {teacher.uploadedPapers} of {teacher.totalPapers} papers
                      uploaded
                      {teacher.overduePapers > 0 && (
                        <span className="text-error ml-2">
                          • {teacher.overduePapers} overdue
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-surface rounded-full h-2 overflow-hidden">
                      <div
                        className={clsx(
                          "h-full rounded-full transition-all",
                          teacher.overduePapers > 0
                            ? "bg-error"
                            : uploadPercentage === 100
                              ? "bg-success"
                              : "bg-pending"
                        )}
                        style={{ width: `${uploadPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-text-secondary w-12">
                      {uploadPercentage}%
                    </span>
                  </div>
                  <div
                    className={clsx(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border min-w-[100px] justify-center",
                      teacher.overduePapers > 0
                        ? "bg-error/10 text-error border-error/20"
                        : pendingCount > 0
                          ? "bg-pending/10 text-pending border-pending/20"
                          : "bg-success/10 text-success border-success/20"
                    )}
                  >
                    {teacher.overduePapers > 0
                      ? "Overdue"
                      : pendingCount > 0
                        ? "Pending"
                        : "Complete"}
                  </div>
                </div>
              </div>

              {/* Teacher's Papers Table */}
              <Table>
                <TableHeader>
                  <TableHeadRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableHeadRow>
                </TableHeader>
                <TableBody>
                  {teacher.papers.map((paper) => {
                    const overdue = isOverdue(paper);
                    const pending = !paper.isUploaded && !overdue;

                    return (
                      <TableRow
                        key={paper.id}
                        className={clsx(
                          "cursor-pointer transition-colors",
                          overdue
                            ? "bg-error-light/10 hover:bg-error-light/20"
                            : pending
                              ? "bg-pending-light/10 hover:bg-pending-light/20"
                              : "hover:bg-surface-hover"
                        )}
                        onClick={() => onView(paper.id)}
                      >
                        <TableCell>
                          <div className="font-medium text-text-primary">
                            {paper.grade}
                          </div>
                          <div className="text-xs text-text-muted">
                            Section {paper.section}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{paper.subject}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          {paper.isUploaded ? (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-medium border border-success/20 min-w-[100px] justify-center">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                            </div>
                          ) : overdue ? (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error/10 text-error text-xs font-medium border border-error/20 min-w-[100px] justify-center">
                              <AlertCircle className="w-3.5 h-3.5" /> Overdue
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pending/10 text-pending text-xs font-medium border border-pending/20 min-w-[100px] justify-center">
                              <Clock className="w-3.5 h-3.5" /> Pending
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {!paper.isUploaded && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNotify(paper.teacher, paper.subject);
                                }}
                                className={clsx(
                                  "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                                  overdue
                                    ? "text-error bg-error/10 hover:bg-error/20"
                                    : "text-pending bg-pending/10 hover:bg-pending/20"
                                )}
                                title="Send reminder to teacher"
                              >
                                <Bell className="w-3.5 h-3.5" />
                                Notify
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onView(paper.id);
                              }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-accent bg-accent/10 hover:bg-accent/20 transition-colors"
                              title="View paper details"
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
