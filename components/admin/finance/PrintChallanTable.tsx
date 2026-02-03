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
import { Eye, Check } from "lucide-react";
import { clsx } from "clsx";
import { ChallanData } from "@/lib/admin/types/finance";

interface PrintChallanTableProps {
    challans: ChallanData[];
    selectedIds: string[];
    onToggleSelect: (id: string) => void;
    onToggleSelectAll: () => void;
    onPreview: (challan: ChallanData) => void;
}

export function PrintChallanTable({
    challans,
    selectedIds,
    onToggleSelect,
    onToggleSelectAll,
    onPreview,
}: PrintChallanTableProps) {
    const allSelected =
        challans.length > 0 && challans.every((c) => selectedIds.includes(c.id));
    const someSelected = challans.some((c) => selectedIds.includes(c.id));

    return (
        <Table className="table-fixed">
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
                    <TableHead className="w-[150px]">Student</TableHead>
                    <TableHead className="w-[130px]">Admission No</TableHead>
                    <TableHead className="w-[80px]">Class</TableHead>
                    <TableHead className="w-[150px]">Challan No</TableHead>
                    <TableHead className="w-[100px]">Month</TableHead>
                    <TableHead className="w-[100px] text-right">Amount</TableHead>
                    <TableHead className="w-[100px] text-center">Actions</TableHead>
                </TableHeadRow>
            </TableHeader>
            <TableBody>
                {challans.map((challan) => {
                    const isSelected = selectedIds.includes(challan.id);
                    return (
                        <TableRow
                            key={challan.id}
                            isClickable={false}
                            className={isSelected ? "bg-purple-50 dark:bg-purple-900/20" : ""}
                        >
                            <TableCell>
                                <button
                                    onClick={() => onToggleSelect(challan.id)}
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
                                    {challan.studentName}
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="font-mono text-sm">{challan.admissionNo}</span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {challan.class}-{challan.section}
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="font-mono text-sm bg-surface-hover px-2 py-1 rounded">
                                    {challan.challanNo}
                                </span>
                            </TableCell>
                            <TableCell className="text-text-secondary">
                                {challan.month.slice(0, 3)} 2026
                            </TableCell>
                            <TableCell className="text-right font-bold text-text-primary">
                                Rs. {challan.total.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => onPreview(challan)}
                                        className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-surface-hover text-text-secondary hover:text-accent hover:bg-accent/10 transition-all font-medium text-sm"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
