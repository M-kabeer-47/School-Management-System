"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileCheck,
  Save,
  Pencil,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
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
import { documentRequirements as initialData } from "@/lib/admin/mock-data/settings";
import { DocumentRequirement } from "@/lib/admin/types/settings";

const APPLICABLE_LABELS: Record<string, string> = {
  all: "All Students",
  transfer: "Transfer Students",
  "class-1": "Class 1 Only",
  "class-6-plus": "Class 6+",
};

export default function DocumentsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [docs, setDocs] = useState<DocumentRequirement[]>(initialData);

  const handleSave = () => {
    console.log("Save Document Requirements:", docs);
    setIsEditing(false);
  };

  const toggleMandatory = (type: string) => {
    setDocs(
      docs.map((d) =>
        d.type === type ? { ...d, mandatory: !d.mandatory } : d,
      ),
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
        title="Required Documents"
        subtitle="Configure which documents are mandatory for student enrollment"
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
                setDocs(initialData);
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

      {/* Documents Table */}
      <Table>
        <TableHeader>
          <TableHeadRow>
            <TableHead>Document</TableHead>
            <TableHead className="w-[160px]">Applicable For</TableHead>
            <TableHead className="w-[120px] text-center">Required</TableHead>
          </TableHeadRow>
        </TableHeader>
        <TableBody>
          {docs.map((doc) => (
            <TableRow key={doc.type}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <FileCheck className="w-4 h-4 text-accent" />
                  </div>
                  <span className="font-medium text-text-primary">
                    {doc.label}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-xs text-text-muted bg-surface-active px-2.5 py-1 rounded-full">
                  {APPLICABLE_LABELS[doc.applicableFor] || doc.applicableFor}
                </span>
              </TableCell>
              <TableCell className="text-center">
                {isEditing ? (
                  <button
                    onClick={() => toggleMandatory(doc.type)}
                    className="transition-colors mx-auto block"
                  >
                    {doc.mandatory ? (
                      <ToggleRight className="w-8 h-8 text-accent" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-text-muted" />
                    )}
                  </button>
                ) : doc.mandatory ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" /> Mandatory
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted bg-surface-active px-2.5 py-1 rounded-full">
                    <ShieldOff className="w-3.5 h-3.5" /> Optional
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
