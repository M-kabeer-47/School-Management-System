export interface ExamDocument {
    id: string;
    title: string;
    type: "datesheet" | "invigilation-schedule";
    pdfUrl: string;
    examName: string;
    date: string;
}

export interface InvigilationDuty {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    room: string;
    class: string;
    subject: string;
    status: "upcoming" | "completed";
}

export interface MarksEntryStatus {
    id: string;
    classId: string;
    className: string;
    section: string;
    subject: string;
    examName: string;
    deadline: string;
    totalStudents: number;
    submittedCount: number;
    status: "pending" | "in-progress" | "submitted";
}
