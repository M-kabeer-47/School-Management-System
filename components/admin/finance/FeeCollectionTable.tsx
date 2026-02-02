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
import { Eye, Check, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { clsx } from "clsx";
import { cn } from "@/lib/shadcn/utils";
import { StudentFeeRecord } from "@/lib/admin/types/finance";

// Re-export for convenience
export type { StudentFeeRecord };


interface FeeCollectionTableProps {
    records: StudentFeeRecord[];
    selectedIds: string[];
    onToggleSelect: (id: string) => void;
    onToggleSelectAll: () => void;
    onViewDetails: (record: StudentFeeRecord) => void;
}

export function FeeCollectionTable({
    records,
    selectedIds,
    onToggleSelect,
    onToggleSelectAll,
    onViewDetails,
}: FeeCollectionTableProps) {
    const allSelected =
        records.length > 0 && records.every((r) => selectedIds.includes(r.id));
    const someSelected = records.some((r) => selectedIds.includes(r.id));

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "paid":
                return <CheckCircle className="w-4 h-4" />;
            case "pending":
                return <Clock className="w-4 h-4" />;
            case "overdue":
                return <AlertTriangle className="w-4 h-4" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "paid":
                return "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400";
            case "pending":
                return "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400";
            case "overdue":
                return "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400";
            default:
                return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400";
        }
    };

    return (
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
                                            : "border-white hover:border-white"
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
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Details</TableHead>
                </TableHeadRow>
            </TableHeader>
            <TableBody>
                {records.map((record) => {
                    const isSelected = selectedIds.includes(record.id);
                    return (
                        <TableRow
                            key={record.id}
                            isClickable={false}
                            className={isSelected ? "bg-accent/10 dark:bg-accent/20" : ""}
                        >
                            <TableCell>
                                <button
                                    onClick={() => onToggleSelect(record.id)}
                                    className="flex items-center justify-center w-full h-full"
                                >
                                    <div
                                        className={clsx(
                                            "w-5 h-5 rounded flex items-center justify-center transition-all border",
                                            isSelected
                                                ? "bg-accent border-accent text-white"
                                                : "border-text-secondary/30 hover:border-accent bg-transparent"
                                        )}
                                    >
                                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                    </div>
                                </button>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium text-text-primary">
                                    {record.studentName}
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="font-mono text-sm">{record.admissionNo}</span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {record.class}-{record.section}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium text-text-primary text-sm">
                                    {record.fatherName}
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <span
                                    className={cn(
                                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize",
                                        getStatusColor(record.status)
                                    )}
                                >
                                    {getStatusIcon(record.status)}
                                    {record.status}
                                </span>
                            </TableCell>
                            <TableCell className="text-center">
                                <button
                                    onClick={() => onViewDetails(record)}
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
    );
}
