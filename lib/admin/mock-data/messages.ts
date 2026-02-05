import { MessageRecipient, SentMessage } from "@/lib/admin/types/messages";

// Sample students for recipient selection
export const sampleStudents: MessageRecipient[] = [
    { id: "s1", name: "Ahmed Khan", class: "10", section: "A", phone: "03001234567", email: "ahmed.khan@email.com", guardianPhone: "03011234567", guardianEmail: "khan.guardian@email.com" },
    { id: "s2", name: "Fatima Ali", class: "10", section: "A", phone: "03002345678", email: "fatima.ali@email.com", guardianPhone: "03012345678", guardianEmail: "ali.guardian@email.com" },
    { id: "s3", name: "Muhammad Usman", class: "10", section: "B", phone: "03003456789", email: "m.usman@email.com", guardianPhone: "03013456789", guardianEmail: "usman.guardian@email.com" },
    { id: "s4", name: "Ayesha Malik", class: "9", section: "A", phone: "03004567890", email: "ayesha.malik@email.com", guardianPhone: "03014567890", guardianEmail: "malik.guardian@email.com" },
    { id: "s5", name: "Hassan Raza", class: "9", section: "B", phone: "03005678901", email: "hassan.raza@email.com", guardianPhone: "03015678901", guardianEmail: "raza.guardian@email.com" },
    { id: "s6", name: "Zainab Hussain", class: "8", section: "A", phone: "03006789012", email: "zainab.h@email.com", guardianPhone: "03016789012", guardianEmail: "hussain.guardian@email.com" },
    { id: "s7", name: "Ali Ahmed", class: "8", section: "B", phone: "03007890123", email: "ali.ahmed@email.com", guardianPhone: "03017890123", guardianEmail: "ahmed.guardian@email.com" },
    { id: "s8", name: "Sara Khan", class: "7", section: "A", phone: "03008901234", email: "sara.khan@email.com", guardianPhone: "03018901234", guardianEmail: "khan2.guardian@email.com" },
    { id: "s9", name: "Bilal Qureshi", class: "7", section: "B", phone: "03009012345", email: "bilal.q@email.com", guardianPhone: "03019012345", guardianEmail: "qureshi.guardian@email.com" },
    { id: "s10", name: "Maryam Siddiqui", class: "6", section: "A", phone: "03000123456", email: "maryam.s@email.com", guardianPhone: "03010123456", guardianEmail: "siddiqui.guardian@email.com" },
    { id: "s11", name: "Imran Shah", class: "6", section: "B", phone: "03001111111", email: "imran.shah@email.com", guardianPhone: "03011111111", guardianEmail: "shah.guardian@email.com" },
    { id: "s12", name: "Hira Nawaz", class: "5", section: "A", phone: "03002222222", email: "hira.nawaz@email.com", guardianPhone: "03012222222", guardianEmail: "nawaz.guardian@email.com" },
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
            email: { sent: true, delivered: true, sentAt: "2026-01-15T10:00:00" },
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
        channel: "email",
        recipientType: "selected",
        recipientCount: 120,
        sentBy: "Exam Department",
        sentAt: "2026-01-28T14:00:00",
        delivery: {
            email: { sent: true, delivered: true, sentAt: "2026-01-28T14:00:00" },
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
    const emailCount = sentMessages.filter((m) => m.channel === "email" || m.channel === "both").length;
    const totalRecipients = sentMessages.reduce((sum, m) => sum + m.recipientCount, 0);

    return { total, smsCount, emailCount, totalRecipients };
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
