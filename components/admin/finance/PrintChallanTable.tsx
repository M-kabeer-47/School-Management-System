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
import { ChallanData } from "@/lib/admin/types/finance";
import { ViewButton } from "@/components/ui/ViewButton";

interface PrintChallanTableProps {
  challans: ChallanData[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onPreview: (challan: ChallanData) => void;
  publishedIds?: string[];
}

export function PrintChallanTable({
  challans,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onPreview,
  publishedIds,
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
                      : "border-white hover:border-white",
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
                        : "border-text-secondary/30 hover:border-accent bg-transparent",
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
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm bg-surface-hover px-2 py-1 rounded">
                    {challan.challanNo}
                  </span>
                  {publishedIds?.includes(challan.id) && (
                    <span className="text-[10px] font-bold text-green-600 bg-green-100 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                      Published
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-text-secondary">
                {challan.month.slice(0, 3)} 2026
              </TableCell>
              <TableCell className="text-right font-bold text-text-primary">
                Rs. {challan.total.toLocaleString()}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <ViewButton onClick={() => onPreview(challan)} />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
