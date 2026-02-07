export interface SchoolProfile {
  name: string;
  address: string;
  city: string;
  phone: string;
  phone2?: string;
  email: string;
  website?: string;
  logo?: string;
  principalName: string;
  principalPhone?: string;
  principalEmail?: string;
  establishedYear?: string;
  registrationNo?: string;
  board?: string;
}

export interface Term {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface AcademicYearConfig {
  currentYear: string;
  startDate: string;
  endDate: string;
  terms: Term[];
}

export interface FeeHead {
  id: string;
  name: string;
  amount: number;
  frequency: "monthly" | "quarterly" | "biannual" | "annual" | "one-time";
  applicableTo: "all" | string[]; // "all" or array of class names
  isActive: boolean;
}

export interface FeeConcession {
  id: string;
  name: string;
  type: "percentage" | "fixed";
  value: number; // percentage or fixed amount
  description: string;
  isActive: boolean;
}

export interface GradeThreshold {
  grade: string;
  minPercentage: number;
  maxPercentage: number;
  description: string;
}

export interface GradeScaleConfig {
  thresholds: GradeThreshold[];
  passingPercentage: number;
}

export interface PassFailCriteria {
  overallMinPercentage: number;
  perSubjectMinPercentage: number;
  graceMarksAllowed: boolean;
  maxGraceMarks: number;
}

export interface PromotionRules {
  autoPromoteOnPass: boolean;
  allowGraceMarks: boolean;
  maxGraceMarksPerSubject: number;
  compartmentAllowed: boolean;
  maxCompartmentSubjects: number;
  detentionPolicy: "strict" | "lenient";
  detentionDescription: string;
}

export interface DocumentRequirement {
  type: string;
  label: string;
  mandatory: boolean;
  applicableFor: "all" | "transfer" | "class-1" | "class-6-plus";
}

export interface ReportCardConfig {
  defaultTemplate: "modern" | "classic";
  showAttendance: boolean;
  showRank: boolean;
  showRemarks: boolean;
  showGradeScale: boolean;
}

export type SettingsPageId =
  | "school-profile"
  | "academic-year"
  | "fee-structure"
  | "fee-concessions"
  | "grade-scale"
  | "pass-fail"
  | "promotion-rules"
  | "documents"
  | "report-card"
  | "rooms";
