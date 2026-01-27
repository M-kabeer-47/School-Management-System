"use client";

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

interface MarksEntryTableProps {
    students: Student[];
    marks: Record<string, number | null>;
    totalMarks: number;
    onMarksChange: (studentId: string, marks: number | null) => void;
    onFillAll: (marks: number | null) => void;
}

export default function MarksEntryTable({
    students,
    marks,
    totalMarks,
    onMarksChange,
    onFillAll,
}: MarksEntryTableProps) {
    const getScoreColor = (score: number | null) => {
        if (score === null) return "";
        const percentage = (score / totalMarks) * 100;
        if (percentage >= 80) return "text-green-600";
        if (percentage >= 60) return "text-accent";
        if (percentage >= 40) return "text-orange-600";
        return "text-red-600";
    };

    return (
        <div className="space-y-4">
            {/* Bulk Actions */}
            <div className="flex items-center justify-end gap-2">
                <button
                    onClick={() => onFillAll(null)}
                    className="px-4 py-2 text-sm font-medium text-text-muted hover:text-text-primary border border-border rounded-xl hover:bg-surface-hover transition-colors"
                >
                    Clear All
                </button>
                <button
                    onClick={() => onFillAll(totalMarks)}
                    className="px-4 py-2 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors"
                >
                    Fill All ({totalMarks})
                </button>
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
                            <TableHead className="w-40 text-right text-white font-semibold">
                                Marks (/{totalMarks})
                            </TableHead>
                        </TableHeadRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student) => {
                            const studentMarks = marks[student.id];
                            const isAbsent = studentMarks === 0;
                            const isEmpty = studentMarks === null || studentMarks === undefined;

                            return (
                                <TableRow
                                    key={student.id}
                                    className={cn(
                                        "transition-colors",
                                        isAbsent
                                            ? "bg-error/5 hover:bg-error/10"
                                            : "hover:bg-surface-hover/50"
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
                                                    isAbsent ? "text-error" : "text-text-primary"
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
                                        <div className="flex items-center justify-end gap-2">
                                            <input
                                                type="number"
                                                min="0"
                                                max={totalMarks}
                                                value={studentMarks ?? ""}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value === "") {
                                                        onMarksChange(student.id, null);
                                                    } else {
                                                        const num = Math.min(
                                                            Math.max(0, parseInt(value)),
                                                            totalMarks
                                                        );
                                                        onMarksChange(student.id, num);
                                                    }
                                                }}
                                                placeholder="—"
                                                className={cn(
                                                    "w-20 px-3 py-2 text-center text-sm font-bold rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors",
                                                    getScoreColor(studentMarks),
                                                    isEmpty && "text-text-muted"
                                                )}
                                            />
                                            <span className="text-xs text-text-muted font-medium">
                                                / {totalMarks}
                                            </span>
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
