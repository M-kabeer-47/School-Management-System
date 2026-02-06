import { AdminComplaint, ComplaintCategory, ComplaintSource, ComplaintStatus } from "@/lib/admin/types/complaints";

export const mockComplaints: AdminComplaint[] = [
    {
        id: "comp-001",
        subject: "Classroom AC Not Working",
        category: "facilities",
        message: "The air conditioning unit in Class 8-A has not been working for the past week. Students are finding it difficult to concentrate in the heat. Please look into this matter urgently.",
        status: "resolved",
        submittedAt: "2026-01-10T09:30:00",
        source: "student",
        submittedBy: {
            id: "std-101",
            name: "Ahmed Khan",
            email: "ahmed.khan@student.cps.edu.pk",
            class: "8-A",
        },
        responses: [
            {
                id: "resp-001",
                message: "Thank you for bringing this to our attention. Our maintenance team has been notified and will inspect the AC unit today.",
                respondedBy: "Mr. Hassan (Facilities Manager)",
                respondedAt: "2026-01-10T14:00:00",
            },
            {
                id: "resp-002",
                message: "The AC unit has been repaired and is now functioning properly. We apologize for any inconvenience caused.",
                respondedBy: "Mr. Hassan (Facilities Manager)",
                respondedAt: "2026-01-12T10:00:00",
            },
        ],
    },
    {
        id: "comp-002",
        subject: "Request for Extra Math Classes",
        category: "academic",
        message: "My child is struggling with mathematics and I would like to request additional tutoring sessions or extra classes after school hours. Please advise on available options.",
        status: "in-progress",
        submittedAt: "2026-01-15T11:00:00",
        source: "student",
        submittedBy: {
            id: "std-102",
            name: "Fatima Ali",
            email: "fatima.ali@student.cps.edu.pk",
            class: "9-B",
        },
        responses: [
            {
                id: "resp-003",
                message: "We have received your request. Our academic coordinator is reviewing the schedule for after-school tutoring sessions. You will be notified once the arrangements are finalized.",
                respondedBy: "Mrs. Fatima (Academic Coordinator)",
                respondedAt: "2026-01-16T10:30:00",
            },
        ],
    },
    {
        id: "comp-003",
        subject: "Bus Route Timing Issue",
        category: "transport",
        message: "The school bus on Route 5 has been arriving 15-20 minutes late for the past few days. This is causing my child to miss the morning assembly. Please look into this.",
        status: "pending",
        submittedAt: "2026-01-18T08:15:00",
        source: "student",
        submittedBy: {
            id: "std-103",
            name: "Bilal Ahmed",
            email: "bilal.ahmed@student.cps.edu.pk",
            class: "7-C",
        },
        responses: [],
    },
    {
        id: "comp-004",
        subject: "Fee Receipt Not Received",
        category: "fees",
        message: "I paid the school fees on January 5th via bank transfer but have not received the official fee receipt yet. Please issue the receipt at the earliest.",
        status: "resolved",
        submittedAt: "2026-01-08T16:00:00",
        source: "student",
        submittedBy: {
            id: "std-104",
            name: "Sara Malik",
            email: "sara.malik@student.cps.edu.pk",
            class: "10-A",
        },
        responses: [
            {
                id: "resp-004",
                message: "We apologize for the delay. Your fee receipt has been generated and emailed to your registered email address. You can also collect a physical copy from the accounts office.",
                respondedBy: "Mr. Akram (Accounts Officer)",
                respondedAt: "2026-01-09T11:00:00",
            },
        ],
    },
    {
        id: "comp-005",
        subject: "Projector Not Working in Lab 2",
        category: "facilities",
        message: "The projector in Computer Lab 2 has been malfunctioning for the past week. This is affecting my programming classes as I cannot demonstrate code properly. Please arrange for repair or replacement.",
        status: "in-progress",
        submittedAt: "2026-01-20T10:00:00",
        source: "instructor",
        submittedBy: {
            id: "inst-201",
            name: "Mr. Usman Ali",
            email: "usman.ali@cps.edu.pk",
            department: "Computer Science",
        },
        responses: [
            {
                id: "resp-005",
                message: "We have received your complaint. A technician has been scheduled to inspect the projector tomorrow morning.",
                respondedBy: "Mr. Hassan (Facilities Manager)",
                respondedAt: "2026-01-20T15:00:00",
            },
        ],
    },
    {
        id: "comp-006",
        subject: "Request for Additional Lab Equipment",
        category: "academic",
        message: "We need additional microscopes for the biology lab. Currently, we have 10 microscopes for 30 students, which makes it difficult to conduct practical sessions effectively. Please consider procuring at least 10 more microscopes.",
        status: "pending",
        submittedAt: "2026-01-22T09:00:00",
        source: "instructor",
        submittedBy: {
            id: "inst-202",
            name: "Dr. Ayesha Khan",
            email: "ayesha.khan@cps.edu.pk",
            department: "Biology",
        },
        responses: [],
    },
    {
        id: "comp-007",
        subject: "Staff Room Furniture Replacement",
        category: "staff",
        message: "Several chairs in the staff room are broken and uncomfortable. I request that these be replaced with new ergonomic chairs for the comfort and health of teaching staff.",
        status: "pending",
        submittedAt: "2026-01-25T11:30:00",
        source: "instructor",
        submittedBy: {
            id: "inst-203",
            name: "Mrs. Nadia Hussain",
            email: "nadia.hussain@cps.edu.pk",
            department: "English",
        },
        responses: [],
    },
    {
        id: "comp-008",
        subject: "Library Hours Extension Request",
        category: "other",
        message: "I would like to request that the school library extend its hours during exam season. Many students want to study after regular hours but the library closes at 3 PM.",
        status: "resolved",
        submittedAt: "2026-01-12T14:00:00",
        source: "student",
        submittedBy: {
            id: "std-105",
            name: "Zainab Raza",
            email: "zainab.raza@student.cps.edu.pk",
            class: "10-B",
        },
        responses: [
            {
                id: "resp-006",
                message: "Thank you for your suggestion. We have discussed this with the administration and the library hours will be extended to 5 PM during exam season starting next week.",
                respondedBy: "Mrs. Samina (Librarian)",
                respondedAt: "2026-01-14T09:00:00",
            },
        ],
    },
    {
        id: "comp-009",
        subject: "Salary Slip Discrepancy",
        category: "fees",
        message: "I noticed a discrepancy in my January salary slip. The deductions seem higher than usual. Please review and clarify the breakdown of deductions.",
        status: "in-progress",
        submittedAt: "2026-01-28T16:00:00",
        source: "instructor",
        submittedBy: {
            id: "inst-204",
            name: "Mr. Imran Sheikh",
            email: "imran.sheikh@cps.edu.pk",
            department: "Mathematics",
        },
        responses: [
            {
                id: "resp-007",
                message: "We have received your query regarding salary deductions. The accounts team is reviewing your case and will provide a detailed breakdown within 2-3 working days.",
                respondedBy: "Mr. Akram (Accounts Officer)",
                respondedAt: "2026-01-29T10:00:00",
            },
        ],
    },
    {
        id: "comp-010",
        subject: "Drinking Water Quality Concern",
        category: "facilities",
        message: "The water from the cooler near Block B tastes unusual. I'm concerned about the water quality and request that it be tested and the cooler be cleaned or replaced if necessary.",
        status: "pending",
        submittedAt: "2026-01-30T08:30:00",
        source: "student",
        submittedBy: {
            id: "std-106",
            name: "Hassan Raza",
            email: "hassan.raza@student.cps.edu.pk",
            class: "6-A",
        },
        responses: [],
    },
];

// Helper functions
export const getComplaintsByStatus = (status: ComplaintStatus) => {
    return mockComplaints.filter((c) => c.status === status);
};

export const getComplaintsBySource = (source: ComplaintSource) => {
    return mockComplaints.filter((c) => c.source === source);
};

export const getComplaintsByCategory = (category: ComplaintCategory) => {
    return mockComplaints.filter((c) => c.category === category);
};

export const searchComplaints = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return mockComplaints.filter(
        (c) =>
            c.subject.toLowerCase().includes(lowerQuery) ||
            c.submittedBy.name.toLowerCase().includes(lowerQuery) ||
            c.message.toLowerCase().includes(lowerQuery)
    );
};

export const getComplaintsStats = () => {
    return {
        total: mockComplaints.length,
        pending: mockComplaints.filter((c) => c.status === "pending").length,
        inProgress: mockComplaints.filter((c) => c.status === "in-progress").length,
        resolved: mockComplaints.filter((c) => c.status === "resolved").length,
        fromStudents: mockComplaints.filter((c) => c.source === "student").length,
        fromInstructors: mockComplaints.filter((c) => c.source === "instructor").length,
    };
};

export const getUniqueCategories = (): ComplaintCategory[] => {
    return [...new Set(mockComplaints.map((c) => c.category))];
};
