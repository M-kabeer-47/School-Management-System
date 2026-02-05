import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import { BookOpen, GraduationCap, Award, Clock, MapPin, Shield } from "lucide-react";
import { TeachingDetailsInput, NonTeachingDetailsInput } from "@/components/admin/schemas/staff-schemas";

const SUBJECTS = [
    "Physics",
    "Chemistry",
    "Biology",
    "Mathematics",
    "Computer Science",
    "English Literature",
    "English Language",
    "Urdu",
    "Islamiat",
    "History",
    "Geography",
    "Civics",
    "Physical Education",
    "IT",
];

const CLASSES = ["5", "6", "7", "8", "9", "10"];

interface RoleDetailsStepProps {
    staffType: "teaching" | "non-teaching";
}

export default function RoleDetailsStep({ staffType }: RoleDetailsStepProps) {
    if (staffType === "teaching") {
        return <TeachingDetails />;
    }
    return <NonTeachingDetails />;
}

function TeachingDetails() {
    const {
        register,
        formState: { errors },
    } = useFormContext<TeachingDetailsInput>();

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                    <GraduationCap className="w-5 h-5" />
                    <span className="font-semibold">Teaching Staff Details</span>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                    Enter academic and teaching-related information for this staff member.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5" /> Subjects *
                    </label>
                    <Input
                        {...register("subjects")}
                        placeholder="e.g., Mathematics, Physics (comma separated)"
                        error={errors.subjects?.message}
                        className="bg-background"
                    />
                    <p className="text-xs text-text-muted">
                        Enter subjects separated by commas
                    </p>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5" /> Classes Assigned *
                    </label>
                    <Input
                        {...register("classes")}
                        placeholder="e.g., 9, 10 (comma separated)"
                        error={errors.classes?.message}
                        className="bg-background"
                    />
                    <p className="text-xs text-text-muted">
                        Enter class grades separated by commas
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <Award className="w-3.5 h-3.5" /> Qualifications *
                    </label>
                    <Input
                        {...register("qualifications")}
                        placeholder="e.g., PhD Physics, M.Phil, B.Ed"
                        error={errors.qualifications?.message}
                        className="bg-background"
                    />
                    <p className="text-xs text-text-muted">
                        Enter qualifications separated by commas
                    </p>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <Award className="w-3.5 h-3.5" /> Specialization (Optional)
                    </label>
                    <Input
                        {...register("specialization")}
                        placeholder="e.g., Quantum Mechanics"
                        error={errors.specialization?.message}
                        className="bg-background"
                    />
                </div>
            </div>
        </div>
    );
}

function NonTeachingDetails() {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<NonTeachingDetailsInput>();

    return (
        <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold">Non-Teaching Staff Details</span>
                </div>
                <p className="text-sm text-purple-600 dark:text-purple-300 mt-1">
                    Enter role and work schedule information for this staff member.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5" /> Role *
                    </label>
                    <Input
                        {...register("role")}
                        placeholder="e.g., Administrative Head, System Administrator"
                        error={errors.role?.message}
                        className="bg-background"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> Shift *
                    </label>
                    <Controller
                        name="shift"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="bg-background">
                                    <SelectValue placeholder="Select Shift" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="morning">Morning</SelectItem>
                                    <SelectItem value="evening">Evening</SelectItem>
                                    <SelectItem value="full-day">Full Day</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.shift && (
                        <p className="text-xs text-error font-medium">
                            {errors.shift.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" /> Work Area (Optional)
                    </label>
                    <Input
                        {...register("workArea")}
                        placeholder="e.g., Main Office, IT Lab, Reception"
                        error={errors.workArea?.message}
                        className="bg-background"
                    />
                </div>
            </div>
        </div>
    );
}
