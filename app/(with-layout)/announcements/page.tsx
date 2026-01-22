"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Pin } from "lucide-react";
import { AnnouncementCard } from "@/components/announcements/AnnouncementCard";
import { mockAnnouncements } from "@/lib/mockData/announcements";
import { Announcement } from "@/lib/types/announcements";
import { cn } from "@/lib/shadcn/utils";

type CategoryFilter = "all" | Announcement["category"];

const filterOptions: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "urgent", label: "Urgent" },
    { value: "academic", label: "Academic" },
    { value: "event", label: "Events" },
    { value: "holiday", label: "Holidays" },
    { value: "general", label: "General" },
];

export default function AnnouncementsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
    const [showPinnedOnly, setShowPinnedOnly] = useState(false);

    // Filter announcements
    const filteredAnnouncements = mockAnnouncements
        .filter((ann) => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return (
                    ann.title.toLowerCase().includes(query) ||
                    ann.content.toLowerCase().includes(query)
                );
            }
            return true;
        })
        .filter((ann) => {
            // Category filter
            if (activeFilter !== "all") {
                return ann.category === activeFilter;
            }
            return true;
        })
        .filter((ann) => {
            // Pinned filter
            if (showPinnedOnly) {
                return ann.isPinned;
            }
            return true;
        })
        .sort((a, b) => {
            // Sort: Pinned first, then by date
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

    const pinnedCount = mockAnnouncements.filter((a) => a.isPinned).length;

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
                    <span className="text-xl md:text-3xl">📢</span>
                </motion.h1>
                <p className="text-text-secondary mt-1 md:mt-2 text-xs md:text-base">
                    Stay updated with the latest news and announcements from school.
                </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search announcements..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-border bg-background text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                    <Filter className="w-4 h-4 text-text-muted mr-1" />

                    {filterOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setActiveFilter(option.value)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                                activeFilter === option.value
                                    ? "bg-accent text-white shadow-sm"
                                    : "bg-surface text-text-secondary hover:bg-surface-hover"
                            )}
                        >
                            {option.label}
                        </button>
                    ))}

                    <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

                    <button
                        onClick={() => setShowPinnedOnly(!showPinnedOnly)}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                            showPinnedOnly
                                ? "bg-accent text-white shadow-sm"
                                : "bg-surface text-text-secondary hover:bg-surface-hover"
                        )}
                    >
                        <Pin className="w-3.5 h-3.5" />
                        Pinned ({pinnedCount})
                    </button>
                </div>
            </div>

            {/* Notice Board */}
            <div className="bg-surface rounded-2xl border border-border p-4 md:p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                    <div className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center">
                        <span className="text-lg">📋</span>
                    </div>
                    <div>
                        <h2 className="font-semibold text-text-primary font-heading text-lg">
                            Notice Board
                        </h2>
                        <p className="text-xs text-text-muted">
                            {filteredAnnouncements.length} announcement
                            {filteredAnnouncements.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                </div>

                {/* Announcements Grid */}
                {filteredAnnouncements.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {filteredAnnouncements.map((announcement, index) => (
                            <AnnouncementCard
                                key={announcement.id}
                                announcement={announcement}
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-surface-active flex items-center justify-center mb-4">
                            <Search className="w-8 h-8 text-text-muted" />
                        </div>
                        <p className="text-text-secondary font-medium">
                            No announcements found
                        </p>
                        <p className="text-text-muted text-sm mt-1">
                            Try adjusting your search or filters
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
