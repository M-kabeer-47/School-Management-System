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
import { GeneralStatusBadge, GeneralStatus } from "@/utils/status-styles";

interface ExpenseTableProps {
    expenses: Expense[];
    onSelectExpense: (expense: Expense) => void;
}

export function ExpenseTable({ expenses, onSelectExpense }: ExpenseTableProps) {
    const getGeneralStatus = (status: string): GeneralStatus => {
        if (status === "approved") return "success";
        if (status === "rejected") return "error";
        return "warning"; // pending
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
                            <GeneralStatusBadge
                                status={getGeneralStatus(expense.status)}
                                size="sm"
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
