import {
  CheckCircle2,
  Clock,
  AlertCircle,
  MinusCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/common/utils";

// ==========================================
// RESULT STATUS TYPES & UTILITIES
// ==========================================

export type ResultStatus = "complete" | "in-progress" | "not-started";
export type StudentStatus = "checked" | "unchecked" | "absent";
export type PaymentStatus = "paid" | "pending" | "overdue";
export type UploadStatus = "uploaded" | "pending" | "overdue";
export type HomeworkStatus = "checked" | "not-checked";
export type GeneralStatus =
  | "active"
  | "inactive"
  | "approved"
  | "rejected"
  | "success"
  | "warning"
  | "error";
export type ComplaintStatus = "pending" | "in-progress" | "resolved";

/**
 * Determine result status based on completion percentage
 */
export const getResultStatus = (percent: number): ResultStatus => {
  if (percent === 100) return "complete";
  if (percent > 0) return "in-progress";
  return "not-started";
};

// ==========================================
// RESULT STATUS CONFIGURATION
// ==========================================

export const resultStatusConfig = {
  complete: {
    icon: CheckCircle2,
    label: "Complete",
    bgLight: "bg-success/10",
    text: "text-success",
    border: "border-success/20",
    dot: "bg-success",
    progressBar: "bg-success",
  },
  "in-progress": {
    icon: Clock,
    label: "In Progress",
    bgLight: "bg-pending/10",
    text: "text-pending",
    border: "border-pending/20",
    dot: "bg-pending",
    progressBar: "bg-pending",
  },
  "not-started": {
    icon: AlertCircle,
    label: "Not Started",
    bgLight: "bg-error/10",
    text: "text-error",
    border: "border-error/20",
    dot: "bg-error",
    progressBar: "bg-error",
  },
} as const;

// ==========================================
// STUDENT STATUS CONFIGURATION
// ==========================================

export const studentStatusConfig = {
  checked: {
    icon: CheckCircle2,
    label: "Checked",
    bgLight: "bg-success/10",
    text: "text-success",
    border: "border-success/20",
  },
  unchecked: {
    icon: Clock,
    label: "Pending",
    bgLight: "bg-pending/10",
    text: "text-pending",
    border: "border-pending/20",
  },
  absent: {
    icon: MinusCircle,
    label: "Absent",
    bgLight: "bg-neutral/10",
    text: "text-neutral",
    border: "border-neutral/20",
  },
} as const;

// ==========================================
// PAYMENT STATUS CONFIGURATION
// ==========================================

export const paymentStatusConfig = {
  paid: {
    icon: CheckCircle2,
    label: "Paid",
    bgLight: "bg-success/10",
    text: "text-success",
    border: "border-success/20",
  },
  pending: {
    icon: Clock,
    label: "Pending",
    bgLight: "bg-pending/10",
    text: "text-pending",
    border: "border-pending/20",
  },
  overdue: {
    icon: AlertCircle,
    label: "Overdue",
    bgLight: "bg-error/10",
    text: "text-error",
    border: "border-error/20",
  },
} as const;

// ==========================================
// UPLOAD/PAPER STATUS CONFIGURATION
// ==========================================

export const uploadStatusConfig = {
  uploaded: {
    icon: CheckCircle2,
    label: "Uploaded",
    bgLight: "bg-success/10",
    text: "text-success",
    border: "border-success/20",
  },
  pending: {
    icon: Clock,
    label: "Pending",
    bgLight: "bg-pending/10",
    text: "text-pending",
    border: "border-pending/20",
  },
  overdue: {
    icon: AlertCircle,
    label: "Overdue",
    bgLight: "bg-error/10",
    text: "text-error",
    border: "border-error/20",
  },
} as const;

// ==========================================
// HOMEWORK STATUS CONFIGURATION
// ==========================================

export const homeworkStatusConfig = {
  checked: {
    icon: CheckCircle2,
    label: "Checked",
    bgLight: "bg-success/10",
    text: "text-success",
    border: "border-success/20",
  },
  "not-checked": {
    icon: Clock,
    label: "Not Checked",
    bgLight: "bg-pending/10",
    text: "text-pending",
    border: "border-pending/20",
  },
} as const;

// ==========================================
// GENERAL STATUS CONFIGURATION
// ==========================================

export const generalStatusConfig = {
  active: {
    icon: CheckCircle2,
    label: "Active",
    bgLight: "bg-success/10",
    text: "text-success",
    border: "border-success/20",
  },
  inactive: {
    icon: MinusCircle,
    label: "Inactive",
    bgLight: "bg-neutral/10",
    text: "text-neutral",
    border: "border-neutral/20",
  },
  approved: {
    icon: CheckCircle2,
    label: "Approved",
    bgLight: "bg-success/10",
    text: "text-success",
    border: "border-success/20",
  },
  rejected: {
    icon: XCircle,
    label: "Rejected",
    bgLight: "bg-error/10",
    text: "text-error",
    border: "border-error/20",
  },
  success: {
    icon: CheckCircle2,
    label: "Success",
    bgLight: "bg-success/10",
    text: "text-success",
    border: "border-success/20",
  },
  warning: {
    icon: AlertCircle,
    label: "Warning",
    bgLight: "bg-pending/10",
    text: "text-pending",
    border: "border-pending/20",
  },
  error: {
    icon: XCircle,
    label: "Error",
    bgLight: "bg-error/10",
    text: "text-error",
    border: "border-error/20",
  },
} as const;

// ==========================================
// COMPLAINT STATUS CONFIGURATION
// ==========================================

export const complaintStatusConfig = {
  pending: {
    icon: Clock,
    label: "Pending",
    bgLight: "bg-pending/10",
    text: "text-pending",
  },
  "in-progress": {
    icon: AlertCircle,
    label: "In Progress",
    bgLight: "bg-info/10",
    text: "text-info",
  },
  resolved: {
    icon: CheckCircle2,
    label: "Resolved",
    bgLight: "bg-success/10",
    text: "text-success",
  },
} as const;

// ==========================================
// REUSABLE STATUS COMPONENTS
// ==========================================

interface StatusBadgeProps {
  status: ResultStatus;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Status badge for result completion status
 */
export function ResultStatusBadge({
  status,
  size = "sm",
  className,
}: StatusBadgeProps) {
  const config = resultStatusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5 min-w-[90px] justify-center",
    md: "px-3 py-1.5 text-sm gap-2 min-w-[110px] justify-center",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg font-semibold border",
        sizeClasses[size],
        config.bgLight,
        config.text,
        config.border,
        className,
      )}
    >
      <Icon className={iconSizes[size]} />
      {config.label}
    </span>
  );
}

interface StudentStatusBadgeProps {
  status: StudentStatus;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Status badge for individual student paper status
 */
export function StudentStatusBadge({
  status,
  size = "sm",
  className,
}: StudentStatusBadgeProps) {
  const config = studentStatusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-sm gap-1.5",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
  };

  return (
    <span
      className={cn(
        "flex justify-center items-center rounded-lg max-w-[100px]  font-medium",
        sizeClasses[size],
        config.bgLight,
        config.text,
        className,
      )}
    >
      <Icon className={iconSizes[size]} />
      {config.label}
    </span>
  );
}

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Status badge for payment/fee status
 */
export function PaymentStatusBadge({
  status,
  size = "sm",
  className,
}: PaymentStatusBadgeProps) {
  const config = paymentStatusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5 min-w-[80px] justify-center",
    md: "px-3 py-1.5 text-sm gap-2 min-w-[100px] justify-center",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
  };

  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-lg font-semibold max-w-[100px]",
        sizeClasses[size],
        config.bgLight,
        config.text,
        className,
      )}
    >
      <Icon className={iconSizes[size]} />
      {config.label}
    </span>
  );
}

interface UploadStatusBadgeProps {
  status: UploadStatus;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Status badge for upload/paper submission status
 */
export function UploadStatusBadge({
  status,
  size = "sm",
  className,
}: UploadStatusBadgeProps) {
  const config = uploadStatusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5 min-w-[90px] justify-center",
    md: "px-3 py-1.5 text-sm gap-2 min-w-[110px] justify-center",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
  };

  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-lg font-semibold max-w-[100px]",
        sizeClasses[size],
        config.bgLight,
        config.text,
        config.border,
        className,
      )}
    >
      <Icon className={iconSizes[size]} />
      {config.label}
    </span>
  );
}

interface HomeworkStatusBadgeProps {
  status: HomeworkStatus;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Status badge for homework check status
 */
export function HomeworkStatusBadge({
  status,
  size = "sm",
  className,
}: HomeworkStatusBadgeProps) {
  const config = homeworkStatusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3 py-1.5 text-sm gap-2",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg font-semibold",
        sizeClasses[size],
        config.bgLight,
        config.text,
        className,
      )}
    >
      <Icon className={iconSizes[size]} />
      {config.label}
    </span>
  );
}

interface GeneralStatusBadgeProps {
  status: GeneralStatus;
  size?: "sm" | "md";
  className?: string;
  showIcon?: boolean;
}

/**
 * General purpose status badge for various statuses
 */
export function GeneralStatusBadge({
  status,
  size = "sm",
  className,
  showIcon = true,
}: GeneralStatusBadgeProps) {
  const config = generalStatusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3 py-1.5 text-sm gap-2",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg font-semibold",
        sizeClasses[size],
        config.bgLight,
        config.text,
        className,
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {config.label}
    </span>
  );
}

interface StatusDotProps {
  status: ResultStatus;
  size?: "sm" | "md";
  className?: string;
  pulse?: boolean;
}

/**
 * Simple status dot indicator
 */
export function StatusDot({
  status,
  size = "sm",
  className,
  pulse = false,
}: StatusDotProps) {
  const config = resultStatusConfig[status];

  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
  };

  return (
    <span
      className={cn(
        "rounded-full",
        sizeClasses[size],
        config.dot,
        pulse && status !== "complete" && "animate-pulse",
        className,
      )}
    />
  );
}

/**
 * Get progress bar color class based on percentage
 */
export function getProgressBarColor(percent: number): string {
  const status = getResultStatus(percent);
  return resultStatusConfig[status].progressBar;
}

interface ComplaintStatusBadgeProps {
  status: ComplaintStatus;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Status badge for complaint/issue status
 */
export function ComplaintStatusBadge({
  status,
  size = "sm",
  className,
}: ComplaintStatusBadgeProps) {
  const config = complaintStatusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5 min-w-[100px] justify-center",
    md: "px-3 py-1.5 text-sm gap-2 min-w-[120px] justify-center",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
  };

  return (
    <span
      className={cn(
        "flex items-center rounded-lg font-semibold max-w-[110px]",
        sizeClasses[size],
        config.bgLight,
        config.text,

        className,
      )}
    >
      <Icon className={iconSizes[size]} />
      {config.label}
    </span>
  );
}
