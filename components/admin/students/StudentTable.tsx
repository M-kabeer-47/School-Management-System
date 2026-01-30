"use client";

import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import { Student } from "@/lib/admin/types/student";
import { Eye, Check } from "lucide-react";
import { clsx } from "clsx";

interface StudentTableProps {
  students: Student[];
  onStudentAction: (action: string, student: Student) => void;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
}

export function StudentTable({
  students,
  onStudentAction,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}: StudentTableProps) {
  const allSelected =
    students.length > 0 && students.every((s) => selectedIds.includes(s.id));
  const someSelected = students.some((s) => selectedIds.includes(s.id));

  return (
    <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableHeadRow>
            <TableHead className="w-[50px]">
              <button
                onClick={onToggleSelectAll}
                className="flex items-center justify-center w-full h-full"
              >
                <div
                  className={clsx(
                    "w-5 h-5 rounded flex items-center justify-center transition-all border",
                    allSelected
                      ? "bg-accent border-white text-white"
                      : someSelected
                        ? "bg-accent/20 border-white text-accent"
                        : "border-white hover:border-white",
                  )}
                >
                  {(allSelected || someSelected) && (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  )}
                </div>
              </button>
            </TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Admission No</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Father Name</TableHead>
            <TableHead>Father Contact</TableHead>
            <TableHead className="text-center">Details</TableHead>
          </TableHeadRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => {
            const isSelected = selectedIds.includes(student.id);
            return (
              <TableRow
                key={student.id}
                isClickable={false}
                className={isSelected ? "bg-accent/5" : ""}
              >
                <TableCell>
                  <button
                    onClick={() => onToggleSelect(student.id)}
                    className="flex items-center justify-center w-full h-full"
                  >
                    <div
                      className={clsx(
                        "w-5 h-5 rounded flex items-center justify-center transition-all border",
                        isSelected
                          ? "bg-accent border-accent text-white"
                          : "border-text-secondary/30 hover:border-accent bg-transparent",
                      )}
                    >
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      )}
                    </div>
                  </button>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-text-primary">
                    {student.studentName}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm">
                    {student.admissionNo}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-lg">
                      Grade {student.class}
                    </span>
                    <span className="px-2 py-1 bg-surface-hover text-text-secondary text-xs font-medium rounded-lg">
                      Sec {student.section}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-text-primary text-sm">
                      {student.fatherName}
                    </div>
                    <div className="text-xs text-text-muted">
                      {student.fatherEmail}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="text-text-primary">{student.fatherWhatsapp}</div>
                    <div className="text-xs text-text-muted">
                      Phone: {student.phoneNo}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => onStudentAction("view", student)}
                    className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-surface-hover text-text-secondary hover:text-accent hover:bg-accent/10 transition-all font-medium text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
