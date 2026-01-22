"use client";

import { Challan } from "@/lib/types/fees";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import { FileText } from "lucide-react";
import { clsx } from "clsx";

interface FeesTableProps {
  challans: Challan[];
  showPaid?: boolean;
}

export const FeesTable = ({ challans, showPaid = false }: FeesTableProps) => {
  const formatAmount = (amount: number) => {
    return `Rs. ${amount.toLocaleString()}`;
  };

  const getStatusBadge = (status: Challan["status"]) => {
    const styles = {
      Pending: "bg-warning-light text-warning",
      Overdue: "bg-error-light text-error",
      Paid: "bg-success-light text-success",
    };

    return (
      <span
        className={clsx(
          "inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold",
          styles[status],
        )}
      >
        {status}
      </span>
    );
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
                    <TableCell>{getStatusBadge(challan.status)}</TableCell>
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
