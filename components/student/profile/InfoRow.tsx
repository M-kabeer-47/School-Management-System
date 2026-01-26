"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

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
        <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                accentStyle
                    ? "bg-accent/15"
                    : "bg-accent-light/50"
            }`}
        >
            <Icon
                className={`w-4 h-4 ${
                    accentStyle ? "text-accent" : "text-accent"
                }`}
            />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-xs text-text-muted mb-0.5">{label}</p>
            {isEditing && onChange ? (
                <input
                    type="text"
                    value={formValue ?? value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full text-sm bg-surface border border-border rounded-lg px-3 py-1.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                />
            ) : (
                <p className="text-sm text-text-primary font-medium truncate">
                    {value || "—"}
                </p>
            )}
        </div>
    </div>
);
