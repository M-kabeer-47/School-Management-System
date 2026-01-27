"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Briefcase,
    Calendar,
    Users,
    Hash,
    Droplets,
    GraduationCap,
    Clock,
    Award,
} from "lucide-react";
import { ProfilePhoto } from "@/components/student/profile/ProfilePhoto";
import { InfoRow } from "@/components/student/profile/InfoRow";
import { InstructorInfo } from "@/lib/instructor/types/profile";

interface InstructorCardProps {
    instructor: InstructorInfo;
    onPhotoChange?: (file: File) => void;
}

export const InstructorCard = ({
    instructor,
    onPhotoChange,
}: InstructorCardProps) => {
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
                        photoUrl={instructor.photoUrl}
                        name={instructor.name}
                        onPhotoChange={onPhotoChange}
                    />

                    <div className="flex-1 md:pb-2">
                        <h2 className="text-xl md:text-2xl font-bold text-text-primary font-heading">
                            {instructor.name}
                        </h2>
                        <p className="text-text-secondary text-sm mt-0.5">
                            {instructor.designation}
                        </p>
                        <p className="text-text-muted text-xs mt-0.5">
                            Employee ID: {instructor.employeeCode}
                        </p>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InfoRow
                        icon={Briefcase}
                        label="Department"
                        value={instructor.department}
                        accentStyle
                    />
                    <InfoRow
                        icon={GraduationCap}
                        label="Qualification"
                        value={instructor.qualification}
                        accentStyle
                    />
                    <InfoRow
                        icon={Clock}
                        label="Experience"
                        value={instructor.experience}
                        accentStyle
                    />
                    <InfoRow
                        icon={Calendar}
                        label="Date of Birth"
                        value={new Date(instructor.dateOfBirth).toLocaleDateString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                        )}
                        accentStyle
                    />
                    <InfoRow
                        icon={Award}
                        label="Joining Date"
                        value={new Date(instructor.joiningDate).toLocaleDateString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                        )}
                        accentStyle
                    />
                    <InfoRow
                        icon={Users}
                        label="Gender"
                        value={instructor.gender}
                        accentStyle
                    />
                    <InfoRow
                        icon={Droplets}
                        label="Blood Group"
                        value={instructor.bloodGroup}
                        accentStyle
                    />
                </div>
            </div>
        </motion.div>
    );
};
