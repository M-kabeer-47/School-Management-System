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
import { AnyStaff } from "@/lib/admin/types/staff";
import { Check } from "lucide-react";
import { cn } from "@/lib/common/utils";
import { ViewButton } from "@/components/ui/ViewButton";

interface StaffTableProps {
  staff: AnyStaff[];
  onStaffAction: (action: string, staff: AnyStaff) => void;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
}

const statusStyles: Record<string, { bg: string; text: string }> = {
  active: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-400",
  },
  inactive: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-400",
  },
  "on-leave": {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-700 dark:text-orange-400",
  },
};

export function StaffTable({
  staff,
  onStaffAction,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}: StaffTableProps) {
  const allSelected =
    staff.length > 0 && staff.every((s) => selectedIds.includes(s.id));
  const someSelected = staff.some((s) => selectedIds.includes(s.id));

  return (
    <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableHeadRow>
            <TableHead className="w-[50px]">
              <button
                onClick={onToggleSelectAll}
                className="flex items-center justify-center w-full h-full"
              >
                <div
                  className={cn(
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
            <TableHead>Staff</TableHead>
            <TableHead>Staff Code</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Details</TableHead>
          </TableHeadRow>
        </TableHeader>
        <TableBody>
          {staff.map((member) => {
            const isSelected = selectedIds.includes(member.id);
            const style = statusStyles[member.status] || statusStyles.active;
            return (
              <TableRow
                key={member.id}
                isClickable={false}
                className={isSelected ? "bg-accent/5" : ""}
              >
                <TableCell>
                  <button
                    onClick={() => onToggleSelect(member.id)}
                    className="flex items-center justify-center w-full h-full"
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded flex items-center justify-center transition-all border",
                        isSelected
                          ? "bg-accent border-accent text-white"
                          : "border-text-secondary/30 hover:border-accent bg-transparent",
                      )}
                    >
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      )}
                    </div>
                  </button>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-text-primary">
                    {member.name}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm">{member.staffCode}</span>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-lg">
                    {member.department}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-text-primary">
                    {member.designation}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "px-2 py-1 text-xs font-medium rounded-lg capitalize whitespace-nowrap",
                      style.bg,
                      style.text,
                    )}
                  >
                    {member.status.replace("-", " ")}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <ViewButton onClick={() => onStaffAction("view", member)} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
