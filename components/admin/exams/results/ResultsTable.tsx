"use client";

import { ChevronRight, Bell, Eye } from "lucide-react";
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
import {
  ResultStatusBadge,
  getResultStatus,
  getProgressBarColor,
} from "@/utils/status-styles";

export interface ResultAssignment {
  id: string;
  className: string;
  section: string;
  subject: string;
  teacherName: string;
  teacherId: string;
  totalStudents: number;
  checkedCount: number;
  absentCount: number;
  completionPercent: number;
  deadline: string;
  isLocked: boolean;
}

interface ResultsTableProps {
  assignments: ResultAssignment[];
  onViewDetails: (assignmentId: string) => void;
  onSendReminder: (teacherName: string, subject: string) => void;
  emptyMessage?: string;
  showClassColumn?: boolean;
}

export function ResultsTable({
  assignments,
  onViewDetails,
  onSendReminder,
  emptyMessage = "No subjects found matching your filters.",
  showClassColumn = true,
}: ResultsTableProps) {
  const columnCount = showClassColumn ? 6 : 5;

  if (assignments.length === 0) {
    return (
      <Table>
        <TableHeader>
          <TableHeadRow>
            {showClassColumn && <TableHead>Class</TableHead>}
            <TableHead>Subject</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead className="text-center">Progress</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableHeadRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={columnCount} className="text-center py-12">
              <div className="text-text-muted">{emptyMessage}</div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableHeadRow>
          {showClassColumn && <TableHead>Class</TableHead>}
          <TableHead>Subject</TableHead>
          <TableHead>Teacher</TableHead>
          <TableHead className="text-center">Progress</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableHeadRow>
      </TableHeader>
      <TableBody>
        {assignments.map((assignment) => {
          const status = getResultStatus(assignment.completionPercent);
          const eligible = assignment.totalStudents - assignment.absentCount;

          return (
            <TableRow
              key={assignment.id}
              className="cursor-pointer hover:bg-surface-hover"
              onClick={() => onViewDetails(assignment.id)}
            >
              {showClassColumn && (
                <TableCell>
                  <div className="font-medium text-text-primary">
                    {assignment.className}
                  </div>
                  <div className="text-xs text-text-muted">
                    Section {assignment.section}
                  </div>
                </TableCell>
              )}
              <TableCell>
                <span className="font-medium">{assignment.subject}</span>
              </TableCell>
              <TableCell>
                <span className="text-text-secondary">
                  {assignment.teacherName}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
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
                  <span className="text-sm font-medium w-16 text-right">
                    {assignment.checkedCount}/{eligible}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <ResultStatusBadge status={status} size="sm" />
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
  );
}
