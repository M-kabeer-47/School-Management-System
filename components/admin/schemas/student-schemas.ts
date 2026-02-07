import { z } from "zod";

export const academicInfoSchema = z
  .object({
    rollNo: z.string().min(1, "Roll Number is required"),
    grade: z.string().min(1, "Grade is required"),
    section: z.string().min(1, "Section is required"),
    isTransfer: z.boolean().default(false),
    previousSchool: z.string().optional().or(z.literal("")),
    previousClass: z.string().optional().or(z.literal("")),
    reasonForLeaving: z.string().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.isTransfer) {
      if (!data.previousSchool || data.previousSchool.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Previous school is required for transfer students",
          path: ["previousSchool"],
        });
      }
      if (!data.previousClass) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Previous class is required for transfer students",
          path: ["previousClass"],
        });
      }
    }
  });

export const personalDetailsSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters"),
  gender: z.string().min(1, "Gender is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z
    .string()
    .regex(/^03\d{2}-\d{7}$/, "Invalid Phone Format (03XX-XXXXXXX)"),
  photo: z.any().optional(),
  nationality: z.string().min(1, "Nationality is required"),
  religion: z.string().min(1, "Religion is required"),
  bFormNo: z
    .string()
    .regex(
      /^\d{5}-\d{7}-\d{1}$/,
      "Invalid B-Form Format (XXXXX-XXXXXXX-X)",
    ),
});

export const guardianInfoSchema = z.object({
  fatherName: z.string().min(2, "Father's Name is required"),
  fatherCnic: z
    .string()
    .regex(/^\d{5}-\d{7}-\d{1}$/, "Invalid CNIC Format (XXXXX-XXXXXXX-X)"),
  fatherPhone: z
    .string()
    .regex(/^03\d{2}-\d{7}$/, "Invalid Phone Format (03XX-XXXXXXX)"),
  motherName: z
    .string()
    .min(2, "Mother's Name is required")
    .optional()
    .or(z.literal("")),
  motherPhone: z
    .string()
    .regex(/^03\d{2}-\d{7}$/, "Invalid Phone Format (03XX-XXXXXXX)")
    .optional()
    .or(z.literal("")),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().regex(/^\d{5}$/, "Postal Code must be 5 digits"),
});

export const documentsSchema = z.object({
  documents: z.record(z.string(), z.any()).optional(),
});

export type AcademicInfoInput = z.infer<typeof academicInfoSchema>;
export type PersonalDetailsInput = z.infer<typeof personalDetailsSchema>;
export type GuardianInfoInput = z.infer<typeof guardianInfoSchema>;
export type DocumentsInput = z.infer<typeof documentsSchema>;
