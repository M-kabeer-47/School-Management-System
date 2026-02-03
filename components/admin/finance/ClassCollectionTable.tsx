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
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/common/utils";
import { ClassFeeCollection } from "@/lib/admin/types/finance";

interface ClassCollectionTableProps {
    collections: ClassFeeCollection[];
    totals: {
        students: number;
        collectable: number;
        collected: number;
        pending: number;
        defaulters: number;
    };
    overallPercentage: number;
}

export function ClassCollectionTable({
    collections,
    totals,
    overallPercentage,
}: ClassCollectionTableProps) {
    return (
        <div className="bg-background rounded-2xl border border-border overflow-hidden shadow-sm">
            <Table>
                <TableHeader>
                    <TableHeadRow>
                        <TableHead>Class</TableHead>
                        <TableHead className="text-center">Students</TableHead>
                        <TableHead className="text-right">Total Due</TableHead>
                        <TableHead className="text-right">Collected</TableHead>
                        <TableHead className="text-right">Pending</TableHead>
                        <TableHead className="text-center">Collection %</TableHead>
                        <TableHead className="text-center">Defaulters</TableHead>
                    </TableHeadRow>
                </TableHeader>
                <tbody className="divide-y divide-border">
                    {collections.map((row) => (
                        <TableRow
                            key={row.id}
                            isClickable={false}
                        >
                            <TableCell>
                                <div className="flex items-center gap-2 font-semibold text-text-primary">
                                    {row.className}-{row.section}
                                </div>
                            </TableCell>
                            <TableCell className="text-center text-text-secondary">
                                {row.totalStudents}
                            </TableCell>
                            <TableCell className="text-right text-text-secondary">
                                Rs. {row.totalCollectable.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-green-600">
                                Rs. {row.totalCollected.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-orange-600">
                                Rs. {row.totalPending.toLocaleString()}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-20 h-2 bg-surface-active rounded-full overflow-hidden">
                                        <div
                                            className={cn(
                                                "h-full rounded-full transition-all",
                                                row.collectionPercentage >= 90
                                                    ? "bg-green-500"
                                                    : row.collectionPercentage >= 75
                                                        ? "bg-blue-500"
                                                        : "bg-orange-500"
                                            )}
                                            style={{ width: `${row.collectionPercentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-text-primary w-10 text-right">
                                        {row.collectionPercentage}%
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                {row.defaultersCount > 0 ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                        <AlertTriangle className="w-3 h-3" />
                                        {row.defaultersCount}
                                    </span>
                                ) : (
                                    <span className="text-green-600 text-sm">✓</span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="bg-surface-hover font-semibold">
                        <td className="px-4 py-3 text-text-primary">Total</td>
                        <td className="px-4 py-3 text-center text-text-primary">
                            {totals.students}
                        </td>
                        <td className="px-4 py-3 text-right text-text-primary">
                            Rs. {totals.collectable.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right text-green-600">
                            Rs. {totals.collected.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right text-orange-600">
                            Rs. {totals.pending.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-center text-text-primary">
                            {overallPercentage}%
                        </td>
                        <td className="px-4 py-3 text-center text-red-600">
                            {totals.defaulters}
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    );
}
