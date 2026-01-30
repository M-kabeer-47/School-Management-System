"use client";

import { useState, useEffect } from "react";
import { Student } from "@/lib/admin/types/student";
import { Button } from "@/components/ui/Button";
import {
  Edit,
  GraduationCap,
  Users,
  Hash,
  Calendar,
  CreditCard,
  Save,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import DateTimePicker from "@/components/ui/DateTimePicker";

interface StudentOverviewCardProps {
  student: Student;
  onEdit?: () => void; // Legacy prop, can be removed if handled internally
  onSave?: (data: Student) => void;
}

export function StudentOverviewCard({
  student,
  onSave,
}: StudentOverviewCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Student>(student);

  // Helper for "Flat" Initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    if (!isEditing) {
      setFormData(student);
    }
  }, [student, isEditing]);

  const handleChange = (key: keyof Student, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave?.(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(student);
    setIsEditing(false);
  };

  // Field Definition for Academic Section (Manual mapping to preserve specific layout/icons if needed, or loop)
  // We will loop to keep it clean like InfoGridCard but specific to this component's needs.
  const academicFields = [
    { key: "admissionNo", label: "Admission No", icon: Hash, editable: false }, // Often not editable
    {
      key: "class",
      label: "Class",
      icon: GraduationCap,
      type: "select",
      options: Array.from({ length: 12 }, (_, i) => ({
        label: `Class ${i + 1}`,
        value: `${i + 1}`,
      })),
    },
    {
      key: "section",
      label: "Section",
      icon: Users,
      type: "select",
      options: ["A", "B", "C", "D"].map((s) => ({
        label: `Section ${s}`,
        value: s,
      })),
    },
    {
      key: "rollNo",
      label: "Roll Number",
      icon: Hash,
      getValue: (s: Student) => s.id.split("-")[1],
      editable: false,
    }, // Computed from ID
    {
      key: "registrationDate",
      label: "Admitted",
      icon: Calendar,
      type: "date",
    },
    {
      key: "monthlyFee",
      label: "Monthly Fee",
      icon: CreditCard,
      type: "number",
      format: (v: number) => `PKR ${v.toLocaleString()}`,
    },
  ];

  return (
    <div className="bg-background border border-border rounded-2xl shadow-sm overflow-visible flex flex-col lg:flex-row">
      {/* Left Side: Identity */}
      <div className="p-6 flex flex-col lg:w-[35%] flex-shrink-0 items-center justify-center border-b lg:border-b-0 lg:border-r border-border bg-surface/10">
        <div className="flex-shrink-0 mb-4 w-full flex justify-center">
          {/* Flat Picture Implementation - Responsive Size */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-64 rounded-2xl overflow-hidden bg-accent/10 flex items-center justify-center text-accent shadow-sm border border-border">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading">
              {getInitials(student.studentName)}
            </span>
          </div>
        </div>

        <div className="text-center w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary font-heading leading-tight break-words">
            {student.studentName}
          </h2>
        </div>
      </div>

      {/* Right Side: Academic Info */}
      <div className="p-4 sm:p-6 flex-1 bg-surface/30">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="font-bold text-text-primary font-heading flex items-center gap-2 text-base sm:text-lg">
            <GraduationCap className="w-5 h-5 text-accent" />
            ACADEMIC INFORMATION
          </h3>

          {/* Edit Actions */}
          <div className="flex items-center gap-2">
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

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-4 sm:gap-x-6">
          {academicFields.map((field, index) => {
            const ItemIcon = field.icon;
            // Handle computed values vs direct keys
            const rawValue = field.getValue
              ? field.getValue(student)
              : (student as any)[field.key];
            const formValue = (formData as any)[field.key];
            const isFieldEditable = field.editable !== false;

            return (
              <div key={index} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <ItemIcon className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0 pt-0.5 flex-1">
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wide mb-0.5 sm:mb-1">
                    {field.label}
                  </p>

                  {isEditing && isFieldEditable ? (
                    <div className="mt-1">
                      {field.type === "select" ? (
                        <Select
                          value={String(formValue)}
                          onValueChange={(val) =>
                            handleChange(field.key as keyof Student, val)
                          }
                        >
                          <SelectTrigger className="h-9 w-full">
                            <SelectValue placeholder="Select..." />
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
                          value={String(formValue)}
                          onChange={(val) =>
                            handleChange(field.key as keyof Student, val)
                          }
                          showTime={false}
                        />
                      ) : (
                        <Input
                          value={String(formValue)}
                          onChange={(e) =>
                            handleChange(
                              field.key as keyof Student,
                              e.target.value,
                            )
                          }
                          className="h-9 text-sm"
                          type={field.type || "text"}
                        />
                      )}
                    </div>
                  ) : (
                    <p className="text-sm font-semibold text-text-primary truncate">
                      {field.format ? field.format(rawValue as any) : rawValue}
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
