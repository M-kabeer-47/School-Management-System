"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  X,
  User,
  Phone,
  Mail,
  CreditCard,
  Briefcase,
} from "lucide-react";
import { ParentInfo } from "@/lib/types/profile";
import { cn } from "@/lib/shadcn/utils";
import { InfoRow } from "./InfoRow";

interface ParentCardProps {
  title: string;
  parent: ParentInfo;
  isPrimary?: boolean;
  onSave?: (data: ParentInfo) => void;
  onSetPrimary?: () => void;
}

export const ParentCard = ({
  title,
  parent,
  isPrimary = false,
  onSave,
  onSetPrimary,
}: ParentCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ParentInfo>(parent);

  const handleChange = (field: keyof ParentInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave?.(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(parent);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={
        "bg-background rounded-2xl border shadow-sm overflow-hidden border-border"
      }
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-surface/50">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              isPrimary
                ? "bg-accent-gradient text-white"
                : "bg-accent-gradient text-white",
            )}
          >
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary font-heading">
              {title}
            </h3>
            {isPrimary && (
              <span className="text-xs text-accent font-medium">
                Primary Contact
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isPrimary && !isEditing && (
            <button
              onClick={onSetPrimary}
              className="text-xs text-text-muted hover:text-accent transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-hover"
            >
              Set as Primary
            </button>
          )}

          {isEditing ? (
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
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <InfoRow
          icon={User}
          label="Full Name"
          value={parent.name}
          isEditing={isEditing}
          formValue={formData.name}
          onChange={(value) => handleChange("name", value)}
        />
        <InfoRow
          icon={CreditCard}
          label="CNIC"
          value={parent.cnic}
          isEditing={isEditing}
          formValue={formData.cnic}
          onChange={(value) => handleChange("cnic", value)}
        />
        <InfoRow
          icon={Mail}
          label="Email Address"
          value={parent.email}
          isEditing={isEditing}
          formValue={formData.email}
          onChange={(value) => handleChange("email", value)}
        />
        <InfoRow
          icon={Phone}
          label="Phone Number"
          value={parent.phone}
          isEditing={isEditing}
          formValue={formData.phone}
          onChange={(value) => handleChange("phone", value)}
        />
        <InfoRow
          icon={Briefcase}
          label="Occupation"
          value={parent.occupation || ""}
          isEditing={isEditing}
          formValue={formData.occupation || ""}
          onChange={(value) => handleChange("occupation", value)}
        />
      </div>
    </motion.div>
  );
};
