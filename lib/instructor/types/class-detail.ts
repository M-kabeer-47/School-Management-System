export interface Student {
  id: string;
  rollNo: string;
  name: string;
  fatherName: string;
  section: string;
  admissionNo: string;
  registrationCode: string;
  registrationDate: string;
  dateOfBirth: string;
  phoneNo: string;
  fatherNicNo: string;
  monthlyFee: number;
  gender: "Male" | "Female";
  region: string;
  fatherWhatsapp: string;
  studentWhatsapp: string;
  presentAddress: string;
  reference?: string;
  studentEmail: string;
  fatherEmail: string;
  avatar: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  present: number;
  absent: number;
  leave: number;
  status: "marked" | "pending";
  topic?: string;
}

export interface TestRecord {
  id: string;
  title: string;
  date: string;
  totalMarks: number;
  averageScore: number; // 0 if not graded
  status: "graded" | "pending" | "upcoming";
}

export interface ClassDetailData {
  id: string;
  name: string;
  grade: string;
  section: string;
  totalStudents: number;
  students: Student[];
  attendance: AttendanceRecord[];
  tests: TestRecord[];
  homeworks: Homework[];
}

export interface Homework {
  id: string;
  description: string;
  deadline: Date;
  status: "active" | "completed";
  assignedDate: Date;
}
