"use client";

import { useMemo, useState } from "react";
import { StatCard } from "@/components/ui/StatCard";
import { MessageSquare, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { AdminComplaint } from "@/lib/admin/types/complaints";
import { cn } from "@/lib/common/utils";

interface ComplaintKPICardsProps {
    complaints: AdminComplaint[];
}

type Period = "this-month" | "overall";

function getCurrentMonthPrefix() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export default function ComplaintKPICards({ complaints }: ComplaintKPICardsProps) {
    const [period, setPeriod] = useState<Period>("overall");

    const stats = useMemo(() => {
        const filtered =
            period === "overall"
                ? complaints
                : complaints.filter((c) =>
                      c.submittedAt.startsWith(getCurrentMonthPrefix()),
                  );
        return {
            total: filtered.length,
            pending: filtered.filter((c) => c.status === "pending").length,
            inProgress: filtered.filter((c) => c.status === "in-progress").length,
            resolved: filtered.filter((c) => c.status === "resolved").length,
        };
    }, [complaints, period]);

    return (
        <div className="space-y-3">
            {/* Period Toggle */}
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                    Overview
                </h2>
                <div className="flex items-center bg-surface border border-border rounded-lg p-0.5">
                    <button
                        onClick={() => setPeriod("this-month")}
                        className={cn(
                            "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                            period === "this-month"
                                ? "bg-accent text-white shadow-sm"
                                : "text-text-secondary hover:text-text-primary",
                        )}
                    >
                        This Month
                    </button>
                    <button
                        onClick={() => setPeriod("overall")}
                        className={cn(
                            "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                            period === "overall"
                                ? "bg-accent text-white shadow-sm"
                                : "text-text-secondary hover:text-text-primary",
                        )}
                    >
                        Overall
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Total Complaints"
                    value={stats.total}
                    icon={MessageSquare}
                    color="text-blue-600"
                    bg="bg-blue-500/10"
                    delay={0}
                />
                <StatCard
                    label="Pending"
                    value={stats.pending}
                    icon={Clock}
                    color="text-pending"
                    bg="bg-pending/10"
                    delay={0.05}
                />
                <StatCard
                    label="In Progress"
                    value={stats.inProgress}
                    icon={AlertCircle}
                    color="text-accent"
                    bg="bg-accent/10"
                    delay={0.1}
                />
                <StatCard
                    label="Resolved"
                    value={stats.resolved}
                    icon={CheckCircle2}
                    color="text-success"
                    bg="bg-success/10"
                    delay={0.15}
                />
            </div>
        </div>
    );
}
