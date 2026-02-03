"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  isEditing?: boolean;
  formValue?: string;
  onChange?: (value: string) => void;
  /** Use accent styling (accent-light bg, accent icon) vs default (surface-active bg, text-muted icon) */
  accentStyle?: boolean;
}

export const InfoRow = ({
  icon: Icon,
  label,
  value,
  isEditing = false,
  formValue,
  onChange,
  accentStyle = false,
}: InfoRowProps) => (
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-accent/15">
      <Icon className="w-4 h-4 text-accent" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-text-muted mb-0.5">{label}</p>
      {isEditing && onChange ? (
        <Input
          value={formValue ?? value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 px-3"
        />
      ) : (
        <p className="text-sm text-text-primary font-medium truncate">
          {value || "—"}
        </p>
      )}
    </div>
  </div>
);
