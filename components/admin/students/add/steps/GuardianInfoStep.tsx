import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { User, MapPin } from "lucide-react";
import { GuardianInfoInput } from "@/components/admin/schemas/student-schemas";

export default function GuardianInfoStep() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<GuardianInfoInput>();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Father */}
        <div className="space-y-4 p-5 rounded-xl bg-surface-active/30 border border-border">
          <h4 className="font-bold text-text-primary flex items-center gap-2">
            <User className="w-4 h-4 text-accent" /> Father's Info
          </h4>
          <div className="space-y-3">
            <Input
              placeholder="Full Name"
              {...register("fatherName")}
              error={errors.fatherName?.message}
              className="bg-background"
            />
            <Input
              placeholder="CNIC (e.g. 00000-0000000-0)"
              {...register("fatherCnic", {
                onChange: (e) => {
                  let val = e.target.value.replace(/\D/g, "");
                  if (val.length > 13) val = val.slice(0, 13);
                  // Format: 35202-1234567-1
                  if (val.length > 5)
                    val = val.slice(0, 5) + "-" + val.slice(5);
                  if (val.length > 13)
                    val = val.slice(0, 13) + "-" + val.slice(13);
                  setValue("fatherCnic", val);
                },
              })}
              maxLength={15}
              error={errors.fatherCnic?.message}
              className="bg-background"
            />
            <Input
              placeholder="Phone Number (03XX-XXXXXXX)"
              {...register("fatherPhone", {
                onChange: (e) => {
                  let val = e.target.value.replace(/\D/g, "");
                  if (val.length > 11) val = val.slice(0, 11);
                  if (val.length > 4)
                    val = val.slice(0, 4) + "-" + val.slice(4);
                  setValue("fatherPhone", val);
                },
              })}
              error={errors.fatherPhone?.message}
              className="bg-background"
            />
          </div>
        </div>

        {/* Mother */}
        <div className="space-y-4 p-5 rounded-xl bg-surface-active/30 border border-border">
          <h4 className="font-bold text-text-primary flex items-center gap-2">
            <User className="w-4 h-4 text-accent" /> Mother's Info
          </h4>
          <div className="space-y-3">
            <Input
              placeholder="Full Name"
              {...register("motherName")}
              error={errors.motherName?.message}
              className="bg-background"
            />
            <Input
              placeholder="Phone Number (03XX-XXXXXXX)"
              {...register("motherPhone", {
                onChange: (e) => {
                  let val = e.target.value.replace(/\D/g, "");
                  if (val.length > 11) val = val.slice(0, 11);
                  if (val.length > 4)
                    val = val.slice(0, 4) + "-" + val.slice(4);
                  setValue("motherPhone", val);
                },
              })}
              error={errors.motherPhone?.message}
              className="bg-background"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-4">
        <h4 className="font-bold text-text-primary flex items-center gap-2 border-b border-border pb-2">
          <MapPin className="w-4 h-4 text-accent" /> Residential Address
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Street Address, House No, etc."
              {...register("address")}
              error={errors.address?.message}
              className="bg-background"
            />
          </div>
          <Input
            placeholder="City"
            {...register("city")}
            error={errors.city?.message}
            className="bg-background"
          />
          <Input
            placeholder="Postal Code"
            {...register("postalCode", {
              onChange: (e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 5);
                setValue("postalCode", val);
              },
            })}
            error={errors.postalCode?.message}
            className="bg-background"
          />
        </div>
      </div>
    </div>
  );
}
