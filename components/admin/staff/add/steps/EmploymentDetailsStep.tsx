import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import SmartDatePicker from "@/components/ui/SmartDatePicker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import { Building2, Briefcase, Calendar, CreditCard, Banknote, Hash } from "lucide-react";
import { StaffEmploymentInput } from "@/components/admin/schemas/staff-schemas";

const DEPARTMENTS = [
    "Science",
    "Mathematics",
    "English",
    "Urdu",
    "Social Studies",
    "Computer Science",
    "Physical Education",
    "Administration",
    "Finance",
    "IT",
    "Library",
    "Security",
    "Maintenance",
    "Health",
];

const DESIGNATIONS = [
    "Teacher",
    "Senior Teacher",
    "Head of Department",
    "Sports Coordinator",
    "Office Manager",
    "Accountant",
    "IT Administrator",
    "Librarian",
    "Security Supervisor",
    "Receptionist",
    "Maintenance Supervisor",
    "School Nurse",
];

export default function EmploymentDetailsStep() {
    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext<StaffEmploymentInput>();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <Hash className="w-3.5 h-3.5" /> Staff Code *
                    </label>
                    <Input
                        {...register("staffCode")}
                        placeholder="e.g., TCH-001 or NTS-001"
                        error={errors.staffCode?.message}
                        className="bg-background"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5" /> Staff Type *
                    </label>
                    <Controller
                        name="staffType"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="bg-background">
                                    <SelectValue placeholder="Select Staff Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="teaching">Teaching Staff</SelectItem>
                                    <SelectItem value="non-teaching">Non-Teaching Staff</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.staffType && (
                        <p className="text-xs text-error font-medium">
                            {errors.staffType.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5" /> Department *
                    </label>
                    <Controller
                        name="department"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="bg-background">
                                    <SelectValue placeholder="Select Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {DEPARTMENTS.map((dept) => (
                                        <SelectItem key={dept} value={dept}>
                                            {dept}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.department && (
                        <p className="text-xs text-error font-medium">
                            {errors.department.message}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5" /> Designation *
                    </label>
                    <Controller
                        name="designation"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="bg-background">
                                    <SelectValue placeholder="Select Designation" />
                                </SelectTrigger>
                                <SelectContent>
                                    {DESIGNATIONS.map((des) => (
                                        <SelectItem key={des} value={des}>
                                            {des}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.designation && (
                        <p className="text-xs text-error font-medium">
                            {errors.designation.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="pt-6 border-t border-border/50 grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" /> Joining Date *
                    </label>
                    <Controller
                        name="joiningDate"
                        control={control}
                        render={({ field }) => (
                            <SmartDatePicker
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Select Joining Date"
                                error={errors.joiningDate?.message}
                            />
                        )}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <Banknote className="w-3.5 h-3.5" /> Monthly Salary (PKR) *
                    </label>
                    <Input
                        {...register("salary", {
                            onChange: (e) => {
                                let val = e.target.value.replace(/\D/g, "");
                                setValue("salary", val);
                            },
                        })}
                        placeholder="e.g., 50000"
                        error={errors.salary?.message}
                        className="bg-background"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <CreditCard className="w-3.5 h-3.5" /> Bank Account (Optional)
                    </label>
                    <Input
                        {...register("bankAccount")}
                        placeholder="IBAN or Account Number"
                        error={errors.bankAccount?.message}
                        className="bg-background"
                    />
                </div>
            </div>
        </div>
    );
}
