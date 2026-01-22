export interface Complaint {
    id: string;
    subject: string;
    category: "academic" | "facilities" | "transport" | "fees" | "staff" | "other";
    message: string;
    status: "pending" | "in-progress" | "resolved";
    submittedAt: string;
    response?: {
        message: string;
        respondedBy: string;
        respondedAt: string;
    };
}

export interface SchoolContact {
    name: string;
    address: string;
    phone: string[];
    email: string[];
    website?: string;
    officeHours: string;
    principalName: string;
    principalEmail: string;
}
