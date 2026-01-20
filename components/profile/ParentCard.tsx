"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Save, X, User, Phone, Mail, CreditCard, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { ParentInfo } from "@/lib/types/profile";
import { cn } from "@/lib/shadcn/utils";

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

    const InfoRow = ({
        icon: Icon,
        label,
        value,
        field,
    }: {
        icon: React.ElementType;
        label: string;
        value: string;
        field: keyof ParentInfo;
    }) => (
        <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-surface-active flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-text-muted" />
            </div>
            <div className="flex-1 min-w-0">
                {isEditing ? (
                    <Input
                        label={label}
                        value={formData[field] || ""}
                        onChange={(e) => handleChange(field, e.target.value)}
                    />
                ) : (
                    <>
                        <p className="text-xs text-text-muted mb-0.5">{label}</p>
                        <p className="text-sm text-text-primary font-medium truncate">
                            {value || "—"}
                        </p>
                    </>
                )}
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "bg-background rounded-2xl border shadow-sm overflow-hidden",
                isPrimary ? "border-accent/50 ring-1 ring-accent/20" : "border-border"
            )}
        >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-surface/50">
                <div className="flex items-center gap-3">
                    <div
                        className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            isPrimary
                                ? "bg-accent-gradient text-white"
                                : "bg-surface-active text-text-secondary"
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
                            className="p-2 rounded-lg hover:bg-surface-hover text-text-muted hover:text-accent transition-colors"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                <InfoRow icon={User} label="Full Name" value={parent.name} field="name" />
                <InfoRow icon={CreditCard} label="CNIC" value={parent.cnic} field="cnic" />
                <InfoRow icon={Mail} label="Email Address" value={parent.email} field="email" />
                <InfoRow icon={Phone} label="Phone Number" value={parent.phone} field="phone" />
                <InfoRow icon={Briefcase} label="Occupation" value={parent.occupation || ""} field="occupation" />
            </div>
        </motion.div>
    );
};
