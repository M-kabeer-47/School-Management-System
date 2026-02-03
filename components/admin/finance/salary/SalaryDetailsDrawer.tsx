"use client";

import { X, Mail, Phone, Building2, Calendar, CreditCard, Printer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { StaffSalary } from "@/lib/admin/types/salary";
import { salaryPayments } from "@/lib/admin/mock-data/salary";

interface SalaryDetailsDrawerProps {
    staff: StaffSalary | null;
    isOpen: boolean;
    onClose: () => void;
}

export function SalaryDetailsDrawer({ staff, isOpen, onClose }: SalaryDetailsDrawerProps) {
    if (!staff) return null;

    const staffPayments = salaryPayments
        .filter(p => p.staffId === staff.staffId)
        .sort((a, b) => b.year - a.year || b.month.localeCompare(a.month))
        .slice(0, 6);

    const totalAllowances = staff.allowances.reduce((sum, a) => sum + a.amount, 0);
    const totalDeductions = staff.deductions.reduce((sum, d) => sum + d.amount, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-lg bg-background border-l border-border z-50 overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between z-10">
                            <h2 className="text-lg font-semibold text-text-primary">
                                Salary Details
                            </h2>
                            <Button variant="ghost" size="sm" onClick={onClose}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Staff Info */}
                            <div className="flex items-center gap-4">
                                {staff.avatar ? (
                                    <img
                                        src={staff.avatar}
                                        alt={staff.staffName}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl">
                                        {staff.staffName.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-xl font-bold text-text-primary">
                                        {staff.staffName}
                                    </h3>
                                    <p className="text-text-secondary">{staff.designation}</p>
                                    <p className="text-sm text-text-muted">{staff.department}</p>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="w-4 h-4 text-text-muted" />
                                    <span className="text-text-secondary">{staff.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="w-4 h-4 text-text-muted" />
                                    <span className="text-text-secondary">{staff.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="w-4 h-4 text-text-muted" />
                                    <span className="text-text-secondary">
                                        Joined {new Date(staff.joiningDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                                {staff.bankAccount && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <CreditCard className="w-4 h-4 text-text-muted" />
                                        <span className="text-text-secondary">{staff.bankAccount}</span>
                                    </div>
                                )}
                            </div>

                            {/* Salary Breakdown */}
                            <div className="bg-surface border border-border rounded-xl p-4 space-y-4">
                                <h4 className="font-semibold text-text-primary">Salary Breakdown</h4>

                                {/* Base Salary */}
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-secondary">Base Salary</span>
                                    <span className="font-medium text-text-primary">
                                        Rs. {staff.baseSalary.toLocaleString()}
                                    </span>
                                </div>

                                {/* Allowances */}
                                {staff.allowances.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-green-600 dark:text-green-400 uppercase">
                                            Allowances
                                        </p>
                                        {staff.allowances.map((a, idx) => (
                                            <div key={idx} className="flex justify-between text-sm pl-3">
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
                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-red-600 dark:text-red-400 uppercase">
                                            Deductions
                                        </p>
                                        {staff.deductions.map((d, idx) => (
                                            <div key={idx} className="flex justify-between text-sm pl-3">
                                                <span className="text-text-muted">{d.name}</span>
                                                <span className="text-red-600 dark:text-red-400">
                                                    - Rs. {d.amount.toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Totals */}
                                <div className="border-t border-border pt-3 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-secondary">Gross Salary</span>
                                        <span className="font-medium text-text-primary">
                                            Rs. {staff.grossSalary.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-text-primary">Net Salary</span>
                                        <span className="font-bold text-accent text-lg">
                                            Rs. {staff.netSalary.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment History */}
                            <div>
                                <h4 className="font-semibold text-text-primary mb-3">Payment History</h4>
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
                                                        {payment.status === "paid" && payment.paidDate
                                                            ? `Paid on ${new Date(payment.paidDate).toLocaleDateString('en-GB')}`
                                                            : "Pending"}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-text-primary text-sm">
                                                        Rs. {payment.netSalary.toLocaleString()}
                                                    </p>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${payment.status === "paid"
                                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                            : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                                        }`}>
                                                        {payment.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
