"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Pin } from "lucide-react";
import { AnnouncementCard } from "@/components/announcements/AnnouncementCard";
import { mockAnnouncements } from "@/lib/mockData/announcements";
import { PageHeaderIcons } from "@/utils/navigation/icons";

export default function AnnouncementsPage() {
    // Separate pinned and regular announcements, sort by date
    const { pinnedNotices, regularNotices } = useMemo(() => {
        const pinned = mockAnnouncements.filter((a) => a.isPinned);
        const regular = mockAnnouncements.filter((a) => !a.isPinned);

        // Sort: urgent first, then by date (latest first)
        const sortByPriority = (a: typeof mockAnnouncements[0], b: typeof mockAnnouncements[0]) => {
            if (a.category === "urgent" && b.category !== "urgent") return -1;
            if (a.category !== "urgent" && b.category === "urgent") return 1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        };

        return {
            pinnedNotices: [...pinned].sort(sortByPriority),
            regularNotices: [...regular].sort(sortByPriority),
        };
    }, []);

    const hasNoNotices = pinnedNotices.length === 0 && regularNotices.length === 0;

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
                    Announcements
                    <PageHeaderIcons.Announcements className="w-8 h-8 md:w-12 md:h-12" />
                </motion.h1>
                <p className="text-text-secondary mt-1 md:mt-2 text-xs md:text-base">
                    Stay updated with the latest news and announcements from school.
                </p>
            </div>

            {/* Pinned Announcements */}
            {pinnedNotices.length > 0 && (
                <section className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Pin className="w-4 h-4 text-accent" />
                        <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wide">
                            Pinned
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {pinnedNotices.map((announcement, index) => (
                            <motion.div
                                key={announcement.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <AnnouncementCard announcement={announcement} />
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* All Announcements */}
            {regularNotices.length > 0 && (
                <section>
                    {pinnedNotices.length > 0 && (
                        <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-4">
                            Recent
                        </h2>
                    )}
                    <div className="space-y-4">
                        {regularNotices.map((announcement, index) => (
                            <motion.div
                                key={announcement.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (pinnedNotices.length + index) * 0.05 }}
                            >
                                <AnnouncementCard announcement={announcement} />
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Empty State */}
            {hasNoNotices && (
                <div className="bg-surface rounded-2xl border border-border p-8 text-center">
                    <p className="text-text-secondary">
                        No announcements available at the moment.
                    </p>
                    <p className="text-text-muted text-sm mt-1">
                        Check back later for updates from school.
                    </p>
                </div>
            )}
        </motion.div>
    );
}
