"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Save,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/common/utils";
import { EXAM_SERIES } from "@/lib/admin/mock-data/exams";

export default function DateSheetPage() {
  const params = useParams();
  const series = EXAM_SERIES.find((s) => s.id === params.id) || EXAM_SERIES[0];

  const [masterFile, setMasterFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mode, setMode] = useState<"draft" | "publish" | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMasterFile(e.target.files[0]);
    }
  };

  const handleAction = (action: "draft" | "publish") => {
    setMode(action);
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin/exams"
              className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-text-primary font-heading tracking-tight">
            Exam Date Sheet
          </h1>
          <p className="text-text-secondary">
            Manage the official timetable for{" "}
            <span className="font-semibold text-text-primary">
              {series.title}
            </span>
          </p>
        </div>

        {!isSuccess && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              disabled={!masterFile || isProcessing}
              onClick={() => handleAction("draft")}
            >
              <Save className="w-5 h-5" />
              {isProcessing && mode === "draft" ? "Saving..." : "Save Draft"}
            </Button>
            <Button
              size="lg"
              disabled={!masterFile || isProcessing}
              onClick={() => handleAction("publish")}
            >
              <CheckCircle2 className="w-5 h-5" />
              {isProcessing && mode === "publish"
                ? "Publishing..."
                : "Publish to Portals"}
            </Button>
          </div>
        )}
      </div>

      {!isSuccess ? (
        <div className="bg-surface border border-border rounded-3xl p-12 shadow-sm text-center">
          <div className="max-w-md mx-auto space-y-8">
            <div className="w-24 h-24 bg-accent/5 rounded-3xl flex items-center justify-center mx-auto ring-1 ring-accent/10">
              <Upload className="w-10 h-10 text-accent" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-text-primary">
                Upload Exam Time-Table
              </h3>
              <p className="text-sm text-text-secondary">
                Ensure this is the final timetable reviewed by the examination
                board.
              </p>
            </div>

            <div className="relative group">
              <label
                className={cn(
                  "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300",
                  masterFile
                    ? "border-accent bg-accent/[0.02]"
                    : "border-border hover:border-accent hover:bg-accent/[0.02]",
                )}
              >
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  {masterFile ? (
                    <>
                      <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8 text-accent" />
                      </div>
                      <p className="text-sm font-bold text-text-primary max-w-[200px] truncate">
                        {masterFile?.name}
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        {(masterFile?.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-text-muted mb-4 group-hover:text-accent transition-colors" />
                      <p className="text-sm font-bold text-text-primary">
                        Press to upload or drag & drop
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        Accepts PDF, PNG or JPG (Max 20MB)
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                />
              </label>

              {masterFile && (
                <button
                  onClick={() => setMasterFile(null)}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-error rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* SUCCESS STATE */
        <div className="bg-surface border border-border rounded-3xl p-16 shadow-sm text-center space-y-8 animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>

          <div className="max-w-md mx-auto space-y-3">
            <h3 className="text-3xl font-bold text-text-primary">
              {mode === "publish" ? "Publishing Confirmed" : "Draft Saved"}
            </h3>
            <p className="text-text-secondary">
              {mode === "publish"
                ? `The date sheet for ${series.title} has been published to all portals.`
                : `Your document for ${series.title} has been saved as a draft.`}
            </p>
          </div>

          <div className="flex gap-4 max-w-sm mx-auto">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setIsSuccess(false)}
            >
              Modify Document
            </Button>
            <Link href="/admin/exams" className="flex-1">
              <Button size="lg" className="w-full">
                Done
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h4 className="font-bold text-text-primary mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-accent" />
            Important Notice
          </h4>
          <p className="text-sm text-text-secondary leading-relaxed">
            Ensure the date sheet has been reviewed and signed by the principal
            before publishing. Modifications after publishing will trigger new
            notifications for all students.
          </p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h4 className="font-bold text-text-primary mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            Next Steps
          </h4>
          <p className="text-sm text-text-secondary leading-relaxed">
            After publishing the date sheet, you can proceed to assign
            invigilator duties and generate seating plans for the exam centers.
          </p>
        </div>
      </div>
    </div>
  );
}
