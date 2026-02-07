"use client";

import { useState, ChangeEvent } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  X,
  AlertCircle,
  Info,
} from "lucide-react";
import { clsx } from "clsx";
import { DOCUMENT_LABELS, DocumentType } from "@/lib/admin/types/student";

interface DocumentUpload {
  file: File | null;
  preview: string | null;
  fileName: string;
}

interface DocumentConfig {
  type: DocumentType;
  required: boolean;
  description: string;
  accept: string;
}

interface DocumentsStepProps {
  isTransfer: boolean;
  grade: string;
}

const getGradeNumber = (grade: string): number => {
  const match = grade.match(/\d+/);
  return match ? parseInt(match[0]) : 1;
};

const getDocumentConfigs = (
  isTransfer: boolean,
  grade: string,
): DocumentConfig[] => {
  const gradeNum = getGradeNumber(grade);

  const configs: DocumentConfig[] = [
    {
      type: "b-form",
      required: true,
      description: "NADRA Child Registration Certificate - mandatory for all students",
      accept: "image/*,.pdf",
    },
    {
      type: "birth-certificate",
      required: true,
      description: "Union Council issued birth certificate",
      accept: "image/*,.pdf",
    },
    {
      type: "father-cnic",
      required: true,
      description: "Clear copy of father's CNIC (front & back)",
      accept: "image/*,.pdf",
    },
    {
      type: "mother-cnic",
      required: true,
      description: "Clear copy of mother's CNIC (front & back)",
      accept: "image/*,.pdf",
    },
    {
      type: "photos",
      required: true,
      description: "4-6 recent passport-size photographs with white background",
      accept: "image/*",
    },
  ];

  // Transfer-specific documents
  if (isTransfer) {
    configs.push({
      type: "school-leaving-certificate",
      required: gradeNum >= 2,
      description: "School leaving certificate attested by DEO",
      accept: "image/*,.pdf",
    });
    configs.push({
      type: "previous-result-card",
      required: gradeNum >= 2,
      description: "Result card / progress report from previous class",
      accept: "image/*,.pdf",
    });
    configs.push({
      type: "transfer-certificate",
      required: false,
      description: "Transfer certificate from previous school",
      accept: "image/*,.pdf",
    });

    if (gradeNum >= 6) {
      configs.push({
        type: "character-certificate",
        required: true,
        description: "Character certificate from previous school (required for Class 6+)",
        accept: "image/*,.pdf",
      });
    }
  }

  // Vaccination card for younger students
  if (gradeNum <= 3) {
    configs.push({
      type: "vaccination-card",
      required: gradeNum === 1,
      description:
        gradeNum === 1
          ? "Up-to-date vaccination/immunization card (required for Class 1)"
          : "Vaccination/immunization card (optional)",
      accept: "image/*,.pdf",
    });
  }

  return configs;
};

export default function DocumentsStep({ isTransfer, grade }: DocumentsStepProps) {
  const [uploads, setUploads] = useState<Record<string, DocumentUpload>>({});

  const documentConfigs = getDocumentConfigs(isTransfer, grade);
  const requiredDocs = documentConfigs.filter((d) => d.required);
  const optionalDocs = documentConfigs.filter((d) => !d.required);

  const uploadedCount = Object.values(uploads).filter((u) => u.file).length;
  const requiredUploadedCount = requiredDocs.filter(
    (d) => uploads[d.type]?.file,
  ).length;

  const handleFileUpload = (type: DocumentType, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploads((prev) => ({
          ...prev,
          [type]: {
            file,
            preview: file.type.startsWith("image/") ? (reader.result as string) : null,
            fileName: file.name,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (type: DocumentType) => {
    setUploads((prev) => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Upload required documents for student enrollment. All documents marked with{" "}
            <span className="font-bold text-red-500">*</span> are mandatory.
            {!isTransfer && (
              <span className="block mt-1 text-xs text-blue-600 dark:text-blue-300">
                Additional documents will be required if this is a transfer student (toggle in Step 1).
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-4 p-3 rounded-lg bg-surface-active/50">
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-semibold text-text-secondary">
              Upload Progress
            </span>
            <span className="font-bold text-accent">
              {uploadedCount} / {documentConfigs.length} uploaded
            </span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-gradient rounded-full transition-all duration-500"
              style={{
                width: `${documentConfigs.length > 0 ? (uploadedCount / documentConfigs.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
        {requiredUploadedCount < requiredDocs.length && (
          <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{requiredDocs.length - requiredUploadedCount} required remaining</span>
          </div>
        )}
      </div>

      {/* Required Documents */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
          <FileText className="w-4 h-4 text-accent" /> Required Documents
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {requiredDocs.map((doc) => (
            <DocumentUploadCard
              key={doc.type}
              config={doc}
              upload={uploads[doc.type]}
              onUpload={(e) => handleFileUpload(doc.type, e)}
              onRemove={() => handleRemove(doc.type)}
            />
          ))}
        </div>
      </div>

      {/* Optional Documents */}
      {optionalDocs.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-text-secondary flex items-center gap-2">
            <FileText className="w-4 h-4 text-text-muted" /> Optional Documents
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {optionalDocs.map((doc) => (
              <DocumentUploadCard
                key={doc.type}
                config={doc}
                upload={uploads[doc.type]}
                onUpload={(e) => handleFileUpload(doc.type, e)}
                onRemove={() => handleRemove(doc.type)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DocumentUploadCard({
  config,
  upload,
  onUpload,
  onRemove,
}: {
  config: DocumentConfig;
  upload?: DocumentUpload;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}) {
  const isUploaded = !!upload?.file;

  return (
    <div
      className={clsx(
        "relative p-4 rounded-xl border-2 border-dashed transition-all duration-200",
        isUploaded
          ? "border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-950/20"
          : config.required
            ? "border-border hover:border-accent/50 bg-surface-active/30"
            : "border-border/50 hover:border-border bg-surface-active/10",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={clsx(
            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
            isUploaded
              ? "bg-green-100 dark:bg-green-900/40"
              : "bg-accent/10",
          )}
        >
          {isUploaded ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
          ) : (
            <Upload className="w-5 h-5 text-accent" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-text-primary truncate">
              {DOCUMENT_LABELS[config.type]}
            </span>
            {config.required && (
              <span className="text-red-500 font-bold text-xs">*</span>
            )}
          </div>
          <p className="text-xs text-text-muted mt-0.5 line-clamp-2">
            {config.description}
          </p>

          {isUploaded ? (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-green-700 dark:text-green-400 font-medium truncate max-w-[180px]">
                {upload.fileName}
              </span>
              <button
                onClick={onRemove}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <label className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover cursor-pointer transition-colors">
              <Upload className="w-3 h-3" />
              Choose File
              <input
                type="file"
                accept={config.accept}
                onChange={onUpload}
                className="sr-only"
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
