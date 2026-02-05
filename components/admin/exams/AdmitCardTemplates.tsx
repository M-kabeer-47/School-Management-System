/**
 * @deprecated This file is maintained for backward compatibility.
 * Please import from "@/components/admin/exams/admit-card" instead.
 * 
 * Example:
 * import { AdmitCardTemplate, ADMIT_CARD_TEMPLATES } from "@/components/admin/exams/admit-card";
 */

// Re-export everything from the new modular structure
export {
  AdmitCardTemplate,
  StandardTemplate,
  CompactTemplate,
  DetailedTemplate,
  DEFAULT_INSTRUCTIONS,
  ADMIT_CARD_TEMPLATES,
  SAMPLE_ADMIT_CARD_DATA,
  SAVED_INSTRUCTIONS_STORAGE_KEY,
  ADMIT_CARD_PRINT_STYLES,
} from "./admit-card";

export type {
  AdmitCardData,
  AdmitCardVariant,
  AdmitCardTemplateProps,
  AdmitCardTemplateInfo,
  ExamScheduleItem,
  SavedInstructionTemplate,
} from "./admit-card";
