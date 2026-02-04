import { AdminAnnouncement } from "@/lib/admin/types/announcements";

export const adminAnnouncements: AdminAnnouncement[] = [
    {
        id: "ann-001",
        title: "School Reopening After Winter Break",
        content:
            "Dear Parents and Students, we are pleased to announce that school will reopen on January 6th, 2026 after the winter break. Please ensure all students arrive on time at 8:00 AM. We look forward to welcoming everyone back!",
        date: "2026-01-02",
        category: "general",
        isPinned: true,
        audience: "all",
        createdBy: "Principal Anderson",
        createdAt: "2026-01-02T09:00:00",
        delivery: {
            sms: { sent: true, sentAt: "2026-01-02T09:05:00", recipientCount: 450 },
            email: { sent: true, sentAt: "2026-01-02T09:05:00", recipientCount: 420 },
        },
    },
    {
        id: "ann-002",
        title: "Annual Sports Day 2026",
        content:
            "Get ready for our Annual Sports Day scheduled for February 15th, 2026! All students are encouraged to participate. Registration forms are available at the sports department. Parents are cordially invited to attend and cheer for our young athletes.",
        date: "2026-01-18",
        category: "event",
        isPinned: true,
        audience: "all",
        createdBy: "Sports Coordinator",
        createdAt: "2026-01-18T10:30:00",
        delivery: {
            sms: { sent: true, sentAt: "2026-01-18T10:35:00", recipientCount: 450 },
            email: { sent: false },
        },
    },
    {
        id: "ann-003",
        title: "Mid-Term Examination Schedule",
        content:
            "The Mid-Term Examinations for all classes will be held from February 20th to February 28th, 2026. The detailed subject-wise schedule has been attached. Students are advised to prepare well and follow the exam guidelines.",
        date: "2026-01-20",
        category: "academic",
        audience: "student",
        createdBy: "Academic Coordinator",
        createdAt: "2026-01-20T11:00:00",
        delivery: {
            sms: { sent: false },
            email: { sent: true, sentAt: "2026-01-20T11:10:00", recipientCount: 380 },
        },
    },
    {
        id: "ann-004",
        title: "Kashmir Day Holiday",
        content:
            "Please be informed that the school will remain closed on February 5th, 2026 in observance of Kashmir Day. Regular classes will resume on February 6th, 2026.",
        date: "2026-01-19",
        category: "holiday",
        audience: "all",
        createdBy: "Principal Anderson",
        createdAt: "2026-01-19T08:00:00",
        delivery: {
            sms: { sent: true, sentAt: "2026-01-19T08:05:00", recipientCount: 450 },
            email: { sent: true, sentAt: "2026-01-19T08:05:00", recipientCount: 420 },
        },
    },
    {
        id: "ann-005",
        title: "Fee Submission Reminder",
        content:
            "This is a reminder that the last date for fee submission for the current semester is January 31st, 2026. Please ensure timely payment to avoid late fee charges. Payment can be made online or at the school office.",
        date: "2026-01-15",
        category: "urgent",
        isPinned: true,
        audience: "student",
        createdBy: "Accounts Department",
        createdAt: "2026-01-15T09:00:00",
        delivery: {
            sms: { sent: true, sentAt: "2026-01-15T09:10:00", recipientCount: 450 },
            email: { sent: true, sentAt: "2026-01-15T09:10:00", recipientCount: 420 },
        },
    },
    {
        id: "ann-006",
        title: "Parent-Teacher Meeting",
        content:
            "A Parent-Teacher Meeting is scheduled for January 25th, 2026 from 9:00 AM to 1:00 PM. Parents are requested to attend to discuss their child's academic progress and address any concerns with the teachers.",
        date: "2026-01-12",
        category: "event",
        audience: "all",
        createdBy: "Academic Coordinator",
        createdAt: "2026-01-12T10:00:00",
        delivery: {
            sms: { sent: true, sentAt: "2026-01-12T10:05:00", recipientCount: 450 },
            email: { sent: false },
        },
    },
    {
        id: "ann-007",
        title: "Staff Meeting: Curriculum Review",
        content:
            "A mandatory staff meeting will be held on Friday, January 30th at 2:00 PM in the Conference Room to review the upcoming term's curriculum.",
        date: "2026-01-26",
        category: "academic",
        audience: "instructor",
        isPinned: true,
        createdBy: "Principal Anderson",
        createdAt: "2026-01-26T08:00:00",
        delivery: {
            sms: { sent: false },
            email: { sent: false },
        },
    },
    {
        id: "ann-008",
        title: "New Library Books Arrival",
        content:
            "Great news! Our school library has received a new collection of 500+ books covering various subjects including fiction, science, history, and reference materials. Students are encouraged to visit the library and explore the new additions.",
        date: "2026-01-08",
        category: "general",
        audience: "all",
        createdBy: "Librarian",
        createdAt: "2026-01-08T14:00:00",
        delivery: {
            sms: { sent: false },
            email: { sent: false },
        },
    },
];

// Helper functions
export function getAnnouncementStats() {
    const total = adminAnnouncements.length;
    const pinned = adminAnnouncements.filter((a) => a.isPinned).length;
    const sentViaSms = adminAnnouncements.filter((a) => a.delivery?.sms.sent).length;
    const sentViaEmail = adminAnnouncements.filter((a) => a.delivery?.email.sent).length;
    const thisMonth = adminAnnouncements.filter((a) => {
        const date = new Date(a.date);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;

    return { total, pinned, sentViaSms, sentViaEmail, thisMonth };
}

export function getRecentAnnouncements(limit: number = 5): AdminAnnouncement[] {
    return [...adminAnnouncements]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit);
}
