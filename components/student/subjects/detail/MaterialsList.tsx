"use client";

import { Material, MaterialFileType } from "@/lib/student/types/subjectDetail";
import { FileText, Video, Presentation } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";

interface MaterialsListProps {
  materials: Material[];
}

const getFileTypeConfig = (fileType: MaterialFileType) => {
  switch (fileType) {
    case "pdf":
      return {
        icon: FileText,
        iconColor: "text-error",
        label: "PDF",
      };
    case "video":
      return {
        icon: Video,
        iconColor: "text-accent",
        label: "Video",
      };
    case "slides":
      return {
        icon: Presentation,
        iconColor: "text-warning",
        label: "Slides",
      };
    default:
      return {
        icon: FileText,
        iconColor: "text-text-muted",
        label: "File",
      };
  }
};

export const MaterialsList = ({ materials }: MaterialsListProps) => {
  const handleDownload = (material: Material) => {
    window.open(material.downloadUrl, "_blank");
  };

  if (materials.length === 0) {
    return (
      <div className="text-center py-12 text-text-muted bg-surface rounded-2xl border border-dashed border-border">
        No learning materials uploaded yet.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow-sm rounded-none sm:rounded-2xl border-x-0 sm:border-x border-y border-border">
            <Table className="min-w-full">
              <TableHeader>
                <TableHeadRow>
                  <TableHead className="text-sm">Type</TableHead>
                  <TableHead className="text-sm">File Name</TableHead>
                  <TableHead className="text-center w-28 text-sm">
                    Action
                  </TableHead>
                </TableHeadRow>
              </TableHeader>
              <TableBody>
                {materials.map((material) => {
                  const config = getFileTypeConfig(material.fileType);
                  const Icon = config.icon;

                  return (
                    <TableRow key={material.id}>
                      <TableCell className="w-24">
                        <div className="flex items-center gap-2">
                          <Icon
                            className={clsx(
                              "w-4 h-4 flex-shrink-0",
                              config.iconColor,
                            )}
                          />
                          <span className="text-xs font-medium text-text-secondary uppercase whitespace-nowrap">
                            {config.label}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-text-primary text-sm">
                        {material.name}
                      </TableCell>
                      <TableCell className="text-center">
                        <button
                          onClick={() => handleDownload(material)}
                          className="text-accent hover:text-accent-hover text-sm font-semibold hover:underline transition-colors whitespace-nowrap"
                        >
                          Download
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
