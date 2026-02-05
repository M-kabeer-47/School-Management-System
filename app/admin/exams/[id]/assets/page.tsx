"use client";

import { useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, FileText, Users } from "lucide-react";
import { EXAM_SERIES } from "@/lib/admin/mock-data/exams";
import { AdmitCardsTab } from "@/components/admin/exams/assets/AdmitCardsTab";
import { AttendanceSheetsTab } from "@/components/admin/exams/assets/AttendanceSheetsTab";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/Tabs";

export default function GenerateAssetsPage() {
  const params = useParams();
  const series = EXAM_SERIES.find((s) => s.id === params.id) || EXAM_SERIES[0];
  const printRef = useRef<HTMLDivElement>(null);

  // Helper to get filter text for display
  const getFilterText = (selectedClass = "all", selectedSection = "all") => {
    const classText =
      selectedClass === "all" ? "All Classes" : `Class ${selectedClass}`;
    const sectionText =
      selectedSection === "all" ? "All Sections" : `Section ${selectedSection}`;
    return `${classText}, ${sectionText}`;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin/exams"
              className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-text-primary font-heading tracking-tight">
            Generate Assets
          </h1>
          <p className="text-text-secondary">
            Create printable materials for{" "}
            <span className="font-semibold text-text-primary">
              {series.title}
            </span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="admit-cards">
        <TabsList>
          <TabsTab value="admit-cards">
            <FileText className="w-4 h-4" />
            Admit Cards
          </TabsTab>
          <TabsTab value="attendance">
            <Users className="w-4 h-4" />
            Attendance Sheets
          </TabsTab>
        </TabsList>

        <TabsPanel value="admit-cards">
          <AdmitCardsTab
            seriesTitle={series.title}
            printRef={printRef}
            getFilterText={() => getFilterText()}
          />
        </TabsPanel>

        <TabsPanel value="attendance">
          <AttendanceSheetsTab examTitle={series.title} />
        </TabsPanel>
      </Tabs>
    </div>
  );
}
