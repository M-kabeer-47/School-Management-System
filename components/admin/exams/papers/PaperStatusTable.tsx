"use client";

import { CheckCircle2, AlertCircle, Clock, Search } from "lucide-react";
import { cn } from "@/lib/shadcn/utils";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";

interface PaperRecord {
  id: string;
  grade: string;
  section: string;
  subject: string;
  teacher: string;
  isUploaded: boolean;
  deadline: string;
}

interface PaperStatusTableProps {
  data: PaperRecord[];
  onClearFilters: () => void;
}

export function PaperStatusTable({
  data,
  onClearFilters,
}: PaperStatusTableProps) {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
      <Table className="border-none rounded-none shadow-none">
        <TableHeader>
          <TableHeadRow>
            <TableHead className="w-[100px]">Class</TableHead>
            <TableHead className="w-[100px]">Section</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableHeadRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((paper) => {
              const isOverdue =
                !paper.isUploaded &&
                (paper.deadline?.includes("ago") ||
                  paper.deadline?.includes("Yesterday"));
              const isPending = !paper.isUploaded && !isOverdue;

              return (
                <TableRow
                  key={paper.id}
                  className={cn(
                    "group transition-colors",
                    isOverdue
                      ? "bg-red-50/40 hover:bg-red-50"
                      : isPending
                        ? "hover:bg-orange-50/20"
                        : "hover:bg-slate-50",
                  )}
                >
                  <TableCell>
                    <span className="font-bold text-text-primary text-sm">
                      {paper.grade}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-text-muted">
                      {paper.section}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-text-primary">
                      {paper.subject}
                    </span>
                  </TableCell>
                  <TableCell className="text-text-secondary text-sm">
                    {paper.teacher}
                  </TableCell>
                  <TableCell>
                    {paper.isUploaded ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 uppercase tracking-tight">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                      </div>
                    ) : isOverdue ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200 uppercase tracking-tight">
                        <AlertCircle className="w-3.5 h-3.5" /> Overdue
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200 uppercase tracking-tight">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {paper.isUploaded ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-accent h-8 font-bold text-xs"
                      >
                        View
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className={cn(
                          "h-8 text-xs font-bold transition-all",
                          isOverdue
                            ? "border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300"
                            : "border-orange-200 text-orange-700 hover:bg-orange-100 hover:border-orange-300",
                        )}
                      >
                        Notify
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-64 text-center">
                <div className="flex flex-col items-center justify-center text-text-muted">
                  <Search className="w-10 h-10 mb-3 opacity-20" />
                  <p className="font-medium text-base">
                    No papers match your filters
                  </p>
                  <Button
                    variant="link"
                    className="mt-2 text-accent"
                    onClick={onClearFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
