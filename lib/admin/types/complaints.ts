// Admin Complaints Types - extends base Complaint type for admin functionality

export type ComplaintStatus = "pending" | "in-progress" | "resolved";
export type ComplaintCategory = "academic" | "facilities" | "transport" | "fees" | "staff" | "other";
export type ComplaintSource = "student" | "instructor";

export interface ComplaintResponse {
    id: string;
    message: string;
    respondedBy: string;
    respondedAt: string;
}

export interface SubmitterInfo {
    id: string;
    name: string;
    email: string;
    class?: string; // Only for students
    department?: string; // Only for instructors
}

export interface AdminComplaint {
    id: string;
    subject: string;
    category: ComplaintCategory;
    message: string;
    status: ComplaintStatus;
    submittedAt: string;
    source: ComplaintSource;
    submittedBy: SubmitterInfo;
    responses: ComplaintResponse[];
}

export interface ComplaintsFilters {
    search: string;
    status: ComplaintStatus | "all";
    source: ComplaintSource | "all";
    category: ComplaintCategory | "all";
}

export const statusConfig: Record<ComplaintStatus, { label: string; color: string; bg: string }> = {
    pending: {
        label: "Pending",
        color: "text-warning",
        bg: "bg-warning-light",
    },
    "in-progress": {
        label: "In Progress",
        color: "text-info",
        bg: "bg-info-light",
    },
    resolved: {
        label: "Resolved",
        color: "text-success",
        bg: "bg-success-light",
    },
};

export const categoryLabels: Record<ComplaintCategory, string> = {
    academic: "Academic",
    facilities: "Facilities",
    transport: "Transport",
    fees: "Fees",
    staff: "Staff",
    other: "Other",
};

export const sourceConfig: Record<ComplaintSource, { label: string; color: string; bg: string }> = {
    student: {
        label: "Student",
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    instructor: {
        label: "Instructor",
        color: "text-purple-600 dark:text-purple-400",
        bg: "bg-purple-100 dark:bg-purple-900/30",
    },
};
