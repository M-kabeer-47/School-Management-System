"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Users, Hash, Droplets } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { StudentInfo } from "@/lib/types/profile";

interface StudentCardProps {
    student: StudentInfo;
    onPhotoChange?: (file: File) => void;
}

export const StudentCard = ({
    student,
    onPhotoChange,
}: StudentCardProps) => {
    const InfoItem = ({
        icon: Icon,
        label,
        value,
    }: {
        icon: React.ElementType;
        label: string;
        value: string;
    }) => (
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-text-muted">{label}</p>
                <p className="text-sm text-text-primary font-medium">{value}</p>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden"
        >
            {/* Header with gradient */}
            <div className="h-24 md:h-32 bg-accent-gradient relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </div>

            {/* Profile Content */}
            <div className="px-5 md:px-6 pb-6">
                {/* Photo - Overlapping the header */}
                <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16 md:-mt-20">
                    <ProfilePhoto
                        photoUrl={student.photoUrl}
                        name={student.name}
                        onPhotoChange={onPhotoChange}
                    />

                    <div className="flex-1 md:pb-2">
                        <h2 className="text-xl md:text-2xl font-bold text-text-primary font-heading">
                            {student.name}
                        </h2>
                        <p className="text-text-secondary text-sm mt-0.5">
                            Student ID: {student.id}
                        </p>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InfoItem
                        icon={GraduationCap}
                        label="Class"
                        value={`Class ${student.class}`}
                    />
                    <InfoItem
                        icon={Users}
                        label="Section"
                        value={`Section ${student.section}`}
                    />
                    <InfoItem
                        icon={Hash}
                        label="Roll Number"
                        value={student.rollNo}
                    />
                    <InfoItem
                        icon={Calendar}
                        label="Date of Birth"
                        value={new Date(student.dateOfBirth).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    />
                    <InfoItem
                        icon={Users}
                        label="Gender"
                        value={student.gender}
                    />
                    <InfoItem
                        icon={Droplets}
                        label="Blood Group"
                        value={student.bloodGroup}
                    />
                </div>
            </div>
        </motion.div>
    );
};
