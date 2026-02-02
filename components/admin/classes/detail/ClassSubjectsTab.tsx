"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";

interface SubjectMapping {
  id: string;
  subjectName: string;
  teacherName: string;
  teacherId: string;
  classesPerWeek: number;
  syllabusUrl?: string;
}

interface ClassSubjectsTabProps {
  subjects: SubjectMapping[];
}

export const ClassSubjectsTab = ({ subjects }: ClassSubjectsTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Table>
        <TableHeader>
          <TableHeadRow>
            <TableHead>Subject</TableHead>
            <TableHead>Teacher</TableHead>
          </TableHeadRow>
        </TableHeader>
        <TableBody>
          {subjects.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.subjectName}</TableCell>
              <TableCell className="text-text-secondary">
                {item.teacherName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};
