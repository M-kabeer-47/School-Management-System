"use client";

import { useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
} from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import {
    X,
    Mail,
    Phone,
    Calendar,
    MapPin,
    CreditCard,
    Building2,
    GraduationCap,
    BookOpen,
    Clock,
    Shield,
    Pencil,
    UserX,
    AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/common/utils";
import { AnyStaff, TeachingStaff, NonTeachingStaff } from "@/lib/admin/types/staff";

interface StaffDetailsDrawerProps {
    staff: AnyStaff | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit?: (staff: AnyStaff) => void;
    onDeactivate?: (staff: AnyStaff) => void;
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

export function StaffDetailsDrawer({
    staff,
    isOpen,
    onClose,
    onEdit,
    onDeactivate,
}: StaffDetailsDrawerProps) {
    const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

    const handleOpen = (open: boolean) => {
        if (!open) {
            onClose();
            setShowDeactivateConfirm(false);
        }
    };

    const handleDeactivate = () => {
        if (staff && onDeactivate) {
            onDeactivate(staff);
        }
        setShowDeactivateConfirm(false);
        onClose();
    };

    const isTeaching = staff?.staffType === "teaching";
    const teachingStaff = isTeaching ? (staff as TeachingStaff) : null;
    const nonTeachingStaff = !isTeaching ? (staff as NonTeachingStaff) : null;

    return (
        <Drawer direction="right" open={isOpen} onOpenChange={handleOpen}>
            <DrawerContent className="h-full sm:max-w-lg">
                <DrawerHeader className="border-b border-border bg-surface px-6 py-5">
                    <div className="flex items-center justify-between">
                        <DrawerTitle className="text-xl font-bold font-heading text-text-primary">
                            Staff Details
                        </DrawerTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-text-secondary hover:text-text-primary max-w-[40px]"
                            onClick={onClose}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                    <DrawerDescription className="sr-only">
                        Details for {staff?.name}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-text-muted">
                    {staff && (
                        <div className="space-y-6">
                            {/* Profile Section */}
                            <div className="flex items-center gap-4 pb-6 border-b border-border">
                                {staff.avatar ? (
                                    <img
                                        src={staff.avatar}
                                        alt={staff.name}
                                        className="w-20 h-20 rounded-2xl object-cover"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-3xl font-bold">
                                        {staff.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-xl font-bold text-text-primary">
                                        {staff.name}
                                    </h3>
                                    <p className="text-text-secondary">
                                        {staff.designation} • {staff.department}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span
                                            className={cn(
                                                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                                                staff.staffType === "teaching"
                                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                                    : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                            )}
                                        >
                                            {staff.staffType.replace("-", " ")}
                                        </span>
                                        <span
                                            className={cn(
                                                "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                                                statusStyles[staff.status]?.bg,
                                                statusStyles[staff.status]?.text
                                            )}
                                        >
                                            {staff.status.replace("-", " ")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                    Contact Information
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoBlock icon={Mail} label="Email" value={staff.email} />
                                    <InfoBlock icon={Phone} label="Phone" value={staff.phone} />
                                    {staff.whatsapp && (
                                        <InfoBlock icon={Phone} label="WhatsApp" value={staff.whatsapp} />
                                    )}
                                    <InfoBlock icon={MapPin} label="Address" value={staff.address} />
                                </div>
                            </div>

                            {/* Employment Details */}
                            <div className="space-y-4 pt-4 border-t border-border">
                                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                    Employment Details
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoBlock icon={Shield} label="Staff Code" value={staff.staffCode} />
                                    <InfoBlock icon={Building2} label="Department" value={staff.department} />
                                    <InfoBlock
                                        icon={Calendar}
                                        label="Joining Date"
                                        value={new Date(staff.joiningDate).toLocaleDateString(
                                            "en-GB",
                                            { day: "2-digit", month: "short", year: "numeric" }
                                        )}
                                    />
                                    <InfoBlock
                                        icon={CreditCard}
                                        label="Monthly Salary"
                                        value={`Rs. ${staff.salary.toLocaleString()}`}
                                    />
                                    {staff.bankAccount && (
                                        <InfoBlock icon={CreditCard} label="Bank Account" value={staff.bankAccount} />
                                    )}
                                </div>
                            </div>

                            {/* Teaching-Specific Details */}
                            {isTeaching && teachingStaff && (
                                <div className="space-y-4 pt-4 border-t border-border">
                                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                        Teaching Details
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex items-center gap-2 text-text-muted mb-2">
                                                <BookOpen className="w-4 h-4" />
                                                <span className="text-xs font-semibold uppercase tracking-wide">
                                                    Subjects
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {teachingStaff.subjects.map((subject) => (
                                                    <span
                                                        key={subject}
                                                        className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full"
                                                    >
                                                        {subject}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-text-muted mb-2">
                                                <GraduationCap className="w-4 h-4" />
                                                <span className="text-xs font-semibold uppercase tracking-wide">
                                                    Classes Assigned
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {teachingStaff.classes.map((cls) => (
                                                    <span
                                                        key={cls}
                                                        className="px-3 py-1 bg-surface-hover text-text-secondary text-sm font-medium rounded-full"
                                                    >
                                                        Grade {cls}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-text-muted mb-2">
                                                <GraduationCap className="w-4 h-4" />
                                                <span className="text-xs font-semibold uppercase tracking-wide">
                                                    Qualifications
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {teachingStaff.qualifications.map((qual) => (
                                                    <span
                                                        key={qual}
                                                        className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium rounded-full"
                                                    >
                                                        {qual}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        {teachingStaff.specialization && (
                                            <InfoBlock
                                                icon={BookOpen}
                                                label="Specialization"
                                                value={teachingStaff.specialization}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Non-Teaching Specific Details */}
                            {!isTeaching && nonTeachingStaff && (
                                <div className="space-y-4 pt-4 border-t border-border">
                                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                        Role Details
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <InfoBlock icon={Shield} label="Role" value={nonTeachingStaff.role} />
                                        <InfoBlock
                                            icon={Clock}
                                            label="Shift"
                                            value={nonTeachingStaff.shift.replace("-", " ")}
                                        />
                                        {nonTeachingStaff.workArea && (
                                            <InfoBlock
                                                icon={MapPin}
                                                label="Work Area"
                                                value={nonTeachingStaff.workArea}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Emergency Contact */}
                            {(staff.emergencyContact || staff.emergencyPhone) && (
                                <div className="space-y-4 pt-4 border-t border-border">
                                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                        Emergency Contact
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        {staff.emergencyContact && (
                                            <InfoBlock icon={Phone} label="Contact Name" value={staff.emergencyContact} />
                                        )}
                                        {staff.emergencyPhone && (
                                            <InfoBlock icon={Phone} label="Contact Phone" value={staff.emergencyPhone} />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                {staff && (
                    <div className="border-t border-border p-4 bg-surface">
                        {showDeactivateConfirm ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                                    <AlertTriangle className="w-5 h-5" />
                                    <span className="font-medium">
                                        Are you sure you want to deactivate this staff member?
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => setShowDeactivateConfirm(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                        onClick={handleDeactivate}
                                    >
                                        Deactivate
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => onEdit?.(staff)}
                                >
                                    <Pencil className="w-4 h-4" />
                                    Edit
                                </Button>
                                {staff.status === "active" && (
                                    <Button
                                        variant="outline"
                                        className="flex-1 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                                        onClick={() => setShowDeactivateConfirm(true)}
                                    >
                                        <UserX className="w-4 h-4" />
                                        Deactivate
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </DrawerContent>
        </Drawer>
    );
}

// Helper component
const InfoBlock = ({
    icon: Icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: string | number;
}) => (
    <div className="flex items-start gap-3">
        <div className="mt-0.5 text-text-muted">
            <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">
                {label}
            </p>
            <p className="text-sm font-medium text-text-primary mt-0.5 break-words">
                {value || "N/A"}
            </p>
        </div>
    </div>
);
