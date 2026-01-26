export interface ExamDocument {
    id: string;
    title: string;
    type: "exam-slip" | "datesheet";
    pdfUrl: string;
    examName: string;
    date?: string;
}

export interface SubjectResult {
    subject: string;
    totalMarks: number;
    obtainedMarks: number;
    grade: string;
}

export interface TermResult {
    id: string;
    termName: string;
    examName: string;
    date: string;
    totalMarks: number;
    obtainedMarks: number;
    percentage: number;
    grade: string;
    position?: number;
    subjects: SubjectResult[];
}
