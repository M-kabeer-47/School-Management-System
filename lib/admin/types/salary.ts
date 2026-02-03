// Salary Management Types

export type StaffType = "teaching" | "non-teaching" | "admin";
export type SalaryStatus = "pending" | "paid" | "partial";
export type PaymentMode = "bank_transfer" | "cash" | "cheque";

export interface SalaryComponent {
    id: string;
    name: string;
    type: "allowance" | "deduction";
    value: number;
    isPercentage: boolean;
    description?: string;
}

export interface StaffSalary {
    id: string;
    staffId: string;
    staffName: string;
    avatar?: string;
    department: string;
    designation: string;
    staffType: StaffType;
    joiningDate: string;
    email: string;
    phone: string;
    bankAccount?: string;
    baseSalary: number;
    allowances: { name: string; amount: number }[];
    deductions: { name: string; amount: number }[];
    grossSalary: number;
    netSalary: number;
}

export interface SalaryPayment {
    id: string;
    staffId: string;
    staffName: string;
    department: string;
    designation: string;
    month: string; // "Jan 2026"
    year: number;
    baseSalary: number;
    totalAllowances: number;
    totalDeductions: number;
    grossSalary: number;
    netSalary: number;
    status: SalaryStatus;
    paidAmount: number;
    paidDate?: string;
    paymentMode?: PaymentMode;
    transactionId?: string;
    remarks?: string;
}

export interface SalaryStats {
    totalBudget: number;
    paidThisMonth: number;
    pendingAmount: number;
    totalStaff: number;
    paidStaff: number;
    pendingStaff: number;
}

export interface SalaryFilters {
    search: string;
    department: string;
    staffType: string;
    status: string;
}

export interface ProcessSalaryItem {
    staffId: string;
    staffName: string;
    department: string;
    netSalary: number;
    selected: boolean;
}
