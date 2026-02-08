"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileImage,
  Save,
  Pencil,
  ToggleLeft,
  ToggleRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { reportCardConfig as initialData } from "@/lib/admin/mock-data/settings";
import { ReportCardConfig } from "@/lib/admin/types/settings";

const TEMPLATES: {
  id: ReportCardConfig["defaultTemplate"];
  name: string;
  description: string;
}[] = [
  {
    id: "modern",
    name: "Modern Template",
    description: "Clean, minimal design with colored headers and charts",
  },
  {
    id: "classic",
    name: "Classic Template",
    description: "Traditional report card format with bordered tables",
  },
];

export default function ReportCardPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<ReportCardConfig>(initialData);

  const handleSave = () => {
    console.log("Save Report Card Config:", data);
    setIsEditing(false);
  };

  const displayOptions: {
    key: keyof Omit<ReportCardConfig, "defaultTemplate">;
    label: string;
    description: string;
  }[] = [
    {
      key: "showAttendance",
      label: "Show Attendance",
      description: "Display attendance summary on the report card",
    },
    {
      key: "showRank",
      label: "Show Class Rank",
      description: "Display student rank within the class",
    },
    {
      key: "showRemarks",
      label: "Show Teacher Remarks",
      description: "Include teacher comments and remarks section",
    },
    {
      key: "showGradeScale",
      label: "Show Grade Scale",
      description: "Print the grading scale legend on the card",
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
        title="Report Card Template"
        subtitle="Select the default template and configure display options"
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

      {/* Template Selection */}
      <div>
        <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 px-1">
          Default Template
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEMPLATES.map((template, index) => {
            const isSelected = data.defaultTemplate === template.id;
            return (
              <motion.button
                key={template.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() =>
                  isEditing &&
                  setData({ ...data, defaultTemplate: template.id })
                }
                disabled={!isEditing}
                className={`p-6 rounded-2xl border-2 text-left transition-all shadow-sm ${
                  isSelected
                    ? "border-accent bg-accent/5 shadow-accent/10"
                    : "border-border bg-surface hover:border-border-strong"
                } ${!isEditing ? "cursor-default" : "cursor-pointer"}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isSelected ? "bg-accent/10" : "bg-surface-active"
                      }`}
                    >
                      <FileImage
                        className={`w-6 h-6 ${isSelected ? "text-accent" : "text-text-muted"}`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`text-base font-semibold ${isSelected ? "text-accent" : "text-text-primary"}`}
                      >
                        {template.name}
                      </h3>
                      <p className="text-sm text-text-muted mt-0.5">
                        {template.description}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Display Options */}
      <div>
        <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 px-1">
          Display Options
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface rounded-2xl border border-border divide-y divide-border shadow-sm overflow-hidden"
        >
          {displayOptions.map((option, index) => {
            const value = data[option.key];
            return (
              <motion.div
                key={option.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className="flex items-center justify-between px-6 py-5 hover:bg-surface-hover/30 transition-colors"
              >
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    {option.label}
                  </h3>
                  <p className="text-sm text-text-muted mt-0.5">
                    {option.description}
                  </p>
                </div>
                {isEditing ? (
                  <button
                    onClick={() => setData({ ...data, [option.key]: !value })}
                  >
                    {value ? (
                      <ToggleRight className="w-8 h-8 text-accent" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-text-muted" />
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
                    {value ? "Shown" : "Hidden"}
                  </span>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
