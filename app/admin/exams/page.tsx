"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  Settings,
  FileText,
  Users,
  Layout,
  Printer,
  Trophy,
  ChevronDown,
  AlertCircle,
  Plus,
  CheckCircle2,
  CalendarDays,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/common/utils";

import { Button } from "@/components/ui/Button";
import { CreateSessionModal } from "@/components/admin/exams/CreateSessionModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { format } from "date-fns";

// Mock Data Import
import { EXAM_SERIES, EXAM_STATS } from "@/lib/admin/mock-data/exams";

export default function ExamsDashboardPage() {
  const [allSeries, setAllSeries] = useState(EXAM_SERIES);
  const [selectedSeriesId, setSelectedSeriesId] = useState(EXAM_SERIES[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentSeries =
    allSeries.find((s) => s.id === selectedSeriesId) || allSeries[0];

  // Derived KPIs for the "Realistic" dashboard
  const setupSteps = [
    { label: "Timetable", done: currentSeries.stats.timetableGenerated },
    { label: "Seating", done: currentSeries.stats.seatingGenerated },
    { label: "Invigilation", done: currentSeries.stats.invigilationComplete },
  ];

  const setupCompletedCount = setupSteps.filter((s) => s.done).length;
  const setupProgressPercentage =
    (setupCompletedCount / setupSteps.length) * 100;

  const paperPercentage =
    (currentSeries.stats.papersUploaded / currentSeries.stats.totalPapers) *
    100;

  // The 7-Step Workflow Actions
  const workflowActions = [
    {
      step: 1,
      title: "Configure Series",
      description: "Setup exam name, terms, and core properties",
      icon: Settings,
      color: "bg-slate-500",
      href: `/admin/exams/${currentSeries.id}/configure`,
      status: "Done",
      isCompleted: true,
    },
    {
      step: 2,
      title: "Paper Status",
      description: "Track teacher submissions and uploads",
      icon: FileText,
      color: "bg-blue-500",
      href: `/admin/exams/${currentSeries.id}/papers`,
      status: EXAM_STATS.pendingPaperUploads > 0 ? "Action Needed" : "On Track",
      alert: EXAM_STATS.pendingPaperUploads > 0,
    },
    {
      step: 3,
      title: "Date Sheet",
      description: "Upload official exam timetable (PDF/Image)",
      icon: Calendar,
      color: "bg-indigo-500",
      href: `/admin/exams/${currentSeries.id}/datesheet`,
      status: currentSeries.stats.timetableGenerated ? "Ready" : "Pending",
      isCompleted: currentSeries.stats.timetableGenerated,
    },
    {
      step: 4,
      title: "Invigilation",
      description: "Assign teachers to exam rooms",
      icon: Users,
      color: "bg-violet-500",
      href: `/admin/exams/${currentSeries.id}/invigilation`,
      status: currentSeries.stats.invigilationComplete ? "Ready" : "Pending",
    },
    {
      step: 5,
      title: "Seating Plan",
      description: "Map students to rooms automatically",
      icon: Layout,
      color: "bg-purple-500",
      href: `/admin/exams/${currentSeries.id}/seating`,
      status: currentSeries.stats.seatingGenerated ? "Ready" : "Pending",
    },
    {
      step: 6,
      title: "Generate Assets",
      description: "Print admit cards and attendance sheets",
      icon: Printer,
      color: "bg-pink-500",
      href: `/admin/exams/${currentSeries.id}/assets`,
      status: "Available",
    },
    {
      step: 7,
      title: "Result Center",
      description: "Enter marks and publish results",
      icon: Trophy,
      color: "bg-rose-500",
      href: `/admin/exams/${currentSeries.id}/results`,
      status: `${currentSeries.stats.resultProgress}% Complete`,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header & Series Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary font-heading tracking-tight">
            Exams Orchestration
          </h1>
          <p className="text-text-secondary mt-2 text-lg">
            Manage the complete lifecycle of your assessments
          </p>
        </div>

        {/* Series Context Switcher - The "Lens" for the dashboard */}
        <div className="flex items-center gap-4">
          <div className="min-w-[240px]">
            <Select
              value={selectedSeriesId}
              onValueChange={setSelectedSeriesId}
            >
              <SelectTrigger className="h-14">
                <div className="flex flex-col items-start text-left">
                  <SelectValue placeholder="Select Exam Series" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {allSeries.map((series) => (
                  <SelectItem
                    key={series.id}
                    value={series.id}
                    className="py-3"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold">{series.title}</span>
                      <span className="text-xs text-text-muted">
                        {series.dateRange}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-5 h-5" />
            New Session
          </Button>
        </div>
      </div>

      {/* Realistic & Meaningful KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {/* Card 1: Session Readiness (Hero) */}
        <div className="bg-accent rounded-2xl p-6 text-white shadow-lg overflow-hidden relative group">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Layout className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-white/80 uppercase tracking-wider text-xs">
                  Readiness Score
                </span>
              </div>
              <h3 className="text-3xl font-bold">
                {Math.round(setupProgressPercentage)}%
              </h3>
              <p className="text-white/70 mt-1 text-sm">
                Session: {currentSeries.title}
              </p>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs font-bold text-white/90 uppercase">
                <span>Setup Progress</span>
                <span>{setupCompletedCount}/3 Tasks</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${setupProgressPercentage}%` }}
                  className="bg-white h-full"
                />
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        </div>

        {/* Card 2: Paper Submission Pipeline */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between group hover:border-accent transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/5 rounded-lg">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <span className="font-bold text-text-primary text-sm uppercase tracking-tight">
                Paper Collection
              </span>
            </div>
            {paperPercentage < 100 && (
              <span className="text-[10px] font-bold px-2 py-1 bg-error/10 text-error rounded-full">
                Action Needed
              </span>
            )}
          </div>

          <div>
            <div className="flex items-end justify-between mb-2">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-text-primary">
                  {currentSeries.stats.papersUploaded}
                  <span className="text-sm font-medium text-text-muted ml-1">
                    / {currentSeries.stats.totalPapers}
                  </span>
                </span>
                <span className="text-[11px] font-semibold text-text-muted uppercase">
                  Papers Received
                </span>
              </div>
              <span className="text-lg font-bold text-accent">
                {Math.round(paperPercentage)}%
              </span>
            </div>
            <div className="w-full bg-secondary/10 rounded-full h-2.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${paperPercentage}%` }}
                className={cn(
                  "h-full rounded-full",
                  paperPercentage === 100 ? "bg-success" : "bg-accent",
                )}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Logistics Checklist */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col group hover:border-accent transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent/5 rounded-lg">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <span className="font-bold text-text-primary text-sm uppercase tracking-tight">
              Logistics Readiness
            </span>
          </div>

          <div className="space-y-4">
            {setupSteps.map((step) => (
              <div
                key={step.label}
                className="flex items-center justify-between"
              >
                <span className="text-sm font-medium text-text-secondary">
                  {step.label}
                </span>
                <div
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-lg w-[85px] justify-center",
                    step.done
                      ? "text-success bg-success/10"
                      : "text-text-muted bg-secondary/10",
                  )}
                >
                  {step.done ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <div className="w-3 h-3 rounded-full border-2 border-slate-300" />
                  )}
                  {step.done ? "Ready" : "Pending"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* The 7-Step Workflow Grid */}
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-text-primary text-white text-xs">
            7
          </span>
          Steps to Execution
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {workflowActions.map((action, index) => (
            <Link key={action.title} href={action.href} className="group">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-surface rounded-2xl p-1 border border-border shadow-sm hover:shadow-md hover:border-blue-400/50 transition-all h-full"
              >
                <div className="bg-background rounded-xl p-5 h-full flex flex-col relative overflow-hidden">
                  {/* Step Badge */}
                  <div className="absolute top-4 right-4 text-xs font-bold text-text-muted/30 text-[40px] leading-none pointer-events-none">
                    {action.step}
                  </div>

                  {/* Icon */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform",
                      action.isCompleted ? "bg-success" : action.color,
                    )}
                  >
                    {action.isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <action.icon className="w-6 h-6 text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-lg text-text-primary mb-1 group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {action.description}
                  </p>

                  {/* Status Indicator */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      {action.isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        action.alert && (
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        )
                      )}
                      <span
                        className={cn(
                          "text-xs font-semibold",
                          action.isCompleted
                            ? "text-success"
                            : action.alert
                              ? "text-red-600"
                              : "text-text-muted",
                        )}
                      >
                        {action.isCompleted ? "Completed" : action.status}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* NEW SESSION MODAL */}
      <CreateSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={(session) => {
          const newId = `ser-${allSeries.length + 1}`;

          // Format date range: "MMM d - MMM d, yyyy"
          const start = new Date(session.startDate);
          const end = new Date(session.endDate);
          const range = `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;

          const newSeriesItem = {
            id: newId,
            title: `${session.type} ${format(start, "yyyy")}`,
            status: "Upcoming",
            dateRange: range,
            stats: {
              papersUploaded: 0,
              totalPapers: 0,
              timetableGenerated: false,
              invigilationComplete: false,
              seatingGenerated: false,
              resultProgress: 0,
            },
          };
          setAllSeries([...allSeries, newSeriesItem]);
          setSelectedSeriesId(newId);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
