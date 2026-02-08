"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BadgePercent,
  Save,
  Plus,
  Trash2,
  Pencil,
  Zap,
  Info,
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
import { AddDiscountModal } from "@/components/admin/settings/AddDiscountModal";
import { feeConcessions as initialData } from "@/lib/admin/mock-data/settings";
import { FeeConcession } from "@/lib/admin/types/settings";

export default function FeeConcessionsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [discounts, setDiscounts] = useState<FeeConcession[]>(initialData);

  const handleSave = () => {
    console.log("Save Fee Discounts:", discounts);
    setIsEditing(false);
  };

  const handleAddDiscount = (data: {
    name: string;
    type: "percentage" | "fixed";
    value: number;
    description: string;
    autoApply: boolean;
  }) => {
    setDiscounts([
      ...discounts,
      {
        id: `conc-${Date.now()}`,
        name: data.name,
        type: data.type,
        value: data.value,
        description: data.description,
        isActive: true,
        autoApply: data.autoApply,
      },
    ]);
  };

  const removeDiscount = (id: string) => {
    setDiscounts(discounts.filter((c) => c.id !== id));
  };

  const updateDiscount = (
    id: string,
    field: keyof FeeConcession,
    value: unknown,
  ) => {
    setDiscounts(
      discounts.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
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
        title="Fee Discounts"
        subtitle="Manage discounts, scholarships, and fee waivers"
      >
        {!isEditing ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="gap-2"
            >
              <Pencil className="w-3.5 h-3.5" /> Edit
            </Button>
            <Button
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              className="bg-accent hover:bg-accent-hover text-white gap-2"
            >
              <Plus className="w-3.5 h-3.5" /> Add Discount
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDiscounts(initialData);
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
              <Save className="w-3.5 h-3.5" /> Save Changes
            </Button>
          </div>
        )}
      </PageHeader>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30"
      >
        <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <p className="text-sm text-blue-600 dark:text-blue-400 pt-1.5">
          Discounts with <strong>Auto-Apply</strong> are automatically applied
          to eligible students during fee generation.
        </p>
      </motion.div>

      {/* Discounts List */}
      <div className="space-y-3">
        {discounts.map((conc, index) => (
          <motion.div
            key={conc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className={`bg-surface rounded-2xl border border-border p-5 shadow-sm transition-opacity ${
              !conc.isActive ? "opacity-50" : ""
            }`}
          >
            {isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Input
                    value={conc.name}
                    onChange={(e) =>
                      updateDiscount(conc.id, "name", e.target.value)
                    }
                    placeholder="Discount name"
                    className="max-w-xs"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => removeDiscount(conc.id)}
                      className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-text-muted hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-text-muted mb-1.5 block font-medium">
                      Type
                    </label>
                    <Select
                      value={conc.type}
                      onValueChange={(v) => updateDiscount(conc.id, "type", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-text-muted mb-1.5 block font-medium">
                      {conc.type === "percentage"
                        ? "Percentage (%)"
                        : "Amount (Rs.)"}
                    </label>
                    <Input
                      type="number"
                      value={conc.value}
                      onChange={(e) =>
                        updateDiscount(conc.id, "value", Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() =>
                        updateDiscount(conc.id, "autoApply", !conc.autoApply)
                      }
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors w-full justify-center ${
                        conc.autoApply
                          ? "bg-accent/10 text-accent border border-accent/30"
                          : "bg-surface-active text-text-muted border border-border"
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                      {conc.autoApply ? "Auto-Apply ON" : "Auto-Apply OFF"}
                    </button>
                  </div>
                </div>
                <Input
                  value={conc.description}
                  onChange={(e) =>
                    updateDiscount(conc.id, "description", e.target.value)
                  }
                  placeholder="Description"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                    <BadgePercent className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-text-primary">
                        {conc.name}
                      </h3>
                      {conc.autoApply && (
                        <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Zap className="w-2.5 h-2.5" /> Auto
                        </span>
                      )}
                      {!conc.isActive && (
                        <span className="text-[10px] font-semibold text-text-muted bg-surface-active px-2 py-0.5 rounded-full">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-muted mt-0.5">
                      {conc.description}
                    </p>
                  </div>
                </div>
                <span className="text-xl font-bold text-text-primary">
                  {conc.type === "percentage"
                    ? `${conc.value}%`
                    : `Rs. ${conc.value.toLocaleString()}`}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AddDiscountModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddDiscount}
      />
    </motion.div>
  );
}
