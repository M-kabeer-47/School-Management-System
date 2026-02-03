"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Bell,
  Download,
  FileText,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/shadcn/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";

import { EXAM_SERIES, PAPER_STATUS_DATA } from "@/lib/admin/mock-data/exams";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PaperStatusPage() {
  const params = useParams();
  const series = EXAM_SERIES.find((s) => s.id === params.id) || EXAM_SERIES[0];

  // ============================
  // STATE
  // ============================
  const uniqueGrades = Array.from(
    new Set(PAPER_STATUS_DATA.map((p) => p.grade)),
  ).sort();

  const [selectedGrade, setSelectedGrade] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // ============================
  // FILTER & SORT LOGIC
  // ============================
  const filteredData = useMemo(() => {
    let data = PAPER_STATUS_DATA;

    if (selectedGrade !== "all") {
      data = data.filter((p) => p.grade === selectedGrade);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (p) =>
          p.subject.toLowerCase().includes(q) ||
          p.teacher.toLowerCase().includes(q),
      );
    }

    const isOverdue = (p: (typeof PAPER_STATUS_DATA)[0]) =>
      !p.isUploaded &&
      (p.deadline?.includes("ago") || p.deadline?.includes("Yesterday"));

    if (statusFilter !== "all") {
      if (statusFilter === "uploaded") {
        data = data.filter((p) => p.isUploaded);
      } else if (statusFilter === "pending") {
        data = data.filter((p) => !p.isUploaded && !isOverdue(p));
      } else if (statusFilter === "overdue") {
        data = data.filter((p) => isOverdue(p));
      }
    }

    return data.sort((a, b) => {
      const aOverdue = isOverdue(a);
      const bOverdue = isOverdue(b);
      const aPending = !a.isUploaded;
      const bPending = !b.isUploaded;

      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;
      if (aPending && !bPending) return -1;
      if (!aPending && bPending) return 1;
      return 0;
    });
  }, [selectedGrade, statusFilter, searchQuery]);

  const kpis = useMemo(() => {
    let baseData = PAPER_STATUS_DATA;
    if (selectedGrade !== "all") {
      baseData = baseData.filter((p) => p.grade === selectedGrade);
    }

    const total = baseData.length;
    const uploaded = baseData.filter((p) => p.isUploaded).length;
    const pending = total - uploaded;
    const overdue = baseData.filter(
      (p) =>
        !p.isUploaded &&
        (p.deadline?.includes("ago") || p.deadline?.includes("Yesterday")),
    ).length;

    return { total, uploaded, pending, overdue };
  }, [selectedGrade]);

  return (
    <div className="relative min-h-screen">
      {/* BACKGROUND BLOBS & NOISE */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-slate-50/50">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-200/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[5%] right-[-5%] w-[35%] h-[35%] bg-indigo-100/30 blur-[100px] rounded-full" />
        <div className="absolute top-[20%] right-[15%] w-[25%] h-[25%] bg-emerald-50/40 blur-[80px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.015] grayscale"
          style={{
            backgroundImage:
              'url("https://grainy-gradients.vercel.app/noise.svg")',
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 max-w-[1600px] mx-auto pb-12 relative z-10"
      >
        {/* HEADER */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-1"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href="/admin/exams"
                className="text-text-muted hover:text-accent transition-all flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />{" "}
                Back to Terminal
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight font-heading">
                Paper Status{" "}
                <span className="text-accent underline decoration-accent/20 decoration-4 underline-offset-8">
                  Tracker
                </span>
              </h1>
              <div className="mt-1 flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider border border-accent/20">
                <Sparkles className="w-2.5 h-2.5" /> Luxury Admin
              </div>
            </div>
            <p className="text-text-muted mt-3 max-w-lg leading-relaxed font-body">
              Real-time monitoring for{" "}
              <span className="text-text-primary font-semibold">
                {series.title}
              </span>
              . Manage submissions and identify bottlenecks across all grades.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
            <Button
              variant="outline"
              className="h-11 px-6 rounded-xl border-border bg-white/50 backdrop-blur-sm hover:surface-hover transition-all"
            >
              <Download className="w-4 h-4 mr-2" />
              Snapshot
            </Button>
            {kpis.overdue > 0 && (
              <Button className="h-11 px-6 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xl shadow-red-200 border-none transition-all hover:scale-[1.02] active:scale-[0.98]">
                <Bell className="w-4 h-4 mr-2 animate-bounce" />
                Nudge Critical
              </Button>
            )}
          </div>
        </motion.div>

        {/* KPI CARDS (GLASSMORPHY) */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {[
            {
              label: "Total Asset Load",
              value: kpis.total,
              icon: FileText,
              color: "blue",
              trend: "Full Scope",
            },
            {
              label: "Asset Readiness",
              value: kpis.uploaded,
              icon: CheckCircle2,
              color: "emerald",
              trend: "In Vault",
            },
            {
              label: "Pipeline Delay",
              value: kpis.pending,
              icon: Clock,
              color: "orange",
              trend: "Awaiting",
            },
            {
              label: "Critical Failure",
              value: kpis.overdue,
              icon: AlertCircle,
              color: "red",
              trend: "Immediate Action",
            },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              whileHover={{ y: -5 }}
              className="group bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all relative overflow-hidden"
            >
              <div
                className={`absolute top-0 right-0 w-24 h-24 bg-${kpi.color}-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-${kpi.color}-500/10 transition-colors`}
              />

              <div className="flex justify-between items-start relative z-10">
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                    {kpi.label}
                  </p>
                  <h3
                    className={cn(
                      "text-3xl font-black mt-2 font-heading",
                      kpi.color === "blue"
                        ? "text-text-primary"
                        : `text-${kpi.color}-600`,
                    )}
                  >
                    {kpi.value}
                  </h3>
                  <div className="mt-4 flex items-center gap-1.5">
                    <Zap className={cn("w-3 h-3", `text-${kpi.color}-500`)} />
                    <span className="text-[10px] font-bold text-text-muted italic tracking-wide">
                      {kpi.trend}
                    </span>
                  </div>
                </div>
                <div
                  className={cn(
                    "p-3 rounded-xl shadow-inner transition-transform group-hover:rotate-12",
                    `bg-${kpi.color}-50 text-${kpi.color}-600`,
                  )}
                >
                  <kpi.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CONTROLS (REFINED COMPOSITION) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col xl:flex-row gap-6 bg-white/40 p-2 rounded-2xl border border-white/20"
        >
          <div className="flex flex-col md:flex-row gap-4 p-2 flex-1">
            <div className="w-full md:w-64">
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="h-12 border-none shadow-none bg-white hover:bg-slate-50 transition-all rounded-xl">
                  <SelectValue placeholder="Command Center Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Global (All Classes)</SelectItem>
                  {uniqueGrades.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted opacity-50" />
              <Input
                placeholder="Refine by Subject or Teacher Identity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-12 border-none shadow-none bg-white rounded-xl focus:ring-accent/10"
              />
            </div>
          </div>

          <div className="px-2 self-center">
            <Tabs
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as any)}
            >
              <TabsList className="h-14 bg-white/80 backdrop-blur-sm border-none shadow-none rounded-xl p-1.5">
                <TabsTrigger
                  value="all"
                  className="rounded-lg h-full px-6 transition-all data-[state=active]:bg-white data-[state=active]:text-accent data-[state=active]:shadow-sm"
                >
                  All Scope
                </TabsTrigger>
                <TabsTrigger
                  value="overdue"
                  className="rounded-lg h-full px-6 data-[state=active]:text-red-600 data-[state=active]:bg-red-50/50"
                >
                  Critical
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="rounded-lg h-full px-6 data-[state=active]:text-orange-600 data-[state=active]:bg-orange-50/50"
                >
                  Awaiting
                </TabsTrigger>
                <TabsTrigger
                  value="uploaded"
                  className="rounded-lg h-full px-6 data-[state=active]:text-emerald-600 data-[state=active]:bg-emerald-50/50"
                >
                  Released
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        {/* DATA TABLE (ELEGANT DENSITY) */}
        <motion.div
          variants={itemVariants}
          className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden shadow-2xl"
        >
          <Table className="border-none rounded-none shadow-none">
            <TableHeader className="bg-slate-50/50 border-b border-slate-100">
              <TableHeadRow className="h-14">
                <TableHead className="w-[140px] pl-8 text-[10px] font-black uppercase tracking-widest text-text-muted">
                  Origin/Class
                </TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                  Subject Authority
                </TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                  Assigned Educator
                </TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                  Lifecycle State
                </TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                  Threshold
                </TableHead>
                <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest text-text-muted">
                  Executive
                </TableHead>
              </TableHeadRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {filteredData.length > 0 ? (
                  filteredData.map((paper, idx) => {
                    const isOverdue =
                      !paper.isUploaded &&
                      (paper.deadline?.includes("ago") ||
                        paper.deadline?.includes("Yesterday"));
                    const isPending = !paper.isUploaded && !isOverdue;

                    return (
                      <motion.tr
                        key={paper.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={cn(
                          "group transition-all duration-300 border-b border-slate-50/50",
                          isOverdue
                            ? "bg-red-50/20 hover:bg-red-50/40"
                            : isPending
                              ? "hover:bg-orange-50/10"
                              : "hover:bg-slate-50/50",
                        )}
                      >
                        <TableCell className="pl-8 py-5">
                          <div className="flex flex-col gap-1">
                            <span className="font-black text-text-primary text-sm tracking-tight">
                              {paper.grade}
                            </span>
                            <span className="text-[10px] font-bold text-text-muted opacity-60">
                              DISTRICT {paper.section}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                            {paper.subject}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-accent/5 flex items-center justify-center text-[10px] font-black text-accent border border-accent/10">
                              {paper.teacher
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className="text-text-secondary text-xs font-medium">
                              {paper.teacher}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex">
                            {paper.isUploaded ? (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
                                Available
                              </div>
                            ) : isOverdue ? (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-widest border border-red-100">
                                <AlertCircle className="w-3 h-3" /> Breach
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-50 text-orange-600 text-[9px] font-black uppercase tracking-widest border border-orange-100">
                                <Clock className="w-3 h-3" /> Queued
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "text-[11px] font-bold tabular-nums tracking-tight",
                              isOverdue ? "text-red-500" : "text-text-muted",
                            )}
                          >
                            {paper.deadline}
                          </span>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          {paper.isUploaded ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-[10px] font-black uppercase tracking-tighter hover:bg-accent/5 text-accent"
                            >
                              Access Asset
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className={cn(
                                "h-8 text-[10px] font-black uppercase tracking-tighter border-none shadow-none",
                                isOverdue
                                  ? "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-200"
                                  : "bg-orange-100 text-orange-700 hover:bg-orange-200",
                              )}
                            >
                              Force Release
                            </Button>
                          )}
                        </TableCell>
                      </motion.tr>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-96 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-6">
                          <Search className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="font-black text-text-primary uppercase tracking-widest text-sm">
                          Void Zone
                        </p>
                        <p className="text-xs text-text-muted mt-2 font-medium">
                          No assets detected within these parameters.
                        </p>
                        <Button
                          variant="link"
                          className="mt-4 text-accent font-bold text-xs"
                          onClick={() => {
                            setStatusFilter("all");
                            setSelectedGrade("all");
                            setSearchQuery("");
                          }}
                        >
                          Reset Terminal
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </motion.div>

        {/* FOOTER METRICS */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-between gap-4 px-2 pt-4 border-t border-slate-200/50"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
              <span className="text-[10px] font-black text-text-muted uppercase tracking-wider">
                Health Nominal
              </span>
            </div>
            <span className="text-border">|</span>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider italic">
              {filteredData.length} records active for{" "}
              {selectedGrade === "all" ? "Whole School" : selectedGrade}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-black text-slate-500"
                >
                  AD
                </div>
              ))}
            </div>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">
              School Executive Board Verified
            </p>
          </div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .font-heading {
          font-family: var(--font-heading), sans-serif !important;
        }
        .font-body {
          font-family: var(--font-body), sans-serif !important;
        }

        /* Custom Table Scrollbar for Premium Feel */
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
