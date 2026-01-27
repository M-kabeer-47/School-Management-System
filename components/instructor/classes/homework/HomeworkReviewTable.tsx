"use client";

import { Check, X, MessageSquare } from "lucide-react";
import { cn } from "@/lib/shadcn/utils";
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

type HomeworkStatus = "checked" | "pending";

interface HomeworkReviewTableProps {
  students: Student[];
  homeworkStatus: Record<string, HomeworkStatus>;
  feedbacks: Record<string, string>;
  onStatusChange: (studentId: string, status: HomeworkStatus) => void;
  onFeedbackClick: (student: Student) => void;
  onMarkAll: (status: HomeworkStatus) => void;
}

export default function HomeworkReviewTable({
  students,
  homeworkStatus,
  feedbacks,
  onStatusChange,
  onFeedbackClick,
  onMarkAll,
}: HomeworkReviewTableProps) {
  const allChecked =
    students.length > 0 &&
    students.every(
      (student) => (homeworkStatus[student.id] || "pending") === "checked",
    );

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      <div className="flex items-center justify-end gap-2">
        <Button
          onClick={() => onMarkAll(allChecked ? "pending" : "checked")}
          size="sm"
          variant={allChecked ? "outline" : "default"}
          className={cn(
            "min-w-[180px] transition-all",
            allChecked
              ? "text-text-muted hover:text-text-primary border-border hover:bg-surface-hover"
              : "bg-success hover:bg-success/80 text-white",
          )}
        >
          {allChecked ? (
            "Mark All Pending"
          ) : (
            <>
              <Check className="w-4 h-4 mr-2" />
              Mark All Checked
            </>
          )}
        </Button>
      </div>

      <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableHeadRow className=" h-12">
              <TableHead className="w-24 font-bold ">Roll No</TableHead>
              <TableHead className="font-bold ">Student Name</TableHead>
              <TableHead className="w-48 text-center font-bold ">
                Status
              </TableHead>
              <TableHead className="w-48 text-right font-bold">
                Feedback
              </TableHead>
            </TableHeadRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => {
              const status = homeworkStatus[student.id] || "pending";
              const isChecked = status === "checked";
              const isPending = status === "pending";
              const hasFeedback = !!feedbacks[student.id];

              return (
                <TableRow
                  key={student.id}
                  className={cn(
                    "transition-colors h-16",
                    isChecked
                      ? "bg-success/5 hover:bg-success/10"
                      : "hover:bg-surface-hover/50",
                  )}
                >
                  <TableCell className="text-text-muted font-bold text-sm">
                    {student.rollNo}
                  </TableCell>

                  <TableCell>
                    <div>
                      <p className="font-bold text-sm text-text-primary">
                        {student.name}
                      </p>
                      <p className="text-xs text-text-muted font-medium">
                        {student.fatherName}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-center">
                      <div className="inline-flex bg-surface-active p-1 rounded-xl border border-border/50">
                        <button
                          onClick={() => onStatusChange(student.id, "checked")}
                          className={cn(
                            "px-4 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5",
                            isChecked
                              ? "bg-white text-success-light shadow-sm ring-1 ring-black/5 text-green-700"
                              : "text-text-muted hover:text-text-primary",
                          )}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                          Checked
                        </button>
                        <button
                          onClick={() => onStatusChange(student.id, "pending")}
                          className={cn(
                            "px-4 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5",
                            isPending
                              ? "bg-white text-text-secondary shadow-sm ring-1 ring-black/5"
                              : "text-text-muted hover:text-text-primary",
                          )}
                        >
                          Pending
                        </button>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant={hasFeedback ? "outline" : "ghost"}
                      size="sm"
                      onClick={() => onFeedbackClick(student)}
                      className={cn(
                        "font-medium transition-colors",
                        hasFeedback
                          ? "text-accent border-accent/30 hover:bg-accent/5 hover:text-accent-hover"
                          : "text-text-muted hover:text-text-primary hover:bg-surface-active",
                      )}
                    >
                      {hasFeedback ? (
                        <>
                          <MessageSquare
                            className="w-3.5 h-3.5 mr-2 opacity-20"
                            fill="currentColor"
                          />
                          View / Edit
                        </>
                      ) : (
                        "Add Feedback"
                      )}
                    </Button>
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
