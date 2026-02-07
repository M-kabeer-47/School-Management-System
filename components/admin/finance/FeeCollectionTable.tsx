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
import { Check } from "lucide-react";
import { clsx } from "clsx";
import { StudentFeeRecord } from "@/lib/admin/types/finance";
import { PaymentStatusBadge, PaymentStatus } from "@/utils/status-styles";
import { ViewButton } from "@/components/ui/ViewButton";

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

  const getPaymentStatus = (status: string): PaymentStatus => {
    if (status === "paid") return "paid";
    if (status === "overdue") return "overdue";
    return "pending";
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
                      : "border-white hover:border-white",
                )}
              >
                {(allSelected || someSelected) && (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                )}
              </div>
            </button>
          </TableHead>
          <TableHead>Admission No</TableHead>
          <TableHead>Student</TableHead>

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
                        : "border-text-secondary/30 hover:border-accent bg-transparent",
                    )}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              </TableCell>
              <TableCell>
                <span className="font-mono text-sm">{record.admissionNo}</span>
              </TableCell>
              <TableCell>
                <div className="font-medium text-text-primary">
                  {record.studentName}
                </div>
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
                <PaymentStatusBadge
                  status={getPaymentStatus(record.status)}
                  size="sm"
                />
              </TableCell>
              <TableCell className="text-center">
                <ViewButton onClick={() => onViewDetails(record)} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
