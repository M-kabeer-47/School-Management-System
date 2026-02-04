"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
    Megaphone,
    Plus,
    Pin,
    Bell,
    BookOpen,
    PartyPopper,
    Sun,
    AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
    AdminAnnouncementCard,
    CreateAnnouncementModal,
    DeleteConfirmModal,
} from "@/components/admin/communication/announcements";
import { adminAnnouncements } from "@/lib/admin/mock-data/announcements";
import { AdminAnnouncement, AnnouncementFormData } from "@/lib/admin/types/announcements";
import { cn } from "@/lib/common/utils";

type FilterTab = "all" | "pinned" | "general" | "academic" | "event" | "holiday" | "urgent";

const filterTabs: { id: FilterTab; label: string; icon?: any }[] = [
    { id: "all", label: "All" },
    { id: "pinned", label: "Pinned", icon: Pin },
    { id: "general", label: "General", icon: Bell },
    { id: "academic", label: "Academic", icon: BookOpen },
    { id: "event", label: "Event", icon: PartyPopper },
    { id: "holiday", label: "Holiday", icon: Sun },
    { id: "urgent", label: "Urgent", icon: AlertTriangle },
];

export default function AnnouncementsPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState<AdminAnnouncement | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<AdminAnnouncement | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
    const [announcements, setAnnouncements] = useState(adminAnnouncements);

    const filteredAnnouncements = useMemo(() => {
        let filtered = [...announcements];

        if (activeFilter === "pinned") {
            filtered = filtered.filter((a) => a.isPinned);
        } else if (activeFilter !== "all") {
            filtered = filtered.filter((a) => a.category === activeFilter);
        }

        // Sort: pinned first, then by date
        return filtered.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }, [announcements, activeFilter]);

    const handleEdit = (announcement: AdminAnnouncement) => {
        setEditingAnnouncement(announcement);
        setIsCreateModalOpen(true);
    };

    const handleDelete = (announcement: AdminAnnouncement) => {
        setDeleteTarget(announcement);
    };

    const confirmDelete = () => {
        if (deleteTarget) {
            setAnnouncements((prev) => prev.filter((a) => a.id !== deleteTarget.id));
            setDeleteTarget(null);
        }
    };

    const handleTogglePin = (announcement: AdminAnnouncement) => {
        setAnnouncements((prev) =>
            prev.map((a) =>
                a.id === announcement.id ? { ...a, isPinned: !a.isPinned } : a
            )
        );
    };

    const handleSubmit = (data: AnnouncementFormData) => {
        if (editingAnnouncement) {
            // Update existing
            setAnnouncements((prev) =>
                prev.map((a) =>
                    a.id === editingAnnouncement.id
                        ? {
                            ...a,
                            title: data.title,
                            content: data.content,
                            category: data.category,
                            audience: data.audience,
                            isPinned: data.isPinned,
                            updatedAt: new Date().toISOString(),
                            delivery: {
                                sms: data.sendSms
                                    ? { sent: true, sentAt: new Date().toISOString(), recipientCount: 450 }
                                    : a.delivery?.sms || { sent: false },
                                email: data.sendEmail
                                    ? { sent: true, sentAt: new Date().toISOString(), recipientCount: 420 }
                                    : a.delivery?.email || { sent: false },
                            },
                        }
                        : a
                )
            );
        } else {
            // Create new
            const newAnnouncement: AdminAnnouncement = {
                id: `ann-${Date.now()}`,
                title: data.title,
                content: data.content,
                date: new Date().toISOString().split("T")[0],
                category: data.category,
                audience: data.audience,
                isPinned: data.isPinned,
                createdBy: "Principal Anderson",
                createdAt: new Date().toISOString(),
                delivery: {
                    sms: data.sendSms
                        ? { sent: true, sentAt: new Date().toISOString(), recipientCount: 450 }
                        : { sent: false },
                    email: data.sendEmail
                        ? { sent: true, sentAt: new Date().toISOString(), recipientCount: 420 }
                        : { sent: false },
                },
            };
            setAnnouncements((prev) => [newAnnouncement, ...prev]);
        }
        setEditingAnnouncement(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-heading flex items-center gap-3">
                        Announcements
                        <Megaphone className="w-7 h-7 text-accent" />
                    </h1>
                    <p className="text-text-secondary mt-1">
                        Create and manage school announcements
                    </p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Create Announcement
                </Button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {filterTabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveFilter(tab.id)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2",
                            activeFilter === tab.id
                                ? "bg-accent text-white"
                                : "bg-surface text-text-secondary hover:bg-surface hover:text-text-primary"
                        )}
                    >
                        {tab.icon && <tab.icon className="w-4 h-4" />}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Announcements List */}
            {filteredAnnouncements.length > 0 ? (
                <div className="grid gap-4">
                    {filteredAnnouncements.map((announcement, index) => (
                        <AdminAnnouncementCard
                            key={announcement.id}
                            announcement={announcement}
                            index={index}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onTogglePin={handleTogglePin}
                        />
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-background border border-border rounded-2xl p-12 text-center"
                >
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                        <Megaphone className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">
                        No announcements found
                    </h3>
                    <p className="text-text-muted mt-1">
                        {activeFilter === "all"
                            ? "Create your first announcement to get started"
                            : `No ${activeFilter} announcements yet`}
                    </p>
                    <Button
                        className="mt-4"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <Plus className="w-4 h-4" />
                        Create Announcement
                    </Button>
                </motion.div>
            )}

            {/* Create/Edit Modal */}
            <CreateAnnouncementModal
                isOpen={isCreateModalOpen}
                onClose={() => {
                    setIsCreateModalOpen(false);
                    setEditingAnnouncement(null);
                }}
                onSubmit={handleSubmit}
                editingAnnouncement={editingAnnouncement}
            />

            {/* Delete Confirmation */}
            <DeleteConfirmModal
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={confirmDelete}
                title={deleteTarget?.title || ""}
            />
        </motion.div>
    );
}
