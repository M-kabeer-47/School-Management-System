"use client";

import { Check, X } from "lucide-react";
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
import { Student } from "@/lib/instructor/types/class-detail";

import { Button } from "@/components/ui/Button";

type AttendanceStatus = "present" | "absent" | "leave";

interface AttendanceTableProps {
  students: Student[];
  attendance: Record<string, AttendanceStatus>;
  onStatusChange: (studentId: string, status: AttendanceStatus) => void;
  onMarkAll: (status: "present" | "absent") => void;
}

export default function AttendanceTable({
  students,
  attendance,
  onStatusChange,
  onMarkAll,
}: AttendanceTableProps) {
  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMarkAll("absent")}
          className="text-error hover:text-error/80 hover:bg-error/10 border-error min-w-[180px]"
        >
          Mark All Absent
        </Button>
        <Button
          onClick={() => onMarkAll("present")}
          size="sm"
          className="bg-success hover:bg-success/80 text-white min-w-[180px]"
        >
          <Check className="w-4 h-4 mr-2" />
          Mark All Present
        </Button>
      </div>

      <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableHeadRow>
              <TableHead className="w-24 text-white font-semibold">
                Roll No
              </TableHead>
              <TableHead className="text-white font-semibold">
                Student Name
              </TableHead>
              <TableHead className="w-48 text-right text-white font-semibold">
                Status
              </TableHead>
            </TableHeadRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => {
              const status = attendance[student.id];
              const isAbsent = status === "absent";
              const isPresent = status === "present";

              return (
                <TableRow
                  key={student.id}
                  className={cn(
                    "transition-colors",
                    isAbsent
                      ? "bg-error/5 hover:bg-error/10"
                      : "hover:bg-surface-hover/50",
                  )}
                >
                  <TableCell className="text-text-muted font-medium text-sm">
                    {student.rollNo}
                  </TableCell>

                  <TableCell>
                    <div>
                      <p
                        className={cn(
                          "font-bold text-sm",
                          isAbsent ? "text-error" : "text-text-primary",
                        )}
                      >
                        {student.name}
                      </p>
                      <p className="text-xs text-text-muted font-medium">
                        {student.fatherName}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <div className="inline-flex bg-surface-active p-1 rounded-xl border border-border/50">
                        <button
                          onClick={() => onStatusChange(student.id, "present")}
                          className={cn(
                            "sm:px-4 px-3 py-1.5 rounded-lg sm:text-sm text-xs font-bold transition-all flex items-center gap-1.5",
                            isPresent
                              ? "bg-white text-success-light shadow-sm ring-1 ring-black/5"
                              : "text-text-muted hover:text-text-primary",
                            // Correcting success color application since text-success-light might be too light/dark depending on theme
                            isPresent && "text-green-700",
                          )}
                        >
                          {isPresent && (
                            <Check className="w-3.5 h-3.5 hidden sm:block" />
                          )}
                          Present
                        </button>
                        <button
                          onClick={() => onStatusChange(student.id, "absent")}
                          className={cn(
                            "sm:px-4 px-3 py-1.5 rounded-lg sm:text-sm text-xs font-bold transition-all flex items-center gap-1.5",
                            isAbsent
                              ? "bg-error text-white shadow-sm"
                              : "text-text-muted hover:text-error",
                          )}
                        >
                          {isAbsent && (
                            <X className="w-3.5 h-3.5 hidden sm:block" />
                          )}
                          Absent
                        </button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
