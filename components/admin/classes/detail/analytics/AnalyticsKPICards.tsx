"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/common/utils";

export interface AnalyticsKPICardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  idx: number;
}

export const AnalyticsKPICard = ({
  label,
  value,
  icon: Icon,
  color,
  bg,
  idx,
}: AnalyticsKPICardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.1, duration: 0.4 }}
    className="relative p-6 rounded-2xl border border-border bg-surface flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
  >
    <div
      className={cn(
        "relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm",
        bg,
        color,
      )}
    >
      <Icon className="w-10 h-10" />
    </div>
    <div className="relative z-10">
      <p className="text-sm font-bold text-text-muted uppercase tracking-wider mb-1">
        {label}
      </p>
      <h3 className="text-3xl font-bold text-text-primary tracking-tight">
        {value}
      </h3>
    </div>
  </motion.div>
);

export const AnalyticsKPICards = ({
  cards,
}: {
  cards: AnalyticsKPICardProps[];
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {cards.map((card, idx) => (
      <AnalyticsKPICard key={idx} {...card} idx={idx} />
    ))}
  </div>
);
