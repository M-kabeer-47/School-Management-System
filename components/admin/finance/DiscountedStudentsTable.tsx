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
import { User, Eye } from "lucide-react";
import { cn } from "@/lib/shadcn/utils";
import { DiscountedStudent } from "@/lib/admin/types/finance";

interface DiscountedStudentsTableProps {
    students: DiscountedStudent[];
    onViewDetails: (student: DiscountedStudent) => void;
}

export function DiscountedStudentsTable({ students, onViewDetails }: DiscountedStudentsTableProps) {
    const getDiscountColor = (type: string) => {
        const colors: Record<string, string> = {
            "Sibling Discount": "bg-blue-100 text-blue-700 border-blue-200",
            "Staff Child": "bg-purple-100 text-purple-700 border-purple-200",
            "Merit Scholarship": "bg-green-100 text-green-700 border-green-200",
            "Need-based": "bg-orange-100 text-orange-700 border-orange-200",
        };
        return colors[type] || "bg-gray-100 text-gray-700 border-gray-200";
    };

    return (
        <div className="bg-background rounded-2xl border border-border overflow-hidden shadow-sm">
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
                                        getDiscountColor(student.discountType)
                                    )}
                                >
                                    {student.discountType}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className="font-bold text-green-600">
                                    {student.discountPercentage}%
                                </span>
                            </TableCell>
                            <TableCell className="text-center">
                                <button
                                    onClick={() => onViewDetails(student)}
                                    className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-surface-hover text-text-secondary hover:text-accent hover:bg-accent/10 transition-all font-medium text-sm"
                                >
                                    <Eye className="w-4 h-4" />
                                    View
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
