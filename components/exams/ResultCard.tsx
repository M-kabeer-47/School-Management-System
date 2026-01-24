"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Trophy,
    Calendar,
    ChevronDown,
    ChevronUp,
    Award,
    TrendingUp,
} from "lucide-react";
import { TermResult } from "@/lib/types/exams";
import { cn } from "@/lib/shadcn/utils";

interface ResultCardProps {
    result: TermResult;
    index?: number;
}

const getGradeColor = (grade: string) => {
    if (grade.includes("+")) return "text-success bg-success-light";
    if (grade === "A") return "text-accent bg-accent-light";
    if (grade === "B") return "text-info bg-info-light";
    if (grade === "C") return "text-warning bg-warning-light";
    return "text-error bg-error-light";
};

export const ResultCard = ({ result, index = 0 }: ResultCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden"
        >
            {/* Header */}
            <div
                className="p-5 cursor-pointer hover:bg-surface/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl bg-warning-light flex items-center justify-center flex-shrink-0">
                            <Trophy className="w-6 h-6 text-warning" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-text-primary text-base md:text-lg">
                                {result.termName}
                            </h3>
                            <p className="text-sm text-text-secondary">{result.examName}</p>
                            <div className="flex items-center gap-1.5 mt-1 text-xs text-text-muted">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(result.date)}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-right hidden sm:block">
                            <p className="text-2xl font-bold text-text-primary">
                                {result.percentage.toFixed(1)}%
                            </p>
                            <p className="text-xs text-text-muted">
                                {result.obtainedMarks}/{result.totalMarks}
                            </p>
                        </div>
                        <div
                            className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg",
                                getGradeColor(result.grade)
                            )}
                        >
                            {result.grade}
                        </div>
                        <button className="p-2 rounded-lg hover:bg-surface-hover text-text-muted transition-colors">
                            {isExpanded ? (
                                <ChevronUp className="w-5 h-5" />
                            ) : (
                                <ChevronDown className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Stats */}
                <div className="flex items-center gap-4 mt-3 sm:hidden">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium text-text-primary">
                            {result.percentage.toFixed(1)}%
                        </span>
                    </div>
                    <span className="text-sm text-text-muted">
                        {result.obtainedMarks}/{result.totalMarks} marks
                    </span>
                    {result.position && (
                        <div className="flex items-center gap-1">
                            <Award className="w-4 h-4 text-warning" />
                            <span className="text-sm text-text-muted">
                                Position: {result.position}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Expanded Content - Subject Results */}
            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="border-t border-border"
                >
                    {/* Position Badge */}
                    {result.position && (
                        <div className="px-5 py-3 bg-warning-light/30 border-b border-border flex items-center gap-2">
                            <Award className="w-5 h-5 text-warning" />
                            <span className="text-sm font-medium text-text-primary">
                                Class Position: {result.position}
                                {result.position === 1
                                    ? "st"
                                    : result.position === 2
                                        ? "nd"
                                        : result.position === 3
                                            ? "rd"
                                            : "th"}
                            </span>
                        </div>
                    )}

                    {/* Subject Table */}
                    <div className="p-5">
                        <h4 className="text-sm font-semibold text-text-primary mb-3">
                            Subject-wise Results
                        </h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-2 px-3 text-text-muted font-medium">
                                            Subject
                                        </th>
                                        <th className="text-center py-2 px-3 text-text-muted font-medium">
                                            Total
                                        </th>
                                        <th className="text-center py-2 px-3 text-text-muted font-medium">
                                            Obtained
                                        </th>
                                        <th className="text-center py-2 px-3 text-text-muted font-medium">
                                            %
                                        </th>
                                        <th className="text-center py-2 px-3 text-text-muted font-medium">
                                            Grade
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.subjects.map((subject, idx) => (
                                        <tr
                                            key={idx}
                                            className="border-b border-border last:border-0"
                                        >
                                            <td className="py-3 px-3 text-text-primary font-medium">
                                                {subject.subject}
                                            </td>
                                            <td className="py-3 px-3 text-center text-text-secondary">
                                                {subject.totalMarks}
                                            </td>
                                            <td className="py-3 px-3 text-center text-text-primary font-medium">
                                                {subject.obtainedMarks}
                                            </td>
                                            <td className="py-3 px-3 text-center text-text-secondary">
                                                {((subject.obtainedMarks / subject.totalMarks) * 100).toFixed(0)}%
                                            </td>
                                            <td className="py-3 px-3 text-center">
                                                <span
                                                    className={cn(
                                                        "px-2 py-0.5 rounded text-xs font-medium",
                                                        getGradeColor(subject.grade)
                                                    )}
                                                >
                                                    {subject.grade}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};
