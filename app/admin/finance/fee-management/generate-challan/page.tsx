"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Plus,
    ArrowLeft,
    ArrowRight,
    User,
    Check,
    Printer,
    Download,
    Calendar,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { Input } from "@/components/ui/Input";
import { SearchBar } from "@/components/ui/SearchBar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import { ChallanPrintTemplate } from "@/components/admin/finance/ChallanPrintTemplate";
import { feeStructures, feeDiscounts } from "@/lib/admin/mock-data/finance";
import { allStudents } from "@/lib/admin/mock-data/students";
import { ChallanData } from "@/lib/admin/types/finance";
import { cn } from "@/lib/common/utils";

type Step = 1 | 2 | 3;

interface SelectedFeeItem {
    id: string;
    name: string;
    amount: number;
    selected: boolean;
}

export default function GenerateChallanPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<Step>(1);

    // Step 1: Student Selection
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStudent, setSelectedStudent] = useState<typeof allStudents[0] | null>(null);

    // Step 2: Fee Configuration
    const [feeItems, setFeeItems] = useState<SelectedFeeItem[]>([]);
    const [selectedDiscount, setSelectedDiscount] = useState<string>("none");
    const [customItem, setCustomItem] = useState({ name: "", amount: 0 });

    // Step 3: Final Details
    const [dueDate, setDueDate] = useState<string>("");
    const [remarks, setRemarks] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);
    const [generatedChallan, setGeneratedChallan] = useState<ChallanData | null>(null);
    const [showPrintPreview, setShowPrintPreview] = useState(false);

    // Set default due date on client side to avoid hydration mismatch
    useEffect(() => {
        if (!dueDate) {
            setDueDate(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]);
        }
    }, [dueDate]);

    // Filter students based on search
    const filteredStudents = allStudents
        .filter(
            (s) =>
                searchQuery === "" ||
                s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 10);

    // Calculate totals
    const subtotal = feeItems
        .filter((f) => f.selected)
        .reduce((sum, f) => sum + f.amount, 0);

    const discount = feeDiscounts.find((d) => d.id === selectedDiscount);
    const discountAmount = discount
        ? discount.type === "percentage"
            ? Math.round((subtotal * discount.value) / 100)
            : discount.value
        : 0;

    const netAmount = subtotal - discountAmount;

    // Handle student selection
    const handleSelectStudent = (student: typeof allStudents[0]) => {
        setSelectedStudent(student);

        // Load fee structure for student's class
        const structure =
            feeStructures.find((f) => student.class.includes(f.className.split(" ")[1])) ||
            feeStructures[0];

        setFeeItems(
            structure.items.map((item) => ({
                ...item,
                selected: !item.isOptional,
            }))
        );
    };

    // Toggle fee item selection
    const toggleFeeItem = (id: string) => {
        setFeeItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
        );
    };

    // Add custom fee item
    const addCustomItem = () => {
        if (customItem.name && customItem.amount > 0) {
            setFeeItems((prev) => [
                ...prev,
                {
                    id: `custom-${Date.now()}`,
                    name: customItem.name,
                    amount: customItem.amount,
                    selected: true,
                },
            ]);
            setCustomItem({ name: "", amount: 0 });
        }
    };

    // Generate challan
    const handleGenerate = async () => {
        if (!selectedStudent) return;

        setIsGenerating(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Create ChallanData object for the template
        const challanNumber = `CH-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
        const currentMonth = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

        const challanData: ChallanData = {
            id: `challan-${Date.now()}`,
            studentName: selectedStudent.studentName,
            fatherName: selectedStudent.fatherName,
            admissionNo: selectedStudent.admissionNo,
            class: selectedStudent.class,
            section: selectedStudent.section,
            challanNo: challanNumber,
            month: currentMonth,
            dueDate: new Date(dueDate).toLocaleDateString('en-GB'),
            total: netAmount,
            items: feeItems
                .filter(f => f.selected)
                .map(f => ({ name: f.name, amount: f.amount })),
        };

        setGeneratedChallan(challanData);
        setIsGenerating(false);
        setIsGenerated(true);
    };

    const steps = [
        { number: 1, title: "Select Student" },
        { number: 2, title: "Configure Fees" },
        { number: 3, title: "Review & Generate" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Page Header */}
            <PageHeader
                title="Generate Fee Challan"
                subtitle="Create a new fee challan for a student"
            />

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-4">
                {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center gap-2">
                        <div
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                                currentStep === step.number
                                    ? "bg-accent text-white"
                                    : currentStep > step.number
                                        ? "bg-green-500 text-white"
                                        : "bg-surface-hover text-text-muted"
                            )}
                        >
                            {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
                        </div>
                        <span
                            className={cn(
                                "text-sm font-medium hidden sm:block",
                                currentStep === step.number
                                    ? "text-accent"
                                    : currentStep > step.number
                                        ? "text-green-600"
                                        : "text-text-muted"
                            )}
                        >
                            {step.title}
                        </span>
                        {index < steps.length - 1 && (
                            <div
                                className={cn(
                                    "w-12 h-0.5 mx-2",
                                    currentStep > step.number ? "bg-green-500" : "bg-border"
                                )}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <div className="bg-background rounded-2xl border border-border p-6 min-h-[400px]">
                <AnimatePresence mode="wait">
                    {/* Step 1: Select Student */}
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h2 className="text-lg font-semibold text-text-primary">Select Student</h2>

                            <SearchBar
                                placeholder="Search by name or admission number..."
                                value={searchQuery}
                                onChange={setSearchQuery}
                            />

                            <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                {filteredStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        onClick={() => handleSelectStudent(student)}
                                        className={cn(
                                            "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                                            selectedStudent?.id === student.id
                                                ? "border-accent bg-accent/5"
                                                : "border-border hover:border-accent/50 hover:bg-surface-hover"
                                        )}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                                            <User className="w-6 h-6 text-accent" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-text-primary">
                                                {student.studentName}
                                            </p>
                                            <p className="text-sm text-text-muted">
                                                {student.admissionNo} • {student.class} - {student.section}
                                            </p>
                                        </div>
                                        {selectedStudent?.id === student.id && (
                                            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Configure Fees */}
                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-text-primary">
                                        Configure Fee Items
                                    </h2>
                                    <p className="text-sm text-text-muted">
                                        For {selectedStudent?.studentName} ({selectedStudent?.class})
                                    </p>
                                </div>
                            </div>

                            {/* Fee Items */}
                            <div className="space-y-2">
                                {feeItems.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => toggleFeeItem(item.id)}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                                            item.selected
                                                ? "border-accent bg-accent/5"
                                                : "border-border hover:border-border-hover"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={cn(
                                                    "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                                                    item.selected ? "border-accent bg-accent" : "border-border"
                                                )}
                                            >
                                                {item.selected && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                            <span className="font-medium text-text-primary">{item.name}</span>
                                        </div>
                                        <span className="font-semibold text-text-primary">
                                            Rs. {item.amount.toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Add Custom Item */}
                            <div className="flex gap-3">
                                <Input
                                    placeholder="Custom item name"
                                    value={customItem.name}
                                    onChange={(e) =>
                                        setCustomItem((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    className="flex-1"
                                />
                                <Input
                                    type="number"
                                    placeholder="Amount"
                                    value={customItem.amount || ""}
                                    onChange={(e) =>
                                        setCustomItem((prev) => ({
                                            ...prev,
                                            amount: parseInt(e.target.value) || 0,
                                        }))
                                    }
                                    className="w-32"
                                />
                                <Button variant="outline" onClick={addCustomItem}>
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Discount Selection */}
                            <div>
                                <label className="text-sm font-medium text-text-secondary mb-2 block">
                                    Apply Discount
                                </label>
                                <Select value={selectedDiscount} onValueChange={setSelectedDiscount}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="No Discount" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="none">No Discount</SelectItem>
                                        {feeDiscounts.map((d) => (
                                            <SelectItem key={d.id} value={d.id}>
                                                {d.name} ({d.type === "percentage" ? `${d.value}%` : `Rs. ${d.value}`})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Summary */}
                            <div className="bg-surface p-4 rounded-xl space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-muted">Subtotal</span>
                                    <span className="text-text-primary font-medium">
                                        Rs. {subtotal.toLocaleString()}
                                    </span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-green-600">Discount</span>
                                        <span className="text-green-600 font-medium">
                                            - Rs. {discountAmount.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                                    <span className="text-text-primary">Net Amount</span>
                                    <span className="text-accent">Rs. {netAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Review & Generate */}
                    {currentStep === 3 && !isGenerated && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h2 className="text-lg font-semibold text-text-primary">
                                Review & Generate Challan
                            </h2>

                            {/* Student Summary */}
                            <div className="bg-surface p-4 rounded-xl">
                                <p className="text-sm text-text-muted mb-1">Student</p>
                                <p className="font-semibold text-text-primary">
                                    {selectedStudent?.studentName}
                                </p>
                                <p className="text-sm text-text-secondary">
                                    {selectedStudent?.admissionNo} • {selectedStudent?.class} -{" "}
                                    {selectedStudent?.section}
                                </p>
                            </div>

                            {/* Fee Summary */}
                            <div className="space-y-2">
                                {feeItems
                                    .filter((f) => f.selected)
                                    .map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between text-sm py-2 border-b border-border"
                                        >
                                            <span className="text-text-secondary">{item.name}</span>
                                            <span className="text-text-primary font-medium">
                                                Rs. {item.amount.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-sm py-2 border-b border-border text-green-600">
                                        <span>Discount ({discount?.name})</span>
                                        <span className="font-medium">
                                            - Rs. {discountAmount.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-bold py-2">
                                    <span className="text-text-primary">Total Amount</span>
                                    <span className="text-accent">Rs. {netAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Due Date & Remarks */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-text-secondary mb-2 block">
                                        Due Date
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                        <Input
                                            type="date"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-text-secondary mb-2 block">
                                        Remarks (Optional)
                                    </label>
                                    <Input
                                        placeholder="Add any notes..."
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Success State */}
                    {isGenerated && generatedChallan && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            {/* Success Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                        <Check className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-text-primary">
                                            Challan Generated Successfully!
                                        </h2>
                                        <p className="text-sm text-text-secondary">
                                            Challan #{generatedChallan.challanNo} for {selectedStudent?.studentName}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            const printContent = document.getElementById('challan-print-area');
                                            if (printContent) {
                                                const printWindow = window.open('', '_blank');
                                                if (printWindow) {
                                                    printWindow.document.write(`
                                                        <html>
                                                            <head>
                                                                <title>Fee Challan - ${generatedChallan.challanNo}</title>
                                                                <style>
                                                                    * { margin: 0; padding: 0; box-sizing: border-box; }
                                                                    body { font-family: Arial, sans-serif; }
                                                                    @media print {
                                                                        body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
                                                                    }
                                                                </style>
                                                            </head>
                                                            <body>${printContent.innerHTML}</body>
                                                        </html>
                                                    `);
                                                    printWindow.document.close();
                                                    printWindow.print();
                                                }
                                            }
                                        }}
                                    >
                                        <Printer className="w-4 h-4" />
                                        Print Challan
                                    </Button>
                                    <Button onClick={() => router.push("/admin/finance/fee-management")}>
                                        Back to Fee Management
                                    </Button>
                                </div>
                            </div>

                            {/* Challan Preview */}
                            <div className="bg-white rounded-xl border border-border p-4 overflow-x-auto">
                                <div id="challan-print-area">
                                    <ChallanPrintTemplate challan={generatedChallan} />
                                </div>
                            </div>

                            {/* Generate Another */}
                            <div className="text-center">
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setIsGenerated(false);
                                        setGeneratedChallan(null);
                                        setCurrentStep(1);
                                        setSelectedStudent(null);
                                        setFeeItems([]);
                                        setSelectedDiscount("none");
                                        setRemarks("");
                                    }}
                                >
                                    <Plus className="w-4 h-4" />
                                    Generate Another Challan
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            {!isGenerated && (
                <div className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentStep((prev) => (prev - 1) as Step)}
                        disabled={currentStep === 1}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                    </Button>

                    {currentStep < 3 ? (
                        <Button
                            onClick={() => setCurrentStep((prev) => (prev + 1) as Step)}
                            disabled={
                                (currentStep === 1 && !selectedStudent) ||
                                (currentStep === 2 && netAmount <= 0)
                            }
                        >
                            Next
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {isGenerating ? "Generating..." : "Generate Challan"}
                        </Button>
                    )}
                </div>
            )}
        </motion.div>
    );
}
