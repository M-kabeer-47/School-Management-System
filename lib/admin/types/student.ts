export interface StudentDocument {
  type: DocumentType;
  fileName?: string;
  fileUrl?: string;
  uploadDate?: string;
  required: boolean;
}

export type DocumentType =
  | "b-form"
  | "birth-certificate"
  | "father-cnic"
  | "mother-cnic"
  | "photos"
  | "school-leaving-certificate"
  | "previous-result-card"
  | "character-certificate"
  | "vaccination-card"
  | "transfer-certificate";

export const DOCUMENT_LABELS: Record<DocumentType, string> = {
  "b-form": "B-Form (NADRA CRC)",
  "birth-certificate": "Birth Certificate",
  "father-cnic": "Father's CNIC Copy",
  "mother-cnic": "Mother's CNIC Copy",
  photos: "Passport-size Photographs",
  "school-leaving-certificate": "School Leaving Certificate",
  "previous-result-card": "Previous Class Result Card",
  "character-certificate": "Character Certificate",
  "vaccination-card": "Vaccination / Immunization Card",
  "transfer-certificate": "Transfer Certificate",
};

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

  // New fields for Pakistani school requirements
  nationality: string;
  religion: string;
  bFormNo: string;

  // Transfer student fields
  isTransfer: boolean;
  previousSchool?: string;
  previousClass?: string;
  reasonForLeaving?: string;

  // Document uploads
  documents?: StudentDocument[];

  // Sibling tracking
  siblingIds?: string[];
  hasSiblingDiscount?: boolean;
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
