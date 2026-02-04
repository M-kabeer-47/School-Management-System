"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, AlertCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EXAM_SERIES } from "@/lib/admin/mock-data/exams";
import { FileUploadZone } from "@/components/ui/FileUploadZone";

export default function InvigilationPage() {
  const params = useParams();
  const series = EXAM_SERIES.find((s) => s.id === params.id) || EXAM_SERIES[0];

  const [dutyFile, setDutyFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mode, setMode] = useState<"draft" | "publish" | null>(null);

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
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
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
            Teacher Duties
          </h1>
          <p className="text-text-secondary">
            Upload the duty chart for{" "}
            <span className="font-semibold text-text-primary">
              {series.title}
            </span>
          </p>
        </div>

        {!isSuccess && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              disabled={!dutyFile || isProcessing}
              onClick={() => handleAction("draft")}
            >
              <Save className="w-5 h-5" />
              {isProcessing && mode === "draft" ? "Saving..." : "Save Draft"}
            </Button>
            <Button
              disabled={!dutyFile || isProcessing}
              onClick={() => handleAction("publish")}
            >
              <CheckCircle2 className="w-5 h-5" />
              {isProcessing && mode === "publish"
                ? "Publishing..."
                : "Publish to Staff"}
            </Button>
          </div>
        )}
      </div>

      {/* Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h4 className="font-bold text-text-primary mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-accent" />
            What to Upload
          </h4>
          <ul className="space-y-2 text-sm text-text-secondary leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
              <span>
                A PDF or image showing which teacher is assigned to which room
                and time slot.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
              <span>
                Make sure to include backup teachers (relievers) and floor
                supervisors.
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6">
          <h4 className="font-bold text-text-primary mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            What Happens Next
          </h4>
          <ul className="space-y-2 text-sm text-text-secondary leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <span>
                <strong className="text-text-primary">Publish:</strong> Teachers
                get notified and can view their duties in the app.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
              <span>
                <strong className="text-text-primary">Save Draft:</strong> Only
                you can see it. Teachers won't be notified yet.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {!isSuccess ? (
        <FileUploadZone
          file={dutyFile}
          onFileChange={setDutyFile}
          title="Drop your file here"
          description="or click to browse from your computer"
        />
      ) : (
        /* SUCCESS STATE */
        <div className="bg-surface border border-border rounded-3xl p-16 shadow-sm text-center space-y-8 animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>

          <div className="max-w-md mx-auto space-y-3">
            <h3 className="text-3xl font-bold text-text-primary">
              {mode === "publish" ? "Duties Published" : "Draft Saved"}
            </h3>
            <p className="text-text-secondary">
              {mode === "publish"
                ? `The teacher duties for ${series.title} have been notified to all assigned staff.`
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
              Modify Duties
            </Button>
            <Link href="/admin/exams" className="flex-1">
              <Button size="lg" className="w-full">
                Done
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
