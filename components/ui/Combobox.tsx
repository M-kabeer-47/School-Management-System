"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export type ComboboxOption = {
  value: string;
  label: string;
  avatar?: string;
  subtitle?: string;
};

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  dropdownClassName?: string;
  emptyMessage?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  className,
  dropdownClassName,
  emptyMessage = "No results found.",
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(search.toLowerCase()) ||
        option.subtitle?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  const selectedOption = useMemo(
    () => options.find((o) => o.value === value),
    [options, value],
  );

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={clsx("relative w-full", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex w-full items-center justify-between rounded-xl border bg-surface px-3 py-2.5 text-sm ring-offset-background placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          isOpen
            ? "ring-2 ring-accent border-accent"
            : "border-border hover:border-gray-400",
          !value && "text-text-muted",
        )}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedOption ? (
            <>
              {selectedOption.avatar && (
                <img
                  src={selectedOption.avatar}
                  alt=""
                  className="w-5 h-5 rounded-full object-cover"
                />
              )}
              <span className="text-text-primary font-medium">
                {selectedOption.label}
              </span>
            </>
          ) : (
            placeholder
          )}
        </span>
        <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
      </button>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={clsx(
              "absolute z-50 mt-1 w-full overflow-auto rounded-xl border border-border bg-surface p-1 shadow-lg text-text-primary",
              dropdownClassName || "max-h-60",
            )}
          >
            {/* Search Input */}
            <div className="flex items-center border-b border-border px-3 py-2 sticky top-0 bg-surface z-10">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                className="flex h-6 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-text-muted"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="ml-1 text-text-muted hover:text-text-primary"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Options List */}
            <div className="pt-1">
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-center text-sm text-text-muted">
                  {emptyMessage}
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={clsx(
                      "relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 px-3 text-sm outline-none transition-colors hover:bg-accent/10 hover:text-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-3 text-left",
                      value === option.value &&
                        "bg-accent/10 text-accent font-medium",
                    )}
                  >
                    <div className="flex items-center justify-center w-4 h-4 shrink-0">
                      {value === option.value && <Check className="w-4 h-4" />}
                    </div>

                    {option.avatar && (
                      <img
                        src={option.avatar}
                        alt=""
                        className="w-6 h-6 rounded-full object-cover border border-border shrink-0"
                      />
                    )}

                    <div className="flex flex-col">
                      <span>{option.label}</span>
                      {option.subtitle && (
                        <span className="text-xs text-text-muted font-normal">
                          {option.subtitle}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
