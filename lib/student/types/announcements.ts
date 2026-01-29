export interface Attachment {
  id: string;
  name: string;
  type: "pdf" | "image" | "document" | "other";
  url: string;
  size?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: "general" | "academic" | "event" | "holiday" | "urgent";
  isPinned?: boolean;
  attachment?: Attachment;
  audience?: "all" | "student" | "instructor";
}
