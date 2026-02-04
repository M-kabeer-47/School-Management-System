"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Users,
  CheckCircle2,
  Download,
  Send,
  Calendar,
  Eye,
  Sparkles,
  Filter,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/common/utils";
import { EXAM_SERIES } from "@/lib/admin/mock-data/exams";
import {
  AdmitCardTemplate,
  ADMIT_CARD_TEMPLATES,
  SAMPLE_ADMIT_CARD_DATA,
} from "@/components/admin/exams/AdmitCardTemplates";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

// Mock classes data
const CLASSES = [
  { id: "all", name: "All Classes" },
  { id: "9", name: "Class 9" },
  { id: "10", name: "Class 10" },
  { id: "11", name: "Class 11" },
  { id: "12", name: "Class 12" },
];

const SECTIONS = [
  { id: "all", name: "All Sections" },
  { id: "A", name: "Section A" },
  { id: "B", name: "Section B" },
  { id: "C", name: "Section C" },
];

// Mock exam days for attendance sheets
const EXAM_DAYS = [
  { date: "2026-02-15", day: "Monday", subject: "Mathematics" },
  { date: "2026-02-17", day: "Wednesday", subject: "English" },
  { date: "2026-02-19", day: "Friday", subject: "Science" },
  { date: "2026-02-21", day: "Sunday", subject: "Social Studies" },
  { date: "2026-02-23", day: "Tuesday", subject: "Computer Science" },
];

type TabType = "admit-cards" | "attendance";

export default function GenerateAssetsPage() {
  const params = useParams();
  const series = EXAM_SERIES.find((s) => s.id === params.id) || EXAM_SERIES[0];
  const printRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<TabType>("admit-cards");
  const [selectedTemplate, setSelectedTemplate] = useState<
    "standard" | "compact" | "detailed" | null
  >(null);

  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handlePrint = () => {
    if (!printRef.current || !selectedTemplate) return;

    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Admit Cards - ${series.title}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            @page {
              margin: 0; /* Reset default browser print margins */
              size: auto;
            }
            body { 
              font-family: Arial, sans-serif; 
              background: white;
              padding: 40px 0;
              width: 100%;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              align-items: center; /* Horizontally center flex items */
            }
            .admit-card-template { 
              page-break-after: always;
              margin: 0 auto 20px auto !important; /* Force centering */
            }
            .admit-card-template:last-child { page-break-after: avoid; }
            
            /* Specific fix for printing */
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    // Wait for content to load properly before printing
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 250);
  };

  const handlePublishAdmitCards = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
    }, 2000);
  };

  const handleGenerateAttendance = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // Would trigger download here
    }, 1500);
  };

  const toggleDaySelection = (date: string) => {
    setSelectedDays((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date],
    );
  };

  const selectAllDays = () => {
    if (selectedDays.length === EXAM_DAYS.length) {
      setSelectedDays([]);
    } else {
      setSelectedDays(EXAM_DAYS.map((d) => d.date));
    }
  };

  // Get filter text for display
  const getFilterText = () => {
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

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-secondary/5 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("admit-cards")}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all",
            activeTab === "admit-cards"
              ? "bg-surface shadow-sm text-text-primary"
              : "text-text-secondary hover:text-text-primary",
          )}
        >
          <FileText className="w-4 h-4" />
          Admit Cards
        </button>
        <button
          onClick={() => setActiveTab("attendance")}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all",
            activeTab === "attendance"
              ? "bg-surface shadow-sm text-text-primary"
              : "text-text-secondary hover:text-text-primary",
          )}
        >
          <Users className="w-4 h-4" />
          Attendance Sheets
        </button>
      </div>

      {/* ADMIT CARDS TAB */}
      {activeTab === "admit-cards" && (
        <div className="space-y-6">
          {!isPublished ? (
            <>
              {/* Publish to Students Button */}
              {selectedTemplate && (
                <div className="flex justify-end">
                  <Button
                    onClick={handlePublishAdmitCards}
                    disabled={isPublishing}
                    size="lg"
                  >
                    <Send className="w-4 h-4" />
                    {isPublishing ? "Publishing..." : "Publish to All Students"}
                  </Button>
                </div>
              )}

              {/* Template Selection */}
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Choose a Template
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                  Select a design for the admit cards. Click to preview.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {ADMIT_CARD_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setSelectedTemplate(template.id);
                        setShowPreview(true);
                      }}
                      className={cn(
                        "relative p-4 rounded-xl border-2 transition-all text-left group overflow-hidden",
                        selectedTemplate === template.id
                          ? "border-accent ring-2 ring-accent/20"
                          : "border-border hover:border-accent/50",
                      )}
                    >
                      {/* Thumbnail Preview */}
                      <div className="h-40 w-full overflow-hidden rounded-lg bg-white mb-4 flex items-start justify-center">
                        <div className="transform scale-[0.28] origin-top pointer-events-none">
                          <AdmitCardTemplate
                            data={SAMPLE_ADMIT_CARD_DATA}
                            variant={template.id}
                          />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-text-primary">
                          {template.name}
                        </h4>
                        <p className="text-xs text-text-secondary mt-1">
                          {template.description}
                        </p>
                      </div>

                      {/* Selection Indicator */}
                      {selectedTemplate === template.id && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Preview Modal */}
              {showPreview && selectedTemplate && (
                <div className="bg-surface border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-text-primary flex items-center gap-2">
                      <Eye className="w-5 h-5 text-accent" />
                      Template Preview
                    </h3>
                  </div>
                  <div
                    ref={printRef}
                    className="flex justify-center bg-slate-100 dark:bg-slate-800/50 rounded-xl p-8"
                  >
                    <AdmitCardTemplate
                      data={SAMPLE_ADMIT_CARD_DATA}
                      variant={selectedTemplate}
                    />
                  </div>
                </div>
              )}

              {/* Print/Download Action */}
              {selectedTemplate && (
                <div className="flex justify-center">
                  <Button variant="outline" onClick={handlePrint} size="lg">
                    <Printer className="w-4 h-4" />
                    Print / Download PDF
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* SUCCESS STATE */
            <div className="bg-surface border border-border rounded-3xl p-16 shadow-sm text-center space-y-8 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12 text-success" />
              </div>

              <div className="max-w-md mx-auto space-y-3">
                <h3 className="text-3xl font-bold text-text-primary">
                  Admit Cards Published!
                </h3>
                <p className="text-text-secondary">
                  {getFilterText()} can now view and download their admit cards
                  from the student portal.
                </p>
              </div>

              <div className="flex gap-4 max-w-sm mx-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => {
                    setIsPublished(false);
                    setSelectedTemplate(null);
                  }}
                >
                  Change Template
                </Button>
                <Link href="/admin/exams" className="flex-1">
                  <Button size="lg" className="w-full">
                    Done
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ATTENDANCE SHEETS TAB */}
      {activeTab === "attendance" && (
        <div className="space-y-6">
          {/* Class/Section Filter */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
              <Filter className="w-5 h-5 text-accent" />
              Filter by Class & Section
            </h3>
            <div className="flex flex-wrap gap-3">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {CLASSES.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedSection}
                onValueChange={setSelectedSection}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  {SECTIONS.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Day Selection */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-text-primary mb-1 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  Select Exam Days
                </h3>
                <p className="text-sm text-text-secondary">
                  Each day generates one attendance sheet with signature column.
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={selectAllDays}>
                {selectedDays.length === EXAM_DAYS.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            </div>

            <div className="space-y-2">
              {EXAM_DAYS.map((day) => (
                <button
                  key={day.date}
                  onClick={() => toggleDaySelection(day.date)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all",
                    selectedDays.includes(day.date)
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                        selectedDays.includes(day.date)
                          ? "border-accent bg-accent"
                          : "border-border",
                      )}
                    >
                      {selectedDays.includes(day.date) && (
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-text-primary">
                        {day.day},{" "}
                        {new Date(day.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {day.subject}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-text-muted bg-secondary/10 px-3 py-1 rounded-full">
                    {getFilterText()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          {selectedDays.length > 0 && (
            <div className="bg-surface border border-border rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-text-primary mb-1">
                    {selectedDays.length} Day
                    {selectedDays.length > 1 ? "s" : ""} Selected
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Attendance sheets will have student name, roll no, and
                    signature column.
                  </p>
                </div>
                <Button
                  onClick={handleGenerateAttendance}
                  disabled={isGenerating}
                  size="lg"
                >
                  <Download className="w-5 h-5" />
                  {isGenerating ? "Generating..." : "Download PDF"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
