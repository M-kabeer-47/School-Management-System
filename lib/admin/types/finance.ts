export type ChallanStatus = "pending" | "paid" | "overdue" | "cancelled";
export type PaymentMethod = "cash" | "bank" | "online" | "cheque";

export interface FeeItem {
    id: string;
    name: string;
    amount: number;
    isOptional?: boolean;
}

export interface FeeStructure {
    id: string;
    className: string;
    academicYear: string;
    items: FeeItem[];
    totalAmount: number;
}

export interface FeeDiscount {
    id: string;
    name: string;
    type: "percentage" | "fixed";
    value: number;
    description?: string;
}

export interface ChallanLineItem {
    id: string;
    name: string;
    amount: number;
    discount?: number;
}

export interface FeeChallan {
    id: string;
    challanNo: string;
    studentId: string;
    studentName: string;
    fatherName: string;
    class: string;
    section: string;
    admissionNo: string;
    month: string;
    academicYear: string;
    issueDate: string;
    dueDate: string;
    lineItems: ChallanLineItem[];
    totalAmount: number;
    discountAmount: number;
    netAmount: number;
    status: ChallanStatus;
    paidAmount?: number;
    paidDate?: string;
    paymentMethod?: PaymentMethod;
    receiptNo?: string;
    remarks?: string;
}

export interface FeePayment {
    id: string;
    challanId: string;
    challanNo: string;
    studentId: string;
    studentName: string;
    class: string;
    section: string;
    amount: number;
    paymentDate: string;
    paymentMethod: PaymentMethod;
    receiptNo: string;
    receivedBy: string;
}

export interface FeeDefaulter {
    id: string;
    studentId: string;
    studentName: string;
    fatherName: string;
    class: string;
    section: string;
    admissionNo: string;
    phone: string;
    email?: string;
    totalDue: number;
    daysOverdue: number;
    lastPaymentDate?: string;
    pendingChallans: number;
}

export interface DiscountedStudent {
    id: string;
    studentId: string;
    studentName: string;
    class: string;
    section: string;
    admissionNo: string;
    discountType: string;
    discountPercentage: number;
    monthlyDiscount: number;
    reason: string;
    approvedBy: string;
    validFrom: string;
    validTo?: string;
}

export interface ClassFeeCollection {
    id: string;
    className: string;
    section: string;
    totalStudents: number;
    totalCollectable: number;
    totalCollected: number;
    totalPending: number;
    collectionPercentage: number;
    defaultersCount: number;
}

export interface Expense {
    id: string;
    date: string;
    category: string;
    description: string;
    amount: number;
    paymentMethod: PaymentMethod;
    vendor?: string;
    receiptNo?: string;
    addedBy: string;
    remarks?: string;
}

export interface StudentFeeFilters {
    search: string;
    class: string;
    section: string;
    status: string;
}

// Student Fee Record for the Fee Collection page
export interface StudentFeeRecord {
    id: string;
    studentId: string;
    studentName: string;
    fatherName: string;
    admissionNo: string;
    class: string;
    section: string;
    phone: string;
    totalDue: number;
    paidAmount: number;
    pendingAmount: number;
    status: "paid" | "pending" | "overdue";
    lastPaymentDate?: string;
    challanNo: string;
    dueDate: string;
    feeItems: { name: string; amount: number }[];
}

// Challan Data for Print Challan page
export interface ChallanData {
    id: string;
    studentName: string;
    fatherName: string;
    admissionNo: string;
    class: string;
    section: string;
    challanNo: string;
    month: string;
    dueDate: string;
    items: { name: string; amount: number }[];
    total: number;
}
