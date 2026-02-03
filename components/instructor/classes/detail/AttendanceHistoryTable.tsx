"use client";

import { AttendanceRecord } from "@/lib/instructor/types/class-detail";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/common/utils";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import { useParams } from "next/navigation";
import Link from "next/link";

interface AttendanceHistoryTableProps {
  history: AttendanceRecord[];
}

export const AttendanceHistoryTable = ({
  history,
}: AttendanceHistoryTableProps) => {
  const params = useParams();
  const classId = params.id as string;

  return (
    <div className="bg-surface rounded-2xl border border-border shadow-sm">
      <Table tableClassName="min-w-[800px]">
        <TableHeader>
          <TableHeadRow>
            <TableHead className="w-48">Date</TableHead>
            <TableHead className="w-[400px]">Lecture Topic</TableHead>
            <TableHead className="w-[300px]">Attendance Rate</TableHead>
            <TableHead className="text-right w-32">Action</TableHead>
          </TableHeadRow>
        </TableHeader>
        <TableBody>
          {history.length > 0 ? (
            history.map((record) => {
              const hasAbsentees = record.absent > 0;
              return (
                <TableRow
                  key={record.id}
                  className={cn(
                    "hover:bg-surface-hover/50 h-14 transition-colors",
                  )}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg border flex flex-col items-center justify-center transition-colors bg-surface-active border-border",
                        )}
                      >
                        <span className="text-[10px] font-bold uppercase text-text-muted leading-none">
                          {new Date(record.date).toLocaleDateString("en-US", {
                            month: "short",
                          })}
                        </span>
                        <span className="text-sm font-bold leading-none mt-0.5 text-text-primary">
                          {new Date(record.date).getDate()}
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-body">
                          {new Date(record.date).toLocaleDateString()}
                        </span>
                        <span className="block text-xs font-medium text-accent/80">
                          {new Date(record.date).toLocaleDateString("en-US", {
                            weekday: "long",
                          })}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-text-primary">
                      {record.topic || "No Topic"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const total =
                          record.present + record.absent + record.leave;
                        const percentage =
                          total > 0
                            ? Math.round((record.present / total) * 100)
                            : 0;
                        return (
                          <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                            <span
                              className={cn(
                                "px-2.5 py-0.5 rounded-full text-xs font-bold border",
                                percentage >= 75
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : percentage >= 50
                                    ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                    : "bg-red-100 text-red-700 border-red-200",
                              )}
                            >
                              {percentage}%
                            </span>
                            <span className="text-text-secondary">
                              {record.present}/{total} Present
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/instructor/classes/${classId}/attendance?recordId=${record.id}`}
                      className="text-sm font-bold inline-flex items-center gap-1 hover:underline transition-colors text-accent hover:text-accent-hover"
                    >
                      Update <ChevronRight className="w-4 h-4" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-24 text-center text-text-muted"
              >
                No records found for the selected date.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
