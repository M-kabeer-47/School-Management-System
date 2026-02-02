import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Hash, GraduationCap, Layers } from "lucide-react";
import { AcademicInfoInput } from "@/components/admin/schemas/student-schemas";

interface AcademicInfoStepProps {
  GRADES: string[];
  SECTIONS: string[];
}

export default function AcademicInfoStep({
  GRADES,
  SECTIONS,
}: AcademicInfoStepProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<AcademicInfoInput>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-2 mb-4">
        <p className="text-text-secondary">
          Please provide the student's admission details. These will be used to
          generate their unique ID.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
          <Hash className="w-4 h-4 text-accent" /> Roll Number
        </label>
        <Input
          placeholder="e.g. 15"
          {...register("rollNo")}
          error={errors.rollNo?.message}
          className="bg-background"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-accent" /> Grade
        </label>
        <Controller
          name="grade"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                {GRADES.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.grade && (
          <p className="text-xs text-error font-medium">
            {errors.grade.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
          <Layers className="w-4 h-4 text-accent" /> Section
        </label>
        <Controller
          name="section"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {SECTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.section && (
          <p className="text-xs text-error font-medium">
            {errors.section.message}
          </p>
        )}
      </div>
    </div>
  );
}
