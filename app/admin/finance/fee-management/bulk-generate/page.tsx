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
  Upload,
  Users,
  Banknote,
  BadgePercent,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { Input } from "@/components/ui/Input";
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
} from "@/lib/admin/mock-data/finance";
import { publishChallans } from "@/lib/shared/challan-store";
import {
  BulkGenerationScope,
  BulkGenerationConfig,
  BulkGenerationPreview,
} from "@/lib/admin/types/finance";
import { cn } from "@/lib/common/utils";

type Step = 1 | 2 | 3;

const ALL_CLASSES = ["1", "2", "3", "4", "5", "6", "7", "8"];

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

  // Step 2: Preview
  const [preview, setPreview] = useState<BulkGenerationPreview | null>(null);

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
          .split("T")[0]
      );
    }
  }, [dueDate]);

  // Toggle class selection
  const toggleClass = (cls: string) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
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
                    : "bg-surface-hover text-text-muted"
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
                      : "border-border hover:border-accent/50"
                  )}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      scope === "entire-school"
                        ? "bg-accent/10"
                        : "bg-surface-active"
                    )}
                  >
                    <School
                      className={cn(
                        "w-6 h-6",
                        scope === "entire-school"
                          ? "text-accent"
                          : "text-text-muted"
                      )}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">
                      Entire School
                    </p>
                    <p className="text-sm text-text-muted">
                      All classes (1–8)
                    </p>
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
                      : "border-border hover:border-accent/50"
                  )}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      scope === "specific-classes"
                        ? "bg-accent/10"
                        : "bg-surface-active"
                    )}
                  >
                    <LayoutGrid
                      className={cn(
                        "w-6 h-6",
                        scope === "specific-classes"
                          ? "text-accent"
                          : "text-text-muted"
                      )}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">
                      Specific Classes
                    </p>
                    <p className="text-sm text-text-muted">
                      Choose classes
                    </p>
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
                            : "border-border text-text-muted hover:border-accent/50"
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
                    : "border-border"
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
                    Rs. {preview.totalAmount.toLocaleString()}
                  </p>
                </div>

                <div className="bg-surface rounded-xl border border-border p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <BadgePercent className="w-4.5 h-4.5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-sm text-text-muted">
                      Concessions
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-text-primary">
                    {preview.concessionsApplied}
                  </p>
                  <p className="text-xs text-text-muted">
                    Rs. {preview.totalConcessionAmount.toLocaleString()} total
                  </p>
                </div>
              </div>

              {/* Class-wise Breakdown */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableHeadRow>
                      <TableHead className="text-white">Class</TableHead>
                      <TableHead className="text-white">Students</TableHead>
                      <TableHead className="text-white">Fee / Student</TableHead>
                      <TableHead className="text-white">Total</TableHead>
                    </TableHeadRow>
                  </TableHeader>
                  <TableBody>
                    {preview.byClass.map((cls) => (
                      <TableRow key={cls.className}>
                        <TableCell className="font-semibold text-text-primary">
                          Class {cls.className}
                        </TableCell>
                        <TableCell className="text-text-secondary">
                          {cls.studentCount}
                        </TableCell>
                        <TableCell className="text-text-secondary">
                          Rs. {cls.amountPerStudent.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-semibold text-text-primary">
                          Rs. {cls.totalAmount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* Totals row */}
                    <TableRow>
                      <TableCell className="font-bold text-text-primary">
                        Total
                      </TableCell>
                      <TableCell className="font-bold text-text-primary">
                        {preview.totalStudents}
                      </TableCell>
                      <TableCell />
                      <TableCell className="font-bold text-accent">
                        Rs. {preview.totalAmount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

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
                  <span className="text-text-primary font-medium">
                    {month}
                  </span>
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
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                  <span className="text-text-primary">Total Amount</span>
                  <span className="text-accent">
                    Rs. {(preview?.totalAmount || 0).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress */}
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Generating challans...</span>
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
                  {month} fee challans have been generated and published to the student portal.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {!isPublished ? (
                  <Button
                    onClick={handlePublish}
                    className="bg-green-600 hover:bg-green-700 gap-2"
                  >
                    <Upload className="w-4 h-4" />
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
                    router.push(
                      "/admin/finance/fee-management/print-challan"
                    )
                  }
                  className="gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print Challans
                </Button>
                <Button
                  variant="ghost"
                  onClick={() =>
                    router.push("/admin/finance/fee-management")
                  }
                >
                  Back to Fee Management
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
