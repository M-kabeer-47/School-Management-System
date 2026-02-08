"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Save,
  Pencil,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
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
import { promotionRules as initialData } from "@/lib/admin/mock-data/settings";
import { PromotionRules } from "@/lib/admin/types/settings";

export default function PromotionRulesPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<PromotionRules>(initialData);

  const handleSave = () => {
    console.log("Save Promotion Rules:", data);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <PageHeader
        title="Promotion Rules"
        subtitle="Criteria for promoting students to the next class"
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

      {/* Toggle Settings */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface rounded-2xl border border-border divide-y divide-border shadow-sm overflow-hidden"
      >
        {/* Auto-Promote */}
        <div className="flex items-center justify-between px-6 py-5 hover:bg-surface-hover/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary">
                Auto-Promote on Pass
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Automatically promote students who meet pass criteria
              </p>
            </div>
          </div>
          {isEditing ? (
            <button
              onClick={() =>
                setData({ ...data, autoPromoteOnPass: !data.autoPromoteOnPass })
              }
            >
              {data.autoPromoteOnPass ? (
                <ToggleRight className="w-8 h-8 text-accent" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-text-muted" />
              )}
            </button>
          ) : (
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                data.autoPromoteOnPass
                  ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                  : "bg-surface-active text-text-muted"
              }`}
            >
              {data.autoPromoteOnPass ? "Enabled" : "Disabled"}
            </span>
          )}
        </div>

        {/* Grace Marks */}
        <div className="flex items-center justify-between px-6 py-5 hover:bg-surface-hover/30 transition-colors">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">
              Allow Grace Marks
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              Award additional marks to borderline students
            </p>
          </div>
          {isEditing ? (
            <button
              onClick={() =>
                setData({ ...data, allowGraceMarks: !data.allowGraceMarks })
              }
            >
              {data.allowGraceMarks ? (
                <ToggleRight className="w-8 h-8 text-accent" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-text-muted" />
              )}
            </button>
          ) : (
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                data.allowGraceMarks
                  ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                  : "bg-surface-active text-text-muted"
              }`}
            >
              {data.allowGraceMarks ? "Enabled" : "Disabled"}
            </span>
          )}
        </div>

        {/* Max Grace Marks */}
        <div className="flex items-center justify-between px-6 py-5 hover:bg-surface-hover/30 transition-colors">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">
              Max Grace Marks Per Subject
            </h3>
          </div>
          {isEditing ? (
            <Input
              type="number"
              value={data.maxGraceMarksPerSubject}
              onChange={(e) =>
                setData({
                  ...data,
                  maxGraceMarksPerSubject: Number(e.target.value),
                })
              }
              className="w-24"
            />
          ) : (
            <span className="text-xl font-bold text-text-primary">
              {data.maxGraceMarksPerSubject}
            </span>
          )}
        </div>

        {/* Compartment */}
        <div className="flex items-center justify-between px-6 py-5 hover:bg-surface-hover/30 transition-colors">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">
              Allow Compartment
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              Students can appear in supplementary exams for failed subjects
            </p>
          </div>
          {isEditing ? (
            <button
              onClick={() =>
                setData({
                  ...data,
                  compartmentAllowed: !data.compartmentAllowed,
                })
              }
            >
              {data.compartmentAllowed ? (
                <ToggleRight className="w-8 h-8 text-accent" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-text-muted" />
              )}
            </button>
          ) : (
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                data.compartmentAllowed
                  ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                  : "bg-surface-active text-text-muted"
              }`}
            >
              {data.compartmentAllowed ? "Enabled" : "Disabled"}
            </span>
          )}
        </div>

        {/* Max Compartment Subjects */}
        <div className="flex items-center justify-between px-6 py-5 hover:bg-surface-hover/30 transition-colors">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">
              Max Compartment Subjects
            </h3>
          </div>
          {isEditing ? (
            <Input
              type="number"
              value={data.maxCompartmentSubjects}
              onChange={(e) =>
                setData({
                  ...data,
                  maxCompartmentSubjects: Number(e.target.value),
                })
              }
              className="w-24"
            />
          ) : (
            <span className="text-xl font-bold text-text-primary">
              {data.maxCompartmentSubjects}
            </span>
          )}
        </div>

        {/* Detention Policy */}
        <div className="flex items-center justify-between px-6 py-5 hover:bg-surface-hover/30 transition-colors">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">
              Detention Policy
            </h3>
          </div>
          {isEditing ? (
            <Select
              value={data.detentionPolicy}
              onValueChange={(v) =>
                setData({
                  ...data,
                  detentionPolicy: v as "strict" | "lenient",
                })
              }
            >
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strict">Strict</SelectItem>
                <SelectItem value="lenient">Lenient</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <span className="text-sm font-semibold text-text-primary capitalize px-3 py-1 rounded-full bg-surface-active">
              {data.detentionPolicy}
            </span>
          )}
        </div>
      </motion.div>

      {/* Detention Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-900/30 p-5 flex items-start gap-4"
      >
        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2">
            Detention Rule
          </h4>
          {isEditing ? (
            <textarea
              value={data.detentionDescription}
              onChange={(e) =>
                setData({ ...data, detentionDescription: e.target.value })
              }
              className="w-full text-sm text-text-primary bg-white dark:bg-background border border-border rounded-xl p-3 min-h-[80px] resize-none"
            />
          ) : (
            <p className="text-sm text-amber-600 dark:text-amber-400/80">
              {data.detentionDescription}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
