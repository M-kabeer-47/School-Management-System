"use client";

import { motion } from "framer-motion";
import { FileText, ClipboardCheck, Edit3 } from "lucide-react";
import { ExamDocumentCard } from "@/components/instructor/exams/ExamDocumentCard";
import { MarksStatusCard } from "@/components/instructor/exams/MarksStatusCard";
import {
    examDocuments,
    marksEntryStatus,
} from "@/lib/instructor/mock-data/exams";

export default function InstructorExamsPage() {
    const datesheet = examDocuments.find((d) => d.type === "datesheet");
    const invigilationSchedule = examDocuments.find(
        (d) => d.type === "invigilation-schedule"
    );

    const pendingClasses = marksEntryStatus.filter(
        (s) => s.status !== "submitted"
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
        >
            {/* Page Header */}
            <div>
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-4xl font-bold font-heading text-text-primary flex items-center gap-2 md:gap-3"
                >
                    Exams
                    <ClipboardCheck className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </motion.h1>
                <p className="text-text-secondary mt-1 md:mt-2 text-xs md:text-base">
                    View exam schedules and manage marks entry.
                </p>
            </div>

            {/* Exam Documents Section */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-accent" />
                    <h2 className="text-lg md:text-xl font-semibold text-text-primary font-heading">
                        Exam Documents
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {datesheet && <ExamDocumentCard document={datesheet} index={0} />}
                    {invigilationSchedule && (
                        <ExamDocumentCard document={invigilationSchedule} index={1} />
                    )}
                </div>

                {!datesheet && !invigilationSchedule && (
                    <div className="bg-surface rounded-2xl border border-border p-8 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-surface-active flex items-center justify-center mb-4">
                            <FileText className="w-8 h-8 text-text-muted" />
                        </div>
                        <p className="text-text-secondary font-medium">
                            No exam documents available
                        </p>
                        <p className="text-text-muted text-sm mt-1">
                            Documents will appear here when exams are scheduled
                        </p>
                    </div>
                )}
            </section>

            {/* Marks Entry Overview Section */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Edit3 className="w-5 h-5 text-accent" />
                        <h2 className="text-lg md:text-xl font-semibold text-text-primary font-heading">
                            Marks Entry Overview
                        </h2>
                    </div>
                    {pendingClasses.length > 0 && (
                        <span className="text-sm text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded-full">
                            {pendingClasses.length} pending
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {marksEntryStatus.map((status, index) => (
                        <MarksStatusCard key={status.id} status={status} index={index} />
                    ))}
                </div>

                {marksEntryStatus.length === 0 && (
                    <div className="bg-surface rounded-2xl border border-border p-8 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-surface-active flex items-center justify-center mb-4">
                            <Edit3 className="w-8 h-8 text-text-muted" />
                        </div>
                        <p className="text-text-secondary font-medium">
                            No marks to enter
                        </p>
                        <p className="text-text-muted text-sm mt-1">
                            Marks entry tasks will appear here during exam periods
                        </p>
                    </div>
                )}
            </section>
        </motion.div>
    );
}
