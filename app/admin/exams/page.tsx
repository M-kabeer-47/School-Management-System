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
} from "lucide-react";
import { cn } from "@/lib/shadcn/utils";

import { Button } from "@/components/ui/Button";

// Mock Data Import
import { EXAM_SERIES, EXAM_STATS } from "@/lib/admin/mock-data/exams";

export default function ExamsDashboardPage() {
  const [selectedSeriesId, setSelectedSeriesId] = useState(EXAM_SERIES[0].id);

  const currentSeries =
    EXAM_SERIES.find((s) => s.id === selectedSeriesId) || EXAM_SERIES[0];

  // The 7-Step Workflow Actions
  const workflowActions = [
    {
      step: 1,
      title: "Configure Series",
      description: "Manage exam dates and naming conventions",
      icon: Settings,
      color: "bg-slate-500",
      href: `/admin/exams/${currentSeries.id}/configure`,
      status: "Done",
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
      description: "Generate and publish exam timetable",
      icon: Calendar,
      color: "bg-indigo-500",
      href: `/admin/exams/${currentSeries.id}/datesheet`,
      status: currentSeries.stats.timetableGenerated ? "Ready" : "Pending",
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
    <div className="space-y-8 max-w-7xl mx-auto p-6 md:p-8">
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
        <div className="relative">
          <div className="flex items-center gap-3 bg-surface border border-border p-1.5 pl-4 pr-2 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Viewing Series
              </span>
              <span className="text-sm font-bold text-text-primary">
                {currentSeries.title}
              </span>
            </div>
            <div className="h-8 w-[1px] bg-border mx-2" />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-xl hover:bg-background"
            >
              <ChevronDown className="w-5 h-5 text-text-secondary" />
            </Button>
          </div>
        </div>
      </div>

      {/* Series Status Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative group">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-blue-100">Timeline</span>
            </div>
            <h3 className="text-2xl font-bold">{currentSeries.dateRange}</h3>
            <p className="text-blue-200 mt-1 text-sm">
              Status: {currentSeries.status}
            </p>
          </div>
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <span className="font-semibold text-text-primary">
              Action Required
            </span>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-secondary">
                Pending Papers
              </span>
              <span className="text-xl font-bold text-red-600">
                {EXAM_STATS.pendingPaperUploads}
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: "35%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="font-semibold text-text-primary">Candidates</span>
          </div>
          <div>
            <span className="text-3xl font-bold text-text-primary">
              {EXAM_STATS.totalCandidates}
            </span>
            <p className="text-sm text-text-muted mt-1">
              Students enrolled for this series
            </p>
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
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-surface rounded-2xl p-1 border border-border shadow-sm hover:shadow-md hover:border-blue-400/50 transition-all cursor-pointer group"
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
                    action.color,
                  )}
                >
                  <action.icon className="w-6 h-6 text-white" />
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
                    {action.alert && (
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    )}
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        action.alert ? "text-red-600" : "text-text-muted",
                      )}
                    >
                      {action.status}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
