"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Receipt,
  Save,
  Plus,
  Trash2,
  Pencil,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { PageHeader } from "@/components/admin/PageHeader";
import { feeHeads as initialData } from "@/lib/admin/mock-data/settings";
import { FeeHead } from "@/lib/admin/types/settings";

const FREQUENCIES = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "biannual", label: "Biannual" },
  { value: "annual", label: "Annual" },
  { value: "one-time", label: "One-time" },
];

export default function FeeStructurePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [feeHeads, setFeeHeads] = useState<FeeHead[]>(initialData);

  const handleSave = () => {
    console.log("Save Fee Structure:", feeHeads);
    setIsEditing(false);
  };

  const addFeeHead = () => {
    setFeeHeads([
      ...feeHeads,
      {
        id: `fee-${Date.now()}`,
        name: "",
        amount: 0,
        frequency: "monthly",
        applicableTo: "all",
        isActive: true,
      },
    ]);
  };

  const removeFeeHead = (id: string) => {
    setFeeHeads(feeHeads.filter((f) => f.id !== id));
  };

  const updateFeeHead = (id: string, field: keyof FeeHead, value: unknown) => {
    setFeeHeads(
      feeHeads.map((f) => (f.id === id ? { ...f, [field]: value } : f)),
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <PageHeader
        title="Fee Structure"
        subtitle="Define fee heads, amounts, and billing frequency"
      >
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="gap-2"
          >
            <Pencil className="w-3.5 h-3.5" /> Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFeeHeads(initialData);
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-accent hover:bg-accent-hover text-white gap-2"
            >
              <Save className="w-3.5 h-3.5" /> Save
            </Button>
          </div>
        )}
      </PageHeader>

      {/* Fee Heads */}
      <div className="space-y-3">
        {feeHeads.map((fee, index) => (
          <motion.div
            key={fee.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className={`bg-surface rounded-2xl border border-border p-5 shadow-sm transition-opacity ${
              !fee.isActive ? "opacity-50" : ""
            }`}
          >
            {isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Input
                    value={fee.name}
                    onChange={(e) =>
                      updateFeeHead(fee.id, "name", e.target.value)
                    }
                    placeholder="Fee head name"
                    className="max-w-xs"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateFeeHead(fee.id, "isActive", !fee.isActive)
                      }
                      className="text-text-muted hover:text-text-primary transition-colors"
                    >
                      {fee.isActive ? (
                        <ToggleRight className="w-7 h-7 text-accent" />
                      ) : (
                        <ToggleLeft className="w-7 h-7" />
                      )}
                    </button>
                    <button
                      onClick={() => removeFeeHead(fee.id)}
                      className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-text-muted hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-text-muted mb-1.5 block font-medium">
                      Amount (Rs.)
                    </label>
                    <Input
                      type="number"
                      value={fee.amount}
                      onChange={(e) =>
                        updateFeeHead(fee.id, "amount", Number(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted mb-1.5 block font-medium">
                      Frequency
                    </label>
                    <Select
                      value={fee.frequency}
                      onValueChange={(v) =>
                        updateFeeHead(fee.id, "frequency", v)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FREQUENCIES.map((f) => (
                          <SelectItem key={f.value} value={f.value}>
                            {f.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-text-muted mb-1.5 block font-medium">
                      Applicable To
                    </label>
                    <Input
                      value={
                        fee.applicableTo === "all"
                          ? "All Classes"
                          : (fee.applicableTo as string[]).join(", ")
                      }
                      readOnly
                      className="bg-surface-active cursor-default"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-text-primary">
                        {fee.name}
                      </h3>
                      {!fee.isActive && (
                        <span className="text-[10px] font-semibold text-text-muted bg-surface-active px-2 py-0.5 rounded-full">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-muted mt-0.5">
                      {fee.applicableTo === "all"
                        ? "All Classes"
                        : (fee.applicableTo as string[]).join(", ")}{" "}
                      &middot;{" "}
                      {FREQUENCIES.find((f) => f.value === fee.frequency)
                        ?.label || fee.frequency}
                    </p>
                  </div>
                </div>
                <span className="text-xl font-bold text-text-primary">
                  Rs. {fee.amount.toLocaleString()}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="outline"
            onClick={addFeeHead}
            className="w-full gap-2 border-dashed border-2 hover:border-accent hover:bg-accent/5"
          >
            <Plus className="w-4 h-4" /> Add Fee Head
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
