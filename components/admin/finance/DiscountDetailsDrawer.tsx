"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    User,
    Calendar,
    Percent,
    Edit,
    Trash2,
    CheckCircle,
    AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/common/utils";
import { DiscountedStudent } from "@/lib/admin/types/finance";
import Modal from "@/components/ui/Modal";

interface DiscountDetailsDrawerProps {
    student: DiscountedStudent | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit?: (student: DiscountedStudent) => void;
    onRemove?: (student: DiscountedStudent) => void;
}

export function DiscountDetailsDrawer({
    student,
    isOpen,
    onClose,
    onEdit,
    onRemove,
}: DiscountDetailsDrawerProps) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleOpen = (open: boolean) => {
        if (!open) {
            onClose();
            setShowDeleteConfirm(false);
        }
    };

    const handleRemove = async () => {
        if (!student) return;
        setIsDeleting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsDeleting(false);
        setShowDeleteConfirm(false);
        onRemove?.(student);
        onClose();
    };

    const getDiscountColor = (type: string) => {
        const colors: Record<string, string> = {
            "Sibling Discount": "bg-blue-100 text-blue-700",
            "Staff Child": "bg-purple-100 text-purple-700",
            "Merit Scholarship": "bg-green-100 text-green-700",
            "Need-based": "bg-orange-100 text-orange-700",
        };
        return colors[type] || "bg-gray-100 text-gray-700";
    };

    return (
        <>
            <Drawer direction="right" open={isOpen} onOpenChange={handleOpen}>
                <DrawerContent className="h-full sm:max-w-md">
                    <DrawerHeader className="border-b border-border bg-surface px-6 py-5">
                        <div className="flex items-center justify-between">
                            <DrawerTitle className="text-xl font-bold font-heading text-text-primary">
                                Discount Details
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
                            Discount details for {student?.studentName}
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-text-muted">
                        {student && (
                            <div className="space-y-6">
                                {/* Student Profile */}
                                <div className="flex items-center gap-4 pb-6 border-b border-border">
                                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-2xl font-bold">
                                        {student.studentName.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-text-primary">
                                            {student.studentName}
                                        </h3>
                                        <p className="text-text-secondary">
                                            {student.admissionNo} • Class {student.class}-{student.section}
                                        </p>
                                    </div>
                                </div>

                                {/* Discount Info */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                        Discount Information
                                    </h4>

                                    <div className="bg-surface rounded-xl p-4 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-text-muted text-sm">Discount Type</span>
                                            <span
                                                className={cn(
                                                    "px-3 py-1 rounded-full text-sm font-semibold",
                                                    getDiscountColor(student.discountType)
                                                )}
                                            >
                                                {student.discountType}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-text-muted text-sm">Discount Percentage</span>
                                            <span className="text-2xl font-bold text-green-600">
                                                {student.discountPercentage}%
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-text-muted text-sm">Monthly Savings</span>
                                            <span className="font-semibold text-text-primary">
                                                Rs. {student.monthlyDiscount.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Reason */}
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                        Reason
                                    </h4>
                                    <p className="text-text-secondary bg-surface rounded-xl p-4">
                                        {student.reason}
                                    </p>
                                </div>

                                {/* Validity & Approval */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                        Approval Details
                                    </h4>

                                    <div className="grid grid-cols-2 gap-4">
                                        <InfoBlock
                                            icon={User}
                                            label="Approved By"
                                            value={student.approvedBy}
                                        />
                                        <InfoBlock
                                            icon={Calendar}
                                            label="Valid From"
                                            value={new Date(student.validFrom).toLocaleDateString()}
                                        />
                                        <InfoBlock
                                            icon={Calendar}
                                            label="Valid To"
                                            value={student.validTo ? new Date(student.validTo).toLocaleDateString() : "Ongoing"}
                                        />
                                        <InfoBlock
                                            icon={Percent}
                                            label="Status"
                                            value="Active"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    {student && (
                        <div className="border-t border-border p-4 bg-surface flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                                onClick={() => setShowDeleteConfirm(true)}
                            >
                                <Trash2 className="w-4 h-4" />
                                Remove Discount
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={() => onEdit?.(student)}
                            >
                                <Edit className="w-4 h-4" />
                                Edit Discount
                            </Button>
                        </div>
                    )}
                </DrawerContent>
            </Drawer>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                title="Remove Discount"
                description="Are you sure you want to remove this discount?"
                icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
                maxWidth="sm"
            >
                <div className="space-y-4 pt-2">
                    <p className="text-text-secondary text-sm">
                        This will remove the <strong>{student?.discountType}</strong> discount
                        for <strong>{student?.studentName}</strong>. The student will be charged
                        full fees from the next billing cycle.
                    </p>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            variant="ghost"
                            onClick={() => setShowDeleteConfirm(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleRemove}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                    />
                                    Removing...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4" />
                                    Remove Discount
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
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
    <div className="flex items-start gap-3 bg-surface rounded-xl p-3">
        <div className="mt-0.5 text-text-muted">
            <Icon className="w-4 h-4" />
        </div>
        <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">
                {label}
            </p>
            <p className="text-sm font-medium text-text-primary mt-0.5">
                {value || "N/A"}
            </p>
        </div>
    </div>
);
