import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Hash, GraduationCap, Layers, ArrowRightLeft, School, BookOpen, MessageSquare } from "lucide-react";
import { AcademicInfoInput } from "@/components/admin/schemas/student-schemas";
import { AnimatePresence, motion } from "framer-motion";

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
    watch,
    formState: { errors },
  } = useFormContext<AcademicInfoInput>();

  const isTransfer = watch("isTransfer");

  return (
    <div className="space-y-8">
      <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-2 mb-4">
        <p className="text-text-secondary">
          Please provide the student&apos;s admission details. These will be used to
          generate their unique ID.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Transfer Student Toggle */}
      <div className="border-t border-border/50 pt-6">
        <Controller
          name="isTransfer"
          control={control}
          render={({ field }) => (
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-border-strong rounded-full peer-checked:bg-accent transition-colors" />
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5" />
              </div>
              <span className="text-sm font-semibold text-text-secondary flex items-center gap-2 group-hover:text-text-primary transition-colors">
                <ArrowRightLeft className="w-4 h-4 text-accent" /> Transfer Student
              </span>
            </label>
          )}
        />
      </div>

      {/* Transfer Fields - Conditionally shown */}
      <AnimatePresence>
        {isTransfer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 rounded-xl bg-accent/5 border border-accent/15 space-y-5">
              <h4 className="font-bold text-text-primary flex items-center gap-2 text-sm">
                <School className="w-4 h-4 text-accent" /> Previous School Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                    <School className="w-3.5 h-3.5" /> Previous School Name
                  </label>
                  <Input
                    placeholder="Name of previous school"
                    {...register("previousSchool")}
                    error={errors.previousSchool?.message}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5" /> Previous Class
                  </label>
                  <Controller
                    name="previousClass"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select Class" />
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
                  {errors.previousClass && (
                    <p className="text-xs text-error font-medium">
                      {errors.previousClass.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" /> Reason for Leaving (Optional)
                  </label>
                  <Input
                    placeholder="e.g. Family relocation, seeking better education"
                    {...register("reasonForLeaving")}
                    error={errors.reasonForLeaving?.message}
                    className="bg-background"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
