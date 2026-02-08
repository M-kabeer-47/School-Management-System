import {
  SchoolProfile,
  AcademicYearConfig,
  ClassGroup,
  SectionDefinition,
  SubjectDefinition,
  TermDefinition,
  FeeHead,
  FeeConcession,
  GradeScaleConfig,
  PassFailCriteria,
  PromotionRules,
  DocumentRequirement,
  ReportCardConfig,
  LateFeeConfig,
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
  schoolType: "Private",
  schoolLevel: "Middle (1–8)",
  medium: "English Medium",
  genderPolicy: "Co-Education",
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

// ─── Term Definitions ────────────────────────────────────────

export const termDefinitions: TermDefinition[] = [
  { id: "tdef-1", name: "First Term" },
  { id: "tdef-2", name: "Mid Term" },
  { id: "tdef-3", name: "Final Term" },
];

// ─── Subjects ───────────────────────────────────────────────

export const subjectDefinitions: SubjectDefinition[] = [
  { id: "sub-1", name: "English" },
  { id: "sub-2", name: "Urdu" },
  { id: "sub-3", name: "Mathematics" },
  { id: "sub-4", name: "Islamiat" },
  { id: "sub-5", name: "Nazra Quran" },
  { id: "sub-6", name: "General Knowledge" },
  { id: "sub-7", name: "General Science" },
  { id: "sub-8", name: "Social Studies" },
  { id: "sub-9", name: "Computer Science" },
  { id: "sub-10", name: "Drawing / Art" },
  { id: "sub-11", name: "Physical Education" },
];

// ─── Class Groups / Wings ────────────────────────────────────

export const classGroups: ClassGroup[] = [
  {
    id: "group-1",
    name: "Junior",
    classes: ["1", "2"],
    subjectIds: [
      "sub-1",
      "sub-2",
      "sub-3",
      "sub-4",
      "sub-5",
      "sub-6",
      "sub-10",
    ],
  },
  {
    id: "group-2",
    name: "Middle",
    classes: ["3", "4", "5"],
    subjectIds: [
      "sub-1",
      "sub-2",
      "sub-3",
      "sub-4",
      "sub-5",
      "sub-6",
      "sub-7",
      "sub-8",
      "sub-10",
      "sub-11",
    ],
  },
  {
    id: "group-3",
    name: "Senior",
    classes: ["6", "7", "8"],
    subjectIds: [
      "sub-1",
      "sub-2",
      "sub-3",
      "sub-4",
      "sub-5",
      "sub-7",
      "sub-8",
      "sub-9",
      "sub-11",
      "sub-12",
    ],
  },
];

// ─── Sections ────────────────────────────────────────────────

export const sectionDefinitions: SectionDefinition[] = [
  { id: "sec-1", name: "Section A" },
  { id: "sec-2", name: "Section B" },
  { id: "sec-3", name: "Section C" },
];

// ─── Fee Heads ───────────────────────────────────────────────

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

// ─── Fee Concessions ─────────────────────────────────────────

export const feeConcessions: FeeConcession[] = [
  {
    id: "conc-1",
    name: "Sibling Discount",
    type: "percentage",
    value: 10,
    description:
      "10% discount on tuition fee for siblings enrolled in the same school",
    isActive: true,
    autoApply: true,
  },
  {
    id: "conc-2",
    name: "Staff Child Discount",
    type: "percentage",
    value: 50,
    description: "50% discount on tuition fee for children of school staff",
    isActive: true,
    autoApply: true,
  },
  {
    id: "conc-3",
    name: "Merit Scholarship",
    type: "percentage",
    value: 25,
    description: "25% fee waiver for students with 90%+ in previous exams",
    isActive: true,
    autoApply: false,
  },
  {
    id: "conc-4",
    name: "Orphan Concession",
    type: "percentage",
    value: 100,
    description: "Full fee waiver for orphaned students",
    isActive: true,
    autoApply: false,
  },
  {
    id: "conc-5",
    name: "Financial Hardship",
    type: "fixed",
    value: 2000,
    description:
      "Rs. 2,000 monthly reduction for families demonstrating financial hardship",
    isActive: true,
    autoApply: false,
  },
];

// ─── Grade Scale ─────────────────────────────────────────────

export const gradeScaleConfig: GradeScaleConfig = {
  passingPercentage: 40,
  thresholds: [
    {
      grade: "A+",
      minPercentage: 90,
      maxPercentage: 100,
      description: "Outstanding",
    },
    {
      grade: "A",
      minPercentage: 80,
      maxPercentage: 89,
      description: "Excellent",
    },
    {
      grade: "B+",
      minPercentage: 70,
      maxPercentage: 79,
      description: "Very Good",
    },
    { grade: "B", minPercentage: 60, maxPercentage: 69, description: "Good" },
    {
      grade: "C+",
      minPercentage: 50,
      maxPercentage: 59,
      description: "Satisfactory",
    },
    {
      grade: "C",
      minPercentage: 40,
      maxPercentage: 49,
      description: "Needs Improvement",
    },
    { grade: "F", minPercentage: 0, maxPercentage: 39, description: "Fail" },
  ],
};

// ─── Pass / Fail ─────────────────────────────────────────────

export const passFailCriteria: PassFailCriteria = {
  overallMinPercentage: 40,
  perSubjectMinPercentage: 33,
  graceMarksAllowed: true,
  maxGraceMarks: 5,
};

// ─── Promotion Rules ─────────────────────────────────────────

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

// ─── Document Requirements ───────────────────────────────────

export const documentRequirements: DocumentRequirement[] = [
  {
    type: "b-form",
    label: "B-Form (NADRA CRC)",
    mandatory: true,
    applicableFor: "all",
  },
  {
    type: "birth-certificate",
    label: "Birth Certificate",
    mandatory: true,
    applicableFor: "all",
  },
  {
    type: "father-cnic",
    label: "Father's CNIC Copy",
    mandatory: true,
    applicableFor: "all",
  },
  {
    type: "mother-cnic",
    label: "Mother's CNIC Copy",
    mandatory: true,
    applicableFor: "all",
  },
  {
    type: "photos",
    label: "Passport-size Photographs",
    mandatory: true,
    applicableFor: "all",
  },
  {
    type: "school-leaving-certificate",
    label: "School Leaving Certificate",
    mandatory: true,
    applicableFor: "transfer",
  },
  {
    type: "previous-result-card",
    label: "Previous Class Result Card",
    mandatory: true,
    applicableFor: "transfer",
  },
  {
    type: "character-certificate",
    label: "Character Certificate",
    mandatory: true,
    applicableFor: "class-6-plus",
  },
  {
    type: "vaccination-card",
    label: "Vaccination / Immunization Card",
    mandatory: true,
    applicableFor: "class-1",
  },
  {
    type: "transfer-certificate",
    label: "Transfer Certificate",
    mandatory: false,
    applicableFor: "transfer",
  },
];

// ─── Report Card ─────────────────────────────────────────────

export const reportCardConfig: ReportCardConfig = {
  defaultTemplate: "modern",
  showAttendance: true,
  showRank: true,
  showRemarks: true,
  showGradeScale: true,
};

// ─── Late Fee Configuration ─────────────────────────────────

export const lateFeeConfig: LateFeeConfig = {
  dueDateDay: 10,
  gracePeriodDays: 5,
  lateFeeType: "fixed",
  fixedAmount: 500,
  perDayAmount: 50,
  slabs: [
    { id: "slab-1", fromDay: 1, toDay: 10, amount: 300 },
    { id: "slab-2", fromDay: 11, toDay: 20, amount: 600 },
    { id: "slab-3", fromDay: 21, toDay: 30, amount: 1000 },
  ],
  maxLateFeeCap: 2000,
  allowWaiver: true,
};
