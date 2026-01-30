"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/shadcn/utils";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  isLoading?: boolean;
  className?: string;
}

const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
  ({ className, placeholder = "Search...", value, onChange, onClear, isLoading = false }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleClear = () => {
      onChange("");
      onClear?.();
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative group/search",
          className,
        )}
      >
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors duration-200 group-hover/search:text-text-secondary">
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </div>

        {/* Input Field */}
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "pl-11 pr-10",
            isFocused && "ring-2 ring-accent/30 border-accent",
            "transition-all duration-200"
          )}
        />

        {/* Clear Button */}
        {value && !isLoading && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-text-muted hover:text-text-secondary hover:bg-surface-hover transition-all duration-200"
            aria-label="Clear search"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Focus Ring Effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl bg-accent/5 pointer-events-none transition-opacity duration-200",
            isFocused ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
    );
  },
);

SearchBar.displayName = "SearchBar";

export { SearchBar };
