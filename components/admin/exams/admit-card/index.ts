// Main component export
export { AdmitCardTemplate } from "./AdmitCardTemplate";

// Individual template exports (for direct use if needed)
export { StandardTemplate } from "./StandardTemplate";
export { CompactTemplate } from "./CompactTemplate";
export { DetailedTemplate } from "./DetailedTemplate";

// Re-export types from central types location
export type {
  AdmitCardData,
  AdmitCardVariant,
  AdmitCardTemplateProps,
  AdmitCardTemplateInfo,
  ExamScheduleItem,
  SavedInstructionTemplate,
} from "@/lib/admin/types/admit-card";

// Re-export constants from central constants location
export {
  DEFAULT_INSTRUCTIONS,
  ADMIT_CARD_TEMPLATES,
  SAMPLE_ADMIT_CARD_DATA,
  SAVED_INSTRUCTIONS_STORAGE_KEY,
  ADMIT_CARD_PRINT_STYLES,
} from "@/lib/admin/constants/admit-card";
