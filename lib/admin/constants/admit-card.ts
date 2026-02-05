import type { AdmitCardData, AdmitCardTemplateInfo } from "@/lib/admin/types/admit-card";

// Default instructions when none are provided
export const DEFAULT_INSTRUCTIONS = [
  "Bring your admit card to the examination hall.",
  "Report to the examination center 30 minutes before the scheduled time.",
  "Carry a valid ID proof (School ID card or Birth Certificate).",
  "Mobile phones, calculators, or electronic devices are strictly prohibited.",
  "Use only blue or black pen for writing answers.",
  "No candidate will be allowed to leave the examination hall before the completion of exam.",
];

// Template metadata for UI selection
export const ADMIT_CARD_TEMPLATES: AdmitCardTemplateInfo[] = [
  {
    id: "standard",
    name: "Standard",
    description: "Full A4 page, clean institutional design",
  },
  {
    id: "compact",
    name: "Compact",
    description: "Half page - prints 2 per A4 sheet",
  },
  {
    id: "detailed",
    name: "Formal",
    description: "Official board-style with full instructions",
  },
];

// Sample data for preview purposes
export const SAMPLE_ADMIT_CARD_DATA: AdmitCardData = {
  schoolName: "City Public School",
  examName: "Mid-Term Examination 2026",
  studentName: "Ahmed Khan",
  fatherName: "Mohammad Khan",
  className: "10",
  section: "A",
  rollNo: "1042",
  room: "10-A",
  examSchedule: [
    { date: "Feb 15", day: "Monday", subject: "Mathematics", time: "9:00 AM" },
    { date: "Feb 17", day: "Wednesday", subject: "English", time: "9:00 AM" },
    { date: "Feb 19", day: "Friday", subject: "Science", time: "9:00 AM" },
    { date: "Feb 21", day: "Sunday", subject: "Social Studies", time: "9:00 AM" },
  ],
};

// LocalStorage key for saved instruction templates
export const SAVED_INSTRUCTIONS_STORAGE_KEY = "admitCardInstructionTemplates";

// Print styles for admit cards
export const ADMIT_CARD_PRINT_STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @page {
    margin: 0;
    size: A4 portrait;
  }
  body { 
    font-family: Arial, sans-serif; 
    background: white;
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  ol {
    list-style-type: decimal;
    list-style-position: outside;
  }
  .admit-card-template { 
    page-break-after: avoid;
    margin: 0 auto !important;
  }
  @media print {
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .admit-card-template {
      page-break-inside: avoid;
    }
  }
`;
