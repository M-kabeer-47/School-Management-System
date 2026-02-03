export interface Student {
  id: string;
  name: string;
  rollNo: string;
  fatherName: string;
  phoneNo: string;
  fatherWhatsapp: string;
  studentWhatsapp?: string;
  studentEmail?: string;
  fatherEmail?: string;
  presentAddress: string;
  region: string;
  section: string;
  registrationCode: string;
  gender: string;
  attendancePercentage?: number;
}
