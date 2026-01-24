"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ReportCard, ReportCardClassic } from "@/components/reports";
import { mockReportCards } from "@/lib/mockData/reportCard";
import { PageHeaderIcons } from "@/utils/navigation/icons";
import { Button } from "@/components/ui/Button";
import { Download, Printer, LayoutGrid, GraduationCap } from "lucide-react";

type LayoutType = "modern" | "classic";

// Class data - In real app, this would come from API
const CLASSES = [
  { id: "class-5", name: "Class 5", section: "A" },
  { id: "class-6", name: "Class 6", section: "A" },
  { id: "class-7", name: "Class 7", section: "B" },
  { id: "class-8", name: "Class 8", section: "A" },
];

export default function ReportsPage() {
  const [selectedClass, setSelectedClass] = useState(CLASSES[0].id);
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>("modern");

  // Get report card data based on selected class
  const reportCardData = mockReportCards[selectedClass];

  const handleDownload = () => {
    // In real app, generate PDF using @react-pdf/renderer and download
    window.print();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page Header - Hidden when printing */}
      <div className="mb-6 md:mb-8 no-print">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-bold font-heading text-text-primary flex items-center gap-2 md:gap-3"
        >
          Report Card
          <PageHeaderIcons.Reports className="w-8 h-8 md:w-12 md:h-12" />
        </motion.h1>
        <p className="text-text-secondary mt-1 md:mt-2 text-xs md:text-base">
          View your academic performance and progress report.
        </p>
      </div>

      {/* Controls Bar - Hidden when printing */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6 no-print"
      >
        {/* Left Controls */}
        <div className="flex flex-wrap gap-4">
          {/* Class Selector */}
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-text-secondary" />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 text-sm font-medium rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            >
              {CLASSES.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - Section {cls.section}
                </option>
              ))}
            </select>
          </div>

          {/* Layout Selector */}
          <div className="flex items-center gap-2 border-l border-border pl-4">
            <LayoutGrid className="w-4 h-4 text-text-secondary" />
            <div className="flex gap-1 bg-surface rounded-lg p-1">
              <button
                onClick={() => setSelectedLayout("modern")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  selectedLayout === "modern"
                    ? "bg-accent text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                }`}
              >
                Modern
              </button>
              <button
                onClick={() => setSelectedLayout("classic")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  selectedLayout === "classic"
                    ? "bg-accent text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                }`}
              >
                Classic
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="default" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </motion.div>

      {/* Report Card */}
      <motion.div
        key={`${selectedLayout}-${selectedClass}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center"
      >
        {selectedLayout === "modern" ? (
          <ReportCard data={reportCardData} />
        ) : (
          <ReportCardClassic data={reportCardData} />
        )}
      </motion.div>
    </motion.div>
  );
}
