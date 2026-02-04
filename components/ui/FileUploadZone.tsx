"use client";

import { useState } from "react";
import { Upload, FileText, Trash2 } from "lucide-react";
import { cn } from "@/lib/common/utils";

interface FileUploadZoneProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in MB
  title?: string;
  description?: string;
}

export function FileUploadZone({
  file,
  onFileChange,
  accept = ".pdf,.png,.jpg,.jpeg",
  maxSize = 20,
  title = "Drop your file here",
  description = "or click to browse from your computer",
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange(e.dataTransfer.files[0]);
    }
  };

  const getAcceptedFormats = () => {
    const formats = accept
      .split(",")
      .map((f) => f.trim().replace(".", "").toUpperCase());
    return formats.join(", ");
  };

  return (
    <div className="relative group">
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center w-full min-h-[320px] border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 bg-surface",
          file || isDragging
            ? "border-accent bg-accent/[0.03]"
            : "border-border hover:border-accent hover:bg-accent/[0.02]",
          isDragging && "scale-[1.01] shadow-xl ring-4 ring-accent/20",
        )}
      >
        <div className="flex flex-col items-center justify-center p-10 text-center">
          {file ? (
            <>
              <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-accent" />
              </div>
              <p className="text-lg font-bold text-text-primary max-w-xs truncate">
                {file.name}
              </p>
              <p className="text-sm text-text-muted mt-2">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              <p className="text-xs text-accent mt-4 font-medium">
                Click the button above to publish or save as draft
              </p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-accent/5 rounded-3xl flex items-center justify-center mb-6 ring-1 ring-accent/10 group-hover:bg-accent/10 transition-colors">
                <Upload className="w-10 h-10 text-accent" />
              </div>
              <p className="text-xl font-bold text-text-primary">{title}</p>
              <p className="text-sm text-text-muted mt-2">{description}</p>
              <p className="text-xs text-text-muted mt-4 px-4 py-2 bg-secondary/5 rounded-full">
                {getAcceptedFormats()} • Max {maxSize}MB
              </p>
            </>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileInput}
        />
      </label>

      {file && (
        <button
          onClick={() => onFileChange(null)}
          className="absolute top-4 right-4 w-10 h-10 bg-error rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
