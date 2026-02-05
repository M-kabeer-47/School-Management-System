export type StaffType = "teaching" | "non-teaching";
export type StaffStatus = "active" | "inactive" | "on-leave";

export interface Staff {
    id: string;
    staffCode: string;
    name: string;
    email: string;
    phone: string;
    whatsapp?: string;
    cnic: string;
    gender: "Male" | "Female";
    dateOfBirth: string;
    address: string;
    department: string;
    designation: string;
    joiningDate: string;
    staffType: StaffType;
    status: StaffStatus;
    avatar?: string;
    salary: number;
    bankAccount?: string;
    emergencyContact?: string;
    emergencyPhone?: string;
}

export interface TeachingStaff extends Staff {
    staffType: "teaching";
    subjects: string[];
    classes: string[];
    qualifications: string[];
    specialization?: string;
}

export interface NonTeachingStaff extends Staff {
    staffType: "non-teaching";
    role: string;
    shift: "morning" | "evening" | "full-day";
    workArea?: string;
}

export interface StaffFilters {
    search: string;
    department: string;
    status: string;
}

export type AnyStaff = TeachingStaff | NonTeachingStaff;
