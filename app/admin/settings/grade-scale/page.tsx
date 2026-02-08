"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Save, Pencil } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/admin/PageHeader";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import { gradeScaleConfig as initialData } from "@/lib/admin/mock-data/settings";
import { GradeScaleConfig } from "@/lib/admin/types/settings";

export default function GradeScalePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<GradeScaleConfig>(initialData);

  const handleSave = () => {
    console.log("Save Grade Scale:", data);
    setIsEditing(false);
  };

  const updateThreshold = (
    index: number,
    field: "grade" | "minPercentage" | "maxPercentage" | "description",
    value: string | number,
  ) => {
    const updated = [...data.thresholds];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, thresholds: updated });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <PageHeader
        title="Grade Scale"
        subtitle="Configure grading thresholds for report cards"
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

      {/* Passing Percentage Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-surface rounded-2xl border border-border px-6 py-5 flex items-center gap-4 shadow-sm"
      >
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Passing Percentage
          </span>
          <div className="mt-1">
            {isEditing ? (
              <Input
                type="number"
                value={data.passingPercentage}
                onChange={(e) =>
                  setData({
                    ...data,
                    passingPercentage: Number(e.target.value),
                  })
                }
                className="max-w-[100px]"
              />
            ) : (
              <span className="text-2xl font-bold text-text-primary">
                {data.passingPercentage}%
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Grade Table */}
      <Table>
        <TableHeader>
          <TableHeadRow>
            <TableHead className="w-[100px]">Grade</TableHead>
            <TableHead className="w-[120px]">Min %</TableHead>
            <TableHead className="w-[120px]">Max %</TableHead>
            <TableHead>Description</TableHead>
          </TableHeadRow>
        </TableHeader>
        <TableBody>
          {data.thresholds.map((threshold, index) => (
            <TableRow
              key={threshold.grade}
              className={
                threshold.grade === "F" ? "bg-red-50/50 dark:bg-red-950/10" : ""
              }
            >
              <TableCell>
                {isEditing ? (
                  <Input
                    value={threshold.grade}
                    onChange={(e) =>
                      updateThreshold(index, "grade", e.target.value)
                    }
                    className="w-20"
                  />
                ) : (
                  <span
                    className={`text-base font-bold ${
                      threshold.grade === "F"
                        ? "text-red-500"
                        : threshold.grade.startsWith("A")
                          ? "text-green-600 dark:text-green-400"
                          : "text-text-primary"
                    }`}
                  >
                    {threshold.grade}
                  </span>
                )}
              </TableCell>
              <TableCell>
                {isEditing ? (
                  <Input
                    type="number"
                    value={threshold.minPercentage}
                    onChange={(e) =>
                      updateThreshold(
                        index,
                        "minPercentage",
                        Number(e.target.value),
                      )
                    }
                    className="w-20"
                  />
                ) : (
                  <span className="text-text-secondary font-medium">
                    {threshold.minPercentage}%
                  </span>
                )}
              </TableCell>
              <TableCell>
                {isEditing ? (
                  <Input
                    type="number"
                    value={threshold.maxPercentage}
                    onChange={(e) =>
                      updateThreshold(
                        index,
                        "maxPercentage",
                        Number(e.target.value),
                      )
                    }
                    className="w-20"
                  />
                ) : (
                  <span className="text-text-secondary font-medium">
                    {threshold.maxPercentage}%
                  </span>
                )}
              </TableCell>
              <TableCell>
                {isEditing ? (
                  <Input
                    value={threshold.description}
                    onChange={(e) =>
                      updateThreshold(index, "description", e.target.value)
                    }
                  />
                ) : (
                  <span className="text-text-muted">
                    {threshold.description}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
