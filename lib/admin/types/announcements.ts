import { Announcement as BaseAnnouncement, Attachment } from "@/lib/student/types/announcements";

// Re-export base types
export type { Attachment };
export type AnnouncementCategory = "general" | "academic" | "event" | "holiday" | "urgent";
export type AnnouncementAudience = "all" | "student" | "instructor";

// Delivery status for SMS/WhatsApp
export interface DeliveryStatus {
    sms: {
        sent: boolean;
        sentAt?: string;
        recipientCount?: number;
    };
    whatsapp: {
        sent: boolean;
        sentAt?: string;
        recipientCount?: number;
    };
}

// Extended announcement for admin use
export interface AdminAnnouncement extends BaseAnnouncement {
    createdBy: string;
    createdAt: string;
    updatedAt?: string;
    delivery?: DeliveryStatus;
    isDraft?: boolean;
}

// Form data for creating/editing announcements
export interface AnnouncementFormData {
    title: string;
    content: string;
    category: AnnouncementCategory;
    audience: AnnouncementAudience;
    isPinned: boolean;
    sendSms: boolean;
    sendWhatsapp: boolean;
    attachment?: {
        name: string;
        type: "pdf" | "image" | "document" | "other";
        size: string;
    };
}
