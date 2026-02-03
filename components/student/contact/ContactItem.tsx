import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/common/utils";

interface ContactItemProps {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
  className?: string;
  iconBgClass?: string;
}

export const ContactItem = ({
  icon: Icon,
  label,
  children,
  className,
  iconBgClass = "bg-accent/10",
}: ContactItemProps) => {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
          iconBgClass,
        )}
      >
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-text-muted mb-0.5">{label}</p>
        <div className="text-sm text-text-primary font-medium">{children}</div>
      </div>
    </div>
  );
};
