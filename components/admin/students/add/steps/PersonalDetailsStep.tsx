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
import { User, Calendar, Phone, Mail, Upload, Globe, BookHeart, FileText } from "lucide-react";
import { clsx } from "clsx";
import { PersonalDetailsInput } from "@/components/admin/schemas/student-schemas";
import { ChangeEvent } from "react";

const NATIONALITIES = [
  "Pakistani",
  "Afghan",
  "Bangladeshi",
  "Indian",
  "Iranian",
  "Chinese",
  "Other",
];

const RELIGIONS = [
  "Islam",
  "Christianity",
  "Hinduism",
  "Sikhism",
  "Other",
];

export default function PersonalDetailsStep() {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<PersonalDetailsInput>();

  const photo = watch("photo");

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Photo Section */}
      <div className="w-full lg:w-1/3 flex flex-col items-center">
        <div className="relative group cursor-pointer">
          <div
            className={clsx(
              "w-48 h-48 rounded-2xl overflow-hidden shadow-lg border-4 transition-all duration-300 transform group-hover:scale-105",
              photo
                ? "border-accent"
                : "border-border border-dashed bg-surface-active",
            )}
          >
            {photo ? (
              <img
                src={photo as string}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-text-muted gap-2">
                <User className="w-16 h-16 opacity-50" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Upload Photo
                </span>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Upload className="w-10 h-10 text-white drop-shadow-md" />
          </div>
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handlePhotoUpload}
          />
        </div>
        <p className="mt-4 text-xs text-text-secondary text-center max-w-[200px]">
          Accepts JPG, PNG up to 2MB. Ensure clear face visibility.
        </p>
      </div>

      {/* Fields Section */}
      <div className="flex-1 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary">
              First Name
            </label>
            <Input
              {...register("firstName")}
              error={errors.firstName?.message}
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary">
              Last Name
            </label>
            <Input
              {...register("lastName")}
              error={errors.lastName?.message}
              className="bg-background"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary">
              Gender
            </label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <p className="text-xs text-error font-medium">
                {errors.gender.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Date of Birth
            </label>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <SmartDatePicker
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select Date of Birth"
                  error={errors.dob?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Nationality, Religion, B-Form */}
        <div className="pt-6 border-t border-border/50 grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" /> Nationality
            </label>
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    {NATIONALITIES.map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.nationality && (
              <p className="text-xs text-error font-medium">
                {errors.nationality.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
              <BookHeart className="w-3.5 h-3.5" /> Religion
            </label>
            <Controller
              name="religion"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Religion" />
                  </SelectTrigger>
                  <SelectContent>
                    {RELIGIONS.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.religion && (
              <p className="text-xs text-error font-medium">
                {errors.religion.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" /> B-Form Number (NADRA)
            </label>
            <Input
              {...register("bFormNo", {
                onChange: (e) => {
                  let val = e.target.value.replace(/\D/g, "");
                  if (val.length > 13) val = val.slice(0, 13);
                  if (val.length > 5)
                    val = val.slice(0, 5) + "-" + val.slice(5);
                  if (val.length > 13)
                    val = val.slice(0, 13) + "-" + val.slice(13);
                  setValue("bFormNo", val);
                },
              })}
              placeholder="XXXXX-XXXXXXX-X"
              maxLength={15}
              error={errors.bFormNo?.message}
              className="bg-background"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="pt-6 border-t border-border/50 grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" /> Phone
            </label>
            <Input
              {...register("phone", {
                onChange: (e) => {
                  let val = e.target.value.replace(/\D/g, "");
                  if (val.length > 11) val = val.slice(0, 11);
                  if (val.length > 4)
                    val = val.slice(0, 4) + "-" + val.slice(4);
                  setValue("phone", val);
                },
              })}
              placeholder="03XX-XXXXXXX"
              error={errors.phone?.message}
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> Email (Optional)
            </label>
            <Input
              type="email"
              {...register("email")}
              error={errors.email?.message}
              className="bg-background"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
