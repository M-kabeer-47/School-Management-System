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
    X,
    Mail,
    Phone,
    Calendar,
    CreditCard,
    Pencil,
    CheckCircle,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/common/utils";
import { StaffSalary } from "@/lib/admin/types/salary";
import { salaryPayments } from "@/lib/admin/mock-data/salary";

interface SalaryDetailsDrawerProps {
    staff: StaffSalary | null;
    isOpen: boolean;
    onClose: () => void;
    onSalaryUpdate?: (staff: StaffSalary) => void;
}

export function SalaryDetailsDrawer({
    staff,
    isOpen,
    onClose,
    onSalaryUpdate,
}: SalaryDetailsDrawerProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [editedSalary, setEditedSalary] = useState({
        baseSalary: "",
        allowances: [] as { name: string; amount: string }[],
        deductions: [] as { name: string; amount: string }[],
    });

    // Reset state when staff changes or drawer closes
    useEffect(() => {
        if (staff && isOpen) {
            setEditedSalary({
                baseSalary: staff.baseSalary.toString(),
                allowances: staff.allowances.map((a) => ({
                    name: a.name,
                    amount: a.amount.toString(),
                })),
                deductions: staff.deductions.map((d) => ({
                    name: d.name,
                    amount: d.amount.toString(),
                })),
            });
            setIsEditing(false);
            setSaveSuccess(false);
        }
    }, [staff, isOpen]);

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

        if (staff && onSalaryUpdate) {
            const updatedStaff: StaffSalary = {
                ...staff,
                baseSalary: parseFloat(editedSalary.baseSalary) || 0,
                allowances: editedSalary.allowances.map((a) => ({
                    name: a.name,
                    amount: parseFloat(a.amount) || 0,
                })),
                deductions: editedSalary.deductions.map((d) => ({
                    name: d.name,
                    amount: parseFloat(d.amount) || 0,
                })),
            };
            onSalaryUpdate(updatedStaff);
        }

        setTimeout(() => setSaveSuccess(false), 2000);
    };

    const handleCancel = () => {
        if (staff) {
            setEditedSalary({
                baseSalary: staff.baseSalary.toString(),
                allowances: staff.allowances.map((a) => ({
                    name: a.name,
                    amount: a.amount.toString(),
                })),
                deductions: staff.deductions.map((d) => ({
                    name: d.name,
                    amount: d.amount.toString(),
                })),
            });
        }
        setIsEditing(false);
    };

    const updateAllowance = (index: number, value: string) => {
        setEditedSalary((prev) => ({
            ...prev,
            allowances: prev.allowances.map((a, i) =>
                i === index ? { ...a, amount: value } : a
            ),
        }));
    };

    const updateDeduction = (index: number, value: string) => {
        setEditedSalary((prev) => ({
            ...prev,
            deductions: prev.deductions.map((d, i) =>
                i === index ? { ...d, amount: value } : d
            ),
        }));
    };

    // Calculate totals
    const baseSalary = parseFloat(editedSalary.baseSalary) || 0;
    const totalAllowances = editedSalary.allowances.reduce(
        (sum, a) => sum + (parseFloat(a.amount) || 0),
        0
    );
    const totalDeductions = editedSalary.deductions.reduce(
        (sum, d) => sum + (parseFloat(d.amount) || 0),
        0
    );
    const grossSalary = baseSalary + totalAllowances;
    const netSalary = grossSalary - totalDeductions;

    // Get payment history
    const staffPayments = staff
        ? salaryPayments
            .filter((p) => p.staffId === staff.staffId)
            .sort((a, b) => b.year - a.year || b.month.localeCompare(a.month))
            .slice(0, 6)
        : [];

    return (
        <Drawer direction="right" open={isOpen} onOpenChange={handleOpen}>
            <DrawerContent className="h-full sm:max-w-md">
                <DrawerHeader className="border-b border-border bg-surface px-6 py-5">
                    <div className="flex items-center justify-between">
                        <DrawerTitle className="text-xl font-bold font-heading text-text-primary">
                            {isEditing ? "Edit Salary" : "Salary Details"}
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
                        Salary details for {staff?.staffName}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-text-muted">
                    {staff && (
                        <div className="space-y-6">
                            {/* Staff Profile */}
                            <div className="flex items-center gap-4 pb-6 border-b border-border">
                                {staff.avatar ? (
                                    <img
                                        src={staff.avatar}
                                        alt={staff.staffName}
                                        className="w-16 h-16 rounded-2xl object-cover"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-2xl font-bold">
                                        {staff.staffName.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-bold text-text-primary">
                                        {staff.staffName}
                                    </h3>
                                    <p className="text-text-secondary">
                                        {staff.designation} • {staff.department}
                                    </p>
                                    <span
                                        className={cn(
                                            "inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                                            staff.staffType === "teaching"
                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                                : staff.staffType === "non-teaching"
                                                    ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                                    : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                        )}
                                    >
                                        {staff.staffType.replace("-", " ")}
                                    </span>
                                </div>
                            </div>

                            {/* Staff Info - Only show when not editing */}
                            {!isEditing && (
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                        Staff Information
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <InfoBlock icon={Mail} label="Email" value={staff.email} />
                                        <InfoBlock icon={Phone} label="Phone" value={staff.phone} />
                                        <InfoBlock
                                            icon={Calendar}
                                            label="Joined"
                                            value={new Date(staff.joiningDate).toLocaleDateString(
                                                "en-GB",
                                                { day: "2-digit", month: "short", year: "numeric" }
                                            )}
                                        />
                                        <InfoBlock
                                            icon={CreditCard}
                                            label="Bank Account"
                                            value={staff.bankAccount || "N/A"}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Salary Breakdown - View Mode */}
                            {!isEditing && (
                                <div className="space-y-4 pt-4 border-t border-border">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                            Salary Breakdown
                                        </h4>
                                        {saveSuccess && (
                                            <motion.span
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1"
                                            >
                                                <CheckCircle className="w-3 h-3" />
                                                Saved
                                            </motion.span>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        {/* Base Salary */}
                                        <div className="flex justify-between text-sm py-2 border-b border-border">
                                            <span className="text-text-secondary">Base Salary</span>
                                            <span className="font-medium text-text-primary">
                                                Rs. {staff.baseSalary.toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Allowances */}
                                        {staff.allowances.length > 0 && (
                                            <div className="space-y-1 pt-2">
                                                <p className="text-xs font-medium text-green-600 dark:text-green-400 uppercase">
                                                    Allowances
                                                </p>
                                                {staff.allowances.map((a, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex justify-between text-sm py-1 pl-3"
                                                    >
                                                        <span className="text-text-muted">{a.name}</span>
                                                        <span className="text-green-600 dark:text-green-400">
                                                            + Rs. {a.amount.toLocaleString()}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Deductions */}
                                        {staff.deductions.length > 0 && (
                                            <div className="space-y-1 pt-2">
                                                <p className="text-xs font-medium text-red-600 dark:text-red-400 uppercase">
                                                    Deductions
                                                </p>
                                                {staff.deductions.map((d, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex justify-between text-sm py-1 pl-3"
                                                    >
                                                        <span className="text-text-muted">{d.name}</span>
                                                        <span className="text-red-600 dark:text-red-400">
                                                            - Rs. {d.amount.toLocaleString()}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Totals */}
                                        <div className="border-t border-border pt-3 mt-3 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-text-secondary">Gross Salary</span>
                                                <span className="font-medium text-text-primary">
                                                    Rs. {staff.grossSalary.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-lg font-bold">
                                                <span className="text-text-primary">Net Salary</span>
                                                <span className="text-accent">
                                                    Rs. {staff.netSalary.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Salary Edit Form */}
                            {isEditing && (
                                <div className="space-y-6">
                                    {/* Base Salary */}
                                    <div>
                                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                                            Base Salary
                                        </label>
                                        <Input
                                            type="number"
                                            value={editedSalary.baseSalary}
                                            onChange={(e) =>
                                                setEditedSalary((prev) => ({
                                                    ...prev,
                                                    baseSalary: e.target.value,
                                                }))
                                            }
                                            placeholder="Enter base salary"
                                        />
                                    </div>

                                    {/* Allowances */}
                                    {editedSalary.allowances.length > 0 && (
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
                                                Allowances
                                            </h4>
                                            <div className="space-y-3">
                                                {editedSalary.allowances.map((a, idx) => (
                                                    <div key={idx}>
                                                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                                                            {a.name}
                                                        </label>
                                                        <Input
                                                            type="number"
                                                            value={a.amount}
                                                            onChange={(e) =>
                                                                updateAllowance(idx, e.target.value)
                                                            }
                                                            placeholder={`Enter ${a.name.toLowerCase()}`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Deductions */}
                                    {editedSalary.deductions.length > 0 && (
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                                                Deductions
                                            </h4>
                                            <div className="space-y-3">
                                                {editedSalary.deductions.map((d, idx) => (
                                                    <div key={idx}>
                                                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                                                            {d.name}
                                                        </label>
                                                        <Input
                                                            type="number"
                                                            value={d.amount}
                                                            onChange={(e) =>
                                                                updateDeduction(idx, e.target.value)
                                                            }
                                                            placeholder={`Enter ${d.name.toLowerCase()}`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Live Calculation Preview */}
                                    <div className="bg-surface border border-border rounded-xl p-4 space-y-3">
                                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                            Salary Preview
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-text-muted">Base Salary</span>
                                                <span className="text-text-primary">
                                                    Rs. {baseSalary.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-text-muted">Total Allowances</span>
                                                <span className="text-green-600 dark:text-green-400">
                                                    + Rs. {totalAllowances.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-text-muted">Total Deductions</span>
                                                <span className="text-red-600 dark:text-red-400">
                                                    - Rs. {totalDeductions.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="border-t border-border pt-2 mt-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-text-secondary">Gross Salary</span>
                                                    <span className="font-medium text-text-primary">
                                                        Rs. {grossSalary.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between font-bold mt-1">
                                                    <span className="text-text-primary">Net Salary</span>
                                                    <span className="text-accent text-lg">
                                                        Rs. {netSalary.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Payment History - Only show when not editing */}
                            {!isEditing && (
                                <div className="space-y-4 pt-4 border-t border-border">
                                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                        Recent Payments
                                    </h4>
                                    {staffPayments.length === 0 ? (
                                        <p className="text-sm text-text-muted text-center py-4">
                                            No payment history
                                        </p>
                                    ) : (
                                        <div className="space-y-2">
                                            {staffPayments.map((payment) => (
                                                <div
                                                    key={payment.id}
                                                    className="flex items-center justify-between p-3 bg-surface border border-border rounded-lg"
                                                >
                                                    <div>
                                                        <p className="font-medium text-text-primary text-sm">
                                                            {payment.month}
                                                        </p>
                                                        <p className="text-xs text-text-muted">
                                                            {payment.status === "paid" &&
                                                                payment.paidDate
                                                                ? `Paid on ${new Date(
                                                                    payment.paidDate
                                                                ).toLocaleDateString("en-GB")}`
                                                                : "Pending"}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-text-primary text-sm">
                                                            Rs. {payment.netSalary.toLocaleString()}
                                                        </p>
                                                        <span
                                                            className={`text-xs px-2 py-0.5 rounded-full ${payment.status === "paid"
                                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                                    : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                                                }`}
                                                        >
                                                            {payment.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                {staff && (
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
                                Edit Salary
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
            <p className="text-sm font-medium text-text-primary mt-0.5">
                {value || "N/A"}
            </p>
        </div>
    </div>
);
