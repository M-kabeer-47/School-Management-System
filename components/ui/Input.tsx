"use client";
import * as React from "react";
import { cn } from "@/lib/shadcn/utils";

interface InputProps extends React.ComponentProps<"input"> {
    error?: string;
    label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, label, id, ...props }, ref) => {
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
                <input
                    type={type}
                    id={id}
                    className={cn(
                        "flex h-11 w-full rounded-xl border-2 bg-background px-4 py-2 text-sm text-text-primary font-body transition-all duration-200",
                        "placeholder:text-text-muted/60",
                        "focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
                        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-active",
                        "hover:border-border-strong",
                        // Error state
                        error
                            ? "border-error hover:border-error focus:border-error focus:ring-error/30"
                            : "border-border",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-xs text-error">{error}</p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
