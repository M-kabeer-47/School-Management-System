"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  School,
  LayoutGrid,
  Calendar,
  ToggleLeft,
  ToggleRight,
  Printer,
  Users,
  Banknote,
  BadgePercent,
  AlertTriangle,
  Plus,
  Trash2,
  X,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { Input } from "@/components/ui/Input";
import { ClassFeeDetailsDrawer } from "@/components/admin/finance/ClassFeeDetailsDrawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import {
  generateBulkPreview,
  generateBulkChallans,
  calculateStudentFee,
} from "@/lib/admin/mock-data/finance";
import { classGroups } from "@/lib/admin/mock-data/settings";
import { allStudents } from "@/lib/admin/mock-data/students";
import { publishChallans } from "@/lib/shared/challan-store";
import {
  BulkGenerationScope,
  BulkGenerationConfig,
  BulkGenerationPreview,
  ExtraCharge,
  ExtraChargeTarget,
} from "@/lib/admin/types/finance";
import { cn } from "@/lib/common/utils";

type Step = 1 | 2 | 3;

const ALL_CLASSES = ["1", "2", "3", "4", "5", "6", "7", "8"];
const ALL_SECTIONS = ["A", "B", "C"];

const MONTHS = [
  "January 2026",
  "February 2026",
  "March 2026",
  "April 2026",
  "May 2026",
  "June 2026",
  "July 2026",
  "August 2026",
  "September 2026",
  "October 2026",
  "November 2026",
  "December 2026",
];

export default function BulkGeneratePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);

  // Step 1: Configuration
  const [scope, setScope] = useState<BulkGenerationScope>("entire-school");
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [month, setMonth] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [includeArrears, setIncludeArrears] = useState(false);

  // Step 2: Preview & Extra Charges
  const [preview, setPreview] = useState<BulkGenerationPreview | null>(null);
  const [extraCharges, setExtraCharges] = useState<ExtraCharge[]>([]);
  const [showAddCharge, setShowAddCharge] = useState(false);
  const [selectedClassForDetail, setSelectedClassForDetail] = useState<
    string | null
  >(null);

  // Add charge form state
  const [chargeName, setChargeName] = useState("");
  const [chargeAmount, setChargeAmount] = useState("");
  const [chargeTarget, setChargeTarget] = useState<ExtraChargeTarget>("all");
  const [chargeClasses, setChargeClasses] = useState<string[]>([]);
  const [chargeSections, setChargeSections] = useState<string[]>([]);
  const [chargeStudentIds, setChargeStudentIds] = useState<string[]>([]);
  const [studentSearch, setStudentSearch] = useState("");

  // Step 3: Generation
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [isPublished, setIsPublished] = useState(false);

  // Set default due date on client side
  useEffect(() => {
    if (!dueDate) {
      setDueDate(
        new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      );
    }
  }, [dueDate]);

  // Classes in scope (for targeting extra charges)
  const classesInScope = useMemo(() => {
    if (scope === "entire-school") return ALL_CLASSES;
    return selectedClasses.sort((a, b) => +a - +b);
  }, [scope, selectedClasses]);

  // Active students in scope
  const studentsInScope = useMemo(() => {
    return allStudents.filter((s) => {
      if (s.status !== "Active") return false;
      return classesInScope.includes(s.class);
    });
  }, [classesInScope]);

  // Filtered students for student search in add charge form
  const filteredStudents = useMemo(() => {
    if (!studentSearch.trim()) return [];
    const q = studentSearch.toLowerCase();
    return studentsInScope
      .filter(
        (s) =>
          s.studentName.toLowerCase().includes(q) ||
          s.admissionNo.toLowerCase().includes(q),
      )
      .slice(0, 10);
  }, [studentSearch, studentsInScope]);

  // Calculate extra charge impact on totals
  const extraChargeImpact = useMemo(() => {
    if (!preview || extraCharges.length === 0)
      return { totalExtra: 0, byClass: {} as Record<string, number> };

    const byClass: Record<string, number> = {};
    let totalExtra = 0;

    for (const cls of preview.byClass) {
      const classStudents = studentsInScope.filter(
        (s) => s.class === cls.className,
      );
      let classExtra = 0;

      for (const charge of extraCharges) {
        let affectedCount = 0;
        switch (charge.targetType) {
          case "all":
            affectedCount = classStudents.length;
            break;
          case "class":
            if (charge.targetClasses.includes(cls.className)) {
              affectedCount = classStudents.length;
            }
            break;
          case "section":
            affectedCount = classStudents.filter((s) =>
              charge.targetSections.includes(`${s.class}-${s.section}`),
            ).length;
            break;
          case "student":
            affectedCount = classStudents.filter((s) =>
              charge.targetStudentIds.includes(s.id),
            ).length;
            break;
        }
        classExtra += charge.amount * affectedCount;
      }

      byClass[cls.className] = classExtra;
      totalExtra += classExtra;
    }

    return { totalExtra, byClass };
  }, [preview, extraCharges, studentsInScope]);

  // Helper to get detailed breakdown for a specific class
  const getClassFeeDetails = (className: string) => {
    const baseFees = calculateStudentFee(className);

    // Class-wide Extra Charges
    const classWideCharges = extraCharges.filter(
      (c) =>
        c.targetType === "all" ||
        (c.targetType === "class" && c.targetClasses.includes(className)),
    );

    // Section-specific Charges for this class
    const sectionCharges = extraCharges.filter(
      (c) =>
        c.targetType === "section" &&
        c.targetSections.some((s) => s.startsWith(`${className}-`)),
    );

    // Student-specific Charges for this class
    const studentsInClass = studentsInScope.filter(
      (s) => s.class === className,
    );
    const studentCharges = extraCharges.filter(
      (c) =>
        c.targetType === "student" &&
        c.targetStudentIds.some((id) =>
          studentsInClass.some((s) => s.id === id),
        ),
    );

    return { baseFees, classWideCharges, sectionCharges, studentCharges };
  };

  const adjustedTotalAmount = preview
    ? preview.totalAmount + extraChargeImpact.totalExtra
    : 0; // Fee breakdown for selected class (for drawer)

  // Toggle class selection
  const toggleClass = (cls: string) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls],
    );
  };

  // Check if Step 1 is valid
  const isStep1Valid = useMemo(() => {
    if (!month) return false;
    if (scope === "specific-classes" && selectedClasses.length === 0)
      return false;
    return true;
  }, [month, scope, selectedClasses]);

  // Load preview when entering Step 2
  const loadPreview = () => {
    const config: BulkGenerationConfig = {
      scope,
      selectedClasses,
      month,
      dueDate,
      includeArrears,
    };
    const previewData = generateBulkPreview(config);
    setPreview(previewData);
  };

  // Reset add charge form
  const resetChargeForm = () => {
    setChargeName("");
    setChargeAmount("");
    setChargeTarget("all");
    setChargeClasses([]);
    setChargeSections([]);
    setChargeStudentIds([]);
    setStudentSearch("");
    setShowAddCharge(false);
  };

  // Add extra charge
  const addExtraCharge = () => {
    if (!chargeName.trim() || !chargeAmount || Number(chargeAmount) <= 0)
      return;

    const charge: ExtraCharge = {
      id: `extra-${Date.now()}`,
      name: chargeName.trim(),
      amount: Number(chargeAmount),
      targetType: chargeTarget,
      targetClasses: chargeTarget === "class" ? chargeClasses : [],
      targetSections: chargeTarget === "section" ? chargeSections : [],
      targetStudentIds: chargeTarget === "student" ? chargeStudentIds : [],
    };

    setExtraCharges((prev) => [...prev, charge]);
    resetChargeForm();
  };

  // Remove extra charge
  const removeExtraCharge = (id: string) => {
    setExtraCharges((prev) => prev.filter((c) => c.id !== id));
  };

  // Toggle charge class
  const toggleChargeClass = (cls: string) => {
    setChargeClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls],
    );
  };

  // Toggle charge section
  const toggleChargeSection = (key: string) => {
    setChargeSections((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key],
    );
  };

  // Toggle student selection
  const toggleStudent = (id: string) => {
    setChargeStudentIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  // Get label for extra charge scope
  const getChargeTargetLabel = (charge: ExtraCharge): string => {
    switch (charge.targetType) {
      case "all":
        return "All Students";
      case "class":
        return `Class ${charge.targetClasses.sort((a, b) => +a - +b).join(", ")}`;
      case "section":
        return charge.targetSections.join(", ");
      case "student": {
        const names = charge.targetStudentIds
          .map((id) => studentsInScope.find((s) => s.id === id)?.studentName)
          .filter(Boolean);
        return names.length <= 2
          ? names.join(", ")
          : `${names[0]} + ${names.length - 1} more`;
      }
      default:
        return "";
    }
  };

  // Get affected student count for a charge
  const getAffectedCount = (charge: ExtraCharge): number => {
    switch (charge.targetType) {
      case "all":
        return studentsInScope.length;
      case "class":
        return studentsInScope.filter((s) =>
          charge.targetClasses.includes(s.class),
        ).length;
      case "section":
        return studentsInScope.filter((s) =>
          charge.targetSections.includes(`${s.class}-${s.section}`),
        ).length;
      case "student":
        return charge.targetStudentIds.length;
      default:
        return 0;
    }
  };

  // Handle generation
  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Simulate generation time
    await new Promise((resolve) => setTimeout(resolve, 2200));
    clearInterval(interval);
    setProgress(100);

    const config: BulkGenerationConfig = {
      scope,
      selectedClasses,
      month,
      dueDate,
      includeArrears,
      extraCharges: extraCharges.length > 0 ? extraCharges : undefined,
    };
    const challans = generateBulkChallans(config);
    setGeneratedCount(challans.length);

    // Auto-publish to student portal
    publishChallans(challans);

    setIsGenerating(false);
    setIsComplete(true);
  };

  // Handle publish
  const handlePublish = () => {
    setIsPublished(true);
  };

  const steps = [
    { number: 1, title: "Select Scope" },
    { number: 2, title: "Preview" },
    { number: 3, title: "Generate" },
  ];

  // Check if add charge form is valid
  const isChargeValid = useMemo(() => {
    if (!chargeName.trim() || !chargeAmount || Number(chargeAmount) <= 0)
      return false;
    if (chargeTarget === "class" && chargeClasses.length === 0) return false;
    if (chargeTarget === "section" && chargeSections.length === 0) return false;
    if (chargeTarget === "student" && chargeStudentIds.length === 0)
      return false;
    return true;
  }, [
    chargeName,
    chargeAmount,
    chargeTarget,
    chargeClasses,
    chargeSections,
    chargeStudentIds,
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <PageHeader
        title="Bulk Generate Challans"
        subtitle="Generate fee challans for the entire school or specific classes"
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
                    : "bg-surface-hover text-text-muted",
              )}
            >
              {currentStep > step.number ? (
                <Check className="w-5 h-5" />
              ) : (
                step.number
              )}
            </div>
            <span
              className={cn(
                "text-sm font-medium hidden sm:block",
                currentStep === step.number
                  ? "text-accent"
                  : currentStep > step.number
                    ? "text-green-600"
                    : "text-text-muted",
              )}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-12 h-0.5 mx-2",
                  currentStep > step.number ? "bg-green-500" : "bg-border",
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-background rounded-2xl border border-border p-6 min-h-[400px]">
        <AnimatePresence mode="wait">
          {/* Step 1: Select Scope */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold text-text-primary">
                Select Scope & Period
              </h2>

              {/* Scope Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setScope("entire-school")}
                  className={cn(
                    "flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all",
                    scope === "entire-school"
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50",
                  )}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      scope === "entire-school"
                        ? "bg-accent/10"
                        : "bg-surface-active",
                    )}
                  >
                    <School
                      className={cn(
                        "w-6 h-6",
                        scope === "entire-school"
                          ? "text-accent"
                          : "text-text-muted",
                      )}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">
                      Entire School
                    </p>
                    <p className="text-sm text-text-muted">All classes (1–8)</p>
                  </div>
                  {scope === "entire-school" && (
                    <div className="ml-auto w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <div
                  onClick={() => setScope("specific-classes")}
                  className={cn(
                    "flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all",
                    scope === "specific-classes"
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50",
                  )}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      scope === "specific-classes"
                        ? "bg-accent/10"
                        : "bg-surface-active",
                    )}
                  >
                    <LayoutGrid
                      className={cn(
                        "w-6 h-6",
                        scope === "specific-classes"
                          ? "text-accent"
                          : "text-text-muted",
                      )}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">
                      Specific Classes
                    </p>
                    <p className="text-sm text-text-muted">Choose classes</p>
                  </div>
                  {scope === "specific-classes" && (
                    <div className="ml-auto w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Class Multi-Select (when specific) */}
              {scope === "specific-classes" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <label className="text-sm font-medium text-text-secondary mb-3 block">
                    Select Classes
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {ALL_CLASSES.map((cls) => (
                      <button
                        key={cls}
                        onClick={() => toggleClass(cls)}
                        className={cn(
                          "py-3 rounded-xl border-2 font-bold text-center transition-all",
                          selectedClasses.includes(cls)
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border text-text-muted hover:border-accent/50",
                        )}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Month & Due Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-2 block">
                    Fee Month
                  </label>
                  <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select month..." />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {MONTHS.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
              </div>

              {/* Include Arrears Toggle */}
              <div
                onClick={() => setIncludeArrears(!includeArrears)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all",
                  includeArrears
                    ? "border-accent/30 bg-accent/5"
                    : "border-border",
                )}
              >
                {includeArrears ? (
                  <ToggleRight className="w-7 h-7 text-accent shrink-0" />
                ) : (
                  <ToggleLeft className="w-7 h-7 text-text-muted shrink-0" />
                )}
                <div>
                  <p className="font-medium text-text-primary">
                    Include Arrears
                  </p>
                  <p className="text-sm text-text-muted">
                    Add previous unpaid amounts to this month&apos;s challans
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Preview */}
          {currentStep === 2 && preview && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold text-text-primary">
                Generation Preview
              </h2>
              <p className="text-sm text-text-muted">
                {month} &middot;{" "}
                {scope === "entire-school"
                  ? "All Classes"
                  : `Class ${selectedClasses.sort((a, b) => +a - +b).join(", ")}`}
              </p>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-surface rounded-xl border border-border p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Users className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm text-text-muted">
                      Total Students
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-text-primary">
                    {preview.totalStudents}
                  </p>
                </div>

                <div className="bg-surface rounded-xl border border-border p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Banknote className="w-4.5 h-4.5 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm text-text-muted">
                      Total Amount
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-text-primary">
                    Rs. {adjustedTotalAmount.toLocaleString()}
                  </p>
                  {extraChargeImpact.totalExtra > 0 && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      +Rs. {extraChargeImpact.totalExtra.toLocaleString()} extra
                      charges
                    </p>
                  )}
                </div>

                <div className="bg-surface rounded-xl border border-border p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <BadgePercent className="w-4.5 h-4.5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-sm text-text-muted">Concessions</span>
                  </div>
                  <p className="text-2xl font-bold text-text-primary">
                    {preview.concessionsApplied}
                  </p>
                  <p className="text-xs text-text-muted">
                    Rs. {preview.totalConcessionAmount.toLocaleString()} total
                  </p>
                </div>
              </div>

              {/* Add Charge + Table */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                  Class-wise Breakdown
                </h3>
                {!showAddCharge && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddCharge(true)}
                    className="gap-2"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Charge
                  </Button>
                )}
              </div>

              {/* Add Charge Form - Moved to Top */}
              <AnimatePresence>
                {showAddCharge && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mb-6"
                  >
                    <div className="bg-surface rounded-xl border-2 border-dashed border-accent/30 p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-text-primary">
                          New Charge
                        </h4>
                        <button
                          onClick={resetChargeForm}
                          className="p-1 rounded hover:bg-surface-hover text-text-muted"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Name & Amount */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input
                          label="Charge Name"
                          value={chargeName}
                          onChange={(e) => setChargeName(e.target.value)}
                          placeholder="e.g., Annual Day Event"
                        />
                        <Input
                          label="Amount (Rs.)"
                          type="number"
                          value={chargeAmount}
                          onChange={(e) => setChargeAmount(e.target.value)}
                          placeholder="e.g., 500"
                        />
                      </div>

                      {/* Target Type */}
                      <div>
                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                          Apply To
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {(
                            [
                              { value: "all", label: "All Students" },
                              { value: "class", label: "Specific Classes" },
                              { value: "section", label: "Specific Sections" },
                              { value: "student", label: "Specific Students" },
                            ] as { value: ExtraChargeTarget; label: string }[]
                          ).map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => {
                                setChargeTarget(opt.value);
                                setChargeClasses([]);
                                setChargeSections([]);
                                setChargeStudentIds([]);
                                setStudentSearch("");
                              }}
                              className={cn(
                                "py-2 px-3 rounded-lg border text-sm font-medium transition-all text-center",
                                chargeTarget === opt.value
                                  ? "border-accent bg-accent/10 text-accent"
                                  : "border-border text-text-muted hover:border-accent/50",
                              )}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Conditional Target Selectors */}
                      {chargeTarget === "class" && (
                        <div>
                          <label className="text-sm font-medium text-text-secondary mb-2 block">
                            Select Classes
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {classesInScope.map((cls) => (
                              <button
                                key={cls}
                                onClick={() => toggleChargeClass(cls)}
                                className={cn(
                                  "w-10 h-10 rounded-lg border-2 font-bold text-sm transition-all",
                                  chargeClasses.includes(cls)
                                    ? "border-accent bg-accent/10 text-accent"
                                    : "border-border text-text-muted hover:border-accent/50",
                                )}
                              >
                                {cls}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {chargeTarget === "section" && (
                        <div>
                          <label className="text-sm font-medium text-text-secondary mb-2 block">
                            Select Sections
                          </label>
                          <div className="space-y-2">
                            {classesInScope.map((cls) => (
                              <div
                                key={cls}
                                className="flex items-center gap-2"
                              >
                                <span className="text-sm font-medium text-text-secondary w-16 shrink-0">
                                  Class {cls}:
                                </span>
                                <div className="flex gap-2">
                                  {ALL_SECTIONS.map((sec) => {
                                    const key = `${cls}-${sec}`;
                                    return (
                                      <button
                                        key={key}
                                        onClick={() => toggleChargeSection(key)}
                                        className={cn(
                                          "px-3 py-1.5 rounded-lg border text-sm font-medium transition-all",
                                          chargeSections.includes(key)
                                            ? "border-accent bg-accent/10 text-accent"
                                            : "border-border text-text-muted hover:border-accent/50",
                                        )}
                                      >
                                        {sec}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {chargeTarget === "student" && (
                        <div>
                          <label className="text-sm font-medium text-text-secondary mb-2 block">
                            Search & Select Students
                          </label>
                          <Input
                            value={studentSearch}
                            onChange={(e) => setStudentSearch(e.target.value)}
                            placeholder="Search by name or admission no..."
                          />
                          {/* Search Results */}
                          {filteredStudents.length > 0 && (
                            <div className="mt-2 border border-border rounded-xl max-h-48 overflow-y-auto divide-y divide-border">
                              {filteredStudents.map((s) => (
                                <button
                                  key={s.id}
                                  onClick={() => {
                                    toggleStudent(s.id);
                                    setStudentSearch("");
                                  }}
                                  className={cn(
                                    "w-full text-left px-3 py-2 flex items-center justify-between hover:bg-surface-hover transition-colors text-sm",
                                    chargeStudentIds.includes(s.id) &&
                                      "bg-accent/5",
                                  )}
                                >
                                  <div>
                                    <span className="font-medium text-text-primary">
                                      {s.studentName}
                                    </span>
                                    <span className="text-text-muted ml-2">
                                      {s.admissionNo} &middot; Class {s.class}-
                                      {s.section}
                                    </span>
                                  </div>
                                  {chargeStudentIds.includes(s.id) && (
                                    <Check className="w-4 h-4 text-accent shrink-0" />
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                          {/* Selected Students */}
                          {chargeStudentIds.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {chargeStudentIds.map((id) => {
                                const s = studentsInScope.find(
                                  (st) => st.id === id,
                                );
                                if (!s) return null;
                                return (
                                  <span
                                    key={id}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium"
                                  >
                                    {s.studentName}
                                    <button
                                      onClick={() => toggleStudent(id)}
                                      className="hover:text-red-500 transition-colors"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Add Button */}
                      <div className="flex justify-end gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetChargeForm}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={addExtraCharge}
                          disabled={!isChargeValid}
                          className="bg-accent hover:bg-accent-hover text-white gap-2"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Charge
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Class-wise Breakdown */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableHeadRow>
                      <TableHead className="text-white">Class</TableHead>
                      <TableHead className="text-white">Students</TableHead>
                      <TableHead className="text-white">Default Fee</TableHead>
                      {extraCharges.length > 0 && (
                        <TableHead className="text-white">
                          Extra Charges
                        </TableHead>
                      )}
                      <TableHead className="text-white">Total</TableHead>
                      <TableHead className="text-white w-[80px] text-center">
                        Details
                      </TableHead>
                    </TableHeadRow>
                  </TableHeader>
                  <TableBody>
                    {preview.byClass.map((cls) => {
                      const classExtra =
                        extraChargeImpact.byClass[cls.className] || 0;
                      return (
                        <TableRow key={cls.className}>
                          <TableCell className="font-semibold text-text-primary">
                            Class {cls.className}
                          </TableCell>
                          <TableCell className="text-text-secondary">
                            {cls.studentCount}
                          </TableCell>
                          <TableCell className="text-text-secondary">
                            Rs. {cls.amountPerStudent.toLocaleString()} /
                            student
                          </TableCell>
                          {extraCharges.length > 0 && (
                            <TableCell className="text-green-600 dark:text-green-400">
                              {classExtra > 0
                                ? `+Rs. ${classExtra.toLocaleString()}`
                                : "—"}
                            </TableCell>
                          )}
                          <TableCell className="font-semibold text-text-primary">
                            Rs.{" "}
                            {(cls.totalAmount + classExtra).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-center">
                            <button
                              onClick={() =>
                                setSelectedClassForDetail(cls.className)
                              }
                              className="inline-flex items-center gap-1 text-accent hover:text-accent-hover text-sm font-medium transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              View
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {/* Totals row */}
                    <TableRow>
                      <TableCell className="font-bold text-text-primary">
                        Total
                      </TableCell>
                      <TableCell className="font-bold text-text-primary">
                        {preview.totalStudents}
                      </TableCell>
                      <TableCell />
                      {extraCharges.length > 0 && (
                        <TableCell className="font-bold text-green-600 dark:text-green-400">
                          +Rs. {extraChargeImpact.totalExtra.toLocaleString()}
                        </TableCell>
                      )}
                      <TableCell className="font-bold text-text-primary">
                        Rs. {adjustedTotalAmount.toLocaleString()}
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Fee Breakdown Helper */}

              {/* Arrears Notice */}
              {includeArrears && preview.arrearsStudents > 0 && (
                <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                      Arrears Included
                    </p>
                    <p className="text-sm text-amber-600 dark:text-amber-400/80">
                      {preview.arrearsStudents} student
                      {preview.arrearsStudents !== 1 ? "s" : ""} with Rs.{" "}
                      {preview.arrearsAmount.toLocaleString()} in pending
                      arrears will be added to their challans.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3: Generate */}
          {currentStep === 3 && !isComplete && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold text-text-primary">
                Generate Challans
              </h2>

              {/* Final Summary */}
              <div className="bg-surface p-5 rounded-xl space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Month</span>
                  <span className="text-text-primary font-medium">{month}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Scope</span>
                  <span className="text-text-primary font-medium">
                    {scope === "entire-school"
                      ? "Entire School"
                      : `Class ${selectedClasses.sort((a, b) => +a - +b).join(", ")}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Students</span>
                  <span className="text-text-primary font-medium">
                    {preview?.totalStudents || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Due Date</span>
                  <span className="text-text-primary font-medium">
                    {dueDate
                      ? new Date(dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </span>
                </div>
                {extraCharges.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Extra Charges</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {extraCharges.length} charge
                      {extraCharges.length !== 1 ? "s" : ""} (+Rs.{" "}
                      {extraChargeImpact.totalExtra.toLocaleString()})
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                  <span className="text-text-primary">Total Amount</span>
                  <span className="text-accent">
                    Rs. {adjustedTotalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Extra Charges Summary */}
              {extraCharges.length > 0 && (
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-4 space-y-2">
                  <p className="text-sm font-medium text-green-700 dark:text-green-400">
                    Additional Charges Applied:
                  </p>
                  {extraCharges.map((charge) => (
                    <div
                      key={charge.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-green-600 dark:text-green-400/80">
                        {charge.name} ({getChargeTargetLabel(charge)})
                      </span>
                      <span className="text-green-700 dark:text-green-400 font-medium">
                        Rs. {charge.amount.toLocaleString()} x{" "}
                        {getAffectedCount(charge)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Progress */}
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">
                      Generating challans...
                    </span>
                    <span className="font-medium text-accent">{progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-surface-active rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Success State */}
          {isComplete && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1,
                  }}
                  className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
                </motion.div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  {generatedCount} Challans Generated!
                </h2>
                <p className="text-text-muted">
                  {month} fee challans have been generated and published to the
                  student portal.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {!isPublished ? (
                  <Button
                    onClick={handlePublish}
                    className="bg-green-600 hover:bg-green-700 gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Publish to Student Portal
                  </Button>
                ) : (
                  <Button disabled className="bg-green-600 gap-2 opacity-80">
                    <Check className="w-4 h-4" />
                    Published
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push("/admin/finance/fee-management/print-challan")
                  }
                  className="gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print Challans
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => router.push("/admin/finance/fee-management")}
                >
                  Back to Fee Management
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fee Details Drawer */}
      <ClassFeeDetailsDrawer
        className={selectedClassForDetail}
        details={
          selectedClassForDetail
            ? getClassFeeDetails(selectedClassForDetail)
            : null
        }
        isOpen={!!selectedClassForDetail}
        onClose={() => setSelectedClassForDetail(null)}
      />

      {/* Navigation Buttons */}
      {!isComplete && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => (prev - 1) as Step)}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep === 1 && (
            <Button
              onClick={() => {
                loadPreview();
                setCurrentStep(2);
              }}
              disabled={!isStep1Valid}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}

          {currentStep === 2 && (
            <Button onClick={() => setCurrentStep(3)}>
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}

          {currentStep === 3 && (
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-green-600 hover:bg-green-700"
            >
              {isGenerating
                ? "Generating..."
                : `Generate ${preview?.totalStudents || 0} Challans`}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}
