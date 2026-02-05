import { MessageRecipient, SentMessage } from "@/lib/admin/types/messages";

// Sample students for recipient selection
export const sampleStudents: MessageRecipient[] = [
    { id: "s1", name: "Ahmed Khan", class: "10", section: "A", phone: "03001234567", whatsapp: "03001234567", guardianPhone: "03011234567", guardianWhatsapp: "03011234567" },
    { id: "s2", name: "Fatima Ali", class: "10", section: "A", phone: "03002345678", whatsapp: "03002345678", guardianPhone: "03012345678", guardianWhatsapp: "03012345678" },
    { id: "s3", name: "Muhammad Usman", class: "10", section: "B", phone: "03003456789", whatsapp: "03003456789", guardianPhone: "03013456789", guardianWhatsapp: "03013456789" },
    { id: "s4", name: "Ayesha Malik", class: "9", section: "A", phone: "03004567890", whatsapp: "03004567890", guardianPhone: "03014567890", guardianWhatsapp: "03014567890" },
    { id: "s5", name: "Hassan Raza", class: "9", section: "B", phone: "03005678901", whatsapp: "03005678901", guardianPhone: "03015678901", guardianWhatsapp: "03015678901" },
    { id: "s6", name: "Zainab Hussain", class: "8", section: "A", phone: "03006789012", whatsapp: "03006789012", guardianPhone: "03016789012", guardianWhatsapp: "03016789012" },
    { id: "s7", name: "Ali Ahmed", class: "8", section: "B", phone: "03007890123", whatsapp: "03007890123", guardianPhone: "03017890123", guardianWhatsapp: "03017890123" },
    { id: "s8", name: "Sara Khan", class: "7", section: "A", phone: "03008901234", whatsapp: "03008901234", guardianPhone: "03018901234", guardianWhatsapp: "03018901234" },
    { id: "s9", name: "Bilal Qureshi", class: "7", section: "B", phone: "03009012345", whatsapp: "03009012345", guardianPhone: "03019012345", guardianWhatsapp: "03019012345" },
    { id: "s10", name: "Maryam Siddiqui", class: "6", section: "A", phone: "03000123456", whatsapp: "03000123456", guardianPhone: "03010123456", guardianWhatsapp: "03010123456" },
    { id: "s11", name: "Imran Shah", class: "6", section: "B", phone: "03001111111", whatsapp: "03001111111", guardianPhone: "03011111111", guardianWhatsapp: "03011111111" },
    { id: "s12", name: "Hira Nawaz", class: "5", section: "A", phone: "03002222222", whatsapp: "03002222222", guardianPhone: "03012222222", guardianWhatsapp: "03012222222" },
];

// Sent messages history
export const sentMessages: SentMessage[] = [
    {
        id: "msg-001",
        subject: "Fee Reminder - January 2026",
        content: "Dear Parents, this is a reminder that the fee for January 2026 is due by 31st January. Please ensure timely payment to avoid late charges.",
        channel: "both",
        recipientType: "all",
        recipientCount: 450,
        sentBy: "Admin Office",
        sentAt: "2026-01-15T10:00:00",
        delivery: {
            sms: { sent: true, delivered: true, sentAt: "2026-01-15T10:00:00" },
            whatsapp: { sent: true, delivered: true, sentAt: "2026-01-15T10:00:00" },
        },
    },
    {
        id: "msg-002",
        subject: "PTM Reminder",
        content: "Parent-Teacher Meeting on 25th January, 9 AM - 1 PM. Your presence is important to discuss your child's progress.",
        channel: "sms",
        recipientType: "all",
        recipientCount: 450,
        sentBy: "Academic Coordinator",
        sentAt: "2026-01-20T09:30:00",
        delivery: {
            sms: { sent: true, delivered: true, sentAt: "2026-01-20T09:30:00" },
        },
    },
    {
        id: "msg-003",
        subject: "Exam Results Available",
        content: "Mid-term exam results are now available. Please check the student portal or contact the school office.",
        channel: "whatsapp",
        recipientType: "selected",
        recipientCount: 120,
        sentBy: "Exam Department",
        sentAt: "2026-01-28T14:00:00",
        delivery: {
            whatsapp: { sent: true, delivered: true, sentAt: "2026-01-28T14:00:00" },
        },
    },
    {
        id: "msg-004",
        content: "School closed tomorrow due to weather conditions. Stay safe!",
        channel: "sms",
        recipientType: "all",
        recipientCount: 450,
        sentBy: "Principal Office",
        sentAt: "2026-02-01T18:00:00",
        delivery: {
            sms: { sent: true, delivered: true, sentAt: "2026-02-01T18:00:00" },
        },
    },
];

export function getMessageStats() {
    const total = sentMessages.length;
    const smsCount = sentMessages.filter((m) => m.channel === "sms" || m.channel === "both").length;
    const whatsappCount = sentMessages.filter((m) => m.channel === "whatsapp" || m.channel === "both").length;
    const totalRecipients = sentMessages.reduce((sum, m) => sum + m.recipientCount, 0);

    return { total, smsCount, whatsappCount, totalRecipients };
}

export function searchStudents(query: string): MessageRecipient[] {
    if (!query.trim()) return sampleStudents;

    const lowerQuery = query.toLowerCase();
    return sampleStudents.filter(
        (s) =>
            s.name.toLowerCase().includes(lowerQuery) ||
            s.class.includes(query) ||
            `${s.class}-${s.section}`.toLowerCase().includes(lowerQuery)
    );
}
