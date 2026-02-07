import {
  SchoolProfile,
  AcademicYearConfig,
  FeeHead,
  FeeConcession,
  GradeScaleConfig,
  PassFailCriteria,
  PromotionRules,
  DocumentRequirement,
  ReportCardConfig,
} from "@/lib/admin/types/settings";

export const schoolProfile: SchoolProfile = {
  name: "City Public School",
  address: "123 Education Street, Model Town",
  city: "Lahore",
  phone: "+92 42 3574 1234",
  phone2: "+92 42 3574 5678",
  email: "info@citypublicschool.edu.pk",
  website: "www.citypublicschool.edu.pk",
  principalName: "Dr. Muhammad Asif",
  principalPhone: "+92 300 1234567",
  principalEmail: "principal@citypublicschool.edu.pk",
  establishedYear: "1995",
  registrationNo: "REG-PB-2024-0451",
  board: "Punjab Board",
};

export const academicYearConfig: AcademicYearConfig = {
  currentYear: "2025-2026",
  startDate: "2025-04-01",
  endDate: "2026-03-31",
  terms: [
    {
      id: "term-1",
      name: "First Term",
      startDate: "2025-04-01",
      endDate: "2025-08-15",
    },
    {
      id: "term-2",
      name: "Mid Term",
      startDate: "2025-08-16",
      endDate: "2025-12-15",
    },
    {
      id: "term-3",
      name: "Final Term",
      startDate: "2026-01-05",
      endDate: "2026-03-31",
    },
  ],
};

export const feeHeads: FeeHead[] = [
  {
    id: "fee-1",
    name: "Tuition Fee",
    amount: 5000,
    frequency: "monthly",
    applicableTo: "all",
    isActive: true,
  },
  {
    id: "fee-2",
    name: "Admission Fee",
    amount: 15000,
    frequency: "one-time",
    applicableTo: "all",
    isActive: true,
  },
  {
    id: "fee-3",
    name: "Exam Fee",
    amount: 2000,
    frequency: "biannual",
    applicableTo: "all",
    isActive: true,
  },
  {
    id: "fee-4",
    name: "Computer Lab Fee",
    amount: 500,
    frequency: "monthly",
    applicableTo: ["Grade 5", "Grade 6", "Grade 7", "Grade 8"],
    isActive: true,
  },
  {
    id: "fee-5",
    name: "Science Lab Fee",
    amount: 500,
    frequency: "monthly",
    applicableTo: ["Grade 6", "Grade 7", "Grade 8"],
    isActive: true,
  },
  {
    id: "fee-6",
    name: "Sports Fee",
    amount: 1000,
    frequency: "annual",
    applicableTo: "all",
    isActive: true,
  },
  {
    id: "fee-7",
    name: "Library Fee",
    amount: 500,
    frequency: "annual",
    applicableTo: "all",
    isActive: false,
  },
  {
    id: "fee-8",
    name: "Annual Charges",
    amount: 5000,
    frequency: "annual",
    applicableTo: "all",
    isActive: true,
  },
];

export const feeConcessions: FeeConcession[] = [
  {
    id: "conc-1",
    name: "Sibling Discount",
    type: "percentage",
    value: 10,
    description: "10% discount on tuition fee for siblings enrolled in the same school",
    isActive: true,
  },
  {
    id: "conc-2",
    name: "Staff Child Discount",
    type: "percentage",
    value: 50,
    description: "50% discount on tuition fee for children of school staff",
    isActive: true,
  },
  {
    id: "conc-3",
    name: "Merit Scholarship",
    type: "percentage",
    value: 25,
    description: "25% fee waiver for students with 90%+ in previous exams",
    isActive: true,
  },
  {
    id: "conc-4",
    name: "Orphan Concession",
    type: "percentage",
    value: 100,
    description: "Full fee waiver for orphaned students",
    isActive: true,
  },
  {
    id: "conc-5",
    name: "Financial Hardship",
    type: "fixed",
    value: 2000,
    description: "Rs. 2,000 monthly reduction for families demonstrating financial hardship",
    isActive: true,
  },
];

export const gradeScaleConfig: GradeScaleConfig = {
  passingPercentage: 40,
  thresholds: [
    { grade: "A+", minPercentage: 90, maxPercentage: 100, description: "Outstanding" },
    { grade: "A", minPercentage: 80, maxPercentage: 89, description: "Excellent" },
    { grade: "B+", minPercentage: 70, maxPercentage: 79, description: "Very Good" },
    { grade: "B", minPercentage: 60, maxPercentage: 69, description: "Good" },
    { grade: "C+", minPercentage: 50, maxPercentage: 59, description: "Satisfactory" },
    { grade: "C", minPercentage: 40, maxPercentage: 49, description: "Needs Improvement" },
    { grade: "F", minPercentage: 0, maxPercentage: 39, description: "Fail" },
  ],
};

export const passFailCriteria: PassFailCriteria = {
  overallMinPercentage: 40,
  perSubjectMinPercentage: 33,
  graceMarksAllowed: true,
  maxGraceMarks: 5,
};

export const promotionRules: PromotionRules = {
  autoPromoteOnPass: true,
  allowGraceMarks: true,
  maxGraceMarksPerSubject: 5,
  compartmentAllowed: true,
  maxCompartmentSubjects: 2,
  detentionPolicy: "lenient",
  detentionDescription:
    "Students failing in more than 2 subjects will be detained. Students with compartment in 1-2 subjects can appear in supplementary exams.",
};

export const documentRequirements: DocumentRequirement[] = [
  { type: "b-form", label: "B-Form (NADRA CRC)", mandatory: true, applicableFor: "all" },
  { type: "birth-certificate", label: "Birth Certificate", mandatory: true, applicableFor: "all" },
  { type: "father-cnic", label: "Father's CNIC Copy", mandatory: true, applicableFor: "all" },
  { type: "mother-cnic", label: "Mother's CNIC Copy", mandatory: true, applicableFor: "all" },
  { type: "photos", label: "Passport-size Photographs", mandatory: true, applicableFor: "all" },
  { type: "school-leaving-certificate", label: "School Leaving Certificate", mandatory: true, applicableFor: "transfer" },
  { type: "previous-result-card", label: "Previous Class Result Card", mandatory: true, applicableFor: "transfer" },
  { type: "character-certificate", label: "Character Certificate", mandatory: true, applicableFor: "class-6-plus" },
  { type: "vaccination-card", label: "Vaccination / Immunization Card", mandatory: true, applicableFor: "class-1" },
  { type: "transfer-certificate", label: "Transfer Certificate", mandatory: false, applicableFor: "transfer" },
];

export const reportCardConfig: ReportCardConfig = {
  defaultTemplate: "modern",
  showAttendance: true,
  showRank: true,
  showRemarks: true,
  showGradeScale: true,
};
