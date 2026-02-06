"use client";

import { Challan } from "@/lib/student/types/fees";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import { clsx } from "clsx";
import { PaymentStatusBadge, PaymentStatus } from "@/utils/status-styles";

interface FeesTableProps {
  challans: Challan[];
  showPaid?: boolean;
}

export const FeesTable = ({ challans, showPaid = false }: FeesTableProps) => {
  const formatAmount = (amount: number) => {
    return `Rs. ${amount.toLocaleString()}`;
  };

  // Map challan status to our centralized payment status type
  const getPaymentStatus = (status: Challan["status"]): PaymentStatus => {
    if (status === "Paid") return "paid";
    if (status === "Overdue") return "overdue";
    return "pending";
  };

  const handleView = (pdfUrl: string, title: string) => {
    const params = new URLSearchParams({
      url: pdfUrl,
      title: title,
    });
    window.open(`/pdf-viewer?${params.toString()}`, "_blank");
  };

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow-sm rounded-none sm:rounded-2xl border-x-0 sm:border-x border-y border-border">
          <Table className="min-w-full">
            <TableHeader>
              <TableHeadRow>
                <TableHead className="text-white">Challan</TableHead>
                <TableHead className="text-white">Due Date</TableHead>
                <TableHead className="text-white">Amount</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-center text-white">Action</TableHead>
              </TableHeadRow>
            </TableHeader>
            <TableBody>
              {challans.map((challan) => {
                const isPaid = challan.status === "Paid";
                return (
                  <TableRow key={challan.id}>
                    <TableCell
                      className={clsx(
                        "font-semibold",
                        isPaid ? "text-text-muted" : "text-text-primary",
                      )}
                    >
                      {challan.title}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        "whitespace-nowrap",
                        isPaid ? "text-text-muted" : "text-text-secondary",
                      )}
                    >
                      {challan.dueDate}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        "font-medium whitespace-nowrap",
                        isPaid ? "text-text-muted" : "text-text-primary",
                      )}
                    >
                      {formatAmount(challan.amount)}
                    </TableCell>
                    <TableCell>
                      <PaymentStatusBadge status={getPaymentStatus(challan.status)} size="sm" />
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        onClick={() =>
                          handleView(challan.pdfUrl, challan.title)
                        }
                        className="flex items-center gap-1.5 text-accent hover:text-accent-hover text-sm font-medium transition-colors mx-auto hover:cursor-pointer hover:underline"
                        title="View Challan"
                      >
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
