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
import { Eye, AlertCircle, Clock, CheckCircle } from "lucide-react";
import {
    AdminComplaint,
    statusConfig,
    categoryLabels,
    sourceConfig,
} from "@/lib/admin/types/complaints";
import { cn } from "@/lib/common/utils";

interface ComplaintsTableProps {
    complaints: AdminComplaint[];
    onViewComplaint: (complaint: AdminComplaint) => void;
}

const StatusIcon = {
    pending: AlertCircle,
    "in-progress": Clock,
    resolved: CheckCircle,
};

export default function ComplaintsTable({
    complaints,
    onViewComplaint,
}: ComplaintsTableProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    if (complaints.length === 0) {
        return (
            <div className="bg-surface border border-border rounded-2xl shadow-sm p-12 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-surface-active flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-text-muted" />
                </div>
                <p className="text-text-secondary font-medium">No complaints found</p>
                <p className="text-text-muted text-sm mt-1">
                    Try adjusting your filters or search query
                </p>
            </div>
        );
    }

    return (
        <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableHeadRow>
                        <TableHead>Submitted By</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-center">Details</TableHead>
                    </TableHeadRow>
                </TableHeader>
                <TableBody>
                    {complaints.map((complaint) => {
                        const status = statusConfig[complaint.status];
                        const source = sourceConfig[complaint.source];
                        const Icon = StatusIcon[complaint.status];

                        return (
                            <TableRow
                                key={complaint.id}
                                isClickable
                                onClick={() => onViewComplaint(complaint)}
                            >
                                {/* Submitter with Source */}
                                <TableCell>
                                    <div>
                                        <div className="font-medium text-text-primary">
                                            {complaint.submittedBy.name}
                                        </div>
                                        <span
                                            className={cn(
                                                "px-1.5 py-0.5 text-[10px] font-medium rounded mt-0.5 inline-block",
                                                source.bg,
                                                source.color
                                            )}
                                        >
                                            {source.label}
                                        </span>
                                    </div>
                                </TableCell>

                                {/* Subject */}
                                <TableCell>
                                    <span className="text-text-primary font-medium truncate block max-w-[200px]">
                                        {complaint.subject}
                                    </span>
                                </TableCell>

                                {/* Category */}
                                <TableCell>
                                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-lg">
                                        {categoryLabels[complaint.category]}
                                    </span>
                                </TableCell>

                                {/* Status */}
                                <TableCell>
                                    <span
                                        className={cn(
                                            "px-2 py-1 text-xs font-medium rounded-lg whitespace-nowrap inline-flex items-center gap-1",
                                            status.bg,
                                            status.color
                                        )}
                                    >
                                        <Icon className="w-3 h-3" />
                                        {status.label}
                                    </span>
                                </TableCell>

                                {/* Date */}
                                <TableCell className="text-text-muted">
                                    {formatDate(complaint.submittedAt)}
                                </TableCell>

                                {/* Action */}
                                <TableCell className="text-center">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onViewComplaint(complaint);
                                        }}
                                        className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-surface-hover text-text-secondary hover:text-accent hover:bg-accent/10 transition-all font-medium text-sm"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View
                                    </button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
