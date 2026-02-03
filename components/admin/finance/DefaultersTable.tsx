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
import { Check, Phone, Mail, Send } from "lucide-react";
import { clsx } from "clsx";
import { cn } from "@/lib/shadcn/utils";
import { Button } from "@/components/ui/Button";
import { FeeDefaulter } from "@/lib/admin/types/finance";

interface DefaultersTableProps {
    defaulters: FeeDefaulter[];
    selectedIds: string[];
    onToggleSelect: (id: string) => void;
    onToggleSelectAll: () => void;
    onSendReminder: (defaulter: FeeDefaulter) => void;
}

export function DefaultersTable({
    defaulters,
    selectedIds,
    onToggleSelect,
    onToggleSelectAll,
    onSendReminder,
}: DefaultersTableProps) {
    const allSelected =
        defaulters.length > 0 && defaulters.every((d) => selectedIds.includes(d.id));
    const someSelected = defaulters.some((d) => selectedIds.includes(d.id));

    const getSeverityColor = (daysOverdue: number) => {
        if (daysOverdue > 30) return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30";
        if (daysOverdue > 14) return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30";
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30";
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
                    <TableHead>Class</TableHead>
                    <TableHead>Amount Due</TableHead>
                    <TableHead>Overdue</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableHeadRow>
            </TableHeader>
            <TableBody>
                {defaulters.map((defaulter) => {
                    const isSelected = selectedIds.includes(defaulter.id);
                    return (
                        <TableRow
                            key={defaulter.id}
                            isClickable={false}
                            className={isSelected ? "bg-red-50/50 dark:bg-red-900/20" : ""}
                        >
                            <TableCell>
                                <button
                                    onClick={() => onToggleSelect(defaulter.id)}
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
                                <div>
                                    <p className="font-medium text-text-primary">
                                        {defaulter.studentName}
                                    </p>
                                    <p className="text-xs text-text-muted">
                                        {defaulter.admissionNo} • S/O {defaulter.fatherName}
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {defaulter.class}-{defaulter.section}
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="font-bold text-red-600 dark:text-red-400">
                                    Rs. {defaulter.totalDue.toLocaleString()}
                                </span>
                                <p className="text-xs text-text-muted">
                                    {defaulter.pendingChallans} challan(s)
                                </p>
                            </TableCell>
                            <TableCell>
                                <span
                                    className={cn(
                                        "px-2.5 py-1 rounded-full text-xs font-bold",
                                        getSeverityColor(defaulter.daysOverdue)
                                    )}
                                >
                                    {defaulter.daysOverdue} days
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={`tel:${defaulter.phone}`}
                                        className="p-1.5 rounded-lg hover:bg-surface-hover text-text-muted hover:text-green-600 transition-colors"
                                        title={defaulter.phone}
                                    >
                                        <Phone className="w-4 h-4" />
                                    </a>
                                    {defaulter.email && (
                                        <a
                                            href={`mailto:${defaulter.email}`}
                                            className="p-1.5 rounded-lg hover:bg-surface-hover text-text-muted hover:text-blue-600 transition-colors"
                                            title={defaulter.email}
                                        >
                                            <Mail className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                                    onClick={() => onSendReminder(defaulter)}
                                >
                                    <Send className="w-4 h-4" />
                                    Remind
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
