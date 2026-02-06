"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
} from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import {
    X,
    Calendar,
    CreditCard,
    Building2,
    FileText,
    User,
    CheckCircle,
    Loader2,
    Pencil,
    Tag,
} from "lucide-react";
import { cn } from "@/lib/common/utils";
import { Expense } from "@/lib/admin/types/finance";
import { expenseCategories } from "@/lib/admin/mock-data/expenses";
import { GeneralStatusBadge, GeneralStatus } from "@/utils/status-styles";

interface ExpenseDrawerProps {
    expense: Expense | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdate?: (expense: Expense) => void;
}

export function ExpenseDrawer({
    expense,
    isOpen,
    onClose,
    onUpdate,
}: ExpenseDrawerProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [editedExpense, setEditedExpense] = useState({
        category: "",
        description: "",
        amount: "",
        vendor: "",
        remarks: "",
    });

    useEffect(() => {
        if (expense && isOpen) {
            setEditedExpense({
                category: expense.category,
                description: expense.description,
                amount: expense.amount.toString(),
                vendor: expense.vendor || "",
                remarks: expense.remarks || "",
            });
            setIsEditing(false);
            setSaveSuccess(false);
        }
    }, [expense, isOpen]);

    const handleOpen = (open: boolean) => {
        if (!open) {
            onClose();
            setIsEditing(false);
            setSaveSuccess(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSaving(false);
        setSaveSuccess(true);
        setIsEditing(false);

        if (expense && onUpdate) {
            onUpdate({
                ...expense,
                category: editedExpense.category,
                description: editedExpense.description,
                amount: parseFloat(editedExpense.amount) || 0,
                vendor: editedExpense.vendor,
                remarks: editedExpense.remarks,
            });
        }

        setTimeout(() => setSaveSuccess(false), 2000);
    };

    const handleCancel = () => {
        if (expense) {
            setEditedExpense({
                category: expense.category,
                description: expense.description,
                amount: expense.amount.toString(),
                vendor: expense.vendor || "",
                remarks: expense.remarks || "",
            });
        }
        setIsEditing(false);
    };

    const getGeneralStatus = (status: string): GeneralStatus => {
        if (status === "approved") return "success";
        if (status === "rejected") return "error";
        return "warning"; // pending
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <Drawer direction="right" open={isOpen} onOpenChange={handleOpen}>
            <DrawerContent className="h-full sm:max-w-md">
                <DrawerHeader className="border-b border-border bg-surface px-6 py-5">
                    <div className="flex items-center justify-between">
                        <DrawerTitle className="text-xl font-bold font-heading text-text-primary">
                            {isEditing ? "Edit Expense" : "Expense Details"}
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
                        Expense details for {expense?.description}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-text-muted">
                    {expense && (
                        <div className="space-y-6">
                            {/* Status and Amount Header */}
                            {!isEditing && (
                                <div className="flex items-center justify-between pb-6 border-b border-border">
                                    <div>
                                        <GeneralStatusBadge
                                            status={getGeneralStatus(expense.status)}
                                            size="sm"
                                        />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-text-muted">Amount</p>
                                        <p className="text-2xl font-bold text-accent">
                                            Rs. {expense.amount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* View Mode */}
                            {!isEditing && (
                                <>
                                    {/* Expense Info */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                            Expense Information
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <InfoBlock
                                                icon={Calendar}
                                                label="Date"
                                                value={formatDate(expense.date)}
                                            />
                                            <InfoBlock
                                                icon={Tag}
                                                label="Category"
                                                value={expense.category}
                                            />
                                            <InfoBlock
                                                icon={Building2}
                                                label="Vendor"
                                                value={expense.vendor || "N/A"}
                                            />
                                            <InfoBlock
                                                icon={CreditCard}
                                                label="Payment"
                                                value={expense.paymentMethod}
                                            />
                                            <InfoBlock
                                                icon={FileText}
                                                label="Receipt No"
                                                value={expense.receiptNo || "N/A"}
                                            />
                                            <InfoBlock
                                                icon={User}
                                                label="Added By"
                                                value={expense.addedBy}
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2 pt-4 border-t border-border">
                                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                            Description
                                        </h4>
                                        <p className="text-text-primary">{expense.description}</p>
                                    </div>

                                    {/* Remarks */}
                                    {expense.remarks && (
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                                Remarks
                                            </h4>
                                            <p className="text-text-secondary text-sm">
                                                {expense.remarks}
                                            </p>
                                        </div>
                                    )}

                                    {/* Approval Info */}
                                    {expense.approvedBy && (
                                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                                    Approved by {expense.approvedBy}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {saveSuccess && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4"
                                        >
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                                    Changes saved successfully
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </>
                            )}

                            {/* Edit Mode */}
                            {isEditing && (
                                <div className="space-y-5">
                                    <div>
                                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                                            Category
                                        </label>
                                        <Select
                                            value={editedExpense.category}
                                            onValueChange={(value) =>
                                                setEditedExpense((prev) => ({ ...prev, category: value }))
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                {expenseCategories.map((cat) => (
                                                    <SelectItem key={cat.id} value={cat.name}>
                                                        {cat.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                                            Description
                                        </label>
                                        <Input
                                            value={editedExpense.description}
                                            onChange={(e) =>
                                                setEditedExpense((prev) => ({
                                                    ...prev,
                                                    description: e.target.value,
                                                }))
                                            }
                                            placeholder="Enter expense description"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                                            Amount (Rs.)
                                        </label>
                                        <Input
                                            type="number"
                                            value={editedExpense.amount}
                                            onChange={(e) =>
                                                setEditedExpense((prev) => ({
                                                    ...prev,
                                                    amount: e.target.value,
                                                }))
                                            }
                                            placeholder="Enter amount"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                                            Vendor
                                        </label>
                                        <Input
                                            value={editedExpense.vendor}
                                            onChange={(e) =>
                                                setEditedExpense((prev) => ({
                                                    ...prev,
                                                    vendor: e.target.value,
                                                }))
                                            }
                                            placeholder="Enter vendor name"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                                            Remarks
                                        </label>
                                        <Input
                                            value={editedExpense.remarks}
                                            onChange={(e) =>
                                                setEditedExpense((prev) => ({
                                                    ...prev,
                                                    remarks: e.target.value,
                                                }))
                                            }
                                            placeholder="Additional notes (optional)"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                {expense && (
                    <div className="border-t border-border p-4 bg-surface flex gap-3">
                        {isEditing ? (
                            <>
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={handleCancel}
                                    disabled={isSaving}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={handleSave}
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setIsEditing(true)}
                            >
                                <Pencil className="w-4 h-4" />
                                Edit Expense
                            </Button>
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
        <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">
                {label}
            </p>
            <p className="text-sm font-medium text-text-primary mt-0.5 capitalize">
                {value || "N/A"}
            </p>
        </div>
    </div>
);
