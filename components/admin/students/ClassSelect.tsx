"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface ClassSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  label?: string;
  allLabel?: string;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
}

export function ClassSelect({
  value,
  onChange,
  options,
  placeholder = "Select Class",
  label,
  allLabel = "All Classes",
  className,
  side,
}: ClassSelectProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent side={side} position="popper">
          <SelectItem value="all">{allLabel}</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option.startsWith("Section") ? option : `Grade ${option}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
