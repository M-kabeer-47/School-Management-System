"use client";

import { Bell, Eye, CheckCircle2, AlertCircle, Clock } from "lucide-react";
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

export interface PaperRecord {
  id: string;
  grade: string;
  section: string;
  subject: string;
  teacher: string;
  isUploaded: boolean;
  deadline: string;
}

interface PapersTableProps {
  papers: PaperRecord[];
  onNotify: (teacher: string, subject: string) => void;
  onView: (paperId: string) => void;
  emptyMessage?: string;
  showGradeColumn?: boolean;
}

function isOverdue(paper: PaperRecord): boolean {
  return (
    !paper.isUploaded &&
    (paper.deadline?.includes("ago") || paper.deadline?.includes("Yesterday"))
  );
}

function isPending(paper: PaperRecord): boolean {
  return !paper.isUploaded && !isOverdue(paper);
}

export function PapersTable({
  papers,
  onNotify,
  onView,
  emptyMessage = "No papers found matching your filters.",
  showGradeColumn = true,
}: PapersTableProps) {
  const columnCount = showGradeColumn ? 6 : 5;

  if (papers.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <Table className="border-none rounded-none shadow-none">
          <TableHeader>
            <TableHeadRow>
              {showGradeColumn && <TableHead>Class</TableHead>}
              <TableHead>Subject</TableHead>
              <TableHead>Teacher</TableHead>
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
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
      <Table className="border-none rounded-none shadow-none">
        <TableHeader>
          <TableHeadRow>
            {showGradeColumn && <TableHead>Class</TableHead>}
            <TableHead>Subject</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableHeadRow>
        </TableHeader>
        <TableBody>
          {papers.map((paper) => {
            const overdue = isOverdue(paper);
            const pending = isPending(paper);

            return (
              <TableRow
                key={paper.id}
                className={clsx(
                  "group transition-colors cursor-pointer",
                  overdue
                    ? "bg-error-light/10 hover:bg-error-light/20"
                    : pending
                      ? "bg-pending-light/10 hover:bg-pending-light/20"
                      : "hover:bg-surface-hover"
                )}
                onClick={() => onView(paper.id)}
              >
                {showGradeColumn && (
                  <TableCell>
                    <div className="font-medium text-text-primary">
                      {paper.grade}
                    </div>
                    <div className="text-xs text-text-muted">
                      Section {paper.section}
                    </div>
                  </TableCell>
                )}
                <TableCell>
                  <span className="font-medium text-text-primary">
                    {paper.subject}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-text-secondary text-sm">
                    {paper.teacher}
                  </span>
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
}
