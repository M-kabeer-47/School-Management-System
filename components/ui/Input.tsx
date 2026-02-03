"use client";
import * as React from "react";
import { cn } from "@/lib/common/utils";

interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
  label?: string;
  leftIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, leftIcon, id, ...props }, ref) => {
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
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-4 flex items-center justify-center pointer-events-none text-text-muted/60">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            id={id}
            className={cn(
              "flex h-11 w-full rounded-xl border-2 bg-background py-2 text-sm text-text-primary font-body transition-all duration-200",
              "placeholder:text-text-muted/60",
              "focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-active",
              "hover:border-border-strong",
              leftIcon ? "pl-11 pr-4" : "px-4",
              // Error state
              error
                ? "border-error hover:border-error focus:border-error focus:ring-error/30"
                : "border-border",
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
