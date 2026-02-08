"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Save, Pencil, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/admin/PageHeader";
import { passFailCriteria as initialData } from "@/lib/admin/mock-data/settings";
import { PassFailCriteria } from "@/lib/admin/types/settings";

export default function PassFailPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<PassFailCriteria>(initialData);

  const handleSave = () => {
    console.log("Save Pass/Fail Criteria:", data);
    setIsEditing(false);
  };

  const fields: {
    key: keyof PassFailCriteria;
    label: string;
    type: "number" | "toggle";
    suffix?: string;
  }[] = [
    {
      key: "overallMinPercentage",
      label: "Overall Minimum Percentage",
      type: "number",
      suffix: "%",
    },
    {
      key: "perSubjectMinPercentage",
      label: "Per-Subject Minimum Percentage",
      type: "number",
      suffix: "%",
    },
    {
      key: "graceMarksAllowed",
      label: "Allow Grace Marks",
      type: "toggle",
    },
    {
      key: "maxGraceMarks",
      label: "Maximum Grace Marks",
      type: "number",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <PageHeader
        title="Pass / Fail Criteria"
        subtitle="Define minimum marks required to pass"
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
              variant="ghost"
              size="sm"
              onClick={() => {
                setData(initialData);
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

      {/* Fields */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface rounded-2xl border border-border divide-y divide-border shadow-sm overflow-hidden"
      >
        {fields.map((field, index) => {
          const value = data[field.key];
          return (
            <motion.div
              key={field.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.03 }}
              className="flex items-center gap-4 px-6 py-4 hover:bg-surface-hover/30 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4 text-accent" />
              </div>
              <span className="text-sm text-text-secondary flex-1 font-medium">
                {field.label}
              </span>
              {field.type === "toggle" ? (
                isEditing ? (
                  <button
                    onClick={() => setData({ ...data, [field.key]: !value })}
                    className="text-text-muted hover:text-text-primary transition-colors"
                  >
                    {value ? (
                      <ToggleRight className="w-8 h-8 text-accent" />
                    ) : (
                      <ToggleLeft className="w-8 h-8" />
                    )}
                  </button>
                ) : (
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      value
                        ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                        : "bg-surface-active text-text-muted"
                    }`}
                  >
                    {value ? "Yes" : "No"}
                  </span>
                )
              ) : isEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={value as number}
                    onChange={(e) =>
                      setData({
                        ...data,
                        [field.key]: Number(e.target.value),
                      })
                    }
                    className="w-24"
                  />
                  {field.suffix && (
                    <span className="text-sm text-text-muted font-medium">
                      {field.suffix}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-xl font-bold text-text-primary">
                  {value as number}
                  {field.suffix || ""}
                </span>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
