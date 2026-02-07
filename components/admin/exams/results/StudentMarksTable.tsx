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
import { StudentStatusBadge, StudentStatus } from "@/utils/status-styles";
import { StudentMarkStatus } from "@/lib/admin/mock-data/exams";

interface StudentMarksTableProps {
  students: StudentMarkStatus[];
}

export function StudentMarksTable({ students }: StudentMarksTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableHeadRow>
          <TableHead>Student Name</TableHead>
          <TableHead>Father Name</TableHead>
          <TableHead>Status</TableHead>
        </TableHeadRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.studentId}>
            <TableCell>
              <span className="font-medium">{student.studentName}</span>
            </TableCell>
            <TableCell>
              <span className="text-text-secondary">{student.fatherName}</span>
            </TableCell>
            <TableCell className="text-center">
              <StudentStatusBadge
                status={student.status as StudentStatus}
                size="md"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
