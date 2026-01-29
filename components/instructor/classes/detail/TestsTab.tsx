"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { TestRecord } from "@/lib/instructor/types/class-detail";
import { Calendar, ChevronRight, Plus, FileEdit } from "lucide-react";
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

interface TestsTabProps {
  tests: TestRecord[];
}

export const TestsTab = ({ tests }: TestsTabProps) => {
  const params = useParams();
  const classId = params.id as string;

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-xl font-bold font-heading text-text-primary">
          Class Assessments
        </h3>
        <Link
          href={`/instructor/classes/${classId}/marks`}
          className="px-4 py-2 bg-accent text-white font-bold rounded-xl shadow-lg hover:bg-accent-hover active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Test
        </Link>
      </div>

      {/* Tests Table */}
      <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableHeadRow>
              <TableHead>Test Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead>Average Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableHeadRow>
          </TableHeader>
          <TableBody>
            {tests
              .filter((test) => test.status !== "upcoming")
              .map((test) => (
                <TableRow
                  key={test.id}
                  className="hover:bg-surface-hover/50 group"
                >
                  <TableCell>
                    <div>
                      <p className="font-bold text-text-primary text-sm">
                        {test.title}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-text-secondary text-sm">
                      <Calendar className="w-4 h-4 text-text-muted" />
                      {new Date(test.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm font-bold text-text-primary bg-surface-active px-2 py-1 rounded w-[90px] inline-flex items-center justify-center">
                      {test.totalMarks} pts
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="w-32">
                      <div className="flex justify-between text-xs mb-1 font-medium">
                        <span>{test.averageScore}%</span>
                      </div>
                      <div className="h-2 w-full bg-surface-active rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            test.averageScore >= 80
                              ? "bg-green-500"
                              : test.averageScore >= 60
                                ? "bg-accent"
                                : "bg-orange-500",
                          )}
                          style={{ width: `${test.averageScore}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize",
                        test.status === "graded"
                          ? "bg-blue-50 text-blue-700 border-blue-100"
                          : test.status === "upcoming"
                            ? "bg-orange-50 text-orange-700 border-orange-100"
                            : "bg-gray-50 text-gray-700 border-gray-100",
                      )}
                    >
                      {test.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/instructor/classes/${classId}/marks?testId=${test.id}`}
                        title="Enter/Edit Marks"
                        className="p-2 rounded-lg hover:bg-surface-active text-text-secondary hover:text-accent transition-colors"
                      >
                        <FileEdit className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/instructor/classes/${classId}/marks?testId=${test.id}`}
                        className="text-sm font-bold text-accent hover:text-accent-hover inline-flex items-center gap-1 hover:underline ml-2"
                      >
                        Enter Marks <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
