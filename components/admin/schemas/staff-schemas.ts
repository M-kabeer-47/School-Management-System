import { z } from "zod";

// Step 1: Personal Information
export const staffPersonalInfoSchema = z.object({
    firstName: z.string().min(2, "First Name must be at least 2 characters"),
    lastName: z.string().min(2, "Last Name must be at least 2 characters"),
    gender: z.string().min(1, "Gender is required"),
    dob: z.string().min(1, "Date of Birth is required"),
    cnic: z
        .string()
        .regex(/^\d{5}-\d{7}-\d{1}$/, "Invalid CNIC Format (XXXXX-XXXXXXX-X)"),
    phone: z
        .string()
        .regex(/^03\d{2}-\d{7}$/, "Invalid Phone Format (03XX-XXXXXXX)"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(5, "Address is required"),
    photo: z.any().optional(),
});

// Step 2: Employment Details
export const staffEmploymentSchema = z.object({
    staffCode: z.string().min(1, "Staff Code is required"),
    staffType: z.enum(["teaching", "non-teaching"], {
        message: "Staff Type is required",
    }),
    department: z.string().min(1, "Department is required"),
    designation: z.string().min(1, "Designation is required"),
    joiningDate: z.string().min(1, "Joining Date is required"),
    salary: z.string().min(1, "Salary is required"),
    bankAccount: z.string().optional().or(z.literal("")),
});

// Step 3: Role-Specific Details (Teaching)
export const teachingDetailsSchema = z.object({
    subjects: z.string().min(1, "At least one subject is required"),
    classes: z.string().min(1, "At least one class is required"),
    qualifications: z.string().min(1, "Qualifications are required"),
    specialization: z.string().optional().or(z.literal("")),
});

// Step 3: Role-Specific Details (Non-Teaching)
export const nonTeachingDetailsSchema = z.object({
    role: z.string().min(1, "Role is required"),
    shift: z.enum(["morning", "evening", "full-day"], {
        message: "Shift is required",
    }),
    workArea: z.string().optional().or(z.literal("")),
});

export type StaffPersonalInfoInput = z.infer<typeof staffPersonalInfoSchema>;
export type StaffEmploymentInput = z.infer<typeof staffEmploymentSchema>;
export type TeachingDetailsInput = z.infer<typeof teachingDetailsSchema>;
export type NonTeachingDetailsInput = z.infer<typeof nonTeachingDetailsSchema>;
