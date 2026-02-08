"use client";

import React, { useState, useEffect } from "react";
import { LucideIcon, Save, X } from "lucide-react";
import { cn } from "@/lib/common/utils";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import DateTimePicker from "@/components/ui/DateTimePicker";

export interface InfoField {
  key: string;
  label: string;
  icon?: LucideIcon;
  editable?: boolean; // Default true
  type?: "text" | "number" | "date" | "select";
  options?: { label: string; value: string }[]; // For select
  format?: (value: any) => string; // For display
  placeholder?: string;
}

interface InfoGridCardProps {
  title: string;
  data: Record<string, any>;
  fields: InfoField[];
  icon?: LucideIcon;
  onSave?: (data: any) => void;
  className?: string;
  columns?: 1 | 2;
  // Optional slots for standardization with ParentCard
  headerBadge?: React.ReactNode;
  customHeaderAction?: React.ReactNode;
}

export function InfoGridCard({
  title,
  data,
  fields,
  icon: HeaderIcon,
  onSave,
  className = "",
  columns = 2,
  headerBadge,
  customHeaderAction,
}: InfoGridCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(data);

  // Reset form data if parent data changes (and not editing)
  useEffect(() => {
    if (!isEditing) {
      setFormData(data);
    }
  }, [data, isEditing]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave?.(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(data);
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        "bg-background border border-border rounded-2xl shadow-sm overflow-hidden",
        className,
      )}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-surface/50">
        <div className="flex items-center gap-3">
          {HeaderIcon && (
            <div className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center shadow-sm">
              <HeaderIcon className="w-5 h-5 text-white" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-text-primary font-heading text-lg">
              {title}
            </h3>
            {headerBadge}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {!isEditing && customHeaderAction}

          {onSave &&
            (isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-lg hover:bg-surface-hover text-text-muted hover:text-error transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSave}
                  className="p-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors"
                >
                  <Save className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 rounded-lg hover:bg-surface-hover text-text-muted hover:text-accent transition-colors text-sm font-medium"
              >
                Edit
              </button>
            ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div
          className={`grid grid-cols-1 ${columns === 2 ? "sm:grid-cols-2" : ""} gap-y-6 gap-x-6`}
        >
          {fields.map((field, index) => {
            const ItemIcon = field.icon;
            const value = data[field.key];
            const isFieldEditable = field.editable !== false;

            return (
              <div key={index} className="flex items-start gap-3">
                {ItemIcon && (
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <ItemIcon className="w-4 h-4 text-accent" />
                  </div>
                )}
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-xs uppercase text-text-muted font-bold tracking-wide mb-1">
                    {field.label}
                  </p>

                  {isEditing && isFieldEditable ? (
                    <div className="mt-1">
                      {field.type === "select" ? (
                        <Select
                          value={formData[field.key]}
                          onValueChange={(val) => handleChange(field.key, val)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={field.placeholder || "Select..."}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === "date" ? (
                        <DateTimePicker
                          value={formData[field.key]}
                          onChange={(val) => handleChange(field.key, val)}
                          showTime={false}
                        />
                      ) : (
                        <Input
                          value={formData[field.key]}
                          onChange={(e) =>
                            handleChange(field.key, e.target.value)
                          }
                          className="text-sm min-w-fit"
                          type={field.type || "text"}
                        />
                      )}
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-text-primary break-words leading-relaxed">
                      {field.format ? field.format(value) : value || "—"}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
