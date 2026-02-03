"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableHeadRow,
    TableRow,
} from "@/components/ui/Table";
import { StaffSalary } from "@/lib/admin/types/salary";
import { cn } from "@/lib/common/utils";

interface StaffSalaryTableProps {
    staff: StaffSalary[];
    onSelectStaff: (staff: StaffSalary) => void;
}

export function StaffSalaryTable({ staff, onSelectStaff }: StaffSalaryTableProps) {
    const getStaffTypeBadge = (type: string) => {
        const styles = {
            teaching: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
            "non-teaching": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
            admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
        };
        return styles[type as keyof typeof styles] || styles.teaching;
    };

    return (
        <Table>
            <TableHeader>
                <TableHeadRow>
                    <TableHead className="w-[250px]">Staff Member</TableHead>
                    <TableHead className="w-[150px]">Department</TableHead>
                    <TableHead className="w-[120px]">Type</TableHead>
                    <TableHead className="w-[130px] text-right">Base Salary</TableHead>
                    <TableHead className="w-[130px] text-right">Net Salary</TableHead>
                </TableHeadRow>
            </TableHeader>
            <TableBody>
                {staff.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="h-32 text-center text-text-muted">
                            No staff members found
                        </TableCell>
                    </TableRow>
                ) : (
                    staff.map((member) => (
                        <TableRow
                            key={member.id}
                            className="cursor-pointer hover:bg-surface-hover transition-colors"
                            onClick={() => onSelectStaff(member)}
                        >
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    {member.avatar ? (
                                        <img
                                            src={member.avatar}
                                            alt={member.staffName}
                                            className="w-9 h-9 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-sm">
                                            {member.staffName.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-medium text-text-primary">
                                            {member.staffName}
                                        </p>
                                        <p className="text-xs text-text-muted">
                                            {member.designation}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-text-secondary">
                                {member.department}
                            </TableCell>
                            <TableCell>
                                <span className={cn(
                                    "px-2.5 py-1 rounded-full text-xs font-semibold capitalize",
                                    getStaffTypeBadge(member.staffType)
                                )}>
                                    {member.staffType.replace("-", " ")}
                                </span>
                            </TableCell>
                            <TableCell className="text-right font-medium text-text-primary">
                                Rs. {member.baseSalary.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-accent">
                                Rs. {member.netSalary.toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
