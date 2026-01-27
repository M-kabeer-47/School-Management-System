"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Edit2 } from "lucide-react";

interface MarksHeaderProps {
    classId: string;
    grade: string;
    section: string;
    testTitle: string;
    totalMarks: number;
    testDate: string;
    onEditSetup: () => void;
}

export default function MarksHeader({
    classId,
    grade,
    section,
    testTitle,
    totalMarks,
    testDate,
    onEditSetup,
}: MarksHeaderProps) {
    return (
        <div className="mb-6 space-y-4">
            {/* Back Navigation */}
            <Link
                href={`/instructor/classes/${classId}`}
                className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium group"
            >
                <div className="p-1.5 rounded-lg bg-surface border border-border group-hover:bg-surface-hover transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                </div>
                <span>Back to Class</span>
            </Link>

            {/* Header Content */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-surface rounded-2xl border border-border">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-gradient flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-xs text-text-muted mb-1">
                            <span>
                                Class {grade} - {section}
                            </span>
                            <span>•</span>
                            <span>{new Date(testDate).toLocaleDateString()}</span>
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold font-heading text-text-primary">
                            {testTitle}
                        </h1>
                        <p className="text-sm text-text-secondary mt-0.5">
                            Total Marks: <span className="font-bold">{totalMarks}</span>
                        </p>
                    </div>
                </div>

                <button
                    onClick={onEditSetup}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary border border-border rounded-xl hover:bg-surface-hover transition-colors"
                >
                    <Edit2 className="w-4 h-4" />
                    Edit Details
                </button>
            </div>
        </div>
    );
}
