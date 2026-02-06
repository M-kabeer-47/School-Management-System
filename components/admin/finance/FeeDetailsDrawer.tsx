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
    CreditCard,
    Printer,
    CheckCircle,
    User,
    Calendar,
    Phone,
    FileText,
} from "lucide-react";
import { StudentFeeRecord } from "@/lib/admin/types/finance";
import { PaymentStatusBadge, PaymentStatus } from "@/utils/status-styles";

interface FeeDetailsDrawerProps {
    record: StudentFeeRecord | null;
    isOpen: boolean;
    onClose: () => void;
    onPaymentComplete?: () => void;
}

export function FeeDetailsDrawer({
    record,
    isOpen,
    onClose,
    onPaymentComplete,
}: FeeDetailsDrawerProps) {
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [paymentAmount, setPaymentAmount] = useState("");
    const [receiptNo, setReceiptNo] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Reset state when record changes
    const handleOpen = (open: boolean) => {
        if (!open) {
            onClose();
            setPaymentSuccess(false);
        }
    };

    // Initialize payment amount when record changes
    if (record && !paymentAmount && !paymentSuccess) {
        setPaymentAmount(record.pendingAmount.toString());
        setReceiptNo(`RCP-2026-${Date.now().toString().slice(-4)}`);
    }

    const handlePayment = async () => {
        setIsProcessing(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsProcessing(false);
        setPaymentSuccess(true);
        onPaymentComplete?.();
    };

    const getPaymentStatus = (status: string): PaymentStatus => {
        if (status === "paid") return "paid";
        if (status === "overdue") return "overdue";
        return "pending";
    };

    return (
        <Drawer direction="right" open={isOpen} onOpenChange={handleOpen}>
            <DrawerContent className="h-full sm:max-w-md">
                <DrawerHeader className="border-b border-border bg-surface px-6 py-5">
                    <div className="flex items-center justify-between">
                        <DrawerTitle className="text-xl font-bold font-heading text-text-primary">
                            Fee Details
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
                        Fee details for {record?.studentName}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-text-muted">
                    {record && !paymentSuccess && (
                        <div className="space-y-6">
                            {/* Student Profile */}
                            <div className="flex items-center gap-4 pb-6 border-b border-border">
                                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-2xl font-bold">
                                    {record.studentName.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-text-primary">
                                        {record.studentName}
                                    </h3>
                                    <p className="text-text-secondary">
                                        {record.admissionNo} • Grade {record.class}-{record.section}
                                    </p>
                                    <PaymentStatusBadge
                                        status={getPaymentStatus(record.status)}
                                        size="sm"
                                    />
                                </div>
                            </div>

                            {/* Challan Info */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                    Challan Information
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoBlock icon={FileText} label="Challan No" value={record.challanNo} />
                                    <InfoBlock icon={Calendar} label="Due Date" value={record.dueDate} />
                                    <InfoBlock icon={Phone} label="Contact" value={record.phone} />
                                    <InfoBlock icon={User} label="Father" value={record.fatherName} />
                                </div>
                            </div>

                            {/* Fee Breakdown */}
                            <div className="space-y-4 pt-4 border-t border-border">
                                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                    Fee Breakdown
                                </h4>
                                <div className="space-y-2">
                                    {record.feeItems.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between text-sm py-2 border-b border-border"
                                        >
                                            <span className="text-text-secondary">{item.name}</span>
                                            <span className="font-medium text-text-primary">
                                                Rs. {item.amount.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between text-lg font-bold pt-2">
                                        <span className="text-text-primary">Total Amount</span>
                                        <span className="text-accent">
                                            Rs. {record.totalDue.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Form (only for unpaid) */}
                            {record.status !== "paid" && (
                                <div className="space-y-4 pt-4 border-t border-border">
                                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                        Collect Payment
                                    </h4>

                                    <div>
                                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                                            Amount
                                        </label>
                                        <Input
                                            type="number"
                                            value={paymentAmount}
                                            onChange={(e) => setPaymentAmount(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                                            Payment Method
                                        </label>
                                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="cash">Cash</SelectItem>
                                                <SelectItem value="bank">Bank Transfer</SelectItem>
                                                <SelectItem value="online">Online Payment</SelectItem>
                                                <SelectItem value="cheque">Cheque</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                                            Receipt No
                                        </label>
                                        <Input
                                            value={receiptNo}
                                            onChange={(e) => setReceiptNo(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Payment Success */}
                    {paymentSuccess && (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4"
                            >
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </motion.div>
                            <h3 className="text-xl font-bold text-text-primary mb-2">
                                Payment Successful!
                            </h3>
                            <p className="text-text-secondary mb-6">Receipt: {receiptNo}</p>
                            <Button
                                onClick={() => {
                                    setPaymentSuccess(false);
                                    setPaymentAmount("");
                                    onClose();
                                }}
                            >
                                Done
                            </Button>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                {record && !paymentSuccess && (
                    <div className="border-t border-border p-4 bg-surface flex gap-3">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => console.log("Print", record.challanNo)}
                        >
                            <Printer className="w-4 h-4" />
                            Print Challan
                        </Button>
                        {record.status !== "paid" && (
                            <Button
                                className="flex-1 bg-green-600 hover:bg-green-700"
                                onClick={handlePayment}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <>Processing...</>
                                ) : (
                                    <>
                                        <CreditCard className="w-4 h-4" />
                                        Collect Payment
                                    </>
                                )}
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
