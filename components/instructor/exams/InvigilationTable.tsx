"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, BookOpen, Users } from "lucide-react";
import { InvigilationDuty } from "@/lib/instructor/types/exams";
import { cn } from "@/lib/common/utils";
import {
    Table,
    TableHeader,
    TableHeadRow,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@/components/ui/Table";

interface InvigilationTableProps {
    duties: InvigilationDuty[];
}

export const InvigilationTable = ({ duties }: InvigilationTableProps) => {
    const sortedDuties = [...duties].sort((a, b) => {
        // Sort by date, then by status (upcoming first)
        if (a.status !== b.status) {
            return a.status === "upcoming" ? -1 : 1;
        }
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm"
        >
            <Table>
                <TableHeader>
                    <TableHeadRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                    </TableHeadRow>
                </TableHeader>
                <TableBody>
                    {sortedDuties.map((duty) => (
                        <TableRow key={duty.id} className="hover:bg-surface-hover/50">
                            <TableCell>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-text-primary font-medium text-sm">
                                        <Calendar className="w-4 h-4 text-accent" />
                                        {new Date(duty.date).toLocaleDateString("en-US", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </div>
                                    <div className="flex items-center gap-2 text-text-muted text-xs">
                                        <Clock className="w-3 h-3" />
                                        {duty.startTime} - {duty.endTime}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-text-secondary text-sm">
                                    <MapPin className="w-4 h-4 text-text-muted" />
                                    {duty.room}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-text-primary text-sm font-medium">
                                    <Users className="w-4 h-4 text-text-muted" />
                                    {duty.class}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-text-secondary text-sm">
                                    <BookOpen className="w-4 h-4 text-text-muted" />
                                    {duty.subject}
                                </div>
                            </TableCell>
                            <TableCell>
                                <span
                                    className={cn(
                                        "px-2.5 py-1 rounded-full text-xs font-bold border capitalize",
                                        duty.status === "upcoming"
                                            ? "bg-blue-50 text-blue-700 border-blue-100"
                                            : "bg-green-50 text-green-700 border-green-100"
                                    )}
                                >
                                    {duty.status}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {sortedDuties.length === 0 && (
                <div className="py-12 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-surface-active flex items-center justify-center mb-4">
                        <Calendar className="w-8 h-8 text-text-muted" />
                    </div>
                    <p className="text-text-secondary font-medium">
                        No invigilation duties assigned
                    </p>
                    <p className="text-text-muted text-sm mt-1">
                        Your duties will appear here when exams are scheduled
                    </p>
                </div>
            )}
        </motion.div>
    );
};
