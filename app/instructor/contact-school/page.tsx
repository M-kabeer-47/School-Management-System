"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Globe,
    User,
    MessageSquare,
    History,
    Building2,
    Briefcase,
} from "lucide-react";
import { ComplaintForm } from "@/components/student/contact/ComplaintForm";
import { ComplaintCard } from "@/components/student/contact/ComplaintCard";
import { schoolContact } from "@/lib/student/mock-data/contact";
import { mockInstructorComplaints } from "@/lib/instructor/mock-data/contact";
import { cn } from "@/lib/shadcn/utils";

export default function InstructorContactSchoolPage() {
    const [activeTab, setActiveTab] = useState<"new" | "history">("new");

    const handleComplaintSubmit = (data: {
        subject: string;
        category: string;
        message: string;
    }) => {
        console.log("Instructor complaint submitted:", data);
        // In a real app, you'd send this to your backend
    };

    const ContactItem = ({
        icon: Icon,
        label,
        children,
    }: {
        icon: React.ElementType;
        label: string;
        children: React.ReactNode;
    }) => (
        <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-text-muted mb-0.5">{label}</p>
                <div className="text-sm text-text-primary font-medium">{children}</div>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Page Header */}
            <div className="mb-6 md:mb-8">
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-4xl font-bold font-heading text-text-primary flex items-center gap-2 md:gap-3"
                >
                    Contact School
                    <Phone className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </motion.h1>
                <p className="text-text-secondary mt-1 md:mt-2 text-xs md:text-base">
                    Get in touch with administration or submit a request.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left Column - Contact Details */}
                <div className="lg:col-span-2 space-y-4">
                    {/* School Contact Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden"
                    >
                        <div className="px-5 py-4 border-b border-border bg-surface/50">
                            <h2 className="font-semibold text-text-primary font-heading flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-accent" /> School Information
                            </h2>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-text-primary font-heading">
                                    {schoolContact.name}
                                </h3>
                            </div>

                            <ContactItem icon={MapPin} label="Address">
                                {schoolContact.address}
                            </ContactItem>

                            <ContactItem icon={Phone} label="Phone Numbers">
                                <div className="space-y-1">
                                    {schoolContact.phone.map((p, i) => (
                                        <a
                                            key={i}
                                            href={`tel:${p}`}
                                            className="block hover:text-accent transition-colors"
                                        >
                                            {p}
                                        </a>
                                    ))}
                                </div>
                            </ContactItem>

                            <ContactItem icon={Mail} label="Email">
                                <div className="space-y-1">
                                    {schoolContact.email.map((e, i) => (
                                        <a
                                            key={i}
                                            href={`mailto:${e}`}
                                            className="block hover:text-accent transition-colors break-all"
                                        >
                                            {e}
                                        </a>
                                    ))}
                                </div>
                            </ContactItem>

                            {schoolContact.website && (
                                <ContactItem icon={Globe} label="Website">
                                    <a
                                        href={`https://${schoolContact.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-accent transition-colors"
                                    >
                                        {schoolContact.website}
                                    </a>
                                </ContactItem>
                            )}

                            <ContactItem icon={Clock} label="Office Hours">
                                {schoolContact.officeHours}
                            </ContactItem>
                        </div>
                    </motion.div>

                    {/* Principal Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden"
                    >
                        <div className="px-5 py-4 border-b border-border bg-surface/50">
                            <h2 className="font-semibold text-text-primary font-heading flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-accent" /> Principal's Office
                            </h2>
                        </div>
                        <div className="p-5 space-y-4">
                            <ContactItem icon={User} label="Principal">
                                {schoolContact.principalName}
                            </ContactItem>
                            <ContactItem icon={Mail} label="Direct Email">
                                <a
                                    href={`mailto:${schoolContact.principalEmail}`}
                                    className="hover:text-accent transition-colors break-all"
                                >
                                    {schoolContact.principalEmail}
                                </a>
                            </ContactItem>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column - Complaints/Requests */}
                <div className="lg:col-span-3">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden"
                    >
                        {/* Tabs */}
                        <div className="flex border-b border-border">
                            <button
                                onClick={() => setActiveTab("new")}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-colors",
                                    activeTab === "new"
                                        ? "text-accent border-b-2 border-accent bg-accent-light/30"
                                        : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                                )}
                            >
                                <MessageSquare className="w-4 h-4" />
                                New Request
                            </button>
                            <button
                                onClick={() => setActiveTab("history")}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-colors",
                                    activeTab === "history"
                                        ? "text-accent border-b-2 border-accent bg-accent-light/30"
                                        : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                                )}
                            >
                                <History className="w-4 h-4" />
                                Previous ({mockInstructorComplaints.length})
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="p-5">
                            {activeTab === "new" ? (
                                <div>
                                    <p className="text-sm text-text-secondary mb-5">
                                        Have a concern, request, or feedback? Fill out the form
                                        below and administration will respond shortly.
                                    </p>
                                    <ComplaintForm onSubmit={handleComplaintSubmit} />
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {mockInstructorComplaints.length > 0 ? (
                                        mockInstructorComplaints.map((complaint, index) => (
                                            <ComplaintCard
                                                key={complaint.id}
                                                complaint={complaint}
                                                index={index}
                                            />
                                        ))
                                    ) : (
                                        <div className="py-12 text-center">
                                            <div className="w-16 h-16 mx-auto rounded-full bg-surface-active flex items-center justify-center mb-4">
                                                <MessageSquare className="w-8 h-8 text-text-muted" />
                                            </div>
                                            <p className="text-text-secondary font-medium">
                                                No requests yet
                                            </p>
                                            <p className="text-text-muted text-sm mt-1">
                                                Any requests you submit will appear here
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
