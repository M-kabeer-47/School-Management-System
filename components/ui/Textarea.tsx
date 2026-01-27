"use client";

import * as React from "react";
import { cn } from "@/lib/shadcn/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-[120px] w-full rounded-xl border-2 bg-background px-4 py-3 text-sm text-text-primary font-body transition-all duration-200",
            "placeholder:text-text-muted/60",
            "focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-active",
            "hover:border-border-strong resize-y",
            // Error state
            error
              ? "border-error hover:border-error focus:border-error focus:ring-error/30"
              : "border-border",
            className,
          )}
          ref={ref}
          id={id}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
