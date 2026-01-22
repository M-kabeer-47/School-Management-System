import { Complaint, SchoolContact } from "@/lib/types/contact";

export const schoolContact: SchoolContact = {
    name: "City Public School",
    address: "123 Education Street, Model Town, Lahore, Punjab 54000",
    phone: ["+92 42 3574 1234", "+92 42 3574 5678"],
    email: ["info@citypublicschool.edu.pk", "admin@citypublicschool.edu.pk"],
    website: "www.citypublicschool.edu.pk",
    officeHours: "Monday - Friday: 8:00 AM - 3:00 PM, Saturday: 9:00 AM - 12:00 PM",
    principalName: "Dr. Muhammad Asif",
    principalEmail: "principal@citypublicschool.edu.pk",
};

export const mockComplaints: Complaint[] = [
    {
        id: "comp-001",
        subject: "Classroom AC Not Working",
        category: "facilities",
        message:
            "The air conditioning unit in Class 8-A has not been working for the past week. Students are finding it difficult to concentrate in the heat. Please look into this matter urgently.",
        status: "resolved",
        submittedAt: "2026-01-10T09:30:00",
        response: {
            message:
                "Thank you for bringing this to our attention. The AC unit has been repaired and is now functioning properly. We apologize for any inconvenience caused.",
            respondedBy: "Mr. Hassan (Facilities Manager)",
            respondedAt: "2026-01-12T14:00:00",
        },
    },
    {
        id: "comp-002",
        subject: "Request for Extra Math Classes",
        category: "academic",
        message:
            "My child is struggling with mathematics and I would like to request additional tutoring sessions or extra classes after school hours. Please advise on available options.",
        status: "in-progress",
        submittedAt: "2026-01-15T11:00:00",
        response: {
            message:
                "We have received your request. Our academic coordinator is reviewing the schedule for after-school tutoring sessions. You will be notified once the arrangements are finalized.",
            respondedBy: "Mrs. Fatima (Academic Coordinator)",
            respondedAt: "2026-01-16T10:30:00",
        },
    },
    {
        id: "comp-003",
        subject: "Bus Route Timing Issue",
        category: "transport",
        message:
            "The school bus on Route 5 has been arriving 15-20 minutes late for the past few days. This is causing my child to miss the morning assembly. Please look into this.",
        status: "pending",
        submittedAt: "2026-01-18T08:15:00",
    },
    {
        id: "comp-004",
        subject: "Fee Receipt Not Received",
        category: "fees",
        message:
            "I paid the school fees on January 5th via bank transfer but have not received the official fee receipt yet. Please issue the receipt at the earliest.",
        status: "resolved",
        submittedAt: "2026-01-08T16:00:00",
        response: {
            message:
                "We apologize for the delay. Your fee receipt has been generated and emailed to your registered email address. You can also collect a physical copy from the accounts office.",
            respondedBy: "Mr. Akram (Accounts Officer)",
            respondedAt: "2026-01-09T11:00:00",
        },
    },
];
