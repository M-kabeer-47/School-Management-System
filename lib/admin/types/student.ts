export interface Student {
  id: string;
  admissionNo: string;
  registrationCode: string;
  registrationDate: string;
  studentName: string;
  fatherName: string;
  dateOfBirth: string;
  phoneNo: string;
  fatherNicNo: string;
  monthlyFee: number;
  gender: "Male" | "Female";
  region: string;
  fatherWhatsapp: string;
  studentWhatsapp: string;
  presentAddress: string;
  reference: string;
  studentEmail: string;
  fatherEmail: string;
  class: string;
  section: string;
  status: "Active" | "Inactive" | "Graduated" | "Transferred";
  profileImage?: string;
}

export interface StudentFilters {
  search: string;
  class: string;
  section: string;
}

export interface StudentTableActions {
  view: (student: Student) => void;
  edit: (student: Student) => void;
  delete: (student: Student) => void;
  message: (student: Student) => void;
  attendance: (student: Student) => void;
}
