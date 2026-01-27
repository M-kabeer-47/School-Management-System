import { Complaint } from "@/lib/student/types/contact";

// Instructor-specific mock complaints
export const mockInstructorComplaints: Complaint[] = [
    {
        id: "ins-comp-001",
        subject: "Projector in Room 204 Not Working",
        category: "facilities",
        message:
            "The projector in Room 204 has been malfunctioning for the past 3 days. The display is flickering and sometimes shuts off during lessons. This is affecting my ability to deliver presentations effectively.",
        status: "resolved",
        submittedAt: "2026-01-12T10:00:00",
        response: {
            message:
                "The projector has been replaced with a new unit. Please let us know if you face any further issues.",
            respondedBy: "Mr. Tariq (IT Department)",
            respondedAt: "2026-01-14T15:30:00",
        },
    },
    {
        id: "ins-comp-002",
        subject: "Request for Additional Teaching Materials",
        category: "academic",
        message:
            "I would like to request additional mathematics teaching aids including geometry kits and graphing calculators for Class 8 students. The current resources are insufficient for the practical sessions.",
        status: "in-progress",
        submittedAt: "2026-01-20T09:15:00",
        response: {
            message:
                "Your request has been forwarded to the procurement department. We are currently evaluating the budget and will update you by next week.",
            respondedBy: "Ms. Nadia (Admin Officer)",
            respondedAt: "2026-01-21T11:00:00",
        },
    },
    {
        id: "ins-comp-003",
        subject: "Staffroom AC Maintenance Required",
        category: "facilities",
        message:
            "The air conditioning in the main staffroom is making unusual noises and not cooling properly. This is affecting the working environment for all teachers.",
        status: "pending",
        submittedAt: "2026-01-25T14:30:00",
    },
];
