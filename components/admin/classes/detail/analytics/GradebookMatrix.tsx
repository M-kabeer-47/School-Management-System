"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/shadcn/utils";
import { Search } from "lucide-react";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import { GradebookRating } from "./GradebookRating";

interface TestInfo {
  id: string;
  name: string;
  totalMarks: number;
  date: string;
}

interface StudentMark {
  studentId: string;
  studentName: string;
  rollNo: string;
  marks: Record<string, number | null>;
}

interface GradebookMatrixProps {
  subjectName: string;
  tests: TestInfo[];
  students: StudentMark[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const GradebookMatrix = ({
  subjectName,
  tests,
  students,
  searchQuery,
  setSearchQuery,
}: GradebookMatrixProps) => {
  const filteredStudents = students.filter(
    (s) =>
      s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPossible = tests.reduce((acc, t) => acc + t.totalMarks, 0);

  return (
    <div className="space-y-6">
      {/* Table Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-text-primary">
            {subjectName} Mark Sheet
          </h3>
          <p className="text-sm text-text-muted font-medium">
            Verification of individual student marks
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-hover/30 border border-border rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={subjectName} // Stable key for subject switch animation
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {tests.length === 0 ? (
            <div className="bg-surface border border-border rounded-2xl py-20 text-center shadow-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-surface-active flex items-center justify-center text-text-muted opacity-40">
                  <Search className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-text-primary">
                  No Assessments Found
                </h4>
                <p className="text-text-muted font-medium max-w-xs mx-auto">
                  There are no assessments recorded for{" "}
                  <span className="text-accent">{subjectName}</span> yet.
                </p>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableHeadRow>
                  <TableHead className="min-w-[220px]">Student Name</TableHead>
                  {tests.map((test) => (
                    <TableHead
                      key={test.id}
                      className="text-center min-w-[120px]"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-white font-bold text-xs">
                          {test.name}
                        </span>
                        <span className="text-[10px] text-white/70 font-medium">
                          ({test.totalMarks} pts)
                        </span>
                      </div>
                    </TableHead>
                  ))}
                  <TableHead className="text-center min-w-[100px]">
                    Final %
                  </TableHead>
                  <TableHead className="text-right pr-6 min-w-[150px]">
                    Award/Rating
                  </TableHead>
                </TableHeadRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, i) => {
                      const studentObtained = Object.values(
                        student.marks,
                      ).reduce((sum: number, m) => sum + Number(m || 0), 0);
                      const studentPerc =
                        totalPossible > 0
                          ? (studentObtained / totalPossible) * 100
                          : 0;

                      return (
                        <motion.tr
                          key={student.studentId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: i * 0.05 }}
                          layout
                          className="group hover:bg-surface-hover/30 border-b border-border last:border-0"
                        >
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-bold text-text-primary text-sm">
                                {student.studentName}
                              </span>
                              <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
                                {student.rollNo}
                              </span>
                            </div>
                          </TableCell>

                          {tests.map((test) => {
                            const mark = student.marks[test.id];
                            const markPerc =
                              mark !== null
                                ? (mark / test.totalMarks) * 100
                                : 0;

                            return (
                              <TableCell key={test.id} className="text-center">
                                <div className="flex flex-col items-center">
                                  <span
                                    className={cn(
                                      "font-mono font-bold text-sm",
                                      mark === null
                                        ? "text-text-muted"
                                        : markPerc < 40
                                          ? "text-error"
                                          : "text-text-primary",
                                    )}
                                  >
                                    {mark ?? "--"}
                                  </span>
                                  {mark !== null && (
                                    <span className="text-[10px] text-text-muted opacity-60 font-medium">
                                      ({markPerc.toFixed(0)}%)
                                    </span>
                                  )}
                                </div>
                              </TableCell>
                            );
                          })}

                          <TableCell className="text-center">
                            <span
                              className={cn(
                                "font-bold text-sm",
                                studentPerc >= 80
                                  ? "text-success"
                                  : studentPerc >= 50
                                    ? "text-accent"
                                    : "text-error",
                              )}
                            >
                              {studentPerc.toFixed(1)}%
                            </span>
                          </TableCell>

                          <TableCell className="text-right pr-6">
                            <GradebookRating percentage={studentPerc} />
                          </TableCell>
                        </motion.tr>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={tests.length + 3}
                        className="py-20 text-center"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <Search className="w-10 h-10 text-text-muted opacity-20" />
                          <p className="text-text-muted font-medium">
                            No students found matching your search.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
