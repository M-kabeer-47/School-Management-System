"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Save,
  Plus,
  Trash2,
  Pencil,
  ToggleLeft,
  ToggleRight,
  Info,
  CalendarClock,
  Banknote,
  ShieldCheck,
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
import { lateFeeConfig as initialData } from "@/lib/admin/mock-data/settings";
import { LateFeeConfig, LateFeeType, LateFeeSlab } from "@/lib/admin/types/settings";

const LATE_FEE_TYPES: { value: LateFeeType; label: string }[] = [
  { value: "fixed", label: "Fixed Amount" },
  { value: "per-day", label: "Per Day" },
  { value: "slab-based", label: "Slab-based" },
];

export default function LateFeeSettingsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [config, setConfig] = useState<LateFeeConfig>(initialData);

  const handleSave = () => {
    console.log("Save Late Fee Config:", config);
    setIsEditing(false);
  };

  const updateField = <K extends keyof LateFeeConfig>(
    field: K,
    value: LateFeeConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const addSlab = () => {
    const lastSlab = config.slabs[config.slabs.length - 1];
    const fromDay = lastSlab ? lastSlab.toDay + 1 : 1;
    updateField("slabs", [
      ...config.slabs,
      {
        id: `slab-${Date.now()}`,
        fromDay,
        toDay: fromDay + 9,
        amount: 0,
      },
    ]);
  };

  const removeSlab = (id: string) => {
    updateField(
      "slabs",
      config.slabs.filter((s) => s.id !== id)
    );
  };

  const updateSlab = (id: string, field: keyof LateFeeSlab, value: unknown) => {
    updateField(
      "slabs",
      config.slabs.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const getTypeLabel = (type: LateFeeType) =>
    LATE_FEE_TYPES.find((t) => t.value === type)?.label || type;

  const getAmountDisplay = () => {
    if (config.lateFeeType === "fixed") return `Rs. ${config.fixedAmount.toLocaleString()}`;
    if (config.lateFeeType === "per-day") return `Rs. ${config.perDayAmount.toLocaleString()} / day`;
    return `${config.slabs.length} slab${config.slabs.length !== 1 ? "s" : ""} defined`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <PageHeader
        title="Late Fee Rules"
        subtitle="Configure due dates, grace periods, and late fee penalties"
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
                setConfig(initialData);
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
          Late fees are automatically calculated based on these rules when
          challans become overdue after the grace period.
        </p>
      </motion.div>

      {/* Due Date & Grace Period */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-surface rounded-2xl border border-border p-5 shadow-sm"
      >
        {isEditing ? (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-text-primary">
              Due Date & Grace Period
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-text-muted mb-1.5 block font-medium">
                  Due Date (Day of Month)
                </label>
                <Input
                  type="number"
                  min={1}
                  max={28}
                  value={config.dueDateDay}
                  onChange={(e) =>
                    updateField("dueDateDay", Number(e.target.value))
                  }
                />
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1.5 block font-medium">
                  Grace Period (Days)
                </label>
                <Input
                  type="number"
                  min={0}
                  max={30}
                  value={config.gracePeriodDays}
                  onChange={(e) =>
                    updateField("gracePeriodDays", Number(e.target.value))
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                <CalendarClock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-primary">
                  Due Date & Grace Period
                </h3>
                <p className="text-sm text-text-muted mt-0.5">
                  Due by {config.dueDateDay}
                  {getOrdinalSuffix(config.dueDateDay)} of each month &middot;{" "}
                  {config.gracePeriodDays} day
                  {config.gracePeriodDays !== 1 ? "s" : ""} grace period
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Late Fee Type & Amount */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-surface rounded-2xl border border-border p-5 shadow-sm"
      >
        {isEditing ? (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-text-primary">
              Late Fee Type & Amount
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-text-muted mb-1.5 block font-medium">
                  Late Fee Type
                </label>
                <Select
                  value={config.lateFeeType}
                  onValueChange={(v) =>
                    updateField("lateFeeType", v as LateFeeType)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LATE_FEE_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {config.lateFeeType === "fixed" && (
                <div>
                  <label className="text-xs text-text-muted mb-1.5 block font-medium">
                    Fixed Amount (Rs.)
                  </label>
                  <Input
                    type="number"
                    value={config.fixedAmount}
                    onChange={(e) =>
                      updateField("fixedAmount", Number(e.target.value))
                    }
                  />
                </div>
              )}

              {config.lateFeeType === "per-day" && (
                <div>
                  <label className="text-xs text-text-muted mb-1.5 block font-medium">
                    Per Day Amount (Rs.)
                  </label>
                  <Input
                    type="number"
                    value={config.perDayAmount}
                    onChange={(e) =>
                      updateField("perDayAmount", Number(e.target.value))
                    }
                  />
                </div>
              )}
            </div>

            {/* Slab-based editing */}
            {config.lateFeeType === "slab-based" && (
              <div className="space-y-3 mt-2">
                <label className="text-xs text-text-muted font-medium">
                  Late Fee Slabs
                </label>
                {config.slabs.map((slab, index) => (
                  <motion.div
                    key={slab.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-end gap-3"
                  >
                    <div className="flex-1">
                      <label className="text-[11px] text-text-muted mb-1 block">
                        From Day
                      </label>
                      <Input
                        type="number"
                        min={1}
                        value={slab.fromDay}
                        onChange={(e) =>
                          updateSlab(slab.id, "fromDay", Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[11px] text-text-muted mb-1 block">
                        To Day
                      </label>
                      <Input
                        type="number"
                        min={slab.fromDay}
                        value={slab.toDay}
                        onChange={(e) =>
                          updateSlab(slab.id, "toDay", Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[11px] text-text-muted mb-1 block">
                        Amount (Rs.)
                      </label>
                      <Input
                        type="number"
                        value={slab.amount}
                        onChange={(e) =>
                          updateSlab(slab.id, "amount", Number(e.target.value))
                        }
                      />
                    </div>
                    <button
                      onClick={() => removeSlab(slab.id)}
                      className="p-2.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-text-muted hover:text-red-500 transition-colors mb-0.5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addSlab}
                  className="w-full gap-2 border-dashed border-2 hover:border-accent hover:bg-accent/5"
                >
                  <Plus className="w-4 h-4" /> Add Slab
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Banknote className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text-primary">
                    Late Fee — {getTypeLabel(config.lateFeeType)}
                  </h3>
                  <p className="text-sm text-text-muted mt-0.5">
                    {getAmountDisplay()}
                  </p>
                </div>
              </div>
            </div>

            {/* Show slabs in view mode */}
            {config.lateFeeType === "slab-based" && config.slabs.length > 0 && (
              <div className="ml-15 pl-0.5 space-y-2">
                {config.slabs.map((slab) => (
                  <div
                    key={slab.id}
                    className="flex items-center justify-between text-sm px-4 py-2.5 rounded-xl bg-surface-active"
                  >
                    <span className="text-text-secondary">
                      Day {slab.fromDay} – {slab.toDay}
                    </span>
                    <span className="font-semibold text-text-primary">
                      Rs. {slab.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Maximum Cap & Waiver */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-surface rounded-2xl border border-border p-5 shadow-sm"
      >
        {isEditing ? (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-text-primary">
              Maximum Cap & Waiver
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-text-muted mb-1.5 block font-medium">
                  Maximum Late Fee Cap (Rs.)
                </label>
                <Input
                  type="number"
                  value={config.maxLateFeeCap}
                  onChange={(e) =>
                    updateField("maxLateFeeCap", Number(e.target.value))
                  }
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => updateField("allowWaiver", !config.allowWaiver)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors w-full justify-center ${
                    config.allowWaiver
                      ? "bg-accent/10 text-accent border border-accent/30"
                      : "bg-surface-active text-text-muted border border-border"
                  }`}
                >
                  {config.allowWaiver ? (
                    <ToggleRight className="w-5 h-5" />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                  {config.allowWaiver
                    ? "Waiver Allowed"
                    : "Waiver Not Allowed"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-text-primary">
                    Cap & Waiver
                  </h3>
                  {config.allowWaiver && (
                    <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                      Waiver Allowed
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-muted mt-0.5">
                  Maximum late fee capped at Rs.{" "}
                  {config.maxLateFeeCap.toLocaleString()}
                </p>
              </div>
            </div>
            <span className="text-xl font-bold text-text-primary">
              Rs. {config.maxLateFeeCap.toLocaleString()}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/** Helper to get ordinal suffix for a number (1st, 2nd, 3rd, etc.) */
function getOrdinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
