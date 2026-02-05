export type MessageChannel = "sms" | "email" | "both";

export interface MessageRecipient {
    id: string;
    name: string;
    class: string;
    section: string;
    phone?: string;
    email?: string;
    guardianPhone?: string;
    guardianEmail?: string;
}

export interface MessageDeliveryStatus {
    sms?: {
        sent: boolean;
        delivered?: boolean;
        sentAt?: string;
    };
    email?: {
        sent: boolean;
        delivered?: boolean;
        sentAt?: string;
    };
}

export interface SentMessage {
    id: string;
    subject?: string;
    content: string;
    channel: MessageChannel;
    recipientType: "all" | "selected";
    recipientCount: number;
    recipients?: MessageRecipient[];
    sentBy: string;
    sentAt: string;
    delivery: MessageDeliveryStatus;
}

export interface MessageFormData {
    subject: string;
    content: string;
    channel: MessageChannel;
    recipients: MessageRecipient[];
    sendToAll: boolean;
}
