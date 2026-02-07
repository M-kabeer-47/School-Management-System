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
import { User } from "lucide-react";
import { cn } from "@/lib/common/utils";
import { DiscountedStudent } from "@/lib/admin/types/finance";
import { ViewButton } from "@/components/ui/ViewButton";

interface DiscountedStudentsTableProps {
  students: DiscountedStudent[];
  onViewDetails: (student: DiscountedStudent) => void;
}

export function DiscountedStudentsTable({
  students,
  onViewDetails,
}: DiscountedStudentsTableProps) {
  const getDiscountColor = (type: string) => {
    const colors: Record<string, string> = {
      "Sibling Discount":
        "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      "Staff Child":
        "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      "Merit Scholarship":
        "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
      "Need-based":
        "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    };
    return (
      colors[type] ||
      "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700"
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableHeadRow>
          <TableHead>Student</TableHead>
          <TableHead>Admission No</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Discount Type</TableHead>
          <TableHead>Discount %</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableHeadRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id} isClickable={false}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-accent" />
                </div>
                <span className="font-medium text-text-primary">
                  {student.studentName}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <span className="font-mono text-sm">{student.admissionNo}</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {student.class}-{student.section}
              </div>
            </TableCell>
            <TableCell>
              <span
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-semibold border",
                  getDiscountColor(student.discountType),
                )}
              >
                {student.discountType}
              </span>
            </TableCell>
            <TableCell>
              <span className="font-bold text-green-600 dark:text-green-400">
                {student.discountPercentage}%
              </span>
            </TableCell>
            <TableCell className="text-center">
              <ViewButton onClick={() => onViewDetails(student)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
