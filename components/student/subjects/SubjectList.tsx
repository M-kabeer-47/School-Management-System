"use client";

import { Subject } from "@/lib/student/types/subjects";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableActionCell,
} from "@/components/ui/Table";

interface SubjectListProps {
  subjects: Subject[];
}

export const SubjectList = ({ subjects }: SubjectListProps) => {
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
            <TableHead className="w-24 text-center">Action</TableHead>
          </TableHeadRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject) => (
            <TableRow key={subject.id}>
              <TableCell className="font-medium">{subject.name}</TableCell>
              <TableCell className="text-text-secondary">
                {subject.teacher.name}
              </TableCell>
              <TableCell className="text-center">
                <Link
                  href={`/subjects/${subject.id}`}
                  className="text-accent hover:text-accent-hover text-sm font-medium hover:underline"
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};
