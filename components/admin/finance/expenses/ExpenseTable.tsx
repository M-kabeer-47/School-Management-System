"use client";

import {
    Table,
    TableHead,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableHeadRow,
} from "@/components/ui/Table";
import { Expense } from "@/lib/admin/types/finance";
import { cn } from "@/lib/common/utils";

interface ExpenseTableProps {
    expenses: Expense[];
    onSelectExpense: (expense: Expense) => void;
}

export function ExpenseTable({ expenses, onSelectExpense }: ExpenseTableProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
            case "pending":
                return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
            case "rejected":
                return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getPaymentMethodLabel = (method: string) => {
        switch (method) {
            case "cash":
                return "Cash";
            case "bank":
                return "Bank";
            case "online":
                return "Online";
            case "cheque":
                return "Cheque";
            default:
                return method;
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <Table>
            <TableHeader>
                <TableHeadRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                </TableHeadRow>
            </TableHeader>
            <TableBody>
                {expenses.map((expense) => (
                    <TableRow
                        key={expense.id}
                        className="cursor-pointer hover:bg-surface/50"
                        onClick={() => onSelectExpense(expense)}
                    >
                        <TableCell className="font-medium text-text-primary">
                            {formatDate(expense.date)}
                        </TableCell>
                        <TableCell>
                            <span className="text-text-secondary">{expense.category}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-text-primary line-clamp-1">
                                {expense.description}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span className="text-text-muted">{expense.vendor || "-"}</span>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-text-primary">
                            Rs. {expense.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                            <span className="text-text-secondary text-sm">
                                {getPaymentMethodLabel(expense.paymentMethod)}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span
                                className={cn(
                                    "px-2 py-1 rounded-full text-xs font-medium capitalize",
                                    getStatusColor(expense.status)
                                )}
                            >
                                {expense.status}
                            </span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
