"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import { CheckCircle, Loader2, X } from "lucide-react";
import { expenseCategories } from "@/lib/admin/mock-data/expenses";

interface AddExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd?: (expense: any) => void;
}

export function AddExpenseModal({ isOpen, onClose, onAdd }: AddExpenseModalProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split("T")[0],
        category: "",
        description: "",
        amount: "",
        paymentMethod: "cash",
        vendor: "",
        remarks: "",
    });

    const resetForm = () => {
        setFormData({
            date: new Date().toISOString().split("T")[0],
            category: "",
            description: "",
            amount: "",
            paymentMethod: "cash",
            vendor: "",
            remarks: "",
        });
        setSaveSuccess(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = async () => {
        if (!formData.category || !formData.description || !formData.amount) {
            return;
        }

        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSaving(false);
        setSaveSuccess(true);

        if (onAdd) {
            onAdd({
                id: `exp-${Date.now()}`,
                ...formData,
                amount: parseFloat(formData.amount),
                addedBy: "Current User",
                status: "pending",
            });
        }

        setTimeout(() => {
            handleClose();
        }, 1500);
    };

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Add New Expense">
            <div className="space-y-5">
                {saveSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-8"
                    >
                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary">
                            Expense Added!
                        </h3>
                        <p className="text-sm text-text-muted mt-1">
                            Pending approval from administrator
                        </p>
                    </motion.div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-text-secondary mb-2 block">
                                    Date *
                                </label>
                                <Input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => updateField("date", e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-text-secondary mb-2 block">
                                    Category *
                                </label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => updateField("category", value)}
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
                        </div>

                        <div>
                            <label className="text-sm font-medium text-text-secondary mb-2 block">
                                Description *
                            </label>
                            <Input
                                value={formData.description}
                                onChange={(e) => updateField("description", e.target.value)}
                                placeholder="Brief description of the expense"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-text-secondary mb-2 block">
                                    Amount (Rs.) *
                                </label>
                                <Input
                                    type="number"
                                    value={formData.amount}
                                    onChange={(e) => updateField("amount", e.target.value)}
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-text-secondary mb-2 block">
                                    Payment Method
                                </label>
                                <Select
                                    value={formData.paymentMethod}
                                    onValueChange={(value) => updateField("paymentMethod", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="bank">Bank Transfer</SelectItem>
                                        <SelectItem value="online">Online</SelectItem>
                                        <SelectItem value="cheque">Cheque</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-text-secondary mb-2 block">
                                Vendor
                            </label>
                            <Input
                                value={formData.vendor}
                                onChange={(e) => updateField("vendor", e.target.value)}
                                placeholder="Vendor name"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-text-secondary mb-2 block">
                                Remarks
                            </label>
                            <Input
                                value={formData.remarks}
                                onChange={(e) => updateField("remarks", e.target.value)}
                                placeholder="Additional notes (optional)"
                            />
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-border">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={handleClose}
                                disabled={isSaving}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={handleSubmit}
                                disabled={isSaving || !formData.category || !formData.description || !formData.amount}
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    "Add Expense"
                                )}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
}
