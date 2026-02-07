export type MessageChannel = "sms" | "whatsapp" | "both";

export interface MessageRecipient {
  id: string;
  name: string;
  class: string;
  section: string;
  phone?: string;
  whatsapp?: string;
  guardianPhone?: string;
  guardianWhatsapp?: string;
}

export interface MessageDeliveryStatus {
  sms?: {
    sent: boolean;
    delivered?: boolean;
    sentAt?: string;
  };
  whatsapp?: {
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

// Recipient type for toggling between students and staff
export type RecipientType = "students" | "staff" | "everyone";
export type StaffTypeFilter = "all" | "teaching" | "non-teaching";

export interface StaffRecipient {
  id: string;
  name: string;
  staffType: "teaching" | "non-teaching";
  designation: string;
  // Teaching staff specific
  subjects?: string[];
  classes?: string[];
  // Non-teaching staff specific
  role?: string;
  // Contact info
  phone?: string;
  whatsapp?: string;
}
